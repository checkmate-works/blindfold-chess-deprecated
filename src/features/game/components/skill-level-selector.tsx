import { useTranslation } from "react-i18next";
import { SkillLevel, SKILL_LEVEL_OPTIONS } from "@/types";

interface Props {
  selectedLevel: SkillLevel;
  onSelect: (level: SkillLevel) => void;
}

export const SkillLevelSelector = ({ selectedLevel, onSelect }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {t("game.ai.title")}
        </h3>
        <p className="text-sm text-gray-600">
          Select your preferred difficulty level
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {SKILL_LEVEL_OPTIONS.map(({ value }) => (
          <button
            key={value}
            onClick={() => onSelect(value)}
            className={`group relative px-3 py-4 text-sm font-semibold rounded-xl transition-all duration-200 shadow-sm ${
              selectedLevel === value
                ? "bg-gray-900 text-white shadow-lg ring-2 ring-gray-900 ring-offset-2"
                : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 hover:shadow-md"
            }`}
          >
            <div className="flex flex-col items-center space-y-1">
              <span className="text-lg font-bold">LV {value}</span>
              <span className="text-xs leading-tight break-words hyphens-auto">
                {t(`game.ai.levels.${value}`)}
              </span>
            </div>
            {selectedLevel === value && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
