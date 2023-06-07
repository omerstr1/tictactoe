import React, { useEffect } from "react";

const History = (props) => {

  return (
    <div className="moves-container" key={props.index}>
      <h2 className="history-btn">History</h2>
      <button
        className="history-btn"
      >
        {props.index}. move is {move.value} in spot {move.tileId + 1}
      </button>
    </div>
  );
};

export default History;
