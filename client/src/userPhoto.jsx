import React from 'react';
import _ from 'lodash';
import starSVGPath from './starSVGPath.jsx';

export default class userPhoto extends React.Component {
  constructor() {
    super();

  }



  render () {

    return (
      <div id="userPhoto">
        <svg viewBox="0 0 1000 1000" role="presentation" aria-hidden="true" focusable="false" style={{position: 'relative', maxHeight:"80px", maxWidth:"80px",display:"inline-block",fill:"black"}}><path d={starSVGPath} ></path></svg>
      </div>
    );
  }
}