const express = require('express');
const router = express.Router();

// Routes
router.get('', (req, res) => {
    // res.send("Hello World!");  --> Not NEEDED since we now use a templating engine 
    const locals = {
        title: "My Blogging Project",
        description: "The Blog created with Express, NodeJS & MongoDB"
    }

    res.render('index', locals);   // Adding the title & description to the Home page 
});

router.get('/about', (req, res) => {
    // res.send("Hello World!");  --> Not NEEDED since we now use a templating engine 
    res.render('about');
});

// Export router else the application doesn't work
module.exports = router;