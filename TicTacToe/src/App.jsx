import WinningAnimation from "./components/WinningAnimations.jsx";
import HistoryContainer from "./components/HistoryContainer.jsx";
import winnerCat from "./assets/dancing-cat-gif.gif";
import React, { useEffect, useState } from "react";
import Confetti from "./components/Confetti.jsx";
import Board from "./components/Board.jsx";
import Tile from "./components/Tile.jsx";
import "./styles/App.css";

export default function App() {
  const generateBoard = (boardSize) => {
    const newBoard = [];
    for (let row = 0; row < boardSize; row++) {
      const currRow = [];
      for (let col = 0; col < boardSize; col++) {
        currRow.push({ tileId: row * boardSize + col, value: " " });
      }
      newBoard.push(currRow);
    }
    return newBoard;
  };

  const [boardSize, setBoardSize] = useState(3);
  const [board, setBoard] = useState(generateBoard(boardSize));
  const [history, setHistory] = useState([]);
  const [hasWinner, setHasWinner] = useState(false);

  const title = () => {
    if (hasWinner) {
      return `${history[history.length - 1].value} Won!`;
    } else if (history.length === 9) {
      return "It's a tie!";
    } else {
      return `${currPlayer()}'s Turn`;
    }
  };

  const currPlayer = () => {
    if (history.length % 2 === 1) {
      return "O";
    } else {
      return "X";
    }
  };

  const newBoard = () => {
    setBoard(generateBoard(3));
    setHistory([]);
    setHasWinner(false);
  };

  const addToHistory = (tileId, value) => {
    setHistory((oldHistory) => [...oldHistory, { tileId, value }]);
  };

  return (
    <div>
      <div className="body">
        {hasWinner && <Confetti />}
        {hasWinner && <WinningAnimation gif={winnerCat} />}
        <div className="main--section">
          <h1>{title()}</h1>
          <Board
            hasWinner={hasWinner}
            board={board}
            setBoard={setBoard}
            setHasWinner={setHasWinner}
            addToHistory={addToHistory}
            currPlayer={currPlayer}
            boardSize={boardSize}
          />
          <br />
          <button className="reset-btn" onClick={newBoard}>
            Reset Game
          </button>
        </div>
        <HistoryContainer
          history={history}
          setBoard={setBoard}
          setHistory={setHistory}
          generateBoard={generateBoard}
          
        />
        {hasWinner && <WinningAnimation gif={winnerCat} />}
      </div>
    </div>
  );
}
