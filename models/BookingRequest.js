// models/BookingRequest.js

const mongoose = require('mongoose');

const bookingRequestSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  slot: {
    start: {
      type: String,
      required: true
    },
    end: {
      type: String,
      required: true
    }
  }
});

module.exports = mongoose.model('BookingRequest', bookingRequestSchema);
