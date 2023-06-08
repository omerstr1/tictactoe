import { useEffect, useMemo } from "react";
import React from "react";
import Tile from "./Tile";

const Board = (props) => {
  const board = props.board;
  const boardSize = props.boardSize;

  const handleClick = (tileId) => {

    const newValue = props.currPlayer();
    const row = Math.floor(tileId / boardSize );
    const col = tileId % boardSize;

    if (board[row][col].value === " ") {
      let newBoard = [...board];
      newBoard[row][col].value = newValue;
      props.setBoard(newBoard);
      props.addToHistory(tileId, newValue);
      props.setHasWinner(checkWinner(board));
    }
  };

  const checkWinner = (matrix) => {
    const numRows = matrix.length;
    const numCols = matrix[0].length;

    for (let row = 0; row < numRows; row++) {
      if (checkRow(matrix[row])) {
        return true;
      }
    }

    for (let col = 0; col < numCols; col++) {
      const column = [];
      for (let row = 0; row < numRows; row++) {
        column.push(matrix[row][col]);
      }
      if (checkRow(column)) {
        return true;
      }
    }

    const diagonal1 = [];
    const diagonal2 = [];
    for (let index = 0; index < numRows; index++) {
      diagonal1.push(matrix[index][index]);
      diagonal2.push(matrix[index][numCols - 1 - index]);
    }
    if (checkRow(diagonal1)) {
      return true;
    }
    if (checkRow(diagonal2)) {
      return true;
    }

    return false;
  };

  const checkRow = (row) => {
    return row.every(
      (cell) => cell.value !== " " && cell.value === row[0].value
    );
  };

  useEffect(() => {
    props.setHasWinner(checkWinner(board));
  }, props.Board);

  return (
    <div className="grid-row-container">
      {board.map((row, rowIndex) => (
        <div className="grid-col-container" key={rowIndex}>
          {row.map((cell) => (
            <Tile
              key={cell.tileId}
              value={cell.value}
              tileId={cell.tileId}
              handleClick={!props.hasWinner ? () => handleClick(cell.tileId) : null}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
