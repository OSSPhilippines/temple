//types
import type { PluginBuild } from 'esbuild';
import type { 
  AliasPluginOptions,
  ComponentPluginOptions,
  DocumentPluginOptions,
  BuildOptions,
  BuilderOptions, 
  DocumentClass 
} from './types';

import path from 'path';
import esbuild from 'esbuild';
import FileSystem from '../filesystem/FileSystem';
import Component from '../component/Component';
import ComponentTranspiler from '../component/Transpiler';
import DocumentTranspiler from '../document/Transpiler';
import { toTS, load } from '../component/helpers';

export function esAliasPlugin(options: AliasPluginOptions) {
  const { cwd = process.cwd(), fs = new FileSystem() } = options;
  const name = 'temple-alias-plugin';
  return {
    name: name,
    setup: (build: PluginBuild) => {
      build.onResolve({ filter: /^@\// }, args => {
        const absolute = path.resolve(cwd, args.path.replace('@/', ''));

        if (fs.existsSync(absolute)) {
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
          if (fs.existsSync(file)) {
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

export function esComponentPlugin(options: ComponentPluginOptions) {
  const { 
    tsconfig, 
    extname = 'tml',
    cwd = process.cwd(),
    fs = new FileSystem(),
    ...config
  } = options;
  const name = 'temple-component-plugin';
  const filter = new RegExp(`\\.${extname}$`);
  return {
    name: name,
    setup: (build: PluginBuild) => {
      build.onResolve({ filter }, args => {
        const absolute = 
          //if absolute
          args.path.startsWith('/')
          ? args.path
          //if relative to cwd
          : args.path.startsWith('@/')
          ? path.resolve(cwd, args.path.replace('@/', ''))
          //if relative to pwd
          : args.path.startsWith('.')
          ? path.resolve(path.dirname(args.importer), args.path)
          //node_modules?
          : require.resolve(args.path, { paths: [ args.resolveDir ] });
        
        return fs.existsSync(absolute) 
          ? { path: absolute, namespace: name } 
          : undefined;
      });

      build.onLoad({ filter, namespace: name }, args => {
        const component = new Component(
          args.path, 
          { ...config, fs, cwd, type: 'component' }
        );
        const transpiler = new ComponentTranspiler(component, tsconfig);
        return {
          contents: toTS(transpiler.transpile()),
          loader: 'ts'
        };
      });
    }
  };
};

export function esDocumentPlugin(options: DocumentPluginOptions) {
  const { 
    tsconfig, 
    extname = 'dtml',
    cwd = process.cwd(),
    fs = new FileSystem(),
    ...config
  } = options;
  const names = [
    'temple-document-server-plugin',
    'temple-document-client-plugin'
  ];
  const filter = new RegExp(`\\.${extname}$`);
  return {
    server: {
      name: names[0],
      setup: (build: PluginBuild) => {
        build.onResolve({ filter }, args => {
          const absolute = 
            //if absolute
            args.path.startsWith('/')
            ? args.path
            //if relative to cwd
            : args.path.startsWith('@/')
            ? path.resolve(cwd, args.path.replace('@/', ''))
            //if relative to pwd
            : args.path.startsWith('.')
            ? path.resolve(path.dirname(args.importer), args.path)
            //node_modules?
            : require.resolve(args.path, { paths: [ args.resolveDir ] });
        
          return fs.existsSync(absolute) 
            ? { path: absolute, namespace: names[0] } 
            : undefined;
        });
  
        build.onLoad({ filter, namespace: names[0] }, args => {
          const document = new Component(
            args.path, 
            { ...config, fs, cwd, type: 'document' }
          );
          const transpiler = new DocumentTranspiler(document, tsconfig);
          return {
            contents: toTS(transpiler.transpile()),
            loader: 'ts'
          };
        });
      }
    },
    client: {
      name: names[1],
      setup: (build: PluginBuild) => {
        build.onResolve({ filter }, args => {
          const absolute = 
            //if absolute
            args.path.startsWith('/')
            ? args.path
            //if relative to cwd
            : args.path.startsWith('@/')
            ? path.resolve(cwd, args.path.replace('@/', ''))
            //if relative to pwd
            : args.path.startsWith('.')
            ? path.resolve(path.dirname(args.importer), args.path)
            //node_modules?
            : require.resolve(args.path, { paths: [ args.resolveDir ] });
        
          return fs.existsSync(absolute) 
            ? { path: absolute, namespace: names[1] } 
            : undefined;
        });
  
        build.onLoad({ filter, namespace: names[1] }, args => {
          const document = new Component(
            args.path, 
            { ...config, fs, cwd, type: 'document' }
          );
          const transpiler = new DocumentTranspiler(document, tsconfig);
          return {
            contents: toTS(transpiler.client()),
            loader: 'ts'
          };
        });
      }
    }
  };
};

export function esWorkspacePlugin() {
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
};

export default class Builder {
  /**
   * Static method to build a single file
   */
  public static async build(entry: string, options: BuildOptions = {}) {
    const { 
      minify = true, 
      bundle = true,
      platform = 'browser',
      globalName,
      plugins = []
    } = options;
    // Bundle with esbuild
    const results = await esbuild.build({
      entryPoints: [ entry ],
      bundle: bundle,
      minifyWhitespace: minify,
      minifyIdentifiers: minify,
      minifySyntax: minify,
      //Immediately Invoked Function Expression format 
      //for browser compatibility
      format: 'iife', 
      globalName,
      plugins,
      platform,
      preserveSymlinks: true,
      // Do not write to disk
      write: false
    });

    return results.outputFiles[0].text;
  }

  //whether to bundle the code
  protected _bundle: boolean;
  //document component
  protected _document: Component;
  //the entry path
  protected _entry: string;
  //file extensions
  protected _extnames: [ string, string ] = [ 'tml', 'dtml' ];
  //whether to minify the code
  protected _minify: boolean;
  //transpiler
  protected _transpiler: DocumentTranspiler;
  //the file loader
  //the location of the tsconfig file
  protected _tsconfig: string;

  /**
   * Returns the document component
   */
  public get document() {
    return this._document;
  }

  /**
   * Returns the entry path
   */
  public get entry() {
    return this._entry;
  }

  /**
   * Returns the expected file extensions used
   */
  public get extnames() {
    return this._extnames;
  }

  /**
   * Returns the transpiler
   */
  public get transpiler() {
    return this._transpiler;
  }

  /**
   * Returns the tsconfig file path
   */
  public get tsconfig() {
    return this._tsconfig;
  }

  /**
   * Sets the document and options
   */
  public constructor(entry: string, options: BuilderOptions = {}) {
    const { 
      minify = true, 
      bundle = true,
      component_extname = 'tml',
      document_extname = 'dtml',
      ...config
    } = options;

    this._entry = entry;
    this._minify = minify;
    this._bundle = bundle;
    this._extnames = [ component_extname, document_extname ];

    //generated values
    this._tsconfig = options.tsconfig 
      || path.resolve(__dirname, '../../tsconfig.json');

    this._document = new Component(this._entry, {
      ...config,
      type: 'document'
    });

    this._transpiler = new DocumentTranspiler(
      this._document, 
      this._tsconfig
    );
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
    const Document = context.TempleBundle.default as DocumentClass;
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
  public async client() {
    // Bundle with esbuild
    return await Builder.build(this._entry, {
      bundle: this._bundle,
      minify: this._minify,
      platform: 'browser',
      globalName: 'TempleBundle',
      plugins: [ 
        esAliasPlugin({
          cwd: this._document.cwd,
          fs: this._document.fs
        }),
        esComponentPlugin({
          brand: this._document.brand,
          seed: this._document.seed,
          cwd: this._document.cwd,
          fs: this._document.fs,
          tsconfig: this._tsconfig,
          extname: this._extnames[0]
        }),
        esDocumentPlugin({
          brand: this._document.brand,
          seed: this._document.seed,
          cwd: this._document.cwd,
          fs: this._document.fs,
          tsconfig: this._tsconfig,
          extname: this._extnames[1]
        }).client,
        esWorkspacePlugin()
      ]
    });
  }

  /**
   * Sets the source code to compile
   */
  public async server() {
    // Bundle with esbuild
    return await Builder.build(this._entry, {
      bundle: this._bundle,
      minify: this._minify,
      globalName: 'TempleBundle',
      platform: 'node',
      plugins: [ 
        esAliasPlugin({
          cwd: this._document.cwd,
          fs: this._document.fs
        }),
        esDocumentPlugin({
          brand: this._document.brand,
          seed: this._document.seed,
          cwd: this._document.cwd,
          fs: this._document.fs,
          tsconfig: this._tsconfig,
          extname: this._extnames[1]
        }).server,
        esWorkspacePlugin()
      ]
    });
  }
};