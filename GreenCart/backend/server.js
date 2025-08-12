// This MUST be the very first line of the file.
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const apiRoutes = require('./routes/api');

const app = express();

// Use the PORT from .env, or 5000 as a default
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Main API Route
app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`✅ Backend server is live and running on http://localhost:${PORT}`);
});