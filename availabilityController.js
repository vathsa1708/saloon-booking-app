// availability/availabilityController.js
const Availability = require('./models/Availability');

exports.setAvailability = async (req, res) => {
  try {
    const { availability } = req.body;
    
    // Delete existing availability data
    await Availability.deleteMany();

    // Insert new availability data into the database
    await Availability.insertMany(availability);

    res.status(200).json({ message: 'Availability set successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAvailableSlots = async (req, res) => {
    try {
      const { date } = req.params;
  
      // Find the availability document for the specified date
      const availability = await Availability.findOne({ day: date });
  
      if (!availability) {
        // If availability data is not found for the specified date, return an empty array
        return res.status(200).json({ availableSlots: [] });
      }
  
      // Extract the slots for the specified date
      const slotsForDate = availability.slots;
  
      // Filter out the slots that are available (maxCapacity > 0)
      const availableSlots = slotsForDate.filter(slot => slot.maxCapacity > 0);
  
      res.status(200).json({ availableSlots });
    } catch (error) {
      // Handle any errors
      res.status(500).json({ message: error.message });
    }
  };