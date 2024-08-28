import path from 'path';
import http from 'http';
import temple from '@ossph/temple/compiler';

const assets = path.resolve(__dirname, '../public');

//create temple compiler
const compiler = temple({ cwd: __dirname });
const fs = compiler.config.fs;

const server = http.createServer(async (req, res) => {
  //if home page
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
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
    return;
  } else if (req.url?.startsWith('/build/')) {
    //get filename ie. abc123.js
    const filename = req.url.substring(7);
    //get asset
    const { type, content } = await compiler.asset(filename);
    //send response
    res.writeHead(200, { 'Content-Type': type });
    res.end(content);
    return;
  }
  
  //else if static file
  const resource = (req.url || '').substring(1).replace(/\/\//, '/'); 
  const file = path.join(assets, resource); 
  if (fs.existsSync(file)) {
    res.writeHead(200);
    fs.createReadStream(file).pipe(res);
    return;
  }
  res.statusCode = 404;
  res.end('Not Found');
});
server.listen(3000);