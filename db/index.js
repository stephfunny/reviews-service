//mongoDB interface
const mongo = require('mongoose');
const _ = require('lodash');

const connect = () => {
    let mongoURI = process.env.DATABASE || 'mongodb://127.0.0.1/reviews'; 
    console.log('connecting to', mongoURI);
    return mongo.connect(mongoURI);
    
};


const reviewAttributeSchema = {
  userImg: String,
  user: String,
  date: String,
  comment: String
};

const aggregateReviewSchema = {
  name: String,
  rating: Number
};

const reviewSchema = {
  id: Number,
  aggregateReviews: [aggregateReviewSchema],
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
  for (var key in reviewAttributes) {
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

const saveExperience = (experienceObj/*, callback*/) => {
  return new Promise((resolve, reject) => {
    //console.log('saving experience', experienceObj.id);
    experienceObj.reviews = filterValidReviews(experienceObj.reviews);
    let review = new Review(experienceObj);
    review.save()
    .then((success) => {
      console.log('Saved experience', experienceObj.id, 'with', experienceObj.reviews.length, 'valid reviews');
      resolve(success);
      })
    .catch((err) => {
      reject(err);
    });
  });
}

const saveReview = (id, reviewObj) => {
  return false;
};

const getAllReviews = (id, callback) => {
  return Review.findOne({id: id}).exec();
}

const disconnect = () => {
  return mongo.disconnect();

  //   (err, success) => {
  //   if (err) {
  //     callback(err)
  //   } else {
  //     callback(null, success);
  //   }
  // });
}

module.exports.saveReview = saveReview;
module.exports.saveExperience = saveExperience;
module.exports.getAllReviews = getAllReviews;
module.exports.connect = connect;
module.exports.disconnect = disconnect;