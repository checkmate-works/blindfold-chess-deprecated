import { Chess } from "chess.js";
import { AlgebraicNotation } from "@/types";
import { StockfishWrapper } from "./stockfish";

let stockfish: StockfishWrapper | null = null;

async function getEngine() {
  if (!stockfish) {
    stockfish = new StockfishWrapper();
  }
  return stockfish;
}

export async function getNextMove(
  moves: AlgebraicNotation[],
): Promise<AlgebraicNotation> {
  const chess = new Chess();

  // Replay moves to get current position
  for (const move of moves) {
    chess.move(move);
  }

  // Get engine's move
  const engine = await getEngine();
  const uciMove = await engine.getMove(chess.fen());

  // Convert UCI move to algebraic notation
  const move = chess.move(uciMove);
  if (!move) throw new Error(`Invalid engine move: ${uciMove}`);

  return move.san as AlgebraicNotation;
}

export function cleanup() {
  if (stockfish) {
    stockfish.destroy();
    stockfish = null;
  }
}

export const historyToFen = (moves: AlgebraicNotation[]) => {
  const chess = new Chess();
  for (const move of moves) {
    chess.move(move);
  }
  return chess.fen();
};
