# ⛩️ Temple DEV

This package is designed for [Temple](https://github.com/OSSPhilippines/temple),
the reactive web component template engine. See [docs](https://github.com/OSSPhilippines/temple)
for more information.

Temple developer mode with hot page reload. 
Not suited for production environments.

## Install

```bash
$ npm -i @ossph/temple-dev
```

# Usage

```js
import http from 'http';
import temple from '@ossph/temple/compiler';
import { dev } from '@ossph/temple-dev';

//create temple compiler
const compiler = temple({ cwd: __dirname });
//1. create dev tools
const { router, refresh } = dev({ cwd: __dirname });

//create http server
const server = http.createServer(async (req, res) => {
  //2. Add dev router
  if (router(req, res)) return;
  //if home page
  if (req.url === '/') {
    //3. sync builder with refresh server
    refresh.sync(compiler.fromSource('./page.dtml'));
    //compile the document
    const html = await compiler.render('./page.dtml');
    //... send response ...
  }
  //... other routes ...
});
//listen on port 3000
server.listen(3000);
```