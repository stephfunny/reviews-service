require('newrelic');
const express = require('express');
// const bodyParser = require('body-parser');
// const morgan = require('morgan');
const path = require('path');
const db = require('../db/zagat/index.js');
// require('../cache.js');

db.connect().catch((err) => {
  console.log(err);
});

// const cors = require('cors');

const app = express();

// app.use(cors());
// const sendIndex = (req, res) => (res.sendFile(path.join(__dirname, '..', 'client', 'public', 'index.html')));
const sendIndex = (req, res) => (res.sendFile(path.join(__dirname, '..', 'client', 'public', 'index.html')));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', sendIndex);
app.get('/restaurants/:id', sendIndex);


app.use('/reviews/content', express.static(path.join(__dirname, '..','client','public')));

app.use('/api/restaurants/:id/reviews', async (req, res) => {
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