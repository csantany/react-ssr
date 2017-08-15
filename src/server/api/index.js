// Dependencies
const express = require('express');
const all = require('./data/blog');

// Express Router
const router = express.Router();

router.get('/blog', (req, res) => {
  res.json(all());
});

module.exports = router;
