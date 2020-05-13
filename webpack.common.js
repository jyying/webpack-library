const path = require('path')
const merge = require('webpack-merge')

// 合并css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
let exWebpack = {}
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
  exWebpack = require('./webpack.dev')
} else if (process.env.NODE_ENV === 'library') {
  exWebpack = require('./webpack.library')
} else {
  exWebpack = require('./webpack.prod')
}

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
          path.resolve(__dirname, "components"),
          path.resolve(__dirname, "containers"),
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
    // extensions: ['.js', '.jsx'],
    // alias: {
    //   '@ant-design/icons/lib/dist$': path.resolve(__dirname, './src/config/icons.js')
    // }
    alias: {
      components: path.join(__dirname, 'components'),
      containers: path.join(__dirname, 'containers'),
    }
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
