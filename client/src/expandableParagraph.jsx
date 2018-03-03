import React from 'react';
import _ from 'lodash';

export default class expandableParagraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      short: true,
      content: this.props.content,
      shortLength: this.props.length || 400
    };

    this.toggleShort = this.toggleShort.bind(this);
  }

  toggleShort() {
    if (this.state.short) {
      this.setState({
        short: false
      });
    } else {
      this.setState({
        short: true
      });
    }
  }

  shortContent() {
    let last = this.state.shortLength;
    for (var j = this.state.shortLength; j > 0; j--) {
      if (this.state.content[j] === ' ') {
        return this.state.content.slice(0, j);
      }
    }
    return this.state.content.slice(0, this.state.shortLength);
  }


  render() {

    let shouldDisplayShort = this.state.content.length > this.state.shortLength;
    let text = this.state.short && shouldDisplayShort ? this.shortContent() : this.state.content;

    return (
      <div id="expandableParagraph">
        <p>
          {text}
          {shouldDisplayShort ? <a style={{text:'blue'}} onClick={this.toggleShort} >{this.state.short ? '... view more' : ' hide' }</a > : null }
        </p>
      </div>
    );
  }
}