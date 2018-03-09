import React from 'react';
import styles from './reviewListPages.css';
//TODO import arrow svgs from './navigationArrows.jsx';
let arrows = {
  forward: 'next',
  backward: 'back'
};

export default class ReviewListPages extends React.Component {
  constructor(props) {
    super(props);

  }
  

  pageButton(content, destination, selected) {
    return (
      <button className={selected === true ? styles.pageChangeButton + ' ' + styles.currentPageChangeButton : styles.pageChangeButton} onClick={()=>(this.props.changePage(destination))} key={content} >{content}</button >
    );
  }

  emptyButton(content, key) {
    if (!key) {
      key = 'a';
    }
    return (
      <div className={styles.empty} key={key} >{content}</div>
    );
  }
  
  generateButtons() {

    let buttons = [];
    //console.log(this.props.currentPage + 1, 'of', this.props.pages, 'pages of reviews');
    
    
    if (this.props.currentPage > 0 && this.props.pages > 2) {
      //back button
      buttons.push(this.pageButton(arrows.backward,this.props.currentPage - 1));
    }

    //always page 1
    buttons.push(this.pageButton('1', 0, 0 === this.props.currentPage));

    if (this.props.currentPage < 2) {
      //buttons 1..3 (3)
      for(var i = 1; i < this.props.pages && i < 3; i++) {
        buttons.push(this.pageButton(''+ (i + 1), i, i === this.props.currentPage));
      }
      if (this.props.pages > 4) {
        buttons.push(this.emptyButton('...'));
      }
    }

    else if (this.props.currentPage < 4) {
      //buttons 1..n+1 (4-5)
      for(var i = 1; i < this.props.pages && i < this.props.currentPage + 2; i++) {
        buttons.push(this.pageButton(''+ (i + 1), i, i === this.props.currentPage));
      }
      buttons.push(this.emptyButton('...'));
    }

    else if (this.props.currentPage > this.props.pages - 3) {
      //buttons x..end (3)
      buttons.push(this.emptyButton('...'));
      for(var i = this.props.pages - 3; i < this.props.pages - 1; i++) {
        buttons.push(this.pageButton(''+ (i + 1), i, i === this.props.currentPage));
      }
    }

    else if (this.props.currentPage > this.props.pages - 5) {
      //buttons x-1..end (4-5)
      buttons.push(this.emptyButton('...'));
      for(var i = this.props.currentPage - 1; i < this.props.pages - 1; i++) {
        buttons.push(this.pageButton(''+ (i + 1), i, i === this.props.currentPage));
      }
    }

    else {
      // x-1 to x+1 (3)
      buttons.push(this.emptyButton('...'));
      for(var i = this.props.currentPage - 1; i < this.props.pages - 1 && i < this.props.currentPage + 2; i++) {
        buttons.push(this.pageButton(''+ (i + 1), i, i === this.props.currentPage));
      }
      buttons.push(this.emptyButton('...', 'b'));
    }

    //always last page
    if (this.props.pages > 3) {
      buttons.push(this.pageButton(this.props.pages, this.props.pages - 1, this.props.pages === this.props.currentPage + 1));
    }

    if (this.props.currentPage < this.props.pages - 1  && this.props.pages > 2) {
      //forward button
      buttons.push(this.pageButton(arrows.forward,this.props.currentPage + 1));
    }

    return buttons;

  }

  render () {

    return (
      <div id="reviewlistpages" className={styles.reviewListPages}>
        <span>
          {this.generateButtons()}
        </span>
      </div>
    );
  }
}