require('dotenv').config();

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const connectDB = require('./db');
const Driver = require('./models/driver');
const Route = require('./models/route');
const Order = require('./models/order');

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
    const mongoose = require('mongoose');
    try {
        await connectDB();

        await Promise.all([
            Driver.deleteMany({}),
            Route.deleteMany({}),
            Order.deleteMany({})
        ]);
        console.log("Old data cleared from the database.");

        // File names ko user ke hisaab se theek kiya gaya hai
        const driverData = await readCsv(path.join(__dirname, 'data', 'drivers.csv'));
        const routeData = await readCsv(path.join(__dirname, 'data', 'routes.csv'));
        const orderData = await readCsv(path.join(__dirname, 'data', 'order.csv'));

        const processedDrivers = driverData.map(d => ({
            ...d,
            past_week_hours_array: d.past_week_hours.split('|').map(Number),
            total_week_hours: d.past_week_hours.split('|').map(Number).reduce((a, b) => a + b, 0)
        }));
        await Driver.insertMany(processedDrivers);
        console.log('✅ Drivers data seeded successfully.');

        await Route.insertMany(routeData);
        console.log('✅ Routes data seeded successfully.');
        
        const processedOrders = orderData.map(o => {
            const [hours, minutes] = o.delivery_time.split(':').map(Number);
            return { ...o, delivery_time_min: (hours * 60) + minutes };
        });
        await Order.insertMany(processedOrders);
        console.log('✅ Orders data seeded successfully.');

        console.log("\nSeeding Complete!");
        
    } catch (error) {
        console.error("Error while seeding database:", error);
    } finally {
        await mongoose.connection.close();
        console.log("Database connection closed.");
    }
};

seedDatabase();