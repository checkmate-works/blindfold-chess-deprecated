import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GameList from "./GameList";
import { Game } from "../types";

const TopPage = () => {
  const [games, setGames] = useState<Game[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedGames = localStorage.getItem("blindfoldChessGames");
    if (storedGames) {
      setGames(JSON.parse(storedGames));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Blindfold Chess</h1>

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

export default TopPage;
