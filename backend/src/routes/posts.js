const express = require('express');
const router = express.Router();
const Post = require('../models/User/Posts');
const protect = require('../middleware/authMiddleware');
const upload = require('../config/multer');

// Create a new post
router.post('/', protect, upload.array('images', 5), async (req, res) => {
  try {
    console.log("lund")
    const { title, body, links } = req.body;

    if (!title || !body) {
      return res.status(400).json({ message: 'Title and body are required' });
    }

    // Process uploaded images
    const imageUrls = req.files.map((file) => `/uploads/${file.filename}`);

    // Process links
    const linkArray = links ? links.split(',').map((link) => link.trim()) : [];

    const post = new Post({
      title,
      body,
      user: req.user._id,
      images: imageUrls,
      links: linkArray,
    });

    await post.save();
    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error creating post', error });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
});

// Get a single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('user', 'name email');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post', error });
  }
});

// Update a post
router.put('/:id', protect, async (req, res) => {
  try {
    const { title, body, links } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    post.title = title || post.title;
    post.body = body || post.body;
    post.links = links ? links.split(',').map((link) => link.trim()) : post.links;

    await post.save();
    res.status(200).json({ message: 'Post updated successfully', post });
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error });
  }
});

// Delete a post
router.delete('/:id', protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await post.deleteOne();
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error });
  }
});

// Like a post
router.post('/:id/like', protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.likes += 1;
    await post.save();
    res.status(200).json({ message: 'Post liked successfully', likes: post.likes });
  } catch (error) {
    res.status(500).json({ message: 'Error liking post', error });
  }
});

module.exports = router;
