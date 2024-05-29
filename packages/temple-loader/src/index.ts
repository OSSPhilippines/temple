import type { CompilerOptions } from '@ossph/temple-compiler';
import { urlToRequest } from 'loader-utils';
//import { validate } from 'schema-utils';
import temple from '@ossph/temple/server';

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
  const engine = temple({ ...options, register: true });
  engine
    .source(inputPath)
    .then((code: { client: string, server: string }) => {
      callback(null, code.server);
    })
    .catch(console.log);
};

export default templeLoader;