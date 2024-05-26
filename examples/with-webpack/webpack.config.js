const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // https://webpack.js.org/concepts/entry-points/#multi-page-application
  entry: {
    index: './src/app.tml'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tml$/,
        use: {
          loader: '@ossph/temple-loader',
          options: { minify: true }
        },
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tml'],
  },
  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    port: 8080
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Temple',
      template: "index.html",
    })
  ]
};
