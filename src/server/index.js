// Dependencies
import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import compression from 'compression';

// Api
import api from './api';

// Webpack Configuration
import webpackConfig from '../../webpack.config';

// Environment
const isDevelopment = process.env.NODE_ENV !== 'production';

// Express app
const app = express();
const compiler = webpack(webpackConfig);
const port = process.env.NODE_PORT || 3000;

if (!isDevelopment) {
  // Compression
  app.use(compression());

  app.get('*.js', (req, res, next) => {
    req.url = `${req.url}.gz`;
    res.set('Content-Encoding', 'gzip');

    next();
  });
}

// Public static
app.use(express.static(path.join(__dirname, '../../public')));

// Middlewares
app.use('/api', api);

if (!isDevelopment) {
  try {
    const serverRender = require('../../dist/server.js').default;

    app.use(serverRender());
  } catch (e) {
    console.log(e); // eslint-disable-line
  }
} else {
  app.use(webpackDevMiddleware(compiler));
  app.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client')));
  app.use(webpackHotServerMiddleware(compiler));
}

// Listening
app.listen(port, () => console.log(`Server running on http://localhost:${port}`)); // eslint-disable-line
