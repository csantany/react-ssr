// Dependencies
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Webpack Configuration
const commonConfig = require('./webpack.config.common');

// Environment
const isDevelopment = process.env.NODE_ENV !== 'production';

const plugins = [
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new ExtractTextPlugin({
    filename: '../public/css/style.css'
  }),
  new webpack.optimize.UglifyJsPlugin({
    output: {
      comments: false
    },
    compress: {
      screw_ie8: true,
      warnings: false
    }
  })
];

if (isDevelopment) {
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  );
}

const serverConfig = webpackMerge(commonConfig('server'), {
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
  plugins
});

module.exports = serverConfig;
