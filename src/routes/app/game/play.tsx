import { useLocation, Navigate } from "react-router-dom";
import { GameSettings } from "@/types";
import GamePlayScreen from "@/features/game/components/GamePlay";

export const GamePlay = () => {
  const location = useLocation();
  const settings = location.state as GameSettings;

  if (!settings) {
    return <Navigate to="/game/setup" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold text-center mb-8">Blindfold Chess</h1>
      <GamePlayScreen settings={settings} />
    </div>
  );
};
