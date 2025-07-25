import { useTranslation } from "react-i18next";
import { Game } from "@/types";
import { GameListItem } from "./game-list-item";

interface Props {
  games: Game[];
  onDeleteGame: (gameId: string) => void;
}

export const GameList = ({ games, onDeleteGame }: Props) => {
  const { t } = useTranslation();

  if (games.length === 0) {
    return (
      <div className="bg-chess-white rounded-2xl shadow-md border border-chess-gray-200 p-8 sm:p-12">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-chess-gray-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">♔</span>
          </div>
          <h3 className="text-xl font-semibold text-chess-gray-800 mb-2">
            {t("game.list.noGames")}
          </h3>
        </div>
      </div>
    );
  }

  const sortedGames = [...games].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-chess-gray-800 mb-2">
          Your Games
        </h2>
        <p className="text-chess-gray-600">
          {games.length} saved {games.length === 1 ? "game" : "games"}
        </p>
      </div>

      <div className="bg-chess-white rounded-2xl shadow-md border border-chess-gray-200 overflow-hidden">
        <ul className="divide-y divide-chess-gray-100">
          {sortedGames.map((game) => (
            <GameListItem key={game.id} game={game} onDelete={onDeleteGame} />
          ))}
        </ul>
      </div>
    </div>
  );
};
