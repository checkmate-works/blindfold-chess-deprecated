import { useEffect, useState } from "react";
import { AlgebraicNotation, Side, SkillLevel } from "@/types";
import { saveGame } from "@/lib/storage";

type UseGameSaverProps = {
  moves: AlgebraicNotation[];
  playerColor: Side;
  skillLevel: SkillLevel;
  initialId?: string;
};

export const useGameSaver = ({
  moves,
  playerColor,
  skillLevel,
  initialId,
}: UseGameSaverProps) => {
  const [gameId, setGameId] = useState<string | null>(initialId ?? null);

  const save = () => {
    if (moves.length > 0) {
      const id = saveGame(moves, playerColor, skillLevel, gameId ?? undefined);
      setGameId(id);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (moves.length > 0) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      save();
    };
  }, [moves]);

  return { save };
};
