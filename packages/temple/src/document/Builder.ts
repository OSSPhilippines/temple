//types
import type { PluginBuild } from 'esbuild';
import type TempleDocument from '../server/TempleDocument';
import type { BuilderOptions } from './types';

import path from 'path';
import esbuild from 'esbuild';
import FileLoader from '../filesystem/FileLoader';
import Component from '../component/Component';
import ComponentTranspiler from '../component/Transpiler';
import DocumentTranspiler from '../document/Transpiler';
import { toTS, load } from '../component/helpers';

export function aliasPlugin(parent: Component) {
  const name = 'temple-alias-plugin';
  return {
    name: name,
    setup: (build: PluginBuild) => {
      build.onResolve({ filter: /^@\// }, args => {
        const absolute = path.resolve(
          parent.cwd, 
          args.path.replace('@/', '')
        );

        if (parent.fs.existsSync(absolute)) {
          if (absolute.endsWith('.tml')) {
            return { 
              path: absolute, 
              namespace: 'temple-component-plugin' 
            };
          } else if (absolute.endsWith('.ts')) {
            return { path: absolute, loader: 'ts' };
          }
          return { path: absolute };
        }

        for (const extname of ['.ts', '.js', '.json']) {
          const file = absolute + extname;
          if (parent.fs.existsSync(file)) {
            if (absolute.endsWith('.ts')) {
              return { path: file, loader: 'ts' };
            }
            return { path: file };
          }
        }
        
        return undefined;
      });
    }
  };
};

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
          type: 'component'
        })
        const transpiler = new ComponentTranspiler(component, tsconfig);
        return {
          contents: toTS(transpiler.transpile()),
          loader: 'ts'
        };
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
      build.onResolve({ 
        filter: /^(__SERVER_ENTRY__)|(__CLIENT_ENTRY__)$/ 
      }, args => {
        return { 
          path: path.join(document.dirname, args.path), 
          namespace: name
        };
      });

      build.onLoad({ 
        filter: /(__SERVER_ENTRY__)|(__CLIENT_ENTRY__)$/, 
        namespace: name 
      }, args => {
        if (args.path.endsWith('__SERVER_ENTRY__')) {
          return {
            contents: toTS(transpiler.transpile()),
            loader: 'ts'
          };
        } else if (args.path.endsWith('__CLIENT_ENTRY__')) {
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

export function workspacePlugin() {
  return {
    name: 'resolve-workspace-packages',
    setup(build: PluginBuild) {
      //Filter match examples
      // ex. a...   // ex. A...   // ex. 1...
      // ex. @a...  // ex. @A...  // ex. @1...
      build.onResolve({ filter: /^@{0,1}[a-zA-Z0-9]/ }, args => {
        //use the native require API to resolve the path
        const resolved = require.resolve(args.path, { 
          paths: [ path.resolve(args.resolveDir) ] 
        });
        //if the resolved is a file path
        if (resolved.startsWith('/')) {
          return { path: resolved };
        }
        return undefined;
      });
    }
  }
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
      options.tsconfig || path.resolve(__dirname, '../../tsconfig.json'), 
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
      plugins: [ 
        aliasPlugin(this._document),
        tmlPlugin(this._document, this._tsconfig),
        docPlugin(this._document, this._tsconfig),
        workspacePlugin()
      ],
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
      plugins: [ 
        aliasPlugin(this._document),
        docPlugin(this._document, this._tsconfig),
        workspacePlugin()
      ],
      platform: 'node',
      preserveSymlinks: true,
      // Do not write to disk
      write: false
    });

    return results.outputFiles[0].text;
  }
}