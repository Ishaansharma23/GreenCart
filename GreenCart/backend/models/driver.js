const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
  name: String,
  shift_hours: Number,
  past_week_hours_array: [Number], 
  total_week_hours: Number 
});

module.exports = mongoose.model('Driver', DriverSchema);