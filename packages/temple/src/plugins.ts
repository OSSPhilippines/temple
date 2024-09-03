//types
import type { PluginBuild } from 'esbuild';
import type { 
  TemplePluginOptions,
  AliasPluginOptions,
  ComponentPluginOptions,
  DocumentPluginOptions
} from './types';

import path from 'path';
import FileSystem from './filesystem/NodeFS';
import FileLoader from './filesystem/FileLoader';
import Component from './compiler/Component';
import ComponentTranspiler from './compiler/Transpiler';
import DocumentTranspiler from './document/Transpiler';
import { toTS } from './helpers';

export function esAliasPlugin(options: AliasPluginOptions = {}) {
  const { 
    cwd = process.cwd(), 
    fs = new FileSystem() 
  } = options;
  const name = 'temple-alias-plugin';
  return {
    name: name,
    setup: (build: PluginBuild) => {
      build.onResolve({ filter: /^@\// }, args => {
        const absolute = path.resolve(cwd, args.path.replace('@/', ''));
        
        if (fs.existsSync(absolute) 
          && fs.lstatSync(absolute).isFile()
        ) {
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
          let file = absolute + extname;
          if (fs.existsSync(file) && fs.lstatSync(file).isFile()) {
            if (absolute.endsWith('.ts')) {
              return { path: file, loader: 'ts' };
            }
            return { path: file };
          }
          file = path.resolve(absolute, 'index' + extname);
          if (fs.existsSync(file) && fs.lstatSync(file).isFile()) {
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

export function esComponentPlugin(options: ComponentPluginOptions = {}) {
  const { 
    tsconfig, 
    extname = '.tml',
    cwd = process.cwd(),
    fs = new FileSystem(),
    ...config
  } = options;
  const name = 'temple-component-plugin';
  const filter = new RegExp(`\\.${extname.substring(1)}$`);
  const loader = new FileLoader(fs, cwd);
  return {
    name: name,
    setup: (build: PluginBuild) => {
      build.onResolve({ filter }, args => {
        const pwd = path.dirname(args.importer) || cwd;
        const extnames = [ extname ];
        const resolved = loader.resolve(args.path, pwd, extnames);
        return resolved
          ? { path: resolved, namespace: name } 
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
          resolveDir: path.dirname(args.path),
          loader: 'ts'
        };
      });
    }
  };
};

export function esDocumentPlugin(options: DocumentPluginOptions = {}) {
  const { 
    tsconfig, 
    extname = '.dtml',
    cwd = process.cwd(),
    fs = new FileSystem(),
    ...config
  } = options;
  const name = {
    server: 'temple-document-server-plugin',
    client: 'temple-document-client-plugin'
  };
  const filter = new RegExp(`\\.${extname.substring(1)}$`);
  const loader = new FileLoader(fs, cwd);
  return {
    server: {
      name: name.server,
      setup: (build: PluginBuild) => {
        build.onResolve({ filter }, args => {
          const pwd = path.dirname(args.importer) || cwd;
          const extnames = [ extname ];
          const resolved = loader.resolve(args.path, pwd, extnames);
          return resolved
            ? { path: resolved, namespace: name.server } 
            : undefined;
        });
  
        build.onLoad({ filter, namespace: name.server }, args => {
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
      name: name.client,
      setup: (build: PluginBuild) => {
        build.onResolve({ filter }, args => {
          const pwd = path.dirname(args.importer) || cwd;
          const extnames = [ extname ];
          const resolved = loader.resolve(args.path, pwd, extnames);
          return resolved
            ? { path: resolved, namespace: name.client } 
            : undefined;
        });
  
        build.onLoad({ filter, namespace: name.client }, args => {
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

export function esTemplePlugin(options: TemplePluginOptions = {}) {
  const { 
    tsconfig,
    cwd = process.cwd(), 
    fs = new FileSystem(),
    mode = 'server',
    component_extname = '.tml',
    document_extname = '.dtml',
    ...config
  } = options;
  const loader = new FileLoader(fs, cwd);
  const extnames = [ 
    '.js', '.json', '.ts', 
    component_extname, 
    document_extname 
  ];
  return {
    name: 'temple-plugin',
    setup: (build: PluginBuild) => {
      //should resolve everything...
      build.onResolve({ filter: /.*/ }, args => {
        const pwd = args.importer ? path.dirname(args.importer): cwd;
        const resolved = loader.resolve(args.path, pwd, extnames);

        if (resolved) {
          //if component
          if (resolved.endsWith(component_extname)) {
            return { 
              path: resolved, 
              namespace: 'temple-component-resolver' 
            };
          //if document
          } else if (resolved.endsWith(document_extname)) {
            return { 
              path: resolved, 
              namespace: mode === 'server' 
                ? 'temple-document-server-resolver' 
                : 'temple-document-client-resolver' 
            };
          }
          return { path: resolved };
        }

        return undefined;
      });

      build.onLoad({ 
        filter: new RegExp(`\\.${document_extname.substring(1)}$`), 
        namespace: 'temple-document-server-resolver' 
      }, args => {
        const document = new Component(args.path, { 
          ...config, 
          fs, 
          cwd, 
          type: 'document' 
        });
        const transpiler = new DocumentTranspiler(document, tsconfig);
        return {
          contents: toTS(transpiler.transpile()),
          loader: 'ts'
        };
      });

      build.onLoad({ 
        filter: new RegExp(`\\.${document_extname.substring(1)}$`), 
        namespace: 'temple-document-client-resolver' 
      }, args => {
        const document = new Component(args.path, { 
          ...config, 
          fs, 
          cwd, 
          type: 'document' 
        });
        const transpiler = new DocumentTranspiler(document, tsconfig);
        return {
          contents: toTS(transpiler.client()),
          loader: 'ts'
        };
      });

      build.onLoad({ 
        filter: new RegExp(`\\.${component_extname.substring(1)}$`), 
        namespace: 'temple-component-resolver' 
      }, args => {
        const component = new Component(args.path, { 
          ...config, 
          fs, 
          cwd, 
          type: 'component' 
        });
        const transpiler = new ComponentTranspiler(component, tsconfig);
        return {
          contents: toTS(transpiler.transpile()),
          resolveDir: path.dirname(args.path),
          loader: 'ts'
        };
      });
    }
  };
}