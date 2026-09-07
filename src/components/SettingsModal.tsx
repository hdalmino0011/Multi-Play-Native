import React from 'react';
import { soundManager } from '../utils/audio';
import { X, Volume2, VolumeX, Moon, Sun, Settings } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  soundMuted: boolean;
  onToggleMute: () => void;
  volume: number;
  onChangeVolume: (vol: number) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  soundMuted,
  onToggleMute,
  volume,
  onChangeVolume,
  darkMode,
  onToggleDarkMode,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 md:p-4 animate-fadeIn">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-5 md:p-7 border-4 border-amber-300 dark:border-slate-700 shadow-2xl flex flex-col items-center text-center animate-scaleUp max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playTap();
            onClose();
          }}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-300 flex items-center justify-center hover:scale-105 active:scale-95 transition-all border-2 border-rose-300 dark:border-rose-700 cursor-pointer"
          title="Close Settings"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 rounded-3xl bg-amber-100 dark:bg-slate-800 flex items-center justify-center mb-2 border-2 border-amber-300 dark:border-slate-600 text-amber-700 dark:text-amber-400 shadow-xs">
          <Settings className="w-7 h-7" />
        </div>
        <h3 className="text-2xl md:text-3xl font-black text-slate-950 dark:text-white font-['Fredoka',sans-serif] mb-0.5">
          Game Settings
        </h3>
        <p className="text-xs md:text-sm font-black text-slate-700 dark:text-slate-300 mb-5">
          Adjust volume, audio effects, and screen mode
        </p>

        {/* Volume Slider Control */}
        <div className="w-full bg-amber-50 dark:bg-slate-800 p-3.5 rounded-2xl border-2 border-amber-200 dark:border-slate-700 mb-3 flex flex-col items-center">
          <div className="flex items-center justify-between w-full text-xs font-black text-slate-900 dark:text-slate-200 mb-2">
            <span>Audio Volume</span>
            <span className="text-amber-700 dark:text-amber-400">{Math.round(volume * 100)}%</span>
          </div>

          <div className="flex items-center gap-3 w-full">
            <VolumeX className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => onChangeVolume(parseFloat(e.target.value))}
              className="flex-1 accent-emerald-500 cursor-pointer h-2 bg-slate-300 dark:bg-slate-700 rounded-lg"
            />
            <Volume2 className="w-4 h-4 text-emerald-600" />
          </div>
        </div>

        {/* Sound FX & Music Toggle */}
        <div className="w-full mb-3">
          <button
            onClick={() => {
              soundManager.playTap();
              onToggleMute();
            }}
            className={`w-full py-3 px-4 rounded-2xl font-black text-sm md:text-base transition-all flex items-center justify-center gap-2 border-2 cursor-pointer ${
              soundMuted
                ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-200 border-slate-300 dark:border-slate-700'
                : 'bg-emerald-500 hover:bg-emerald-400 text-white border-emerald-600 shadow-md'
            }`}
          >
            {soundMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            <span>{soundMuted ? 'Sounds & Music Off' : 'Sounds & Music On'}</span>
          </button>
        </div>

        {/* Day / Night Mode Toggle */}
        <div className="w-full mb-4">
          <button
            onClick={() => {
              soundManager.playTap();
              onToggleDarkMode();
            }}
            className={`w-full py-3 px-4 rounded-2xl font-black text-sm md:text-base border-2 transition-all flex items-center justify-center gap-2 cursor-pointer ${
              darkMode
                ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 border-amber-500 shadow-md'
                : 'bg-indigo-900 hover:bg-indigo-800 text-white border-indigo-950 shadow-md'
            }`}
          >
            {darkMode ? <Sun className="w-5 h-5 text-slate-950" /> : <Moon className="w-5 h-5 text-amber-300" />}
            <span>{darkMode ? 'Switch to Bright Day Mode' : 'Switch to Cozy Night Mode'}</span>
          </button>
        </div>

        {/* Credits */}
        <div className="w-full pt-3 border-t-2 border-dashed border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs flex flex-col items-center gap-0.5">
          <span className="uppercase tracking-widest text-[10px] font-black text-slate-500 dark:text-slate-400">
            Original Game Creators
          </span>
          <strong className="text-slate-950 dark:text-white font-black text-xs">Steve Niño I. Larino</strong>
          <strong className="text-slate-950 dark:text-white font-black text-xs">Hanz Dee L. Dalmino</strong>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 font-bold">Multi Play! Times Tables Adventure • Version 50</span>
        </div>
      </div>
    </div>
  );
};
