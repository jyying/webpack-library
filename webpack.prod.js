const path = require('path')
module.exports = {
  mode: 'production',
  entry: {
    index: [path.resolve('./index.js')]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './library/'),
    publicPath: './',
    chunkFilename: '[name].js',
    /**
     * 可以直接文件暴露default属性
     * 所以暴露的文件可以写成 export default {} 形式
     * 否则只能导出一个
     */
    libraryExport: "default",
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  plugins: []
}