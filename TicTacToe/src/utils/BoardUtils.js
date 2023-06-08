export const title = (history, boardSize, hasWinner) => {
  if (hasWinner) {
    return `${history[history.length - 1].value} Won!`;
  } else if (history.length == boardSize * boardSize) {
    return "It's a tie!";
  } else {
    return `${currPlayer(history)}'s Turn`;
  }
};
export const generateBoard = (boardSize) => {
  const newBoard = [];
  for (let row = 0; row < boardSize; row++) {
    const currRow = [];
    for (let col = 0; col < boardSize; col++) {
      currRow.push({ tileId: row * boardSize + col, value: " " });
    }
    newBoard.push(currRow);
  }
  return newBoard;
};

export const newBoard = (boardSize, setBoard, setHasWinner, setHistory) => {
  setBoard(generateBoard(boardSize));
  setHistory([]);
  setHasWinner(false);
};

export const currPlayer = (history) => {
  if (history.length % 2 === 1) {
    return "O";
  } else {
    return "X";
  }
};
