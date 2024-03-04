const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');

// For validation
const bcrypt = require('bcrypt');   // encrypt & decrypt password 
const jwt = require('jsonwebtoken');

const adminLayout = '../views/admin/layout';
const jwtSecret = process.env.JWT_SECRET;

/**
 * 
 * Check Login
*/

// to avoid everyone visiting a particular page 
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({ message: 'Unauthorized' });  // I MIGHT RENDER A PAGE (called 'unauthorized') HERE INSTEAD
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

/**
 * GET /
 * Admin - Login Page 
*/

router.get('/admin', async (req, res) => {
    try {
        res.render('admin/index', {
            title: "Admin"
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

        const user = await User.findOne({ username });
        if (!user) {   // if the user doesn't exists
            return res.status(401).json({ message: 'Invalid credentials' });   // Don't give the hacker any ideas that the user doesn't exist that's y we use 'invalid credentials' instead
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, jwtSecret);
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/dashboard'); 
         
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

/**
 * GET /
 * Admin Dashboard
*/

// the 'authMiddleware' is here so everyone doesn't visit this page 
router.get('/dashboard', authMiddleware, async (req, res) => {
    try {
        const data = await Post.find();
        res.render('admin/dashboard', { 
            title: "Dashboard", 
            data 
        });   
    } catch (error) {
        console.log(error);
    }
});


/**
 * GET /
 * Admin - Create New Post
*/

// the 'authMiddleware' is here so everyone doesn't visit this page 
router.get('/add-post', authMiddleware, async (req, res) => {
    try {
        const data = await Post.find();
        res.render('admin/add-post', {
            title: "Add Post"
        });   
    } catch (error) {
        console.log(error);
    }
});


/**
 * POST /
 * Admin - Create New Post
*/

// the 'authMiddleware' is here so everyone doesn't visit this page 
router.post('/add-post', authMiddleware, async (req, res) => {
    try {
        try {
            const newPost = new Post ({
                title: req.body.title,
                body: req.body.body
            });

            await Post.create(newPost);   // insert our new post into the database 
            res.redirect('/dashboard');
        } catch (error) {
            console.log(error);
        }

    } catch (error) {
        console.log(error);
    }
});


/**
 * GET /
 * Admin - Edit Post
*/

// the 'authMiddleware' is here so everyone doesn't visit this page 
router.get('/edit-post/:id', authMiddleware, async (req, res) => {
    try {
        const data = await Post.findOne({ _id: req.params.id });
        res.render('admin/edit-post', {
            title: "Edit Post", 
            data
        });   
    } catch (error) {
        console.log(error);
    }
});


/**
 * PUT /
 * Admin - Edit Post
*/

// the 'authMiddleware' is here so everyone doesn't visit this page 
router.put('/edit-post/:id', authMiddleware, async (req, res) => {
    try {
        await Post.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            body: req.body.body,
            updatedAt: Date.now()
        });

        res.redirect(`/admin-post/${req.params.id}`);  // redirect to the edited post

    } catch (error) {
        console.log(error);
    }
});


/**
 * DELETE /
 * Admin - Delete Post
*/

// the 'authMiddleware' is here so everyone doesn't visit this page 
router.delete('/delete-post/:id', authMiddleware, async (req, res) => {
    try {
        await Post.deleteOne({ _id: req.params.id });

        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
    }
});

/**
 * GET /
 * Post :id
*/

router.get('/admin-post/:id', async (req, res) => {
    try {
        let slug = req.params.id;

        const data = await Post.findById({ _id: slug });

        const locals = {
            // Adding the title & description to the Home page 
            title: data.title,
            description: "The Blog created with Express, NodeJS & MongoDB"
        }

        res.render('admin/admin-post', { 
            title: data.title, 
            data,
            currentRoute: `/post/${slug}` 
        });

    } catch (error) {
        console.log(error);
    }
});


/**
 * POST /
 * Admin - Register
*/

// Define route for rendering the registration form
router.get('/register', async (req, res) => {
    try {
        res.render('admin/register', {
            title: "Register"
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
            await user.save();
            //res.status(201).json({ message: 'User Created', user });    // testing purposes
            res.redirect('/admin');
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


/**
 * GET /
 * Admin Logout
*/

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    // res.json({ message: 'Logout successful.'});
    res.redirect('/');
  });


// Export router else the application doesn't work
module.exports = router;