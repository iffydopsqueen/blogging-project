require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.static('public'));

// Templating Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Use routes from the 'main.js' file
app.use('/', require('./server/routes/main'));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});