import { AlgebraicNotation, Game, Side, SkillLevel, GameStatus } from "@/types";

export interface IGameRepository {
  save(game: Omit<Game, "id" | "date">, id?: string): Promise<string>;
  load(id: string): Promise<Game | null>;
  loadAll(): Promise<Game[]>;
  delete(id: string): Promise<void>;
  saveMove(gameId: string, move: AlgebraicNotation): Promise<void>;
}

export type SaveGameParams = {
  moves: AlgebraicNotation[];
  playerColor: Side;
  skillLevel: SkillLevel;
  status?: GameStatus;
};

export class LocalStorageGameRepository implements IGameRepository {
  private readonly GAMES_KEY = "blindfold_chess_games";

  async save(gameData: SaveGameParams, id?: string): Promise<string> {
    const games = await this.loadAll();

    const gameId = id ?? crypto.randomUUID();
    const existingIndex = games.findIndex((g) => g.id === gameId);

    const newGame: Game = {
      id: gameId,
      date: new Date().toISOString(),
      moves: gameData.moves,
      playerColor: gameData.playerColor,
      skillLevel: gameData.skillLevel,
      status: gameData.status || "in_progress",
    };

    if (existingIndex !== -1) {
      games[existingIndex] = newGame;
    } else {
      games.push(newGame);
    }

    localStorage.setItem(this.GAMES_KEY, JSON.stringify(games));
    return gameId;
  }

  async load(id: string): Promise<Game | null> {
    const games = await this.loadAll();
    return games.find((game) => game.id === id) || null;
  }

  async loadAll(): Promise<Game[]> {
    const gamesJson = localStorage.getItem(this.GAMES_KEY);
    if (!gamesJson) return [];

    try {
      return JSON.parse(gamesJson);
    } catch {
      return [];
    }
  }

  async delete(gameId: string): Promise<void> {
    const games = await this.loadAll();
    const updatedGames = games.filter((game) => game.id !== gameId);
    localStorage.setItem(this.GAMES_KEY, JSON.stringify(updatedGames));
  }

  async saveMove(gameId: string, move: AlgebraicNotation): Promise<void> {
    const games = await this.loadAll();
    const game = games.find((g) => g.id === gameId);

    if (!game) {
      throw new Error(`Game with id ${gameId} not found`);
    }

    game.moves.push(move);
    localStorage.setItem(this.GAMES_KEY, JSON.stringify(games));
  }
}

// Legacy compatibility function for existing code
export function saveGame(
  moves: AlgebraicNotation[],
  playerColor: Side,
  skillLevel: SkillLevel,
  id?: string,
  status: GameStatus = "in_progress",
): string {
  const repository = new LocalStorageGameRepository();
  // Note: This is synchronous for backward compatibility, but the repository is async
  const gameId = id ?? crypto.randomUUID();

  repository.save(
    {
      moves,
      playerColor,
      skillLevel,
      status,
    },
    gameId,
  );

  return gameId;
}
