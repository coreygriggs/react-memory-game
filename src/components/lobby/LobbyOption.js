import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class LobbyOption extends Component {
    constructor(props) {
      super(props);
      this.state = {
        value: null,
      };
    }
  
    render() {
      return (
        <div  className="LobbyOption">
          <Link to={`/gameplay/${this.props.value}`}>{this.props.value}</Link>
        </div>
      );
    }
  }
