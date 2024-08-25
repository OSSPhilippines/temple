import type { 
  ComponentType, 
  TempleOptions, 
  TempleCompiler 
} from './types';

import EventEmitter from '@blanquera/types/dist/EventEmitter';
import Component from './component/Component';
import DocumentBuilder from './document/Builder';
import DocumentManifest from './document/Manifest';
import router from './document/router';
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
    options: {
      ...options,
      cwd: options.cwd as string,
      fs: options.fs as FileSystem,
      type: options.type as ComponentType
    },
    emitter: options.emitter,
    manifest: new DocumentManifest(options),
    serve() {
      if (!options.buildRoute) {
        throw Exception.for('No build route specified in options');
      } else if (!options.buildPath) {
        throw Exception.for('No build path specified in options');
      }
      return router(compiler, options.buildRoute, options.buildPath);
    },
    builder(sourceFile: string) {
      //make component
      const document = new Component(sourceFile, options);
      //return builder
      return new DocumentBuilder(document, options);
    },
    async import(sourceFile: string) {
      //get bundler
      const builder = this.builder(sourceFile);
      //get the { source, TempleDocument, document }
      return await builder.build();
    }
  };
  return compiler;
};