import { useEffect } from "react";
import { AlgebraicNotation } from "@/types";
import { computeNextMoveFromEngine, cleanup } from "@/lib/game";

// TODO: Rename the custom hook name
export const useGamePlay = () => {
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, []);

  const getAiMove = async (moves: AlgebraicNotation[]) => {
    return computeNextMoveFromEngine(moves);
  };

  return {
    getAiMove,
  };
};
