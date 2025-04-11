import { useState, useEffect } from "react";
import { GameSettings, AlgebraicNotation } from "@/types";
import { Chess } from "chess.js";
import { getNextMove, historyToFen, cleanup } from "@/lib/game";

type GameState = {
  moves: AlgebraicNotation[];
  isPlayerTurn: boolean;
};

export const useGamePlay = (
  settings: GameSettings,
  savedMoves?: AlgebraicNotation[],
) => {
  const [isThinking, setIsThinking] = useState(false);

  const displayColor =
    settings.color === "random"
      ? Math.random() < 0.5
        ? "white"
        : "black"
      : settings.color;

  const [gameState, setGameState] = useState<GameState>(() => ({
    moves: savedMoves || [],
    isPlayerTurn: savedMoves
      ? (savedMoves.length % 2 === 0) === (displayColor === "white")
      : displayColor === "white",
  }));

  useEffect(() => {
    const makeFirstMove = async () => {
      if (displayColor === "black" && !savedMoves) {
        setIsThinking(true);
        try {
          const firstMove = await getNextMove([]);
          setGameState({
            moves: [firstMove],
            isPlayerTurn: true,
          });
        } catch (error) {
          console.error("First move error:", error);
          throw new Error("Failed to get first move");
        }
        setIsThinking(false);
      }
    };

    makeFirstMove();
  }, [displayColor, savedMoves]);

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, []);

  const handleMove = async (move: AlgebraicNotation) => {
    const chess = new Chess();
    try {
      for (const historyMove of gameState.moves) {
        chess.move(historyMove);
      }
      chess.move(move);
    } catch {
      throw new Error(
        `${move} is an illegal move\nCurrent position reached after: ${gameState.moves.join(", ")}`,
      );
    }

    const newMoves = [...gameState.moves, move];

    setGameState((prev) => ({
      ...prev,
      moves: newMoves,
      isPlayerTurn: false,
    }));

    setIsThinking(true);
    try {
      const aiMove = await getNextMove(newMoves);
      chess.move(aiMove);

      setGameState((prev) => ({
        ...prev,
        moves: [...newMoves, aiMove],
        isPlayerTurn: true,
      }));
    } catch (error) {
      console.error("AI move error:", error);
      setGameState((prev) => ({
        ...prev,
        moves: gameState.moves,
        isPlayerTurn: true,
      }));
      throw new Error(
        `AI made an invalid move.\nMove history: ${gameState.moves.join(", ")}`,
      );
    } finally {
      setIsThinking(false);
    }
  };

  const currentFen = historyToFen(gameState.moves);

  return {
    isThinking,
    gameState,
    displayColor,
    currentFen,
    handleMove,
  };
};
