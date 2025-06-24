import { Chess } from "chess.js";
import { AlgebraicNotation } from "@/types";

export const parsePgn = (pgn: string): AlgebraicNotation[] => {
  const chess = new Chess();
  try {
    chess.loadPgn(pgn);
    return chess.history() as AlgebraicNotation[];
  } catch {
    throw new Error("Invalid PGN format");
  }
};

export const validatePgn = (pgn: string): boolean => {
  const chess = new Chess();
  try {
    chess.loadPgn(pgn);
    return true;
  } catch {
    return false;
  }
};

export const generatePgn = (moves: AlgebraicNotation[]): string => {
  const chess = new Chess();

  // 手を適用
  moves.forEach((move) => {
    try {
      chess.move(move);
    } catch {
      // ... existing code ...
    }
  });

  return chess.pgn();
};
