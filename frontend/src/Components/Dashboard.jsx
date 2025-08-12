import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Backend base URL
const API_URL = 'https://greencart-3-3xpk.onrender.com';

const Dashboard = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/api/summary`)  // /api prefix important hai
      .then(response => setSummary(response.data))
      .catch(error => console.error("Error fetching summary:", error));
  }, []);

  if (!summary) {
    return <div className="text-center text-gray-500 mt-10">Loading Dashboard...</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-700">Dashboard Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
          <h4 className="text-gray-500 font-semibold">Total Orders</h4>
          <p className="text-3xl font-bold text-blue-600 mt-2">{summary.totalOrders}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
          <h4 className="text-gray-500 font-semibold">Total Revenue</h4>
          <p className="text-3xl font-bold text-green-600 mt-2">₹{summary.totalRevenue.toLocaleString()}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
          <h4 className="text-gray-500 font-semibold">Total Drivers</h4>
          <p className="text-3xl font-bold text-purple-600 mt-2">{summary.totalDrivers}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
          <h4 className="text-gray-500 font-semibold">Avg. Delivery Time</h4>
          <p className="text-3xl font-bold text-red-500 mt-2">{summary.avgDeliveryTime.toFixed(2)} mins</p>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
