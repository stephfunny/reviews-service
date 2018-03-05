import React from 'react';

export default class searchBox extends React.Component {
  constructor(props) {
    super(props);

  }



  render () {

    let text = this.props.queryTerms || 'Search reviews'

    return (
      <div id="searchBox">
        <span>
          <input type="search" placeholder={text} onSubmit={this.props.submitQuery} />
        </span>
      </div>
      );
  }
}