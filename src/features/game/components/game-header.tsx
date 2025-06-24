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

  return (
    <div className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <button
              onClick={handleBack}
              className="mr-4 p-2 rounded-full hover:bg-gray-100"
            >
              <ArrowLeftIcon className="h-6 w-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-lg font-medium text-gray-900">
                {t("game.status.title")}
              </h1>
              <GameInfo skillLevel={skillLevel} playerColor={playerColor} />
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">
              {status === "win"
                ? t("game.status.win")
                : status === "loss"
                  ? t("game.status.lose")
                  : status === "draw"
                    ? t("game.status.draw")
                    : isPlayerTurn
                      ? t("game.status.yourTurn")
                      : t("game.status.in_progress")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
