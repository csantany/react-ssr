// Dependencies
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';

// Configuration
import commonConfig from './webpack.config.common';

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

export default clientConfig;
