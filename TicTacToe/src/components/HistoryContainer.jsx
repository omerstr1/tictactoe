import React, { useEffect } from "react";
import History from "./History";

const HistoryContainer = (props) => {
  return (
    <div className="moves-container">
       <h2 className="history-btn">History</h2>
      {props.history.map((move, index) => (
        <History
          move={move}
          index={index}
          key={index}
          handleClick={() => props.handleHistory(props.history, index)}
        />
      ))}
    </div>
  );
};
export default HistoryContainer;