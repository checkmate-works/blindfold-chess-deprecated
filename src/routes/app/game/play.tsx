import { useLocation, Navigate } from "react-router-dom";
import { GameSettings } from "@/types";
import { GamePlay as GamePlayContainer } from "@/features/game";
import { ContentLayout } from "@/components/layouts";

export const GamePlay = () => {
  const location = useLocation();
  const settings = location.state as GameSettings;

  if (!settings) {
    return <Navigate to="/game/setup" replace />;
  }

  return (
    <ContentLayout title="Blindfold Chess">
      <GamePlayContainer settings={settings} />
    </ContentLayout>
  );
};
