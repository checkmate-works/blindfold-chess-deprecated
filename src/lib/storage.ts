import { AlgebraicNotation, Game, Side, SkillLevel } from "@/types";

export function saveGame(
  moves: AlgebraicNotation[],
  playerColor: Side,
  skillLevel: SkillLevel,
): void {
  const games = loadGames();
  const newGame: Game = {
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    moves,
    playerColor,
    skillLevel,
  };

  games.push(newGame);
  localStorage.setItem("savedGames", JSON.stringify(games));
}

export function loadGames(): Game[] {
  const saved = localStorage.getItem("savedGames");
  return saved ? JSON.parse(saved) : [];
}
