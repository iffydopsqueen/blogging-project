const express = require('express');
const router = express.Router();

// Routes
router.get('', (req, res) => {
    res.send("Hello World!");
});

// Export router else the application doesn't work
module.exports = router;