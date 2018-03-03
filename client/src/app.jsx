import React from 'react';
import ReactDOM from 'react-dom';
import ReviewsHeader from './reviewsHeader.jsx';
import ReviewList from './reviewsList.jsx';
import ReviewAggregates from './reviewAggregates.jsx';
import ReviewListPages from './reviewListPages.jsx';


export default class Reviews extends React.Component {
  constructor() {
    super();

    this.state = {
      item: null,  //get from props?
      pagesize: 10,
      currentPage: 0,
      reviews: [{
        username:'jill',
        date:'Feb 2013',
        comment:'it was awesome!'
      }, 'b', 'c'],
      filterTerms: null,
      overallRating: 4,
      aggregateReviews: [{
        name: 'Cleanliness',
        rating: 5
      },
      {
        name: 'Location',
        rating: 3.4
      }] //will store variable types and render dynamically
    };

    this.changePage = this.changePage.bind(this);

  }

  updateItem(id) {
    //get and set item
    //get item data
    
  }

  shouldPaginateReviews() {
    return this.filterReviews().length > this.state.pagesize;
  }

  filterReviews() {
    //TODO: will filter reviews by search terms
    return this.state.reviews;
  }

  searchReviews(query) {
    //TODO: set this.state.filterTerms
  }

  paginatedReviews() {
    //breaks reviews up into pages, reviews will be stored paginated
    return this.filterReviews().slice(this.state.currentPage * this.state.pagesize, (this.state.currentPage + 1) * this.state.pagesize);
  }

  changePage(page) {
    this.setState({
      currentPage: page
    });
  }

  componentWillMount() {
    //fetch item data
  }

  render() {
    return (
      <div id="reviews">
        <div>
        <ReviewsHeader overallRating={this.state.overallRating} reviews={this.state.reviews.length} searchTerms={this.state.filterTerms} />
        </div>
        <div>
          <ReviewAggregates aggregateReviews={this.state.aggregateReviews} />
          <ReviewList reviews={this.paginatedReviews()} />
        </div>
       {this.shouldPaginateReviews() ? <ReviewListPages currentPage={this.state.currentPage} pages={this.state.reviews.length} chage-page={this.changePage} /> : null}
      </div>
    );
  }

}