import { AlgebraicNotation, Game, Side, SkillLevel, GameStatus } from "@/types";

const GAMES_KEY = "blindfold_chess_games";

export function saveGame(
  moves: AlgebraicNotation[],
  playerColor: Side,
  skillLevel: SkillLevel,
  id?: string,
  status: GameStatus = "in_progress",
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
    status,
  };

  if (existingIndex !== -1) {
    games[existingIndex] = newGame;
  } else {
    games.push(newGame);
  }

  localStorage.setItem(GAMES_KEY, JSON.stringify(games));
  return gameId;
}

export function loadGames(): Game[] {
  const gamesJson = localStorage.getItem(GAMES_KEY);
  if (!gamesJson) return [];
  return JSON.parse(gamesJson);
}

export function deleteGame(gameId: string) {
  const games = loadGames();
  const updatedGames = games.filter((game) => game.id !== gameId);
  localStorage.setItem(GAMES_KEY, JSON.stringify(updatedGames));
}

export function saveMove(gameId: string, move: AlgebraicNotation) {
  const games = loadGames();
  const game = games.find((g) => g.id === gameId);
  if (!game) return;
  game.moves.push(move);
  localStorage.setItem(GAMES_KEY, JSON.stringify(games));
}
