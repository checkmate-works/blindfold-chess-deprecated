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
    return format(date, "MMM dd, HH:mm", { locale });
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
        return "bg-green-100 text-green-700 border-green-200";
      case "loss":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  const getStatusIcon = (status: Game["status"]) => {
    switch (status) {
      case "win":
        return "✓";
      case "loss":
        return "✗";
      default:
        return "⏸";
    }
  };

  return (
    <li
      className="hover:bg-gray-50 transition-all duration-200 cursor-pointer group"
      onClick={handleGameClick}
    >
      <div className="px-6 py-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Top Row: Status and Date */}
            <div className="flex items-center gap-3 mb-3">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyles(
                  game.status,
                )}`}
              >
                <span>{getStatusIcon(game.status)}</span>
                {t(`game.list.status.${game.status}`)}
              </span>
              <span className="text-sm text-gray-500 font-medium">
                {formatDate(new Date(game.date))}
              </span>
            </div>

            {/* Bottom Row: Game Details */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <ColorIcon color={game.playerColor} />
              </div>

              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>

              <span className="text-gray-600 font-medium">
                {game.moves.length} {t("game.list.moves")}
              </span>

              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>

              <span className="text-gray-600 font-medium">
                LV {game.skillLevel}
              </span>
            </div>
          </div>

          {/* Delete button */}
          <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <DeleteGameButton gameId={game.id} onDelete={onDelete} />
          </div>
        </div>
      </div>
    </li>
  );
};
