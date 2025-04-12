import { AlgebraicNotation, Game, Side, SkillLevel } from "@/types";

export function saveGame(
  moves: AlgebraicNotation[],
  playerColor: Side,
  skillLevel: SkillLevel,
  id?: string,
): string {
  const games = loadGames();

  const gameId = id ?? crypto.randomUUID();
  const existingIndex = games.findIndex((g) => g.id === gameId);

  const newGame: Game = {
    id: gameId,
    date: new Date().toISOString(),
    moves,
    playerColor,
    skillLevel,
  };

  if (existingIndex !== -1) {
    games[existingIndex] = newGame;
  } else {
    games.push(newGame);
  }

  localStorage.setItem("savedGames", JSON.stringify(games));
  return gameId;
}

export function loadGames(): Game[] {
  const saved = localStorage.getItem("savedGames");
  return saved ? JSON.parse(saved) : [];
}
