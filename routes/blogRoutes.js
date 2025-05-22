const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const upload = require('../middlewares/upload');

// Routes
router.post('/create', upload.single('image'), blogController.createBlog);
router.get('/', blogController.getAllBlogs);
router.get('/:slug', blogController.getBlogBySlug);
router.delete('/:id', blogController.deleteBlog);

module.exports = router;
