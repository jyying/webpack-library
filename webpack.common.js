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
          {
            loader: "css-loader",
          },
          "less-loader"
        ]
      },
      {
        test: /\.js|jsx$/,
        // exclude: /node_modules/,
        include: [
          path.resolve(__dirname, "demo"),
          path.resolve(__dirname, "node_modules/frappe-gantt"),
        ],
        use: [
          {
            loader: 'babel-loader'
          },
          "babel-loader",
        ]
      },
      {
        test: /\.(png|jpg|gif|eot|svg|ttf|woff|woff2)\??.*$/,
        loader: 'url-loader?limit=8192&name=images/[hash:5].[name].[ext]'
      },
    ]
  },
  resolve: {
    // extensions: ['', '.js', '.jsx', '.jpg', '.png'],
    // alias: {
    //   '@ant-design/icons/lib/dist$': path.resolve(__dirname, './src/config/icons.js')
    // }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].[hash].css',
    }),
    // new BundleAnalyzerPlugin() // 查看打包后的体积比例
  ],
}
module.exports = merge(exWebpack, _webpack)
