//types
import type { 
  BuilderOptions, 
  BuilderBuildOptions,
  ServerDocumentClass, 
  BuildResults
} from '../types';

import path from 'path';
import EventEmitter from './EventEmitter';
import esbuild from 'esbuild';
import Component from '../compiler/Component';
import DocumentTranspiler from '../document/Transpiler';
import { load } from '../helpers';
import {
  esAliasPlugin,
  esComponentPlugin,
  esDocumentPlugin,
  esWorkspacePlugin
} from './plugins';

export default class Builder {
  /**
   * Static method to build a single file
   */
  public static async build(
    entry: string, 
    options: BuilderBuildOptions = {}
  ) {
    const { 
      format = 'iife',
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
      format, 
      globalName,
      plugins,
      platform,
      preserveSymlinks: true,
      // Do not write to disk
      write: false
    });

    return results.outputFiles[0].text;
  }

  /**
   * Loads a source code string into the runtime
   */
  public static load(source: string) {
    const context = load(source);
    //get the Document
    const Document = context.TempleBundle.default as ServerDocumentClass;
    //instantiate document
    const document = new Document();
    return {
      source,
      TempleDocument: Document,
      document: document
    };
  }

  protected _buildRoute: string|undefined;
  //document component
  protected _document: Component;
  //emitter
  protected _emitter: EventEmitter;
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
      buildRoute,
      emitter = new EventEmitter(),
      minify = true, 
      component_extname = 'tml',
      document_extname = 'dtml',
      tsconfig = path.resolve(__dirname, '../../tsconfig.json')
    } = options;

    this._buildRoute = buildRoute;
    this._emitter = emitter;
    this._minify = minify;
    this._extnames = [ component_extname, document_extname ];

    //generated values
    this._tsconfig = tsconfig;
    this._document = document;

    this._transpiler = new DocumentTranspiler(
      this._document, 
      this._tsconfig
    );
  }

  /**
   * Builds the document
   */
  public async build() {//emit build event
    const pre = this._emitter.trigger<string>('build', { 
      builder: this
    });
    const source = pre.data || await this.server();
    //run server script and get the context
    const results: BuildResults = Builder.load(source);
    //emit built event
    const post = this._emitter.trigger<BuildResults>('built', { 
      builder: this, 
      build: results 
    });
    return post.data || results;
  }

  /**
   * Sets the source code to compile
   */
  public async client() {
    //emit build-client event
    const pre = this._emitter.trigger<string>('build-client', { 
      builder: this 
    });
    // Bundle with esbuild
    const sourceCode = pre.data || await Builder.build(
      this._document.absolute, 
      {
        bundle: true,
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
            cwd: this._document.cwd,
            fs: this._document.fs,
            tsconfig: this._tsconfig,
            extname: this._extnames[0]
          }),
          esDocumentPlugin({
            brand: this._document.brand,
            cwd: this._document.cwd,
            fs: this._document.fs,
            tsconfig: this._tsconfig,
            extname: this._extnames[1]
          }).client,
          esWorkspacePlugin()
        ]
      }
    );
    //emit built-client event
    const post = this._emitter.trigger<string>('built-client', { 
      ...pre.params, 
      sourceCode 
    });
    return post.data || sourceCode;
  }

  /**
   * Returns the markup
   */
  public async markup() {
    //emit build-markup event
    const pre = this._emitter.trigger<string>('build-markup', { 
      builder: this 
    });
    //build the styles
    const sourceCode = pre.data || (
      await this.build()
    ).document.render();
    //emit built-markup event
    const post = this._emitter.trigger<string>('built-markup', { 
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
    const pre = this._emitter.trigger<string>('build-server', { 
      builder: this 
    });
    // Bundle with esbuild
    const sourceCode = pre.data || await Builder.build(
      this._document.absolute, 
      {
        minify: this._minify,
        bundle: true,
        platform: 'node',
        globalName: 'TempleBundle',
        plugins: [ 
          esAliasPlugin({
            cwd: this._document.cwd,
            fs: this._document.fs
          }),
          esDocumentPlugin({
            brand: this._document.brand,
            cwd: this._document.cwd,
            fs: this._document.fs,
            tsconfig: this._tsconfig,
            extname: this._extnames[1]
          }).server,
          esWorkspacePlugin()
        ]
      }
    );
    //emit build-server event
    const post = this._emitter.trigger<string>('built-server', { 
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
    const pre = this._emitter.trigger<string>('build-styles', { 
      builder: this 
    });
    //build the styles
    const sourceCode = pre.data || (
      await this.build()
    ).document.styles();
    //emit built-styles event
    const post = this._emitter.trigger<string>('built-styles', { 
      ...pre.params, 
      sourceCode 
    });
    return post.data || sourceCode;
  }
};