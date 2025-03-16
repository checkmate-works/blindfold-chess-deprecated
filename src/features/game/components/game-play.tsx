import { useState, useEffect } from "react";
import { GameSettings, AlgebraicNotation } from "@/types";
import { MoveInput } from "./move-input";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { getNextMove, historyToFen, cleanup } from "@/lib/game";
import { saveGame } from "@/lib/storage";

type GameState = {
  moves: AlgebraicNotation[];
  isPlayerTurn: boolean;
};

interface GamePlayProps {
  settings: GameSettings;
}

export const GamePlay = ({ settings }: GamePlayProps) => {
  const [showBoard, setShowBoard] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const displayColor =
    settings.color === "random"
      ? Math.random() < 0.5
        ? "white"
        : "black"
      : settings.color;

  const [gameState, setGameState] = useState<GameState>(() => ({
    moves: [],
    isPlayerTurn: displayColor === "white",
  }));

  useEffect(() => {
    const makeFirstMove = async () => {
      if (displayColor === "black") {
        setIsThinking(true);
        try {
          const firstMove = await getNextMove([]);
          setGameState({
            moves: [firstMove],
            isPlayerTurn: true,
          });
        } catch (error) {
          console.error("First move error:", error);
          setErrorMessage("Failed to get first move");
        }
        setIsThinking(false);
      }
    };

    makeFirstMove();
  }, [displayColor]);

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
      setErrorMessage(
        `${move} is an illegal move\nCurrent position reached after: ${gameState.moves.join(", ")}`,
      );
      return;
    }

    setErrorMessage(null);
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
      setErrorMessage(
        `AI made an invalid move.\nMove history: ${gameState.moves.join(", ")}`,
      );
      setGameState((prev) => ({
        ...prev,
        moves: gameState.moves,
        isPlayerTurn: true,
      }));
    } finally {
      setIsThinking(false);
    }
  };

  const currentFen = historyToFen(gameState.moves);

  const handleSave = () => {
    saveGame(gameState.moves, displayColor);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {errorMessage && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-center">
          {errorMessage}
        </div>
      )}

      <div className="text-center mb-6">
        <div>
          Playing as: {displayColor === "white" ? "♔ White" : "♚ Black"}
        </div>
        <div className="text-sm text-gray-600">
          AI Level: {settings.skillLevel}
        </div>
      </div>

      <button
        onClick={() => setShowBoard(!showBoard)}
        className="w-full mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {showBoard ? "Hide Board" : "Peek at Board"}
      </button>

      {showBoard && (
        <div className="mb-8">
          <Chessboard
            position={currentFen}
            boardOrientation={displayColor}
            boardWidth={400}
          />
        </div>
      )}

      <div className="mt-8">
        <MoveInput
          isPlayerTurn={gameState.isPlayerTurn && !isThinking}
          lastMove={gameState.moves[gameState.moves.length - 1]}
          onMove={handleMove}
        />
      </div>

      <button
        onClick={handleSave}
        className="w-full mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        disabled={gameState.moves.length === 0}
      >
        Save Game
      </button>
    </div>
  );
};
