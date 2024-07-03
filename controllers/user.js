const User = require('../models/user');
const fs = require('fs'); // Required for file operations

// Get all users
async function handleUsers(req, res) {
    try {
        const users = await User.find({});
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to retrieve users' });
    }
}

// Get user by ID
async function getUserById(req, res) {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if (user) {
            return res.json(user);
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Failed to retrieve user' });
    }
}

// Create a new user
async function createUser(req, res) {
    const { first_name, last_name, email, gender, job_title } = req.body;
    if (!first_name || !last_name || !email || !gender || !job_title) {
        return res.status(400).json({ msg: "All fields are required" });
    }

    try {
        const newUser = new User({
            firstName: first_name,
            lastName: last_name,
            email: email,
            gender: gender,
            jobTitle: job_title,
        });
        const result = await newUser.save();
        console.log("result", result);
        return res.status(201).json({ msg: "Success", id: result._id });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to create user' });
    }
}

// Update user by ID
async function getUpdateUserById(req, res) {
    const id = req.params.id;
    const body = req.body;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send({ status: 'error', message: 'User not found' });
        }
        // Update the user's data
        Object.assign(user, body);
        const updatedUser = await user.save();
        return res.send({ status: 'success', id: updatedUser._id });
    } catch (error) {
        return res.status(500).send({ status: 'error', message: 'Failed to update user' });
    }
}

// Delete user by ID
async function deleteUser(req, res) {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).send({ status: 'error', message: 'User not found' });
        }
        return res.send({ status: 'success', message: 'User deleted', id: id });
    } catch (error) {
        return res.status(500).send({ status: 'error', message: 'Failed to delete user' });
    }
}

module.exports = {
    handleUsers,
    getUserById,
    createUser,
    getUpdateUserById,
    deleteUser
};
