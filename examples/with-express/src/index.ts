import express from 'express';
import { temple } from '@blanquera/temple/server';

const app = express();
const template = temple({
  buildPath: '../.temple',
  cwd: __dirname,
  useCache: false
});

app.get('/', async (req, res) => {
  const render = await template('./templates/page.tml');
  const results = render({
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
  });
  res.type('text/html');
  res.send(results);
});

//open public folder
app.use(express.static('public'));

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});