const path = require('path')
const express = require('express')
const app = express()

const webpack = require('webpack')
const webpackConfig = require('../webpack.common')

const compiler = webpack(webpackConfig)

const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
})

compiler.hooks.done.tap('myPlugin', (stats) => {
  console.log('编译完成,8081')
})

// webpackDevMiddleware(compiler, {
//   publicPath: webpackConfig.output.publicPath,
//   writeToDisk: true,
// })

app.get('/', function (req, res, next) {
  const filename = path.join(compiler.outputPath + '/index.html')
  console.log(req.url, '==============', filename)
  compiler.outputFileSystem.readFile(filename, (err, result) => {
    if (err) {
      return (next(err))
    }
    res.set('content-type', 'text/html')
    res.send(result)
    res.end()
  })
})

app.use(webpackDevMiddleware)

app.listen(8081)