import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import type { Game } from "@/types";
import { LocalStorageGameRepository } from "./game.repository";
import type { SaveGameParams } from "./game.repository";

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

// Mock crypto.randomUUID
const mockUUID = "12345678-1234-1234-1234-123456789012";
vi.stubGlobal("crypto", {
  randomUUID: vi.fn().mockReturnValue(mockUUID),
});

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("LocalStorageGameRepository", () => {
  let repository: LocalStorageGameRepository;
  const sampleGameData: SaveGameParams = {
    moves: ["e4", "e5", "Nf3"],
    playerColor: "white",
    skillLevel: 10,
    status: "in_progress",
  };

  beforeEach(() => {
    repository = new LocalStorageGameRepository();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("save", () => {
    it("should save new game and return generated ID", async () => {
      localStorageMock.getItem.mockReturnValue("[]");

      const gameId = await repository.save(sampleGameData);

      expect(gameId).toBe(mockUUID);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "blindfold_chess_games",
        expect.stringContaining(mockUUID),
      );
    });

    it("should save new game with provided ID", async () => {
      localStorageMock.getItem.mockReturnValue("[]");
      const customId = "custom-id";

      const gameId = await repository.save(sampleGameData, customId);

      expect(gameId).toBe(customId);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "blindfold_chess_games",
        expect.stringContaining(customId),
      );
    });

    it("should update existing game", async () => {
      const existingId = "existing-id";
      const existingGames: Game[] = [
        {
          id: existingId,
          date: "2024-01-01T00:00:00.000Z",
          moves: ["e4"],
          playerColor: "white",
          skillLevel: 5,
          status: "in_progress",
        },
      ];

      localStorageMock.getItem.mockReturnValue(JSON.stringify(existingGames));

      const gameId = await repository.save(sampleGameData, existingId);

      expect(gameId).toBe(existingId);

      const savedCall = localStorageMock.setItem.mock.calls[0];
      const savedGames = JSON.parse(savedCall[1]);

      expect(savedGames).toHaveLength(1);
      expect(savedGames[0].id).toBe(existingId);
      expect(savedGames[0].moves).toEqual(sampleGameData.moves);
    });

    it("should add game to existing games list", async () => {
      const existingGames: Game[] = [
        {
          id: "game-1",
          date: "2024-01-01T00:00:00.000Z",
          moves: ["d4"],
          playerColor: "black",
          skillLevel: 15,
          status: "completed",
        },
      ];

      localStorageMock.getItem.mockReturnValue(JSON.stringify(existingGames));

      await repository.save(sampleGameData);

      const savedCall = localStorageMock.setItem.mock.calls[0];
      const savedGames = JSON.parse(savedCall[1]);

      expect(savedGames).toHaveLength(2);
      expect(savedGames[0]).toEqual(existingGames[0]);
      expect(savedGames[1].id).toBe(mockUUID);
    });
  });

  describe("load", () => {
    it("should load existing game by ID", async () => {
      const gameId = "test-game-id";
      const games: Game[] = [
        {
          id: gameId,
          date: "2024-01-01T00:00:00.000Z",
          moves: ["e4", "e5"],
          playerColor: "white",
          skillLevel: 10,
          status: "in_progress",
        },
        {
          id: "other-game",
          date: "2024-01-02T00:00:00.000Z",
          moves: ["d4"],
          playerColor: "black",
          skillLevel: 20,
          status: "completed",
        },
      ];

      localStorageMock.getItem.mockReturnValue(JSON.stringify(games));

      const result = await repository.load(gameId);

      expect(result).toEqual(games[0]);
      expect(localStorageMock.getItem).toHaveBeenCalledWith(
        "blindfold_chess_games",
      );
    });

    it("should return null for non-existent game", async () => {
      localStorageMock.getItem.mockReturnValue("[]");

      const result = await repository.load("non-existent");

      expect(result).toBeNull();
    });

    it("should return null when localStorage is empty", async () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = await repository.load("any-id");

      expect(result).toBeNull();
    });
  });

  describe("loadAll", () => {
    it("should load all games", async () => {
      const games: Game[] = [
        {
          id: "game-1",
          date: "2024-01-01T00:00:00.000Z",
          moves: ["e4"],
          playerColor: "white",
          skillLevel: 10,
          status: "in_progress",
        },
        {
          id: "game-2",
          date: "2024-01-02T00:00:00.000Z",
          moves: ["d4", "d5"],
          playerColor: "black",
          skillLevel: 15,
          status: "completed",
        },
      ];

      localStorageMock.getItem.mockReturnValue(JSON.stringify(games));

      const result = await repository.loadAll();

      expect(result).toEqual(games);
      expect(localStorageMock.getItem).toHaveBeenCalledWith(
        "blindfold_chess_games",
      );
    });

    it("should return empty array when no games exist", async () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = await repository.loadAll();

      expect(result).toEqual([]);
    });

    it("should handle corrupted localStorage data", async () => {
      localStorageMock.getItem.mockReturnValue("invalid json");

      const result = await repository.loadAll();

      expect(result).toEqual([]);
    });
  });

  describe("delete", () => {
    it("should delete game by ID", async () => {
      const games: Game[] = [
        {
          id: "game-1",
          date: "2024-01-01T00:00:00.000Z",
          moves: ["e4"],
          playerColor: "white",
          skillLevel: 10,
          status: "in_progress",
        },
        {
          id: "game-2",
          date: "2024-01-02T00:00:00.000Z",
          moves: ["d4"],
          playerColor: "black",
          skillLevel: 15,
          status: "completed",
        },
      ];

      localStorageMock.getItem.mockReturnValue(JSON.stringify(games));

      await repository.delete("game-1");

      const savedCall = localStorageMock.setItem.mock.calls[0];
      const updatedGames = JSON.parse(savedCall[1]);

      expect(updatedGames).toHaveLength(1);
      expect(updatedGames[0].id).toBe("game-2");
    });

    it("should handle deletion of non-existent game", async () => {
      const games: Game[] = [
        {
          id: "game-1",
          date: "2024-01-01T00:00:00.000Z",
          moves: ["e4"],
          playerColor: "white",
          skillLevel: 10,
          status: "in_progress",
        },
      ];

      localStorageMock.getItem.mockReturnValue(JSON.stringify(games));

      await repository.delete("non-existent");

      const savedCall = localStorageMock.setItem.mock.calls[0];
      const updatedGames = JSON.parse(savedCall[1]);

      expect(updatedGames).toEqual(games);
    });
  });

  describe("saveMove", () => {
    it("should add move to existing game", async () => {
      const gameId = "test-game";
      const games: Game[] = [
        {
          id: gameId,
          date: "2024-01-01T00:00:00.000Z",
          moves: ["e4", "e5"],
          playerColor: "white",
          skillLevel: 10,
          status: "in_progress",
        },
      ];

      localStorageMock.getItem.mockReturnValue(JSON.stringify(games));

      await repository.saveMove(gameId, "Nf3");

      const savedCall = localStorageMock.setItem.mock.calls[0];
      const updatedGames = JSON.parse(savedCall[1]);

      expect(updatedGames[0].moves).toEqual(["e4", "e5", "Nf3"]);
    });

    it("should throw error for non-existent game", async () => {
      localStorageMock.getItem.mockReturnValue("[]");

      await expect(repository.saveMove("non-existent", "e4")).rejects.toThrow(
        "Game with id non-existent not found",
      );
    });
  });

  describe("error handling", () => {
    it("should handle localStorage errors gracefully", async () => {
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error("localStorage error");
      });

      await expect(repository.loadAll()).rejects.toThrow("localStorage error");
    });

    it("should handle setItem errors", async () => {
      localStorageMock.getItem.mockReturnValue("[]");
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error("Storage quota exceeded");
      });

      await expect(repository.save(sampleGameData)).rejects.toThrow(
        "Storage quota exceeded",
      );
    });
  });
});
