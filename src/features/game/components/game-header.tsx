import { Side, SkillLevel } from "@/types";

type Props = {
  playerSide: Side;
  skillLevel: SkillLevel;
};

export const GameHeader = ({ playerSide, skillLevel }: Props) => {
  return (
    <div className="text-center mb-6">
      <div className="text-gray-800 font-medium">
        Playing as: {playerSide === "white" ? "♔ White" : "♚ Black"}
      </div>
      <div className="text-sm text-gray-600">AI Level: {skillLevel}</div>
    </div>
  );
};
