import { useEffect, useState, useRef } from "react";
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
      const isPlayerTurn =
        (moves.length % 2 === 0) === (playerColor === "white");
      if (isPlayerTurn) {
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

        if (isDirtyRef.current && latestMovesRef.current.length > 0) {
          // Use async IIFE to handle async repository save
          (async () => {
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
            onAutoSave?.();
          })();
        }
      }
    };
  }, [disabled, gameId, playerColor, skillLevel, onAutoSave, gameRepository]);
};
