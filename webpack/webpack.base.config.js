const PATH = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const MODULE_PATH = {};
MODULE_PATH.root = PATH.resolve(__dirname, '../');  // 根目录
MODULE_PATH.appRoot = PATH.resolve(MODULE_PATH.root, './app');  // 项目根路径
MODULE_PATH.compileRoot = PATH.resolve(MODULE_PATH.root, './dist');  // 编译根目录
MODULE_PATH.eslintrc = PATH.resolve(MODULE_PATH.root, './.eslintrc');  // 测试文件

module.exports = {
  entry: [PATH.resolve(MODULE_PATH.root, 'example/app.jsx')],
  output: {
    path: MODULE_PATH.compileRoot,
    filename: '[name].js',
    chunkFilename: '[chunkhash:8].chunk.js',
    publicPath: '/',  // 编译
  },
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
    ],
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
      // loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader'),
      loader: 'style-loader!css-loader!less-loader'
    }, {
      test: /\.css$/,
      // loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
      loader: 'style-loader!css-loader!less-loader'
    }, {
      // 专供iconfont方案使用的，后面会带一串时间戳，需要特别匹配到
      test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
      loader: 'file-loader?name=assets/fonts/[name].[ext]',
    }, {
      test: /\.(png|jpg|jpeg|gif)$/,
      loader: 'url-loader?limit=8192&name=assets/images/[name].[ext]',
    }],
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'example/index.html' },
      { from: 'node_modules/jquery/dist/jquery.min.js', to: 'vendor' },
    ]),
    new ExtractTextPlugin('[name]/main.css'),
    // new webpack.optimize.CommonsChunkPlugin('common/main.js',['main']),
  ],
  resolve: {
    extensions: ['', '.js', '.json', '.jsx'],
    // alias: {
    //   'react': path_react,
    //   'react-dom': path_react_dom
    // }
  },
  eslint: {
    configFile: MODULE_PATH.eslintrc,
    failOnWarning: true, // eslint报warning了就终止webpack编译
    failOnError: true, // eslint报error了就终止webpack编译
    // cache: true // 开启eslint的cache，cache存在node_modules/.cache目录里
  },
};
