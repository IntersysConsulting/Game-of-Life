import React, { Component } from 'react';
import './cell.css';
import { classStr } from '../../utils/utils';

class Cell extends Component {

  // constructor(props) {
  //   super(props);
  // }

  render() {

    const classes = {
        cell: true,
        isAlive: this.props.isAlive
    };
    
    const appliedClasses = classStr(classes);

    return (
      <div className={ appliedClasses }>{this.props.children}</div>
    );
  }
}

export default Cell;