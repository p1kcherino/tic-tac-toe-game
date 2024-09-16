import React, { useState } from "react";

export const GameBoard = ({ players, onEndGame }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const checkWinner = (board) => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index]) return;

    const newBoard = [...board];
    const currentPlayer = players[currentPlayerIndex];
    newBoard[index] = currentPlayer.symbol;

    setBoard(newBoard);

    const winnerSymbol = checkWinner(newBoard);
    if (winnerSymbol) {
      const winner = players.find((player) => player.symbol === winnerSymbol);
      onEndGame(winner.name);
    } else if (newBoard.every((cell) => cell !== null)) {
      onEndGame(null);
    } else {
      setCurrentPlayerIndex((prev) => (prev + 1) % 2);
    }
  };

  return (
    <div>
      <h2>
        Сейчас ходит: {players[currentPlayerIndex].name} (
        {players[currentPlayerIndex].symbol})
      </h2>
      <div className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className="cell"
            onClick={() => handleClick(index)}
            style={{
              width: "60px",
              height: "60px",
              display: "inline-block",
              border: "1px solid black",
              textAlign: "center",
              lineHeight: "60px",
              fontSize: "24px",
            }}
          >
            {cell}
          </div>
        ))}
      </div>
    </div>
  );
};
