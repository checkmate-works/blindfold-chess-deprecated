import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import { GameSettings, GameStatus, AlgebraicNotation, Side } from "@/types";
import { TabMenu } from "./components/tab-menu";
import { GameHeader } from "./components/game-header";
import { GameContent } from "./components/game-content";
import { useAiVersus } from "./hooks/use-ai-versus";
import { useNotation } from "./hooks/use-notation";
import { useAutoSave } from "./hooks/use-auto-save";
import { saveGame } from "@/lib/storage";

type Tab = "move" | "board";

type Props = {
  settings: GameSettings;
  initialMoves: AlgebraicNotation[];
  gameId?: string;
};

export const GamePlay = ({ settings, initialMoves, gameId }: Props) => {
  const [playerSide] = useState<Side>(settings.color);
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<Tab>("move");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [gameStatus, setGameStatus] = useState<GameStatus>("in_progress");

  const { getAiMove } = useAiVersus({ skillLevel: settings.skillLevel });
  const { moves, pushMove, getFen } = useNotation(initialMoves);
  const handleAutoSave = useCallback(() => {
    toast.success("Game saved!");
  }, []);
  useAutoSave({
    moves,
    playerColor: playerSide,
    skillLevel: settings.skillLevel,
    initialId: gameId,
    onAutoSave: handleAutoSave,
    disabled: gameStatus !== "in_progress",
  });

  useEffect(() => {
    const makeFirstMove = async () => {
      const aiResult = await getAiMove([]);
      pushMove(aiResult.move);
    };

    if (playerSide === "black" && moves.length === 0) {
      setIsPlayerTurn(false);
      makeFirstMove();
      setIsPlayerTurn(true);
    }
  }, [playerSide, moves, pushMove, getAiMove]);

  useEffect(() => {
    if (gameStatus !== "in_progress") {
      saveGame(moves, playerSide, settings.skillLevel, gameId, gameStatus);
      toast.success("Game result saved!");
    }
  }, [gameStatus]);

  const onMove = async (move: AlgebraicNotation) => {
    try {
      setIsPlayerTurn(false);
      pushMove(move);
      setErrorMessage(null);

      const aiResult = await getAiMove([...moves, move]);
      pushMove(aiResult.move);

      if (aiResult.status !== "in_progress") {
        setGameStatus(aiResult.status);
      }
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      }
    } finally {
      setIsPlayerTurn(true);
    }
  };

  const handleErrorClear = useCallback(() => {
    setErrorMessage(null);
  }, []);

  return (
    <div className="min-h-screen pb-20 relative">
      <div className="max-w-2xl mx-auto p-4">
        <GameHeader playerSide={playerSide} skillLevel={settings.skillLevel} />

        {gameStatus !== "in_progress" && (
          <div className="mt-4 p-4 rounded bg-blue-50 text-blue-800 text-center font-semibold">
            {gameStatus === "win" && "You won!"}
            {gameStatus === "loss" && "You lost!"}
            {gameStatus === "draw" && "Game drawn!"}
          </div>
        )}

        <TabMenu activeTab={activeTab} onTabChange={setActiveTab} />

        <GameContent
          activeTab={activeTab}
          isPlayerTurn={isPlayerTurn}
          isThinking={!isPlayerTurn}
          lastMove={moves[moves.length - 1]}
          currentFen={getFen()}
          playerSide={playerSide}
          onMove={onMove}
          errorMessage={errorMessage}
          onErrorClear={handleErrorClear}
        />
      </div>
    </div>
  );
};
