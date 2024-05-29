
import type { CompilerOptions } from '@ossph/temple-compiler';
export type * from '@ossph/temple-parser';
export type * from '@ossph/temple-compiler';

import { 
  DocumentCompiler, 
  DocumentBuilder 
} from '@ossph/temple-compiler';

export * from '@ossph/temple-parser';
export * from '@ossph/temple-compiler';

/**
 * Returns a server version of TempleComponent 
 * and a default render function
 * 
 * For Interface:
 * - temple(..options...).load(file).TempleComponent
 * - temple(..options...).load(file).render(props)
 * - temple(..options...).source(file)
 */
export default function temple(options: CompilerOptions = {}) {
  return {
    async load(sourceFile: string) {
      //make a new compiler
      const compiler = new DocumentCompiler(sourceFile, options);
      //make a new builder
      const builder = new DocumentBuilder(compiler, options);
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
      const compiler = new DocumentCompiler(sourceFile, options);
      //make a new builder
      const builder = new DocumentBuilder(compiler, options);
      //get the { code, TempleComponent, render }
      const chunks = await builder.load();
      //just return the TempleComponent
      return chunks.TempleDocument;
    },
    source(sourceFile: string) {
      //make a new compiler
      const compiler = new DocumentCompiler(sourceFile, options);
      //make a new builder
      const builder = new DocumentBuilder(compiler, options);
      //get the source code
      return builder.source();
    }
  };
};