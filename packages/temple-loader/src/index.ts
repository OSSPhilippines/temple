import type { TempleOptions } from '@ossph/temple/server';
import type { WebpackLoader, LoaderFunction } from './types';

import fs from 'fs';
import path from 'path';
import { urlToRequest } from 'loader-utils';
import { 
  ComponentTranspiler, 
  Component, 
  FileLoader,
  toJS
} from '@ossph/temple/server';

const componentLoader: LoaderFunction = function () {
  const self = this as unknown as WebpackLoader;
  const callback = this.async();
  //get compiler options from webpack.config.js
  const options: TempleOptions = self.getOptions() || {};
  //get the input path (this is the resource path from the entry or any import)
  const inputPath = urlToRequest(self.resourcePath).replace('.//', '/');
  //create a new compiler
  const compiler = new Component(inputPath, { ...options });
  //create a new file loader
  const loader = new FileLoader(options.fs || fs);
  //determine the tsconfig path
  const tsconfig = loader.absolute(
    options.tsconfig || path.resolve(__dirname, '../tsconfig.json'), 
    compiler.cwd
  );
  //create a new generator
  const transpiler = new ComponentTranspiler(compiler, tsconfig);
  const code = toJS(transpiler.transpile());
  callback(null, code);
};

export default componentLoader;