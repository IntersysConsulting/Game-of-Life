import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import GameArea from '../components/game-area/game-area';
import './App.css';

class App extends Component {
  render() {
    const grid = {
      rows: 50,
      columns: 50
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Game Of Life - React</h1>
        </header>
        <GameArea cellsLength={grid} />
      </div>
    );
  }
}

export default App;
