import React from 'react';

export default class ReviewListPages extends React.Component {
  constructor(props) {
    super(props);

  }
  
  //forward
  //backward
  //nearby w/current highlighted

  //button

  pageButton(content, destination, selected) {
    return (
      <button className={selected === true ? 'page-change button selected' : 'page-change button'} onClick={this.props.changePage.bind(destination)} >{content}</button >
    );
  }
  
  generateButtons() {

    let buttons = [];
    console.log(this.props.currentPage + 1, 'of', this.props.pages, 'pages of reviews');
    
    
    if (this.props.currentPage > 0) {
      //back button
      buttons.push(this.pageButton("back",this.props.currentPage - 1));
    }

    //always page 1
    buttons.push(this.pageButton('1', 0, 0 === this.props.currentPage));

    if (this.props.currentPage < 2) {
      //buttons 1..3 (3)
      for(var i = 1; i < this.props.pages && i < 3; i++) {
        buttons.push(this.pageButton(''+ (i + 1), i, i === this.props.currentPage));
      }
      if (this.props.pages > 4) {
        buttons.push('...');
      }
    }

    else if (this.props.currentPage < 4) {
      //buttons 1..n+1 (4-5)
      for(var i = 1; i < this.props.pages && i < this.props.currentPage + 2; i++) {
        buttons.push(this.pageButton(''+ (i + 1), i, i === this.props.currentPage));
      }
      buttons.push('...');
    }

    else if (this.props.currentPage > this.props.pages - 3) {
      //buttons x..end (3)
      buttons.push('...');
      for(var i = this.props.pages - 3; i < this.props.pages - 1; i++) {
        buttons.push(this.pageButton(''+ (i + 1), i, i === this.props.currentPage));
      }
    }

    else if (this.props.currentPage > this.props.pages - 5) {
      //buttons x-1..end (4-5)
      buttons.push('...');
      for(var i = this.props.currentPage - 1; i < this.props.pages - 1; i++) {
        buttons.push(this.pageButton(''+ (i + 1), i, i === this.props.currentPage));
      }
    }

    else {
      // x-1 to x+1 (3)
      buttons.push('...');
      for(var i = this.props.currentPage - 1; i < this.props.pages - 1 && i < this.props.currentPage + 2; i++) {
        buttons.push(this.pageButton(''+ (i + 1), i, i === this.props.currentPage));
      }
      buttons.push('...');
    }

    //always last page
    if (this.props.pages > 3) {
      buttons.push(this.pageButton(this.props.pages, this.props.pages, this.props.pages === this.props.currentPage));
    }

    if (this.props.currentPage < this.props.pages - 1  && this.props.pages > 2) {
      //forward button
      buttons.push(this.pageButton("next",this.props.currentPage + 1));
    }

    return buttons;

  }

  render () {

    return (
      <div id="reviewlistpages">
        <span>
          {this.generateButtons()}
        </span>
      </div>
    );
  }
}