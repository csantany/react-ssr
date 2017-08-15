const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.config.common');

module.exports = webpackMerge(commonConfig, {
  name: 'server',
  entry: './serverRender.js',
  context: path.resolve(__dirname, '../src/server'),
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, '../dist'),
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  externals: [
    nodeExternals({
      whitelist: [/^redux\/(store|modules)/]
    })
  ],
  node: {
    __dirname: false
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      filename: '../public/css/style.css'
    })
  ]
});
