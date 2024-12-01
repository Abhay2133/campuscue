// seed.js
const mongoose = require('mongoose');
const Question = require('./models/User/Question');
const User = require('./models/User/user');
// const {User, Question} = require("./models/models");
const connectDB = require('./config/database/database');

// Connect to MongoDB
// connectDB()
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// Seed Data
const seedUsers = [
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
    },
    {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
    },
];

const seedQuestions = [
    {
        title: 'What is MongoDB?',
        body: 'I am looking for a beginner-friendly explanation of MongoDB.',
    },
    {
        title: 'How does bcrypt work?',
        body: 'Could someone explain the process of hashing passwords with bcrypt?',
    },
];

// Seed Function
async function seedDatabase() {
    await connectDB();
    try {
        // Clear existing data
        await User.deleteMany({});
        await Question.deleteMany({});
        
        await  User.collection.drop();
        await  Question.collection.drop();
        // await User.drop();
        // await Question.drop();

        // Create users and hash passwords
        const createdUsers = await User.insertMany(seedUsers);

        // Add user references to questions
        seedQuestions[0].user = createdUsers[0]._id;
        seedQuestions[1].user = createdUsers[1]._id;

        // Create questions with user references
        await Question.insertMany(seedQuestions);

        console.log("Database seeded successfully!");
    } catch (err) {
        console.error("Error seeding database:", err);
    } finally {
        mongoose.connection.close();
    }
}

// Run seed function
seedDatabase();
