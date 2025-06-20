export const ALL_FILES = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;
export type File = (typeof ALL_FILES)[number];

export const ALL_RANKS = [1, 2, 3, 4, 5, 6, 7, 8] as const;
export type Rank = (typeof ALL_RANKS)[number];

export const PIECES = ["K", "Q", "R", "B", "N"] as const;
export type PieceSymbol = (typeof PIECES)[number];

// 昇格
export type Promotion = `=${"Q" | "R" | "B" | "N"}`;
// チェック/メイト
export type CheckSuffix = "" | "+" | "#";

export type CastlingMove = "O-O" | "O-O-O";
// ポーンの通常手: e4, e8=Q, e8=Q+, e8=Q#
export type PawnMove = `${File}${Rank}${Promotion | ""}${CheckSuffix}`;
// ポーンのキャプチャ: exd5, exd8=Q, exd8=Q+, exd8=Q#
export type PawnCapture =
  `${File}x${File}${Rank}${Promotion | ""}${CheckSuffix}`;
// 駒の通常手: Nf3, Nbd2, Rhe8, Nf3+, Nf3#
export type PieceMove =
  `${PieceSymbol}${File | ""}${Rank | ""}${File}${Rank}${CheckSuffix}`;
// 駒のキャプチャ: Nxe5, Nfxe5, N1xe5, Nxe5+, Nxe5#
export type PieceCapture =
  `${PieceSymbol}${File | ""}${Rank | ""}x${File}${Rank}${CheckSuffix}`;

export type AlgebraicNotation =
  | CastlingMove
  | PawnMove
  | PawnCapture
  | PieceMove
  | PieceCapture;

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

export type GameStatus = "in_progress" | "win" | "loss" | "draw";
export type Game = {
  id: string;
  date: string;
  moves: AlgebraicNotation[];
  playerColor: Side;
  skillLevel: SkillLevel;
  status: GameStatus;
};

export type UciMove = `${string}${number}${string}${number}`;
export type Fen = string;
