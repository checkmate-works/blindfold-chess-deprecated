import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameList } from "./components/game-list";
import { Game } from "@/types";
import { loadGames, deleteGame } from "@/lib/storage";
import { useTranslation } from "react-i18next";
import { PlusIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { SYSTEM_CONSTANTS } from "@/lib/constants";
import { Popover } from "@headlessui/react";

export const TopPage = () => {
  const [games, setGames] = useState<Game[]>([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    setGames(loadGames());
  }, []);

  const isGameLimitReached = games.length >= SYSTEM_CONSTANTS.MAX_SAVED_GAMES;

  const handleDeleteGame = (gameId: string) => {
    deleteGame(gameId);
    setGames(loadGames());
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="container mx-auto p-4">
        <div className="w-full max-w-4xl mx-auto space-y-6">
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => navigate("/game/setup")}
              disabled={isGameLimitReached}
              className={`w-full bg-white text-gray-800 font-semibold py-3 px-6 rounded-sm border border-gray-300 transition-colors duration-200 flex items-center justify-center space-x-2 ${
                isGameLimitReached
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-50"
              }`}
            >
              <PlusIcon className="w-5 h-5" />
              <span>{t("game.newGame")}</span>
            </button>
            {isGameLimitReached && (
              <Popover className="relative">
                <Popover.Button className="focus:outline-none">
                  <QuestionMarkCircleIcon className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </Popover.Button>
                <Popover.Panel className="absolute z-10 mt-1 w-64 bg-white rounded-lg shadow-lg p-4 text-sm text-gray-600">
                  {t("game.gameLimitReached")}
                </Popover.Panel>
              </Popover>
            )}
          </div>

          <GameList games={games} onDeleteGame={handleDeleteGame} />
        </div>
      </div>
    </div>
  );
};
