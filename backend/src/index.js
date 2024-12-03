// server.js
const express = require('express');
const cookieParser=require('cookie-parser')
const connectDB = require('./config/database/database');
const dotenv=require('dotenv')
const authRoutes=require('./routes/auth')
const userRoutes = require('./routes/user');
const questionRoutes=require('./routes/question')
const answerRoutes=require('./routes/answer')
const postRoutes=require('./routes/posts')
const fs = require('fs');
const path = require('path');
const morgan = require("morgan")
// const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
const cors = require('cors')
dotenv.config()

const app = express();
process.env.NODE_ENV == "dev" && app.use(morgan('dev'));
// app.use(morgan('combined', { stream: accessLogStream }));

app.use(cors())
// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // For parsing JSON requests
app.use(cookieParser())

// Routes
app.use('/api/auth',authRoutes)
app.use('/api/users', userRoutes);
app.use('/api/questions',questionRoutes)
app.use('/api/answers',answerRoutes)
app.use('/api/posts',postRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`Server started at http://localhost:${PORT}`));

module.exports = app;