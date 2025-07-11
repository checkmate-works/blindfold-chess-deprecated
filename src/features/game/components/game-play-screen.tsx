import { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { GameSettings, GameStatus, AlgebraicNotation, Side } from "@/types";
import { useAutoSave } from "../hooks/use-auto-save";
import { useNotation } from "../hooks/use-notation";
import { usePageLeave } from "../hooks/use-page-leave";
import { useGameServices } from "../services";
import { GameStateService } from "../services/game-state.service";
import { GameContent } from "./game-content";
import { GameHeader } from "./game-header";
import { TabMenu } from "./tab-menu";

type Tab = "moveInput" | "board" | "notation";

type GamePlayScreenProps = {
  gameId?: string;
  settings: GameSettings;
  initialMoves: AlgebraicNotation[];
  gameStatus?: GameStatus;
};

export const GamePlayScreen = ({
  gameId,
  settings,
  initialMoves,
  gameStatus: initialGameStatus,
}: GamePlayScreenProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [playerSide] = useState<Side>(settings.color);
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(
    initialGameStatus === "in_progress" || !initialGameStatus,
  );
  const [activeTab, setActiveTab] = useState<Tab>("moveInput");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [gameStatus, setGameStatus] = useState<GameStatus>(
    initialGameStatus || "in_progress",
  );
  const [savedGameId, setSavedGameId] = useState<string | null>(gameId ?? null);
  const { chessEngineService, gameRepository, createGameStateService } =
    useGameServices();
  const { moves, pushMove, getFen, popMove } = useNotation(initialMoves || []);
  const gameStateServiceRef = useRef<GameStateService | null>(null);

  // Initialize GameStateService with DI
  useEffect(() => {
    gameStateServiceRef.current = createGameStateService(initialMoves || []);
  }, [initialMoves, createGameStateService]);

  const handleAutoSave = useCallback(() => {
    toast.success(t("game.notifications.gameSaved"));
  }, [t]);

  const { saveGame: autoSaveGame } = useAutoSave({
    moves,
    playerColor: playerSide,
    skillLevel: settings.skillLevel,
    initialId: savedGameId ?? undefined,
    onAutoSave: handleAutoSave,
    disabled: gameStatus !== "in_progress",
  });

  // Handle page leave with auto-save
  const { navigateWithSave } = usePageLeave({
    onBeforeLeave: useCallback(async () => {
      if (gameStatus === "in_progress") {
        await autoSaveGame();
      }
    }, [autoSaveGame, gameStatus]),
    shouldPrevent: useCallback(() => {
      return gameStatus === "in_progress" && moves.length > 0;
    }, [gameStatus, moves.length]),
  });

  // Handle navigation with auto-save
  const handleNavigateBack = useCallback(async () => {
    await navigateWithSave("/");
  }, [navigateWithSave]);

  useEffect(() => {
    const makeFirstMove = async () => {
      const aiResult = await chessEngineService.getAiMove([]);
      pushMove(aiResult.move);

      // Update GameStateService to stay in sync with the AI move
      const gameStateService = gameStateServiceRef.current;
      if (gameStateService) {
        gameStateService.makeMove(aiResult.move);
      }
    };

    if (playerSide === "black" && moves.length === 0) {
      setIsPlayerTurn(false);
      makeFirstMove().finally(() => {
        setIsPlayerTurn(true);
      });
    }
  }, [playerSide, moves, pushMove, chessEngineService]);

  const onMove = async (move: AlgebraicNotation) => {
    try {
      setIsPlayerTurn(false);
      setErrorMessage(null);

      const gameStateService = gameStateServiceRef.current;
      if (!gameStateService) {
        setErrorMessage("Game state service not initialized");
        setIsPlayerTurn(true);
        return;
      }

      // Make the player move (chess.js will validate the move)
      const playerMoveResult = gameStateService.makeMove(move);
      if (!playerMoveResult.isValid) {
        setErrorMessage(
          playerMoveResult.errorMessage || t("game.moveInput.invalidMove"),
        );
        setIsPlayerTurn(true);
        return;
      }

      pushMove(move);

      // Check game status after player move
      const statusAfterPlayerMove = gameStateService.getGameStatus(playerSide);

      if (statusAfterPlayerMove !== "in_progress") {
        setGameStatus(statusAfterPlayerMove);

        // Save the game with the final move included
        try {
          const id = await gameRepository.save(
            {
              moves: [...moves, move], // Include the final move
              playerColor: playerSide,
              skillLevel: settings.skillLevel,
              status: statusAfterPlayerMove,
            },
            savedGameId ?? undefined,
          );
          setSavedGameId(id);

          // Show appropriate message based on game result
          if (statusAfterPlayerMove === "win") {
            toast.success(t("game.notifications.checkmate"));
          } else if (statusAfterPlayerMove === "draw") {
            toast.success(t("game.notifications.draw"));
          } else {
            toast.success(t(`game.list.status.${statusAfterPlayerMove}`));
          }

          setTimeout(() => navigate("/"), 1500); // Give time to see the toast
        } catch {
          toast.error(t("game.notifications.saveFailed"));
        }
        return;
      }

      // Get AI move
      const aiResult = await chessEngineService.getAiMove([...moves, move]);

      // Make the AI move
      const aiMoveResult = gameStateService.makeMove(aiResult.move);
      if (!aiMoveResult.isValid) {
        return;
      }

      pushMove(aiResult.move);

      // Check game status after AI move
      const finalGameStatus = gameStateService.getGameStatus(playerSide);

      if (finalGameStatus !== "in_progress") {
        setGameStatus(finalGameStatus);

        // Save the game with all moves including AI's final move
        try {
          const id = await gameRepository.save(
            {
              moves: [...moves, move, aiResult.move], // Include both player's and AI's final moves
              playerColor: playerSide,
              skillLevel: settings.skillLevel,
              status: finalGameStatus,
            },
            savedGameId ?? undefined,
          );
          setSavedGameId(id);

          // Show appropriate message based on game result
          if (finalGameStatus === "loss") {
            toast.error(t("game.notifications.checkmateByAi"));
          } else if (finalGameStatus === "draw") {
            toast.success(t("game.notifications.draw"));
          } else {
            toast.success(t(`game.list.status.${finalGameStatus}`));
          }

          setTimeout(() => navigate("/"), 1500); // Give time to see the toast
        } catch {
          toast.error(t("game.notifications.saveFailed"));
        }
        return;
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
      // Calculate the updated moves before popping
      const updatedMoves = moves.slice(0, -2);

      popMove();
      popMove();
      setIsPlayerTurn(true);

      // Update game state service to reflect the take back
      const gameStateService = gameStateServiceRef.current;
      if (gameStateService) {
        gameStateServiceRef.current = createGameStateService(updatedMoves);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <GameHeader
        skillLevel={settings.skillLevel}
        status={gameStatus}
        isPlayerTurn={isPlayerTurn}
        playerColor={playerSide}
        onBack={handleNavigateBack}
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
          gameStatus={gameStatus}
        />
      </div>
    </div>
  );
};
