require('newrelic');
const express = require('express');
// const bodyParser = require('body-parser');
// const morgan = require('morgan');
const path = require('path');
// const db = require('../db/index.js');
const db = require('../db/sean/index.js');
// const db = require('../db/sql/model.js');

db.connect().catch((err) => {
  console.log(err);
});

// const cors = require('cors');

const app = express();

// app.use(cors());
const sendIndex = (req, res) => (res.sendFile(path.join(__dirname, '..', 'client', 'public', 'index.html')));

app.get('/', sendIndex);
app.get('/:id', sendIndex);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-Parse-Application-Id, X-Parse-REST-API-Key, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Max-Age', 10); // Seconds.
  next();
});

app.use('/reviews/content', express.static(path.join(__dirname, '..','client','public')));

app.use('/restaurants/:id/reviews', async (req, res) => {
  let validId = await db.isValidReviewId(req.params.id, false);
  if (!validId) {
    console.log('Request for invalid id');
    res.status(404);
    res.end('Request for invalid id');
  } else {
    // console.log('get request recieved for ' + req.params.id);
    db.getAllReviews(req.params.id)
    .then((reviews) => {
      // console.log(reviews);
      if (reviews._id === null) {
        new Error('no data found')
      }
      res.json(reviews);
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.end('server error');
    });
  }
});

module.exports = app;