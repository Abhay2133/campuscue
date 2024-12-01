const connectDB = require('../config/database/database');
const Question = require("../models/User/Question");
const User = require("../models/User/user");
// const {Question, User} = require("../models/models")
const mongoose = require('mongoose');

async function testGetQuestion() {
    await connectDB();
    const questions = await Question.find();
    const question = await Question.findById(questions[0]._id).populate('user');    
    console.log(question);
    mongoose.connection.close();
}

testGetQuestion()