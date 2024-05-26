import type { CompilerOptions } from '@ossph/temple-compiler';
import { urlToRequest } from 'loader-utils';
//import { validate } from 'schema-utils';
import { TempleBuilder, DocumentCompiler } from '@ossph/temple-compiler';

type Loader = {
  async: () => (error: Error|null, results: string) => void,
  getOptions: () => Record<string, any>,
  resourcePath: string
}

type LoaderFunction = (this: Loader, source: string) => void;

const templeLoader: LoaderFunction = function () {
  const self = this as unknown as Loader;
  const callback = this.async();
  const options: CompilerOptions = self.getOptions() || {};
  const inputPath = urlToRequest(self.resourcePath).replace('.//', '/');
  // Apply some transformations to the source...
  //make a new compiler
  const compiler = new DocumentCompiler(inputPath, {
    ...options,
    registerChildren: false
  });
  //make a new builder
  const builder = new TempleBuilder(compiler, false);
  //return the engine
  builder.load().then(source => {
    callback(null, source.render());
  });
};

export default templeLoader;