import React from 'react';
import { GameMode } from '../types';
import { soundManager } from '../utils/audio';
import { Volume2, VolumeX, Settings, Award, ArrowLeft, Sparkles, ArrowRight } from 'lucide-react';
import {
  FishVector,
  ButterflyVector,
  BalloonVector,
  AppleVector,
  QuizCardsVector,
  BookVector,
  RocketVector,
  CardsMatchVector,
  StarVector,
  CloudVector,
} from './illustrations/VectorGraphics';

interface HomeScreenProps {
  onSelectMode: (mode: GameMode) => void;
  onBackToSplash: () => void;
  onOpenSettings: () => void;
  onOpenBadges: () => void;
  soundMuted: boolean;
  onToggleMute: () => void;
}

interface ModeCardInfo {
  id: GameMode;
  title: string;
  subtitle: string;
  color: string;
  borderColor: string;
  renderGraphic: () => React.ReactNode;
}

const MODES_DATA: ModeCardInfo[] = [
  {
    id: 'fish',
    title: 'Catch a Fish',
    subtitle: 'Hook correct fish',
    color: 'from-amber-400 to-amber-500',
    borderColor: 'border-amber-400 dark:border-amber-600',
    renderGraphic: () => <FishVector size={38} variant={1} />,
  },
  {
    id: 'butterfly',
    title: 'Butterfly Catch',
    subtitle: 'Net the butterfly',
    color: 'from-purple-500 to-indigo-500',
    borderColor: 'border-purple-400 dark:border-purple-600',
    renderGraphic: () => <ButterflyVector size={38} variant={0} />,
  },
  {
    id: 'balloon',
    title: 'Pop Balloon',
    subtitle: 'Aim dart and pop',
    color: 'from-emerald-400 to-green-500',
    borderColor: 'border-emerald-400 dark:border-emerald-600',
    renderGraphic: () => <BalloonVector size={34} variant={0} />,
  },
  {
    id: 'harvest',
    title: 'Fruit Harvest',
    subtitle: 'Pick ripe apples',
    color: 'from-rose-500 to-red-500',
    borderColor: 'border-rose-400 dark:border-rose-600',
    renderGraphic: () => <AppleVector size={36} />,
  },
  {
    id: 'rocket',
    title: 'Rocket Blast',
    subtitle: 'Launch into space',
    color: 'from-cyan-500 to-blue-600',
    borderColor: 'border-cyan-400 dark:border-cyan-600',
    renderGraphic: () => <RocketVector size={36} />,
  },
  {
    id: 'match',
    title: 'Memory Match',
    subtitle: 'Pair times cards',
    color: 'from-indigo-500 to-violet-600',
    borderColor: 'border-indigo-400 dark:border-indigo-600',
    renderGraphic: () => <CardsMatchVector size={36} />,
  },
  {
    id: 'quiz',
    title: 'Speed Quiz',
    subtitle: 'Fast quiz showdown',
    color: 'from-pink-500 to-rose-500',
    borderColor: 'border-pink-400 dark:border-pink-600',
    renderGraphic: () => <QuizCardsVector size={36} />,
  },
  {
    id: 'memorize',
    title: 'Fact Tables',
    subtitle: 'Read, listen & chant',
    color: 'from-amber-500 to-yellow-500',
    borderColor: 'border-yellow-400 dark:border-yellow-600',
    renderGraphic: () => <BookVector size={36} />,
  },
];

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectMode,
  onBackToSplash,
  onOpenSettings,
  onOpenBadges,
  soundMuted,
  onToggleMute,
}) => {
  const handleModeClick = (mode: GameMode) => {
    soundManager.playTap();
    onSelectMode(mode);
  };

  return (
    <div className="relative min-h-screen min-h-[100dvh] w-full flex flex-col justify-between p-2 sm:p-3 safe-phone-padding overflow-y-auto overflow-x-hidden bg-gradient-to-b from-sky-100 via-sky-50 to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 select-none">
      {/* Background Clouds and Night Mode Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-2 left-6 opacity-60 dark:opacity-25">
          <CloudVector size={50} />
        </div>
        <div className="absolute top-8 right-8 opacity-50 dark:opacity-20">
          <CloudVector size={42} />
        </div>
        {/* Night Stars */}
        <div className="hidden dark:block absolute inset-0">
          <div className="absolute top-4 left-1/4 animate-pulse"><StarVector size={14} fill="#fde047" /></div>
          <div className="absolute top-12 left-2/3 animate-pulse delay-500"><StarVector size={16} fill="#fef08a" /></div>
          <div className="absolute top-6 right-1/4 animate-pulse delay-700"><StarVector size={12} fill="#a5f3fc" /></div>
          <div className="absolute top-20 right-10 animate-ping delay-300"><div className="w-1.5 h-1.5 bg-yellow-200 rounded-full shadow-[0_0_6px_#fde047]"></div></div>
          <div className="absolute top-24 left-12 animate-pulse delay-200"><StarVector size={13} fill="#fde047" /></div>
        </div>
      </div>

      {/* Top Navigation Bar */}
      <header className="relative z-10 w-full max-w-5xl mx-auto flex items-center justify-between pb-1 border-b border-slate-300 dark:border-slate-800 shrink-0">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => {
              soundManager.playTap();
              onBackToSplash();
            }}
            className="p-1.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl shadow-xs border-2 border-slate-300 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 font-black text-xs cursor-pointer"
            title="Back to Welcome Screen"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>
          <div className="flex items-center gap-1.5 ml-1">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white font-black text-sm flex items-center justify-center border-2 border-white shadow-xs">
              ×
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-black text-slate-950 dark:text-amber-300 font-['Fredoka',sans-serif] leading-tight">
                Multi Play!
              </span>
              <span className="text-[9px] font-extrabold text-emerald-700 dark:text-emerald-400">
                Times Tables Adventure (1× to 12×)
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => {
              soundManager.playTap();
              onToggleMute();
            }}
            className={`p-1.5 rounded-xl shadow-xs border-2 transition-all hover:scale-105 active:scale-95 cursor-pointer ${
              soundMuted
                ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600'
                : 'bg-emerald-500 text-white border-emerald-600'
            }`}
            title={soundMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {soundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              soundManager.playTap();
              onOpenBadges();
            }}
            className="p-1.5 bg-white dark:bg-slate-800 text-amber-700 dark:text-amber-400 rounded-xl shadow-xs border-2 border-amber-300 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="Badges"
          >
            <Award className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              soundManager.playTap();
              onOpenSettings();
            }}
            className="p-1.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl shadow-xs border-2 border-slate-300 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Subheader Banner */}
      <div className="w-full max-w-5xl mx-auto flex items-center justify-center gap-2 py-1 shrink-0">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-emerald-300/70 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-extrabold text-[11px] sm:text-xs shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Pick a Multiplication Game or Practice Table!</span>
        </div>
      </div>

      {/* Symmetrical 4x2 Grid (8 Cards) - Fits comfortably and scrolls if needed */}
      <main className="flex-1 w-full max-w-5xl mx-auto flex flex-col justify-center py-1 overflow-hidden min-h-0">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 w-full items-stretch">
          {MODES_DATA.map((mode) => (
            <button
              key={mode.id}
              onClick={() => handleModeClick(mode.id)}
              className={`group relative flex flex-col items-center justify-between p-2 sm:p-2.5 bg-white dark:bg-slate-800 rounded-2xl border-2 ${mode.borderColor} shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all text-center cursor-pointer overflow-hidden min-h-[105px] sm:min-h-[115px]`}
            >
              {/* Card top decorative color accent */}
              <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${mode.color}`}></div>

              {/* Graphic Icon */}
              <div className="mt-1 transform group-hover:scale-105 transition-transform duration-200 shrink-0">
                {mode.renderGraphic()}
              </div>

              {/* Text Label & Subtitle */}
              <div className="my-auto px-1 min-w-0 w-full">
                <h3 className="text-xs sm:text-sm font-black text-slate-950 dark:text-slate-100 leading-tight truncate">
                  {mode.title}
                </h3>
                <p className="text-[10px] font-bold text-slate-600 dark:text-slate-400 leading-tight truncate mt-0.5">
                  {mode.subtitle}
                </p>
              </div>

              {/* Play Pill */}
              <div className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 font-black text-[10px] group-hover:bg-amber-400 group-hover:text-amber-950 transition-colors shrink-0 flex items-center gap-1">
                <span>Play</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </div>
            </button>
          ))}
        </div>
      </main>

      {/* Footer hint */}
      <footer className="w-full max-w-4xl mx-auto text-center py-0.5 shrink-0">
        <p className="text-[10px] font-bold text-slate-600 dark:text-slate-400">
          Master 1× to 12× Multiplication Tables with Fun Visual Mini-Games
        </p>
      </footer>
    </div>
  );
};
