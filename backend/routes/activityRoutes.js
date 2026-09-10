const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, activityController.logActivity);
router.get('/', authenticateToken, activityController.getUserActivities);

module.exports = router;