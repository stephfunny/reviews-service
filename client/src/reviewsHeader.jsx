import React from 'react';
import StarScale from './starScale.jsx';
import SearchBox  from './searchBox.jsx';
import styles from './reviewsHeader.css';

export default class ReviewHeader extends React.Component {
  constructor() {
    super();

  }



  render () {

    return (
      <div id="reviews-header" className={styles.reviewsHeader}>
        <SearchBox className={styles.searchBox} text={this.props.searchTerms} submitQuery={this.props.submitQuery} searchTerms={this.props.searchTerms} />
        <div id="reviews-header-overview" className={styles.overview} >
          <div id="reviews-header-title" className={styles.title} >
            <h2 className={styles.reviewsCount}>{this.props.reviews + ' Reviews'}</h2>
          </div>
          <div id="reviews-header-rating" className={styles.rating} >
            <StarScale className={styles.starScale} rating={this.props.overallRating} height="30px" width="120px" />
          </div>
        </div>
        <hr className={styles.hr} />
      </div>
      );
  }
}