// routes/user.js
const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware')
const User = require('../models/User/user'); // Import the User model
const generateToken = require('../utils/generateToken');

// Create a new user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = new User({ name, email, password });
    const user = await newUser.save();
    const token = generateToken(user._id);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users.map(user => ({ email: user.email, name: user.name, id: user._id })));
  } catch (e) {
    res.status(500).json({ message: error.message });
  }
})

router.get('/verify', protect, (req, res) => {
  return res.json({ isVerified: true })
});

// get the user profile(protected route)
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users?.map(user => ({ name: user.name, email: user.email })))
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message });
  }
})

module.exports = router;
