import { Chess } from "chess.js";
import { UciMove, Fen } from "@/types";

export function getNextMove(fen: Fen): UciMove {
  const chess = new Chess(fen);
  const moveNumber = chess.history().length + 1;

  if (moveNumber === 1) {
    return chess.turn() === "w" ? "e2e4" : "e7e5";
  } else {
    throw new Error("NotImplementedError: Only the first move is supported.");
  }
}
