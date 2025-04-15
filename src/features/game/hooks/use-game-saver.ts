import { useEffect, useState, useRef } from "react";
import { AlgebraicNotation, Side, SkillLevel } from "@/types";
import { saveGame } from "@/lib/storage";

type Props = {
  moves: AlgebraicNotation[];
  playerColor: Side;
  skillLevel: SkillLevel;
  initialId?: string;
  onAutoSave?: () => void;
};

export const useGameSaver = ({
  moves,
  playerColor,
  skillLevel,
  initialId,
  onAutoSave,
}: Props) => {
  const [gameId, setGameId] = useState<string | null>(initialId ?? null);

  const latestMovesRef = useRef(moves);
  const isDirtyRef = useRef(false);

  useEffect(() => {
    if (
      latestMovesRef.current.length !== moves.length ||
      !latestMovesRef.current.every((m, i) => m === moves[i])
    ) {
      isDirtyRef.current = true;
      latestMovesRef.current = moves;
    }
  }, [moves]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirtyRef.current && latestMovesRef.current.length > 0) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);

      if (isDirtyRef.current && latestMovesRef.current.length > 0) {
        const id = saveGame(
          latestMovesRef.current,
          playerColor,
          skillLevel,
          gameId ?? undefined,
          "in_progress",
        );
        setGameId(id);
        onAutoSave?.();
      }
    };
  }, []);
};
