import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocation, Navigate } from "react-router-dom";
import { ContentLayout } from "@/components/layouts";
import { GamePlayScreen } from "@/features/game/components/game-play-screen";
import { GameServicesProvider } from "@/features/game/providers/game-services.provider";
import { GameSettings, AlgebraicNotation, GameStatus } from "@/types";

export type PlayScreenState = {
  gameId?: string;
  settings: GameSettings;
  initialMoves: AlgebraicNotation[];
  gameStatus?: GameStatus;
};

const GamePlayRoute = () => {
  const location = useLocation();
  const state = location.state as PlayScreenState | undefined;
  const { t } = useTranslation();

  if (!state?.settings) {
    return <Navigate to="/game/setup" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{t("app.title")}</title>
      </Helmet>
      <ContentLayout>
        <GameServicesProvider skillLevel={state.settings.skillLevel}>
          <GamePlayScreen
            gameId={state.gameId}
            settings={state.settings}
            initialMoves={state.initialMoves || []}
            gameStatus={state.gameStatus}
          />
        </GameServicesProvider>
      </ContentLayout>
    </>
  );
};

export default GamePlayRoute;
