import { useState } from "react";
import { GameSettings, AlgebraicNotation } from "@/types";
import { MoveInput } from "./move-input";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { getNextMove, historyToFen } from "@/lib/game";

type GameState = {
  moves: AlgebraicNotation[];
  isPlayerTurn: boolean;
};

interface GamePlayProps {
  settings: GameSettings;
}

export const GamePlay = ({ settings }: GamePlayProps) => {
  const [showBoard, setShowBoard] = useState(false);
  const displayColor =
    settings.color === "random"
      ? Math.random() < 0.5
        ? "white"
        : "black"
      : settings.color;

  const [gameState, setGameState] = useState<GameState>(() => {
    if (displayColor === "black") {
      const firstMove = getNextMove([]);
      return {
        moves: [firstMove],
        isPlayerTurn: true,
      };
    }

    return {
      moves: [],
      isPlayerTurn: true,
    };
  });

  const handleMove = (move: AlgebraicNotation) => {
    const chess = new Chess();
    for (const historyMove of gameState.moves) {
      chess.move(historyMove);
    }
    chess.move(move);

    const newMoves = [...gameState.moves, move];
    const aiMove = getNextMove(newMoves);

    chess.move(aiMove);

    setGameState({
      moves: [...newMoves, aiMove],
      isPlayerTurn: true,
    });
  };

  console.log("gameState.moves:", gameState.moves);
  const currentFen = historyToFen(gameState.moves);

  return (
    <div className="max-w-2xl mx-auto p-4">
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
          isPlayerTurn={gameState.isPlayerTurn}
          lastMove={gameState.moves[gameState.moves.length - 1]}
          onMove={handleMove}
        />
      </div>
    </div>
  );
};
