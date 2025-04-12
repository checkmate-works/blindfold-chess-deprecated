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

export const SKILL_LEVEL_OPTIONS = [
  { label: "Beginner", value: 0 },
  { label: "Easy", value: 5 },
  { label: "Intermediate", value: 10 },
  { label: "Advanced", value: 15 },
  { label: "Expert", value: 20 },
] as const;

export type SkillLevel = (typeof SKILL_LEVEL_OPTIONS)[number]["value"];
export type GameSettings = {
  // TODO: Rename to playerSide
  color: Side;
  skillLevel: SkillLevel;
};

type GameResult = "win" | "loss" | "draw";
export type Game = {
  id: string;
  date: string;
  moves: AlgebraicNotation[];
  playerColor: Side;
  skillLevel: SkillLevel;
  result?: GameResult;
};

export type UciMove = `${string}${number}${string}${number}`;
export type Fen = string;
