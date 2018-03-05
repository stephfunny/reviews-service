import React from 'react';
import magnifierSVGPath from './magnifierSVGPath.jsx';

export default class searchBox extends React.Component {
  constructor(props) {
    super(props);

  }


  render () {

    let text = this.props.queryTerms || 'Search reviews'

    return (
      <div id="searchBox">
        <span>
        <div style={{display: 'inline-block'}} >
          <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false" style={{height: '1em', width: '1em', display: 'block', fill: 'black'}} >
            <path d={magnifierSVGPath} fillRule="evenodd"></path>
          </svg>
        </div>
        <div style={{display: 'inline-block'}} >
          <input type="text" placeholder={text} onSubmit={this.props.submitQuery} sytle={{display: 'inline', height: '1em', width: '1em'}} />
        </div>
        </span>
      </div>
      );
  }
}