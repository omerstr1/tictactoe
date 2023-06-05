import React from "react";

export default function Tile(props) {
  return (
    <div className="tile" onClick={props.handleClick}>
        <button className="tile-text">{props.value}</button>
    </div>
  );
}
