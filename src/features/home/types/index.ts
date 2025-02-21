export interface Game {
  id: string;
  createdAt: string;
  result?: 'win' | 'loss' | 'draw';
  moves: string[];
}
