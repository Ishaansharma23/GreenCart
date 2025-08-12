const mongoose = require('mongoose');


const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {


  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected Successfully!");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
};

module.exports = connectDB;