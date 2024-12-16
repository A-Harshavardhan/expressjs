const express = require('express');
const app = express();

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/users')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

// Define a Schema (structure of your data)
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

app.use(express.json());

// Create a Model (which represents the collection)
const User = mongoose.model('Users', userSchema);

// Insert data into the 'users' collection
const createUser = async () => {
    try {
        // Creating a new user
        const newUser = new User({
            name: 'John Doe',
            email: 'john.doe@example.com',
            age: 30
        });

        // Saving the user to the database
        const result = await newUser.save();
        console.log('User inserted:', result);
    } catch (err) {
        console.error('Error inserting user:', err);
    }
};

// Call the function to insert the user data
createUser();

// Route to retrieve users
app.get('/', async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find().lean(); // Use .lean() to get plain JavaScript objects

        // Send the response
        res.json({
            users: users
        });
    } catch (err) {
        console.error('Error retrieving users:', err);
        res.status(500).json({ message: 'Error retrieving users', error: err });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
