import { useNavigate } from "react-router-dom";
import { GameSettings } from "@/types";
import { GameSetting } from "@/features/game";
import { ContentLayout } from "@/components/layouts";

export const GameSetup = () => {
  const navigate = useNavigate();

  const handleStartGame = (settings: GameSettings) => {
    navigate("/game/play", { state: settings });
  };

  return (
    <ContentLayout title="Blindfold Chess">
      <GameSetting onStartGame={handleStartGame} />
    </ContentLayout>
  );
};
