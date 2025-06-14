import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameList } from "./components/game-list";
import { Game } from "@/types";
import { loadGames } from "@/lib/storage";
import { useTranslation } from "react-i18next";
import { PlusIcon } from "@heroicons/react/24/outline";

export const TopPage = () => {
  const [games, setGames] = useState<Game[]>([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    setGames(loadGames());
  }, []);

  return (
    <div className="min-h-screen pb-20">
      <div className="container mx-auto p-4">
        <div className="w-full max-w-4xl mx-auto space-y-6">
          <button
            onClick={() => navigate("/game/setup")}
            className="w-full bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-6 rounded-sm border border-gray-300 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <PlusIcon className="w-5 h-5" />
            <span>{t("game.newGame")}</span>
          </button>

          <GameList games={games} />
        </div>
      </div>
    </div>
  );
};
