// script to drop and recreate Users collection
const mongoose = require('mongoose');
const User = require('./models/User');

async function recreateUsersCollection() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/salon_booking', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Remove deprecated options
      // useCreateIndex: true,
      // useFindAndModify: false
    });

    // Drop Users collection
    await User.collection.drop();

    console.log('Users collection dropped successfully');

    // Recreate Users collection
    await User.createIndexes(); // Ensure indexes are created
    console.log('Users collection recreated successfully');
  } catch (error) {
    console.error('Error recreating Users collection:', error);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
  }
}

// Call the function to recreate Users collection
recreateUsersCollection();
