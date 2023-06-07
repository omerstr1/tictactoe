import React, { useEffect } from "react";
import History from "./History";

const HistoryContainer = ( props ) =>{
  return (
    <div key={index}>
      {history.map((move, index) => (
        <History
          move={move}
          index={index}
          onClick={() => handleHistory(props.history, props.index)}
        />
      ))}
    </div>
  );
};

export default HistoryContainer;
