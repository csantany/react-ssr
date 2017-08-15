// Dependencies
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

// Configuration
const commonConfig = require('./webpack.config.common');

// Plugins
const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new ExtractTextPlugin({
    filename: 'css/style.css'
  })
];

const clientConfig = webpackMerge(commonConfig('client'), {
  name: 'client',
  entry: [
    'webpack-hot-middleware/client',
    'react-hot-loader/patch',
    './client.js'
  ],
  context: path.resolve(__dirname, '../src/app'),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../public'),
    publicPath: '/'
  },
  target: 'web',
  plugins
});

module.exports = clientConfig;
