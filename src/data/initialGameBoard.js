const genreArr = ['fantasy', 'adventure', 'sci-fi', 'mystery', 'romance', 'horror', 'biography', 'drama'];
const bookstoreGenreArr = [ ...genreArr.sort(() => 0.5 - Math.random()) ];
const townGenreArr1 = [ ...genreArr.sort(() => 0.5 - Math.random()) ];
const townGenreArr2 = [ ...genreArr.sort(() => 0.5 - Math.random()) ];

function randomNumber() {
  return Math.ceil(Math.random() * 5) + 1;
}

const initialGameBoard = {
  activePlayer: 'player1',
  spaces: [
    {
      id: 'townSpace0',
      type: 'town',
      playersOnSpace: [],
      genres: {}
    },
    {
      id: 'townSpace1',
      type: 'town',
      playersOnSpace: [],
      genres: {}
    },
    {
      id: 'townSpace2',
      type: 'town',
      playersOnSpace: [],
      genres: {}
    },
    {
      id: 'townSpace3',
      type: 'town',
      playersOnSpace: [],
      genres: {}
    },
    {
      id: 'townSpace4',
      type: 'town',
      playersOnSpace: [],
      genres: {}
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
  players: {
    player1: {
      location: null,
      inventory: [],
      deliveredBooks: [
        [],
        [],
        [],
        [],
        []
      ],
      score: 0
    }
  }
}

initialGameBoard.spaces[0].genres[townGenreArr1[0]] = randomNumber();
initialGameBoard.spaces[0].genres[townGenreArr1[1]] = randomNumber();
initialGameBoard.spaces[0].genres[townGenreArr1[2]] = randomNumber();
initialGameBoard.spaces[0].genres[townGenreArr1[3]] = randomNumber();

initialGameBoard.spaces[1].genres[townGenreArr2[0]] = randomNumber();
initialGameBoard.spaces[1].genres[townGenreArr2[1]] = randomNumber();
initialGameBoard.spaces[1].genres[townGenreArr2[2]] = randomNumber();

initialGameBoard.spaces[2].genres[townGenreArr2[3]] = randomNumber();
initialGameBoard.spaces[2].genres[townGenreArr2[4]] = randomNumber();

initialGameBoard.spaces[3].genres[townGenreArr2[5]] = randomNumber();
initialGameBoard.spaces[3].genres[townGenreArr2[7]] = randomNumber();
initialGameBoard.spaces[3].genres[townGenreArr2[6]] = randomNumber();

initialGameBoard.spaces[4].genres[townGenreArr1[4]] = randomNumber();
initialGameBoard.spaces[4].genres[townGenreArr1[5]] = randomNumber();
initialGameBoard.spaces[4].genres[townGenreArr1[6]] = randomNumber();
initialGameBoard.spaces[4].genres[townGenreArr1[7]] = randomNumber();

export default initialGameBoard;