import React from "react";

export default Tile = (props) => {
  return (
    <div className="tile" onClick={props.handleClick}>
        <button className="tile-text">{props.value}</button>
    </div>
  );
}
