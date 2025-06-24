import { useEffect, useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { ContentLayout } from "@/components/layouts";
import { useGameServices } from "@/features/game/services";
import { GameList } from "@/features/home/components/game-list";
import { NewGameButton } from "@/features/home/components/new-game-button";
import { Game } from "@/types";

const AppRoot = () => {
  const [games, setGames] = useState<Game[]>([]);
  const { t } = useTranslation();
  const { gameRepository } = useGameServices();
  const location = useLocation();

  const loadGames = useCallback(async () => {
    console.log("🔄 Loading games from localStorage...");
    const loadedGames = await gameRepository.loadAll();
    console.log("📋 Loaded games:", loadedGames.length);
    setGames(loadedGames);
  }, [gameRepository]);

  // Load games on initial mount and route changes
  useEffect(() => {
    loadGames();
  }, [loadGames, location.pathname]);

  // Check for games update flag and reload if needed
  useEffect(() => {
    const checkForUpdates = () => {
      const gamesUpdated = sessionStorage.getItem("games_updated");
      if (gamesUpdated) {
        console.log("🔄 Games update detected, reloading...");
        sessionStorage.removeItem("games_updated");
        loadGames();
      }
    };

    // Check immediately
    checkForUpdates();

    // Set up interval to check periodically
    const interval = setInterval(checkForUpdates, 1000);

    return () => clearInterval(interval);
  }, [loadGames]);

  // Reload games when the page becomes visible or focused
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log("👁️ Page became visible, reloading games...");
        loadGames();
      }
    };

    const handleFocus = () => {
      console.log("🎯 Window focused, reloading games...");
      loadGames();
    };

    // Also reload when user comes back to the tab or window
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        console.log("📄 Page shown from cache, reloading games...");
        loadGames();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, [loadGames]);

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
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl mx-auto">
              {/* Header Section */}
              <div className="text-center mb-10">
                <div className="flex flex-col items-center mb-6">
                  <img
                    src="/logo.png"
                    alt="Blindfold Chess Logo"
                    className="h-20 w-auto mb-4 drop-shadow-sm"
                  />
                </div>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Train your chess visualization skills by playing without
                  seeing the board
                </p>
              </div>

              <div className="space-y-8">
                <NewGameButton gameCount={games.length} />
                <GameList games={games} onDeleteGame={handleDeleteGame} />
              </div>
            </div>
          </div>
        </div>
      </ContentLayout>
    </>
  );
};

export default AppRoot;
