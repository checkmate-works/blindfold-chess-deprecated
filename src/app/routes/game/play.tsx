import { useLocation, Navigate } from "react-router-dom";
import { ContentLayout } from "@/components/layouts";
import { GameSettings, AlgebraicNotation } from "@/types";
import { GamePlayScreen } from "@/features/game/components/game-play-screen";
import { GameServicesProvider } from "@/features/game/providers/game-services.provider";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

export type PlayScreenState = {
  gameId?: string;
  settings: GameSettings;
  initialMoves: AlgebraicNotation[];
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
          />
        </GameServicesProvider>
      </ContentLayout>
    </>
  );
};

export default GamePlayRoute;
