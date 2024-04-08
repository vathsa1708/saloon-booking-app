// routes/bookingRouter.js

const express = require('express');
const router = express.Router();
const bookingController = require('../bookingController');

// Schedule Booking API
router.post('/bookings', bookingController.scheduleBooking);

// List Booked Slots API
router.get('/bookings', bookingController.listBookings);

module.exports = router;
