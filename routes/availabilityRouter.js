// routes/availabilityRouter.js
const express = require('express');
const availabilityController = require('../availabilityController');

const adminAuthorizationMiddleware = require('../middleware/adminAuthorizationMiddleware');
// const authController = require('../authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();



// Set Availability API (restricted to admin users)
router.post('/set',availabilityController.setAvailability);

// List Available Slots API
router.get('/available-slots/:date', availabilityController.getAvailableSlots);

module.exports = router;
