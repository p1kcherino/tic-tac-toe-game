import React, { useState, useEffect } from "react";
import { StartScreen } from "./StartScreen";
import { GameSetup } from "./GameSetup";
import { GameBoard } from "./GameBoard";
import { GameResult } from "./GameResult";

export const App = () => {
  const [screen, setScreen] = useState("start");
  const [players, setPlayers] = useState([]);
  const [currentGame, setCurrentGame] = useState(null);
  const [gameResult, setGameResult] = useState(null);
  const [savedPlayers, setSavedPlayers] = useState(() => {
    const saved = localStorage.getItem("players");
    return saved ? JSON.parse(saved) : [];
  });
  const [gameHistory, setGameHistory] = useState(() => {
    const history = localStorage.getItem("gameHistory");
    return history ? JSON.parse(history) : [];
  });

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(savedPlayers));
  }, [savedPlayers]);

  useEffect(() => {
    localStorage.setItem("gameHistory", JSON.stringify(gameHistory));
  }, [gameHistory]);

  const startGame = (player1, player2) => {
    const players = [
      { name: player1, symbol: "X" },
      { name: player2, symbol: "O" },
    ];

    if (Math.random() > 0.5) {
      players.reverse();
    }
    setPlayers(players);
    setCurrentGame({ player1, player2, currentTurn: players[0] });
    setScreen("game");
  };

  const endGame = (winner) => {
    setGameResult(winner);
    setGameHistory((prev) => [
      ...prev,
      { winner, date: new Date().toLocaleString() },
    ]);
    setScreen("result");
  };

  const resetGame = () => {
    setScreen("start");
    setGameResult(null);
    setCurrentGame(null);
  };

  const clearHistory = () => {
    setGameHistory([]);
    localStorage.removeItem("gameHistory");
  };

  return (
    <div className="App">
      {screen === "start" && (
        <StartScreen
          onStart={() => setScreen("setup")}
          gameHistory={gameHistory}
          onClearHistory={clearHistory}
        />
      )}
      {screen === "setup" && (
        <GameSetup
          savedPlayers={savedPlayers}
          onSavePlayer={(player) => setSavedPlayers([...savedPlayers, player])}
          onStartGame={startGame}
        />
      )}
      {screen === "game" && <GameBoard players={players} onEndGame={endGame} />}
      {screen === "result" && (
        <GameResult winner={gameResult} onRestart={resetGame} />
      )}
    </div>
  );
};
