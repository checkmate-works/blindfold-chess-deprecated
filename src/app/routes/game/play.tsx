import { useLocation, Navigate } from "react-router-dom";
import { ContentLayout } from "@/components/layouts";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { GameSettings, GameStatus, AlgebraicNotation, Side } from "@/types";
import { TabMenu } from "@/features/game/components/tab-menu";
import { GameHeader } from "@/features/game/components/game-header";
import { GameContent } from "@/features/game/components/game-content";
import { useAiVersus } from "@/features/game/hooks/use-ai-versus";
import { useNotation } from "@/features/game/hooks/use-notation";
import { useAutoSave } from "@/features/game/hooks/use-auto-save";
import { saveGame } from "@/lib/storage";
import { useTranslation } from "react-i18next";
import { Chess } from "chess.js";

type Tab = "moveInput" | "board" | "notation";

export type PlayScreenState = {
  gameId?: string;
  settings: GameSettings;
  initialMoves: AlgebraicNotation[];
};

const GamePlayRoute = () => {
  const location = useLocation();
  const state = location.state as PlayScreenState | undefined;
  if (!state?.settings) {
    return <Navigate to="/game/setup" replace />;
  }

  // TODO: フックの条件付き呼び出しを解消するリファクタを後で実施
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [playerSide] = useState<Side>(state.settings.color);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [activeTab, setActiveTab] = useState<Tab>("moveInput");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [gameStatus, setGameStatus] = useState<GameStatus>("in_progress");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [savedGameId, setSavedGameId] = useState<string | null>(
    state.gameId ?? null,
  );
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { getAiMove } = useAiVersus({ skillLevel: state.settings.skillLevel });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { moves, pushMove, getFen, popMove } = useNotation(
    state.initialMoves || [],
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const handleSaveGame = useCallback(
    (status: GameStatus) => {
      if (status !== "in_progress") {
        const id = saveGame(
          moves,
          playerSide,
          state.settings.skillLevel,
          savedGameId ?? undefined,
          status,
        );
        setSavedGameId(id);
        toast.success(t("game.notifications.resultSaved"));
      }
    },
    [moves, playerSide, state.settings.skillLevel, savedGameId, t],
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const handleAutoSave = useCallback(() => {
    toast.success(t("game.notifications.gameSaved"));
  }, [t]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useAutoSave({
    moves,
    playerColor: playerSide,
    skillLevel: state.settings.skillLevel,
    initialId: savedGameId ?? undefined,
    onAutoSave: handleAutoSave,
    disabled: gameStatus !== "in_progress",
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
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
    <ContentLayout title={t("game.title")}>
      <div className="flex flex-col min-h-screen">
        <GameHeader
          skillLevel={state.settings.skillLevel}
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
    </ContentLayout>
  );
};

export default GamePlayRoute;
