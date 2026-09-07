import React, { useEffect } from 'react';
import { GameMode } from '../types';
import { soundManager } from '../utils/audio';
import { RefreshCw, Home, ArrowRight, Award } from 'lucide-react';
import { TrophyVector, StarVector } from './illustrations/VectorGraphics';
import confetti from 'canvas-confetti';

interface ResultsScreenProps {
  score: number;
  total: number;
  mode: GameMode;
  table: number;
  onPlayAgain: () => void;
  onChooseTable: () => void;
  onGoHome: () => void;
  onOpenBadges: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  score,
  total,
  table,
  onPlayAgain,
  onChooseTable,
  onGoHome,
  onOpenBadges,
}) => {
  useEffect(() => {
    soundManager.playVictory();
    try {
      confetti({
        particleCount: 75,
        spread: 100,
        origin: { y: 0.5 },
      });
    } catch {}
  }, []);

  const percentage = (score / total) * 100;
  let stars = 1;
  let headline = 'Great Effort!';
  const factName = `${table}× Times Table`;
  let subtitle = `Keep practicing to master the ${factName}!`;

  if (percentage === 100) {
    stars = 3;
    headline = 'Multiplication Champion!';
    subtitle = `You scored a PERFECT 10/10 on the ${factName}!`;
  } else if (percentage >= 70) {
    stars = 2;
    headline = 'Wonderful Work!';
    subtitle = `You really know your ${factName}!`;
  }

  return (
    <div className="min-h-screen min-h-[100dvh] w-full flex flex-col items-center justify-center p-3 sm:p-4 safe-phone-padding overflow-y-auto overflow-x-hidden bg-gradient-to-b from-sky-100 via-amber-50 to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 select-none">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 border-3 sm:border-4 border-amber-400 dark:border-slate-700 shadow-xl text-center flex flex-col items-center animate-scaleUp my-auto">
        {/* Vector Trophy */}
        <div className="relative mb-1">
          <TrophyVector size={72} className="animate-bounce" />
        </div>

        {/* Stars Earned */}
        <div className="flex items-center justify-center gap-1.5 my-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className={`transform transition-all duration-500 ${
                i < stars ? 'scale-110 rotate-0' : 'opacity-30 scale-90 -rotate-12'
              }`}
            >
              <StarVector size={36} fill={i < stars ? '#f59e0b' : '#94a3b8'} />
            </div>
          ))}
        </div>

        {/* Headline */}
        <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white font-['Fredoka',sans-serif] mt-1">
          {headline}
        </h2>
        <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
          {subtitle}
        </p>

        {/* Score Pill */}
        <div className="flex items-center gap-2 bg-amber-100 dark:bg-slate-800 px-4 py-1.5 rounded-2xl border-2 border-amber-300 dark:border-slate-700 my-1">
          <span className="text-xs font-black text-amber-900 dark:text-amber-300">SCORE:</span>
          <span className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white font-['Fredoka',sans-serif]">
            {score} / {total}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 w-full mt-3">
          <button
            onClick={() => {
              soundManager.playTap();
              onPlayAgain();
            }}
            className="py-2.5 px-3 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-white font-black text-xs sm:text-sm rounded-xl shadow-xs border-2 border-emerald-600 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Play Again</span>
          </button>

          <button
            onClick={() => {
              soundManager.playTap();
              onChooseTable();
            }}
            className="py-2.5 px-3 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-black text-xs sm:text-sm rounded-xl shadow-xs border-2 border-indigo-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>Choose Table</span>
          </button>

          <button
            onClick={() => {
              soundManager.playTap();
              onOpenBadges();
            }}
            className="py-2 px-3 bg-amber-400 hover:bg-amber-300 active:scale-95 text-amber-950 font-black text-xs rounded-xl shadow-xs border-2 border-amber-500 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Award className="w-3.5 h-3.5" />
            <span>My Badges</span>
          </button>

          <button
            onClick={() => {
              soundManager.playTap();
              onGoHome();
            }}
            className="py-2 px-3 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-900 dark:text-slate-200 active:scale-95 font-black text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};
