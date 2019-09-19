const path = require('path')
const merge = require('webpack-merge')

// 合并css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const exWebpack = process.env.NODE_ENV === 'development' ?
  require('./webpack.dev') :
  require('./webpack.prod')
const _webpack = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader"
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
          "babel-loader",
          // "eslint-loader"
        ]
      }
    ]
  },
  // resolve: {
  //   alias: {
  //     '@ant-design/icons/lib/dist$': path.resolve(__dirname, './src/config/icons.js')
  //   }
  // },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    // new BundleAnalyzerPlugin() // 查看打包后的体积比例
  ],
  resolve: {
    alias: {
      modify_modules: path.join(__dirname, 'modify_modules')
    }
  }
}
console.log(path.join(__dirname, 'modify_modules'), '------------------')
module.exports = merge(exWebpack, _webpack)