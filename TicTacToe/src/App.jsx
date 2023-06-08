import "./styles/App.css";
import React, { useState,useMemo } from "react";
import Board from "./components/Board.jsx";
import Confetti from "./components/Confetti.jsx";
import HistoryContainer from "./components/HistoryContainer.jsx";
import WinningAnimation from "./components/WinningAnimations.jsx";
import threeDancingHamster from "./assets/three-dancing-hamsters-gif.gif";
import {
  title,
  generateBoard,
  newBoard,
  currPlayer,
} from "./utils/BoardUtils.js";

const App = () => {
  
  const boardSize = 3;
  const [history, setHistory] = useState([]);
  const [hasWinner, setHasWinner] = useState(false);
  const [board, setBoard] = useState(generateBoard(boardSize));

  return (
    <div>
      <div className="body">
        {hasWinner && <Confetti />}
        {hasWinner && <WinningAnimation gif={threeDancingHamster} />}
        <div className="main--section">
          <h1>{title(history, boardSize, hasWinner)}</h1>
          <Board
            hasWinner={hasWinner}
            board={board}
            setBoard={setBoard}
            setHasWinner={setHasWinner}
            currPlayer={currPlayer}
            boardSize={boardSize}
            history={history}
            setHistory={setHistory}
          />
          <br />
          <button
            className="reset-btn"
            onClick={() =>
              newBoard(boardSize, setBoard, setHasWinner, setHistory)
            }
          >
            Reset Game
          </button>
        </div>
        <HistoryContainer
          history={history}
          setBoard={setBoard}
          setHistory={setHistory}
          generateBoard={generateBoard}
          boardSize={boardSize}
        />
        {hasWinner && <WinningAnimation gif={threeDancingHamster} className="img-hor"/>}
      </div>
    </div>
  );
};

export default App;
