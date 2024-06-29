# ⛩️ Temple Parser

This package is designed for [Temple](https://github.com/OSSPhilippines/temple),
the reactive web component template engine. See [docs](https://github.com/OSSPhilippines/temple)
for more information.

Parses the Temple markup language to an abstract syntac tree (AST). 
This is used by the [@ossph/temple-compiler](https://github.com/OSSPhilippines/temple/tree/main/packages/temple-compiler) to convert the Temple markup language to 
JavaScript and HTML.

## Install

```bash
$ npm -i @ossph/temple-parser
```

## Basic Usage

```js
import { TempleParser } from '@ossph/temple-parser';

const ast = TempleParser.parse('<h1>Hello World</h1>');
```