import path from 'path';
import restify from 'restify';
import { Router } from 'restify-router';
import temple from '@ossph/temple/compiler';

const cwd = path.dirname(__dirname);

//general options for temple
const compiler = temple({ cwd: __dirname, minify: false });

const server = restify.createServer();
const router = new Router();
router.get('/', async (req, res, next) => {
  //res.contentType = 'text/html';
  res.end(await compiler.render('./pages/index.dtml', {
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
  }));
  next();
});

router.get('/build/:build', async (req, res, next) => {
  //get filename ie. abc123.js
  const filename = req.params.build;
  //get asset
  const { type, content } = await compiler.asset(filename);
  //send response
  res.contentType = type;
  res.end(content);
  next();
});

router.applyRoutes(server);

server.get(
  '/*', 
  restify.plugins.serveStaticFiles(
    path.join(cwd, 'public')
  )
); 

server.listen(3000, function() {
  console.log('%s listening at %s', server.name, server.url);
});