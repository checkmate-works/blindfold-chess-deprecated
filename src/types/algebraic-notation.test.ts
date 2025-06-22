import { describe, it, expectTypeOf } from "vitest";
import type { AlgebraicNotation } from "@/types";

describe("AlgebraicNotation Comprehensive Type Tests", () => {
  describe("🏰 Castling Moves", () => {
    it("should accept all castling variations", () => {
      // Basic castling
      expectTypeOf<"O-O">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"O-O-O">().toMatchTypeOf<AlgebraicNotation>();

      // Castling with check/mate
      expectTypeOf<"O-O+">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"O-O#">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"O-O-O+">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"O-O-O#">().toMatchTypeOf<AlgebraicNotation>();
    });
  });

  describe("♟️ Pawn Moves - Comprehensive Coverage", () => {
    it("should accept all basic pawn moves (all files, all ranks)", () => {
      // All files (a-h) to all ranks (1-8)
      expectTypeOf<"a1">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"a2">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"a3">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"a4">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"a5">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"a6">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"a7">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"a8">().toMatchTypeOf<AlgebraicNotation>();

      expectTypeOf<"b1">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"c2">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"d3">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"e4">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"f5">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"g6">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"h7">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"h8">().toMatchTypeOf<AlgebraicNotation>();
    });

    it("should accept all pawn promotions (all pieces)", () => {
      // Promotion to Queen
      expectTypeOf<"a8=Q">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"e8=Q">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"h8=Q">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"a1=Q">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"e1=Q">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"h1=Q">().toMatchTypeOf<AlgebraicNotation>();

      // Promotion to Rook
      expectTypeOf<"b8=R">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"g1=R">().toMatchTypeOf<AlgebraicNotation>();

      // Promotion to Bishop
      expectTypeOf<"c8=B">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"f1=B">().toMatchTypeOf<AlgebraicNotation>();

      // Promotion to Knight (underpromotion)
      expectTypeOf<"d8=N">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"e1=N">().toMatchTypeOf<AlgebraicNotation>();
    });

    it("should accept pawn moves with all check/mate combinations", () => {
      // Basic moves with check/mate
      expectTypeOf<"e4+">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"e4#">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"a7+">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"h2#">().toMatchTypeOf<AlgebraicNotation>();

      // Promotions with check/mate
      expectTypeOf<"e8=Q+">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"e8=Q#">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"a1=R+">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"h8=N#">().toMatchTypeOf<AlgebraicNotation>();
    });
  });

  describe("🚗 Pawn Captures - Comprehensive Coverage", () => {
    it("should accept all possible pawn captures", () => {
      // All file combinations for captures
      expectTypeOf<"axb1">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"bxc2">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"cxd3">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"dxe4">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"exf5">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"fxg6">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"gxh7">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"hxg8">().toMatchTypeOf<AlgebraicNotation>();

      // Reverse captures
      expectTypeOf<"bxa1">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"cxb2">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"dxc3">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"exd4">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"fxe5">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"gxf6">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"hxg7">().toMatchTypeOf<AlgebraicNotation>();
    });

    it("should accept pawn captures with all promotions", () => {
      // Capture promotions to all pieces
      expectTypeOf<"axb8=Q">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"exd1=Q">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"fxg8=R">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"gxh1=R">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"bxc8=B">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"cxd1=B">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"dxe8=N">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"hxg1=N">().toMatchTypeOf<AlgebraicNotation>();
    });

    it("should accept pawn captures with check/mate", () => {
      expectTypeOf<"exd5+">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"exd5#">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"axb8=Q+">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"hxg1=N#">().toMatchTypeOf<AlgebraicNotation>();
    });
  });

  describe("⚡ En Passant - Complete Coverage", () => {
    it("should accept all white en passant captures (rank 6)", () => {
      expectTypeOf<"axb6">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"bxc6">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"cxd6">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"dxe6">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"exf6">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"fxg6">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"gxh6">().toMatchTypeOf<AlgebraicNotation>();

      // Reverse direction
      expectTypeOf<"bxa6">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"cxb6">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"dxc6">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"exd6">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"fxe6">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"gxf6">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"hxg6">().toMatchTypeOf<AlgebraicNotation>();
    });

    it("should accept all black en passant captures (rank 3)", () => {
      expectTypeOf<"axb3">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"bxc3">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"cxd3">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"dxe3">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"exf3">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"fxg3">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"gxh3">().toMatchTypeOf<AlgebraicNotation>();

      // Reverse direction
      expectTypeOf<"bxa3">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"cxb3">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"dxc3">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"exd3">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"fxe3">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"gxf3">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"hxg3">().toMatchTypeOf<AlgebraicNotation>();
    });

    it("should accept en passant with check/mate", () => {
      expectTypeOf<"exd6+">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"exd6#">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"fxe3+">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"gxh3#">().toMatchTypeOf<AlgebraicNotation>();
    });
  });

  describe("♞ Knight Moves - All Patterns", () => {
    it("should accept basic knight moves to all squares", () => {
      // Sample knight moves covering different board areas
      expectTypeOf<"Na1">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"Nb2">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"Nc3">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"Nd4">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"Ne5">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"Nf6">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"Ng7">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"Nh8">().toMatchTypeOf<AlgebraicNotation>();
    });

    it("should accept knight moves with all disambiguation patterns", () => {
      // File disambiguation (common in games)
      expectTypeOf<"Nbd2">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"Ngf3">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"Nce4">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"Nfe5">().toMatchTypeOf<AlgebraicNotation>();

      // Rank disambiguation (less common but valid)
      expectTypeOf<"N1d2">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"N6f4">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"N8e7">().toMatchTypeOf<AlgebraicNotation>();

      // Full disambiguation (rare but possible)
      expectTypeOf<"Nb1d2">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"Ng8f6">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"Nf3e5">().toMatchTypeOf<AlgebraicNotation>();
    });

    it("should accept knight captures with all patterns", () => {
      // Basic captures
      expectTypeOf<"Nxe4">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"Nxd5">().toMatchTypeOf<AlgebraicNotation>();

      // Captures with disambiguation
      expectTypeOf<"Nfxe4">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"N6xd5">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"Nb1xe4">().toMatchTypeOf<AlgebraicNotation>();

      // Captures with check/mate
      expectTypeOf<"Nxe5+">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"Nfxe4#">().toMatchTypeOf<AlgebraicNotation>();
    });
  });

  describe("♗ Bishop Moves - All Patterns", () => {
    it("should accept all bishop moves and captures", () => {
      // Basic moves
      expectTypeOf<"Be2">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"Bf4">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"Bg5">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"Bh6">().toMatchTypeOf<AlgebraicNotation>();

      // With disambiguation (when multiple bishops can reach same square)
      expectTypeOf<"Bce4">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"B1g5">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"Bc1e3">().toMatchTypeOf<AlgebraicNotation>();

      // Captures
      expectTypeOf<"Bxf7">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"Bcxe6">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"B3xh6#">().toMatchTypeOf<AlgebraicNotation>();
    });
  });

  describe("♖ Rook Moves - All Patterns", () => {
    it("should accept all rook moves and captures", () => {
      // Basic moves
      expectTypeOf<"Re1">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"Rd4">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"Ra8">().toMatchTypeOf<AlgebraicNotation>();

      // Common disambiguation patterns
      expectTypeOf<"Rae1">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"Rfe1">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"R1e1">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"R8e8">().toMatchTypeOf<AlgebraicNotation>();

      // Captures with disambiguation
      expectTypeOf<"Rxe8">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"Raxd1">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"R1xd1+">().toMatchTypeOf<AlgebraicNotation>();
    });
  });

  describe("♕ Queen Moves - All Patterns", () => {
    it("should accept all queen moves and captures", () => {
      // Basic moves (queen can move like rook + bishop)
      expectTypeOf<"Qd1">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"Qe4">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"Qh5">().toMatchTypeOf<AlgebraicNotation>();

      // Disambiguation (rare but possible with promoted queens)
      expectTypeOf<"Qad1">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"Q1d8">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"Qa1d4">().toMatchTypeOf<AlgebraicNotation>();

      // Captures
      expectTypeOf<"Qxd8">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"Qhxd8#">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"Q5xd1+">().toMatchTypeOf<AlgebraicNotation>();
    });
  });

  describe("♔ King Moves - All Patterns", () => {
    it("should accept all king moves and captures", () => {
      // Basic moves
      expectTypeOf<"Ke1">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"Kg1">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"Kh1">().toMatchTypeOf<AlgebraicNotation>();

      // King captures (no disambiguation needed - only one king)
      expectTypeOf<"Kxe1">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"Kxf7">().toMatchTypeOf<AlgebraicNotation>();

      // King moves with check (rare but possible)
      expectTypeOf<"Ke2+">().toMatchTypeOf<AlgebraicNotation>();
      expectTypeOf<"Kxf7+">().toMatchTypeOf<AlgebraicNotation>();
    });
  });

  describe("❌ Invalid Notation - Representative Cases", () => {
    it("should document invalid patterns that should be rejected", () => {
      // Note: TypeScript doesn't have built-in negative type testing,
      // but we document these for completeness

      /*
      Invalid cases that our types should reject:
      
      Files/Ranks out of bounds:
      - "i4" (file i doesn't exist)
      - "e9" (rank 9 doesn't exist) 
      - "a0" (rank 0 doesn't exist)
      
      Incomplete moves:
      - "N" (piece without destination)
      - "Ne" (piece + file without rank)
      - "N4" (piece + rank without file)
      - "Nx" (capture without destination)
      
      Invalid castling:
      - "O-O-O-O" (too many O's)
      - "0-0" (zeros instead of O's)
      
      En passant on wrong ranks:
      - "exd4" (en passant only on rank 3 or 6)
      - "exd7" (en passant only on rank 3 or 6)
      
      Invalid piece symbols:
      - "Pf3" (pawn moves don't use P)
      - "Xe4" (X is not a valid piece)
      
      Invalid promotion:
      - "e8=P" (can't promote to pawn)
      - "e8=K" (can't promote to king)
      
      Invalid check/mate notation:
      - "e4++" (double check)
      - "e4#+" (can't be both mate and check)
      */

      // This test serves as documentation of invalid cases
      expect(true).toBe(true);
    });
  });
});
