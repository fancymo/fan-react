const webpack = require('webpack');
const webpackBaseConfig = require('./webpack.base.config.js');

webpackBaseConfig.output.publicPath = '../';  // 文件引用路径
webpackBaseConfig.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
    output: {
      comments: false,
    },
  })
  );

module.exports = Object.assign({}, webpackBaseConfig);
