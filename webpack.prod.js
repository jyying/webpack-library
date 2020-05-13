const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'production',
  entry: {
    index: path.resolve('./demo/entry/index.js')
  },
  output: {
    filename: '[name][hash].js',
    path: path.resolve(__dirname, './dist/'),
    publicPath: './',
    chunkFilename: '[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './demo/entry/index.html')
    })
  ]
}