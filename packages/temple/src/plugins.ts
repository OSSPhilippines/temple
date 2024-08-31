//types
import type { PluginBuild } from 'esbuild';
import type { 
  AliasPluginOptions,
  ComponentPluginOptions,
  DocumentPluginOptions
} from './types';

import path from 'path';
import FileSystem from './filesystem/NodeFS';
import Component from './compiler/Component';
import ComponentTranspiler from './compiler/Transpiler';
import DocumentTranspiler from './document/Transpiler';
import { toTS } from './helpers';

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