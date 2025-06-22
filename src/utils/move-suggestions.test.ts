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

    it("should suggest moves with disambiguation (piece + file + file)", () => {
      const suggestions = generateMoveSuggestions("Ngf");
      expect(suggestions).toHaveLength(8);
      expect(suggestions).toContain("Ngf1");
      expect(suggestions).toContain("Ngf2");
      expect(suggestions).toContain("Ngf3");
      expect(suggestions).toContain("Ngf4");
      expect(suggestions).toContain("Ngf5");
      expect(suggestions).toContain("Ngf6");
      expect(suggestions).toContain("Ngf7");
      expect(suggestions).toContain("Ngf8");
    });

    it("should suggest rook moves with disambiguation", () => {
      const suggestions = generateMoveSuggestions("Rhe");
      expect(suggestions).toHaveLength(8);
      expect(suggestions).toContain("Rhe1");
      expect(suggestions).toContain("Rhe8");
    });

    it("should suggest bishop moves with disambiguation", () => {
      const suggestions = generateMoveSuggestions("Bce");
      expect(suggestions).toHaveLength(8);
      expect(suggestions).toContain("Bce1");
      expect(suggestions).toContain("Bce8");
    });

    it("should suggest queen moves with disambiguation", () => {
      const suggestions = generateMoveSuggestions("Qad");
      expect(suggestions).toHaveLength(8);
      expect(suggestions).toContain("Qad1");
      expect(suggestions).toContain("Qad8");
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

    it("should suggest captures with disambiguation (piece + file + x + file)", () => {
      const suggestions = generateMoveSuggestions("Ngxf");
      expect(suggestions).toHaveLength(8);
      expect(suggestions).toContain("Ngxf1");
      expect(suggestions).toContain("Ngxf2");
      expect(suggestions).toContain("Ngxf3");
      expect(suggestions).toContain("Ngxf4");
      expect(suggestions).toContain("Ngxf5");
      expect(suggestions).toContain("Ngxf6");
      expect(suggestions).toContain("Ngxf7");
      expect(suggestions).toContain("Ngxf8");
    });

    it("should suggest rook captures with disambiguation", () => {
      const suggestions = generateMoveSuggestions("Raxd");
      expect(suggestions).toHaveLength(8);
      expect(suggestions).toContain("Raxd1");
      expect(suggestions).toContain("Raxd8");
    });

    it("should suggest bishop captures with disambiguation", () => {
      const suggestions = generateMoveSuggestions("Bcxe");
      expect(suggestions).toHaveLength(8);
      expect(suggestions).toContain("Bcxe1");
      expect(suggestions).toContain("Bcxe8");
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
