import type { 
  Hash, 
  TempleCompiler,
  CacheOptions
} from './types';
import type { Event } from './document/EventEmitter';
import type Builder from './document/Builder';
import type Manifest from './document/Manifest';

import path from 'path';

export default function withCache(
  compiler: TempleCompiler, 
  options: CacheOptions
) {
  const { fs, emitter } = compiler;

  const paths = {
    build: options.buildPath,
    manifest: path.join(
      options.buildPath, 
      options.manifestFile || 'manifest.json'
    )
  };

  //write file helper
  const writeFile = (file: string, contents: string) => {
    const dirname = path.dirname(file);
    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname, { recursive: true });
    }
    fs.writeFileSync(file, contents);
  };

  emitter.on('manifest-resolved', (event: Event<string>) => {
    const manifest = event.params.manifest as Manifest
    //write the manifest to the file system
    writeFile(paths.manifest, manifest.toJson());
  });

  //on pre render, try to use cache if live
  emitter.on('render', (event: Event<string>) => {
    //if not live, dont retrieve from cache
    if (process.env.NODE_ENV !== 'production') {
      return;
    }
    //extract props and builder from params
    const props = (event.params.props || {}) as Hash;
    const builder = event.params.builder as Builder;
    //get fs and id ie. abc123c
    const { fs, id } = builder.document;
    //get cache file path ie. /path/to/docs/build/client/abc123c.js
    const cache = path.join(paths.build, 'server', `${id}.js`);
    //if production and cache file exists
    if (fs.existsSync(cache)) {
      //get the build object
      const build = compiler.fromCache(cache);
      //render the document
      const html = build.document.render(props);
      //return the cached content
      event.set(html);
    }
  });

  //on post render, cache (dev and live)
  emitter.on('rendered', (event: Event<string>) => {
    //extract build and builder from params
    const builder = event.params.builder as Builder;
    const html = event.params.html as string;
    //get fs and id ie. abc123c
    const { id } = builder.document;
    //get cache file path ie. /path/to/docs/build/client/abc123c.html
    const cache = path.join(paths.build, 'client', `${id}.html`);
    //write the server source code to cache
    writeFile(cache, html);
  });

  //on pre client build, try to use cache if live
  emitter.on('build-client', (event: Event<string>) => {
    //if not live, dont retrieve from cache
    if (process.env.NODE_ENV !== 'production') {
      return;
    }
    //extract builder from params
    const builder = event.params.builder as Builder;
    //get fs and id ie. abc123c
    const id = builder.document.id;
    //get cache file path ie. /path/to/docs/build/client/abc123c.js
    const cache = path.join(paths.build, 'client', `${id}.js`);
    //if cache file exists, send it
    if (fs.existsSync(cache)) {
      event.set(fs.readFileSync(cache, 'utf8'));
    }
  });

  //on post client build, cache (dev and live)
  emitter.on('built-client', (event: Event<string>) => {
    //extract builder and sourcecode from params
    const builder = event.params.builder as Builder;
    const sourceCode = event.params.sourceCode as string;
    //get fs and id ie. abc123c
    const id = builder.document.id;
    //get cache file path ie. /path/to/docs/build/client/abc123c.js
    const cache = path.join(paths.build, 'client', `${id}.js`);
    //write the client source code to cache
    writeFile(cache, sourceCode);
  });

  //on pre markup build, try to use cache if live
  emitter.on('build-markup', (event: Event<string>) => {
    //if not live, dont retrieve from cache
    if (process.env.NODE_ENV !== 'production') {
      return;
    }
    //extract builder from params
    const builder = event.params.builder as Builder;
    //get fs and id ie. abc123c
    const id = builder.document.id;
    //get cache file path ie. /path/to/docs/build/client/abc123c.html
    const cache = path.join(paths.build, 'client', `${id}.html`);
    //if cache file exists, send it
    if (fs.existsSync(cache)) {
      event.set(fs.readFileSync(cache, 'utf8'));
    }
  });

  //on post markup build, cache (dev and live)
  emitter.on('built-markup', (event: Event<string>) => {
    //extract builder and sourcecode from params
    const builder = event.params.builder as Builder;
    const sourceCode = event.params.sourceCode as string;
    //get fs and id ie. abc123c
    const id = builder.document.id;
    //get cache file path ie. /path/to/docs/build/client/abc123c.html
    const cache = path.join(paths.build, 'client', `${id}.html`);
    //write the client source code to cache
    writeFile(cache, sourceCode);
  });

  //on pre server build, try to use cache if live
  emitter.on('build-server', (event: Event<string>) => {
    //if not live, dont retrieve from cache
    if (process.env.NODE_ENV !== 'production') {
      return;
    }
    //extract builder from params
    const builder = event.params.builder as Builder;
    //get fs and id ie. abc123c
    const id = builder.document.id;
    //get cache file path ie. /path/to/docs/build/server/abc123c.js
    const cache = path.join(paths.build, 'server', `${id}.js`);
    //if cache file exists, send it
    if (fs.existsSync(cache)) {
      event.set(fs.readFileSync(cache, 'utf8'));
    }
  });

  //on post server build, cache (dev and live)
  emitter.on('built-server', (event: Event<string>) => {
    //extract build and builder from params
    const builder = event.params.builder as Builder;
    const sourceCode = event.params.sourceCode as string;
    //get fs and id ie. abc123c
    const { id } = builder.document;
    //get cache file path ie. /path/to/docs/build/client/abc123c.js
    const cache = path.join(paths.build, 'server', `${id}.js`);
    //write the server source code to cache
    writeFile(cache, sourceCode);
  });

  //on pre styles build, try to use cache if live
  emitter.on('build-styles', (event: Event<string>) => {
    //if not live, dont retrieve from cache
    if (process.env.NODE_ENV !== 'production') {
      return;
    }
    //extract builder from params
    const builder = event.params.builder as Builder;
    //get fs and id ie. abc123c
    const id = builder.document.id;
    //get cache file path ie. /path/to/docs/build/client/abc123c.css
    const cache = path.join(paths.build, 'client', `${id}.css`);
    //if cache file exists, send it
    if (fs.existsSync(cache)) {
      event.set(fs.readFileSync(cache, 'utf8'));
    }
  });

  //on post styles build, cache (dev and live)
  emitter.on('built-styles', (event: Event<string>) => {
    //extract builder and sourcecode from params
    const builder = event.params.builder as Builder;
    const sourceCode = event.params.sourceCode as string;
    //get fs and id ie. abc123c
    const id = builder.document.id;
    //get cache file path ie. /path/to/docs/build/client/abc123c.css
    const cache = path.join(paths.build, 'client', `${id}.css`);
    //write the client source code to cache
    writeFile(cache, sourceCode);
  });

  //if there's a manifest
  if (fs.existsSync(paths.manifest)) {
    //load the manifest file
    compiler.manifest.load(
      JSON.parse(fs.readFileSync(paths.manifest, 'utf-8'))
    );
  }

  return compiler;
};