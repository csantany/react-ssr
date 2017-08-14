// Dependencies
import express from 'express';

import { all } from './data/blog';

// Express Router
const Router = express.Router();

Router.get('/blog', (req, res) => {
  res.json(all());
});

export default Router;
