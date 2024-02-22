const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const bcrypt = require('bcrypt');   // encrypt & decrypt password 
const jwt = require('jsonwebtoken');

const adminLayout = '../views/admin/layout';
/**
 * GET /
 * Admin - Login Page 
*/

router.get('/admin', async (req, res) => {
    try {
        const locals = {
            title: "Admin",
            description: "The Blog created with Express, NodeJS & MongoDB"
        }

        res.render('admin/index', {
            locals,
            layout: adminLayout
        });   
    } catch (error) {
        console.log(error);
    }
});

/**
 * POST /
 * Admin - Check Login
*/

router.post('/admin', async (req, res) => {
    try {
        const { username, password } = req.body;  // get the username and password from the form
        
        res.render('admin/index', {
            locals,
            layout: adminLayout
        });   
    } catch (error) {
        console.log(error);
    }
});

/**
 * POST /
 * Admin - Register
*/

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;  // get the username and password from the form
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const user = await User.create({ username, password:hashedPassword });
            res.status(201).json({ message: 'User Created', user });    // testing purposes
        } catch (error) {
            if (error.code === 11000) {
                res.status(409).json({ message: 'User already in use' });
            }
            res.status(500).json({ message: 'Internal server error' });
        }
    } catch (error) {
        console.log(error);
    }
});


// Export router else the application doesn't work
module.exports = router;