import React, { useState } from "react";

export const GameSetup = ({ savedPlayers, onSavePlayer, onStartGame }) => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const handleStartGame = () => {
    if (player1 && player2) {
      onSavePlayer(player1);
      onSavePlayer(player2);
      onStartGame(player1, player2);
    }
  };

  return (
    <div>
      <h2>Никнеймы игроков</h2>
      <div>
        <label>Игрок №1: </label>
        <input
          value={player1}
          onChange={(e) => setPlayer1(e.target.value)}
          list="players"
        />
      </div>
      <div>
        <label>Игрок №2: </label>
        <input
          value={player2}
          onChange={(e) => setPlayer2(e.target.value)}
          list="players"
        />
      </div>
      <datalist id="players">
        {savedPlayers.map((player, index) => (
          <option key={index} value={player} />
        ))}
      </datalist>
      <button onClick={handleStartGame}>Начать игру</button>
    </div>
  );
};
