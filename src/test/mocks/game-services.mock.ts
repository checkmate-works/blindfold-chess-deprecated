import { vi } from "vitest";
import type {
  IChessEngine,
  AiMoveResult,
} from "@/features/game/services/chess-engine.service";
import type {
  IGameRepository,
  SaveGameParams,
} from "@/features/game/repositories/game.repository";
import type { GameServices } from "@/features/game/services";
import { GameStateService } from "@/features/game/services/game-state.service";
import type { Game, AlgebraicNotation } from "@/types";

export class MockChessEngine implements IChessEngine {
  private skillLevel = 20;
  private destroyed = false;

  public getMoveMock = vi.fn();
  public setSkillLevelMock = vi.fn();
  public destroyMock = vi.fn();

  async getMove(fen: string): Promise<string> {
    if (this.destroyed) {
      throw new Error("Engine has been destroyed");
    }
    return this.getMoveMock(fen) || "e2e4";
  }

  setSkillLevel(level: number): void {
    this.setSkillLevelMock(level);
    this.skillLevel = level;
  }

  destroy(): void {
    this.destroyMock();
    this.destroyed = true;
  }

  // Test utilities
  isDestroyed(): boolean {
    return this.destroyed;
  }

  getSkillLevel(): number {
    return this.skillLevel;
  }
}

export class MockChessEngineService {
  public getAiMoveMock = vi.fn();
  public setSkillLevelMock = vi.fn();
  public destroyMock = vi.fn();

  constructor(private engine: IChessEngine) {}

  async getAiMove(moves: AlgebraicNotation[]): Promise<AiMoveResult> {
    const mockResult = this.getAiMoveMock(moves);
    if (mockResult) {
      return mockResult;
    }

    // Default behavior
    return {
      move: "e4" as AlgebraicNotation,
      status: "in_progress",
    };
  }

  setSkillLevel(level: number): void {
    this.setSkillLevelMock(level);
    this.engine.setSkillLevel(level);
  }

  destroy(): void {
    this.destroyMock();
    this.engine.destroy();
  }
}

export class MockGameRepository implements IGameRepository {
  private games: Game[] = [];

  public saveMock = vi.fn();
  public loadMock = vi.fn();
  public loadAllMock = vi.fn();
  public deleteMock = vi.fn();
  public saveMoveMock = vi.fn();

  async save(gameData: SaveGameParams, id?: string): Promise<string> {
    const result = this.saveMock(gameData, id);
    if (result) return result;

    // Default behavior
    const gameId = id || `mock-game-${Date.now()}`;
    const game: Game = {
      id: gameId,
      date: new Date().toISOString(),
      moves: gameData.moves,
      playerColor: gameData.playerColor,
      skillLevel: gameData.skillLevel,
      status: gameData.status || "in_progress",
    };

    const existingIndex = this.games.findIndex((g) => g.id === gameId);
    if (existingIndex >= 0) {
      this.games[existingIndex] = game;
    } else {
      this.games.push(game);
    }

    return gameId;
  }

  async load(id: string): Promise<Game | null> {
    const result = this.loadMock(id);
    if (result !== undefined) return result;

    return this.games.find((game) => game.id === id) || null;
  }

  async loadAll(): Promise<Game[]> {
    const result = this.loadAllMock();
    if (result !== undefined) return result;

    return [...this.games];
  }

  async delete(gameId: string): Promise<void> {
    this.deleteMock(gameId);
    this.games = this.games.filter((game) => game.id !== gameId);
  }

  async saveMove(gameId: string, move: AlgebraicNotation): Promise<void> {
    this.saveMoveMock(gameId, move);
    const game = this.games.find((g) => g.id === gameId);
    if (!game) {
      throw new Error(`Game with id ${gameId} not found`);
    }
    game.moves.push(move);
  }

  // Test utilities
  setGames(games: Game[]): void {
    this.games = [...games];
  }

  getGames(): Game[] {
    return [...this.games];
  }

  clear(): void {
    this.games = [];
  }
}

type MockGameServicesOptions = {
  chessEngine?: MockChessEngine;
  chessEngineService?: MockChessEngineService;
  gameRepository?: MockGameRepository;
};

export function createMockGameServices(
  options: MockGameServicesOptions = {},
): GameServices {
  const chessEngine = options.chessEngine || new MockChessEngine();
  const chessEngineService =
    options.chessEngineService || new MockChessEngineService(chessEngine);
  const gameRepository = options.gameRepository || new MockGameRepository();

  return {
    chessEngineService:
      chessEngineService as GameServices["chessEngineService"],
    gameRepository,
    createGameStateService: (initialMoves = []) =>
      new GameStateService(initialMoves),
  };
}

// Common test scenarios
export const mockGameScenarios = {
  // Standard opening moves
  openingGame: (): Game => ({
    id: "opening-game",
    date: "2024-01-01T00:00:00.000Z",
    moves: ["e4", "e5", "Nf3", "Nc6"],
    playerColor: "white",
    skillLevel: 10,
    status: "in_progress",
  }),

  // Completed game with checkmate
  completedGame: (): Game => ({
    id: "completed-game",
    date: "2024-01-01T00:00:00.000Z",
    moves: ["e4", "e5", "Bc4", "Nc6", "Qh5", "Nf6", "Qxf7#"],
    playerColor: "white",
    skillLevel: 15,
    status: "win",
  }),

  // Draw game
  drawGame: (): Game => ({
    id: "draw-game",
    date: "2024-01-01T00:00:00.000Z",
    moves: ["e4", "e5", "Nf3", "Nc6", "Nxe5", "Nxe5"],
    playerColor: "black",
    skillLevel: 20,
    status: "draw",
  }),
};

// Chess engine response presets
export const mockEngineResponses = {
  standardOpening: {
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1": "e2e4",
    "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2": "g1f3",
    "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2": "b8c6",
  },

  aggressiveOpening: {
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1": "f2f3",
    "rnbqkbnr/pppp1ppp/8/4p3/8/5P2/PPPPP1PP/RNBQKBNR w KQkq e6 0 2": "g2g4",
  },

  checkmateInOne: {
    "rnbqkbnr/pppp1ppp/8/4p3/2B1P3/8/PPPP1PPP/RNBQK1NR b KQkq - 1 2": "h5f7",
  },
};
