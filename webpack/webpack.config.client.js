// Dependencies
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');

// Configuration
const commonConfig = require('./webpack.config.common');

// Environment
const isDevelopment = process.env.NODE_ENV !== 'production';

// Plugins
const plugins = [
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new ExtractTextPlugin({
    filename: 'css/style.css'
  })
];

// Entry
const entry = [];

if (isDevelopment) {
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
    // new BundleAnalyzerPlugin()
  );

  entry.push(
    'webpack-hot-middleware/client',
    'react-hot-loader/patch'
  );
} else {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: {
        screw_ie8: true,
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  );
}

entry.push('./client.js');

const clientConfig = webpackMerge(commonConfig('client'), {
  name: 'client',
  entry,
  context: path.resolve(__dirname, '../src/app'),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../public'),
    publicPath: '/'
  },
  target: 'web',
  devtool: 'eval-source-map',
  plugins
});

module.exports = clientConfig;
