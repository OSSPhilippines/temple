import path from 'path';
import express from 'express';
import engine from '@ossph/temple-express';

const app = express();
//let's use express' template engine feature
app.engine('tml', engine({ cwd: __dirname }));
//set the view engine to temple
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'tml');

app.get('/', async (req, res) => {
  //now use the temple template engine
  res.render('page', {
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

//open public folder
app.use(express.static('public'));

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});