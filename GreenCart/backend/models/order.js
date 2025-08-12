const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  order_id: { type: Number, unique: true },
  value_rs: Number,
  route_id: Number,
  delivery_time_min: Number
});

module.exports = mongoose.model('Order', OrderSchema);