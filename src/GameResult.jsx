import React from "react";

export const GameResult = ({ winner, onRestart }) => {
  return (
    <div>
      {winner ? (
        <h2>{winner} победил!</h2>
      ) : (
        <h2>Победила дружба! Игра закончилась вничью.</h2>
      )}
      <button onClick={onRestart}>Снова играть</button>
    </div>
  );
};
