const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const db = require('../db/index.js');

db.connect().catch((err) => {
  console.log(err);
});


const app = express();

app.get('/', (req, res) => (res.sendFile(path.join(__dirname, '..', 'client', 'public', 'index.html'))));

app.use('/content', express.static(path.join(__dirname, '..','client','public')));

app.use('/:id/reviews', (req, res) => {
  console.log('get request recieved for ' + req.params.id);
  db.getAllReviews(req.params.id)
  .then((reviews) => {
    console.log(reviews);
    res.json(reviews);
  })
  .catch((err) => {
    console.log(err)
    res.status(500);
    res.end();
  });
});

module.exports = app;