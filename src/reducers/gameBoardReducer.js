import types from '../actions/types';
import initialGameBoard from '../data/initialGameBoard';

const DEFAULT_STATE = initialGameBoard;

export default (state = DEFAULT_STATE, action) => {
  console.log('BOARD REDUCING');
  switch(action.type) {
    case (types.MOVE_PLAYER):
      return { 
        ...state, 
        spaces: action.payload.spaces, 
        players: action.payload.players 
      }
    case (types.OBTAIN_BOOK):
      return {
        ...state,
        players: action.payload.players
      }
    case (types.DELIVER_BOOK):
      debugger;
      console.log(`I AM DELIVERED:`, action.payload)
      return {
        ...state,
        players: action.payload.players
      }
    default:
      return state;
  }
}