import { useLocation, Navigate } from "react-router-dom";
import { GameSettings, AlgebraicNotation } from "@/types";
import { GamePlay as GamePlayContainer } from "@/features/game";
import { ContentLayout } from "@/components/layouts";

interface LocationState {
  settings: GameSettings;
  savedMoves?: AlgebraicNotation[];
}

export const GamePlay = () => {
  const location = useLocation();
  const state = location.state as LocationState;

  if (!state?.settings) {
    return <Navigate to="/game/setup" replace />;
  }

  return (
    <ContentLayout title="Blindfold Chess">
      <GamePlayContainer
        settings={state.settings}
        savedMoves={state.savedMoves}
      />
    </ContentLayout>
  );
};
