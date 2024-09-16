import React from "react";

export const StartScreen = ({ onStart, gameHistory, onClearHistory }) => {
  return (
    <div className="start-screen">
      <h1>Крестики-Нолики</h1>
      <button onClick={onStart}>Начать новую игру</button>

      <h2>История игр</h2>
      <ul>
        {gameHistory.length > 0 ? (
          gameHistory.map((game, index) => (
            <li key={index}>
              {game.winner ? (
                <>
                  Победитель: {game.winner} (Дата: {game.date})
                </>
              ) : (
                <>Ничья (Дата: {game.date})</>
              )}
            </li>
          ))
        ) : (
          <li>История игр пуста</li>
        )}
      </ul>
      {gameHistory.length > 0 && (
        <button onClick={onClearHistory}>Очистить историю игр</button>
      )}
    </div>
  );
};
