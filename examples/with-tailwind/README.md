# ⛩️ Temple - Express Example

Boilerplate using Express and Temple as a template engine.

## Integration Example

```js
import express from 'express';
import { document } from '@ossph/temple/server';

const app = express();
//general options for temple
const template = document({
  buildFolder: '../.temple',
  cwd: __dirname,
  useCache: false
});
//let's use express' template engine feature
app.engine(
  'tml',
  async (
    filePath: string,
    options: Record<string, any>,
    callback: (err: Error | null, results: string | undefined) => void,
  ) => {
    const render = await template(filePath);
    const results = render(options);
    callback(null, results);
  },
);
//set the view engine to temple
app.set('views', './templates');
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
```