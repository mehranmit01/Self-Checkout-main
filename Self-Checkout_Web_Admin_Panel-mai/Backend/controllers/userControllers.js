const Users = require('../models/users');

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await Users.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await Users.findOne({ email: email, userType: 'admin' });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check the password
        if (user.userPassword !== password) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // If everything is okay, send a success response
        res.json({ message: 'Admin logged in successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// User Registration
const registerUser = async (req, res) => {
    try {
        const { username, userPassword, email, userType } = req.body;

        // Check if the user already exists
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const newUser = new Users({
            username,
            userPassword, // In a real-world scenario, you'd hash the password before saving
            email,
            userType
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user: newUser });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// User Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check the user type
        if (user.userType !== 'customer') {
            return res.status(403).json({ message: 'Only customers can login' });
        }

        // Check the password
        if (user.userPassword !== password) { // In a real-world scenario, you'd compare the hashed password
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // If everything is okay, send a success response
        res.json({ message: 'User logged in successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


module.exports = {
    getAllUsers,
    adminLogin,
    registerUser,
    loginUser
};