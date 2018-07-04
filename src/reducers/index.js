import { combineReducers } from 'redux';

import testReducer from './testReducer';
import bookDeckReducer from './bookDeckReducer';
import gameBoardReducer from './gameBoardReducer';

export default combineReducers({
  test: testReducer,
  bookDeck: bookDeckReducer,
  board: gameBoardReducer
});