import { Side, SkillLevel } from "@/types";

type Props = {
  playerSide: Side;
  skillLevel: SkillLevel;
  errorMessage: string | null;
};

export const GameHeader = ({ playerSide, skillLevel, errorMessage }: Props) => {
  return (
    <>
      {errorMessage && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-center whitespace-pre-wrap">
          {errorMessage}
        </div>
      )}

      <div className="text-center mb-6">
        <div className="text-gray-800 font-medium">
          Playing as: {playerSide === "white" ? "♔ White" : "♚ Black"}
        </div>
        <div className="text-sm text-gray-600">AI Level: {skillLevel}</div>
      </div>
    </>
  );
};
