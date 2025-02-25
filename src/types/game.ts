export type PlayerColor = "white" | "black";

export interface GameSettings {
  color: PlayerColor;
  skillLevel: number;
}

export const SKILL_LEVELS = {
  BEGINNER: 0,
  INTERMEDIATE: 10,
  EXPERT: 20,
} as const;
