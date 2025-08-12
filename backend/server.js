
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const apiRoutes = require('./routes/api');

const app = express();


const PORT = process.env.PORT || 5000;


connectDB();


app.use(cors());
app.use(express.json());


app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`Backend server is live and running on http://localhost:${PORT}`);
});