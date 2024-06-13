import type { PluginBuild } from 'esbuild';
import type { SourceFile } from 'ts-morph';
import type { Compiler } from '@ossph/temple-compiler';

import fs from 'fs';
import path from 'path';
import { CompilerGenerator, FileLoader } from '@ossph/temple-compiler';

export type BuildOptions = {
  compiler: Compiler,
  extname?: string,
  tsconfig?: string,
  fs?: typeof fs
};

/**
 * Merges options with defaults
 */
function config(options: BuildOptions) {
  const compiler = options.compiler;
  const filesystem = options.fs || fs;
  const loader = new FileLoader(filesystem);
  const tsconfig = loader.absolute(
    options.tsconfig || './tsconfig.json', 
    compiler.cwd
  )
  const generator = new CompilerGenerator(compiler, tsconfig);

  return {
    compiler,
    filesystem,
    loader,
    generator
  };
}

/**
 * Returns a callback to read a file (cache enabled)
 */
function readFile(
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

function filesystem() {
  //map of filename to ts code
  const files: Record<string, () => string> = {};
  const cache: Record<string, string> = {};
  const build = this._build;
  //the client file in [build]/client.ts
  const client = `${build}/client.ts`;
  files[client] = this._readFile(client, this._generator.client, cache);
  //the entry file in [build]/entry.ts
  const entry = `${build}/entry.ts`;
  files[entry] = this._readFile(entry, this._generator.entry, cache);
  //the server file in [build]/server.ts
  const server = `${build}/server.ts`;
  files[server] = this._readFile(server, this._generator.server, cache);
  //the server file in [build]/server.ts
  const component = `${build}/component.ts`;
  files[component] = this._readFile(component, this._generator.component, cache);
  //loop through all components
  this._compiler.registry.forEach(component => {
    const id = component.id;
    const name = component.classname;
    //the component file in [build]/[name]_[id]
    const path = `${build}/${name}_${id}.ts`;
    const generator = new CompilerGenerator(component, this._tsconfig);
    files[path] = this._readFile(path, generator.component, cache);
  });

  return files;
}

/**
 * Creates a virtual file system for esbuild
 */
function virtual() {
  const name = 'temple-vfs';
  //map of filename to ts code
  const files = this._filesystem();
  return {
    name: name,
    setup: (build: PluginBuild) => {
      build.onResolve({ filter: /.*/ }, args => {
        //catch files in vfs
        if (args.path in files) {
          return { path: args.path, namespace: name };
        }
        //determine the type of file
        const filetype = args.path.startsWith('/') 
          ? 'absolute'
          : args.path.startsWith('.')  
          ? 'pwd'
          : args.path.startsWith('@/') 
          ? 'cwd'
          : 'module';
        //deal with absolute
        if (filetype === 'absolute') {
          if (this._fs.existsSync(args.path)) {
            return { path: args.path };
          }
          return undefined;
        //deal with module
        } else if (filetype === 'module') {
          const module = require.resolve(args.path, { 
            paths: [ args.resolveDir ] 
          });
          if (this._fs.existsSync(module)) {
            return { path: module };
          }
          return undefined;
        //if the importer isn't in the vfs
        } else if (!(args.importer in files)) {
          //then let someone else handle it
          return undefined;
        }

        //filetype can only be pwd or cwd

        const basename = filetype === 'cwd'
          ? path.resolve(this._compiler.cwd, args.path.substring(2))
          : path.resolve(path.dirname(args.importer), args.path);

        for (const extname of ['.ts', '.js', '.json']) {
          const absolute = basename + extname;
          //catch files in vfs
          if (absolute in files) {
            return { path: absolute, namespace: name };
          }
          if (this._fs.existsSync(absolute)) {
            return { path: absolute };
          }
        }

        return undefined;
      });

      build.onLoad({ filter: /.*/, namespace: name }, args => {
        if (args.path in files) {
          return {
            contents: files[args.path](),
            loader: 'ts'
          };
        }

        return undefined;
      });
    }
  };
}