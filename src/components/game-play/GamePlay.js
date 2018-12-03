import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as shuffle from 'shuffle-array';
import GameCard from './GameCard';

export default class GamePlay extends Component {
    constructor(props) {
      super(props);
      let playSizeList = props.match.params.playSize.split('x');
      this.createCards = this.createCards.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.cardUpdate = this.createCardUpdate.bind(this);
      this.state = {
            playSize: props.match.params.playSize,
            cardWidth: playSizeList[0],
            cardHeight: playSizeList[1],
            cardTotal: parseInt(playSizeList[0]) * parseInt(playSizeList[1]),
            matchingPathExtensions: [],
            lastSelected: null
      };
    }


    componentDidMount() {
        this.setState({cards: this.createCards()});
    }

    handleClick(card) {
        this.setState({cards: this.createCards(this.state.cards, true, card)});
    } 

    createNewCards() {
        let lengthWidth = this.props.match.params.playSize.split('x'); 
        let totalPlaySize = lengthWidth[0] * lengthWidth[1];
        let cards = [];
        let orderedList = [...Array(totalPlaySize/2).keys()];
        let cardTotalDim = 100 / parseInt(lengthWidth[0]) - (parseInt(lengthWidth[0]) - 2);
        let cardWidth = {
            width: cardTotalDim.toString() + '%',
            height:  cardTotalDim.toString() + '%',
            marginBottom: '10px'
        };
      
        [...Array(2).keys()].forEach((arrayIndex, index) => {
          orderedList.forEach((item, itemIndex) => {
              // first/last in row don't get margin
              if ( (index + 1) % totalPlaySize !== 0 || index === 0) {
                  cardWidth['marginRight']  = '1%';
              } 
              cards.push(
                  <GameCard 
                      uniqItem={(item + Math.random())} 
                      style={cardWidth} 
                      action={this.handleClick} 
                      key={item + Math.random()} 
                      isFlipped={false}
                      pathExt={`image-` + item.toString() + `.png`}
                      ></GameCard>);
          });
        });
  
        shuffle(cards);
        
        return cards;
    }

    cardHasMatch(cards, card) {
        let hasMatch = false;
        cards.forEach((cardItem) => {
            if (card.pathExt === cardItem.pathExt && cardItem.isFlipped) {
                hasMatch = true;
            }
        });
        return hasMatch;
    }

    createCardUpdate(cards, selectedCard) {
        // if 1 is flipped, don't worry about it
        // if a 2nd is flipped check on the last flipped if not last flip was match
        // set card as last selected

        let matchFound = false;
        if (selectedCard.props.pathExt === this.state.lastSelected && selectedCard.props.uniqItem !== this.state.lastIndex) {
            matchFound = true;
        }

        let originalIndex = selectedCard.props.uniqItem;
        // if (this.state.lastSelected && selectedCard.pathExt !== this.state.lastSelected && !this.state.lastWasMatch) {

        // }
        let updatedCards = [];
        cards.forEach((card, index) => {
            let cardKeys = Object.keys(card.props);
            let newProps = {}

            cardKeys.forEach((key) => {
                newProps[key] = card.props[key];
            });
            // if current card is same as selected card, mark is flipped
            // if current card matches last selected path extension keep it, unless the last was a match
            if (originalIndex === card.props.uniqItem) {
                if (!matchFound && !this.state.lastSelected) {
                    newProps['isFlipped'] = true;
                } else if (matchFound || !matchFound) {
                    newProps['isFlipped'] = true;
                    if (matchFound) {
                        this.setState({matchingPathExtensions: this.state.matchingPathExtensions.concat([selectedCard.props.pathExt]) })
                    }
                }       
            }

            if (!matchFound && this.state.lastSelected === card.props.pathExt && this.state.matchingPathExtensions.indexOf(card.props.pathExt) === -1) {
                newProps['isFlipped'] = false;
            }

            newProps['key'] = index;
            updatedCards.push(newProps);
        });

        this.setState({lastSelected: selectedCard.props.pathExt, lastIndex: selectedCard.props.uniqItem}, () => {
            // console.log(this.state);
        });
        let reactCards = updatedCards.map((newProps) => React.createElement(GameCard, newProps));

        return reactCards;
    }

    createCards(cards, isExisting, selectedCard) {
      if (!cards && !isExisting) {
        return this.createNewCards();
      } else {
        return this.createCardUpdate(cards, selectedCard);
      }
    }
  
    render() {
      return (
        <div className="GamePlay">
         <Link className="BackButton" to={`/`}>
            <img className="BackButtonImg" src="/images/back-button.png"></img>
         </Link>
          <div className="CardSection">
            {this.state.cards}
          </div>
        </div>
      );
    }
  }