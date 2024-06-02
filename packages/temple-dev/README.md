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
import express from 'express';
import temple from '@ossph/temple/server';
import { dev, inject } from '@ossph/temple-dev';

//setup a template engine
const engine = temple({ cwd: __dirname });
//setup an HTTP server
const app = express();
//attach the dev middleware
app.use(dev({ cwd: __dirname }));

app.get('/', async (req, res) => {
  const render = await engine.load('./templates/page.tml');
  //here we are going to inject the dev 
  //script needed to listen to the server
  res.send(inject(render()));
});

app.listen(3000);
```