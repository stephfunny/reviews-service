import React from 'react';
import StarScale from './starScale.jsx';
import SearchBox  from './searchBox.jsx';

export default class ReviewHeader extends React.Component {
  constructor() {
    super();

  }



  render () {

    return (
      <div id="reviews header">
          {this.props.reviews} REVIEWS
          <StarScale rating={this.props.overallRating} height="30px" width="120px" />
          <SearchBox text={this.props.searchTerms} submitQuery={this.props.submitQuery} />
      </div>
      );
  }
}