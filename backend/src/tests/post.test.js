const assert = require('assert');
const request = require('supertest');
const app = require('../server'); // Path to your Express app
const mongoose = require('mongoose');
const Post = require('../models/User/Posts');
const User = require('../models/User/user');
const jwt = require('jsonwebtoken');
const {before,after,describe,afterEach,beforeEach}=require('node:test')

// Helper to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Connect to database before tests
before(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Disconnect after tests
after(async () => {
  await mongoose.connection.close();
});

// Define test suite
describe('Post API Tests', () => {
  let token;
  let user;

  // Setup test user and auth token
  beforeEach(async () => {
    await User.deleteMany();
    user = await User.create({
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'password123',
    });
    token = generateToken(user._id);
  });

  // Clean up posts after each test
  afterEach(async () => {
    await Post.deleteMany();
  });

  // Test: Create a post
  it('should create a new post', async () => {
    const response = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Post',
        body: 'This is a test post.',
        links: 'https://example.com',
      });

    assert.strictEqual(response.statusCode, 201);
    assert.ok(response.body.post);
    assert.strictEqual(response.body.post.title, 'Test Post');
    assert.strictEqual(response.body.post.body, 'This is a test post.');
  });

  // Test: Get all posts
  it('should fetch all posts', async () => {
    await Post.create({
      title: 'Test Post',
      body: 'This is a test post.',
      user: user._id,
    });

    const response = await request(app).get('/api/posts');

    assert.strictEqual(response.statusCode, 200);
    assert.ok(Array.isArray(response.body));
    assert.strictEqual(response.body.length, 1);
    assert.strictEqual(response.body[0].title, 'Test Post');
  });

  // Test: Get a single post by ID
  it('should fetch a post by ID', async () => {
    const post = await Post.create({
      title: 'Test Post',
      body: 'This is a test post.',
      user: user._id,
    });

    const response = await request(app).get(`/api/posts/${post._id}`);

    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(response.body.title, 'Test Post');
  });

  // Test: Update a post
  it('should update a post', async () => {
    const post = await Post.create({
      title: 'Old Title',
      body: 'Old Body',
      user: user._id,
    });

    const response = await request(app)
      .put(`/api/posts/${post._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Title',
        body: 'Updated Body',
      });

    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(response.body.post.title, 'Updated Title');
    assert.strictEqual(response.body.post.body, 'Updated Body');
  });

  // Test: Delete a post
  it('should delete a post', async () => {
    const post = await Post.create({
      title: 'Test Post',
      body: 'This is a test post.',
      user: user._id,
    });

    const response = await request(app)
      .delete(`/api/posts/${post._id}`)
      .set('Authorization', `Bearer ${token}`);

    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(response.body.message, 'Post deleted successfully');
  });

  // Test: Unauthorized access
  it('should return 401 if no token is provided', async () => {
    const response = await request(app).post('/api/posts').send({
      title: 'Unauthorized Post',
      body: 'This should fail.',
    });

    assert.strictEqual(response.statusCode, 401);
    assert.strictEqual(response.body.message, 'not authenticated');
  });

  // Test: Create a post with images
  it('should upload images when creating a post', async () => {
    const response = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .field('title', 'Post with Images')
      .field('body', 'This post has images.')
      .attach('images', '__tests__/test-images/image1.jpg') // Replace with a valid test image path
      .attach('images', '__tests__/test-images/image2.jpg');

    assert.strictEqual(response.statusCode, 201);
    assert.strictEqual(response.body.post.images.length, 2);
  });
});
