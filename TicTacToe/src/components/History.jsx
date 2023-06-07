import React, { useEffect } from "react";

export default History = ({ history, handleHistory }) => {
  const historyElements = history.map((move, index) => (
    <div key={index}>
      <button
        className="history-btn"
        onClick={() => handleHistory(history, index)}
      >
        {index}. move is {move.value} in spot {move.tileId + 1}
      </button>
    </div>
  ));

  return (
    <div className="moves-container">
      <h2 className="history-btn">History</h2>
      {historyElements}
    </div>
  );
};
