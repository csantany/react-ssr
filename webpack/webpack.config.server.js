// Dependencies
import path from 'path';
import nodeExternals from 'webpack-node-externals';
import webpackMerge from 'webpack-merge';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

// Webpack Configuration
import commonConfig from './webpack.config.common';

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
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      filename: '../public/css/style.css'
    })
  ]
});

export default serverConfig;
