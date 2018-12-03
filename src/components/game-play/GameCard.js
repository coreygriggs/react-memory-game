import React, { Component } from 'react';

export default class GameCard extends Component {
    constructor(props) {
        super(props);
        this.flipCard = this.flipCard.bind(this);
        this.state = {
            isFlipped: this.props.isFlipped,
            imageToShow:  '/images/card-back.png'
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.isFlippedItem !== this.props.isFlippedItem){
            this.setState({isFlippedItem: nextProps.isFlippedItem});
        }
    }

    flipCard() {
        if (this.state.isFlippedItem === this.props.uniqItem) {
            this.setState({isFlipped: !this.state.isFlipped, imageToShow: this.props.pathExt, isFlippedItem: null});
        } else {
            this.setState({isFlipped: !this.state.isFlipped, imageToShow: this.props.pathExt, isFlippedItem: this.props.uniqItem});
        }
        this.setState({isFlipped: !this.state.isFlipped, imageToShow: this.props.pathExt});
        this.props.action(this);
    }

    render() {
        this.state.imageToShow = this.props.isFlipped ? '/images/' + this.props.pathExt : '/images/card-back.png';
        return (
            <img 
                alt="memory game" 
                className="GameCard" 
                src={this.state.imageToShow} 
                onClick={this.flipCard}
                style={this.props.style}
                isFlippedItem={this.state.isFlippedItem}
            />
        )
    }
}