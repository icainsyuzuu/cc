const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/dashboard', authMiddleware, userController.getDashboard);
// Fetch user profile data (GET request)
router.get('/profile', authMiddleware, userController.getProfile);
module.exports = router;
