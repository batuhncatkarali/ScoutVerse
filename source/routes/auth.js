const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: './uploads/documents/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

console.log("🚦 Auth routes are active with Multer!");

// REGISTER ROUTE
router.post('/register', upload.single('document'), async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a verification document!' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'This email is already registered!' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role,
            document: req.file.path
        });

        await newUser.save();
        console.log("✅ New verified user registered:", username);
        res.status(201).json({ message: 'User created and document uploaded successfully!' });
    } catch (error) {
        console.error("❌ Register Error:", error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// LOGIN ROUTE
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }); 
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials!' });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET || 'secretkey123',         
            { expiresIn: '1d' }                
        );

        res.status(200).json({ 
            message: 'Login successful!', 
            token, 
            user: { id: user._id, username: user.username, role: user.role } 
        });
    } catch (error) {
        console.log("❌ LOGIN ERROR:", error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

module.exports = router;