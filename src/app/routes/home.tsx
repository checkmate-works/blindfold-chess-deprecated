import { ContentLayout } from "@/components/layouts";
import { useEffect, useState } from "react";
import { GameList } from "@/features/home/components/game-list";
import { Game } from "@/types";
import { loadGames, deleteGame } from "@/lib/storage";
import { useTranslation } from "react-i18next";
import { NewGameButton } from "@/features/home/components/new-game-button";
import { Helmet } from "react-helmet-async";

const AppRoot = () => {
  const [games, setGames] = useState<Game[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    setGames(loadGames());
  }, []);

  const handleDeleteGame = (gameId: string) => {
    deleteGame(gameId);
    setGames(loadGames());
  };

  return (
    <>
      <Helmet>
        <title>{t("app.title")}</title>
      </Helmet>
      <ContentLayout>
        <div className="min-h-screen pb-20">
          <div className="container mx-auto p-4">
            <div className="w-full max-w-4xl mx-auto space-y-6">
              <NewGameButton gameCount={games.length} />
              <GameList games={games} onDeleteGame={handleDeleteGame} />
            </div>
          </div>
        </div>
      </ContentLayout>
    </>
  );
};

export default AppRoot;
