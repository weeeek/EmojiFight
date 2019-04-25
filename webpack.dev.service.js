// sudo npm run dev
// 为什么加sudo?因为使用了80端口，所以加sudo，如果不使用80端口就不用加sudo
var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");
var webpackConfig = require('./webpack.config.js');
var compiler = webpack(webpackConfig);
var server = new WebpackDevServer(compiler, {  
  hot: true,
  historyApiFallback: true,
  // It suppress error shown in console, so it has to be set to false.
  quiet: false,
  // It suppress everything except error, so it has to be set to false as well
  // to see success build.
  noInfo: false,
  stats: {
      // Config for minimal console.log mess.
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false
  },  
  // contentBase不要直接指向pages，因为会导致css、js支援加载不到
  contentBase: __dirname + '/src/',
}).listen(80, '0.0.0.0', function (err) {
  if (err) {
      console.log(err);
  }
});