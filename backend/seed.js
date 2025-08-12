require('dotenv').config();

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const connectDB = require('./db');
const Driver = require('./models/driver');
const Route = require('./models/route');
const Order = require('./models/order');

// ye read kr rha hai csv file ko 
const readCsv = (filePath) => {
    return new Promise((resolve, reject) => {
        const data = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => data.push(row))
            .on('end', () => resolve(data))
            .on('error', (err) => reject(err));
    });
};

const seedDatabase = async () => {
    try {
        await connectDB();

       // del purana data
        await Promise.all([
            Driver.deleteMany({}),
            Route.deleteMany({}),
            Order.deleteMany({})
        ]);
        console.log("Old data cleared from the database.");

   
        const driverData = await readCsv(path.join(__dirname, 'data', 'drivers.csv')); // Corrected
        const routeData = await readCsv(path.join(__dirname, 'data', 'routes.csv'));   // Corrected
        const orderData = await readCsv(path.join(__dirname, 'data', 'order.csv'));   // Corrected

        const processedDrivers = driverData.map(d => {
            const past_week_hours_array = d.past_week_hours.split('|').map(Number);
            const total_week_hours = past_week_hours_array.reduce((a, b) => a + b, 0);
            return { ...d, past_week_hours_array, total_week_hours };
        });
        await Driver.insertMany(processedDrivers);
        console.log('✅ Drivers data seeded successfully.');

     
        await Route.insertMany(routeData);
        console.log('✅ Routes data seeded successfully.');
   
        const processedOrders = orderData.map(o => {
            const [hours, minutes] = o.delivery_time.split(':').map(Number);
            const delivery_time_min = (hours * 60) + minutes;
            return { ...o, delivery_time_min };
        });
        await Order.insertMany(processedOrders);
        console.log('Orders data seeded successfully.');

        console.log("\nSeeding Complete! You can now start the server with 'npm start'.");
        
    } catch (error) {
        console.error("Error while seeding database:", error);
    } finally {
        const mongoose = require('mongoose');
        mongoose.connection.close();
    }
};

seedDatabase();