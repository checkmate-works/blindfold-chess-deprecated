import { Side, SkillLevel, GameStatus } from "@/types";
import { useTranslation } from "react-i18next";

type Props = {
  playerSide: Side;
  skillLevel: SkillLevel;
  gameStatus: GameStatus;
};

export const GameHeader = ({ playerSide, skillLevel, gameStatus }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                {t("game.status.playing")}: {t(`game.color.${playerSide}`)}
              </div>
              <div className="text-sm text-gray-500">
                {t("game.status.aiLevel")}: {t(`game.ai.levels.${skillLevel}`)}
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
