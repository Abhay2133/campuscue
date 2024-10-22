// server.js
const express = require('express');
const connectDB = require('./config/database/database');
const dotenv=require('dotenv')
const authRoutes=require('./routes/auth')
const userRoutes = require('./routes/user');
const morgan = require("morgan")
dotenv.config()


const app = express();
app.use(morgan('dev'));

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // For parsing JSON requests

// Routes
app.use('/api/auth',authRoutes)
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
