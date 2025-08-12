import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Your backend URL

const Drivers = () => {
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/drivers`)
            .then(response => setDrivers(response.data))
            .catch(error => console.error("Error fetching drivers:", error));
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-700">Driver Workload</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-3 px-4 text-left text-gray-600 font-bold uppercase text-sm">Name</th>
                            <th className="py-3 px-4 text-left text-gray-600 font-bold uppercase text-sm">Shift Hours</th>
                            <th className="py-3 px-4 text-left text-gray-600 font-bold uppercase text-sm">Hours (Last Week)</th>
                            <th className="py-3 px-4 text-left text-gray-600 font-bold uppercase text-sm">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {drivers.map(driver => (
                            <tr key={driver._id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-4">{driver.name}</td>
                                <td className="py-3 px-4">{driver.shift_hours}</td>
                                <td className="py-3 px-4">{driver.total_week_hours}</td>
                                <td className={`py-3 px-4 font-bold ${driver.total_week_hours > 50 ? 'text-red-500' : 'text-green-500'}`}>
                                    {driver.total_week_hours > 50 ? 'Overworked' : 'OK'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Drivers;