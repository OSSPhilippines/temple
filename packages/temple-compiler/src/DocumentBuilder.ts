import type { PluginBuild } from 'esbuild';
import type { SourceFile } from 'ts-morph';
import type { CompilerOptions, TempleDocument } from './types';
import * as vm from 'vm';
import fs from 'fs';
import path from 'path';
import esbuild from 'esbuild';
import FileLoader from './FileLoader';
import DocumentCompiler from './DocumentCompiler';

type Format = 'iife'|'cjs'|'esm';

export default class DocumentBuilder {
  //the compiler instance
  protected _compiler: DocumentCompiler;
  protected _cache: boolean;
  protected _minify: boolean;
  protected _bundle: boolean;

  /**
   * Gets the compiler instance
   */
  public get compiler() {
    return this._compiler;
  }

  /**
   * Sets the compiler
   */
  constructor(compiler: DocumentCompiler, options: CompilerOptions = {}) {
    const { cache = false, minify = true, bundle = true } = options;
    this._compiler = compiler;
    this._cache = cache;
    this._minify = minify;
    this._bundle = bundle;
  }

  /**
   * Returns the final bundled js code (string)
   * For the .d.ts file it's:
   * `export default TempleComponent/HTMLElement`
   */
  public async build(entry: string, format: Format = 'iife') {
    // Bundle with esbuild
    const results = await esbuild.build({
      entryPoints: [ entry ],
      bundle: this._bundle,
      minifyWhitespace: this._minify,
      minifyIdentifiers: this._minify,
      minifySyntax: this._minify,
      //Immediately Invoked Function Expression format 
      //for browser compatibility
      format: format, 
      globalName: 'TempleBundle',
      plugins: [ 
        this._virtual(),
        {
          name: 'resolve-workspace-packages',
          setup(build) {
            build.onResolve({ filter: /.*/ }, args => {
              if (args.path.startsWith('.') 
                || args.path.startsWith('/')
              ) {
                return;
              }
              const resolver = require.resolve(args.path, { 
                paths: [ path.resolve(args.resolveDir) ] 
              });
              return { path: resolver };
            });
          }
        }
      ],
      //what we are rendering is HTMLElement classes
      //so need to target the browser
      platform: 'browser',
      preserveSymlinks: true,
      // Do not write to disk
      write: false
    });

    return results.outputFiles[0].text;
  }

  /**
   * Returns a server version of TempleComponent 
   * and a default render function
   * 
   * For interface:
   * - temple(..options...).load(file).TempleComponent
   * - temple(..options...).load(file).render(props)
   */
  public async load() {
    const source = await this.source();
    //create a new vm enviroment with the source code
    const script = new vm.Script(source.server);
    //get the context
    const context = vm.createContext({ exports: {} });
    //inject missing dependencies
    context.console = console;
    context.module = module;
    //now run the server script
    script.runInContext(context);
    //get the Document
    const Document = context.TempleBundle.default as {
      new(): TempleDocument
    };
    //return the source code, TempleComponent and a nice
    // render(props) function
    return {
      source: source,
      TempleDocument: Document,
      render: (props?: Record<string, any>) => {
        const document = new Document();
        return document.render(source.client, props);
      }
    };
  }

  /**
   * Returns the raw generated source code
   * For Interface:
   * - temple(..options...).source(file)
   */
  public async source() {
    const build = this._compiler.build;
    return {
      server: await this._cached(`${build}/server`, 'iife'),
      client: await this._cached(`${build}/client`, 'iife')
    };
  }

  /**
   * Tries to read from cache, if not found, compile
   */
  protected async _cached(file: string, format: Format = 'iife') {
    const filejs = file + '.js';
    //if cache enabled
    if (this._cache) {
      //if cache exists and is a file
      if (fs.existsSync(filejs) && fs.lstatSync(filejs).isFile()) {
        //read the cache file
        return fs.readFileSync(filejs, 'utf-8');
      }
    }
    const filets = file + '.ts';
    const source = await this.build(filets, format);
    //if cache enabled
    if (this._cache) {
      //if cache does not exist
      if (!fs.existsSync(filejs)) {
        const dirname = path.dirname(filejs);
        //if the directory does not exist
        if (!fs.existsSync(dirname)) {
          //create the directory
          fs.mkdirSync(dirname, { recursive: true });
        }
        //write the cache file
        fs.writeFileSync(filejs, source);
      }
    }
    return source;
  }

  /**
   * Returns a virtual file system for esbuild
   */
  protected _filesystem() {
    //map of filename to ts code
    const files: Record<string, () => string> = {};
    const cache: Record<string, string> = {};
    const build = this._compiler.build;
    //the client file in [build]/client.ts
    const client = `${build}/client.ts`;
    files[client] = this._readFile(client, this._compiler.manifest, cache);
    //the server file in [build]/server.ts
    const server = `${build}/server.ts`;
    files[server] = this._readFile(server, this._compiler.sourceCode, cache);
    //loop through all components
    this._compiler.registry.forEach(component => {
      const id = component.id;
      const name = component.classname;
      //the component file in [build]/[name]_[id]
      const path = `${build}/${name}_${id}.ts`;
      files[path] = this._readFile(path, component.sourceCode, cache);
    });

    return files;
  }

  /**
   * Creates a virtual file system for esbuild
   */
  protected _virtual() {
    const name = 'temple-vfs';
    //map of filename to ts code
    const files = this._filesystem();
    return {
      name: name,
      setup(build: PluginBuild) {
        build.onResolve({ filter: /.*/ }, args => {
          const absolute = (
            FileLoader.route(args.importer, args.path) + '.ts'
          ).replace('.ts.ts', '.ts');
          if (absolute in files) {
            return { path: absolute, namespace: name };
          }
        });

        build.onLoad({ filter: /.*/, namespace: name }, args => {
          return {
            contents: files[args.path](),
            loader: 'ts'
          };
        });
      }
    };
  }

  /**
   * Returns a callback to read a file (cache enabled)
   */
  private _readFile(
    path: string, 
    source: SourceFile, 
    cache: Record<string, string>
  ) {
    return () => {
      if (!cache[path]) {
        cache[path] = source.getFullText();
      }
      return cache[path];
    };
  }
}