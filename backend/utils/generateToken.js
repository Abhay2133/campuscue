// utils/generateToken.js
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  let token = "error-generateToken";
  try {
    token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  } catch (err) {
    console.error(err);
  } finally {
    return token;
  }
};

module.exports = generateToken;
