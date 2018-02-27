//mongoDB interface
const mongo = require('mongoose');
const _ = require('lodash');

const mongoURI = process.env.DATABASE || 'mongodb://127.0.0.1/reviews'; 

mongo.connect(mongoURI);
// mongo.connection.on('error', (err) => {
//   if (err.message.code === 'ETIMEDOUT') {
//     console.log('caught connection timeout');
//     console.log(err);
//     mongoose.connect(mongoURI);
//   }
//   console.log('caught connection err');
//   console.log(err);
// });
// mongo.connection.once('open', () => {
//   console.log(`Mongoose successfully connected to ${mongoURI}`);
// });


const reviewAttributeSchema = {
  userImg: String,
  user: String,
  date: String,
  comment: String
};

const reviewSchema = {
  id: Number,
  numberOfReviews: Number,
  averageRating: Number,
  ratingAccuracyDesc: Number,
  ratingCommunication: Number,
  ratingCleanliness: Number,
  ratingLocation: Number,
  ratingCheckIn: Number,
  ratingValue: Number,
  reviews: [reviewAttributeSchema]
};

const reviewAttributes = {
  userImg: 'string',
  user: 'string',
  date: 'string',
  comment: 'string'
};



let validateReview = (review) => {
  for (key in reviewAttributes) {
    if (typeof review[key] !== reviewAttributes[key]) {
      if (reviewAttributes[key].regx && !review[key].match(reviewAttributes[key].regx)) {
        return false;
      }
    }
  }
  return true;
};

let Review = mongo.model('Review', reviewSchema);

let filterValidReviews = (reviews) => {
  return _.filter(reviews, validateReview);
};

const saveExperience = (experienceObj, callback) => {
  console.log('saving experience');
  experienceObj.reviews = filterValidReviews(experienceObj.reviews);
  review = new Review(experienceObj);
  review.save((err) => {
    if (err) {
      callback(err, false);
    } else {
      console.log('Saved experience', experienceObj.id, ':', experienceObj.reviews.length, 'valid reviews');
      callback(null, true);
    }
  });
}

const saveReview = (id, reviewObj, callback) => {
  if (validateReview(reviewObj)) {
  //add a review to an existing experience
  } else {
    console.log('ERROR: Review is not in correct format');
  }
};

const getAllReviews = (id, callback) => {
  mongo.find({id: id}).exec((err, data) => {
    if (err) {
      callback(err, null);
    }
    callback(null, data);
  });
}

const disconnect = (callback) => {
  mongo.disconnect((err, success) => {
    if (err) {
      callback(err)
    } else {
      callback(null, sucess);
    }
  });
}

module.exports.saveReview = saveReview;
module.exports.saveExperience = saveExperience;
module.exports.getAllReviews = getAllReviews;
module.exports.disconnect = disconnect;