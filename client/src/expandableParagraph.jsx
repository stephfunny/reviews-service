import React from 'react';
import _ from 'lodash';
import styles from './expandableParagraph.css';

export default class expandableParagraph extends React.Component {
  constructor(props) {
    super(props);

    let shortLength = this.props.length || 400;
    let content = this.props.content
    let shouldShorten = this.props.shouldShorten || content.length > shortLength;
    
    this.state = {
      shouldDisplayShort: shouldShorten, 
      short: true,
      content: content,
      shortLength: shortLength
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

    //let shouldDisplayShort = this.state.content.length > this.state.shortLength;
    let text = this.state.short && this.state.shouldDisplayShort ? this.shortContent() : this.state.content;

    return (
      <div className={this.props.className + ' ' + styles.expandableParagraphDefaults}>
        <p>
          {text}
          {this.state.shouldDisplayShort ? <a className="expandable link" style={{text:'blue'}} onClick={this.toggleShort} >{this.state.short ? '... view more' : ' hide' }</a > : null }
        </p>
      </div>
    );
  }
}