// Dependencies
import express from 'express';
import posts from './data/blog';

// Express Router
const router = express.Router();

router.get('/blog/posts', (req, res) => res.json(posts));

export default router;
