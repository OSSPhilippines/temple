
import type { 
  CompilerOptions, 
  BuilderOptions 
} from '@ossph/temple-compiler';
export type * from '@ossph/temple-parser';
export type * from '@ossph/temple-compiler';

import { DocumentCompiler, TempleBuilder } from '@ossph/temple-compiler';

export * from '@ossph/temple-parser';
export * from '@ossph/temple-compiler';

export type TempleOptions = CompilerOptions & BuilderOptions;

/**
 * Returns a server version of TempleComponent 
 * and a default render function
 * 
 * For Interface:
 * - temple(..options...).load(file).TempleComponent
 * - temple(..options...).load(file).render(props)
 * - temple(..options...).source(file)
 */
export default function temple(options: TempleOptions = {}) {
  const { 
    cache = false, 
    minify = true, 
    bundle = true, 
    ...compilerOptions 
  } = options;
  const builderOptions = { cache, minify, bundle };
  return {
    async load(sourceFile: string) {
      //make a new compiler
      const compiler = new DocumentCompiler(sourceFile, compilerOptions);
      //make a new builder
      const builder = new TempleBuilder(compiler, builderOptions);
      //get source code from compiler
      const source = await builder.load();
      //return a callback that renders 
      //the template given the props
      return (props: Record<string, any> = {}) => {
        return source.render(props);
      };
    },
    async import(sourceFile: string) {
      //make a new compiler
      const compiler = new DocumentCompiler(sourceFile, compilerOptions);
      //make a new builder
      const builder = new TempleBuilder(compiler, builderOptions);
      //get the { code, TempleComponent, render }
      const chunks = await builder.load();
      //just return the TempleComponent
      return chunks.TempleComponent;
    },
    source(sourceFile: string) {
      //make a new compiler
      const compiler = new DocumentCompiler(sourceFile, compilerOptions);
      //make a new builder
      const builder = new TempleBuilder(compiler, builderOptions);
      //get the source code
      return builder.source();
    }
  };
};