import React from 'react';
import StarScale from './StarScale.jsx';

export default class ReviewAggregates extends React.Component {
  constructor() {
    super();

  }



  render () {

    return (
      <div id="reviewaggeegates">
            Cleanliness <StarScale rating="1" /> Accuracy <StarScale rating="3" />
            Location Check In
          </div>
      );
  }
}