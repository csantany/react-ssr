// Dependencies
const webpackMerge = require('webpack-merge');

// Webpack Configuration
const commonConfig = require('./webpack.config.common');

// Configuration
const context = require('./configuration/context');
const entry = require('./configuration/entry');
const externals = require('./configuration/externals');
const name = require('./configuration/name');
const output = require('./configuration/output');
const plugins = require('./configuration/plugins');
const target = require('./configuration/target');

const serverConfig = webpackMerge(commonConfig('server'), {
  context: context('server'),
  entry: entry('server'),
  externals: externals(),
  name: name('server'),
  output: output('server'),
  plugins: plugins(),
  target: target('server')
});

module.exports = serverConfig;
