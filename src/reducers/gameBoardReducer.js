import types from '../actions/types';

const genreArr = ['fantasy', 'adventure', 'sci-fi', 'mystery', 'romance', 'horror', 'biography', 'drama'];

const bookstoreGenreArr = [ ...genreArr.sort(() => 0.5 - Math.random()) ];
const townGenreArr1 = [ ...genreArr.sort(() => 0.5 - Math.random()) ];
const townGenreArr2 = [ ...genreArr.sort(() => 0.5 - Math.random()) ];

bookstoreGenreArr.sort(() => 0.5 - Math.random());

function randomNumer() {
  return Math.ceil(Math.random() * 5) + 1;
}

const DEFAULT_STATE = {
  spaces: [
    {
      id: 'townSpace0',
      type: 'town',
      playersOnSpace: [],
      genres: Array.from([{
        type: townGenreArr1[0],
        quantity: randomNumer()
      }, {
        type: townGenreArr1[1],
        quantity: randomNumer()
      }, {
        type: townGenreArr1[2],
        quantity: randomNumer()
      }, {
        type: townGenreArr1[3],
        quantity: randomNumer()
      }])
    },
    {
      id: 'townSpace1',
      type: 'town',
      playersOnSpace: [],
      genres: Array.from([{
        type: townGenreArr2[0],
        quantity: randomNumer()
      }, {
        type: townGenreArr2[1],
        quantity: randomNumer()
      }, {
        type: townGenreArr2[2],
        quantity: randomNumer()
      }])
    },
    {
      id: 'townSpace2',
      type: 'town',
      playersOnSpace: [],
      genres: Array.from([{
        type: townGenreArr2[3],
        quantity: randomNumer()
      }, {
        type: townGenreArr2[4],
        quantity: randomNumer()
      }])
    },
    {
      id: 'townSpace3',
      type: 'town',
      playersOnSpace: [],
      genres: Array.from([{
        type: townGenreArr2[5],
        quantity: randomNumer()
      }, {
        type: townGenreArr2[6],
        quantity: randomNumer()
      }, {
        type: townGenreArr2[7],
        quantity: randomNumer()
      }])
    },
    {
      id: 'townSpace4',
      type: 'town',
      playersOnSpace: [],
      genres: Array.from([{
        type: townGenreArr1[4],
        quantity: randomNumer()
      }, {
        type: townGenreArr1[5],
        quantity: randomNumer()
      }, {
        type: townGenreArr1[6],
        quantity: randomNumer()
      }, {
        type: townGenreArr1[7],
        quantity: randomNumer()
      }])
    },
    {
      id: 'bookStoreSpace1',
      type: 'bookstore',
      playersOnSpace: [],
      genres: Array.from([bookstoreGenreArr[0], bookstoreGenreArr[1], bookstoreGenreArr[2]])
    },
    {
      id: 'bookStoreSpace2',
      type: 'bookstore',
      playersOnSpace: [],
      genres: Array.from([bookstoreGenreArr[3], bookstoreGenreArr[4]])
    },
    {
      id: 'bookStoreSpace3',
      type: 'bookstore',
      playersOnSpace: [],
      genres: Array.from([bookstoreGenreArr[5], bookstoreGenreArr[6], bookstoreGenreArr[7]])
    },
  ],
  playerLocation: {
    player1: null
  }
}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case (types.MOVE_PLAYER):
      return { ...state, spaces: action.payload.spaces, playerLocation: action.payload.playerLocation }
    default:
      return state;
  }
}