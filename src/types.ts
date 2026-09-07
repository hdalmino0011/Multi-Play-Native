export type GameMode =
  | 'fish'
  | 'butterfly'
  | 'quiz'
  | 'balloon'
  | 'harvest'
  | 'rocket'
  | 'match'
  | 'memorize';

export type MathOperation = 'multiply';

export interface Question {
  num1: number;
  num2: number;
  operation: MathOperation;
  symbol: string;
  answer: number;
  options: number[];
  table: number;
  multiplier: number;
}

export interface GameSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  volume: number; // 0 to 1
  darkMode: boolean;
  speechEnabled: boolean;
}

export interface GameStats {
  gamesPlayed: number;
  totalCorrect: number;
  bestStreak: number;
  tableMastery: Record<string, number>;
  unlockedStickers: string[];
}

export interface Sticker {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}
