// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs')
const router = express.Router();
const User = require('../models/User/user');
const generateToken = require('../utils/generateToken');
const user = require('../models/User/user');

// Register a new user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = new User({ name, email, password });
    await user.save();

    // Send token in response
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Login a user

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {

      return res.status(400).json({ message: 'Invalid email or password' })
    }

    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password ' })
    }
    // genrate the jwt token 
    const token = generateToken(user._id)

    // send token in an Http-only cookies
    res.json({
      message: 'logged in successfully',
      token
    })
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }

})

//logout
router.post('/logout', (req, res) => {
  res.clearCookie('token')
  res.json({ message: 'Logged out successfully' })
})

module.exports = router;
