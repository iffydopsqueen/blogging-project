const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

/**
 * GET /
 * HOME
*/

router.get('', async (req, res) => {
    try {
        const locals = {
            // Adding the title & description to the Home page 
            title: "My Blogging Project",
            description: "The Blog created with Express, NodeJS & MongoDB"
        }

        let perPage = 5;    // display 5 posts per page
        let page = req.query.page || 1;    // with this, we can do localhost:3000?page=2

        const data = await Post.aggregate([ { $sort: { createdAt: -1 } } ])   // let the oldest post be at the top
        .skip(perPage * page - perPage)   // when on page 2, it should show the next 5 posts but still keeping it to 5 posts per page 
        .limit(perPage)   // have only 5 posts per page 
        .exec();

        // Count how many blog posts we have 
        const count = await Post.countDocuments({});
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);

        res.render('index', {
            locals, 
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null,
            currentRoute: '/'
        });   
    } catch (error) {
        console.log(error);
    }
});

// This has NO PAGINATION
// router.get('', async (req, res) => {
//     // res.send("Hello World!");  --> Not NEEDED since we now use a templating engine 
//     const locals = {
//         title: "My Blogging Project",
//         description: "The Blog created with Express, NodeJS & MongoDB"
//     }

//     try {
//         const data = await Post.find();
//         // console.log("Retrieved data:", data);   // Log the retrieved data
//         res.render('index', {
//             locals, 
//             data
//         });   // Adding the title & description to the Home page 
//     } catch (error) {
//         console.log(error);
//     }
// });

/**
 * GET /
 * Post :id
*/

router.get('/post/:id', async (req, res) => {
    try {
        let slug = req.params.id;

        const data = await Post.findById({ _id: slug });

        const locals = {
            // Adding the title & description to the Home page 
            title: data.title,
            description: "The Blog created with Express, NodeJS & MongoDB"
        }

        res.render('post', { 
            locals, 
            data,
            currentRoute: `/post/${slug}` 
        });

    } catch (error) {
        console.log(error);
    }
});

/**
 * POST /
 * Post - searchTerm
*/

router.post('/search', async (req, res) => {
    try {
        const locals = {
            // Adding the title & description to the Home page 
            title: "Search",
            description: "The Blog created with Express, NodeJS & MongoDB"
        }

        let searchTerm = req.body.searchTerm;  // grab the term typed in the search bar 
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

        const data = await Post.find({
            $or: [
                { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
                { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
            ]
        });

        res.render("search", {
            locals, 
            data,
            currentRoute: '/'
        });
    } catch (error) {
        console.log(error);
    }
});


/**
 * GET /
 * About
*/

router.get('/about', (req, res) => {
    res.render('about', {
        currentRoute: '/about'
    });
});

/**
 * Dummy Texts to insert posts
*/

// function insertPostData () {
//     Post.insertMany([
//         {
//             title: "The Power of Natural Hair Care",
//             body: "Embrace the beauty of your natural hair with gentle care routines and empowering styling tips for every texture and curl pattern."
//         },
//         {
//             title: "Authentication and Authorization in Node.js",
//             body: "Learn how to add authentication and authorization to your Node.js web applications using Passport.js or other authentication libraries."
//         },
//         {
//             title: "Natural Curls: Tips and Tricks",
//             body: "Love your natural curls with these simple techniques for enhanced definition and moisture."
//         },
//         {
//             title: "Discover how to use Express.js",
//             body: "Discover how to use Express.js, a popular Node.js web framework, to build web applications."
//         },
//         {
//             title: "Tech Innovations: Shaping Tomorrow's World",
//             body: "Explore the latest advancements in technology, from artificial intelligence to sustainable energy solutions, revolutionizing the way we live."
//         },
//         {
//             title: "Healthy Eating Habits",
//             body: "Elevate your well-being with nourishing foods that fuel your body and mind, making health a delicious journey."
//         },
//     ])
// }

// insertPostData();

// Export router else the application doesn't work
module.exports = router;