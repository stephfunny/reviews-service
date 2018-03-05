import React from 'react';
import _ from 'lodash';
import starSVGPath from './starSVGPath.jsx';

export default class StarScale extends React.Component {
  constructor() {
    super();

  }


  Star(id) {
    return (
      <svg key={'star_'+id} viewBox="0 0 1000 1000" role="presentation" aria-hidden="true" focusable="false" style={{height:"100%",width:"20%",display:"inline-block",fill:"black"}}><path d={starSVGPath} ></path></svg>
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
      <div style={{width:this.props.width || "100px",height: this.props.height || "20px"}}>
        <span>{this.Stars()}</span>
      </div>
      );
  }
}