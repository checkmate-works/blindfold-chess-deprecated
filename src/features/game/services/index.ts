import { createContext, useContext } from "react";
import { AlgebraicNotation } from "@/types";
import { SkillLevel } from "@/types";
import { LocalStorageGameRepository } from "../repositories/game.repository";
import { StockfishEngine, ChessEngineService } from "./chess-engine.service";
import { GameStateService } from "./game-state.service";

export interface GameServices {
  chessEngineService: ChessEngineService;
  gameRepository: LocalStorageGameRepository;
  createGameStateService: (
    initialMoves?: AlgebraicNotation[],
  ) => GameStateService;
}

export function createGameServices(skillLevel: SkillLevel = 20): GameServices {
  const stockfishEngine = new StockfishEngine(skillLevel);
  const chessEngineService = new ChessEngineService(stockfishEngine);
  const gameRepository = new LocalStorageGameRepository();

  return {
    chessEngineService,
    gameRepository,
    createGameStateService: (initialMoves = []) =>
      new GameStateService(initialMoves),
  };
}

export const GameServicesContext = createContext<GameServices | null>(null);

export function useGameServices(): GameServices {
  const services = useContext(GameServicesContext);
  if (!services) {
    throw new Error(
      "useGameServices must be used within a GameServicesProvider",
    );
  }
  return services;
}

// Re-export for convenience
export type { IChessEngine } from "./chess-engine.service";
export type { IGameRepository } from "../repositories/game.repository";
export type { AiMoveResult } from "./chess-engine.service";
export type { MoveResult } from "./game-state.service";
export type { SaveGameParams } from "../repositories/game.repository";
