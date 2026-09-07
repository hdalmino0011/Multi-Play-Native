import React from 'react';
import { Play, Sparkles, Settings as SettingsIcon, Award } from 'lucide-react';
import { soundManager } from '../utils/audio';
import {
  SunVector,
  MoonVector,
  CloudVector,
  StarVector,
  FishVector,
  ButterflyVector,
  BalloonVector,
  AppleVector,
} from './illustrations/VectorGraphics';

interface SplashScreenProps {
  onStart: () => void;
  onOpenSettings: () => void;
  onOpenBadges: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onStart,
  onOpenSettings,
  onOpenBadges,
}) => {
  const handlePlayClick = () => {
    soundManager.unlockAudio();
    soundManager.playStartGame();
    try {
      const orientation = screen.orientation as unknown as { lock?: (mode: string) => Promise<void> };
      if (orientation && typeof orientation.lock === 'function') {
        orientation.lock('landscape').catch(() => {});
      }
    } catch {}
    onStart();
  };

  return (
    <div className="relative min-h-screen min-h-[100dvh] w-full flex flex-col items-center justify-between p-2 sm:p-4 overflow-y-auto overflow-x-hidden bg-gradient-to-b from-sky-300 via-sky-200 to-emerald-200 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-950 select-none">
      {/* Sky Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Sun in Day / Moon in Night Mode */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 pointer-events-none z-10">
          <div className="dark:hidden animate-pulse">
            <SunVector size={58} />
          </div>
          <div className="hidden dark:block animate-pulse">
            <MoonVector size={62} />
          </div>
        </div>

        {/* Clouds - Visible in both Day Mode and Night Mode with gentle night luminescence */}
        {/* Top-Left Cloud */}
        <div className="absolute top-3 left-3 sm:top-5 sm:left-10 opacity-85 dark:opacity-40">
          <CloudVector size={58} className="dark:text-indigo-200" />
        </div>

        {/* Top-Right Cloud */}
        <div className="absolute top-12 right-4 sm:right-14 opacity-80 dark:opacity-35">
          <CloudVector size={52} className="dark:text-indigo-200" />
        </div>

        {/* Mid-Left Floating Cloud (Adds depth in landscape and night sky) */}
        <div className="hidden sm:block absolute top-28 left-8 opacity-70 dark:opacity-30">
          <CloudVector size={42} />
        </div>

        {/* Mid-Right Floating Cloud */}
        <div className="hidden sm:block absolute top-32 right-10 opacity-70 dark:opacity-30">
          <CloudVector size={44} />
        </div>

        {/* NIGHT MODE STARS CONSTELLATION - Glowing & Twinkling across the night sky */}
        <div className="hidden dark:block absolute inset-0 pointer-events-none">
          {/* Top Star Clusters */}
          <div className="absolute top-3 left-24 animate-pulse">
            <StarVector size={18} fill="#fde047" />
          </div>
          <div className="absolute top-6 left-1/3 animate-ping">
            <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_#ffffff]"></div>
          </div>
          <div className="absolute top-4 right-32 animate-pulse delay-300">
            <StarVector size={16} fill="#fef08a" />
          </div>
          <div className="absolute top-8 right-1/4 animate-pulse delay-700">
            <StarVector size={14} fill="#a5f3fc" />
          </div>

          {/* Stars around the Moon */}
          <div className="absolute top-4 left-[46%] animate-bounce">
            <Sparkles className="w-4 h-4 text-amber-300 drop-shadow-[0_0_6px_#fde047]" />
          </div>
          <div className="absolute top-3 left-[55%] animate-pulse delay-500">
            <Sparkles className="w-3.5 h-3.5 text-yellow-200 drop-shadow-[0_0_4px_#fef08a]" />
          </div>

          {/* Mid-Sky Twinkling Stars */}
          <div className="absolute top-20 left-6 animate-pulse delay-200">
            <StarVector size={20} fill="#fde047" />
          </div>
          <div className="absolute top-28 left-20 animate-pulse delay-1000">
            <div className="w-2 h-2 bg-amber-200 rotate-45 shadow-[0_0_6px_#fde047]"></div>
          </div>
          <div className="absolute top-24 right-8 animate-pulse delay-500">
            <StarVector size={22} fill="#fde047" />
          </div>
          <div className="absolute top-32 right-24 animate-ping delay-700">
            <div className="w-1.5 h-1.5 bg-cyan-200 rounded-full shadow-[0_0_6px_#67e8f9]"></div>
          </div>

          {/* Lower Sky Stars above Hills */}
          <div className="absolute top-44 left-12 animate-pulse delay-300">
            <StarVector size={15} fill="#fef08a" />
          </div>
          <div className="absolute top-48 left-1/4 animate-pulse delay-800">
            <StarVector size={13} fill="#a5f3fc" />
          </div>
          <div className="absolute top-44 right-16 animate-pulse delay-400">
            <StarVector size={16} fill="#fde047" />
          </div>
          <div className="absolute top-52 right-1/3 animate-pulse delay-600">
            <div className="w-2 h-2 bg-yellow-100 rotate-45 shadow-[0_0_6px_#ffffff]"></div>
          </div>

          {/* Additional background subtle twinkling points */}
          <div className="absolute top-16 left-1/2 w-1 h-1 bg-white rounded-full opacity-80 animate-ping delay-500"></div>
          <div className="absolute top-36 left-[38%] w-1.5 h-1.5 bg-yellow-200 rounded-full opacity-70 animate-pulse"></div>
          <div className="absolute top-38 right-[36%] w-1 h-1 bg-white rounded-full opacity-80 animate-ping delay-1000"></div>
        </div>

        {/* Floating Math Bubbles in Corners */}
        <div className="hidden md:block absolute top-20 left-4 bg-purple-600/90 text-white font-black px-3 py-1.5 rounded-2xl border-2 border-white shadow-md text-sm md:text-base animate-bounce opacity-80">
          2 × 3 = 6
        </div>
        <div className="hidden md:block absolute top-24 right-6 bg-pink-600/90 text-white font-black px-3 py-1.5 rounded-2xl border-2 border-white shadow-md text-sm md:text-base animate-bounce delay-300 opacity-80">
          5 × 4 = 20
        </div>
        <div className="hidden lg:block absolute bottom-12 left-6 bg-amber-600/90 text-white font-black px-3 py-1.5 rounded-2xl border-2 border-white shadow-md text-sm md:text-base animate-bounce delay-700 opacity-80">
          7 × 3 = 21
        </div>
        <div className="hidden lg:block absolute bottom-12 right-6 bg-emerald-600/90 text-white font-black px-3 py-1.5 rounded-2xl border-2 border-white shadow-md text-sm md:text-base animate-bounce delay-500 opacity-80">
          9 × 2 = 18
        </div>

        {/* Green Hills in Background */}
        <div className="absolute -bottom-16 -left-10 w-[120%] h-36 sm:h-48 bg-emerald-400/80 dark:bg-emerald-900/40 rounded-t-[100%]"></div>
        <div className="absolute -bottom-20 -right-10 w-[110%] h-44 sm:h-56 bg-emerald-500 dark:bg-emerald-950/60 rounded-t-[100%]"></div>
      </div>

      {/* Top Action Buttons Header */}
      <header className="w-full max-w-5xl flex items-center justify-between z-20 px-2 py-1 shrink-0">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/85 dark:bg-slate-900/85 backdrop-blur-sm text-emerald-900 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-700/60 font-black text-xs shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span className="font-black tracking-wide">Multi Play!</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="startBadgesBtn"
            onClick={() => {
              soundManager.playTap();
              onOpenBadges();
            }}
            className="px-3 py-1.5 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm text-amber-800 dark:text-amber-300 rounded-xl sm:rounded-2xl shadow-sm border-2 border-amber-300 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 font-black text-xs cursor-pointer"
            title="My Badges"
          >
            <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Badges</span>
          </button>

          <button
            id="startSettingsBtn"
            onClick={() => {
              soundManager.playTap();
              onOpenSettings();
            }}
            className="p-1.5 sm:p-2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm text-slate-800 dark:text-slate-100 rounded-xl sm:rounded-2xl shadow-sm border-2 border-slate-300 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="Game Settings"
          >
            <SettingsIcon className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Central Content Area */}
      <main className="relative z-10 w-full max-w-5xl flex-1 flex flex-col landscape:flex-row items-center justify-center landscape:justify-between px-3 sm:px-6 py-2 gap-4 sm:gap-6 my-auto">
        {/* Left Side in Landscape / Top in Portrait: Logo & Mini-games matching user screenshot */}
        <div className="flex flex-col items-center landscape:items-start text-center landscape:text-left max-w-md landscape:max-w-lg">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center justify-center px-5 sm:px-6 py-1 sm:py-1.5 rounded-full bg-[#a7f3d0] dark:bg-[#064e3b] text-[#0f766e] dark:text-[#a7f3d0] font-black text-xs sm:text-sm tracking-widest uppercase shadow-2xs mb-2">
            LEARN • PLAY • GROW
          </div>

          {/* 3D Multi Play! Title Logo Group */}
          <div className="flex items-center justify-center landscape:justify-start gap-2.5 sm:gap-3.5 my-1">
            {/* Chunky Burgundy / Plum Multiplication Icon Card */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl bg-[#831843] dark:bg-[#701a75] border-3 sm:border-4 border-[#3f071b] dark:border-[#2e022d] shadow-[0_5px_0_#2b0412] dark:shadow-[0_5px_0_#1a011a] flex items-center justify-center text-[#fef08a] font-black text-3xl sm:text-4xl md:text-5xl select-none shrink-0 transform -rotate-3 hover:rotate-0 transition-transform">
              <span className="translate-y-[-2px] leading-none">×</span>
            </div>

            {/* 3D Multi Play! Typography */}
            <h1 className="multi-play-3d-title text-4xl sm:text-5xl md:text-6xl font-black font-['Fredoka',sans-serif] tracking-tight select-none">
              Multi Play!
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-[#1e293b] dark:text-slate-100 text-sm sm:text-base md:text-lg font-bold tracking-tight text-center landscape:text-left mt-1.5">
            A colorful times-table adventure made just for you.
          </p>

          {/* Game Mini Vector Badges Grid */}
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2 w-full max-w-sm sm:max-w-md mt-3">
            <div className="bg-white/85 dark:bg-slate-800/85 backdrop-blur-sm p-1.5 rounded-xl border border-amber-300/80 dark:border-slate-600 flex flex-col items-center shadow-xs">
              <FishVector size={22} variant={0} className="mb-0.5" />
              <span className="text-[9px] sm:text-[10px] md:text-xs font-black text-slate-950 dark:text-white truncate w-full text-center">Fish Catch</span>
            </div>
            <div className="bg-white/85 dark:bg-slate-800/85 backdrop-blur-sm p-1.5 rounded-xl border border-purple-300/80 dark:border-slate-600 flex flex-col items-center shadow-xs">
              <ButterflyVector size={22} variant={0} className="mb-0.5" />
              <span className="text-[9px] sm:text-[10px] md:text-xs font-black text-slate-950 dark:text-white truncate w-full text-center">Butterfly</span>
            </div>
            <div className="bg-white/85 dark:bg-slate-800/85 backdrop-blur-sm p-1.5 rounded-xl border border-rose-300/80 dark:border-slate-600 flex flex-col items-center shadow-xs">
              <BalloonVector size={18} variant={0} className="mb-0.5" />
              <span className="text-[9px] sm:text-[10px] md:text-xs font-black text-slate-950 dark:text-white truncate w-full text-center">Balloon</span>
            </div>
            <div className="bg-white/85 dark:bg-slate-800/85 backdrop-blur-sm p-1.5 rounded-xl border border-emerald-300/80 dark:border-slate-600 flex flex-col items-center shadow-xs">
              <AppleVector size={22} className="mb-0.5" />
              <span className="text-[9px] sm:text-[10px] md:text-xs font-black text-slate-950 dark:text-white truncate w-full text-center">Harvest</span>
            </div>
          </div>
        </div>

        {/* Right Side in Landscape / Bottom in Portrait: Big Let's Play Button */}
        <div className="flex flex-col items-center justify-center w-full landscape:w-auto mt-2 landscape:mt-0">
          <button
            id="startBtn"
            onClick={handlePlayClick}
            className="w-full sm:w-auto min-w-[220px] sm:min-w-[260px] md:min-w-[280px] py-3.5 sm:py-4 px-6 sm:px-8 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 hover:from-emerald-400 hover:to-green-400 active:scale-95 text-white font-black text-xl sm:text-2xl md:text-3xl rounded-full shadow-[0_6px_0_#065f46,0_12px_20px_rgba(0,0,0,0.28)] hover:shadow-[0_3px_0_#065f46,0_6px_12px_rgba(0,0,0,0.28)] transition-all flex items-center justify-center gap-3 border-3 border-white dark:border-emerald-200 cursor-pointer"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-emerald-600 flex items-center justify-center shadow-inner">
              <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current translate-x-0.5" />
            </div>
            <span>Let's Play!</span>
          </button>
          <span className="hidden landscape:block text-[10px] font-bold text-slate-800/80 dark:text-slate-200/80 mt-2">
            1× to 12× Tables & Games
          </span>
        </div>
      </main>

      {/* Bottom Spacer */}
      <footer className="w-full max-w-4xl z-20 py-1 text-center shrink-0">
        <p className="text-[10px] sm:text-xs font-bold text-slate-800/80 dark:text-slate-300/80">
          Practice 1× to 12× Multiplication Tables with Fun Games
        </p>
      </footer>
    </div>
  );
};
