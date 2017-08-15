// Dependencies
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = function(type) {
  // Rules
  const rules = [
    {
      test: /\.js$/,
      use: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader?minimize=true&modules=true&localIdentName=[name]__[local]',
          'sass-loader'
        ]
      })
    },
    {
      test: /\.json$/,
      loader: 'json-loader'
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      use: 'file-loader'
    }
  ];

  const commonConfig = {
    module: {
      rules
    },
    resolve: {
      modules: [
        'node_modules',
        path.resolve(__dirname, '../src/app'),
        path.resolve(__dirname, '../src/server')
      ],
      extensions: ['.js', '.json', '.jsx', '.css']
    }
  };

  return commonConfig;
};
