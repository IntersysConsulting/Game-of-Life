import React, { Component } from 'react';
import './game-area.css';
import Cell from '../cell/cell';

class GameArea extends Component {

  constructor(props) {
    super(props);
    this.state = {
      grid: this.createGrid(this.props.cellsLength.rows, this.props.cellsLength.columns)
    };
  }

  createGrid(rows,columns) {
    let grid = [];
    for(var row = 0; row < rows; row++) {
      let column = [];
      for(var col = 0; col < columns; col++) {
        let cell = !!Math.round( (Math.random() * 0.55) );
        column.push(cell);
      }
      grid.push(column);
    }

    return grid;
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => {this.evaluateGrid()},
      1000
    );
    
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  evaluateGrid() {
    let nextGridState  = [];
    for( let row in this.state.grid ){
      // each column in row
      
      // create an empty array for this row in nextGridState
      nextGridState.push([]);

      this.state.grid[row].forEach( 
        // for each cols in this row
        (value,col) => nextGridState[row].push( this.willLive(row,col) ) 
      );
    }
    this.setState({
      grid: nextGridState
    });
  }

  willLive(inputRow,inputCol) {
    let row = parseInt(inputRow);
    let col = parseInt(inputCol);
    let neighborCount = 0;
    const grid = this.state.grid;

    // set relative to the grid the values to where to start evaluation
    let rowStart = row >= 1 ? row - 1 : row ; 
    let rowEnd = row < this.props.cellsLength.rows -1 ? row + 1 : row ; 
    let colStart = col >= 1 ? col - 1 : col ; 
    let colEnd = col < this.props.cellsLength.columns -1 ? col + 1 : col ; 

    // compare into a grid from 3x3 around the actual cell
    for(let r = rowStart; r <= rowEnd ; r++){
      for( let c = colStart; c <= colEnd; c++){
        // is not self and 
        if( c !== col || r !== row ){
          //compared cell is alive, then add a neighbor
          !!grid[r][c] ? neighborCount++ : neighborCount;
        }
      }
    }

    // if it has 2 or 3 neighbors and is alive, stays alive
    // if its not alive and has 3 neighbors will become alive
    if( ( neighborCount > 1 && neighborCount < 4 && !!grid[row][col] ) || ( neighborCount === 3 && !grid[row][col] ) ){
      return true;
    }

    return false;

  }

  render() {
    let gridArea = [];
    let status = this.state.grid;
    
    for (let i = 0; i < status.length; i++) {
      // populate rows
      let cells = [];
      let cols = status[i];
      for(let j = 0; j < cols.length; j++) {
        // populate columns
        cells.push(
          <Cell key={j} isAlive={status[i][j]} ></Cell>
        );
      }

      // fill gridArea
      gridArea.push(<div key={i} className="gridRow" >{cells}</div>);
      
    }

    return (
      <div className='MainGrid'>
        {gridArea}
      </div>
    );
  }
}

export default GameArea;