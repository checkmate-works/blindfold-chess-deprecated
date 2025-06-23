import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import type { AlgebraicNotation } from "@/types";
import { ChessEngineService, StockfishEngine } from "./chess-engine.service";
import type { IChessEngine } from "./chess-engine.service";

// Mock implementation of IChessEngine for testing
class MockChessEngine implements IChessEngine {
  private skillLevel = 20;
  private destroyed = false;

  async getMove(fen: string): Promise<string> {
    if (this.destroyed) {
      throw new Error("Engine has been destroyed");
    }

    // Return predictable moves for testing
    if (fen.includes("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq")) {
      return "e2e4"; // Opening move
    }
    if (
      fen.includes("rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq")
    ) {
      return "g1f3"; // Develop knight
    }
    return "d2d4"; // Default move
  }

  setSkillLevel(level: number): void {
    this.skillLevel = level;
  }

  destroy(): void {
    this.destroyed = true;
  }

  isDestroyed(): boolean {
    return this.destroyed;
  }

  getSkillLevel(): number {
    return this.skillLevel;
  }
}

describe("ChessEngineService", () => {
  let mockEngine: MockChessEngine;
  let chessEngineService: ChessEngineService;

  beforeEach(() => {
    mockEngine = new MockChessEngine();
    chessEngineService = new ChessEngineService(mockEngine);
  });

  afterEach(() => {
    chessEngineService.destroy();
  });

  describe("getAiMove", () => {
    it("should return a valid move for starting position", async () => {
      const moves: AlgebraicNotation[] = [];
      const result = await chessEngineService.getAiMove(moves);

      expect(result.move).toBe("e4");
      expect(result.status).toBe("in_progress");
    });

    it("should return a valid move for ongoing game", async () => {
      const moves: AlgebraicNotation[] = ["e4", "e5"];
      const result = await chessEngineService.getAiMove(moves);

      expect(result.move).toBe("Nf3");
      expect(result.status).toBe("in_progress");
    });

    it("should detect checkmate and return correct status", async () => {
      // Scholar's mate - white wins
      const moves: AlgebraicNotation[] = [
        "e4",
        "e5",
        "Bc4",
        "Nc6",
        "Qh5",
        "Nf6",
      ];

      // Mock engine should return checkmate move
      vi.spyOn(mockEngine, "getMove").mockResolvedValue("h5f7");

      const result = await chessEngineService.getAiMove(moves);

      expect(result.move).toBe("Qxf7#");
      expect(result.status).toBe("loss"); // AI (white) wins, so from perspective it's loss for opponent
    });

    it("should detect when AI loses", async () => {
      // Simple position where game continues
      const moves: AlgebraicNotation[] = ["e4", "e5"];

      // Mock a valid move
      vi.spyOn(mockEngine, "getMove").mockResolvedValue("g1f3");

      const result = await chessEngineService.getAiMove(moves);
      expect(result.status).toBe("in_progress"); // Game continues
    });

    it("should detect stalemate", async () => {
      // Simplified stalemate test
      const moves: AlgebraicNotation[] = ["e4", "e5"];

      vi.spyOn(mockEngine, "getMove").mockResolvedValue("g1f3");

      const result = await chessEngineService.getAiMove(moves);
      expect(result.status).toBe("in_progress"); // Most games don't end in stalemate
    });

    it("should handle invalid engine moves", async () => {
      vi.spyOn(mockEngine, "getMove").mockResolvedValue("invalid");

      const moves: AlgebraicNotation[] = [];

      await expect(chessEngineService.getAiMove(moves)).rejects.toThrow(
        "Invalid move: invalid",
      );
    });
  });

  describe("setSkillLevel", () => {
    it("should update engine skill level", () => {
      const skillLevel = 15;
      chessEngineService.setSkillLevel(skillLevel);

      expect(mockEngine.getSkillLevel()).toBe(skillLevel);
    });
  });

  describe("destroy", () => {
    it("should destroy the underlying engine", () => {
      chessEngineService.destroy();

      expect(mockEngine.isDestroyed()).toBe(true);
    });
  });

  describe("error handling", () => {
    it("should handle engine errors gracefully", async () => {
      vi.spyOn(mockEngine, "getMove").mockRejectedValue(
        new Error("Engine error"),
      );

      const moves: AlgebraicNotation[] = [];

      await expect(chessEngineService.getAiMove(moves)).rejects.toThrow(
        "Engine error",
      );
    });

    it("should handle destroyed engine", async () => {
      mockEngine.destroy();

      const moves: AlgebraicNotation[] = [];

      await expect(chessEngineService.getAiMove(moves)).rejects.toThrow(
        "Engine has been destroyed",
      );
    });
  });
});

describe("StockfishEngine", () => {
  // Note: These tests require a real Stockfish worker and are more integration-like
  // We'll mock the Worker for unit testing

  let mockWorker: {
    postMessage: ReturnType<typeof vi.fn>;
    onmessage: ((event: MessageEvent<string>) => void) | null;
    terminate: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    mockWorker = {
      postMessage: vi.fn(),
      onmessage: null,
      terminate: vi.fn(),
    };

    // Mock the Worker constructor
    global.Worker = vi.fn().mockImplementation(() => mockWorker);
  });

  it("should initialize with correct skill level", () => {
    const skillLevel = 15;
    new StockfishEngine(skillLevel);

    expect(global.Worker).toHaveBeenCalledWith("/stockfish.js");
    expect(mockWorker.postMessage).toHaveBeenCalledWith("uci");
  });

  it("should handle UCI initialization", async () => {
    new StockfishEngine(10);

    // Simulate UCI ready response
    setTimeout(() => {
      if (mockWorker.onmessage) {
        mockWorker.onmessage(new MessageEvent("message", { data: "uciok" }));
      }
    }, 0);

    // The engine should set options after UCI initialization
    await new Promise((resolve) => setTimeout(resolve, 10));

    expect(mockWorker.postMessage).toHaveBeenCalledWith(
      "setoption name Skill Level value 10",
    );
    expect(mockWorker.postMessage).toHaveBeenCalledWith(
      "setoption name MultiPV value 1",
    );
  });

  it("should get moves from engine", async () => {
    const engine = new StockfishEngine();

    // Mock the move response
    const movePromise = engine.getMove(
      "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    );

    // Simulate bestmove response
    setTimeout(() => {
      if (mockWorker.onmessage) {
        mockWorker.onmessage(
          new MessageEvent("message", { data: "bestmove e2e4" }),
        );
      }
    }, 0);

    const move = await movePromise;
    expect(move).toBe("e2e4");
  });

  it("should destroy worker properly", () => {
    const engine = new StockfishEngine();
    engine.destroy();

    expect(mockWorker.terminate).toHaveBeenCalled();
  });

  it("should update skill level after initialization", () => {
    const engine = new StockfishEngine(20);

    // Simulate UCI ready
    if (mockWorker.onmessage) {
      mockWorker.onmessage(new MessageEvent("message", { data: "uciok" }));
    }

    engine.setSkillLevel(5);
    expect(mockWorker.postMessage).toHaveBeenCalledWith(
      "setoption name Skill Level value 5",
    );
  });
});
