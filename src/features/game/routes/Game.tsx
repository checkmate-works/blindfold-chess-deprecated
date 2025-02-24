import { useState } from "react";
import { GameSettings } from "@/types/game";
import GameSettingScreen from "../components/GameSettingScreen";
import GamePlay from "../components/GamePlay";

type GameState =
  | { status: "selecting" }
  | (GameSettings & { status: "playing" });

const Game = () => {
  const [gameState, setGameState] = useState<GameState>({
    status: "selecting",
  });

  const handleStartGame = (settings: GameSettings) => {
    setGameState({
      status: "playing",
      ...settings,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold text-center mb-8">Blindfold Chess</h1>

      {gameState.status === "selecting" ? (
        <GameSettingScreen onStartGame={handleStartGame} />
      ) : (
        <GamePlay settings={gameState} />
      )}
    </div>
  );
};

export default Game;
