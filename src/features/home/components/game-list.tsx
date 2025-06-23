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
      <div className="flex items-center justify-center p-8 text-gray-500">
        <p className="text-center">{t("game.list.noGames")}</p>
      </div>
    );
  }

  const sortedGames = [...games].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      <ul className="divide-y divide-gray-200">
        {sortedGames.map((game) => (
          <GameListItem key={game.id} game={game} onDelete={onDeleteGame} />
        ))}
      </ul>
    </div>
  );
};
