import React from 'react';
import { soundManager } from '../utils/audio';
import { X, Lock, Check } from 'lucide-react';
import {
  FishVector,
  ButterflyVector,
  BalloonVector,
  AppleVector,
  RocketVector,
  TrophyVector,
  BookVector,
  StarVector,
  CardsMatchVector,
} from './illustrations/VectorGraphics';

interface StickerItem {
  id: string;
  title: string;
  description: string;
  renderGraphic: () => React.ReactNode;
}

const ALL_STICKERS: StickerItem[] = [
  {
    id: 'first_play',
    title: 'First Cast',
    description: 'Played your very first game of Multi Play!',
    renderGraphic: () => <FishVector size={36} variant={1} />,
  },
  {
    id: 'perfect_10',
    title: 'Superstar 10/10',
    description: 'Score a perfect 10/10 on any times table',
    renderGraphic: () => <StarVector size={36} fill="#f59e0b" />,
  },
  {
    id: 'fish_master',
    title: 'Master Angler',
    description: 'Catch 10 fish correctly in Fish Catch mode',
    renderGraphic: () => <FishVector size={36} variant={0} />,
  },
  {
    id: 'butterfly_hero',
    title: 'Butterfly Whisperer',
    description: 'Net 10 butterflies in Butterfly Catch mode',
    renderGraphic: () => <ButterflyVector size={36} variant={0} />,
  },
  {
    id: 'balloon_sniper',
    title: 'Balloon Sharp Shooter',
    description: 'Pop 10 balloons in Pop the Balloon mode',
    renderGraphic: () => <BalloonVector size={32} variant={0} />,
  },
  {
    id: 'apple_harvester',
    title: 'Golden Orchard',
    description: 'Harvest 10 apples into the picnic basket',
    renderGraphic: () => <AppleVector size={36} />,
  },
  {
    id: 'quiz_champion',
    title: 'Quiz Champion',
    description: 'Pass the speed Math Quiz',
    renderGraphic: () => <TrophyVector size={36} />,
  },
  {
    id: 'rocket_astronaut',
    title: 'Cosmic Navigator',
    description: 'Blast into space with Rocket Blast mode',
    renderGraphic: () => <RocketVector size={36} />,
  },
  {
    id: 'match_wizard',
    title: 'Match Wizard',
    description: 'Match equation pairs in Memory Match mode',
    renderGraphic: () => <CardsMatchVector size={36} />,
  },
  {
    id: 'memorize_scholar',
    title: 'Math Scholar',
    description: 'Complete full practice in Memorize Mode',
    renderGraphic: () => <BookVector size={36} />,
  },
];

interface BadgesModalProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedStickerIds: string[];
}

export const BadgesModal: React.FC<BadgesModalProps> = ({
  isOpen,
  onClose,
  unlockedStickerIds,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border-4 border-amber-300 dark:border-slate-700 shadow-2xl flex flex-col items-center text-center animate-scaleUp max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playTap();
            onClose();
          }}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-300 flex items-center justify-center hover:scale-105 active:scale-95 transition-all border-2 border-rose-300 dark:border-rose-700 cursor-pointer"
          title="Close Badges"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-2">
          <StarVector size={44} fill="#f59e0b" className="animate-bounce" />
        </div>
        <h3 className="text-2xl md:text-3xl font-black text-slate-950 dark:text-white font-['Fredoka',sans-serif] mb-1">
          My Sticker Book & Badges
        </h3>
        <p className="text-xs md:text-sm font-black text-slate-700 dark:text-slate-300 mb-6">
          Collect badges as you master each times table!
        </p>

        {/* Sticker Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
          {ALL_STICKERS.map((sticker) => {
            const isUnlocked = unlockedStickerIds.includes(sticker.id) || sticker.id === 'first_play';

            return (
              <div
                key={sticker.id}
                className={`p-3.5 rounded-2xl border-2 flex items-center gap-3 text-left transition-all ${
                  isUnlocked
                    ? 'bg-amber-50 dark:bg-slate-800 border-amber-300 dark:border-amber-600 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-950 border-slate-300 dark:border-slate-800 opacity-60'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner border-2 ${
                    isUnlocked
                      ? 'bg-amber-100 dark:bg-slate-700 border-amber-300 animate-bounce'
                      : 'bg-slate-200 dark:bg-slate-800 border-slate-300 text-slate-500'
                  }`}
                >
                  {isUnlocked ? sticker.renderGraphic() : <Lock className="w-5 h-5" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="font-black text-sm text-slate-950 dark:text-white truncate">
                    {sticker.title}
                  </div>
                  <div className="text-[11px] font-black text-slate-700 dark:text-slate-300 line-clamp-2 leading-tight">
                    {sticker.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => {
            soundManager.playTap();
            onClose();
          }}
          className="mt-6 w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-black text-base rounded-2xl shadow-md active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <span>Awesome!</span>
          <Check className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
