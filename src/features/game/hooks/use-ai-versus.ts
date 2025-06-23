import { useEffect, useRef } from "react";
import {
  ChessEngineService,
  StockfishEngine,
  AiMoveResult,
} from "@/features/game/services/chess-engine.service";
import { AlgebraicNotation, SkillLevel } from "@/types";

type UseAiVersusOptions = {
  skillLevel?: SkillLevel;
};

export const useAiVersus = ({ skillLevel = 20 }: UseAiVersusOptions = {}) => {
  const chessEngineServiceRef = useRef<ChessEngineService | null>(null);

  useEffect(() => {
    const stockfishEngine = new StockfishEngine(skillLevel);
    chessEngineServiceRef.current = new ChessEngineService(stockfishEngine);

    return () => {
      chessEngineServiceRef.current?.destroy();
      chessEngineServiceRef.current = null;
    };
  }, [skillLevel]);

  const getAiMove = async (
    moves: AlgebraicNotation[],
  ): Promise<AiMoveResult> => {
    const service = chessEngineServiceRef.current;
    if (!service) throw new Error("Chess engine service is not initialized.");

    return service.getAiMove(moves);
  };

  return {
    getAiMove,
  };
};
