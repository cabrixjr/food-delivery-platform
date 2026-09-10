const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');
const authenticateToken = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');

// Hotel Protected Routes
router.post(
  '/profile', 
  authenticateToken, 
  authorizeRoles('HOTEL'), 
  hotelController.upsertHotelProfile
);

router.patch(
  '/service-status', 
  authenticateToken, 
  authorizeRoles('HOTEL'), 
  hotelController.toggleServiceStatus
);

router.post(
  '/menu', 
  authenticateToken, 
  authorizeRoles('HOTEL'), 
  hotelController.addMenuItem
);

module.exports = router;