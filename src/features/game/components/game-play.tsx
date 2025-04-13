import { useState, useEffect } from "react";
import { GameSettings, AlgebraicNotation, Side } from "@/types";
import { TabMenu } from "./tab-menu";
import { GameHeader } from "./game-header";
import { GameContent } from "./game-content";
import { useAiVersus } from "../hooks/use-ai-versus";
import { useNotation } from "../hooks/use-notation";
import { useGameSaver } from "../hooks/use-game-saver";

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
  const { getAiMove } = useAiVersus({ skillLevel: settings.skillLevel });
  const { moves, pushMove, getFen } = useNotation(initialMoves);
  useGameSaver({
    moves,
    playerColor: playerSide,
    skillLevel: settings.skillLevel,
    initialId: gameId,
  });

  useEffect(() => {
    const makeFirstMove = async () => {
      pushMove(await getAiMove([]));
    };

    if (playerSide === "black" && moves.length === 0) {
      setIsPlayerTurn(false);
      makeFirstMove();
      setIsPlayerTurn(true);
    }
  }, [playerSide, moves, pushMove, getAiMove]);

  const onMove = async (move: AlgebraicNotation) => {
    try {
      setIsPlayerTurn(false);
      const aiMove = await getAiMove([...moves, move]);
      pushMove(move, aiMove);
      setErrorMessage(null);
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      }
    } finally {
      setIsPlayerTurn(true);
    }
  };

  return (
    <div className="min-h-screen pb-20 relative">
      <div className="max-w-2xl mx-auto p-4">
        <GameHeader
          playerSide={playerSide}
          skillLevel={settings.skillLevel}
          errorMessage={errorMessage}
        />

        <TabMenu activeTab={activeTab} onTabChange={setActiveTab} />

        <GameContent
          activeTab={activeTab}
          isPlayerTurn={isPlayerTurn}
          isThinking={!isPlayerTurn}
          lastMove={moves[moves.length - 1]}
          currentFen={getFen()}
          playerSide={playerSide}
          onMove={onMove}
        />
      </div>
    </div>
  );
};
