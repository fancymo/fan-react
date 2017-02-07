const PATH = require('path');
const webpack = require('webpack');

const MODULE_PATH = {};
MODULE_PATH.root = PATH.resolve(__dirname, '../');  // 根目录
MODULE_PATH.appRoot = PATH.resolve(MODULE_PATH.root, './src');  // 项目根路径
MODULE_PATH.compileRoot = PATH.resolve(MODULE_PATH.root, './lib');  // 编译根目录

const moduleArray = ['button', 'checkbox'];
const entryConfig = {};
moduleArray.forEach((module) => {
  entryConfig[module] = PATH.resolve(MODULE_PATH.appRoot, `${module}/index.jsx`);
});
console.log(entryConfig);
// entryConfig['index'] = './src/index.js';

module.exports = {
  entry: entryConfig,
  output: {
    path: MODULE_PATH.compileRoot,
    filename: '[name].js',
    chunkFilename: '[chunkhash:8].chunk.js',
    publicPath: '/',  // 编译
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      incluede: [MODULE_PATH.appRoot],
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'stage-2', 'react'],
      },
    }, {
      test: /\.less$/,
      loader: 'style-loader!css-loader!less-loader',
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader!less-loader',
    }, {
      test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
      loader: 'file-loader?name=assets/fonts/[name].[ext]',
    }, {
      test: /\.(png|jpg|jpeg|gif)$/,
      loader: 'url-loader?limit=8192&name=assets/images/[name].[ext]',
    }],
  },
  resolve: {
    extensions: ['', '.js', '.json', '.jsx'],
  },
};
