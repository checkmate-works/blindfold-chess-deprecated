import { useEffect } from "react";
import { AlgebraicNotation, Side, SkillLevel } from "@/types";
import { saveGame } from "@/lib/storage";

type UseGameSaverProps = {
  moves: AlgebraicNotation[];
  playerColor: Side;
  skillLevel: SkillLevel;
};

export const useGameSaver = ({
  moves,
  playerColor,
  skillLevel,
}: UseGameSaverProps) => {
  const save = () => {
    if (moves.length > 0) {
      saveGame(moves, playerColor, skillLevel);
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
