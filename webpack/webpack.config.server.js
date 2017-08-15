const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.common');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = webpackMerge(commonConfig, {
  name: 'server',
  entry: './serverRender.js',
  context: path.resolve(__dirname, '../src/server'),
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, '../public'),
    libraryTarget: 'commonjs2',
    publicPath: '/'
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
      filename: 'css/style.css'
    })
  ]
});
