import { useNavigate } from "react-router-dom";
import { GameSettings } from "@/types";
import GameSettingScreen from "@/features/game/components/GameSettingScreen";

export const GameSetup = () => {
  const navigate = useNavigate();

  const handleStartGame = (settings: GameSettings) => {
    navigate("/game/play", { state: settings });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold text-center mb-8">Blindfold Chess</h1>
      <GameSettingScreen onStartGame={handleStartGame} />
    </div>
  );
};
