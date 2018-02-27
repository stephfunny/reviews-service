const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');


const app = express();

app.get('/', (req, res) => (res.sendFile(path.join(__dirname, '..', 'client', 'public', 'index.html'))));

app.use('/content', express.static(path.join(__dirname, '..','client','public')));

module.exports = app;