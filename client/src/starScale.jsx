import React from 'react';
import _ from 'lodash';
import starSVGPath from './starSVGPath.jsx';
import defaultStyles from './starScale.css';

export default class StarScale extends React.Component {
  constructor() {
    super();

  }


  Star(id) {
    return (
      <svg className={defaultStyles.star} key={'star_'+id} viewBox="0 0 1000 1000" role="presentation" aria-hidden="true" focusable="false" ><path d={starSVGPath} ></path></svg>
    );
  }

  Stars() {
    let points = [];
    for (var i = 0; i < this.props.rating; i++) {
      points.push(this.Star(i));
    }
    return points;
  }


  render () {

    return (
      <div className={(this.props.className !== undefined) ? this.props.className : defaultStyles.starScale} >
        <span>{this.Stars()}</span>
      </div>
      );
  }
}