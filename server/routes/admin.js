const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

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


// Export router else the application doesn't work
module.exports = router;