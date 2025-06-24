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
  return (
    <div className="flex items-center gap-4 text-sm">
      {/* Player Color */}
      <div className="flex items-center gap-1.5">
        <ColorIcon color={playerColor} />
      </div>

      <div className="w-1 h-1 bg-gray-300 rounded-full"></div>

      {/* AI Level */}
      <div className="flex items-center gap-1.5">
        <span className="text-gray-600">♔</span>
        <span className="font-medium text-gray-600">LV {skillLevel}</span>
      </div>
    </div>
  );
};
