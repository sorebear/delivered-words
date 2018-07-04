import types from './types';

export function shuffleDiscardPile(books) {
  const newBooks = { ...books }
  newBooks.draw = [...newBooks.discard.sort((a, b) => 0.5 - Math.random()) ];
  newBooks.discard = [];
  return {
    type: types.SHUFFLE_DISCARD_PILE,
    payload: newBooks
  }
}

export function playerTakeAvailableCard(books, index) {
  const newBooks = { ...books };
  newBooks.handPlayer1.push({ ...newBooks.available[index] });
  newBooks.handPlayer1.sort((a, b) => ( 
    a.type === b.type ? 0 : a.type < b.type ? -1 : 1
  ));
  newBooks.available[index] = null;
  return {
    type: types.PLAYER_TAKE_AVAILABLE_CARD,
    payload: newBooks
  }
}

export function revealBookDeckCard(books, index) {
  const newBooks = { ...books };
  newBooks.available[index] = newBooks.draw[0];
  return {
    type: types.REVEAL_BOOK_DECK_CARD,
    payload: newBooks
  }
}

export function discardBookCard(books, index) {
  const newBooks = { ...books };
  newBooks.discard.push({...newBooks.handPlayer1[index]});
  newBooks.handPlayer1.splice(index, 1);
  return {
    type: types.DISCARD_BOOK_CARD,
    payload: newBooks
  }
}

export function movePlayer(board, spaceIndex) {
  const newBoard = { ...board };
  const { spaces, playerLocation } = newBoard;
  if (playerLocation['player1']) {
    const oldIndex = playerLocation['player1'];
    spaces[oldIndex].playersOnSpace.splice(spaces[oldIndex].playersOnSpace.indexOf('player1'), 1);
  }
  playerLocation['player1'] = spaceIndex;
  spaces[spaceIndex].playersOnSpace.push('player1');
  return {
    type: types.MOVE_PLAYER,
    payload: newBoard
  }
}