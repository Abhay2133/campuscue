// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User/user');

/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {any} next 
 * @returns 
 */
const protect = async (req, res, next) => {
  // get token from cookies
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: Token missing" });
  }

  // Extract the token
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: 'not authenticated' })
  }

  try {
    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return res.status(401).json({
      message: 'Invalid userId in token'
    })
    next()
  }
  catch (error) {
    res.status(401).json({
      message: 'Invalid token'
    })
  }
}

module.exports = protect;
