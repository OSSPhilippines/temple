import type { 
  Hash,
  ComponentType, 
  TempleOptions, 
  TempleCompiler 
} from './types';

import path from 'path';
import Component from './compiler/Component';
import DocumentBuilder from './document/Builder';
import EventEmitter from './document/EventEmitter';
import DocumentManifest from './document/Manifest';
import FileSystem from './filesystem/FileSystem';
import NodeFS from './filesystem/NodeFS';
import Exception from './Exception';

/**
 * Returns a server version of TempleComponent 
 * and a default render function
 * 
 * For Interface:
 * - temple(..options...).import(file).TempleDocument
 * - temple(..options...).import(file).source.server
 * - temple(..options...).import(file).source.client
 * - temple(..options...).import(file).document.render(props)
 * - temple(..options...).builder(file)
 */
export default function temple(options: TempleOptions = {}) {
  //set default options
  options.cwd = options.cwd || process.cwd();
  options.fs = options.fs || new NodeFS();
  options.emitter = options.emitter || new EventEmitter();
  options.type = options.type || 'document';
  options.brand = typeof options.brand === 'string' 
    ? options.brand 
    : 'temple';
  //format the build route
  if (typeof options.buildRoute === 'string') {
    //if the build route does not start with a slash
    if (!options.buildRoute.startsWith('/')) {
      //add a slash
      options.buildRoute = `/${options.buildRoute}`;
    }
    //if the build route ends with a slash
    if (options.buildRoute.endsWith('/')) {
      //remove the slash
      options.buildRoute = options.buildRoute.substring(
        0, 
        options.buildRoute.length - 1
      );
    }
  }
  const compiler: TempleCompiler = {
    config: {
      ...options,
      brand: options.brand as string,
      cwd: options.cwd as string,
      fs: options.fs as FileSystem,
      type: options.type as ComponentType
    },
    emitter: options.emitter,
    fs: options.fs as FileSystem,
    manifest: new DocumentManifest(options),
    fromId(id: string) {
      return compiler.manifest.builder(id);
    },
    fromCache(cacheFile: string) {
      const source = compiler.fs.readFileSync(cacheFile, 'utf8');
      return DocumentBuilder.load(source);
    },
    fromSource(sourceFile: string) {
      //make component
      const document = new Component(sourceFile, options);
      //return builder
      return new DocumentBuilder(document, options);
    },
    async asset(filename: string) {
      //get extension ie. .js
      const extname = path.extname(filename);
      //get id ie. abc123c
      const id = path.basename(filename, extname);
      //get builder from id
      //const builder = compiler.builder(entry);
      const builder = compiler.fromId(id);

      //if no builder
      if (!builder) {
        throw Exception.for('%s is not a registered document', id);
      }
      //get content
      const content = extname === '.html' 
        ? await builder.markup()
        : extname === '.css'
        ? await builder.styles()
        : extname === '.js'
        ? await builder.client()
        : undefined;
      
      if (!content) {
        throw Exception.for('%s has an unrecogized extension', filename);
      }

      const type = extname === '.html' 
        ? 'text/html'
        : extname === '.css'
        ? 'text/css'
        : extname === '.js'
        ? 'text/javascript'
        : 'text/plain';

      return { content, type };
    },
    async client(sourceFile: string) {
      //get builder
      const builder = this.fromSource(sourceFile);
      //get the { source, TempleDocument, document }
      return await builder.client();
    },
    async import(sourceFile: string) {
      //get builder
      const builder = this.fromSource(sourceFile);
      //get the { source, TempleDocument, document }
      return await builder.build();
    },
    async markup(sourceFile: string) {
      //get builder
      const builder = this.fromSource(sourceFile);
      //get the { source, TempleDocument, document }
      return await builder.markup();
    },
    async server(sourceFile: string) {
      //get builder
      const builder = this.fromSource(sourceFile);
      //get the { source, TempleDocument, document }
      return await builder.server();
    },
    async styles(sourceFile: string) {
      //get builder
      const builder = this.fromSource(sourceFile);
      //get the { source, TempleDocument, document }
      return await builder.styles();
    },
    async render(sourceFile: string, props: Hash) {
      //get builder
      const builder = compiler.fromSource(sourceFile);
      //update manifest in memory
      compiler.manifest.set(
        builder.document.id, 
        builder.document.absolute
      );
      //get the build object
      const build = await builder.build();
      //emit view render event
      const pre = compiler.emitter.trigger<string>(
        'render', 
        { builder, build, props }
      );
      //render the document
      const html = pre.data || build.document.render(props);
      //emit view rendered event
      const post = compiler.emitter.trigger<string>(
        'rendered', 
        { builder, build, props, html }
      );
      return post.data || html;
    }
  };
  return compiler;
};