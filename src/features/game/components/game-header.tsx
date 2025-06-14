import { Side, SkillLevel } from "@/types";
import { useTranslation } from "react-i18next";

type Props = {
  playerSide: Side;
  skillLevel: SkillLevel;
};

export const GameHeader = ({ playerSide, skillLevel }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="text-center mb-6">
      <div className="text-gray-800 font-medium">
        {t("game.status.playing")}:{" "}
        {playerSide === "white" ? "♔ White" : "♚ Black"}
      </div>
      <div className="text-sm text-gray-600">AI Level: {skillLevel}</div>
    </div>
  );
};
