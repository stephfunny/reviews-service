import React from 'react';
import StarScale from './starScale.jsx';
import SearchBox  from './searchBox.jsx';

export default class ReviewHeader extends React.Component {
  constructor() {
    super();

  }



  render () {

    return (
      <div>
        <div id="reviews header">
          <div>
            <h4>
              <span>
                <span>{this.props.reviews} REVIEWS</span>
              </span>
              <StarScale rating={this.props.overallRating} height="30px" width="120px" />
            </h4>
          </div>
            <SearchBox text={this.props.searchTerms} submitQuery={this.props.submitQuery} />
        </div>
        <div style={{marginTop:'16px', marginBottom:'16px'}} >
          <div className="divider"></div>
        </div>
      </div>
      );
  }
}