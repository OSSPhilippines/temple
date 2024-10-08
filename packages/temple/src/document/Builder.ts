//types
import type { 
  BuilderOptions, 
  ServerDocumentClass, 
  BuildResults
} from '../types';

import path from 'path';
import EventEmitter from '../EventEmitter';
import Component from '../compiler/Component';
import Transpiler from './Transpiler';
import { load, build } from '../helpers';
import {
  esTemplePlugin,
  esAliasPlugin,
  esComponentPlugin,
  esWorkspacePlugin
} from '../plugins';

export default class Builder {
  /**
   * Loads a source code string into the runtime
   */
  public static load(source: string) {
    const context = load(source);
    //get the Document
    const Document = context.TempleAPI.default as ServerDocumentClass;
    //instantiate document
    const document = new Document();
    return {
      source,
      TempleDocument: Document,
      document: document
    };
  }

  //document component
  protected _document: Component;
  //emitter
  protected _emitter: EventEmitter;
  //file extensions
  protected _extnames: [ string, string ] = [ '.tml', '.dtml' ];
  //whether to minify the code
  protected _minify: boolean;
  //transpiler
  protected _transpiler: Transpiler;
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
   * Returns the emitter
   */
  public get emitter() {
    return this._emitter;
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
  public constructor(document: Component, options: BuilderOptions = {}) {
    const { 
      emitter = new EventEmitter(),
      minify = true, 
      component_extname = '.tml',
      document_extname = '.dtml',
      tsconfig = path.resolve(__dirname, '../../tsconfig.json')
    } = options;

    this._emitter = emitter;
    this._minify = minify;
    this._extnames = [ component_extname, document_extname ];

    //generated values
    this._tsconfig = tsconfig;
    this._document = document;

    this._transpiler = new Transpiler(
      this._document, 
      this._tsconfig
    );
  }

  /**
   * Builds the document
   */
  public async build() {
    //emit build event
    const pre = await this._emitter.waitFor<string>('build', { 
      builder: this
    });
    const source = pre.data || await this.server();
    //run server script and get the context
    const results: BuildResults = Builder.load(source);
    //emit built event
    const post = await this._emitter.waitFor<BuildResults>('built', { 
      builder: this, 
      build: results 
    });
    return post.data || results;
  }

  /**
   * Returns the client js
   */
  public async client() {
    //we need to rebuild the server document
    const { document } = await this.build();
    //in order to get the bindings
    const bindings = document.bindings();
    //emit build-client event
    const pre = await this._emitter.waitFor<string>('build-client', { 
      builder: this 
    });
    // Bundle with esbuild
    const sourceCode = pre.data || await build(
      this._document.absolute, 
      {
        bundle: true,
        minify: this._minify,
        platform: 'browser',
        globalName: 'TempleAPI',
        plugins: [ 
          esTemplePlugin({
            bindings,
            mode: 'client',
            brand: this._document.brand,
            cwd: this._document.cwd,
            fs: this._document.fs,
            tsconfig: this._tsconfig,
            component_extname: this._extnames[0],
            document_extname: this._extnames[1]
          })
        ]
      }
    );
    //emit built-client event
    const post = await this._emitter.waitFor<string>('built-client', { 
      ...pre.params, 
      sourceCode 
    });
    return post.data || sourceCode;
  }

  /**
   * Returns a single bundled component
   */
  public async component() {
    const { tagname, classname } = this._document;
    const code = build(
      this._document.absolute,
      {
        bundle: true,
        minify: this._minify,
        globalName: classname,
        platform: 'browser',
        plugins: [ 
          esAliasPlugin({
            cwd: this._document.cwd,
            fs: this._document.fs
          }),
          esComponentPlugin({
            brand: this._document.brand,
            cwd: this._document.cwd,
            fs: this._document.fs,
            tsconfig: this._tsconfig,
            extname: this._extnames[0]
          }),
          esWorkspacePlugin()
        ]
      }
    );

    return `${code};customElements.define('${tagname}', ${classname})`;
  }

  /**
   * Returns the markup
   */
  public async markup() {
    //emit build-markup event
    const pre = await this._emitter.waitFor<string>('build-markup', { 
      builder: this 
    });
    //build the styles
    const sourceCode = pre.data || (
      await this.build()
    ).document.render();
    //emit built-markup event
    const post = await this._emitter.waitFor<string>('built-markup', { 
      ...pre.params, 
      sourceCode 
    });
    return post.data || sourceCode;
  }

  /**
   * Sets the source code to compile
   */
  public async server() {
    //emit build-server event
    const pre = await this._emitter.waitFor<string>('build-server', { 
      builder: this 
    });
    // Bundle with esbuild
    const sourceCode = pre.data || await build(
      this._document.absolute, 
      {
        minify: this._minify,
        bundle: true,
        platform: 'node',
        globalName: 'TempleAPI',
        plugins: [ 
          esTemplePlugin({
            mode: 'server',
            brand: this._document.brand,
            cwd: this._document.cwd,
            fs: this._document.fs,
            tsconfig: this._tsconfig,
            component_extname: this._extnames[0],
            document_extname: this._extnames[1]
          })
        ]
      }
    );
    //emit build-server event
    const post = await this._emitter.waitFor<string>('built-server', { 
      ...pre.params, 
      sourceCode 
    });
    return post.data || sourceCode;
  }

  /**
   * Returns the styles
   */
  public async styles() {
    //emit build-markup event
    const pre = await this._emitter.waitFor<string>('build-styles', { 
      builder: this 
    });
    //build the styles
    const sourceCode = pre.data || (
      await this.build()
    ).document.styles();
    //emit built-styles event
    const post = await this._emitter.waitFor<string>('built-styles', { 
      ...pre.params, 
      sourceCode 
    });

    return post.data || sourceCode;
  }
};