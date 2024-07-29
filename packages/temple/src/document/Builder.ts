//types
import type { PluginBuild } from 'esbuild';
import type { BuilderOptions, TempleDocument } from './types';

import path from 'path';
import esbuild from 'esbuild';
import FileLoader from '../Loader';
import Component from '../component/Component';
import ComponentTranspiler from '../component/Transpiler';
import DocumentTranspiler from '../document/Transpiler';
import { toTS, load } from '../component/helpers';

export function tmlPlugin(parent: Component, tsconfig: string) {
  const name = 'temple-component-plugin';
  return {
    name: name,
    setup: (build: PluginBuild) => {
      build.onResolve({ filter: /\.tml$/ }, args => {
        const absolute = 
          //if absolute
          args.path.startsWith('/')
          ? args.path
          //if relative to cwd
          : args.path.startsWith('@/')
          ? path.resolve(
              parent.cwd, 
              args.path.replace('@/', '')
            )
          //if relative to pwd
          : args.path.startsWith('.')
          ? path.resolve(
              path.dirname(args.importer), 
              args.path
            )
          //node_modules?
          : require.resolve(args.path, { 
              paths: [ args.resolveDir ] 
            });
        
        return parent.fs.existsSync(absolute) 
          ? { path: absolute, namespace: name } 
          : undefined;
      });

      build.onLoad({ filter: /\.tml$/, namespace: name }, args => {
        const component = new Component(args.path, {
          fs: parent.fs,
          cwd: parent.cwd,
          brand: parent.brand,
          name: parent.tagname,
          type: 'component'
        })
        const transpiler = new ComponentTranspiler(component, tsconfig);
        return {
          contents: toTS(transpiler.transpile()),
          loader: 'ts'
        };

        return undefined;
      });
    }
  };
};

export function docPlugin(document: Component, tsconfig: string) {
  const transpiler = new DocumentTranspiler(document, tsconfig);
  const name = 'temple-document-plugin';
  return {
    name: name,
    setup: (build: PluginBuild) => {
      const filter = /^(__SERVER_ENTRY__)|(__CLIENT_ENTRY__)$/;
      build.onResolve({ filter }, args => {
        return { path: args.path, namespace: name };
      });

      build.onLoad({ filter, namespace: name }, args => {
        if (args.path === '__SERVER_ENTRY__') {
          return {
            contents: toTS(transpiler.transpile()),
            loader: 'ts'
          };
        } else if (args.path === '__CLIENT_ENTRY__') {
          return {
            contents: toTS(transpiler.client()),
            loader: 'ts'
          };
        }

        return undefined;
      });
    }
  };
}

export default class Builder {
  //whether to bundle the code
  protected _bundle: boolean;
  //virual file system cache
  protected _cache: Record<string, string> = {};
  //the document instance
  protected _document: Component;
  //whether to minify the code
  protected _minify: boolean;
  //the file loader
  protected _loader: FileLoader;
  //the location of the tsconfig file
  protected _tsconfig: string;

  /**
   * Gets the component instance
   */
  public get document() {
    return this._document;
  }

  /**
   * Sets the document and options
   */
  public constructor(document: Component, options: BuilderOptions = {}) {
    const { 
      minify = true, 
      bundle = true
    } = options;

    this._document = document;
    this._minify = minify;
    this._bundle = bundle;
    this._loader = new FileLoader(document.fs);

    //generated values
    this._tsconfig = this._loader.absolute(
      options.tsconfig || path.resolve(__dirname, '../tsconfig.json'), 
      this._document.cwd
    );
  }

  /**
   * Sets the source code to compile
   */
  public async client() {
    // Bundle with esbuild
    const results = await esbuild.build({
      entryPoints: [ '__CLIENT_ENTRY__' ],
      bundle: this._bundle,
      minifyWhitespace: this._minify,
      minifyIdentifiers: this._minify,
      minifySyntax: this._minify,
      //Immediately Invoked Function Expression format 
      //for browser compatibility
      format: 'iife', 
      globalName: 'TempleBundle',
      plugins: [ tmlPlugin(this._document, this._tsconfig) ],
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
   * - temple(..options...).import(file).TempleDocument
   * - temple(..options...).import(file).source.server
   * - temple(..options...).import(file).source.client
   * - temple(..options...).import(file).document.render(props)
   * - temple(..options...).builder(file)
   */
  public async build() {
    const server = await this.server();
    const client = await this.client();
    //run server script and get the context
    const context = load(server);
    //get the Document
    const Document = context.TempleBundle.default as {
      new(client: string): TempleDocument
    };
    const document = new Document(client);
    //return the source code, TempleComponent and a nice
    // render(props) function
    return {
      source: { server, client },
      TempleDocument: Document,
      document: document
    };
  }

  /**
   * Sets the source code to compile
   */
  public async server() {
    // Bundle with esbuild
    const results = await esbuild.build({
      entryPoints: [ '__SERVER_ENTRY__' ],
      bundle: this._bundle,
      minifyWhitespace: this._minify,
      minifyIdentifiers: this._minify,
      minifySyntax: this._minify,
      //Immediately Invoked Function Expression format 
      //for browser compatibility
      format: 'iife', 
      globalName: 'TempleBundle',
      plugins: [ docPlugin(this._document, this._tsconfig) ],
      platform: 'node',
      preserveSymlinks: true,
      // Do not write to disk
      write: false
    });

    return results.outputFiles[0].text;
  }
}