import type { PluginBuild } from 'esbuild';
import type { SourceFile } from 'ts-morph';
import type { TempleComponent } from '@ossph/temple-client';
import type { BuilderOptions } from './types';
import * as vm from 'vm';
import fs from 'fs';
import path from 'path';
import esbuild from 'esbuild';
import FileLoader from './FileLoader';
import DocumentCompiler from './DocumentCompiler';
import { 
  window, 
  document, 
  customElements, 
  TextNode, 
  HTMLElement 
} from './TempleBrowser';

export default class TempleBuilder {
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
  constructor(compiler: DocumentCompiler, options: BuilderOptions = {}) {
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
  public async build(entry: string) {
    // Bundle with esbuild
    const results = await esbuild.build({
      entryPoints: [ entry ],
      bundle: this._bundle,
      minify: this._minify,
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
    //get source code
    const source = await this.source();
    //    console.log('source', source);
    //create a new vm enviroment with the source code
    const script = new vm.Script(source);
    //get the context
    const context = vm.createContext({ exports: {} });
    //inject missing dependencies
    context.Node = TextNode;
    context.HTMLElement = HTMLElement;
    context.customElements = customElements;
    context.document = document;
    context.window = window;
    context.setTimeout = setTimeout;
    context.console = console;
    //now run the script
    script.runInContext(context);
    //get the TempleComponent class
    //NOTE: the name TempleBundle is defined in 
    //the esbuild globalName option
    const Component = context.TempleBundle.default as { 
      component: [ string, string ],
      new(): TempleComponent 
    };
    //!!! TempleComponent class is now on the server !!!
    //return the source code, TempleComponent and a nide
    // render(props) function
    return {
      source,
      TempleComponent: context.TempleBundle.default as { 
        component: [ string, string ],
        new(): TempleComponent 
      },
      render: (props?: Record<string, any>) => {
        const component = new Component();
        //@ts-ignore the render function generated 
        //by the document compiler does have these
        //arguments...
        return component.render(source, props);
      }
    };
  }

  /**
   * Returns the raw generated source code
   * For Interface:
   * - temple(..options...).source(file)
   */
  public async source() {
    const id = this._compiler.id;
    const name = this._compiler.classname;
    const build = this._compiler.buildFolder;
    const cache = `${build}/${name}_${id}.ts`;
    //if cache enabled
    if (this._cache) {
      //if cache exists and is a file
      if (fs.existsSync(cache) && fs.lstatSync(cache).isFile()) {
        //read the cache file
        return fs.readFileSync(cache, 'utf-8');
      }
    }
    //Get the source code now
    const source = await this.build(cache);
    //if cache enabled
    if (this._cache) {
      //if cache does not exist
      if (!fs.existsSync(cache)) {
        const dirname = path.dirname(cache);
        //if the directory does not exist
        if (!fs.existsSync(dirname)) {
          //create the directory
          fs.mkdirSync(dirname, { recursive: true });
        }
        //write the cache file
        fs.writeFileSync(cache, source);
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
    const id = this._compiler.id;
    const name = this._compiler.classname;
    const build = this._compiler.buildFolder;
    //the main component file in [build]/components/[name]_[id]
    const main = `${build}/${name}_${id}.ts`;
    files[main] = this._readFile(main, this._compiler.sourceCode, cache);
    //loop through all components
    this._compiler.registry.forEach(component => {
      const id = component.id;
      const name = component.classname;
      //the component file in [build]/components/[name]_[id]
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