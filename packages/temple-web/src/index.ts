import type { Request, Response } from 'express';

import fs from 'fs';
import path from 'path';
import express from 'express';
import temple from '@ossph/temple/compiler';
import engine, { develop } from '@ossph/temple-express';

type Next = () => void;

//create temple compiler
const compiler = temple({ 
  cwd: __dirname,
  minify: false,
  brand: '' 
});

//create express app
const app = express();
//set the view engine to temple
app.set('views', path.join(__dirname, 'pages'));
app.set('view engine', 'dtml');

//if production (live)
if (process.env.NODE_ENV === 'production') {
  //let's use express' template engine feature
  app.engine('dtml', engine(compiler));
  //...other production settings...
//if development mode
} else {
  //get development middleware
  const { serve, engine } = develop(compiler);
  //use development middleware
  app.use(serve);
  //let's use express' template engine feature
  app.engine('dtml', engine);
  //...other development settings...
}

//open public folder
app.use('/temple', express.static('public'));
//error handling
app.use((error: Error, req: Request, res: Response, next: Next) => {
  if (error) {
    res.status(500);
    res.render('500', { error: error.message });
    return;
  }
  next();
});

//routes
app.get('/temple/**', (req, res) => {
  const props = { title: 'Temple Documentation' };
  // ex. app
  const route = (() => {
    if (req.path.endsWith('.html')) {
      return req.path.substring(8, req.path.length - 5);
    }
    return req.path.substring(8)
  })();
  //if route is empty, go to index
  if (route.length === 0) {
    res.type('text/html');
    return res.render('index', props);
  }
  //try templates/app.tml
  let template = path.join(__dirname, 'pages', route + '.dtml');
  if (fs.existsSync(template)) {
    res.type('text/html');
    return res.render(route, props);
  }
  //try templates/app/index.tml
  template = path.join(__dirname, 'pages', route, 'index.dtml');
  if (fs.existsSync(template)) {
    res.type('text/html');
    return res.render(`${route}/index`, props);
  }

  res.status(404).send('Not Found');
});

//listen
app.listen(3000, () => {
  console.log(`HTTP server is running on http://localhost:3000`);
});