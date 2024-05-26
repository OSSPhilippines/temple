
import type { CompilerOptions } from '@ossph/temple-compiler';
export type * from '@ossph/temple-parser';
export type * from '@ossph/temple-compiler';

import { DocumentCompiler, TempleBuilder } from '@ossph/temple-compiler';

export * from '@ossph/temple-parser';
export * from '@ossph/temple-compiler';

export type BuilderOptions = CompilerOptions & {
  useCache?: boolean;
};

/**
 * Returns a server version of TempleComponent 
 * and a default render function
 * 
 * For Interface:
 * - temple(..options...).load(file).TempleComponent
 * - temple(..options...).load(file).render(props)
 * - temple(..options...).source(file)
 */
export default function temple(options: BuilderOptions = {}) {
  return {
    async load(sourceFile: string) {
      //make a new compiler
      const compiler = new DocumentCompiler(sourceFile, {
        ...options,
        registerChildren: false
      });

      //make a new builder
      const builder = new TempleBuilder(
        compiler, 
        options.useCache || false
      );

      const source = await builder.load();

      return (props: Record<string, any>) => {
        return source.render(props);
      };
    },
    source(sourceFile: string) {
      //make a new compiler
      const compiler = new DocumentCompiler(sourceFile, options);

      //make a new builder
      const builder = new TempleBuilder(
        compiler, 
        options.useCache || false
      );

      return builder.source();
    }
  };
};