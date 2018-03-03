import React from 'react';
import _ from 'lodash';

export default class expandableParagraph extends React.Component {
  constructor() {
    super();

  }



  render () {

    return (
      <div id="expandableParagraph">
        {this.props.content}
      </div>
    );
  }
}