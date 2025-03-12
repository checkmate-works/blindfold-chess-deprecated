export const ALL_FILES = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;
export type File = (typeof ALL_FILES)[number];

export const ALL_RANKS = [1, 2, 3, 4, 5, 6, 7, 8] as const;
export type Rank = (typeof ALL_RANKS)[number];

export const PIECES = ["K", "Q", "R", "B", "N"] as const;
export type PieceSymbol = (typeof PIECES)[number];

export type PawnMove = `${File}${Rank}`;
export type PieceMove = `${PieceSymbol}${File}${Rank}`;
export type CastlingMove = "O-O" | "O-O-O";

export type AlgebraicNotation = PawnMove | PieceMove | CastlingMove;

export type PlayerColor = "white" | "black" | "random";

export type GameSettings = {
  color: PlayerColor;
  skillLevel: number;
};

export const SKILL_LEVELS = {
  BEGINNER: 0,
  INTERMEDIATE: 10,
  EXPERT: 20,
} as const;

export type Game = {
  id: string;
  createdAt: string;
  result?: "win" | "loss" | "draw";
  moves: string[];
};

export type UciMove = `${string}${number}${string}${number}`;
export type Fen = string;
