import React, { Component } from 'React';
import { connect } from 'react-redux';
import { 
  shuffleDiscardPile,
  revealBookDeckCard, 
  playerDrawTopCard,
  playerTakeAvailableCard,
  discardBookCard,
  obtainBook,
  deliverBook,
  movePlayer
} from '../actions';

class BookCards extends Component {

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
            <button
              onClick={() => playerTakeAvailableCard(bookDeck, index)}
              className={book.type}
            >
              {book.type}
            </button>
          </li>
        )
      }
    })
  }

  renderBooks() {
    const { deliverBook } = this.props;
    const { players, activePlayer } = this.props.board;
    return players[activePlayer].inventory.map((book, index) => {
      return (
        <li key={index}>
          <Button 
            onClick={() => deliverBook(this.props.board, book, index)}
            enabled={!this.isBookstoreSpace()}
          >
            <img src={bookImg[book.type]} />
          </Button>
        </li>
      )
    })
  }

  obtainBook(book, index) {
    const { bookDeck, board, discardBookCard, obtainBook } = this.props;
    discardBookCard(bookDeck, index);
    obtainBook(board, book);
  }

  renderPlayerCards() {
    const { bookDeck } = this.props;
    return bookDeck.handPlayer1.map((book, index) => {
      const enabled = this.isPlayerCardEnabled(book.type);
      const requirePair = this.isBookstoreSpace() && !this.isCardInBookstore(book.type) && this.isThereAPair(book.type);
      return (
        <li key={book.id}>
          <Button
            enabled={enabled}
            className={`player-card ${requirePair ? 'require-pair' : ''} ${book.type}`}
            onClick={() => this.obtainBook(book, index)}
          >
            {book.type}
          </Button>
        </li>
      )
    })
  }

  render() {
    return (
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
            { this.renderBooks() }
          </ol>
        </div>
        <div className="card-stack">
          <button onClick={() => this.props.playerDrawTopCard(this.props.bookDeck) }>
            <h2>Draw Deck</h2>
          </button>
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
  playerDrawTopCard,
  playerTakeAvailableCard,
  discardBookCard
})(BookCards);