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

// アンパッサン: exd6 (ランク6または3のみ有効だが、型レベルでは制限しない)
export type EnPassant = `${File}x${File}${3 | 6}${CheckSuffix}`;

// 駒の通常手 - 曖昧性排除パターンを正確に定義
export type PieceMove =
  | `${PieceSymbol}${File}${Rank}${CheckSuffix}` // Nf3 (基本形)
  | `${PieceSymbol}${File}${File}${Rank}${CheckSuffix}` // Nbd2 (ファイルで区別)
  | `${PieceSymbol}${Rank}${File}${Rank}${CheckSuffix}` // N1d2 (ランクで区別)
  | `${PieceSymbol}${File}${Rank}${File}${Rank}${CheckSuffix}`; // Nb1d2 (完全指定)

// 駒のキャプチャ - 曖昧性排除パターンを正確に定義
export type PieceCapture =
  | `${PieceSymbol}x${File}${Rank}${CheckSuffix}` // Nxe5 (基本形)
  | `${PieceSymbol}${File}x${File}${Rank}${CheckSuffix}` // Nfxe5 (ファイルで区別)
  | `${PieceSymbol}${Rank}x${File}${Rank}${CheckSuffix}` // N1xe5 (ランクで区別)
  | `${PieceSymbol}${File}${Rank}x${File}${Rank}${CheckSuffix}`; // Nb1xe5 (完全指定)

export type AlgebraicNotation =
  | CastlingMove
  | PawnMove
  | PawnCapture
  | EnPassant
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
