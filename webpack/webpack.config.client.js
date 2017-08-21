// Dependencies
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

// Configuration
const commonConfig = require('./webpack.config.common');

// Environment
const isDevelopment = process.env.NODE_ENV !== 'production';

// Plugins
const plugins = [];

if (isDevelopment) {
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  );
} else {
  plugins.push(
    new ExtractTextPlugin({
      filename: 'css/style.css'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      }
    })
  );
}

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
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  target: 'web',
  devtool: 'eval-source-map',
  plugins
});

module.exports = clientConfig;
