const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const port = 8080;

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => (res.sendFile(path.join(__dirname, '..', 'client', 'public', 'index.html'))));

app.use('/content', express.static(path.join(__dirname, '..','client','public')));

app.listen(port, () => (console.log('reviews microservice running at 127.0.0.1:' + port)));