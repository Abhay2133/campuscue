// routes/user.js
const express = require('express');
const router = express.Router();
const protect=require('../middleware/authMiddleware')
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

// get the user profile(protected route)
router.post('/profile',protect,async (req,res)=>{
  const user=await User.findOne(req.user._id)

  if(user){
    res.json({
      _id:user._id,
      name:user.name,
      email:user.email,
    })
  }
  else{
    res.status(400).json({message:'User not found'})
  }
})

module.exports = router;
