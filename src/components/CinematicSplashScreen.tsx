import React, { useState, useEffect, useRef } from 'react';
import { GithubVector } from './illustrations/VectorGraphics';
import { soundManager } from '../utils/audio';

interface CinematicSplashScreenProps {
  onComplete: () => void;
}

const RAPID_MATH_EQUATIONS_ROW1 = [
  '7 × 8 = 56',
  '9 × 9 = 81',
  '6 × 7 = 42',
  '12 × 11 = 132',
  '8 × 8 = 64',
  '4 × 9 = 36',
  '5 × 12 = 60',
  '3 × 8 = 24',
];

const RAPID_MATH_EQUATIONS_ROW2 = [
  '11 × 7 = 77',
  '12 × 12 = 144',
  '6 × 8 = 48',
  '9 × 6 = 54',
  '8 × 4 = 32',
  '5 × 5 = 25',
  '2 × 9 = 18',
  '10 × 10 = 100',
];

const RAPID_MATH_EQUATIONS_ROW3 = [
  '7 × 6 = 42',
  '9 × 8 = 72',
  '4 × 7 = 28',
  '11 × 11 = 121',
  '6 × 6 = 36',
  '8 × 7 = 56',
  '3 × 9 = 27',
  '12 × 8 = 96',
];

const RAPID_MATH_EQUATIONS_ROW4 = [
  '5 × 9 = 45',
  '4 × 8 = 32',
  '7 × 7 = 49',
  '12 × 6 = 72',
  '9 × 4 = 36',
  '8 × 6 = 48',
  '3 × 12 = 36',
  '11 × 8 = 88',
];

export const CinematicSplashScreen: React.FC<CinematicSplashScreenProps> = ({
  onComplete,
}) => {
  // Stage flow:
  // 1. 'math-rapid': Marvel-style rapid multiplication film reel (2.1s). At climax, it flashes and completely vanishes!
  // 2. 'sldev': Clean dark void, S.L.Dev silver 3D logo + HDDev + "powered by GitHub" at bottom (3.4s)
  // 3. 'collab': Cebu Normal University Students project intro + copyright at bottom (3.0s)
  const [stage, setStage] = useState<'math-rapid' | 'sldev' | 'collab'>('math-rapid');
  const [fadeIn, setFadeIn] = useState<boolean>(true);
  const [isFlashing, setIsFlashing] = useState<boolean>(false);
  const tickTimerRef = useRef<number | null>(null);

  // Stage 1: Rapid Math Intro (Marvel film reel effect)
  useEffect(() => {
    if (stage !== 'math-rapid') return;

    let ticks = 0;
    const interval = window.setInterval(() => {
      ticks++;
      if (ticks % 2 === 0) {
        soundManager.playFilmReelTick(480 + (ticks % 6) * 70);
      }
    }, 90);
    tickTimerRef.current = interval;

    // Trigger flash dissolve at 1.8s
    const flashTimer = setTimeout(() => {
      setIsFlashing(true);
      soundManager.playMarvelClimax();
    }, 1800);

    // Rapid math COMPLETELY DISAPPEARS and transitions to S.L.Dev at 2.1s
    const transitionTimer = setTimeout(() => {
      setStage('sldev');
      setIsFlashing(false);
      setFadeIn(true);
    }, 2100);

    return () => {
      clearInterval(interval);
      clearTimeout(flashTimer);
      clearTimeout(transitionTimer);
    };
  }, [stage]);

  // Stage 2: S.L.Dev & powered by GitHub -> transition to Cebu Normal University
  useEffect(() => {
    if (stage !== 'sldev') return;

    const stageTimer = setTimeout(() => {
      setFadeIn(false);
      const transitionTimer = setTimeout(() => {
        setStage('collab');
        setFadeIn(true);
      }, 600);

      return () => clearTimeout(transitionTimer);
    }, 3400);

    return () => clearTimeout(stageTimer);
  }, [stage]);

  // Stage 3: Cebu Normal University -> complete
  useEffect(() => {
    if (stage !== 'collab') return;

    const stageTimer = setTimeout(() => {
      setFadeIn(false);
      const finishTimer = setTimeout(() => {
        onComplete();
      }, 650);

      return () => clearTimeout(finishTimer);
    }, 3000);

    return () => clearTimeout(stageTimer);
  }, [stage, onComplete]);

  return (
    <div
      className="fixed inset-0 z-[100] w-full h-full min-h-[100dvh] max-h-[100dvh] flex flex-col items-center justify-between select-none overflow-hidden bg-radial from-[#0c1222] via-[#050811] to-[#020408] text-white safe-phone-padding transition-colors duration-1000"
    >
      {/* Background Cinematic Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[380px] bg-slate-400/10 blur-[130px] rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#030712]/70 to-[#020408]"></div>
        
        {/* Subtle cinematic halftone pattern */}
        <div className="absolute inset-0 comic-halftone-pattern opacity-25 pointer-events-none"></div>
      </div>

      {/* ========================================================================= */}
      {/* RAPID MULTIPLICATION COMIC REEL (ONLY ACTIVE DURING 'math-rapid' STAGE)   */}
      {/* Disappears COMPLETELY when S.L.Dev and other screens arrive!              */}
      {/* ========================================================================= */}
      {stage === 'math-rapid' && (
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-around py-2 sm:py-6 overflow-hidden opacity-45">
          {/* Film Strip Row 1 - Moving Rapidly Left */}
          <div className="w-full overflow-hidden shrink-0">
            <div className="marvel-rapid-strip-left gap-3 sm:gap-5 py-1 items-center">
              {[...RAPID_MATH_EQUATIONS_ROW1, ...RAPID_MATH_EQUATIONS_ROW1, ...RAPID_MATH_EQUATIONS_ROW1].map((eq, idx) => (
                <div
                  key={`r1-${idx}`}
                  className="px-3 py-1 rounded-md bg-slate-900/80 border border-slate-700/60 shadow-md text-amber-300 font-['Bebas_Neue','Anton',sans-serif] text-xl sm:text-2xl md:text-3xl tracking-wider font-extrabold whitespace-nowrap transform -skew-x-6"
                >
                  {eq}
                </div>
              ))}
            </div>
          </div>

          {/* Film Strip Row 2 - Moving Rapidly Right */}
          <div className="w-full overflow-hidden shrink-0">
            <div className="marvel-rapid-strip-right gap-3 sm:gap-5 py-1 items-center">
              {[...RAPID_MATH_EQUATIONS_ROW2, ...RAPID_MATH_EQUATIONS_ROW2, ...RAPID_MATH_EQUATIONS_ROW2].reverse().map((eq, idx) => (
                <div
                  key={`r2-${idx}`}
                  className="px-3 py-1 rounded-md bg-slate-900/80 border border-slate-700/60 shadow-md text-sky-300 font-['Bebas_Neue','Anton',sans-serif] text-xl sm:text-2xl md:text-3xl tracking-wider font-extrabold whitespace-nowrap transform -skew-x-6"
                >
                  {eq}
                </div>
              ))}
            </div>
          </div>

          {/* Film Strip Row 3 - Fast Moving Left */}
          <div className="w-full overflow-hidden shrink-0">
            <div className="marvel-rapid-strip-fast gap-3 sm:gap-5 py-1 items-center">
              {[...RAPID_MATH_EQUATIONS_ROW3, ...RAPID_MATH_EQUATIONS_ROW3, ...RAPID_MATH_EQUATIONS_ROW3].map((eq, idx) => (
                <div
                  key={`r3-${idx}`}
                  className="px-3 py-1 rounded-md bg-slate-900/80 border border-slate-700/60 shadow-md text-emerald-300 font-['Bebas_Neue','Anton',sans-serif] text-xl sm:text-2xl md:text-3xl tracking-wider font-extrabold whitespace-nowrap transform -skew-x-6"
                >
                  {eq}
                </div>
              ))}
            </div>
          </div>

          {/* Film Strip Row 4 - Ultra Fast Moving Right */}
          <div className="w-full overflow-hidden shrink-0">
            <div className="marvel-rapid-strip-ultra gap-3 sm:gap-5 py-1 items-center">
              {[...RAPID_MATH_EQUATIONS_ROW4, ...RAPID_MATH_EQUATIONS_ROW4, ...RAPID_MATH_EQUATIONS_ROW4].reverse().map((eq, idx) => (
                <div
                  key={`r4-${idx}`}
                  className="px-3 py-1 rounded-md bg-slate-900/80 border border-slate-700/60 shadow-md text-rose-300 font-['Bebas_Neue','Anton',sans-serif] text-xl sm:text-2xl md:text-3xl tracking-wider font-extrabold whitespace-nowrap transform -skew-x-6"
                >
                  {eq}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Optical Flash Transition (Marvel Climax) */}
      {isFlashing && (
        <div className="absolute inset-0 z-40 pointer-events-none bg-gradient-to-r from-white/90 via-sky-100 to-white/90 marvel-flash-transition"></div>
      )}

      {/* Clean Top Spacer */}
      <header className="w-full max-w-5xl z-20 px-2 py-3 shrink-0 safe-phone-top"></header>

      {/* Main Central Cinematic Content */}
      <main className="relative z-20 w-full max-w-5xl flex-1 flex flex-col items-center justify-center text-center px-4 my-auto overflow-hidden">
        {/* ======================================================== */}
        {/* STAGE 1: S.L.Dev with Marvel-Style Realistic Silver Look */}
        {/* ======================================================== */}
        {stage === 'sldev' && (
          <div
            className={`flex flex-col items-center justify-center transition-all duration-700 ease-out transform ${
              fadeIn
                ? 'opacity-100 scale-100 translate-y-0'
                : 'opacity-0 scale-98 -translate-y-2'
            }`}
          >
            {/* Iconic Marvel-Style Silver Font Alone */}
            <div className="relative mb-5 sm:mb-7 flex items-center justify-center overflow-visible">
              <h1 className="marvel-silver-title text-5xl sm:text-7xl md:text-8xl select-none">
                S.L.Dev
              </h1>
              {/* Metallic Sheen Wave Effect sweeping across the font alone */}
              <div className="silver-gleam-text-overlay"></div>
            </div>

            {/* Below it: "with the collaboration of HDDev" */}
            <div className="flex items-center gap-2 sm:gap-3 text-slate-300 font-bold tracking-[0.18em] uppercase text-xs sm:text-sm md:text-base opacity-95">
              <span className="w-6 sm:w-10 h-[1.5px] bg-gradient-to-r from-transparent via-slate-400 to-slate-200"></span>
              <span className="text-slate-200 text-shadow-sm font-['Nunito',sans-serif]">
                with the collaboration of <span className="text-white font-black tracking-wider">HDDev</span>
              </span>
              <span className="w-6 sm:w-10 h-[1.5px] bg-gradient-to-l from-transparent via-slate-400 to-slate-200"></span>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STAGE 2: Cebu Normal University Students ONLY            */}
        {/* ======================================================== */}
        {stage === 'collab' && (
          <div
            className={`flex flex-col items-center justify-center max-w-2xl transition-all duration-700 ease-out transform ${
              fadeIn
                ? 'opacity-100 scale-100 translate-y-0'
                : 'opacity-0 scale-98 -translate-y-2'
            }`}
          >
            {/* Academic Emblem Accent */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-800/80 border-2 border-amber-400/60 shadow-lg flex items-center justify-center mb-3 sm:mb-4 text-amber-300">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
            </div>

            {/* Project Statement: Cebu Normal University Students ONLY */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-100 tracking-wide font-['Fredoka','Nunito',sans-serif] leading-relaxed max-w-xl">
              A project created by <br className="hidden sm:block" />
              <span className="text-amber-300 font-black">Cebu Normal University</span> Students
            </h2>

            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-slate-400 font-medium tracking-wider">
              Empowering young minds through interactive mathematical play
            </p>
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* BOTTOM FOOTER SECTION                                                     */}
      {/* 'powered by GitHub' appears WITH S.L.Dev in the bottom                     */}
      {/* '© Multi Play' appears during the Cebu Normal University stage             */}
      {/* ========================================================================= */}
      <footer className="w-full max-w-4xl z-20 pb-3 text-center shrink-0 safe-phone-bottom min-h-[36px] flex items-center justify-center">
        {stage === 'sldev' && (
          <div
            className={`inline-flex items-center justify-center gap-2 text-slate-400 hover:text-slate-300 text-xs sm:text-sm font-semibold tracking-widest uppercase transition-opacity duration-700 ${
              fadeIn ? 'opacity-85' : 'opacity-0'
            }`}
          >
            <span>powered by</span>
            <span className="inline-flex items-center gap-1.5 text-slate-200 font-bold">
              <GithubVector size={16} className="text-slate-200 drop-shadow" />
              <span>GitHub</span>
            </span>
          </div>
        )}

        {stage === 'collab' && (
          <div
            className={`text-slate-400 text-xs sm:text-sm font-semibold tracking-wider transition-opacity duration-700 ${
              fadeIn ? 'opacity-90' : 'opacity-0'
            }`}
          >
            <span>© Multi Play | All Rights Reserved 2026</span>
          </div>
        )}
      </footer>
    </div>
  );
};
