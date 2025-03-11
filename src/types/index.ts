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
