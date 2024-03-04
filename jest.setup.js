// Import the JSDOM module to simulate the DOM environment
const { JSDOM } = require('jsdom');
const fs = require('fs');

// Include the script.js file for testing
const scriptPath = './public/js/script.js';
const scriptCode = fs.readFileSync(scriptPath, 'utf-8');

// Create a JSDOM instance and set up the document
const { window } = new JSDOM();
global.window = window;
global.document = window.document;

// Execute the script code in the context of the JSDOM
eval(scriptCode);
