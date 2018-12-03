import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Lobby  from './components/lobby/Lobby';
import GamePlay from './components/game-play/GamePlay';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  render() {
    return (
      <Router>
         <div className="App">
          <div className="MemoryGame">Memory Game</div>
        
          <Route path="/" exact component={Lobby} />
          <Route path="/gameplay/:playSize" component={GamePlay} />
        </div>
      </Router>      
    );
  }
}

export default App;
