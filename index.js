// index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authController = require('../saloon-booking-app/authController');
const availabilityRouter = require('./routes/availabilityRouter');
const authMiddleware = require('../saloon-booking-app/middleware/authMiddleware');
const bookingRouter = require('./routes/bookingRouter');
dotenv.config();
const app = express();
const router = express.Router(); // Create an instance of Express Router
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('MongoDB connection error:', error));

app.post('/api/register', authController.register);
app.post('/api/login', authController.login);
app.use('/api/login/availability', availabilityRouter);
app.use('/api', bookingRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
