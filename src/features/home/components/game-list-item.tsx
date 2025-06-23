import { format } from "date-fns";
import { ja, enUS } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { PlayScreenState } from "@/app/routes/game/play";
import { Game } from "@/types";
import { DeleteGameButton } from "./delete-game-button";

interface GameListItemProps {
  game: Game;
  onDelete: (gameId: string) => void;
}

const ColorIcon = ({ color }: { color: "white" | "black" }) => (
  <div
    className={`w-4 h-4 rounded-full ${
      color === "white" ? "bg-white border border-gray-400" : "bg-gray-900"
    }`}
  />
);

export const GameListItem = ({ game, onDelete }: GameListItemProps) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const formatDate = (date: Date) => {
    const locale = i18n.language === "ja" ? ja : enUS;
    return format(date, "yyyy/MM/dd HH:mm", { locale });
  };

  const handleGameClick = () => {
    navigate("/game/play", {
      state: {
        settings: {
          color: game.playerColor,
          skillLevel: game.skillLevel,
        },
        initialMoves: game.moves,
        gameId: game.id,
      } satisfies PlayScreenState,
    });
  };

  const getStatusStyles = (status: Game["status"]) => {
    switch (status) {
      case "win":
        return "bg-green-100 text-green-800";
      case "loss":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <li
      className="py-4 hover:bg-gray-50 transition-colors cursor-pointer"
      onClick={handleGameClick}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4">
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-500">
            {formatDate(new Date(game.date))}
          </span>
          <ColorIcon color={game.playerColor} />
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyles(
              game.status,
            )}`}
          >
            {t(`game.list.status.${game.status}`)}
          </span>
        </div>
        <div className="mt-2 sm:mt-0 flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            {game.moves.length} {t("game.list.moves")}
          </span>
          <DeleteGameButton gameId={game.id} onDelete={onDelete} />
        </div>
      </div>
    </li>
  );
};
