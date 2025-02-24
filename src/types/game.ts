export type PlayerColor = "white" | "black";

export interface GameSettings {
  color: PlayerColor;
  skillLevel: number;
}

// Predefined skill levels for better UX
export const SKILL_LEVELS = {
  BEGINNER: 0,
  INTERMEDIATE: 10,
  EXPERT: 20,
} as const;
