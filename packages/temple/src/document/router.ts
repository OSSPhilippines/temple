import type { TempleCompiler } from '../types';
import type DocumentBuilder from './Builder';
import type { Request, Response, BuildResults } from '../types';

import path from 'path';
import type Builder from './Builder';

export default function router(
  compiler: TempleCompiler,
  buildRoute: string, 
  buildPath: string
) {
  //initializer
  //get the file system and event emitter
  const { emitter, options: { fs } } = compiler;
  //determine the manifest path
  const manifestPath = path.join(buildPath, 'manifest.json');
  //load the manifest
  const manifest: Record<string, string> = fs.existsSync(manifestPath) 
    ? JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
    : {};
  //events
  emitter.on('manifest-resolve', (id: string) => {
    //if the id is not already in the manifest
    if (!compiler.manifest.has(id) 
      //and the manifest has the id as a string
      && typeof manifest[id] === 'string'
    ) {
      compiler.manifest.set(id, manifest[id]);
      return;
    }
  });

  emitter.on('manifest-resolved', (id: string, file: string) => {
    //if its in the manifest
    if (typeof manifest[id] === 'string') {
      //it means its also in the manifest file
      return;
    }
    //update the manifest
    manifest[id] = file;
    //write the manifest to the file system
    write(manifestPath, JSON.stringify(manifest, null, 2));
  });

  emitter.on('build', (build: BuildResults, builder: Builder) => {
    //set the manifest
    compiler.manifest.set(
      builder.document.id, 
      builder.document.absolute
    );
  });

  emitter.on('build-server', (
    results: { source?: string }, 
    builder: DocumentBuilder
  ) => {
    //get id from the builder document
    const { id } = builder.document;
    //determine the cache file path
    const cache = path.join(buildPath, `${id}s.js`);
    //set the source code to the cache file
    results.source = results.source || read(cache);
  });
  
  emitter.on('built-server', (
    sourceCode: string, 
    builder: DocumentBuilder
  ) => {
    //get id from the builder document
    const { id } = builder.document;
    //determine the cache file path
    const cache = path.join(buildPath, `${id}s.js`);
    write(cache, sourceCode);
  });
  
  emitter.on('build-client', (
    results: { source?: string }, 
    builder: DocumentBuilder
  ) => {
    //get id from the builder document
    const { id } = builder.document;
    //determine the cache file path
    const cache = path.join(buildPath, `${id}c.js`);
    //set the source code to the cache file
    results.source = results.source || read(cache);
  });
  
  emitter.on('built-client', (
    sourceCode: string, 
    builder: DocumentBuilder
  ) => {
    //get id from the builder document
    const { id } = builder.document;
    //determine the cache file path
    const cache = path.join(buildPath, `${id}c.js`);
    write(cache, sourceCode);
  });
  
  emitter.on('build-styles', (
    results: { source?: string }, 
    builder: DocumentBuilder
  ) => {
    //get id from the builder document
    const { id } = builder.document;
    //determine the cache file path
    const cache = path.join(buildPath, `${id}c.css`);
    //set the source code to the cache file
    results.source = results.source || read(cache);
  });
  
  emitter.on('built-styles', (
    sourceCode: string, 
    builder: DocumentBuilder
  ) => {
    //get id from the builder document
    const { id } = builder.document;
    //determine the cache file path
    const cache = path.join(buildPath, `${id}c.css`);
    write(cache, sourceCode);
  });
  
  emitter.on('build-markup', (
    results: { source?: string }, 
    builder: DocumentBuilder
  ) => {
    //get id from the builder document
    const { id } = builder.document;
    //determine the cache file path
    const cache = path.join(buildPath, `${id}c.html`);
    //set the source code to the cache file
    results.source = results.source || read(cache);
  });
  
  emitter.on('built-markup', (
    sourceCode: string, 
    builder: DocumentBuilder
  ) => {
    //get id from the builder document
    const { id } = builder.document;
    //determine the cache file path
    const cache = path.join(buildPath, `${id}c.html`);
    write(cache, sourceCode);
  });

  //helpers
  const read = (cache: string) => {
    return fs.existsSync(cache) 
      ? fs.readFileSync(cache, 'utf8') 
      : undefined;
  };
  
  const write = (cache: string, source: string) => {
    //if the cache file doesnt exist
    if (!fs.existsSync(cache)) {
      const dirname = path.dirname(cache);
      //if the cache directory doesnt exist
      if (!fs.existsSync(dirname)) {
        //create the cache directory
        fs.mkdirSync(dirname, { recursive: true });
      }
      //write the source code to the cache file
      fs.writeFileSync(cache, source);
    }
  };

  return async (req: Request, res: Response) => {
    //build files
    if (req.url?.startsWith(buildRoute)) {
      //determine the file extension (.js, .css)
      const extname = path.extname(req.url);
      //determine the cache file path
      //ie. /path/to/build/abc123s.js
      const cache = path.join(
        buildPath, 
        req.url.substring(buildRoute.length + 1)
      );
      //if cache file exists
      if (fs.existsSync(cache)) {
        //if its a css file
        if (extname === '.css') {
          res.writeHead(200, { 'Content-Type': 'text/css' });
        //if its a js file
        } else if (extname === '.js') {
          res.writeHead(200, { 'Content-Type': 'text/javascript' });
        //if its an html file
        } else if (extname === '.html') {
          res.writeHead(200, { 'Content-Type': 'text/html' });
        }
        //stream the existing cache file to the response
        fs.createReadStream(cache).pipe(res);
        return true;
      }
      
      //the cache file doesnt exist...

      //extract the id from the url
      //ie. /build/abc123s.js -> abc123
      const id = req.url.substring(7, req.url.length - extname.length - 1);
      //check the manifest for the id
      const entry = compiler.manifest.get(id);
      //if we have an entry file path from the manifest
      if (entry) {
        //create a builder
        const builder = compiler.builder(entry);
        //if its a css file
        if (extname === '.css') {
          const clientCSS = await builder.styles();
          res.writeHead(200, { 'Content-Type': 'text/css' });
          //send styles to the response
          res.end(clientCSS);
          return true;
        //if its a js file
        } else if (extname === '.js') {
          const clientJS = await builder.client();
          res.writeHead(200, { 'Content-Type': 'text/javascript' });
          //send the js client to the response
          res.end(clientJS);
          return true;
        }
      }
    }
    return false;
  };
};