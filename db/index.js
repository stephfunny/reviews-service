//mongoDB interface
const mongo = require('mongoose');

const endpoint = 'mongodb://127.0.0.1/reviews';

mongo.connect(endpoint);


const reviewSchema = {
  id: Number,
  numberOfReviews: Number,
  averageRating: Number,
  rating-accuracyDesc: Number,
  rating-communication: Number,
  rating-cleanliness: Number,
  rating-location: Number,
  rating-CheckIn: Number,
  rating-Value: Number,
  reviews: [Object]
};

const reviewAttribues = {
  user-img: 'string',
  user: 'string',
  date: 'string',
  comment: 'string'
};

let validateReview = (review) {
  for (key in reviewAttribues) {
    if (typeof review[key] !== reviewAttribues[key]) {
      if (reviewAttribues[key].regx && !review[key].match(reviewAttribues[key].regx)) {
        return false;
      }
    }
  }
  return true;
};

let Review = mongoose.model('Review', reviewSchema);

let filterValidReviews = (reviews) => {
  return _.filter(reviews, validateReview);
};

const saveExperience = (experienceObj) => {
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

module.export.saveReview = saveReview;
module.export.saveExperience = saveExperience;
module.export.getAllReviews = getAllReviews;