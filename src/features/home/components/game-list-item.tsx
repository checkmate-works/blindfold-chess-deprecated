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
      className="hover:bg-gray-50 transition-colors cursor-pointer"
      onClick={handleGameClick}
    >
      <div className="px-4 py-4">
        {/* Mobile Layout: Stacked */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {/* First Row: Date and Status */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-gray-500">
                {formatDate(new Date(game.date))}
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(
                  game.status,
                )}`}
              >
                {t(`game.list.status.${game.status}`)}
              </span>
            </div>

            {/* Second Row: Color and Moves */}
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1.5">
                <ColorIcon color={game.playerColor} />
              </div>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">
                {game.moves.length} {t("game.list.moves")}
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">
                {t(`game.ai.levels.${game.skillLevel}`)}
              </span>
            </div>
          </div>

          {/* Delete button */}
          <div className="flex-shrink-0">
            <DeleteGameButton gameId={game.id} onDelete={onDelete} />
          </div>
        </div>
      </div>
    </li>
  );
};
