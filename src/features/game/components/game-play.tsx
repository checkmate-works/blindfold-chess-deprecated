import { useState } from "react";
import { GameSettings } from "@/types";
import { MoveInput } from "./move-input";
import { Chessboard } from "react-chessboard";

type GameState = {
  // TODO: define the type of the algebraic notation
  fen: string;
  history: string[];
  castlingRights: {
    whiteKingside: boolean;
    whiteQueenside: boolean;
    blackKingside: boolean;
    blackQueenside: boolean;
  };
  enPassantTarget: string | null;
  halfMoveClock: number;
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

  const [gameState] = useState<GameState>({
    fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    history: [],
    castlingRights: {
      whiteKingside: true,
      whiteQueenside: true,
      blackKingside: true,
      blackQueenside: true,
    },
    enPassantTarget: null,
    halfMoveClock: 0,
    isPlayerTurn: displayColor === "white",
  });

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
            position={gameState.fen}
            boardOrientation={displayColor}
          />
        </div>
      )}

      <div className="mt-8">
        <MoveInput
          isPlayerTurn={gameState.isPlayerTurn}
          lastMove={gameState.history[gameState.history.length - 1]}
        />
      </div>
    </div>
  );
};
