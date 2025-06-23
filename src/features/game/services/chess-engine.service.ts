import { Chess } from "chess.js";
import { AlgebraicNotation, SkillLevel, GameStatus } from "@/types";

export interface IChessEngine {
  getMove(fen: string): Promise<string>;
  setSkillLevel(level: SkillLevel): void;
  destroy(): void;
}

export type AiMoveResult = {
  move: AlgebraicNotation;
  status: GameStatus;
};

type StockfishWorker = Worker & {
  postMessage: (message: string) => void;
  onmessage: ((event: MessageEvent<string>) => void) | null;
};

export class StockfishEngine implements IChessEngine {
  private worker: StockfishWorker;
  private isReady = false;
  private skillLevel: SkillLevel;

  constructor(skillLevel: SkillLevel = 20) {
    this.skillLevel = skillLevel;
    this.worker = new Worker("/stockfish.js") as StockfishWorker;
    this.init();
  }

  private init() {
    return new Promise<void>((resolve) => {
      this.worker.onmessage = (e) => {
        if (e.data === "uciok") {
          this.isReady = true;
          this.worker.postMessage(
            `setoption name Skill Level value ${this.skillLevel}`,
          );
          this.worker.postMessage("setoption name MultiPV value 1");
          this.worker.postMessage("setoption name Hash value 128");
          this.worker.postMessage("setoption name Threads value 2");
          resolve();
        }
      };
      this.worker.postMessage("uci");
    });
  }

  async getMove(fen: string): Promise<string> {
    return new Promise((resolve) => {
      this.worker.onmessage = (e) => {
        const msg = e.data;
        if (msg.startsWith("bestmove")) {
          const move = msg.split(" ")[1];
          resolve(move);
        }
      };

      this.worker.postMessage(`position fen ${fen}`);
      const depth = this.getDepthForSkillLevel();
      const time = this.getTimeForSkillLevel();
      this.worker.postMessage(`go depth ${depth} movetime ${time}`);
    });
  }

  setSkillLevel(level: SkillLevel): void {
    this.skillLevel = level;
    if (this.isReady) {
      this.worker.postMessage(
        `setoption name Skill Level value ${this.skillLevel}`,
      );
    }
  }

  private getDepthForSkillLevel(): number {
    switch (this.skillLevel) {
      case 0:
        return 8;
      case 5:
        return 10;
      case 10:
        return 12;
      case 15:
        return 14;
      case 20:
        return 16;
      default:
        return 12;
    }
  }

  private getTimeForSkillLevel(): number {
    switch (this.skillLevel) {
      case 0:
        return 500;
      case 5:
        return 1000;
      case 10:
        return 1500;
      case 15:
        return 2000;
      case 20:
        return 2500;
      default:
        return 1500;
    }
  }

  destroy() {
    this.worker.terminate();
  }
}

export class ChessEngineService {
  private engine: IChessEngine;

  constructor(engine: IChessEngine) {
    this.engine = engine;
  }

  async getAiMove(moves: AlgebraicNotation[]): Promise<AiMoveResult> {
    const chess = new Chess();
    for (const move of moves) chess.move(move);

    const aiSide = chess.turn();

    const uciMove = await this.engine.getMove(chess.fen());
    const move = chess.move(uciMove);

    if (!move) throw new Error(`Invalid engine move: ${uciMove}`);

    if (chess.isCheckmate()) {
      return {
        move: move.san as AlgebraicNotation,
        status: aiSide === "w" ? "loss" : "win",
      };
    }

    if (chess.isDraw()) {
      return {
        move: move.san as AlgebraicNotation,
        status: "draw",
      };
    }

    return {
      move: move.san as AlgebraicNotation,
      status: "in_progress",
    };
  }

  setSkillLevel(level: SkillLevel): void {
    this.engine.setSkillLevel(level);
  }

  destroy(): void {
    this.engine.destroy();
  }
}
