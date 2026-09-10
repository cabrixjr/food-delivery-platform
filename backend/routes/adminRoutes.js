const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticateToken = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');

// Admin Protected Routes
router.get(
  '/verifications', 
  authenticateToken, 
  authorizeRoles('ADMIN'), 
  adminController.getPendingVerifications
);

router.post(
  '/verify-hotel', 
  authenticateToken, 
  authorizeRoles('ADMIN'), 
  adminController.verifyHotel
);

module.exports = router;