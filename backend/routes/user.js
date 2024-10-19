// routes/user.js
const express = require('express');
const router = express.Router();
const User = require('../models/User/user'); // Import the User model

// Create a new user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = new User({ name, email, password });
    const user = await newUser.save();

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
