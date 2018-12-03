import React, { Component } from 'react';

export default class GameCardRow extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="GameCardRow">
                {this.props.cards}
            </div>
        )
    }
}