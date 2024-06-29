import fs from 'fs';
import path from 'path';
import express from 'express';
import temple from '@ossph/temple/server';
import { dev, inject } from '@ossph/temple-dev';

const engine = temple({ 
  cwd: __dirname, 
  minify: false,
  build: '../.temple',
  brand: '' 
});

//setup an HTTP server
const app = express();
//let's use express' template engine feature
app.engine(
  'html',
  async (
    filePath: string,
    options: Record<string, any>,
    callback: (err: Error | null, results: string | undefined) => void,
  ) => {
    const { settings, _locals, cache, ...props } = options;
    const render = await engine.load(filePath);
    callback(null, inject(render(props)));
  },
);
//set the view engine to temple
app.set('views', path.join(__dirname, 'pages'));
app.set('view engine', 'html');

//open public folder
app.use('/temple', express.static('public'));
//attach the dev middleware
app.use(dev({ cwd: __dirname }));

app.get('/temple/**', (req, res) => {
  const props = { title: 'Temple Documentation' };
  // ex. app
  const route = req.path.substring(8);
  //if route is empty, go to index
  if (route.length === 0) {
    res.type('text/html');
    return res.render('index', props);
  }
  //try templates/app.html
  let template = path.join(__dirname, 'pages', route + '.html');
  if (fs.existsSync(template)) {
    res.type('text/html');
    return res.render(route, props);
  }
  //try templates/app/index.html
  template = path.join(__dirname, 'pages', route, 'index.html');
  if (fs.existsSync(template)) {
    res.type('text/html');
    return res.render(`${route}/index`, props);
  }

  res.status(404).send('Not Found');
});

app.listen(3000, () => {
  console.log(`HTTP server is running on http://localhost:3000`);
});