import path from 'path';
import restify from 'restify';
import temple from '@ossph/temple/compiler';

const cwd = path.dirname(__dirname);

//general options for temple
const compiler = temple({ cwd: __dirname });

var server = restify.createServer();
server.get('/', async (req, res, next) => {
  const { document } = await compiler.import('./templates/page.tml');
  const results = document.render({
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
  //res.contentType = 'text/html';
  res.end(results);
  next();
});

server.get(
  '/*', 
  restify.plugins.serveStaticFiles(
    path.join(cwd, 'public')
  )
); 

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});