import React from 'react';
import _ from 'lodash';
import circleSVGPath from './circleSVGPath.jsx';

export default class userPhoto extends React.Component {
  constructor() {
    super();

  }



  render () {

    return (
      <div id="userPhoto">
        <svg viewBox="0 0 25 25" role="presentation" aria-hidden="true" focusable="false" style={{position: 'relative', maxHeight:"80px", maxWidth:"80px",display:"inline-block",fill:"currentColor"}}><path d={circleSVGPath} ></path></svg>
      </div>
    );
  }
}