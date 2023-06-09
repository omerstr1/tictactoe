import "./styles/App.css";
import React, { useEffect } from "react";
import Tile from "./components/Tile.jsx";
import WinningAnimation from "./components/WinningAnimations.jsx";
import winnerCat from "./assets/dancing-cat-gif.gif";
import History from "./components/History.jsx";
import Confetti from './components/Confetti';


//TODO:
//3. externelize components and functions X
//4. clean up app
//
const generateBoard = () => {
  return [
    [
      { id: 0, value: " " },
      { id: 1, value: " " },
      { id: 2, value: " " },
    ],
    [
      { id: 3, value: " " },
      { id: 4, value: " " },
      { id: 5, value: " " },
    ],
    [
      { id: 6, value: " " },
      { id: 7, value: " " },
      { id: 8, value: " " },
    ],
  ];
};

function App() {
  const [board, setBoard] = React.useState(generateBoard);
  const [hasWinner, setHasWinner] = React.useState(false);
  const [history, setHistory] = React.useState([]);

  //Elements *******************************************************

  const TileElements = () => {
    return (
      <div className="grid-row-container">
        {board.map((row, rowIndex) => (
          <div className="grid-col-container" key={rowIndex}>
            {row.map((cell) => (
              <Tile
                key={cell.id}
                value={cell.value}
                id={cell.id}
                handleClick={
                  hasWinner ? null : () => handleClick(cell.id, currPlayer())
                }
              />
            ))}
          </div>
        ))}
      </div>
    );
  };

  const newBoard = () => {
    setBoard(generateBoard);
    setHistory([]);
    setHasWinner(false);
  };

  //History
  //component
  const historyElements = history.map((move, index) => (
    <div key={index}>
      <button
        className="history-btn"
        onClick={() => handleHistory(history, index)}
      >
        {index}. move is {move.value} in spot {move.id + 1}
      </button>
    </div>
  ));

  //Basic game******************************************************

  //Check who is the current player

  const currPlayer = () => {
    if (history.length % 2 === 1) {
      return "O";
    } else {
      return "X";
    }
  };

  //generate an empty board
  //matrix-------------------------------------------------------------------------

  //Generate a new game
  //matrix-------------------------------------------------------------------------

  //Check for winner

  useEffect(() => {
    const hasWinner = checkWinner(board);
    setHasWinner(hasWinner);
  }, [board]);

  //If game is over by tie

  function isBoardFull() {
    return history.length === 9;
  }

  //If game is over by win
  // change to foreach
  //matrix-------------------------------------------------------------------------

  const checkWinner = (matrix) => {
    // Check rows
    for (let row = 0; row < 3; row++) {
      if (
        matrix[row][0].value !== " " &&
        matrix[row][0].value === matrix[row][1].value &&
        matrix[row][1].value === matrix[row][2].value
      ) {
        return true;
      }
    }

    // Check columns
    for (let col = 0; col < 3; col++) {
      if (
        matrix[0][col].value !== " " &&
        matrix[0][col].value === matrix[1][col].value &&
        matrix[1][col].value === matrix[2][col].value
      ) {
        return true;
      }
    }

    // Check diagonals
    if (
      matrix[0][0].value !== " " &&
      matrix[0][0].value === matrix[1][1].value &&
      matrix[1][1].value === matrix[2][2].value
    ) {
      return true;
    }
    if (
      matrix[0][2].value !== " " &&
      matrix[0][2].value === matrix[1][1].value &&
      matrix[1][1].value === matrix[2][0].value
    ) {
      return true;
    }

    // No winning player
    return false;
  }

  //Tile click
  //matrix-------------------------------------------------------------------------
  const handleClick =(id, newValue) => {
    const row = Math.floor(id / 3);
    const col = id % 3;
    if (board[row][col].value === " ") {
      let newBoard = [...board];
      newBoard[row][col].value = newValue;
      setBoard(newBoard);
      addToHistory(id, newValue);

      const winnerExists = checkWinner(newBoard);
      setHasWinner(winnerExists);
    }
  }
  //Setting a title

  const title = () => {
    if (hasWinner) {
      return `${history[history.length - 1].value} Won!`;
    } else if (isBoardFull()) {
      return "It's a tie!";
    } else {
      return `${currPlayer()}'s Turn`;
    }
  }

  //Basic game******************************************************

  //History Functionality*******************************************

  //add Move To History
  //matrix-------------------------------------------------------------------------
  const addToHistory = (id, value) => {
    setHistory((oldHistory) => [...oldHistory, { id, value }]);
  }

  //Generate a board from history
  //matrix-------------------------------------------------------------------------
  const generateBoardFromArray = (newHistory) => {
    let newBoard = generateBoard();
    for (let j = 0; j < newHistory.length; j++) {
      newBoard[Math.floor(newHistory[j].id / 3)][newHistory[j].id % 3].value =
        newHistory[j].value;
    }
    return newBoard;
  }

  //Handle a click on a history button

  const handleHistory = (currHistory, index) => {
    const newHistory = currHistory.slice(0, index + 1);
    const newBoard = generateBoardFromArray(newHistory);
    setBoard(newBoard);
    setHistory(newHistory);
  }

  //History Functionality*******************************************

  return (
    <div>
      <div className="body">
      {hasWinner && <Confetti />}
      <WinningAnimation gif={hasWinner ? winnerCat : null }/>
        <div className="main--section">
          <h1>{title()}</h1>
          <div className="">
            <TileElements />
          </div>
          <br />
          <button className="reset-btn" onClick={newBoard}>
            Reset Game
          </button>
        </div>
        <History history={history} handleHistory={handleHistory} />
        <WinningAnimation gif={hasWinner ? winnerCat : null}/>

      </div>
      
    </div>
  );
}

export default App;
