// controllers/bookingController.js
const Booking = require('./models/BookingRequest')
// Import the Booking model
const Availability = require('../saloon-booking-app/models/Availability');

exports.scheduleBooking = async (req, res) => {
  try {
    const { userId, date, slot } = req.body;

    // Check if the slot is available for booking
    const availability = await Availability.findOne({ day: date });
    if (!availability) {
      return res.status(404).json({ message: 'Availability data not found for the specified date' });
    }

    const { start, end } = slot;
    const selectedSlot = availability.slots.find(s => s.start === start && s.end === end);
    if (!selectedSlot) {
      return res.status(400).json({ message: 'Slot is not available for booking' });
    }

    // Check if the booking exceeds maxCapacity
    if (selectedSlot.maxCapacity <= 0) {
      return res.status(400).json({ message: 'No available capacity for this slot' });
    }

    // Create a new booking record
    const booking = new Booking({
      userId,
      date,
      slot
    });

    // Save the booking record to the database
    await booking.save();

    // Decrease the maxCapacity for the booked slot
    selectedSlot.maxCapacity--;

    // Update availability in the database
    await availability.save();

    res.status(201).json({ message: 'Booking scheduled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.listBookings = async (req, res) => {
    try {
      // Retrieve all bookings from the database
      const bookings = await Booking.find();
  
      res.status(200).json({ bookings });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
