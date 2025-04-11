import { Chess } from "chess.js";
import { useState } from "react";
import { AlgebraicNotation } from "@/types";

export const useNotation = (initialMoves: AlgebraicNotation[] = []) => {
  const [moves, setMoves] = useState<AlgebraicNotation[]>(initialMoves);

  const pushMove = (...moves: AlgebraicNotation[]) => {
    setMoves((prev) => [...prev, ...moves]);
  };

  const getFen = () => {
    const chess = new Chess();
    for (const move of moves) {
      chess.move(move);
    }
    return chess.fen();
  };

  return { moves, pushMove, getFen };
};
