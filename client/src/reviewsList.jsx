import React from 'react';
import ReviewListEntry from './reviewListEntry.jsx';
import _ from 'lodash';

export default class ReviewsList extends React.Component {
  constructor() {
    super();

  }



  render () {

    return (
      <div id="reviewlist">
            {_.map(this.props.reviews, (review, i) => (<ReviewListEntry review={review} key={i} />))}
      </div>
    );
  }
}