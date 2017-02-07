const PATH = require('path');

const NODE_ENV = process.env.NODE_ENV.trim() || 'develop';

const envConfigPath = PATH.resolve(__dirname, 'webpack', `webpack.${NODE_ENV}.config.js`);

module.exports = require(envConfigPath);
