import { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { GameSettings, GameStatus, AlgebraicNotation, Side } from "@/types";
import { useAutoSave } from "../hooks/use-auto-save";
import { useNotation } from "../hooks/use-notation";
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
};

export const GamePlayScreen = ({
  gameId,
  settings,
  initialMoves,
}: GamePlayScreenProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [playerSide] = useState<Side>(settings.color);
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<Tab>("moveInput");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [gameStatus, setGameStatus] = useState<GameStatus>("in_progress");
  const [savedGameId, setSavedGameId] = useState<string | null>(gameId ?? null);
  const { chessEngineService, gameRepository, createGameStateService } =
    useGameServices();
  const { moves, pushMove, getFen, popMove } = useNotation(initialMoves || []);
  const gameStateServiceRef = useRef<GameStateService | null>(null);

  // Initialize GameStateService with DI
  useEffect(() => {
    gameStateServiceRef.current = createGameStateService(initialMoves || []);
  }, [initialMoves, createGameStateService]);

  const handleSaveGame = useCallback(
    async (status: GameStatus) => {
      if (status !== "in_progress") {
        try {
          const id = await gameRepository.save(
            {
              moves,
              playerColor: playerSide,
              skillLevel: settings.skillLevel,
              status,
            },
            savedGameId ?? undefined,
          );
          setSavedGameId(id);
          toast.success(t("game.notifications.resultSaved"));
        } catch (error) {
          console.error("Failed to save game:", error);
          toast.error(t("game.notifications.saveFailed"));
        }
      }
    },
    [moves, playerSide, settings.skillLevel, savedGameId, t, gameRepository],
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
      const aiResult = await chessEngineService.getAiMove([]);
      pushMove(aiResult.move);
    };

    if (playerSide === "black" && moves.length === 0) {
      setIsPlayerTurn(false);
      makeFirstMove();
      setIsPlayerTurn(true);
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

      // Validate current move sequence
      const moveValidation = gameStateService.validateMoveSequence([
        ...moves,
        move,
      ]);
      if (!moveValidation.isValid) {
        setErrorMessage(
          moveValidation.errorMessage || t("game.moveInput.invalidMove"),
        );
        setIsPlayerTurn(true);
        return;
      }

      // Make the player move
      const playerMoveResult = gameStateService.makeMove(move);
      if (!playerMoveResult.isValid) {
        setErrorMessage(
          playerMoveResult.errorMessage || t("game.moveInput.invalidMove"),
        );
        setIsPlayerTurn(true);
        return;
      }

      pushMove(move);

      // Get AI move
      const aiResult = await chessEngineService.getAiMove([...moves, move]);

      // Make the AI move
      const aiMoveResult = gameStateService.makeMove(aiResult.move);
      if (!aiMoveResult.isValid) {
        console.error("Invalid AI move:", aiResult.move);
        return;
      }

      pushMove(aiResult.move);

      // Check game status after AI move
      const finalGameStatus = gameStateService.getGameStatus();

      if (finalGameStatus !== "in_progress") {
        setGameStatus(finalGameStatus);
        handleSaveGame(finalGameStatus);
        toast.success(t(`game.list.status.${finalGameStatus}`));
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

      // Update game state service to reflect the take back
      const gameStateService = gameStateServiceRef.current;
      if (gameStateService) {
        const updatedMoves = moves.slice(0, -2);
        gameStateServiceRef.current = new GameStateService(updatedMoves);
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
