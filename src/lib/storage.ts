import { AlgebraicNotation } from "@/types";

export interface SavedGame {
  id: string;
  date: string;
  moves: AlgebraicNotation[];
  playerColor: "white" | "black";
}

export function saveGame(
  moves: AlgebraicNotation[],
  playerColor: "white" | "black",
): void {
  const games = loadGames();
  const newGame: SavedGame = {
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    moves,
    playerColor,
  };

  games.push(newGame);
  localStorage.setItem("savedGames", JSON.stringify(games));
}

export function loadGames(): SavedGame[] {
  const saved = localStorage.getItem("savedGames");
  return saved ? JSON.parse(saved) : [];
}
