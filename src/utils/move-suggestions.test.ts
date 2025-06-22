import { describe, it, expect } from "vitest";
import { generateMoveSuggestions } from "./move-suggestions";

describe("generateMoveSuggestions", () => {
  describe("empty or complete moves", () => {
    it("should return empty array for empty input", () => {
      expect(generateMoveSuggestions("")).toEqual([]);
    });

    it("should return empty array for complete pawn move", () => {
      expect(generateMoveSuggestions("e4")).toEqual([]);
      expect(generateMoveSuggestions("a7")).toEqual([]);
    });

    it("should return empty array for complete piece move", () => {
      expect(generateMoveSuggestions("Nf3")).toEqual([]);
      expect(generateMoveSuggestions("Be5")).toEqual([]);
    });

    it("should return empty array for complete capture", () => {
      expect(generateMoveSuggestions("Bxe5")).toEqual([]);
      expect(generateMoveSuggestions("exd5")).toEqual([]);
    });

    it("should return empty array for complete castling", () => {
      expect(generateMoveSuggestions("O-O")).toEqual([]);
      expect(generateMoveSuggestions("O-O-O")).toEqual([]);
    });
  });

  describe("castling suggestions", () => {
    it('should suggest both castling options for "O"', () => {
      expect(generateMoveSuggestions("O")).toEqual(["O-O", "O-O-O"]);
    });

    it('should suggest both castling options for "O-"', () => {
      expect(generateMoveSuggestions("O-")).toEqual(["O-O", "O-O-O"]);
    });

    it("should return empty array for complete kingside castling", () => {
      // O-O is already a complete move, so it returns empty array
      expect(generateMoveSuggestions("O-O")).toEqual([]);
    });

    it('should suggest only queenside castling for "O-O-"', () => {
      expect(generateMoveSuggestions("O-O-")).toEqual(["O-O-O"]);
    });
  });

  describe("piece moves", () => {
    it("should return empty array for single piece letter", () => {
      expect(generateMoveSuggestions("N")).toEqual([]);
      expect(generateMoveSuggestions("B")).toEqual([]);
      expect(generateMoveSuggestions("R")).toEqual([]);
      expect(generateMoveSuggestions("Q")).toEqual([]);
      expect(generateMoveSuggestions("K")).toEqual([]);
    });

    it("should suggest all ranks for piece + file", () => {
      const suggestions = generateMoveSuggestions("Ne");
      expect(suggestions).toHaveLength(8);
      expect(suggestions).toContain("Ne1");
      expect(suggestions).toContain("Ne8");
    });
  });

  describe("piece captures", () => {
    it("should return empty array for piece + x only", () => {
      // According to the implementation, 'Bx' without destination returns empty array
      const suggestions = generateMoveSuggestions("Bx");
      expect(suggestions).toEqual([]);
    });

    it("should suggest all ranks for piece + x + file", () => {
      const suggestions = generateMoveSuggestions("Rxd");
      expect(suggestions).toHaveLength(8);
      expect(suggestions).toContain("Rxd1");
      expect(suggestions).toContain("Rxd8");
    });
  });

  describe("king captures", () => {
    it('should return empty array for "Kx"', () => {
      expect(generateMoveSuggestions("Kx")).toEqual([]);
    });

    it("should suggest all ranks for king capture on specific file", () => {
      const suggestions = generateMoveSuggestions("Kxe");
      expect(suggestions).toHaveLength(8);
      expect(suggestions).toContain("Kxe1");
      expect(suggestions).toContain("Kxe8");
    });
  });

  describe("pawn moves", () => {
    it("should suggest all ranks for single file", () => {
      const suggestions = generateMoveSuggestions("e");
      expect(suggestions).toHaveLength(8);
      expect(suggestions).toContain("e1");
      expect(suggestions).toContain("e8");
    });

    it("should suggest adjacent files for pawn capture", () => {
      const suggestions = generateMoveSuggestions("ex");
      expect(suggestions).toHaveLength(16); // d and f files, 8 ranks each
      expect(suggestions).toContain("exd1");
      expect(suggestions).toContain("exf8");
    });

    it("should suggest ranks for specific pawn capture", () => {
      const suggestions = generateMoveSuggestions("exd");
      expect(suggestions).toHaveLength(8);
      expect(suggestions).toContain("exd1");
      expect(suggestions).toContain("exd8");
    });

    it("should handle edge files correctly for pawn captures", () => {
      const aSuggestions = generateMoveSuggestions("ax");
      expect(aSuggestions).toHaveLength(8); // only b file
      expect(aSuggestions).toContain("axb1");

      const hSuggestions = generateMoveSuggestions("hx");
      expect(hSuggestions).toHaveLength(8); // only g file
      expect(hSuggestions).toContain("hxg1");
    });
  });

  describe("from specific square", () => {
    it("should suggest moves from a specific square", () => {
      const suggestions = generateMoveSuggestions("e4");
      // Complete move, should return empty
      expect(suggestions).toEqual([]);
    });
  });
});
