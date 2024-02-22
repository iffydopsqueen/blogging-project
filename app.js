require('dotenv').config();

const express = require('express');
const path = require('path');

const connectDB = require('./server/config/db');

const app = express();
const PORT = 3000 || process.env.PORT;

// Connect to database 
connectDB();

// Middleware for search 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

// Templating Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Use routes from the 'main.js' file
app.use('/', require('./server/routes/main'));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});