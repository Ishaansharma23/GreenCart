import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://greencart-uyww.onrender.com'; 

const RoutesComponent = () => {
    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/api/routes`)  // /api prefix add kiya hai
            .then(response => setRoutes(response.data))
            .catch(error => console.error("Error fetching routes:", error));
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-2 text-gray-700">Route Performance</h2>
            <p className="text-sm text-gray-500 mb-6">
              Performance = Base Time - Avg. Actual Time. A positive value means the delivery was faster than planned.
            </p>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-3 px-4 text-left text-gray-600 font-bold uppercase text-sm">Route ID</th>
                            <th className="py-3 px-4 text-left text-gray-600 font-bold uppercase text-sm">Distance (km)</th>
                            <th className="py-3 px-4 text-left text-gray-600 font-bold uppercase text-sm">Traffic</th>
                            <th className="py-3 px-4 text-left text-gray-600 font-bold uppercase text-sm">Base Time (min)</th>
                            <th className="py-3 px-4 text-left text-gray-600 font-bold uppercase text-sm">Performance (min)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {routes.map(route => (
                            <tr key={route._id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-4">{route.route_id}</td>
                                <td className="py-3 px-4">{route.distance_km}</td>
                                <td className="py-3 px-4">{route.traffic_level}</td>
                                <td className="py-3 px-4">{route.base_time_min}</td>
                                <td className={`py-3 px-4 font-bold ${route.performance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {route.performance}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RoutesComponent;
