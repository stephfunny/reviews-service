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
      reviews: [
 
      ],
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
      }
      ] //will store variable types and render dynamically
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
    axios.get('/api/restaurants/' + id + '/reviews')
    .then((response) => {
      // console.log(response.data.reviews);
      this.setState({
        item: id,
        currentPage: 0,
        reviews: response.data.reviews,
        // aggregateReviews: response.data.aggregateReviews,
        overallRating: response.data.rating
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

  // getIdFromUrl() {
  //   let id = window.location.pathname.split('/')[2];
  //   // console.log('getIdFromUrl in app returned id as: ', id);
  //   return id !== '' ? id : '1';
  // }

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

    return reviews;
  }


  changePage(page) {
    this.setState({
      currentPage: page,
      currentReviews: this.paginatedReviews()
    });
  }

  onFlagReview(flagInfo) {
    //TODO: //post flagInfo to an endpoint
  }
  componentWillMount() {
    console.log("will mount");
    // console.log(window.location);

  }

  componentDidMount() {
    //fetch item data
    console.log('component did mount!');
    console.log(window.location.pathname.split('/')[2]);
    let id = window.location.pathname.split('/')[2];
    let id2 = id !== '' ? id : '1';
    // let id2 = '1';
    this.updateItem(id2);


  }

  render() {
    return (
      <div id="reviews" className={styles.reviews}>
        <div>
        <ReviewsHeader overallRating={this.state.overallRating} reviews={this.state.reviews.length} searchTerms={this.state.filterTerms} submitQuery={this.searchReviews} />
        </div>
        <div>
          {/*
          <ReviewAggregates aggregateReviews={this.state.aggregateReviews} />
          */}
          <ReviewList reviews={this.paginatedReviews()} onFlagReview={this.onFlagReview} />
        </div>
       {this.shouldPaginateReviews() ? <ReviewListPages currentPage={this.state.currentPage} pages={Math.ceil(this.state.reviews.length / this.state.pagesize)} changePage={this.changePage} /> : null}
      </div>
    );
  }

}