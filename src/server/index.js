import express from 'express';
import webpack from 'webpack';
import path from 'path';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import config from '../../webpack.config';
import api from './api';

const app = express();
const compiler = webpack(config);
const port = process.env.NODE_PORT || 3000;

app.use('/api', api);
app.use(webpackDevMiddleware(compiler));
app.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client')));
app.use(webpackHotServerMiddleware(compiler));

app.use(express.static(path.join(__dirname, '../../public')));

app.listen(port, () => console.log(`=== Go to http://localhost:${port} ===`));
