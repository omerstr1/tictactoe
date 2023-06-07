import WinningAnimation from "./components/WinningAnimations.jsx";
import winnerCat from "./assets/dancing-cat-gif.gif";
import React, { useEffect, useState } from "react";
import Confetti from "./components/Confetti.jsx";
import History from "./components/History.jsx";
import Tile from "./components/Tile.jsx";
import "./styles/App.css";

const generateBoard = (size) => {
  const newBoard = [];
  for (let row = 0; row < size; row++) {
    const currRow = [];
    for (let col = 0; col < size; col++) {
      currRow.push({ tileId: row * size + col, value: " " });
    }
    newBoard.push(currRow);
  }
  return newBoard;
};

export default function App() {
  const [board, setBoard] = useState(generateBoard(3));
  const [hasWinner, setHasWinner] = useState(false);
  const [history, setHistory] = useState([]);

  const TileElements = () => {
    return (
      <div className="grid-row-container">
        {board.map((row, rowIndex) => (
          <div className="grid-col-container" key={rowIndex}>
            {row.map((cell) => (
              <Tile
                key={cell.tileId}
                value={cell.value}
                tileId={cell.tileId}
                handleClick={
                  hasWinner
                    ? null
                    : () => handleClick(cell.tileId, currPlayer())
                }
              />
            ))}
          </div>
        ))}
      </div>
    );
  };

  const newBoard = () => {
    setBoard(generateBoard(3));
    setHistory([]);
    setHasWinner(false);
  };

  const historyElements = history.map((move, index) => (
    <div key={index}>
      <button
        className="history-btn"
        onClick={() => handleHistory(history, index)}
      >
        {index}. move is {move.value} in spot {JSON.stringify(move.tileId)}
      </button>
    </div>
  ));

  const currPlayer = () => {
    if (history.length % 2 === 1) {
      return "O";
    } else {
      return "X";
    }
  };

  useEffect(() => {
    setHasWinner(checkWinner(board));
  }, [board]);

  function checkWinner(matrix) {
    const numRows = matrix.length;
    const numCols = matrix[0].length;

    for (let row = 0; row < numRows; row++) {
      if (checkRow(matrix[row])) {
        return true;
      }
    }

    for (let col = 0; col < numCols; col++) {
      const column = [];
      for (let row = 0; row < numRows; row++) {
        column.push(matrix[row][col]);
      }
      if (checkRow(column)) {
        return true;
      }
    }

    const diagonal1 = [];
    const diagonal2 = [];
    for (let index = 0; index < numRows; index++) {
      diagonal1.push(matrix[index][index]);
      diagonal2.push(matrix[index][numCols - 1 - index]);
    }
    if (checkRow(diagonal1)) {
      return true;
    }
    if (checkRow(diagonal2)) {
      return true;
    }

    return false;
  }

  function checkRow(row) {
    return row.every(
      (cell) => cell.value !== " " && cell.value === row[0].value
    );
  }

  function handleClick(tileId, newValue) {
    const row = Math.floor(tileId / 3);
    const col = tileId % 3;
    if (board[row][col].value === " ") {
      let newBoard = [...board];
      newBoard[row][col].value = newValue;
      setBoard(newBoard);
      addToHistory(tileId, newValue);
      setHasWinner(checkWinner(board));
    }
  }

  function title() {
    if (hasWinner) {
      return `${history[history.length - 1].value} Won!`;
    } else if (history.length === 9) {
      return "It's a tie!";
    } else {
      return `${currPlayer()}'s Turn`;
    }
  }

  function addToHistory(tileId, value) {
    setHistory((oldHistory) => [...oldHistory, { tileId, value }]);
  }

  function generateBoardFromArray(newHistory) {
    let newBoard = generateBoard(3);
    for (let j = 0; j < newHistory.length; j++) {
      newBoard[Math.floor(newHistory[j].tileId / 3)][
        newHistory[j].tileId % 3
      ].value = newHistory[j].value;
    }
    return newBoard;
  }

  function handleHistory(currHistory, index) {
    const newHistory = currHistory.slice(0, index + 1);
    const newBoard = generateBoardFromArray(newHistory);
    setBoard(newBoard);
    setHistory(newHistory);
  }

  return (
    <div>
      <div className="body">
        {hasWinner && <Confetti />}
        <WinningAnimation gif={hasWinner ? winnerCat : null} />
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
        <WinningAnimation gif={hasWinner ? winnerCat : null} />
      </div>
    </div>
  );
}
