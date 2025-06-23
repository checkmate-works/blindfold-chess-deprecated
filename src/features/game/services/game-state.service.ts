import { Chess } from "chess.js";
import { AlgebraicNotation, GameStatus } from "@/types";

export type MoveResult = {
  isValid: boolean;
  gameStatus: GameStatus;
  errorMessage?: string;
};

export class GameStateService {
  private chess: Chess;

  constructor(initialMoves: AlgebraicNotation[] = []) {
    this.chess = new Chess();
    this.loadMoves(initialMoves);
  }

  private loadMoves(moves: AlgebraicNotation[]): void {
    for (const move of moves) {
      try {
        this.chess.move(move);
      } catch {
        throw new Error(`Invalid move in history: ${move}`);
      }
    }
  }

  makeMove(move: AlgebraicNotation): MoveResult {
    try {
      // Make the move directly on the chess instance
      // chess.js will throw an error if the move is invalid
      this.chess.move(move);

      return {
        isValid: true,
        gameStatus: this.getGameStatus(),
      };
    } catch {
      return {
        isValid: false,
        gameStatus: "in_progress",
        errorMessage: "Invalid move",
      };
    }
  }

  validateMoveSequence(moves: AlgebraicNotation[]): MoveResult {
    const chess = new Chess();

    for (const move of moves) {
      try {
        chess.move(move);
      } catch {
        return {
          isValid: false,
          gameStatus: "in_progress",
          errorMessage: `Invalid move in sequence: ${move}`,
        };
      }
    }

    return {
      isValid: true,
      gameStatus: this.getGameStatusFromChess(chess),
    };
  }

  getGameStatus(): GameStatus {
    return this.getGameStatusFromChess(this.chess);
  }

  private getGameStatusFromChess(chess: Chess): GameStatus {
    if (chess.isCheckmate()) {
      return chess.turn() === "w" ? "loss" : "win";
    }

    if (chess.isDraw()) {
      return "draw";
    }

    return "in_progress";
  }

  getCurrentTurn(): "w" | "b" {
    return this.chess.turn();
  }

  getFen(): string {
    return this.chess.fen();
  }

  isInCheck(): boolean {
    return this.chess.inCheck();
  }

  isCheckmate(): boolean {
    return this.chess.isCheckmate();
  }

  isDraw(): boolean {
    return this.chess.isDraw();
  }

  getHistory(): string[] {
    return this.chess.history();
  }

  reset(): void {
    this.chess = new Chess();
  }

  clone(): GameStateService {
    const service = new GameStateService();
    service.chess = new Chess(this.chess.fen());
    return service;
  }
}
