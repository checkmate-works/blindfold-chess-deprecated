export const ALL_FILES = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;
export type File = (typeof ALL_FILES)[number];

export const ALL_RANKS = [1, 2, 3, 4, 5, 6, 7, 8] as const;
export type Rank = (typeof ALL_RANKS)[number];

export const PIECES = ["K", "Q", "R", "B", "N"] as const;
export type PieceSymbol = (typeof PIECES)[number];

type PawnMove = `${File}${Rank}`;
type PieceMove = `${PieceSymbol}${File}${Rank}`;
type CastlingMove = "O-O" | "O-O-O";

type PawnCapture = `${File}x${File}${Rank}`;
type PieceCapture = `${PieceSymbol}x${File}${Rank}`;

type DisambiguatedMove = `${PieceSymbol}${File | Rank}${File}${Rank}`;

type CheckSuffix = "" | "+" | "#";

export type AlgebraicNotation =
  | PawnMove
  | PieceMove
  | CastlingMove
  | PawnCapture
  | PieceCapture
  | DisambiguatedMove
  | `${PawnMove}${CheckSuffix}`
  | `${PieceMove}${CheckSuffix}`
  | `${PawnCapture}${CheckSuffix}`
  | `${PieceCapture}${CheckSuffix}`
  | `${DisambiguatedMove}${CheckSuffix}`;

export type Side = "white" | "black";
export type PlayerColor = Side | "random";

export type GameSettings = {
  // TODO: Rename to playerSide
  color: Side;
  skillLevel: number;
};

export const SKILL_LEVELS = {
  BEGINNER: 0,
  INTERMEDIATE: 10,
  EXPERT: 20,
} as const;

type GameResult = "win" | "loss" | "draw";
export type Game = {
  id: string;
  date: string;
  moves: AlgebraicNotation[];
  playerColor: Side;
  result?: GameResult;
};

export type UciMove = `${string}${number}${string}${number}`;
export type Fen = string;
