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

type Props = {
  settings: GameSettings;
  savedMoves?: AlgebraicNotation[];
};

type Tab = "move" | "board";

export const GamePlay = ({ settings, savedMoves }: Props) => {
  const [activeTab, setActiveTab] = useState<Tab>("move");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
          setErrorMessage("Failed to get first move");
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
    <div className="min-h-screen pb-20 relative">
      <div className="max-w-2xl mx-auto p-4">
        {errorMessage && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-center whitespace-pre-wrap">
            {errorMessage}
          </div>
        )}

        <div className="text-center mb-6">
          <div className="text-gray-800 font-medium">
            Playing as: {displayColor === "white" ? "♔ White" : "♚ Black"}
          </div>
          <div className="text-sm text-gray-600">
            AI Level: {settings.skillLevel}
          </div>
        </div>

        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab("move")}
                className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "move"
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Enter Move
              </button>
              <button
                onClick={() => setActiveTab("board")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "board"
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                View Board
              </button>
            </nav>
          </div>
        </div>

        <div className="mt-4">
          {activeTab === "move" ? (
            <MoveInput
              isPlayerTurn={gameState.isPlayerTurn && !isThinking}
              lastMove={gameState.moves[gameState.moves.length - 1]}
              onMove={handleMove}
            />
          ) : (
            <div className="flex justify-center">
              <Chessboard
                position={currentFen}
                boardOrientation={displayColor}
                boardWidth={400}
              />
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <button
            onClick={handleSave}
            className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg shadow transition-colors duration-200"
            disabled={gameState.moves.length === 0}
          >
            Save Game
          </button>
        </div>
      </div>
    </div>
  );
};
