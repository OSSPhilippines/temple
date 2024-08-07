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
import path from 'path';
import esbuild from 'esbuild';
import { Component } from '@ossph/temple/compiler';
import { tmlPlugin } from 'temple-esbuild';

const document = path.resolve(__dirname, './app.tml');
const component = new Component(document, {...options...});
const tsconfig = path.resolve(__dirname, './tsconfig.json');

esbuild.build({
  entryPoints: [ './app.tml' ],
  plugins: [ tmlPlugin(component, tsconfig) ]
});
```
