const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Core Middlewares
app.use(cors());
app.use(express.json());

// Serve Uploaded Files (Images, Business Docs)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route Imports
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const adminRoutes = require('./routes/adminRoutes');
const menuRoutes = require('./routes/menuRoutes');
const activityRoutes = require('./routes/activityRoutes');

// API Endpoints
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/hotels', hotelRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/menus', menuRoutes);
app.use('/api/v1/activities', activityRoutes);

// Root Check
app.get('/', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Hyperlocal Food Directory API Ready.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});