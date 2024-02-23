require('dotenv').config();

const express = require('express');
const path = require('path');
const methodOverride = require('method-override');    // lets me use the 'PUT' & 'DELETE' methods 
const session = require('express-session');
const cookieParser = require('cookie-parser');   // store session when we log in
const MongoStore = require('connect-mongo');

const connectDB = require('./server/config/db');

const app = express();
const PORT = 3000 || process.env.PORT;

// Connect to database 
connectDB();

// Middleware for search 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(session({
    secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.DATABASE_URI
  }),
    // cookie: { 
    //     maxAge: new Date ( Date.now() + (3600000) ) 
    // }
}));

app.use(express.static('public'));

// Templating Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Use routes from the 'main.js' file
app.use('/', require('./server/routes/main'));

// Use routes from the 'admin.js' file
app.use('/', require('./server/routes/admin'));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});