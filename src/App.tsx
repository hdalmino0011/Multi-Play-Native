import React, { useState, useEffect } from 'react';
import { GameMode, GameStats, MathOperation } from './types';
import { soundManager } from './utils/audio';
import { SplashScreen } from './components/SplashScreen';
import { CinematicSplashScreen } from './components/CinematicSplashScreen';
import { HomeScreen } from './components/HomeScreen';
import { TableSelectScreen } from './components/TableSelectScreen';
import { GameScreen } from './components/GameScreen';
import { MemorizeScreen } from './components/MemorizeScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { SettingsModal } from './components/SettingsModal';
import { BadgesModal } from './components/BadgesModal';
import { RotateCw } from 'lucide-react';

type AppScreen = 'cinematic-splash' | 'splash' | 'home' | 'tables' | 'game' | 'memorize' | 'results';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('cinematic-splash');
  const [selectedOperation, setSelectedOperation] = useState<MathOperation>('multiply');
  const [selectedMode, setSelectedMode] = useState<GameMode>('fish');
  const [selectedTable, setSelectedTable] = useState<number>(2);
  const [lastScore, setLastScore] = useState<number>(0);
  const [lastTotal, setLastTotal] = useState<number>(10);

  // Sound and Appearance State
  const [soundMuted, setSoundMuted] = useState<boolean>(() => soundManager.getMuted());
  const [volume, setVolume] = useState<number>(() => soundManager.getVolume());
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('multiPlayDarkMode') === 'true';
    } catch {
      return false;
    }
  });

  // Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isBadgesOpen, setIsBadgesOpen] = useState<boolean>(false);

  // Mastery and Badges Stats
  const [stats, setStats] = useState<GameStats>(() => {
    try {
      const saved = localStorage.getItem('multiPlayStats');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      gamesPlayed: 0,
      totalCorrect: 0,
      bestStreak: 0,
      tableMastery: {},
      unlockedStickers: ['first_play'],
    };
  });

  // Apply dark mode class to HTML root and body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    try {
      localStorage.setItem('multiPlayDarkMode', String(darkMode));
    } catch {}
  }, [darkMode]);

  // Orientation State
  const [isPortrait, setIsPortrait] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerHeight > window.innerWidth;
    }
    return false;
  });
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  useEffect(() => {
    const updateOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    updateOrientation();
    window.addEventListener('resize', updateOrientation);
    window.addEventListener('orientationchange', updateOrientation);
    return () => {
      window.removeEventListener('resize', updateOrientation);
      window.removeEventListener('orientationchange', updateOrientation);
    };
  }, []);

  // Request Landscape Orientation lock if supported by device/browser
  useEffect(() => {
    const lockLandscape = async () => {
      try {
        const orientation = screen.orientation as unknown as { lock?: (mode: string) => Promise<void> };
        if (orientation && typeof orientation.lock === 'function') {
          await orientation.lock('landscape').catch(() => {});
        }
      } catch {
        // Handled gracefully if browser forbids orientation lock without gesture
      }
    };
    lockLandscape();
  }, []);

  // Global user interaction listener to resume audio context and lock landscape seamlessly
  useEffect(() => {
    const handleGesture = async () => {
      soundManager.unlockAudio();
      try {
        const orientation = screen.orientation as unknown as { lock?: (mode: string) => Promise<void> };
        if (orientation && typeof orientation.lock === 'function') {
          await orientation.lock('landscape').catch(() => {});
        }
      } catch {}
    };
    window.addEventListener('pointerdown', handleGesture, { passive: true });
    window.addEventListener('keydown', handleGesture);
    return () => {
      window.removeEventListener('pointerdown', handleGesture);
      window.removeEventListener('keydown', handleGesture);
    };
  }, []);

  const handleToggleMute = () => {
    const newMuted = !soundMuted;
    setSoundMuted(newMuted);
    soundManager.setMuted(newMuted);
  };

  const handleChangeVolume = (newVol: number) => {
    setVolume(newVol);
    soundManager.setVolume(newVol);
  };

  const handleToggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // Screen transitions
  const handleStartFromSplash = () => {
    setCurrentScreen('home');
    soundManager.startMusic('menu');
  };

  const handleSelectMode = (mode: GameMode) => {
    setSelectedMode(mode);
    setCurrentScreen('tables');
  };

  const handleSelectTable = (table: number) => {
    setSelectedTable(table);
    if (selectedMode === 'memorize') {
      setCurrentScreen('memorize');
    } else {
      setCurrentScreen('game');
    }
  };

  const handleFinishGame = (score: number, total: number) => {
    setLastScore(score);
    setLastTotal(total);

    // Update stats & stickers
    setStats((prev) => {
      const newStickers = new Set<string>(prev.unlockedStickers);
      newStickers.add('first_play');

      if (score === 10) {
        newStickers.add('perfect_10');
      }
      if (selectedMode === 'fish' && score >= 8) newStickers.add('fish_master');
      if (selectedMode === 'butterfly' && score >= 8) newStickers.add('butterfly_hero');
      if (selectedMode === 'balloon' && score >= 8) newStickers.add('balloon_sniper');
      if (selectedMode === 'harvest' && score >= 8) newStickers.add('apple_harvester');
      if (selectedMode === 'rocket' && score >= 8) newStickers.add('rocket_astronaut');
      if (selectedMode === 'match' && score >= 8) newStickers.add('match_wizard');
      if (selectedMode === 'quiz' && score >= 8) newStickers.add('quiz_champion');
      if (selectedMode === 'memorize') newStickers.add('memorize_scholar');

      const currentMastery = prev.tableMastery[selectedTable] || 0;
      const updatedMastery = score === 10 ? currentMastery + 1 : currentMastery;

      const updated: GameStats = {
        gamesPlayed: prev.gamesPlayed + 1,
        totalCorrect: prev.totalCorrect + score,
        bestStreak: Math.max(prev.bestStreak, score),
        tableMastery: {
          ...prev.tableMastery,
          [selectedTable]: updatedMastery,
        },
        unlockedStickers: Array.from(newStickers),
      };

      try {
        localStorage.setItem('multiPlayStats', JSON.stringify(updated));
      } catch {}

      return updated;
    });

    setCurrentScreen('results');
  };

  return (
    <div
      id="multi-play-root"
      className={`app-orientation-container w-full h-full min-h-screen min-h-[100dvh] font-sans antialiased text-slate-800 dark:text-slate-100 bg-sky-50 dark:bg-slate-900 transition-colors duration-300 overflow-y-auto overflow-x-hidden ${
        isPortrait ? 'is-portrait-forced-landscape' : ''
      } ${isFlipped ? 'is-flipped' : ''}`}
    >
      {/* Floating Orientation Flip Button (visible when held in portrait to easily switch left/right landscape) */}
      {isPortrait && (
        <button
          onClick={() => {
            soundManager.playTap();
            setIsFlipped((prev) => !prev);
          }}
          className="fixed top-2 right-2 z-50 p-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-xl shadow-lg border border-amber-400/80 backdrop-blur-xs flex items-center gap-1.5 text-[11px] font-black cursor-pointer active:scale-95 transition-all opacity-70 hover:opacity-100"
          title="Flip Landscape View"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>Flip Side</span>
        </button>
      )}

      {currentScreen === 'cinematic-splash' && (
        <CinematicSplashScreen
          onComplete={() => setCurrentScreen('splash')}
        />
      )}

      {currentScreen === 'splash' && (
        <SplashScreen
          onStart={handleStartFromSplash}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenBadges={() => setIsBadgesOpen(true)}
        />
      )}

      {currentScreen === 'home' && (
        <HomeScreen
          onSelectMode={handleSelectMode}
          onBackToSplash={() => setCurrentScreen('splash')}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenBadges={() => setIsBadgesOpen(true)}
          soundMuted={soundMuted}
          onToggleMute={handleToggleMute}
          selectedOperation={selectedOperation}
          onSelectOperation={setSelectedOperation}
        />
      )}

      {currentScreen === 'tables' && (
        <TableSelectScreen
          mode={selectedMode}
          operation={selectedOperation}
          onSelectTable={handleSelectTable}
          onBackToHome={() => {
            setCurrentScreen('home');
            soundManager.startMusic('menu');
          }}
          tableMastery={stats.tableMastery}
        />
      )}

      {currentScreen === 'game' && (
        <GameScreen
          mode={selectedMode}
          table={selectedTable}
          operation={selectedOperation}
          onFinishGame={handleFinishGame}
          onBackToTables={() => {
            setCurrentScreen('tables');
            soundManager.startMusic('menu');
          }}
          onGoHome={() => {
            setCurrentScreen('home');
            soundManager.startMusic('menu');
          }}
          soundMuted={soundMuted}
          onToggleMute={handleToggleMute}
        />
      )}

      {currentScreen === 'memorize' && (
        <MemorizeScreen
          table={selectedTable}
          operation={selectedOperation}
          onBackToTables={() => {
            setCurrentScreen('tables');
            soundManager.startMusic('menu');
          }}
          onGoHome={() => {
            setCurrentScreen('home');
            soundManager.startMusic('menu');
          }}
          soundMuted={soundMuted}
          onToggleMute={handleToggleMute}
        />
      )}

      {currentScreen === 'results' && (
        <ResultsScreen
          score={lastScore}
          total={lastTotal}
          mode={selectedMode}
          table={selectedTable}
          operation={selectedOperation}
          onPlayAgain={() => {
            if (selectedMode === 'memorize') setCurrentScreen('memorize');
            else setCurrentScreen('game');
          }}
          onChooseTable={() => setCurrentScreen('tables')}
          onGoHome={() => {
            setCurrentScreen('home');
            soundManager.startMusic('menu');
          }}
          onOpenBadges={() => setIsBadgesOpen(true)}
        />
      )}

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        soundMuted={soundMuted}
        onToggleMute={handleToggleMute}
        volume={volume}
        onChangeVolume={handleChangeVolume}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      {/* Badges & Sticker Book Modal */}
      <BadgesModal
        isOpen={isBadgesOpen}
        onClose={() => setIsBadgesOpen(false)}
        unlockedStickerIds={stats.unlockedStickers}
      />
    </div>
  );
}
