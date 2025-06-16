import { useTranslation } from "react-i18next";
import { SkillLevel } from "@/types";

interface Props {
  skillLevel: SkillLevel;
  playerColor: "white" | "black";
}

const ColorIcon = ({ color }: { color: "white" | "black" }) => (
  <div
    className={`w-4 h-4 rounded-full ${
      color === "white" ? "bg-white border border-gray-400" : "bg-gray-900"
    }`}
  />
);

export const GameInfo = ({ skillLevel, playerColor }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center space-x-3">
      <ColorIcon color={playerColor} />
      <span className="text-sm text-gray-500">
        {t("game.ai.title")}: {t(`game.ai.levels.${skillLevel}`)}
      </span>
    </div>
  );
};
