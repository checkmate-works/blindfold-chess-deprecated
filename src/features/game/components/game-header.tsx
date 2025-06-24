import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { SkillLevel, GameStatus } from "@/types";
import { GameInfo } from "./game-info";

interface Props {
  skillLevel: SkillLevel;
  status: GameStatus;
  isPlayerTurn: boolean;
  playerColor: "white" | "black";
  onBack?: () => void;
}

export const GameHeader = ({
  skillLevel,
  status,
  isPlayerTurn,
  playerColor,
  onBack,
}: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate("/");
    }
  };

  const getStatusInfo = () => {
    if (status === "win") {
      return {
        text: t("game.status.win"),
        icon: "✓",
        bgColor: "bg-green-100",
        textColor: "text-green-700",
        borderColor: "border-green-200",
      };
    }
    if (status === "loss") {
      return {
        text: t("game.status.lose"),
        icon: "✗",
        bgColor: "bg-red-100",
        textColor: "text-red-700",
        borderColor: "border-red-200",
      };
    }
    if (status === "draw") {
      return {
        text: t("game.status.draw"),
        icon: "=",
        bgColor: "bg-chess-gray-100",
        textColor: "text-chess-gray-700",
        borderColor: "border-chess-gray-200",
      };
    }
    if (isPlayerTurn) {
      return {
        text: t("game.status.yourTurn"),
        icon: "⏰",
        bgColor: "bg-blue-100",
        textColor: "text-blue-700",
        borderColor: "border-blue-200",
      };
    }
    return {
      text: t("game.status.in_progress"),
      icon: "⚡",
      bgColor: "bg-purple-100",
      textColor: "text-purple-700",
      borderColor: "border-purple-200",
    };
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="bg-chess-white border-b border-chess-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          <div className="flex items-center justify-between">
            {/* Left: Back button + Title + Game Info */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className="p-2 rounded-lg hover:bg-chess-gray-100 transition-colors duration-200 group"
              >
                <ArrowLeftIcon className="h-5 w-5 text-chess-gray-600 group-hover:text-chess-gray-900" />
              </button>

              <div className="flex items-center gap-6">
                <GameInfo skillLevel={skillLevel} playerColor={playerColor} />
              </div>
            </div>

            {/* Right: Status Badge */}
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold text-sm ${statusInfo.bgColor} ${statusInfo.textColor} ${statusInfo.borderColor}`}
            >
              <span className="text-sm">{statusInfo.icon}</span>
              {statusInfo.text}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
