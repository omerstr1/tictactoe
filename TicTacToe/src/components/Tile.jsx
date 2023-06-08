import React from "react";

const Tile = (props) => {
  return (
    <div className="tile" onClick={props.handleClick}>
        <button className="tile-text">{props.value}</button>
    </div>
  );
}

export default Tile;
