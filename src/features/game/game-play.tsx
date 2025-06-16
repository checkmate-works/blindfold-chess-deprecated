import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { GameSettings, GameStatus, AlgebraicNotation, Side } from "@/types";
import { TabMenu } from "./components/tab-menu";
import { GameHeader } from "./components/game-header";
import { GameContent } from "./components/game-content";
import { useAiVersus } from "./hooks/use-ai-versus";
import { useNotation } from "./hooks/use-notation";
import { useAutoSave } from "./hooks/use-auto-save";
import { saveGame } from "@/lib/storage";
import { useTranslation } from "react-i18next";
import { Chess } from "chess.js";

type Tab = "moveInput" | "board" | "notation";

type Props = {
  settings: GameSettings;
  initialMoves: AlgebraicNotation[];
  gameId?: string;
};

export const GamePlay = ({ settings, initialMoves, gameId }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [playerSide] = useState<Side>(settings.color);
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<Tab>("moveInput");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [gameStatus, setGameStatus] = useState<GameStatus>("in_progress");

  const { getAiMove } = useAiVersus({ skillLevel: settings.skillLevel });
  const { moves, pushMove, getFen, popMove } = useNotation(initialMoves);
  const handleAutoSave = useCallback(() => {
    toast.success(t("game.notifications.gameSaved"));
  }, [t]);
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
      toast.success(t("game.notifications.resultSaved"));
    }
  }, [gameStatus, moves, playerSide, settings.skillLevel, gameId, t]);

  const onMove = async (move: AlgebraicNotation) => {
    try {
      setIsPlayerTurn(false);
      setErrorMessage(null);

      const chess = new Chess();
      for (const m of moves) {
        try {
          chess.move(m);
        } catch {
          setErrorMessage(t("game.moveInput.invalidMove"));
          setIsPlayerTurn(true);
          return;
        }
      }

      try {
        chess.move(move);
      } catch {
        setErrorMessage(t("game.moveInput.invalidMove"));
        setIsPlayerTurn(true);
        return;
      }

      if (chess.isCheckmate()) {
        const newStatus: GameStatus =
          playerSide === (chess.turn() === "w" ? "white" : "black")
            ? "loss"
            : "win";
        setGameStatus(newStatus);
        saveGame(
          [...moves, move],
          playerSide,
          settings.skillLevel,
          gameId,
          newStatus,
        );
        toast.success(t(`game.status.${newStatus}`));
        navigate("/");
        return;
      }

      if (chess.isDraw()) {
        setGameStatus("draw");
        saveGame(
          [...moves, move],
          playerSide,
          settings.skillLevel,
          gameId,
          "draw",
        );
        toast.success(t("game.status.draw"));
        navigate("/");
        return;
      }

      pushMove(move);

      const aiResult = await getAiMove([...moves, move]);
      pushMove(aiResult.move);

      if (aiResult.status !== "in_progress") {
        setGameStatus(aiResult.status);
        saveGame(
          [...moves, move, aiResult.move],
          playerSide,
          settings.skillLevel,
          gameId,
          aiResult.status,
        );
        toast.success(t(`game.status.${aiResult.status}`));
        navigate("/");
      }
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      }
    } finally {
      setIsPlayerTurn(true);
    }
  };

  const handleTakeBack = () => {
    if (moves.length >= 2) {
      popMove();
      popMove();
      setIsPlayerTurn(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <GameHeader
        skillLevel={settings.skillLevel}
        status={gameStatus}
        isPlayerTurn={isPlayerTurn}
        playerColor={playerSide}
      />
      <div className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 md:px-8">
        <TabMenu
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isPlayerTurn={isPlayerTurn}
          gameStatus={gameStatus}
        />
        <GameContent
          activeTab={activeTab}
          isPlayerTurn={isPlayerTurn}
          isThinking={!isPlayerTurn}
          lastMove={moves[moves.length - 1]}
          currentFen={getFen()}
          playerSide={playerSide}
          onMove={onMove}
          errorMessage={errorMessage}
          onErrorClear={() => setErrorMessage(null)}
          moves={moves}
          onTakeBack={handleTakeBack}
        />
      </div>
    </div>
  );
};
