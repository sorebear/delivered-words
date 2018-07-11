import React, { Component } from 'react'
import { connect } from 'react-redux'

import Button from '../components/Button'
import bookImg from '../data/bookImages';
import {
  shuffleDiscardPile,
  revealBookDeckCard,
  playerDrawTopCard,
  playerTakeAvailableCard,
  discardBookCard,
  obtainBook,
  deliverBook,
  movePlayer,
} from '../actions'

class BookDeck extends Component {
  componentDidMount() {
    this.props.revealBookDeckCard(this.props.bookDeck, 0)
  }

  componentDidUpdate() {
    const { bookDeck, shuffleDiscardPile, revealBookDeckCard } = this.props
    if (!bookDeck.draw.length) {
      shuffleDiscardPile(bookDeck)
    } else if (!bookDeck.available[0]) {
      revealBookDeckCard(bookDeck, 0)
    } else if (!bookDeck.available[1]) {
      revealBookDeckCard(bookDeck, 1)
    } else if (!bookDeck.available[2]) {
      revealBookDeckCard(bookDeck, 2)
    } else if (!bookDeck.available[3]) {
      revealBookDeckCard(bookDeck, 3)
    }
  }

  renderDrawDeck() {
    return this.props.bookDeck.draw.map((book, index) => (
      <li key={book.id}>{book.type}</li>
    ))
  }

  renderAvailableCards() {
    const { bookDeck, playerTakeAvailableCard } = this.props
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

  renderDiscardPile() {
    return this.props.bookDeck.discard.map(book => {
      return <li key={book.id}>{book.type}</li>
    })
  }

  renderBooks() {
    const { deliverBook } = this.props
    const { players, activePlayer } = this.props.board
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
    const { bookDeck, board, discardBookCard, obtainBook } = this.props
    discardBookCard(bookDeck, index)
    obtainBook(board, book)
  }

  renderPlayerCards() {
    const { bookDeck } = this.props
    return bookDeck.handPlayer1.map((book, index) => {
      const enabled = this.isPlayerCardEnabled(book.type)
      const requirePair =
        this.isBookstoreSpace() &&
        !this.isCardInBookstore(book.type) &&
        this.isThereAPair(book.type)
      return (
        <li key={book.id}>
          <Button
            enabled={enabled}
            className={`player-card ${requirePair ? 'require-pair' : ''} ${
              book.type
            }`}
            onClick={() => this.obtainBook(book, index)}
          >
            {book.type}
          </Button>
        </li>
      )
    })
  }

  isSpaceEnabled(space, index) {
    const { board } = this.props
    return (
      (space.type === 'bookstore' &&
        board.players[board.activePlayer].location === null) ||
      index === (board.players[board.activePlayer].location + 1) % 8 ||
      index === (board.players[board.activePlayer].location + 2) % 8 ||
      index === (board.players[board.activePlayer].location + 3) % 8 ||
      index === (board.players[board.activePlayer].location + 4) % 8
    )
  }

  isBookstoreSpace() {
    const { spaces, players, activePlayer } = this.props.board
    return spaces[players[activePlayer].location].type === 'bookstore'
  }

  isCardInBookstore(bookType) {
    const { spaces, players, activePlayer } = this.props.board
    return spaces[players[activePlayer].location].genres.includes(bookType)
  }

  isThereAPair(bookType) {
    const { bookDeck } = this.props
    return (
      bookDeck.handPlayer1.filter(book => book.type === bookType).length >= 2
    )
  }

  isAvailableSpaceInInventory() {
    const { players, activePlayer } = this.props.board
    return players[activePlayer].inventory.length < 4
  }

  isPlayerCardEnabled(bookType) {
    return (
      this.isBookstoreSpace() &&
      this.isAvailableSpaceInInventory() &&
      (this.isCardInBookstore(bookType) || this.isThereAPair(bookType))
    )
  }

  renderBookstoreInfo(space) {
    return space.genres.map((genre, index) => {
      return (
        <li key={index}>
          <Button className={genre}>{genre}</Button>
        </li>
      )
    })
  }

  renderTownInfo(space) {
    return Object.keys(space.genres).map((genre, genreIndex) => (
      <div
        key={genreIndex}
        className={`${genre} die pips-${space.genres[genre]}`}
      >
        <div className="pip" />
        <div className="pip" />
        <div className="pip" />
        <div className="pip" />
        <div className="pip" />
        <div className="pip" />
      </div>
    ))
  }

  renderDeliveredBooks(spaceIndex) {
    const { players, activePlayer } = this.props.board
    return players[activePlayer].deliveredBooks[spaceIndex].map(
      (deliveredBook, index) => {
        return (
          <li key={deliveredBook.id}>
            <img src={bookImg[deliveredBook.type]} />
          </li>
        )
      }
    )
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
    console.log('THE PROPS:', this.props);
    return (
      <div>
        <h2>Board</h2>
        <div className="game-spaces">
          {this.renderBoard()}
        </div>
        <div className="cards">
          <div className="card-stack">
            <h2>Available Cards</h2>
            <ol>{this.renderAvailableCards()}</ol>
          </div>
          <div className="card-stack">
            <h2>Player 1 Cards</h2>
            <ol>{this.renderPlayerCards()}</ol>
            <h2>Player 1 Books</h2>
            <ol>{this.renderBooks()}</ol>
          </div>
          <div className="card-stack">
            <button
              onClick={() => this.props.playerDrawTopCard(this.props.bookDeck)}
            >
              <h2>Draw Deck</h2>
            </button>
            <ol>{this.renderDrawDeck()}</ol>
          </div>
          <div className="card-stack">
            <h2>Discard Pile</h2>
            <ol>{this.renderDiscardPile()}</ol>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    bookDeck: state.bookDeck,
    board: state.board,
  }
}

export default connect(
  mapStateToProps, {
    shuffleDiscardPile,
    revealBookDeckCard,
    playerDrawTopCard,
    playerTakeAvailableCard,
    discardBookCard,
    obtainBook,
    deliverBook,
    movePlayer,
  })(BookDeck)
