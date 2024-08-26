//types
import type { 
  BuilderOptions, 
  BuilderBuildOptions,
  ServerDocumentClass, 
  BuildResults
} from '../types';

import path from 'path';
import esbuild from 'esbuild';
import EventEmitter from '@blanquera/types/dist/EventEmitter';
import Component from '../compiler/Component';
import DocumentTranspiler from '../document/Transpiler';
import { load } from '../compiler/helpers';
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

  protected _buildRoute: string|undefined;
  //whether to bundle the code
  protected _bundle: boolean;
  //document component
  protected _document: Component;
  //emitter
  protected _emitter: EventEmitter<any[]>;
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
   * Returns the build route prefix
   */
  public get buildRoute() {
    return this._buildRoute;
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
      bundle = true,
      component_extname = 'tml',
      document_extname = 'dtml',
      tsconfig = path.resolve(__dirname, '../../tsconfig.json')
    } = options;

    this._buildRoute = buildRoute;
    this._emitter = emitter;
    this._minify = minify;
    this._bundle = bundle;
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
  public async build() {
    const server = await this.server();
    //run server script and get the context
    const context = load(server);
    //get the Document
    const Document = context.TempleBundle.default as ServerDocumentClass;
    if (this._buildRoute) {
      //instantiate document
      const document = new Document(this._buildRoute, 'include');
      const results: BuildResults = {
        source: { client: '', server },
        TempleDocument: Document,
        document: document
      };
      //emit build event
      this._emitter.emitSync('build', results, this);
      return results;
    }
    //generate client
    const client = await this.client();
    const document = new Document(client, 'inline');
    const results: BuildResults = {
      source: { client, server },
      TempleDocument: Document,
      document: document
    };
    //emit build event
    this._emitter.emitSync('build', results, this);
    return results;
  }

  /**
   * Sets the source code to compile
   */
  public async client() {
    const results: { source?: string } = {};
    //emit build-client event
    this._emitter.emitSync('build-client', results, this);
    // Bundle with esbuild
    const sourceCode = results.source || await Builder.build(
      this._document.absolute, 
      {
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
    this._emitter.emitSync('built-client', sourceCode, this);

    return sourceCode;
  }

  /**
   * Returns the markup
   */
  public async markup() {
    const results: { source?: string } = {};
    //emit build-markup event
    this._emitter.emitSync('build-markup', results, this);
    //build the styles
    const sourceCode = results.source || (
      await this.build()
    ).document.render();
    //emit built-markup event
    this._emitter.emitSync('built-markup', sourceCode, this);
    return sourceCode;
  }

  /**
   * Sets the source code to compile
   */
  public async server() {
    const results: { source?: string } = {};
    //emit build-server event
    this._emitter.emitSync('build-server', results, this);
    // Bundle with esbuild
    const sourceCode = results.source || await Builder.build(
      this._document.absolute, 
      {
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
    this._emitter.emitSync('built-server', sourceCode, this);
    return sourceCode;
  }

  /**
   * Returns the styles
   */
  public async styles() {
    const results: { source?: string } = {};
    //emit build-markup event
    this._emitter.emitSync('build-styles', results, this);
    //build the styles
    const sourceCode = results.source || (
      await this.build()
    ).document.styles();
    //emit built-styles event
    this._emitter.emitSync('built-styles', sourceCode, this);
    return sourceCode;
  }
};