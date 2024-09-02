# ⛩️ Temple Express

This package is designed for [Temple](https://github.com/OSSPhilippines/temple),
the reactive web component template engine. See [docs](https://github.com/OSSPhilippines/temple)
for more information.

Temple plugin for Express and native HTTP.

## Install

```bash
$ npm -i @ossph/temple-express
```

## Usage

```js
import path from 'path';
import express from 'express';
import engine from '@ossph/temple-express';

const app = express();
//let's use express' template engine feature
app.engine('tml', engine({ cwd: __dirname }));
//set the view engine to temple
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'tml');
//..other routes
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
```
