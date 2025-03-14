type StockfishWorker = Worker & {
  postMessage: (message: string) => void;
  onmessage: ((event: MessageEvent<string>) => void) | null;
};

export class StockfishWrapper {
  private worker: StockfishWorker;
  private isReady = false;

  constructor() {
    this.worker = new Worker("/stockfish.js") as StockfishWorker;
    this.init();
  }

  private init() {
    return new Promise<void>((resolve) => {
      this.worker.onmessage = (e) => {
        if (e.data === "uciok") {
          this.isReady = true;
          this.worker.postMessage("setoption name Skill Level value 20");
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
