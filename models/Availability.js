// models/Availability.js

const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
  day: {
    type: String,
    required: true
  },
  slots: [
    {
      start: {
        type: String,
        required: true
      },
      end: {
        type: String,
        required: true
      },
      maxCapacity: {
        type: Number,
        required: true
      }
    }
  ]
});

module.exports = mongoose.model('Availability', availabilitySchema);
