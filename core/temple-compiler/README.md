# ⛩️ Temple Compiler

This package is designed for [Temple](https://github.com/OSSPhilippines/temple),
the reactive web component template engine. See [docs](https://github.com/OSSPhilippines/temple)
for more information.

Compiles Temple markup language files to JavaScript and HTML.

## Install

```bash
$ npm -i @ossph/temple-compiler
```

## Basic Usage

```js
import { TempleCompiler } from '@ossph/temple-compiler';

const compiler = new TempleCompiler('/page.html', {...options...});

console.log(compiler.sourceCode);
```

### Compiler Options

| Name        | Description                            |
|-------------|----------------------------------------|
| fs          | File system where temple files located |
| cwd         | The current working directory          |
| brand       | The web component prefix               |
| buildFolder | Where to put cached files              |
| tsconfig    | Location of your tsconfig.json file    |