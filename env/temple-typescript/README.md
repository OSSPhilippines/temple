# ⛩️ Temple Typescript

This package is designed for [Temple](https://github.com/OSSPhilippines/temple),
the reactive web component template engine. See [docs](https://github.com/OSSPhilippines/temple)
for more information.

Typescript support for `.tml` and `.dtml` files.

## Install

```bash
$ npm -i @ossph/temple-typescript
```

## Usage

```json
// tsconfig.js
{
  "extends": "@ossph/temple-typescript/tsconfig.json",
  "compilerOptions": {
    ...
  }
}
```

This will allow `.tml` and `.dtml` to be imported in your typescript
like the following.

```js
import TweetBox from './components/tweet-box.tml';

new TweetBox().element;
```

> This package is meant to be used with the temple bundler plugins 
`@ossph/temple-loader`, `@ossph/temple-esbuild`, and `@ossph/temple-rollup`.
