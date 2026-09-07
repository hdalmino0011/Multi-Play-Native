import React, { useState, useEffect } from 'react';
import { Smartphone, RotateCw, X } from 'lucide-react';
import { soundManager } from '../utils/audio';

export const OrientationPrompt: React.FC = () => {
  const [isPortrait, setIsPortrait] = useState<boolean>(false);
  const [dismissed, setDismissed] = useState<boolean>(false);

  useEffect(() => {
    const checkOrientation = () => {
      // Check if viewport height exceeds width (portrait) on mobile/touch screen devices or narrow screens
      const isNarrowPortrait = window.innerHeight > window.innerWidth && window.innerWidth < 900;
      setIsPortrait(isNarrowPortrait);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  const handleRotateAndFullscreen = async () => {
    soundManager.playTap();
    try {
      if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
      const orientation = screen.orientation as unknown as { lock?: (mode: string) => Promise<void> };
      if (orientation && typeof orientation.lock === 'function') {
        await orientation.lock('landscape');
      }
    } catch {
      // Graceful fallback if device restricts lock
    }
  };

  const handleDismiss = () => {
    soundManager.playTap();
    setDismissed(true);
  };

  if (!isPortrait || dismissed) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center text-white animate-fadeIn select-none">
      <button
        onClick={handleDismiss}
        className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700 transition-all active:scale-95"
        title="Dismiss and Continue"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Animated Rotating Phone Illustration */}
      <div className="relative w-28 h-28 mb-4 flex items-center justify-center">
        <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping"></div>
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg border-2 border-white/80 animate-spin [animation-duration:4s]">
          <RotateCw className="w-10 h-10 text-white" />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-amber-500 text-amber-950 p-1.5 rounded-full shadow-md border-2 border-white">
          <Smartphone className="w-5 h-5 rotate-90" />
        </div>
      </div>

      <h2 className="text-xl sm:text-2xl font-black font-['Fredoka',sans-serif] text-amber-300 mb-2">
        Please Rotate to Landscape
      </h2>

      <p className="text-sm text-slate-200 max-w-xs font-bold leading-relaxed mb-6">
        Multi Play is optimized for landscape mode for the best times table games, fishing, and balloons!
      </p>

      <div className="flex flex-col sm:flex-row gap-2.5 w-full max-w-xs">
        <button
          onClick={handleRotateAndFullscreen}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 active:scale-95 text-white font-black text-sm shadow-md border-2 border-emerald-300 flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <RotateCw className="w-4 h-4" />
          <span>Rotate & Fullscreen</span>
        </button>

        <button
          onClick={handleDismiss}
          className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 hover:text-white font-black text-xs border border-slate-600 flex items-center justify-center cursor-pointer transition-all"
        >
          Continue Anyway
        </button>
      </div>
    </div>
  );
};
