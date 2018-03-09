import React from 'react';
import StarScale from './starScale.jsx';
import _ from 'lodash';
import styles from './reviewAggregates.css';

export default class ReviewAggregates extends React.Component {
  constructor(props) {
    super(props);

  }


  displayReview(name, rating, key) {
    return (
    <div key={key} className={styles.aggregateReview} >
      <div className={styles.name} >
       <span>{name}</span>
      </div>
      <div className={styles.rating} >
        <StarScale rating={rating} className={styles.StarScale} />
      </div>
    </div>
    );
  }


  render () {
    let reviews = _.map(this.props.aggregateReviews, (review, i) => (this.displayReview(review.name, review.rating, i)));

    return (
      <div id="reviewAggregates" className={styles.reviewAggregates} >
        <div className={styles.leftColumn}>{reviews.slice(0, Math.ceil(reviews.length / 2))} </div>
        <div className={styles.rightColumn}>{reviews.slice(Math.ceil(reviews.length / 2), reviews.length)} </div>
      </div>
    );
  }
}