import React from 'react';
import { GameMode } from '../types';
import { soundManager } from '../utils/audio';
import { ArrowLeft, Sparkles, Shuffle } from 'lucide-react';
import {
  FishVector,
  ButterflyVector,
  BalloonVector,
  AppleVector,
  RocketVector,
  QuizCardsVector,
  BookVector,
  StarVector,
  CardsMatchVector,
  CloudVector,
} from './illustrations/VectorGraphics';

interface TableSelectScreenProps {
  mode: GameMode;
  onSelectTable: (table: number) => void;
  onBackToHome: () => void;
  tableMastery: Record<string, number>;
}

const ALL_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const MODE_CONFIG: Record<
  GameMode,
  { title: string; desc: string; renderIcon: () => React.ReactNode }
> = {
  fish: {
    title: 'Catch a Fish',
    desc: 'Select a times table for your fishing math adventure!',
    renderIcon: () => <FishVector size={30} variant={0} />,
  },
  butterfly: {
    title: 'Butterfly Catch',
    desc: 'Select a times table for your butterfly garden adventure!',
    renderIcon: () => <ButterflyVector size={30} variant={0} />,
  },
  balloon: {
    title: 'Pop Balloon',
    desc: 'Select a times table for the balloon carnival!',
    renderIcon: () => <BalloonVector size={28} variant={0} />,
  },
  harvest: {
    title: 'Fruit Harvest',
    desc: 'Select a times table to fill your apple harvest basket!',
    renderIcon: () => <AppleVector size={30} />,
  },
  rocket: {
    title: 'Rocket Blast',
    desc: 'Select a times table to power your rocket to space!',
    renderIcon: () => <RocketVector size={30} />,
  },
  quiz: {
    title: 'Speed Quiz',
    desc: 'Select a times table to challenge your multiplication speed!',
    renderIcon: () => <QuizCardsVector size={30} />,
  },
  match: {
    title: 'Memory Match',
    desc: 'Select a times table to match multiplication cards!',
    renderIcon: () => <CardsMatchVector size={30} />,
  },
  memorize: {
    title: 'Fact Tables',
    desc: 'Select a times table to read, listen, and practice facts!',
    renderIcon: () => <BookVector size={30} />,
  },
};

export const TableSelectScreen: React.FC<TableSelectScreenProps> = ({
  mode,
  onSelectTable,
  onBackToHome,
  tableMastery,
}) => {
  const currentInfo = MODE_CONFIG[mode] || {
    title: 'Multiplication Play',
    desc: 'Pick a times table',
    renderIcon: () => <StarVector size={28} />,
  };

  const handleTablePick = (n: number) => {
    soundManager.playStartGame();
    onSelectTable(n);
  };

  const handleRandomPick = () => {
    soundManager.playStartGame();
    const randomNum = Math.floor(Math.random() * 12) + 1;
    onSelectTable(randomNum);
  };

  // Color theme generator for each number card
  const getCardTheme = (num: number) => {
    if (num <= 4) {
      return {
        bg: 'from-emerald-50 to-teal-50 dark:from-slate-800 dark:to-slate-800',
        badge: 'bg-emerald-500 text-white',
        border: 'border-emerald-300 dark:border-emerald-700/60',
        hover: 'hover:border-emerald-500 hover:shadow-md',
      };
    } else if (num <= 8) {
      return {
        bg: 'from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-800',
        badge: 'bg-amber-500 text-white',
        border: 'border-amber-300 dark:border-amber-700/60',
        hover: 'hover:border-amber-500 hover:shadow-md',
      };
    } else {
      return {
        bg: 'from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-800',
        badge: 'bg-purple-600 text-white',
        border: 'border-purple-300 dark:border-purple-700/60',
        hover: 'hover:border-purple-500 hover:shadow-md',
      };
    }
  };

  return (
    <div className="relative min-h-screen min-h-[100dvh] w-full flex flex-col p-2 sm:p-3 safe-phone-padding overflow-y-auto overflow-x-hidden bg-gradient-to-b from-sky-100 via-sky-50 to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 select-none">
      {/* Background Ambient Clouds and Night Mode Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-2 left-6 opacity-60 dark:opacity-25">
          <CloudVector size={50} />
        </div>
        <div className="absolute top-8 right-8 opacity-50 dark:opacity-20">
          <CloudVector size={42} />
        </div>
        {/* Night Stars */}
        <div className="hidden dark:block absolute inset-0">
          <div className="absolute top-4 left-1/5 animate-pulse"><StarVector size={14} fill="#fde047" /></div>
          <div className="absolute top-10 left-3/4 animate-pulse delay-500"><StarVector size={16} fill="#fef08a" /></div>
          <div className="absolute top-5 right-1/4 animate-pulse delay-700"><StarVector size={12} fill="#a5f3fc" /></div>
          <div className="absolute top-18 right-8 animate-ping delay-400"><div className="w-1.5 h-1.5 bg-yellow-200 rounded-full shadow-[0_0_6px_#fde047]"></div></div>
          <div className="absolute top-22 left-10 animate-pulse delay-300"><StarVector size={13} fill="#fde047" /></div>
        </div>
      </div>

      {/* Top Header */}
      <header className="relative z-10 w-full max-w-5xl mx-auto flex items-center justify-between pb-1 border-b border-slate-300 dark:border-slate-800 shrink-0">
        <button
          onClick={() => {
            soundManager.playTap();
            onBackToHome();
          }}
          className="p-1.5 sm:p-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl shadow-xs border-2 border-slate-300 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 font-black text-xs cursor-pointer"
          title="Back to Game Selection"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="shrink-0">{currentInfo.renderIcon()}</div>
          <span className="text-xs sm:text-sm font-black text-slate-950 dark:text-amber-300">
            {currentInfo.title} • <span className="text-pink-600 dark:text-pink-400">Multiplication (×)</span>
          </span>
        </div>

        <button
          onClick={handleRandomPick}
          className="px-2.5 py-1.5 bg-amber-400 hover:bg-amber-300 active:scale-95 text-amber-950 rounded-xl shadow-xs border-2 border-amber-500 font-black text-xs flex items-center gap-1 cursor-pointer transition-all"
          title="Pick Random Table"
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Random</span>
        </button>
      </header>

      {/* Main Number Board */}
      <main className="flex-1 w-full max-w-5xl mx-auto flex flex-col items-center justify-between py-2 overflow-hidden min-h-0">
        {/* Title */}
        <div className="text-center shrink-0 mb-1">
          <h2 className="text-sm sm:text-base font-black text-slate-950 dark:text-slate-100 font-['Fredoka',sans-serif]">
            Choose a Times Table to Practice (1× to 12×)
          </h2>
          <p className="text-[10px] sm:text-xs font-extrabold text-slate-700 dark:text-slate-300">
            {currentInfo.desc}
          </p>
        </div>

        {/* 12-Number Unified Grid (6 cols on landscape/desktop, 4 on medium, 3 on small) */}
        <div className="w-full max-w-4xl grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 my-auto">
          {ALL_NUMBERS.map((num) => {
            const masteryCount = tableMastery[num] || 0;
            const theme = getCardTheme(num);

            return (
              <button
                key={num}
                onClick={() => handleTablePick(num)}
                className={`group relative flex items-center justify-between p-2 bg-gradient-to-r ${theme.bg} rounded-xl border-2 ${theme.border} ${theme.hover} shadow-xs hover:scale-102 active:scale-95 transition-all text-left cursor-pointer`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg ${theme.badge} font-black text-xs sm:text-sm flex items-center justify-center shadow-xs shrink-0 group-hover:scale-110 transition-transform`}>
                    {num}
                  </div>
                  <span className="font-black text-slate-950 dark:text-white text-xs sm:text-sm truncate">
                    {num}× Table
                  </span>
                </div>

                {masteryCount > 0 && (
                  <div className="flex items-center gap-0.5 text-amber-900 dark:text-amber-300 text-[10px] font-black bg-amber-200 dark:bg-slate-900 px-1.5 py-0.5 rounded-full shrink-0">
                    <StarVector size={11} fill="#f59e0b" />
                    <span>{masteryCount}</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Quick Footer Prompt */}
        <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-xs font-bold text-slate-700 dark:text-slate-300 shrink-0 mt-1">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>Tap any times table from 1× to 12× to start playing!</span>
        </div>
      </main>
    </div>
  );
};
