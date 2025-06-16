import { useTranslation } from "react-i18next";
import { SkillLevel, SKILL_LEVEL_OPTIONS } from "@/types";

interface Props {
  selectedLevel: SkillLevel;
  onSelect: (level: SkillLevel) => void;
}

export const SkillLevelSelector = ({ selectedLevel, onSelect }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">
        {t("game.ai.title")}
      </h3>
      <div className="grid grid-cols-5 gap-4">
        {SKILL_LEVEL_OPTIONS.map(({ value }) => (
          <button
            key={value}
            onClick={() => onSelect(value)}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              selectedLevel === value
                ? "bg-black text-white"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
            }`}
          >
            {t(`game.ai.levels.${value}`)}
          </button>
        ))}
      </div>
    </div>
  );
};
