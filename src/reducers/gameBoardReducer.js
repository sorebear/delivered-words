import types from '../actions/types';
import initialGameBoard from '../data/initialGameBoard';

const DEFAULT_STATE = initialGameBoard;

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case (types.MOVE_PLAYER):
      return { ...state, spaces: action.payload.spaces, playerLocation: action.payload.playerLocation }
    default:
      return state;
  }
}