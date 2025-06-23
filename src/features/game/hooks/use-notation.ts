import { useState, useCallback } from "react";
import { Chess } from "chess.js";
import { AlgebraicNotation } from "@/types";

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
    setMoves((prev) => {
      const chess = new Chess();
      // 既存の手を適用
      for (const move of prev) {
        try {
          chess.move(move);
        } catch {
          console.error("Invalid move in history:", move);
          return prev; // 既存の手が無効な場合は変更しない
        }
      }
      // 新しい手を検証
      for (const move of newMoves) {
        try {
          chess.move(move);
        } catch {
          console.error("Invalid move:", move);
          return prev; // 新しい手が無効な場合は追加しない
        }
      }
      return [...prev, ...newMoves];
    });
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
