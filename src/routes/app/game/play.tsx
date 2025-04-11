import { useLocation, Navigate } from "react-router-dom";
import { GameSettings, AlgebraicNotation } from "@/types";
import { GamePlay as GamePlayContainer } from "@/features/game";
import { ContentLayout } from "@/components/layouts";

type LocationState = {
  settings: GameSettings;
  initialMoves: AlgebraicNotation[];
};

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
        initialMoves={state.initialMoves || []}
      />
    </ContentLayout>
  );
};
