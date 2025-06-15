import { useState, useCallback } from "react";
import { AlgebraicNotation } from "@/types";
import { Chess } from "chess.js";

type UseNotationReturn = {
  moves: AlgebraicNotation[];
  pushMove: (...moves: AlgebraicNotation[]) => void;
  popMove: () => void;
  getFen: () => string;
};

export const useNotation = (
  initialMoves: AlgebraicNotation[] = [],
): UseNotationReturn => {
  const [moves, setMoves] = useState<AlgebraicNotation[]>(initialMoves);

  const pushMove = useCallback((...newMoves: AlgebraicNotation[]) => {
    setMoves((prev) => [...prev, ...newMoves]);
  }, []);

  const popMove = useCallback(() => {
    setMoves((prev) => prev.slice(0, -1));
  }, []);

  const getFen = useCallback(() => {
    const chess = new Chess();
    moves.forEach((move) => {
      try {
        chess.move(move);
      } catch {
        console.error("Invalid move:", move);
      }
    });
    return chess.fen();
  }, [moves]);

  return { moves, pushMove, popMove, getFen };
};
