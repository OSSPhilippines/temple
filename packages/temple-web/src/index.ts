import type { Request, Response } from 'express';
import type { TempleEvent, DocumentBuilder } from '@ossph/temple/compiler';

import path from 'path';
import express from 'express';
import temple, { cache } from '@ossph/temple/compiler';
import { view, dev } from '@ossph/temple-express';
import { tui } from '@ossph/temple-ui';

type Next = () => void;

const docs = path.join(__dirname, '../../../docs');

//create temple compiler
const compiler = temple({ 
  brand: '',
  cwd: __dirname,
  minify: false
});

//use temple ui
compiler.use(tui({ brand: '' }));

//use build cache
compiler.use(cache({ 
  environment: process.env.NODE_ENV,
  buildPath: path.join(docs, 'build') 
}));

//on post markup build, cache (dev and live)
compiler.emitter.on('rendered', (event: TempleEvent<string>) => {
  //extract builder and sourcecode from params
  const builder = event.params.builder as DocumentBuilder;
  const html = event.params.html as string;
  //get fs and id ie. abc123c
  const { fs, absolute } = builder.document;
  const root = path.join(__dirname, 'pages');
  if (absolute.startsWith(root)) {
    const extname = path.extname(absolute);
    const route = absolute.substring(
      root.length + 1, 
      absolute.length - extname.length
    );
    //get file path ie. /path/to/docs/client/abc123c.html
    const cache = path.join(docs, `${route || 'index'}.html`);
    //write the client source code to cache
    const dirname = path.dirname(cache);
    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname, { recursive: true });
    }
    fs.writeFileSync(cache, html);
  }
});

//create express app
const app = express();
//set the view engine to temple
app.set('views', path.join(__dirname, 'pages'));
app.set('view engine', 'dtml');

//if production (live)
if (process.env.NODE_ENV === 'production') {
  //let's use express' template engine feature
  app.engine('dtml', view(compiler));
  //...other production settings...
//if development mode
} else {
  //get development middleware
  const { router, view } = dev({ cwd: __dirname });
  //use development middleware
  app.use(router);
  //let's use express' template engine feature
  app.engine('dtml', view(compiler));
}

//routes
app.get('/temple/build/client/:build', async (req, res) => {
  //get filename ie. abc123.js
  const filename = req.params.build;
  //get asset
  const { type, content } = await compiler.asset(filename);
  //send response
  res.type(type).send(content);
});

app.get('/temple/', (req, res) => {
  const props = { title: 'Temple Documentation' };
  return res.type('text/html').render('index', props);
});

app.get('/temple/**', (req, res) => {
  const { fs } = compiler;
  const props = { title: 'Temple Documentation' };
  // from /temple/index.html to index
  const route = (() => {
    const route = req.path.endsWith('.html')
      ? req.path.substring(8, req.path.length - 5)
      : req.path.substring(8);
    return route.length === 0 ? 'index' : route;
  })();
  //try /path/to/pages/[route].dtml
  const template = path.join(__dirname, 'pages', route + '.dtml');
  if (fs.existsSync(template)) {
    return res.type('text/html').render(route, props);
  }
  //else if static file
  const resource = (req.url || '').substring(8).replace(/\/\//, '/'); 
  const file = path.join(docs, resource); 
  if (fs.existsSync(file)) {
    return res.status(200).sendFile(file);
  }
  res.status(404).end('Not Found');
});

//error handling
app.use((error: Error, req: Request, res: Response, next: Next) => {
  if (error) {
    res.status(500);
    res.render('500', { error: error.message });
    return;
  }
  next();
});

//listen
app.listen(3000, () => {
  console.log(`HTTP server is running on http://localhost:3000`);
});