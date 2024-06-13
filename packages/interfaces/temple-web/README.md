# ⛩️ Temple - Webpack Example

Boilerplate using Webpack and Temple as a frontend framework.

## Integration Example

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