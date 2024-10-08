import path from 'path';
import Koa from 'koa';
import Router from 'koa-router';
import serve from 'koa-static';
import temple from '@ossph/temple/compiler';
const app = new Koa();

const compiler = temple({ cwd: __dirname });

const router = new Router();
router
  .get('/', async (ctx, next) => {
    ctx.body = await compiler.render('./pages/index.dtml', {
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
  })
  .get('/build/:build', async (ctx, next) => {
    //get filename ie. abc123.js
    const filename = ctx.params.build;
    //get asset
    const { type, content } = await compiler.asset(filename);
    //send response
    ctx.type = type;
    ctx.body = content;
  });

app.use(router.routes());
app.use(router.allowedMethods());   
app.use(serve(path.join(path.dirname(__dirname), 'public')));  


app.listen(3000);
