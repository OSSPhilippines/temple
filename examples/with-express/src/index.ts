import path from 'path';
import express from 'express';
import temple from '@ossph/temple/compiler';
import { view, dev } from '@ossph/temple-express';

//create temple compiler
const compiler = temple({ cwd: __dirname, minify: false });

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

//open public folder
app.use(express.static('public'));

//routes
app.get('/build/:build', async (req, res) => {
  //get filename ie. abc123.js
  const filename = req.params.build;
  //get asset
  const { type, content } = await compiler.asset(filename);
  //send response
  res.type(type).send(content);
});

app.get('/', async (req, res) => {
  //now use the temple template engine
  res.render('index', {
    title: 'Temple',
    description: 'Edit this file to change the content of the page.',
    start: 0,
    list: [
      'Edit this file',
      'Restyle this page',
      'Create your own component',
      'Star the Temple Repo',
      'Write a blog post about Temple',
      'Fork the respository',
      'Contribute to the project'
    ]
  })
  res.type('text/html');
});

//listen
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});