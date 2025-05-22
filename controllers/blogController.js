const Blog = require('../models/Blog');
const slugify = require('slugify');

exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!req.file) return res.status(400).json({ msg: 'Image is required' });

    const slug = slugify(title, { lower: true });
    const image = req.file.filename;

    const blog = await Blog.create({ title, slug, content, image });

    res.status(201).json({ msg: 'Blog created successfully', blog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ msg: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};
