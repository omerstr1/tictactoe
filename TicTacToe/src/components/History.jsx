import React, { useEffect } from "react";

const History = (props) => {
  return (
    <button className="history-btn" onClick={props.handleClick}>
      {props.index}. move is {props.move.value} in spot {props.move.tileId + 1}
    </button>
  );
};

export default History;
