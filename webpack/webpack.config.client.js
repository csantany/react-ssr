// Dependencies
const webpackMerge = require('webpack-merge');

// Webpack Configuration
const commonConfig = require('./webpack.config.common');

// Configuration
const context = require('./configuration/context');
const devtool = require('./configuration/devtool');
const entry = require('./configuration/entry');
const name = require('./configuration/name');
const output = require('./configuration/output');
const plugins = require('./configuration/plugins');
const target = require('./configuration/target');

const clientConfig = webpackMerge(commonConfig('client'), {
  context: context(),
  devtool: devtool(),
  entry: entry(),
  name: name(),
  output: output(),
  plugins: plugins('client'),
  target: target('client')
});

module.exports = clientConfig;
