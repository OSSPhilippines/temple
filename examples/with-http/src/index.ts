import path from 'path';
import http from 'http';
import temple from '@ossph/temple/compiler';
import { develop, inject } from '@ossph/temple-dev';

const assets = path.resolve(__dirname, '../public');

//create temple compiler
const compiler = temple({ 
  cwd: __dirname, 
  buildRoute: '/build/',
  buildPath: path.resolve(__dirname, '../.build')
});
const fs = compiler.options.fs;
//setup the dev server
const { refresh, serve: dev } = develop(compiler);
const build = compiler.serve();

const server = http.createServer(async (req, res) => {
  //if temple dev server files
  if (dev(req, res)) {
    return;
  //if build files
  } else if (await build(req, res)) {
    return;
  //else if home page
  } else if (req.url === '/') {
    //load a builder
    const builder = compiler.builder('./pages/index.dtml');
    //set props
    const props = {
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
    };
    //register the builder in the dev refresh server
    refresh.register(builder, props);
    //build the component
    const build = await builder.build();
    //render final HTML
    const html = inject(build.document.render(props));
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
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