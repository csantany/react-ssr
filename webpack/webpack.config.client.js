// Dependencies
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');

// Configuration
const commonConfig = require('./webpack.config.common');

// Environment
const isDevelopment = process.env.NODE_ENV !== 'production';

// Analyzer is on?
const runAnalyzer = process.env.NODE_ANALYZER === 'true';

// Plugins
const plugins = [
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new ExtractTextPlugin({
    filename: 'css/style.css'
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: module => module.context && module.context.indexOf('node_modules') !== -1
  })
];

// Entry
const entry = [];

if (isDevelopment) {
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  );

  if (runAnalyzer) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  entry.push(
    'webpack-hot-middleware/client',
    'react-hot-loader/patch'
  );
} else {
  plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin({ minimize: true }),
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
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../public'),
    publicPath: '/'
  },
  target: 'web',
  devtool: 'eval-source-map',
  plugins
});

module.exports = clientConfig;
