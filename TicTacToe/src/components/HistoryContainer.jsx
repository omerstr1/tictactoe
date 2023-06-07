import React, { useEffect } from "react";
import History from "./History";

const HistoryContainer = (props) => {


  const generateBoardFromHistory = (newHistory) => {
    let newBoard = props.generateBoard(3);
    for (let index = 0; index < newHistory.length; index++) {
      newBoard[Math.floor(newHistory[index].tileId / 3)][
        newHistory[index].tileId % 3
      ].value = newHistory[index].value;
    }
    return newBoard;
  };

  const handleHistory = (currHistory, index) => {
    const newHistory = currHistory.slice(0, index + 1);
    const newBoard = generateBoardFromHistory(newHistory);
    props.setBoard(newBoard);
    props.setHistory(newHistory);
  };

  return (
    <div className="moves-container">
       <h2 className="history-btn">History</h2>
      {props.history.map((move, index) => (
        <History
          move={move}
          index={index}
          key={index}
          handleClick={() => handleHistory(props.history, index)}
        />
      ))}
    </div>
  );
};
export default HistoryContainer;