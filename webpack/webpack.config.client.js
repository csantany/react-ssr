const webpack = require('webpack');
const path = require('path');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.common');

module.exports = webpackMerge(commonConfig, {
  name: 'client',
  entry: [
    'webpack-hot-middleware/client',
    'react-hot-loader/patch',
    './client.js'
  ],
  context: path.resolve(__dirname, '../src/app'),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  target: 'web',
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
});
