import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../components/Button';
import { 
  shuffleDiscardPile,
  revealBookDeckCard, 
  playerTakeAvailableCard,
  discardBookCard,
  movePlayer
} from '../actions';

class BookDeck extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.revealBookDeckCard(this.props.bookDeck, 0);
  }

  componentDidUpdate() {
    const { bookDeck, shuffleDiscardPile, revealBookDeckCard } = this.props;
    if (!bookDeck.draw.length) {
      shuffleDiscardPile(bookDeck);
    } else if (!bookDeck.available[0]) {
      revealBookDeckCard(bookDeck, 0);
    } else if (!bookDeck.available[1]) {
      revealBookDeckCard(bookDeck, 1);
    } else if (!bookDeck.available[2]) {
      revealBookDeckCard(bookDeck, 2);
    } else if (!bookDeck.available[3]) {
      revealBookDeckCard(bookDeck, 3);
    }
  }

  isSpaceEnabled(space, index) {
    const { board } = this.props;
    return (space.type === 'bookstore' && board.playerLocation[board.activePlayer] === null) ||
    index === (board.playerLocation[board.activePlayer] + 1) % 8 ||
    index === (board.playerLocation[board.activePlayer] + 2) % 8 ||
    index === (board.playerLocation[board.activePlayer] + 3) % 8 ||
    index === (board.playerLocation[board.activePlayer] + 4) % 8;
  }

  renderBookstoreInfo(space) {
    return space.genres.map((genre, index) => (
      <li key={index}>{genre}</li>
    ))
  }

  renderTownInfo(space) {
    return space.genres.map((genre, genreIndex) => (
      <li key={genreIndex}>{genre.type} ({genre.quantity})</li>
    ))
  }

  renderBoard() {
    const { board, movePlayer } = this.props;
    return board.spaces.map((space, index) => {
      const enabled = this.isSpaceEnabled(space, index);
      return (
        <div key={space.id}>
          <Button
            enabled={enabled}
            className={`game-space ${space.type}-space`}
            onClick={() => movePlayer(board, index)}
          >
            { space.type }
            { space.playersOnSpace.length ? (
              <div className={`player ${board.activePlayer}`}>
                { space.playersOnSpace }
              </div>
            ) : ''}
          </Button>
          <div>
            <ol>
              { space.type === 'town' ? this.renderTownInfo(space) : this.renderBookstoreInfo(space) }
            </ol>
          </div>
        </div>
      )
    })
  }

  renderDrawDeck() {
    return this.props.bookDeck.draw.map((book, index) => (
      <li key={book.id}>{book.type}</li>
    ))
  }

  renderDiscardPile() {
    return this.props.bookDeck.discard.map(book => {
      return (
        <li key={book.id}>{book.type}</li>
      )
    });
  }

  renderAvailableCards() {
    const { bookDeck, playerTakeAvailableCard } = this.props;
    return Object.values(bookDeck.available).map((book, index) => {
      if (book) {
        return (
          <li key={book.id}>
            <button onClick={() => playerTakeAvailableCard(bookDeck, index)}>
              {book.type}
            </button>
          </li>
        )
      }
    })
  }

  isPlayerCardEnabled(book) {
    return (this.isCardInBookstore(book) || this.isThereAPair(book.typeId)) && this.isBookstoreSpace();
  }

  isCardInBookstore(book) {
    const { spaces, playerLocation, activePlayer } = this.props.board;
    return spaces[playerLocation[activePlayer]].genres.includes(book.type);
  }

  isBookstoreSpace() {
    const { spaces, playerLocation, activePlayer } = this.props.board;
    return spaces[playerLocation[activePlayer]].type === 'bookstore';
  }

  isThereAPair(typeId) {
    const { bookDeck } = this.props;
    return bookDeck.handPlayer1.filter((book) => book.typeId === typeId).length >= 2
  }

  renderPlayerCards() {
    const { bookDeck, discardBookCard, board } = this.props;
    return bookDeck.handPlayer1.map((book, index) => {
      const enabled = this.isPlayerCardEnabled(book);
      const requirePair = this.isBookstoreSpace() && !this.isCardInBookstore(book) && this.isThereAPair(book.typeId);
      return (
        <li key={book.id}>
          <Button
            enabled={enabled}
            className={`player-card ${requirePair ? 'require-pair' : ''}`}
            onClick={() => discardBookCard(bookDeck, index)}
          >
            {book.type}
          </Button>
        </li>
      )
    })
  }

  render() {
    console.log('THE PROPS:', this.props);
    return (
      <div>
        <h2>Board</h2>
        <div className="game-spaces">
          { this.renderBoard() }
        </div>
        <div className="cards">
          <div className="card-stack">
            <h2>Available Cards</h2>
            <ol>
              { this.renderAvailableCards() }
            </ol>
          </div>
          <div className="card-stack">
            <h2>Player 1 Cards</h2>
            <ol>
              { this.renderPlayerCards() }
            </ol>
            <h2>Player 1 Books</h2>
            <ol>

            </ol>
          </div>
          <div className="card-stack">
            <h2>Draw Deck</h2>
            <ol>
              { this.renderDrawDeck() }
            </ol>
          </div>
          <div className="card-stack">
            <h2>Discard Pile</h2>
            <ol>
              { this.renderDiscardPile() }
            </ol>
          </div>
        </div>
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
  shuffleDiscardPile,
  revealBookDeckCard,
  playerTakeAvailableCard,
  discardBookCard,
  movePlayer
})(BookDeck);