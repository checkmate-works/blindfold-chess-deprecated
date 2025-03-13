import { Chess } from "chess.js";
import { AlgebraicNotation } from "@/types";

export function getNextMove(moves: AlgebraicNotation[]): AlgebraicNotation {
  const chess = new Chess();

  for (const move of moves) {
    chess.move(move);
  }

  if (chess.history().length < 2) {
    return chess.turn() === "w" ? "e4" : "e5";
  } else {
    throw new Error("NotImplementedError: Only the first move is supported.");
  }
}

export const historyToFen = (moves: AlgebraicNotation[]) => {
  const chess = new Chess();
  for (const move of moves) {
    chess.move(move);
  }
  return chess.fen();
};
