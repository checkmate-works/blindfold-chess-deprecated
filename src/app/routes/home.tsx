import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { ContentLayout } from "@/components/layouts";
import { useGameServices } from "@/features/game/services";
import { GameList } from "@/features/home/components/game-list";
import { NewGameButton } from "@/features/home/components/new-game-button";
import { Game } from "@/types";

const AppRoot = () => {
  const [games, setGames] = useState<Game[]>([]);
  const { t } = useTranslation();
  const { gameRepository } = useGameServices();

  useEffect(() => {
    const loadGames = async () => {
      const loadedGames = await gameRepository.loadAll();
      setGames(loadedGames);
    };
    loadGames();
  }, [gameRepository]);

  const handleDeleteGame = async (gameId: string) => {
    await gameRepository.delete(gameId);
    const updatedGames = await gameRepository.loadAll();
    setGames(updatedGames);
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
