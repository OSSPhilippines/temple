# ⛩️ Temple Tailwind

This package is designed for [Temple](https://github.com/OSSPhilippines/temple),
the reactive web component template engine. See [docs](https://github.com/OSSPhilippines/temple)
for more information.

TailwindCSS support for the Temple markup language.

## Install

```bash
$ npm -i @ossph/temple-tailwind
```

## Usage

```js
import temple from '@ossph/temple/compiler';
import { tailwind } from '@ossph/temple-tailwind';

//create temple compiler
const compiler = temple({ cwd: __dirname });
//and use tailwind...
compiler.use(tailwind({
  darkMode: 'class',
  theme: { extend: {} },
  plugins: [],
  content: []
}));
```
