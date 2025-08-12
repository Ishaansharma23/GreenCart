require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const apiRoutes = require('./routes/api');

const app = express();

const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({
    origin: 'https://greencart-2-fa9i.onrender.com'
  }));
app.use(express.json());

app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Backend server is live and running on port ${PORT}`);
});
