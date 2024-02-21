require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.static('public'));

// Templating Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('', (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});