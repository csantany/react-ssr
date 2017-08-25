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

// Type of Configuration
const type = 'server';

module.exports = webpackMerge(commonConfig(type), {
  context: context(type),
  entry: entry(type),
  externals: externals(type),
  name: name(type),
  output: output(type),
  plugins: plugins(type),
  target: target(type)
});
