import { useEffect, useRef } from "react";
import { AlgebraicNotation, SkillLevel } from "@/types";
import { Chess } from "chess.js";

type UseAiVersusOptions = {
  skillLevel?: SkillLevel;
};

type StockfishWorker = Worker & {
  postMessage: (message: string) => void;
  onmessage: ((event: MessageEvent<string>) => void) | null;
};

class StockfishWrapper {
  private worker: StockfishWorker;
  private isReady = false;

  constructor(private skillLevel: SkillLevel) {
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
      this.worker.postMessage("go depth 15");
    });
  }

  destroy() {
    this.worker.terminate();
  }
}

export const useAiVersus = ({ skillLevel = 20 }: UseAiVersusOptions = {}) => {
  const stockfishRef = useRef<StockfishWrapper | null>(null);

  useEffect(() => {
    stockfishRef.current = new StockfishWrapper(skillLevel);

    return () => {
      stockfishRef.current?.destroy();
      stockfishRef.current = null;
    };
  }, []);

  const getAiMove = async (
    moves: AlgebraicNotation[],
  ): Promise<AlgebraicNotation> => {
    const chess = new Chess();
    for (const move of moves) chess.move(move);

    const engine = stockfishRef.current;
    if (!engine) throw new Error("Stockfish engine is not initialized.");

    const uciMove = await engine.getMove(chess.fen());
    const move = chess.move(uciMove);

    if (!move) throw new Error(`Invalid engine move: ${uciMove}`);
    return move.san as AlgebraicNotation;
  };

  return {
    getAiMove,
  };
};
