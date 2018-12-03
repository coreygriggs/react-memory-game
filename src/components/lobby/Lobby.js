import LobbyOption from './LobbyOption';
import React, { Component } from 'react';

export default class Lobby extends Component {
    render() {
      return (
        <div className="Home">
          <div className="gameplay-header">
            <h2>Select Your Game Size</h2>
          </div>
          <div className="content">
            <div className="options">
              <LobbyOption value="3x4"></LobbyOption>
              <LobbyOption value="5x2"></LobbyOption>
              <LobbyOption value="4x4"></LobbyOption>
              <LobbyOption value="4x5"></LobbyOption>
            </div>
          </div>
        </div>
      )
    }
}

  