
import type { CompilerOptions } from '@ossph/temple-compiler';
export type * from '@ossph/temple-parser';
export type * from '@ossph/temple-compiler';

import { TempleCompiler, TempleBuilder } from '@ossph/temple-compiler';

export * from '@ossph/temple-parser';
export * from '@ossph/temple-compiler';

export type BuilderOptions = CompilerOptions & {
  useCache?: boolean;
};

function engine(options: BuilderOptions = {}) {
  const { useCache, ...compilerOptions } = options;
  return (sourceFile: string) => {
    //make a new compiler
    const compiler = new TempleCompiler(sourceFile, compilerOptions);
    //make a new builder
    const builder = new TempleBuilder(compiler, useCache);
    //return the engine
    return builder.engine();
  };
}

function document(options: BuilderOptions = {}) {
  const { useCache, ...compilerOptions } = options;
  return (sourceFile: string) => {
    //make a new compiler
    const compiler = new TempleCompiler(sourceFile, compilerOptions);
    //make a new builder
    const builder = new TempleBuilder(compiler, useCache);
    //return the engine
    return builder.document();
  };
}

export { engine, document };