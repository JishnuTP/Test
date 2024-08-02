const jwt = require('jsonwebtoken');
const User = require('../model/UserModel'); // Adjust the path according to your project structure
const dotenv = require('dotenv').config();

let JWT_SECRET="thisismy-secret-code"
const authMiddleware = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  
  if (!authHeader) {
    return res.status(401).json({ message: 'Authentication token is missing' });
  }

  const token = authHeader.split(' ')[1]; // Split the 'Bearer' and the token

  if (!token) {
    return res.status(401).json({ message: 'Authentication token is missing' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
