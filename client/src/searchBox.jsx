import React from 'react';
import magnifierSVGPath from './magnifierSVGPath.jsx';
import styles from './searchBox.css';

export default class searchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };

    this.submitQuery = this.submitQuery.bind(this);
  }

  submitQuery(e) {
    if (e.key === 'Enter') {
      //TODO: fix! does not detect enter key properly!
      console.log('search is not implemented');
      this.props.submitQuery(this.state.searchText);
    } else {
      //console.log(e.key); //does detect keys properly
      this.setState({
        searchText: this.state.searchText + e.key
      });
    }
  }


  render () {

    let text = this.props.queryTerms || 'Search reviews'

    return (
      <div id="searchBox" className={this.props.className} >
        <div className={styles.borderBox} >
        <span>
        <div className={styles.magnifier} >
          <svg className={styles.magnifierSVG} viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false" >
            <path d={magnifierSVGPath} fillRule="evenodd"></path>
          </svg>
        </div>
        <div className={styles.textBox} >
          <input className={styles.textInput} type="text" placeholder={text} onKeyPress={this.submitQuery} />
        </div>
        </span>
      </div>
      </div>
      );
  }
}