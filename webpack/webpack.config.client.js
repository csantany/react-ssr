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

// Type of Configuration
const type = 'client';

module.exports = webpackMerge(commonConfig(type), {
  context: context(type),
  devtool: devtool(type),
  entry: entry(type),
  name: name(type),
  output: output(type),
  plugins: plugins(type),
  target: target(type)
});
