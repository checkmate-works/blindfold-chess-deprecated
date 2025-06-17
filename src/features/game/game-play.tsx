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
  const [savedGameId, setSavedGameId] = useState<string | null>(gameId ?? null);

  const { getAiMove } = useAiVersus({ skillLevel: settings.skillLevel });
  const { moves, pushMove, getFen, popMove } = useNotation(initialMoves);

  const handleSaveGame = useCallback(
    (status: GameStatus) => {
      if (status !== "in_progress") {
        const id = saveGame(
          moves,
          playerSide,
          settings.skillLevel,
          savedGameId ?? undefined,
          status,
        );
        setSavedGameId(id);
        toast.success(t("game.notifications.resultSaved"));
      }
    },
    [moves, playerSide, settings.skillLevel, savedGameId, t],
  );

  const handleAutoSave = useCallback(() => {
    toast.success(t("game.notifications.gameSaved"));
  }, [t]);

  useAutoSave({
    moves,
    playerColor: playerSide,
    skillLevel: settings.skillLevel,
    initialId: savedGameId ?? undefined,
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

      pushMove(move);

      const aiResult = await getAiMove([...moves, move]);
      pushMove(aiResult.move);

      const chessAfterAiMove = new Chess();
      for (const m of [...moves, move, aiResult.move]) {
        try {
          chessAfterAiMove.move(m);
        } catch {
          console.error("Invalid move in history:", m);
          return;
        }
      }

      if (chessAfterAiMove.isCheckmate()) {
        const newStatus: GameStatus =
          playerSide === (chessAfterAiMove.turn() === "w" ? "white" : "black")
            ? "loss"
            : "win";
        setGameStatus(newStatus);
        handleSaveGame(newStatus);
        toast.success(t(`game.list.status.${newStatus}`));
        navigate("/");
        return;
      }

      if (chessAfterAiMove.isDraw()) {
        setGameStatus("draw");
        handleSaveGame("draw");
        toast.success(t("game.list.status.draw"));
        navigate("/");
        return;
      }

      if (aiResult.status !== "in_progress") {
        setGameStatus(aiResult.status);
        handleSaveGame(aiResult.status);
        toast.success(t(`game.list.status.${aiResult.status}`));
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
