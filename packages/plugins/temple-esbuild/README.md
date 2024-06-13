# ⛩️ Temple Loader

This package is designed for [Temple](https://github.com/OSSPhilippines/temple),
the reactive web component template engine. See [docs](https://github.com/OSSPhilippines/temple)
for more information.

Webpack support for the Temple markup language.

## Install

```bash
$ npm -i @ossph/temple-loader
```

## Usage

```js
// webpack.config.js
module.exports = {
  entry: './src/app.tml',
  output: { filename: 'app.js' },
  module: {
    rules: [
      {
        test: /\.tml$/,
        use: '@ossph/temple-loader',
        exclude: /node_modules/,
      }
    ],
  },
  resolve: { extensions: ['.tml'] }
};
```
