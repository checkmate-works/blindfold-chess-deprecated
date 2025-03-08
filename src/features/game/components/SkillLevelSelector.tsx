import { SKILL_LEVELS } from "@/types";

interface SkillLevelSelectorProps {
  selectedLevel: number;
  onLevelSelect: (level: number) => void;
}

const SkillLevelSelector = ({
  selectedLevel,
  onLevelSelect,
}: SkillLevelSelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Select AI Level</h3>
      <div className="grid grid-cols-1 gap-3">
        {Object.entries(SKILL_LEVELS).map(([level, value]) => (
          <button
            key={level}
            onClick={() => onLevelSelect(value)}
            className={`py-2 px-4 border-2 rounded-lg transition-colors
              ${
                selectedLevel === value
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
          >
            {level.charAt(0) + level.slice(1).toLowerCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SkillLevelSelector;
