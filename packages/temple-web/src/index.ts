import fs from 'fs';
import path from 'path';
import express from 'express';
import { dev, inject } from '@ossph/temple-dev';
import engine from '@ossph/temple-express';

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

app.get('/temple/**', (req, res) => {
  const props = { title: 'Temple Documentation' };
  // ex. app
  const route = req.path.substring(8);
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