const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware');

// Public route for finding nearby hotels based on coordinates
router.get('/near-me', userController.getNearMeHotels);

module.exports = router;