import React from 'react';
import StarScale from './StarScale.jsx';
import _ from 'lodash';

export default class ReviewAggregates extends React.Component {
  constructor(props) {
    super(props);

  }


  displayReview(name, rating, key) {
    return (
    <div key={key}>
      <div>
       <span>{name}</span>
      </div>
      <div>
        <StarScale rating={rating} />
      </div>
    </div>
    );
  }


  render () {

    return (
      <div id="reviewaggeegates">
        {_.map(this.props.aggregateReviews, (review, i) => (this.displayReview(review.name, review.rating, i)))}
      </div>
    );
  }
}