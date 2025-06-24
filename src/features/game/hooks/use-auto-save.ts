import { useEffect, useState, useRef, useCallback } from "react";
import { AlgebraicNotation, Side, SkillLevel } from "@/types";
import { useGameServices } from "../services";

type Props = {
  moves: AlgebraicNotation[];
  playerColor: Side;
  skillLevel: SkillLevel;
  initialId?: string;
  onAutoSave?: () => void;
  disabled?: boolean;
};

export const useAutoSave = ({
  moves,
  playerColor,
  skillLevel,
  initialId,
  onAutoSave,
  disabled,
}: Props) => {
  const [gameId, setGameId] = useState<string | null>(initialId ?? null);
  const { gameRepository } = useGameServices();

  const latestMovesRef = useRef(moves);
  const isDirtyRef = useRef(false);
  const hasPlayerMovedRef = useRef(false);

  // Function to save the game
  const saveGame = useCallback(async () => {
    if (isDirtyRef.current && latestMovesRef.current.length > 0 && !disabled) {
      try {
        const id = await gameRepository.save(
          {
            moves: latestMovesRef.current,
            playerColor,
            skillLevel,
            status: "in_progress",
          },
          gameId ?? undefined,
        );

        setGameId(id);
        isDirtyRef.current = false;

        // Set a flag to indicate games have been updated
        sessionStorage.setItem("games_updated", Date.now().toString());

        onAutoSave?.();
        return id;
      } catch {
        return null;
      }
    } else {
      return null;
    }
  }, [disabled, gameId, playerColor, skillLevel, onAutoSave, gameRepository]);

  useEffect(() => {
    if (
      latestMovesRef.current.length !== moves.length ||
      !latestMovesRef.current.every((m, i) => m === moves[i])
    ) {
      if (hasPlayerMovedRef.current) {
        isDirtyRef.current = true;
      }
      latestMovesRef.current = moves;
    }
  }, [moves]);

  useEffect(() => {
    if (moves.length > 0) {
      // Check if the last move was made by the player
      const lastMoveIndex = moves.length - 1;
      const wasPlayerMove =
        (lastMoveIndex % 2 === 0) === (playerColor === "white");

      if (wasPlayerMove) {
        hasPlayerMovedRef.current = true;
      }
    }
  }, [moves, playerColor]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirtyRef.current && latestMovesRef.current.length > 0) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    if (!disabled) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      if (!disabled) {
        window.removeEventListener("beforeunload", handleBeforeUnload);
        // Save synchronously on cleanup
        saveGame();
      }
    };
  }, [disabled, saveGame]);

  // Export saveGame function for manual saving
  return { saveGame, gameId };
};
