import React from 'react';
import magnifierSVGPath from './magnifierSVGPath.jsx';
import styles from './searchBox.css';

export default class searchBox extends React.Component {
  constructor(props) {
    super(props);

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
          <input className={styles.textInput} type="text" placeholder={text} onSubmit={this.props.submitQuery} />
        </div>
        </span>
      </div>
      </div>
      );
  }
}