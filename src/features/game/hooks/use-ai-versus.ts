import { useEffect } from "react";
import { AlgebraicNotation } from "@/types";
import { computeNextMoveFromEngine, cleanup } from "@/lib/game";

export const useAiVersus = () => {
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
