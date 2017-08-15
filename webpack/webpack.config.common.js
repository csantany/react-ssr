// Dependencies
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

// Environment
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = function(type) {
  const rules = [
    {
      test: /\.js$/,
      use: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      use: 'file-loader'
    }
  ];

  if (!isDevelopment || type === 'server') {
    rules.push({
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader?minimize=true&modules=true&localIdentName=[name]__[local]',
          'sass-loader'
        ]
      })
    });
  } else {
    rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader?minimize=true&modules=true&localIdentName=[name]__[local]', 'sass-loader']
    });
  }

  return {
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
};
