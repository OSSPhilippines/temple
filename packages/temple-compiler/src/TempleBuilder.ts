import type { PluginBuild } from 'esbuild';
import type { SourceFile } from 'ts-morph';
import type { ManifestApp } from './types';
import fs from 'fs';
import path from 'path';
import esbuild from 'esbuild';
import FileLoader from './FileLoader';
import TempleCompiler from './TempleCompiler';
import TempleDocument from './TempleDocument';

export default class TempleBuilder {
  //the compiler instance
  protected _compiler: TempleCompiler;
  protected _cache: boolean;

  /**
   * Gets the compiler instance
   */
  public get compiler() {
    return this._compiler;
  }

  /**
   * Sets the compiler
   */
  constructor(compiler: TempleCompiler, cache = false) {
    this._compiler = compiler;
    this._cache = cache;
  }

  /**
   * Builds for client app
   */
  public async app() {
    const id = this._compiler.id;
    const name = this._compiler.classname;
    const build = this._compiler.buildFolder;
    return await this.build(`${build}/components/${name}_${id}.ts`);
  }

  /**
   * Builds for server engine (default document)
   */
  public async document() {
    //get the engine chunks
    const { styles, scripts, markup } = await this.engine();
    //make a new document
    const document = new TempleDocument();
    document.styles = styles;
    document.scripts = scripts;
    document.markup = markup;
    //return a function that takes props and returns markup
    return (props?: Record<string, any>) => {
      //if props are passed
      if (props) {
        //set props on the document
        document.props = props;
      }
      return document.render();
    };
  }

  /**
   * Builds for server engine (For custom documents)
   */
  public async engine() {
    //get the build folder
    const build = this._compiler.buildFolder;
    //if cache enabled
    if (this._cache) {
      //get the cache file location
      const cache = build + '.json';
      //if cache exists and is a file
      if (fs.existsSync(cache) && fs.lstatSync(cache).isFile()) {
        //read the cache file
        const contents = fs.readFileSync(cache, 'utf-8');
        //parse the cache file
        const chunks = JSON.parse(contents) as ManifestApp;
        //check if all chunks are present
        if (chunks.styles 
          && chunks.scripts 
          && chunks.markup
        ) {
          return chunks;
        }
      }
    }
    //entry is the manifest file in [build]/manifest.ts
    const manifest = `${build}/manifest.ts`;
    //build the chunks
    const chunks = {
      styles: this._compiler.styles.join('\n'),
      scripts: await this.build(manifest),
      markup: this._compiler.markup
    };
    //if cache enabled
    if (this._cache) {
      //get the cache file location
      const cache = build + '.json';
      //if cache does not exist
      if (!fs.existsSync(cache)) {
        const dirname = path.dirname(cache);
        //if the directory does not exist
        if (!fs.existsSync(dirname)) {
          //create the directory
          fs.mkdirSync(dirname, { recursive: true });
        }
        //write the cache file
        fs.writeFileSync(cache, JSON.stringify(chunks, null, 2));
      }
    }

    return chunks;
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
      bundle: true,
      minify: false,
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
    const main = `${build}/components/${name}_${id}.ts`;
    files[main] = this._readFile(main, this._compiler.sourceCode, cache);
    //the manifest file in [build]/manifest.ts
    const manifest = `${build}/manifest.ts`;
    files[manifest] = this._readFile(manifest, this._compiler.manifest, cache);
    //loop through all components
    this._compiler.registry.forEach(component => {
      const id = component.id;
      const name = component.name.component;
      //the component file in [build]/components/[name]_[id]
      const path = `${build}/components/${name}_${id}.ts`
      files[path] = this._readFile(path, component.source, cache);
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