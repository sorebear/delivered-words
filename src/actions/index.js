import types from './types';

export function shuffleDiscardPile(books) {
  const draw = [...books.discard.sort(() => 0.5 - Math.random()) ];
  const discard = [];
  return {
    type: types.SHUFFLE_DISCARD_PILE,
    payload: { draw, discard }
  }
}

export function playerTakeAvailableCard(books, index) {
  const { handPlayer1, available } = books;
  handPlayer1.push({ ...available[index] });
  handPlayer1.sort((a, b) => ( 
    a.type === b.type ? 0 : a.type < b.type ? -1 : 1
  ));
  available[index] = null;
  return {
    type: types.PLAYER_TAKE_AVAILABLE_CARD,
    payload: { handPlayer1, available }
  }
}

export function playerDrawTopCard(books, index) {
  const draw = books.draw.slice(1);
  const { handPlayer1 } = books;
  handPlayer1.push(books.draw[0]);
  handPlayer1.sort((a, b) => ( 
    a.type === b.type ? 0 : a.type < b.type ? -1 : 1
  ));
  return {
    type: types.PLAYER_DRAW_TOP_CARD,
    payload: { draw, handPlayer1 }
  }
}

export function revealBookDeckCard(books, index) {
  const { available } = books;
  available[index] = books.draw[0];
  const draw = books.draw.slice(1);
  return {
    type: types.REVEAL_BOOK_DECK_CARD,
    payload: { available, draw }
  }
}

export function discardBookCard(books, index) {
  const { discard, handPlayer1 } = books;
  discard.push({...handPlayer1[index]});
  handPlayer1.splice(index, 1);
  return {
    type: types.DISCARD_BOOK_CARD,
    payload: { discard, handPlayer1 }
  }
}

export function obtainBook(board, book) {
  const { activePlayer, players } = board;
  players[activePlayer].inventory.push(book);
  return {
    type: types.OBTAIN_BOOK,
    payload: { players }
  }
}

export function deliverBook(board, book, index) {
  const { spaces, players, activePlayer } = board;
  const { location, score, inventory } = players[activePlayer];
  const newScore = spaces[location].genres.hasOwnProperty(book.type) ?
    score + spaces[location].genres[book.type] :
    score + 1
  players[activePlayer].score = newScore;
  const deliveredBook = inventory.splice(index, 1);
  players[activePlayer].deliveredBooks[location].push(deliveredBook[0]);
  return {
    type: types.DELIVER_BOOK,
    payload: { players }
  }
}

export function movePlayer(board, spaceIndex) {
  const { spaces, players, activePlayer } = board;
  if (players[activePlayer].location !== null) {
    const oldIndex = players[activePlayer].location;
    spaces[oldIndex].playersOnSpace.splice(spaces[oldIndex].playersOnSpace.indexOf(activePlayer), 1);
  }
  players[activePlayer].location = spaceIndex;
  spaces[spaceIndex].playersOnSpace.push(activePlayer);
  return {
    type: types.MOVE_PLAYER,
    payload: { spaces, players }
  }
}