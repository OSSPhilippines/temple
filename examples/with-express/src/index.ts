import path from 'path';
import express from 'express';
import temple from '@ossph/temple/compiler';
import engine, { develop, build } from '@ossph/temple-express';

//create temple compiler
const compiler = temple({ 
  cwd: __dirname, 
  buildRoute: '/build/',
  buildPath: path.resolve(__dirname, '../.build')
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

//use the build middleware
app.use(build(compiler));
//open public folder
app.use(express.static('public'));

//routes
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