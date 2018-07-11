import React, { Component } from 'react'
import { connect } from 'react-redux';

import Button from './Button';
import { 
  obtainBook,
  deliverBook,
  movePlayer
} from '../actions';
import bookImg from '../data/bookImages';

class GameBoard extends Component {

  isSpaceEnabled(space, index) {
    const { board } = this.props;
    return (space.type === 'bookstore' && board.players[board.activePlayer].location === null) ||
    index === (board.players[board.activePlayer].location + 1) % 8 ||
    index === (board.players[board.activePlayer].location + 2) % 8 ||
    index === (board.players[board.activePlayer].location + 3) % 8 ||
    index === (board.players[board.activePlayer].location + 4) % 8;
  }

  isBookstoreSpace() {
    const { spaces, players, activePlayer } = this.props.board;
    return spaces[players[activePlayer].location].type === 'bookstore';
  }

  isCardInBookstore(bookType) {
    const { spaces, players, activePlayer } = this.props.board;
    return spaces[players[activePlayer].location].genres.includes(bookType);
  }

  isThereAPair(bookType) {
    const { bookDeck } = this.props;
    return bookDeck.handPlayer1.filter(book => book.type === bookType).length >= 2
  }

  isAvailableSpaceInInventory() {
    const { players, activePlayer } = this.props.board;
    return players[activePlayer].inventory.length < 4;
  }

  isPlayerCardEnabled(bookType) {
    return this.isBookstoreSpace() && this.isAvailableSpaceInInventory() && (this.isCardInBookstore(bookType) || this.isThereAPair(bookType));
  }

  renderBookstoreInfo(space) {
    return space.genres.map((genre, index) => {
      return (
        <li key={index}>
          <Button className={genre}>
            {genre}
          </Button>
        </li>
      )
    })
  }

  renderTownInfo(space) {
    return Object.keys(space.genres).map((genre, genreIndex) => (
      <div key={genreIndex} className={`${genre} die pips-${space.genres[genre]}`}>
        <div className="pip"/>
        <div className="pip"/>
        <div className="pip"/>
        <div className="pip"/>
        <div className="pip"/>
        <div className="pip"/>
      </div>
    ))
  }

  renderDeliveredBooks(spaceIndex) {
    const { players, activePlayer } = this.props.board;
    return players[activePlayer].deliveredBooks[spaceIndex].map((deliveredBook, index) => {
      return (
        <li key={deliveredBook.id}>
          <img src={bookImg[deliveredBook.type]}/>
        </li>
      )
    })
  }

  renderBoard() {
    const { board, movePlayer } = this.props
    return board.spaces.map((space, index) => {
      const enabled = this.isSpaceEnabled(space, index)
      return (
        <div key={space.id}>
          <div>
            <ol>
              {space.type === 'town' ? this.renderDeliveredBooks(index) : ''}
            </ol>
          </div>
          <Button
            enabled={enabled}
            className={`game-space ${space.type}-space`}
            onClick={() => movePlayer(board, index)}
          >
            {space.type}
            {space.playersOnSpace.length ? (
              <div className={`player ${board.activePlayer}`}>
                {space.playersOnSpace}
              </div>
            ) : (
              ''
            )}
          </Button>
          <div>
            <ol>
              {space.type === 'town'
                ? this.renderTownInfo(space)
                : this.renderBookstoreInfo(space)}
            </ol>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="game-spaces">
        { this.renderBoard() }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    bookDeck: state.bookDeck,
    board: state.board
  }
}

export default connect(mapStateToProps, { 
  obtainBook,
  deliverBook,
  movePlayer
})(GameBoard);
