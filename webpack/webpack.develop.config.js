const webpackBaseConfig = require('./webpack.base.config.js');
const path = require('path');

module.exports = Object.assign({}, webpackBaseConfig, {
  devServer: {
    contentBase: path.resolve(process.cwd(), 'dist'),
    port: 8080,
    host: '0.0.0.0',
    inline: true,
    historyApiFallback: true,
    progress: true,
    // stats: 'minimal'
  },
});
