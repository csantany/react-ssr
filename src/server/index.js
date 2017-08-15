const express = require('express');
const webpack = require('webpack');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');

const api = require('./api');
const config = require('../../webpack.config');

const app = express();
const compiler = webpack(config);
const port = process.env.NODE_PORT || 3000;

app.use(express.static(path.join(__dirname, '../../public')));

app.use('/api', api);
app.use(webpackDevMiddleware(compiler));
app.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client')));
app.use(webpackHotServerMiddleware(compiler));

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
