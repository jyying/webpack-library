const path = require('path')
// 合并css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const _webpack = {
  mode: 'none',
  entry: {
    index: path.resolve('index.js')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './library/'),
    publicPath: './',
    chunkFilename: '[name].js',
    auxiliaryComment: 'Test Comment',
    /**
     * 可以直接文件暴露default属性
     * 所以暴露的文件可以写成 export default {} 形式
     * 否则只能导出一个
     */
    libraryExport: "default",
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          'less-loader',
        ]
      },
      {
        test: /\.sass$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5000,
            },
          },
        ],
      }
    ]
  },
  resolve: {
    alias: {
      // '@ant-design/icons/lib/dist$': path.resolve(__dirname, './src/config/icons.js'),
      components: path.join(__dirname, '../', 'components/')
    }
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   title: 'name',
    //   template: path.resolve(__dirname, '../src/entry/index.html')
    // }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    // new BundleAnalyzerPlugin() // 查看打包后的体积比例
  ],
  externals: {
    react: 'react',
  }
}

module.exports = _webpack