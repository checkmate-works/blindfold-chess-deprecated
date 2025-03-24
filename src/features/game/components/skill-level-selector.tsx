import { SKILL_LEVELS } from "@/types";

type SkillLevelSelectorProps = {
  selectedLevel: number;
  onLevelSelect: (level: number) => void;
};

export const SkillLevelSelector = ({
  selectedLevel,
  onLevelSelect,
}: SkillLevelSelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Select AI Level</h3>
      <div className="grid grid-cols-1 gap-3">
        {Object.entries(SKILL_LEVELS).map(([label, value]) => {
          const isSelected = selectedLevel === value;

          return (
            <button
              key={label}
              onClick={() => onLevelSelect(value)}
              className={`py-3 px-4 border-2 rounded-lg transition
                ${
                  isSelected
                    ? "border-black bg-gray-100 ring-2 ring-gray-400 font-semibold"
                    : "border-gray-300 hover:bg-gray-50"
                }
              `}
            >
              {label.charAt(0) + label.slice(1).toLowerCase()}
            </button>
          );
        })}
      </div>
    </div>
  );
};
