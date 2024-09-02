# ⛩️ Temple ESBuild

This package is designed for [Temple](https://github.com/OSSPhilippines/temple),
the reactive web component template engine. See [docs](https://github.com/OSSPhilippines/temple)
for more information.

ESBuild support for the Temple markup language.

## Install

```bash
$ npm -i @ossph/temple-esbuild
```

## Usage

```js
import esbuild from 'esbuild';
import { esComponentPlugin } from 'temple-esbuild';

esbuild.build({
  entryPoints: [ './app.tml' ],
  plugins: [ esComponentPlugin() ]
});
```
