
const express = require('express');
const router = express.Router();
const Driver = require('../models/driver');
const Route = require('../models/route');
const Order = require('../models/order');

router.get('/summary', async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    // Agar aggregation array empty ho to error na aaye isliye check lagaya
    const totalRevenueResult = await Order.aggregate([
      { $group: { _id: null, total: { $sum: { $toDouble: "$value_rs" } } } }
    ]);
    const totalRevenue = totalRevenueResult[0]?.total || 0;

    const totalDrivers = await Driver.countDocuments();

    const avgDeliveryTimeResult = await Order.aggregate([
      { $group: { _id: null, avg_time: { $avg: "$delivery_time_min" } } }
    ]);
    const avgDeliveryTime = avgDeliveryTimeResult[0]?.avg_time || 0;

    res.json({
      totalOrders,
      totalRevenue,
      totalDrivers,
      avgDeliveryTime
    });
  } catch (error) {
    console.error("Error in /summary:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get('/drivers', async (req, res) => {
  try {
    const drivers = await Driver.find().sort({ total_week_hours: -1 });
    res.json(drivers);
  } catch (error) {
    console.error("Error in /drivers:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get('/routes', async (req, res) => {
  try {
    const routes = await Route.find().lean();
    const orders = await Order.find().lean();

    const routesWithPerformance = routes.map(route => {
      const ordersForRoute = orders.filter(o => o.route_id == route.route_id);
      const totalOrders = ordersForRoute.length;

      if (totalOrders === 0) {
        return { ...route, performance: 'N/A' };
      }

      const avgActualTime = ordersForRoute.reduce((sum, o) => sum + o.delivery_time_min, 0) / totalOrders;
      const performance = route.base_time_min - avgActualTime;
      return { ...route, performance: performance.toFixed(2) };
    });

    res.json(routesWithPerformance);
  } catch (error) {
    console.error("Error in /routes:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
