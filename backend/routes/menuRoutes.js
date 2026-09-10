const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const authenticateToken = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');

// Public Route
router.get('/hotel/:hotelId', menuController.getMenuByHotel);

// Protected Hotel Owner Routes
router.patch('/:itemId', authenticateToken, authorizeRoles('HOTEL'), menuController.updateMenuItem);
router.delete('/:itemId', authenticateToken, authorizeRoles('HOTEL'), menuController.deleteMenuItem);

module.exports = router;