const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Token tidak ditemukan',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // simpan payload token (userId, username, email, dll)
    // console.log('Token decoded:', decoded); // Uncomment untuk debug token
    next();
  } catch (error) {
    console.error('JWT verify error:', error);
    return res.status(401).json({
      success: false,
      message: 'Token tidak valid',
    });
  }
};

module.exports = authMiddleware;
