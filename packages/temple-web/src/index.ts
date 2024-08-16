import type { Request, Response } from 'express';

import fs from 'fs';
import path from 'path';
import express from 'express';
import { dev, inject } from '@ossph/temple-dev';
import engine from '@ossph/temple-express';

type Next = () => void;

//setup an HTTP server
const app = express();
//let's use express' template engine feature
app.engine('tml', engine({ 
  cwd: __dirname, 
  minify: false,
  brand: '' 
}, inject));
//set the view engine to temple
app.set('views', path.join(__dirname, 'pages'));
app.set('view engine', 'tml');

//open public folder
app.use('/temple', express.static('public'));
//attach the dev middleware
app.use(dev({ cwd: __dirname }));

//error handling
app.use((err: Error, req: Request, res: Response, next: Next) => {
  console.error(err);
  res.status(500);
  res.render('500', { error: err.message });
  next();
});

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
  let template = path.join(__dirname, 'pages', route + '.tml');
  if (fs.existsSync(template)) {
    res.type('text/html');
    return res.render(route, props);
  }
  //try templates/app/index.tml
  template = path.join(__dirname, 'pages', route, 'index.tml');
  if (fs.existsSync(template)) {
    res.type('text/html');
    return res.render(`${route}/index`, props);
  }

  res.status(404).send('Not Found');
});

app.listen(3000, () => {
  console.log(`HTTP server is running on http://localhost:3000`);
});