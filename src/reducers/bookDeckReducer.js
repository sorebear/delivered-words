import bookDeck from '../data/bookDeck';
import types from '../actions/types';

const drawDeck = bookDeck.sort(() => 0.5 - Math.random());

const DEFAULT_STATE = { 
  discard: [],
  draw: drawDeck,
  available: {
    0: null,
    1: null,
    2: null,
    3: null
  },
  handPlayer1: []
}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case (types.SHUFFLE_DISCARD_PILE):
      return {  
        ...state, 
        draw: action.payload.draw, 
        discard: action.payload.discard 
      }
    case (types.REVEAL_BOOK_DECK_CARD):
      return { 
        ...state, 
        draw: action.payload.draw }
    case (types.PLAYER_TAKE_AVAILABLE_CARD):
      return { 
        ...state, 
        available: action.payload.available, 
        handPlayer1: action.payload.handPlayer1 
      }
    case (types.PLAYER_DRAW_TOP_CARD):
      return {
        ...state,
        draw: action.payload.draw,
        handPlayer1: action.payload.handPlayer1
      }
    case (types.DISCARD_BOOK_CARD):
      return { 
        ...state, 
        discard: action.payload.discard, 
        handPlayer1: action.payload.handPlayer1 
      }
    default:
      return state;
  }
}