const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    index: [path.resolve('./demo/entry/index.js')]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      IS_DEV: JSON.stringify(true),
      'env': "'env'"
    }),
    new HtmlWebpackPlugin({
      title: 'name',
      template: path.resolve(__dirname, './demo/entry/index.html')
    }),
    new CopyWebpackPlugin([
      {
        from: `${__dirname}/static`,
        to: './static'
      }
    ]),
  ]
}
