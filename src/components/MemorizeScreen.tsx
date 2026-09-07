import React, { useState, useEffect } from 'react';
import { soundManager } from '../utils/audio';
import {
  ArrowLeft,
  Home,
  Volume2,
  VolumeX,
  CheckCircle,
  RefreshCw,
  Sparkles,
  BookOpen,
  Check,
  X,
} from 'lucide-react';
import { BookVector } from './illustrations/VectorGraphics';
import confetti from 'canvas-confetti';

interface MemorizeScreenProps {
  table: number;
  onBackToTables: () => void;
  onGoHome: () => void;
  soundMuted: boolean;
  onToggleMute: () => void;
}

export const MemorizeScreen: React.FC<MemorizeScreenProps> = ({
  table,
  onBackToTables,
  onGoHome,
  soundMuted,
  onToggleMute,
}) => {
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<boolean>(false);
  const [speakingRow, setSpeakingRow] = useState<number | null>(null);
  const [isReadingAloud, setIsReadingAloud] = useState<boolean>(false);
  const [mode, setMode] = useState<'learn' | 'practice'>('learn');

  useEffect(() => {
    soundManager.startMusic('memorize');
    return () => {
      soundManager.stopMusic();
      soundManager.stopSpeech();
    };
  }, []);

  const getRowEquation = (idx: number) => {
    return {
      num1: table,
      symbol: '×',
      num2: idx,
      answer: table * idx,
      text: `${table} times ${idx} equals ${table * idx}`,
    };
  };

  const handleInputChange = (index: number, value: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [index]: value,
    }));
    setChecked(false);
  };

  const handleCheckAnswers = () => {
    soundManager.playTap();
    setChecked(true);

    let correctCount = 0;
    for (let i = 1; i <= 12; i++) {
      const eq = getRowEquation(i);
      if (parseInt(userAnswers[i] || '', 10) === eq.answer) {
        correctCount++;
      }
    }

    if (correctCount === 12) {
      soundManager.playVictory();
      try {
        confetti({
          particleCount: 50,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch {}
    } else if (correctCount > 6) {
      soundManager.playCorrect();
    } else {
      soundManager.playWrong();
    }
  };

  const handleReadAloud = () => {
    if (isReadingAloud) {
      soundManager.stopSpeech();
      setIsReadingAloud(false);
      setSpeakingRow(null);
      return;
    }

    setIsReadingAloud(true);
    let currentRow = 1;

    const speakNext = () => {
      if (currentRow > 12) {
        setIsReadingAloud(false);
        setSpeakingRow(null);
        return;
      }

      setSpeakingRow(currentRow);
      const eq = getRowEquation(currentRow);

      soundManager.speak(eq.text, () => {
        currentRow++;
        speakNext();
      });
    };

    speakNext();
  };

  const handleReset = () => {
    soundManager.playTap();
    setUserAnswers({});
    setChecked(false);
    setSpeakingRow(null);
  };

  return (
    <div className="min-h-screen min-h-[100dvh] w-full flex flex-col p-2 sm:p-3 safe-phone-padding overflow-y-auto overflow-x-hidden bg-gradient-to-b from-amber-50 via-amber-100/50 to-orange-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 select-none">
      {/* Top Nav with Back Button */}
      <header className="w-full max-w-4xl mx-auto flex items-center justify-between pb-1 border-b border-amber-300 dark:border-slate-800 shrink-0">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              soundManager.playTap();
              onGoHome();
            }}
            className="p-1.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl shadow-xs border-2 border-slate-300 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="Home"
          >
            <Home className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              soundManager.playTap();
              onBackToTables();
            }}
            className="p-1.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl shadow-xs border-2 border-slate-300 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all flex items-center gap-1 font-black text-xs cursor-pointer"
            title="Back to Selection"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Tables</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <BookVector size={24} />
          <div className="text-center sm:text-left">
            <h2 className="text-sm sm:text-base font-black text-amber-950 dark:text-amber-300 font-['Fredoka',sans-serif]">
              {table}× Multiplication Fact Table
            </h2>
            <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300">
              {mode === 'learn' ? 'Read & listen carefully' : 'Fill in the blanks'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
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
            title={soundMuted ? 'Unmute' : 'Mute'}
          >
            {soundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mode Switcher */}
      <div className="w-full max-w-4xl mx-auto flex items-center justify-center gap-2 my-1.5 shrink-0">
        <button
          onClick={() => {
            soundManager.playTap();
            setMode('learn');
          }}
          className={`px-3.5 py-1 rounded-xl font-black text-xs transition-all flex items-center gap-1.5 border-2 cursor-pointer ${
            mode === 'learn'
              ? 'bg-amber-500 text-white border-amber-600 shadow-xs scale-102'
              : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200 border-slate-300 dark:border-slate-700'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Learn Mode</span>
        </button>

        <button
          onClick={() => {
            soundManager.playTap();
            setMode('practice');
          }}
          className={`px-3.5 py-1 rounded-xl font-black text-xs transition-all flex items-center gap-1.5 border-2 cursor-pointer ${
            mode === 'practice'
              ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs scale-102'
              : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200 border-slate-300 dark:border-slate-700'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Practice Test</span>
        </button>
      </div>

      {/* Notebook Chart Container */}
      <main className="flex-1 w-full max-w-3xl mx-auto my-1 min-h-0 flex flex-col justify-between">
        <div className="bg-[#fffdf2] dark:bg-slate-900 rounded-2xl p-2 sm:p-3 border-2 border-amber-400 dark:border-slate-700 shadow-md relative flex-1 min-h-0 flex flex-col justify-between">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((idx) => {
              const eq = getRowEquation(idx);
              const userVal = userAnswers[idx] || '';
              const isCorrect = parseInt(userVal, 10) === eq.answer;
              const isSpeaking = speakingRow === idx;

              return (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-1.5 sm:p-2 rounded-xl border transition-all ${
                    isSpeaking
                      ? 'bg-amber-200 dark:bg-amber-950/90 border-amber-500 scale-102 shadow-xs ring-2 ring-amber-300/60'
                      : checked && mode === 'practice'
                      ? isCorrect
                        ? 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-500'
                        : 'bg-rose-100 dark:bg-rose-950/80 border-rose-500'
                      : 'bg-white dark:bg-slate-800 border-amber-300 dark:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-1 text-xs sm:text-sm font-black text-slate-950 dark:text-white">
                    <span className="w-3.5 text-right text-amber-700 dark:text-amber-400">{eq.num1}</span>
                    <span className="text-amber-600 dark:text-amber-400">×</span>
                    <span className="w-3.5 text-center text-indigo-700 dark:text-indigo-400">{eq.num2}</span>
                    <span className="text-slate-500 dark:text-slate-400">=</span>
                  </div>

                  {mode === 'learn' ? (
                    <div className="font-black text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-slate-700 px-2 py-0.5 rounded-lg min-w-[36px] text-center border border-emerald-400 dark:border-slate-600">
                      {eq.answer}
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        inputMode="numeric"
                        value={userVal}
                        onChange={(e) => handleInputChange(idx, e.target.value)}
                        placeholder="?"
                        className="w-10 sm:w-12 p-0.5 text-center text-xs sm:text-sm font-black rounded-lg border border-slate-300 dark:border-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-300 outline-none bg-white dark:bg-slate-700 text-slate-950 dark:text-white"
                      />
                      {checked && (
                        <span className={`w-4 h-4 rounded-full flex items-center justify-center text-white text-[10px] ${
                          isCorrect ? 'bg-emerald-500' : 'bg-rose-500'
                        }`}>
                          {isCorrect ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : <X className="w-2.5 h-2.5 stroke-[3]" />}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action buttons at bottom */}
          <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2 shrink-0">
            <button
              onClick={handleReadAloud}
              className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all flex items-center gap-1.5 shadow-xs cursor-pointer ${
                isReadingAloud
                  ? 'bg-rose-500 hover:bg-rose-400 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{isReadingAloud ? 'Stop Reading' : 'Read Aloud'}</span>
            </button>

            {mode === 'practice' && (
              <>
                <button
                  onClick={handleCheckAnswers}
                  className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-white font-black text-xs rounded-xl shadow-xs flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Check Answers</span>
                </button>

                <button
                  onClick={handleReset}
                  className="px-2.5 py-1.5 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-200 font-black text-xs rounded-xl hover:bg-slate-300 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
