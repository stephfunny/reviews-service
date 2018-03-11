import React from 'react';
import ReactDOM from 'react-dom';
import ReviewsHeader from './reviewsHeader.jsx';
import ReviewList from './reviewsList.jsx';
import ReviewAggregates from './reviewAggregates.jsx';
import ReviewListPages from './reviewListPages.jsx';
import axios from 'axios';
import styles from './app.css';


export default class Reviews extends React.Component {
  constructor() {
    super();

    this.state = {
      item: null,  //get from props?
      pagesize: 10,
      currentPage: 0,
      reviews: [{
        _id: 1,
        user:'jill',
        date:'Feb 2013',
        comment:'it was awesome! super super awesome and it takes a million words to explain. super super awesome and it takes a million words to explain. super super awesome and it takes a million words to explain. super super awesome and it takes a million words to explain. super super awesome and it takes a million words to explain. super super awesome and it takes a million words to explain. super super awesome and it takes a million words to explain. super super awesome and it takes a million words to explain. super super awesome and it takes a million words to explain. super super awesome and it takes a million words to explain. super super awesome and it takes a million words to explain.  '
      },
      {
        _id: 2,
        user:'jill',
        date:'Feb 2013',
        comment:'it was awesome!'
      },
      {
        _id: 3,
        user:'jill',
        date:'Feb 2013',
        comment:'it was awesome!'
      },
      {
        _id: 4,
        user:'jill',
        date:'Feb 2013',
        comment:'it was awesome!'
      },
      {
        _id: 5,
        user:'jill',
        date:'Feb 2013',
        comment:'it was awesome!'
      },
      {
        _id: 6,
        user:'jill',
        date:'Feb 2013',
        comment:'it was awesome!'
      },
      {
        _id: 7,
        user:'jill',
        date:'Feb 2013',
        comment:'it was awesome!'
      },
      {
        _id: 8,
        user:'jill',
        date:'Feb 2013',
        comment:'it was awesome!'
      },
      {
        _id: 9,
        user:'jill',
        date:'Feb 2013',
        comment:'it was awesome!'
      },
      {
        _id: 10,
        user:'jill',
        date:'Feb 2013',
        comment:'it was awesome!'
      },
      {
        _id: 11,
        user:'jill',
        date:'Feb 2013',
        comment:'it was awesome!'
      },
      {
        _id: 12,
        user:'jill',
        date:'Feb 2013',
        comment:'it was awesome!'
      },
      {
        _id: 13,
        user:'jill',
        date:'Feb 2013',
        comment:'it was awesome!'
      }],
      filterTerms: null,
      overallRating: 4,
      aggregateReviews: [{
        name: 'Cleanliness',
        rating: 5
      },
      {
        name: 'Location',
        rating: 3.4
      },
      {
        name: 'Check In',
        rating: 5
      },
      {
        name: 'Amenities',
        rating: 2
      },
      {
        name: 'Communication',
        rating: 5
      },
      {
        name: 'Parking',
        rating: 3
      }] //will store variable types and render dynamically
    };

    this.changePage = this.changePage.bind(this);
    this.searchReviews = this.searchReviews.bind(this);

  }

  updateItem(id) {
    //get and set item
    //get item data
    if (id === null) {
      return;
    }
    axios.get('/reviews/' + id )
    .then((response) => {
      //console.log(response);
      this.setState({
        item: id,
        currentPage: 0,
        reviews: response.data.reviews,
        aggregateReviews: response.data.aggregateReviews,
        overallRating: response.data.averageRating
      });
    })
    .then(() => {
      this.changePage(0);
    })
    .catch((err) => (console.log(err)));
    
  }

  shouldPaginateReviews() {
    return this.filterReviews().length > this.state.pagesize;
  }

  getIdFromUrl() {
    let id = window.location.pathname.split('/')[1];
    return id !== '' ? id : '1';
  }

  filterReviews() {
    //TODO: will filter reviews by search terms
    return this.state.reviews;
  }

  searchReviews(query) {
    //TODO: set this.state.filterTerms
    console.log('searching');
  }

  paginatedReviews() {
    //breaks reviews up into pages, reviews will be stored paginated
    let lastReview = (this.state.currentPage + 1) * this.state.pagesize;
    //console.log('rendering reviews page', this.state.currentPage, ':', this.state.currentPage * this.state.pagesize, 'to', (lastReview > this.state.reviews.length) === true ? this.state.reviews.length: lastReview);
    let reviews =  this.filterReviews().slice(this.state.currentPage * this.state.pagesize, (lastReview > this.state.reviews.length) === true ? this.state.reviews.length: lastReview);
    //console.log(reviews);
    return reviews;
  }


  changePage(page) {
    this.setState({
      currentPage: page,
      currentReviews: this.paginatedReviews()
    });
  }

  componentWillMount() {
    //fetch item data
    this.updateItem(this.getIdFromUrl());

  }

  render() {
    return (
      <div id="reviews" className={styles.reviews}>
        <div>
        <ReviewsHeader overallRating={this.state.overallRating} reviews={this.state.reviews.length} searchTerms={this.state.filterTerms} submitQuery={this.searchReviews} />
        </div>
        <div>
          <ReviewAggregates aggregateReviews={this.state.aggregateReviews} />
          <ReviewList reviews={this.paginatedReviews()} />
        </div>
       {this.shouldPaginateReviews() ? <ReviewListPages currentPage={this.state.currentPage} pages={Math.ceil(this.state.reviews.length / this.state.pagesize)} changePage={this.changePage} /> : null}
      </div>
    );
  }

}