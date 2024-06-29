import type { PluginBuild } from 'esbuild';
import type { SourceFile } from 'ts-morph';
import type { CompilerOptions, TempleDocument } from './types';
import * as vm from 'vm';
import fs from 'fs';
import path from 'path';
import esbuild from 'esbuild';
import FileLoader from './FileLoader';
import CompilerGenerator from './CompilerGenerator';
import DocumentCompiler from './DocumentCompiler';

type Platform = 'node'|'browser';

export default class DocumentBuilder {
  //the build directory
  protected _build: string;
  //whether to bundle the code
  protected _bundle: boolean;
  //the compiler instance
  protected _compiler: DocumentCompiler;
  //whether to cache the compiled code
  protected _cache: boolean;
  //the file system
  protected _fs: typeof fs;
  //the generator instance
  protected _generator: CompilerGenerator;
  //whether to minify the code
  protected _minify: boolean;
  //the file loader
  protected _loader: FileLoader;
  //the location of the tsconfig file
  protected _tsconfig: string;

  /**
   * Gets the compiler instance
   */
  public get compiler() {
    return this._compiler;
  }

  /**
   * Gets the generator instance
   */
  public get generator() {
    return this._generator;
  }

  /**
   * Sets the compiler
   */
  constructor(compiler: DocumentCompiler, options: CompilerOptions = {}) {
    const { 
      cache = false, 
      minify = true, 
      bundle = true,
      build = './.temple'
    } = options;

    this._compiler = compiler;
    this._cache = cache;
    this._minify = minify;
    this._bundle = bundle;
    this._fs = options.fs || fs;
    this._loader = new FileLoader(this._fs);

    //generated values
    this._build = path.join(
      this._loader.absolute(build, this._compiler.cwd),
      this._compiler.id
    );

    this._tsconfig = this._loader.absolute(
      options.tsconfig || path.resolve(__dirname, '../tsconfig.json'), 
      this._compiler.cwd
    );

    this._generator = new CompilerGenerator(
      this._compiler, 
      this._tsconfig
    );
  }

  /**
   * Returns the final bundled js code (string)
   * For the .d.ts file it's:
   * `export default TempleComponent/HTMLElement`
   */
  public async build(entry: string, platform: Platform) {
    // Bundle with esbuild
    const results = await esbuild.build({
      entryPoints: [ entry ],
      bundle: this._bundle,
      minifyWhitespace: this._minify,
      minifyIdentifiers: this._minify,
      minifySyntax: this._minify,
      //Immediately Invoked Function Expression format 
      //for browser compatibility
      format: 'iife', 
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
      platform: platform,
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
    const build = this._build;
    return {
      server: await this._cached(`${build}/server`, 'node'),
      client: await this._cached(`${build}/client`, 'browser'),
      component: await this._cached(`${build}/component`, 'browser')
    };
  }

  /**
   * Tries to read from cache, if not found, compile
   */
  protected async _cached(file: string, platform: Platform) {
    const filejs = file + '.js';
    //if cache enabled
    if (this._cache) {
      //if cache exists and is a file
      if (this._fs.existsSync(filejs) && this._fs.lstatSync(filejs).isFile()) {
        //read the cache file
        return this._fs.readFileSync(filejs, 'utf-8');
      }
    }
    const filets = file + '.ts';
    const source = await this.build(filets, platform);
    //if cache enabled
    if (this._cache) {
      //if cache does not exist
      if (!this._fs.existsSync(filejs)) {
        const dirname = path.dirname(filejs);
        //if the directory does not exist
        if (!this._fs.existsSync(dirname)) {
          //create the directory
          this._fs.mkdirSync(dirname, { recursive: true });
        }
        //write the cache file
        this._fs.writeFileSync(filejs, source);
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
    const build = this._build;
    //the client file in [build]/client.ts
    const client = `${build}/client.ts`;
    files[client] = this._readFile(client, this._generator.client, cache);
    //the entry file in [build]/entry.ts
    const entry = `${build}/entry.ts`;
    files[entry] = this._readFile(entry, this._generator.entry, cache);
    //the server file in [build]/server.ts
    const server = `${build}/server.ts`;
    files[server] = this._readFile(server, this._generator.server, cache);
    //the server file in [build]/server.ts
    const component = `${build}/component.ts`;
    files[component] = this._readFile(component, this._generator.component, cache);
    //loop through all components
    this._compiler.registry.forEach(component => {
      const id = component.id;
      const name = component.classname;
      //the component file in [build]/[name]_[id]
      const path = `${build}/${name}_${id}.ts`;
      const generator = new CompilerGenerator(component, this._tsconfig);
      files[path] = this._readFile(path, generator.component, cache);
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
      setup: (build: PluginBuild) => {
        build.onResolve({ filter: /.*/ }, args => {
          //catch files in vfs
          if (args.path in files) {
            return { path: args.path, namespace: name };
          }
          //determine the type of file
          const filetype = args.path.startsWith('/') 
            ? 'absolute'
            : args.path.startsWith('.')  
            ? 'pwd'
            : args.path.startsWith('@/') 
            ? 'cwd'
            : 'module';
          //deal with absolute
          if (filetype === 'absolute') {
            if (this._fs.existsSync(args.path)) {
              return { path: args.path };
            }
            return undefined;
          //deal with module
          } else if (filetype === 'module') {
            const module = require.resolve(args.path, { 
              paths: [ args.resolveDir ] 
            });
            if (this._fs.existsSync(module)) {
              return { path: module };
            }
            return undefined;
          //if the importer isn't in the vfs
          } else if (!(args.importer in files)) {
            //then let someone else handle it
            return undefined;
          }

          //filetype can only be pwd or cwd

          const basename = filetype === 'cwd'
            ? path.resolve(this._compiler.cwd, args.path.substring(2))
            : path.resolve(path.dirname(args.importer), args.path);

          for (const extname of ['.ts', '.js', '.json']) {
            const absolute = basename + extname;
            //catch files in vfs
            if (absolute in files) {
              return { path: absolute, namespace: name };
            }
            if (this._fs.existsSync(absolute)) {
              return { path: absolute };
            }
          }

          return undefined;
        });

        build.onLoad({ filter: /.*/, namespace: name }, args => {
          if (args.path in files) {
            return {
              contents: files[args.path](),
              loader: 'ts'
            };
          }

          return undefined;
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