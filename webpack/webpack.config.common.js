const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'isomorphic-style-loader',
          'css-loader?modules'
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: 'file-loader'
      }
    ]
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
