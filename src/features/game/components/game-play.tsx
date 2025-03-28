import { useState, useEffect } from "react";
import { GameSettings, AlgebraicNotation } from "@/types";
import { Chess } from "chess.js";
import { getNextMove, historyToFen, cleanup } from "@/lib/game";
import { saveGame } from "@/lib/storage";
import { TabMenu } from "./tab-menu";
import { GameHeader } from "./game-header";
import { GameContent } from "./game-content";

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
        <GameHeader
          displayColor={displayColor}
          skillLevel={settings.skillLevel}
          errorMessage={errorMessage}
        />

        <TabMenu activeTab={activeTab} onTabChange={setActiveTab} />

        <GameContent
          activeTab={activeTab}
          isPlayerTurn={gameState.isPlayerTurn}
          isThinking={isThinking}
          lastMove={gameState.moves[gameState.moves.length - 1]}
          currentFen={currentFen}
          displayColor={displayColor}
          onMove={handleMove}
        />
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
