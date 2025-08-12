const mongoose = require('mongoose');

const RouteSchema = new mongoose.Schema({
  route_id: { type: Number, unique: true },
  distance_km: Number,
  traffic_level: String,
  base_time_min: Number
});

module.exports = mongoose.model('Route', RouteSchema);