import React, { useState, useEffect } from 'react';
import { GithubVector } from './illustrations/VectorGraphics';
import { ChevronRight } from 'lucide-react';

interface CinematicSplashScreenProps {
  onComplete: () => void;
}

export const CinematicSplashScreen: React.FC<CinematicSplashScreenProps> = ({
  onComplete,
}) => {
  const [stage, setStage] = useState<'sldev' | 'collab'>('sldev');
  const [fadeIn, setFadeIn] = useState<boolean>(true);

  // Stage 1: S.L.Dev + HDDev + powered by github -> at least 3.5 seconds
  // Stage 2: Cebu Normal University & Cebu Technological University + copyright -> at least 2.5 seconds
  useEffect(() => {
    // Stage 1 timer: after smooth entrance animation, hold for 3.8s
    const stage1Timer = setTimeout(() => {
      setFadeIn(false); // trigger soft fade out
      const transitionTimer = setTimeout(() => {
        setStage('collab');
        setFadeIn(true); // soft fade in stage 2
      }, 650);

      return () => clearTimeout(transitionTimer);
    }, 3800);

    return () => clearTimeout(stage1Timer);
  }, []);

  useEffect(() => {
    if (stage === 'collab') {
      // Stage 2 timer: hold for 2.8s after entrance animation
      const stage2Timer = setTimeout(() => {
        setFadeIn(false);
        const finishTimer = setTimeout(() => {
          onComplete();
        }, 650);
        return () => clearTimeout(finishTimer);
      }, 2800);

      return () => clearTimeout(stage2Timer);
    }
  }, [stage, onComplete]);

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div
      onClick={handleSkip}
      className="fixed inset-0 z-[100] w-full h-full min-h-[100dvh] flex flex-col items-center justify-between select-none overflow-hidden cursor-pointer bg-radial from-[#0c1222] via-[#050811] to-[#020408] text-white safe-phone-padding transition-colors duration-700"
    >
      {/* Background Cinematic Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[360px] bg-slate-400/10 blur-[130px] rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#030712]/60 to-[#020408]"></div>
        
        {/* Subtle cinematic film grain / lines */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
      </div>

      {/* Top Bar with Safe-Area & Optional Subtle Skip Indicator */}
      <header className="w-full max-w-5xl flex items-center justify-between z-20 px-2 py-1 shrink-0 safe-phone-top">
        <div className="text-[10px] tracking-[0.25em] uppercase font-bold text-slate-400/50">
          STUDIO PRESENTATION
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSkip();
          }}
          className="text-xs font-semibold tracking-wider text-slate-300/60 hover:text-white px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-xs transition-all cursor-pointer border border-white/10 inline-flex items-center gap-1"
        >
          <span>Skip</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </header>

      {/* Main Central Cinematic Content */}
      <main className="relative z-10 w-full max-w-4xl flex-1 flex flex-col items-center justify-center text-center px-4 my-auto">
        {stage === 'sldev' ? (
          /* ======================================================== */
          /* STAGE 1: S.L.Dev with Marvel-Style Realistic Silver Look */
          /* ======================================================== */
          <div
            className={`flex flex-col items-center justify-center transition-all duration-700 ease-out transform ${
              fadeIn
                ? 'opacity-100 scale-100 translate-y-0'
                : 'opacity-0 scale-98 -translate-y-2'
            }`}
          >
            {/* Marvel-style Studio Box Frame with Silver Chrome & Sheen */}
            <div className="marvel-silver-frame px-8 sm:px-14 py-4 sm:py-6 rounded-xl sm:rounded-2xl shadow-2xl mb-5 sm:mb-7 flex items-center justify-center">
              {/* Metallic Sheen Wave Effect sweeping across the emblem */}
              <div className="silver-gleam-overlay"></div>

              {/* S.L.Dev Iconic Marvel Silver Title */}
              <h1 className="marvel-silver-title text-4xl sm:text-6xl md:text-7xl font-black select-none tracking-[0.16em] transform hover:scale-[1.02] transition-transform">
                S.L.Dev
              </h1>
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
        ) : (
          /* ======================================================== */
          /* STAGE 2: Soft Fade Continuation - Universities Collab   */
          /* ======================================================== */
          <div
            className={`flex flex-col items-center justify-center max-w-2xl transition-all duration-700 ease-out transform ${
              fadeIn
                ? 'opacity-100 scale-100 translate-y-0'
                : 'opacity-0 scale-98 -translate-y-2'
            }`}
          >
            {/* Elegant Emblem Accent */}
            <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-600/60 shadow-lg flex items-center justify-center mb-4 text-amber-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
            </div>

            {/* Collaboration Statement */}
            <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-slate-100 tracking-wide font-['Fredoka','Nunito',sans-serif] leading-relaxed max-w-xl">
              A project collaborated by <br className="hidden sm:block" />
              <span className="text-amber-300 font-black">Cebu Normal University</span> and{' '}
              <span className="text-sky-300 font-black">Cebu Technological University</span> Students
            </h2>

            <p className="mt-3 text-xs sm:text-sm text-slate-400 font-medium tracking-wider">
              Empowering young minds through interactive mathematical play
            </p>
          </div>
        )}
      </main>

      {/* Bottom Footer Section with Powered by GitHub or Copyright */}
      <footer className="w-full max-w-4xl z-20 pb-2 text-center shrink-0">
        {stage === 'sldev' ? (
          /* At the bottom part: "powered by github" */
          <div
            className={`inline-flex items-center justify-center gap-2 text-slate-400 hover:text-slate-300 text-xs sm:text-sm font-semibold tracking-widest uppercase transition-opacity duration-500 ${
              fadeIn ? 'opacity-80' : 'opacity-0'
            }`}
          >
            <span>powered by</span>
            <span className="inline-flex items-center gap-1 text-slate-200 font-bold">
              <GithubVector size={16} className="text-slate-200" />
              <span>GitHub</span>
            </span>
          </div>
        ) : (
          /* At the bottom will display: "© Multi Play | All Rights Reserved 2026" */
          <div
            className={`text-slate-400 text-xs sm:text-sm font-semibold tracking-wider transition-opacity duration-500 ${
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
