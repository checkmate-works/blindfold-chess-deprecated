import { Side, SkillLevel, GameStatus } from "@/types";
import { useTranslation } from "react-i18next";

type Props = {
  gameStatus: GameStatus;
  playerSide: Side;
  skillLevel: SkillLevel;
};

const ColorIcon = ({ color }: { color: Side }) => (
  <div
    className={`w-4 h-4 rounded-full ${
      color === "white" ? "bg-white border border-gray-400" : "bg-gray-900"
    }`}
  />
);

export const GameHeader = ({ gameStatus, playerSide, skillLevel }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <ColorIcon color={playerSide} />
              <div className="text-sm text-gray-500">
                {t("game.ai.level")}: {t(`game.ai.levels.${skillLevel}`)}
              </div>
            </div>
            {gameStatus !== "in_progress" && (
              <div className="text-sm font-medium">
                {gameStatus === "win" && t("game.status.win")}
                {gameStatus === "loss" && t("game.status.loss")}
                {gameStatus === "draw" && t("game.status.draw")}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
