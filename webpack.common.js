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
        test: /\.sass$/,
        // exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
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
      chunkFilename: '[id].[hash].css',
    }),
    // new BundleAnalyzerPlugin() // 查看打包后的体积比例
  ],
}
module.exports = merge(exWebpack, _webpack)
