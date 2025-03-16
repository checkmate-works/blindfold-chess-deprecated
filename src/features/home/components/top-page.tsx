import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameList } from "../components/game-list";
import { Game } from "@/types";
import { loadGames } from "@/lib/storage";

export const TopPage = () => {
  const [games, setGames] = useState<Game[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setGames(loadGames());
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-12">
          <button
            onClick={() => navigate("/game/setup")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg 
                     shadow-md transition-colors duration-200 flex items-center space-x-2"
          >
            <span>Start New Game</span>
          </button>
        </div>

        <GameList games={games} />
      </div>
    </div>
  );
};
