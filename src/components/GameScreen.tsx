import React, { useState, useEffect } from 'react';
import { GameMode, Question } from '../types';
import { soundManager } from '../utils/audio';
import { MathVisualizer } from './MathVisualizer';
import { FishingStage } from './FishingStage';
import { generateQuestions } from '../utils/math';
import {
  Volume2,
  VolumeX,
  Pause,
  Play,
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import {
  FishVector,
  ButterflyVector,
  ButterflyCatcherVector,
  BalloonVector,
  BalloonBurstVector,
  AppleVector,
  FishermanBoatVector,
  RocketVector,
  SunVector,
  MoonVector,
  CloudVector,
  FlameVector,
  StarVector,
  CardsMatchVector,
  FlowerVector,
  BasketVector,
} from './illustrations/VectorGraphics';
import confetti from 'canvas-confetti';

interface GameScreenProps {
  mode: GameMode;
  table: number;
  onFinishGame: (score: number, total: number) => void;
  onBackToTables: () => void;
  onGoHome: () => void;
  soundMuted: boolean;
  onToggleMute: () => void;
}

const TOTAL_QUESTIONS = 10;

export const GameScreen: React.FC<GameScreenProps> = ({
  mode,
  table,
  onFinishGame,
  onBackToTables,
  onGoHome,
  soundMuted,
  onToggleMute,
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [showHelperHint, setShowHelperHint] = useState<boolean>(false);
  const [isLastAnswerCorrect, setIsLastAnswerCorrect] = useState<boolean | null>(null);

  // Animation states for realistic game mechanics
  const [fishingTarget, setFishingTarget] = useState<number | null>(null);
  const [netTarget, setNetTarget] = useState<number | null>(null);
  const [balloonPopped, setBalloonPopped] = useState<number | null>(null);
  const [harvestedApple, setHarvestedApple] = useState<number | null>(null);
  const [rocketBlast, setRocketBlast] = useState<boolean>(false);

  // Generate 10 multiplication questions for selected table
  useEffect(() => {
    const generated = generateQuestions(table, TOTAL_QUESTIONS);
    setQuestions(generated);
    setQuestionIndex(0);
    setScore(0);
    setStreak(0);
    setSelectedOption(null);
    setIsLocked(false);
    setShowFeedback(false);
    setIsLastAnswerCorrect(null);

    soundManager.startMusic(mode);
    return () => {
      soundManager.stopMusic();
    };
  }, [mode, table]);

  const currentQ: Question | undefined = questions[questionIndex];

  const handleSelectAnswer = (chosen: number) => {
    if (isLocked || isPaused || !currentQ) return;
    setIsLocked(true);
    setSelectedOption(chosen);

    const isCorrect = chosen === currentQ.answer;
    setIsLastAnswerCorrect(isCorrect);

    // Trigger Mode-Specific Animations
    if (mode === 'fish') {
      setFishingTarget(chosen);
    } else if (mode === 'butterfly') {
      soundManager.playButterfly();
      setNetTarget(chosen);
    } else if (mode === 'balloon') {
      setBalloonPopped(chosen);
      soundManager.playPop();
    } else if (mode === 'harvest') {
      setHarvestedApple(chosen);
      soundManager.playHarvest();
    } else if (mode === 'rocket') {
      soundManager.playRocketLaunch();
      setRocketBlast(true);
    }

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);

      if (mode === 'fish') {
        // Fishing mode has dedicated reel-in animation sequence:
        // cast -> hooked -> reel -> caught in bucket at ~1200ms
        setTimeout(() => {
          try {
            confetti({
              particleCount: 45,
              spread: 65,
              origin: { y: 0.4 },
            });
          } catch {}
          soundManager.playCorrect();
        }, 1250);

        setTimeout(() => {
          advanceQuestion(score + 1);
        }, 1600);
      } else {
        soundManager.playCorrect();
        try {
          confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.65 },
          });
        } catch {}

        setTimeout(() => {
          advanceQuestion(score + 1);
        }, 1100);
      }
    } else {
      setStreak(0);

      if (mode === 'fish') {
        // Allow time for line cast & fish escape animation
        setTimeout(() => {
          soundManager.playWrong();
          setShowFeedback(true);
        }, 1100);
      } else {
        soundManager.playWrong();
        setTimeout(() => {
          setShowFeedback(true);
        }, 900);
      }
    }
  };

  const advanceQuestion = (currentScore: number) => {
    // Reset animation target states
    setFishingTarget(null);
    setNetTarget(null);
    setBalloonPopped(null);
    setHarvestedApple(null);
    setRocketBlast(false);
    setSelectedOption(null);
    setIsLocked(false);
    setIsLastAnswerCorrect(null);
    setShowFeedback(false);

    if (questionIndex + 1 >= TOTAL_QUESTIONS) {
      onFinishGame(currentScore, TOTAL_QUESTIONS);
    } else {
      setQuestionIndex((prev) => prev + 1);
    }
  };

  const handleContinue = () => {
    soundManager.playTap();
    advanceQuestion(score);
  };

  if (!currentQ) {
    return (
      <div className="min-h-screen min-h-[100dvh] w-full flex items-center justify-center bg-sky-100 dark:bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen min-h-[100dvh] w-full flex flex-col justify-between p-2 sm:p-3 safe-phone-padding overflow-y-auto overflow-x-hidden bg-gradient-to-b from-sky-100 via-sky-50 to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 select-none">
      {/* Background Night Mode Subtle Ambient Stars */}
      <div className="hidden dark:block absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-3 left-10 animate-pulse"><StarVector size={12} fill="#fde047" /></div>
        <div className="absolute top-8 right-16 animate-pulse delay-500"><StarVector size={14} fill="#fef08a" /></div>
        <div className="absolute top-20 left-1/3 animate-ping delay-700"><div className="w-1.5 h-1.5 bg-cyan-200 rounded-full shadow-[0_0_6px_#67e8f9]"></div></div>
        <div className="absolute top-24 right-1/4 animate-pulse delay-300"><StarVector size={11} fill="#a5f3fc" /></div>
      </div>

      {/* Top Game Bar (Compact) */}
      <header className="relative z-10 w-full max-w-5xl mx-auto flex items-center justify-between pb-1 border-b border-slate-300 dark:border-slate-800 shrink-0">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              soundManager.playTap();
              setIsPaused(true);
            }}
            className="p-1.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl shadow-xs border-2 border-slate-300 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="Pause Game"
          >
            <Pause className="w-4 h-4" />
          </button>

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
        </div>

        {/* Progress Tracker */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-[11px] font-black text-slate-900 dark:text-slate-100">
            <span>Question {questionIndex + 1}</span>
            <span className="text-slate-400">/</span>
            <span>{TOTAL_QUESTIONS}</span>
          </div>
          <div className="w-28 sm:w-36 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-300 dark:border-slate-700 mt-0.5">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-green-500 transition-all duration-300"
              style={{ width: `${((questionIndex + 1) / TOTAL_QUESTIONS) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {streak > 1 && (
            <div className="hidden sm:flex items-center gap-1 bg-amber-400 text-amber-950 font-black text-xs px-2 py-0.5 rounded-xl border-2 border-amber-500 shadow-xs animate-pulse">
              <FlameVector size={13} />
              <span>{streak} Streak!</span>
            </div>
          )}

          <button
            onClick={() => {
              soundManager.playTap();
              onBackToTables();
            }}
            className="p-1.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl shadow-xs border-2 border-slate-300 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all flex items-center gap-1 font-black text-xs cursor-pointer"
            title="Back to Number Selection"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>
        </div>
      </header>

      {/* Prominent Equation Card */}
      <div className="relative z-10 w-full max-w-xl mx-auto my-1 flex flex-col items-center shrink-0">
        <div className="relative flex items-center justify-center gap-2 sm:gap-3 px-4 py-1.5 bg-emerald-100 dark:bg-slate-800 rounded-2xl border-2 sm:border-3 border-emerald-500 dark:border-emerald-600 shadow-xs font-black text-xl sm:text-3xl text-slate-900 dark:text-slate-100 font-['Fredoka',sans-serif]">
          <span className="text-emerald-800 dark:text-emerald-400">{currentQ.num1}</span>
          <span className="text-amber-600 dark:text-amber-400">×</span>
          <span className="text-indigo-700 dark:text-indigo-400">{currentQ.num2}</span>
          <span className="text-slate-500 dark:text-slate-400">=</span>
          <span
            className={`min-w-[50px] sm:min-w-[65px] text-center px-2 py-0.5 rounded-xl border-2 shadow-inner ${
              selectedOption !== null
                ? isLastAnswerCorrect
                  ? 'bg-emerald-500 text-white border-emerald-600 animate-bounce'
                  : 'bg-rose-500 text-white border-rose-600'
                : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-300 dark:border-slate-700'
            }`}
          >
            {selectedOption !== null ? selectedOption : '?'}
          </span>
        </div>

        {/* Hint toggle */}
        <button
          onClick={() => {
            soundManager.playTap();
            setShowHelperHint(!showHelperHint);
          }}
          className="mt-1 text-[10px] sm:text-xs font-black text-indigo-700 dark:text-indigo-300 flex items-center gap-1 bg-indigo-50 dark:bg-slate-800 px-3 py-0.5 rounded-full border border-indigo-300 dark:border-slate-700 hover:bg-indigo-100 transition-colors cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{showHelperHint ? 'Hide Visual Model' : 'Show Visual Model'}</span>
        </button>

        {showHelperHint && (
          <div className="w-full max-w-lg mt-1 animate-fadeIn">
            <MathVisualizer
              table={currentQ.table}
              multiplier={currentQ.multiplier}
              answer={currentQ.answer}
            />
          </div>
        )}
      </div>

      {/* Main Interactive Game Stage with Realistic Animations & Full Day/Night Mode */}
      <main className="relative z-10 flex-1 w-full max-w-5xl mx-auto my-1 min-h-[220px] rounded-2xl overflow-hidden shadow-md border-2 border-slate-300 dark:border-slate-700 flex flex-col justify-between shrink-0">
        {/* GAME STAGE 1: CATCH A FISH */}
        {mode === 'fish' && (
          <FishingStage
            question={currentQ}
            selectedOption={selectedOption}
            fishingTarget={fishingTarget}
            isLocked={isLocked}
            onSelectOption={handleSelectAnswer}
            isLastAnswerCorrect={isLastAnswerCorrect}
          />
        )}

        {/* GAME STAGE 2: BUTTERFLY CATCH */}
        {mode === 'butterfly' && (
          <div className="relative w-full h-full min-h-[220px] bg-gradient-to-b from-sky-200 via-emerald-100 to-emerald-300 dark:from-slate-950 dark:via-indigo-950 dark:to-emerald-950 overflow-hidden flex flex-col justify-between p-2">
            {/* Day Sun / Night Moon */}
            <div className="absolute top-1 right-2 pointer-events-none z-10">
              <div className="dark:hidden animate-pulse">
                <SunVector size={36} />
              </div>
              <div className="hidden dark:block animate-pulse">
                <MoonVector size={40} />
              </div>
            </div>

            <div className="absolute top-2 left-4 pointer-events-none opacity-85 dark:opacity-30">
              <CloudVector size={42} />
            </div>

            {/* Night Fireflies & Stars */}
            <div className="hidden dark:block absolute inset-0 pointer-events-none">
              <div className="absolute top-4 left-1/3 animate-pulse"><StarVector size={12} fill="#fde047" /></div>
              <div className="absolute top-8 left-12 animate-ping delay-500"><div className="w-2 h-2 bg-emerald-300 rounded-full shadow-[0_0_8px_#34d399]"></div></div>
              <div className="absolute top-12 right-1/4 animate-pulse delay-700"><div className="w-2 h-2 bg-yellow-200 rounded-full shadow-[0_0_8px_#fde047]"></div></div>
            </div>

            {/* Grass & Flowers Meadow Foreground */}
            <div className="absolute -bottom-2 inset-x-0 h-8 bg-emerald-400/80 dark:bg-emerald-900/60 rounded-t-3xl pointer-events-none flex justify-around items-end px-4 pb-1">
              <FlowerVector size={16} variant={0} className="animate-bounce" />
              <FlowerVector size={13} variant={1} />
              <FlowerVector size={16} variant={2} className="animate-bounce delay-300" />
              <FlowerVector size={13} variant={0} />
              <FlowerVector size={16} variant={1} className="animate-bounce delay-700" />
            </div>

            <div className="relative z-10 grid grid-cols-4 gap-2 my-auto w-full max-w-2xl mx-auto">
              {currentQ.options.map((opt, idx) => {
                const isNetCaught = netTarget === opt;

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(opt)}
                    disabled={isLocked}
                    className={`group relative flex flex-col items-center justify-center p-1 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer ${
                      isNetCaught ? 'animate-bounce scale-110' : 'animate-butterflyDrift'
                    }`}
                    style={{ animationDelay: `${idx * 0.6}s` }}
                  >
                    <div className="relative flex flex-col items-center">
                      <div className="animate-wingFlap" style={{ animationDelay: `${idx * 0.2}s` }}>
                        <ButterflyVector size={54} variant={idx % 4} className="transform group-hover:rotate-6 transition-transform" />
                      </div>
                      <div className="mt-0.5 px-2.5 py-0.5 bg-white/95 dark:bg-slate-900/95 text-slate-950 dark:text-white rounded-full font-black text-xs sm:text-sm border-2 border-purple-400 dark:border-purple-500 shadow-xs">
                        {opt}
                      </div>
                    </div>

                    {isNetCaught && (
                      <div className="absolute inset-0 flex items-center justify-center animate-ping pointer-events-none">
                        <ButterflyCatcherVector size={65} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* GAME STAGE 3: POP THE BALLOON */}
        {mode === 'balloon' && (
          <div className="relative w-full h-full min-h-[220px] bg-gradient-to-b from-sky-300 via-indigo-100 to-pink-200 dark:from-slate-950 dark:via-purple-950 dark:to-indigo-950 overflow-hidden flex flex-col justify-between p-2">
            {/* Day Sun / Night Moon */}
            <div className="absolute top-1 right-2 pointer-events-none z-10">
              <div className="dark:hidden animate-pulse">
                <SunVector size={36} />
              </div>
              <div className="hidden dark:block animate-pulse">
                <MoonVector size={40} />
              </div>
            </div>

            <div className="absolute top-2 left-4 pointer-events-none opacity-80 dark:opacity-25">
              <CloudVector size={42} />
            </div>

            {/* Night Stars */}
            <div className="hidden dark:block absolute inset-0 pointer-events-none">
              <div className="absolute top-3 left-1/4 animate-pulse"><StarVector size={13} fill="#fde047" /></div>
              <div className="absolute top-6 right-1/3 animate-pulse delay-400"><StarVector size={11} fill="#a5f3fc" /></div>
            </div>

            <div className="relative z-10 grid grid-cols-4 gap-2 my-auto w-full max-w-2xl mx-auto">
              {currentQ.options.map((opt, idx) => {
                const isPopped = balloonPopped === opt;

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(opt)}
                    disabled={isLocked}
                    className="group relative flex flex-col items-center justify-center p-1 cursor-pointer transition-all transform hover:scale-110 active:scale-95"
                  >
                    {isPopped ? (
                      <div className="animate-ping">
                        <BalloonBurstVector size={54} />
                      </div>
                    ) : (
                      <div
                        className="relative flex flex-col items-center animate-balloonBob"
                        style={{ animationDelay: `${idx * 0.5}s` }}
                      >
                        <BalloonVector size={52} variant={idx % 4} className="transform group-hover:rotate-3 transition-transform" />
                        <span className="absolute inset-0 flex items-center justify-center text-white font-black text-sm sm:text-base drop-shadow-[0_2px_3px_rgba(0,0,0,0.85)] -mt-2">
                          {opt}
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* GAME STAGE 4: FRUIT HARVEST */}
        {mode === 'harvest' && (
          <div className="relative w-full h-full min-h-[220px] bg-gradient-to-b from-sky-200 via-amber-50 to-emerald-200 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950 overflow-hidden flex flex-col justify-between p-2">
            {/* Day Sun / Night Moon */}
            <div className="absolute top-1 right-2 pointer-events-none z-10">
              <div className="dark:hidden animate-pulse">
                <SunVector size={36} />
              </div>
              <div className="hidden dark:block animate-pulse">
                <MoonVector size={40} />
              </div>
            </div>

            {/* Tree Branch Header */}
            <div className="w-full text-center text-xs font-black text-amber-900 dark:text-amber-200 bg-amber-200/70 dark:bg-amber-950/70 py-0.5 rounded-full mb-1 border border-amber-300 dark:border-amber-800 flex items-center justify-center gap-1.5">
              <AppleVector size={16} />
              <span>Shake & Harvest the Correct Apple!</span>
            </div>

            <div className="relative z-10 grid grid-cols-4 gap-2 my-auto w-full max-w-2xl mx-auto">
              {currentQ.options.map((opt, idx) => {
                const isHarvested = harvestedApple === opt;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(opt)}
                    disabled={isLocked}
                    className={`group relative flex flex-col items-center justify-center p-1 cursor-pointer transition-all transform hover:scale-110 active:scale-95 ${
                      isHarvested ? 'animate-appleFall' : 'animate-appleSway'
                    }`}
                    style={{ animationDelay: `${idx * 0.4}s` }}
                  >
                    <div className="relative">
                      <AppleVector size={48} className="transform group-hover:rotate-6 transition-transform" />
                      <span className="absolute inset-0 flex items-center justify-center text-white font-black text-sm sm:text-base drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] pt-1">
                        {opt}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Picnic Basket at bottom */}
            <div className="w-full flex justify-center pb-1">
              <div className="px-4 py-1 bg-amber-700 dark:bg-amber-900 text-amber-100 rounded-full font-black text-xs border-2 border-amber-800 dark:border-amber-700 shadow-sm flex items-center gap-1.5">
                <BasketVector size={18} />
                <span>Orchard Basket</span>
              </div>
            </div>
          </div>
        )}

        {/* GAME STAGE 5: ROCKET BLAST */}
        {mode === 'rocket' && (
          <div className="relative w-full h-full min-h-[220px] bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900 dark:from-black dark:via-indigo-950 dark:to-slate-950 overflow-hidden flex flex-col justify-between p-2">
            {/* Stars background */}
            <div className="absolute inset-0 pointer-events-none opacity-60">
              <div className="absolute top-3 left-10 w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
              <div className="absolute top-8 right-20 w-2 h-2 bg-yellow-200 rounded-full animate-pulse"></div>
              <div className="absolute bottom-10 left-1/4 w-1 h-1 bg-cyan-300 rounded-full"></div>
              <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-pink-300 rounded-full animate-pulse"></div>
            </div>

            {/* Rocket Center Visual */}
            <div
              className={`relative flex items-center justify-center my-1 transition-all ${
                rocketBlast ? 'animate-rocketBlastoff' : 'animate-rocketHover'
              }`}
            >
              <RocketVector size={64} />
            </div>

            {/* Planet Answer Options */}
            <div className="relative z-10 grid grid-cols-4 gap-2 mb-2 px-2 w-full max-w-2xl mx-auto">
              {currentQ.options.map((opt, idx) => {
                const isAnswer = opt === currentQ.answer;
                const isChosen = selectedOption === opt;
                const planetColors = [
                  'from-purple-500 to-indigo-600 border-purple-400',
                  'from-cyan-500 to-blue-600 border-cyan-400',
                  'from-emerald-500 to-teal-600 border-emerald-400',
                  'from-amber-500 to-orange-600 border-amber-400',
                ];

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(opt)}
                    disabled={isLocked}
                    className={`group relative flex flex-col items-center justify-center p-2 rounded-2xl bg-gradient-to-b ${planetColors[idx % 4]} border-2 shadow-md transition-all transform hover:scale-105 active:scale-95 cursor-pointer ${
                      isChosen ? (isAnswer ? 'ring-4 ring-emerald-300 scale-110' : 'ring-4 ring-rose-400') : ''
                    }`}
                  >
                    <div className="text-white font-black text-base sm:text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      {opt}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* GAME STAGE 6: SPEED QUIZ */}
        {mode === 'quiz' && (
          <div className="relative w-full h-full min-h-[220px] bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950 flex flex-col items-center justify-center p-2 sm:p-3">
            <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full max-w-xl">
              {currentQ.options.map((opt, idx) => {
                const isAnswer = opt === currentQ.answer;
                const isChosen = selectedOption === opt;

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(opt)}
                    disabled={isLocked}
                    className={`group relative flex items-center justify-between p-2 sm:p-3 rounded-xl border-2 shadow-xs transition-all transform hover:scale-[1.02] active:scale-95 cursor-pointer ${
                      isChosen
                        ? isAnswer
                          ? 'bg-emerald-500 text-white border-emerald-600 ring-4 ring-emerald-400'
                          : 'bg-rose-500 text-white border-rose-600 ring-4 ring-rose-400'
                        : 'bg-white dark:bg-slate-800 text-slate-950 dark:text-slate-100 border-purple-300 dark:border-purple-700 hover:border-purple-500'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 font-black text-xs flex items-center justify-center">
                        {['A', 'B', 'C', 'D'][idx]}
                      </div>
                      <span className="font-black text-base sm:text-xl text-slate-950 dark:text-white">{opt}</span>
                    </div>

                    <div className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center opacity-90">
                      {isChosen ? (
                        isAnswer ? <Check className="w-3 h-3 stroke-[3]" /> : <X className="w-3 h-3 stroke-[3]" />
                      ) : (
                        <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* GAME STAGE 7: MEMORY MATCH */}
        {mode === 'match' && (
          <div className="relative w-full h-full min-h-[220px] bg-gradient-to-br from-violet-100 via-indigo-50 to-pink-100 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-950 flex flex-col items-center justify-center p-2">
            <div className="mb-2 text-center shrink-0">
              <div className="flex items-center justify-center gap-1 text-xs font-black text-indigo-700 dark:text-indigo-300">
                <CardsMatchVector size={24} />
                <span>Find the card matching the multiplication fact!</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 w-full max-w-xl">
              {currentQ.options.map((opt, idx) => {
                const isAnswer = opt === currentQ.answer;
                const isChosen = selectedOption === opt;

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(opt)}
                    disabled={isLocked}
                    className={`group relative aspect-4/3 flex flex-col items-center justify-center p-2 rounded-2xl border-3 shadow-md transition-all transform hover:scale-105 active:scale-95 cursor-pointer ${
                      isChosen
                        ? isAnswer
                          ? 'bg-emerald-500 text-white border-emerald-300 ring-4 ring-emerald-400 scale-105'
                          : 'bg-rose-500 text-white border-rose-300 ring-4 ring-rose-400'
                        : 'bg-gradient-to-b from-indigo-500 to-purple-600 text-white border-indigo-300 dark:border-indigo-400 hover:from-indigo-600 hover:to-purple-700'
                    }`}
                  >
                    <div className="w-full flex items-center justify-between text-[10px] opacity-75 px-1 font-black">
                      <span>CARD</span>
                      <span>#{idx + 1}</span>
                    </div>

                    <div className="my-auto text-2xl font-black drop-shadow-md">
                      {opt}
                    </div>

                    <div className="text-[9px] font-extrabold uppercase tracking-wider opacity-90">
                      {isChosen && isAnswer ? 'CORRECT MATCH!' : 'TAP TO MATCH'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* FEEDBACK POPUP DIALOG */}
      {showFeedback && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-3 animate-fadeIn">
          <div className="w-full max-w-md max-h-[92vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl border-4 border-amber-400 dark:border-amber-500 shadow-2xl p-4 flex flex-col items-center text-center animate-scaleUp">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 flex items-center justify-center mb-2">
              <StarVector size={32} fill="#f59e0b" />
            </div>

            <h3 className="text-xl font-black text-slate-950 dark:text-white font-['Fredoka',sans-serif]">
              Let's Learn Together!
            </h3>

            <p className="text-xs text-slate-700 dark:text-slate-300 my-1">
              Look at this helper model to see why the answer is{' '}
              <strong className="text-emerald-600 dark:text-emerald-400 text-sm font-black">
                {currentQ.answer}
              </strong>
              :
            </p>

            <div className="w-full my-2">
              <MathVisualizer
                table={currentQ.table}
                multiplier={currentQ.multiplier}
                answer={currentQ.answer}
              />
            </div>

            <button
              onClick={handleContinue}
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-black text-sm sm:text-base rounded-xl shadow-md active:scale-95 transition-all cursor-pointer mt-1 flex items-center justify-center gap-1.5"
            >
              <span>Got It! Next Question</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* PAUSE MODAL */}
      {isPaused && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-5 border-4 border-amber-300 dark:border-slate-700 shadow-2xl flex flex-col items-center text-center animate-scaleUp">
            <h3 className="text-2xl font-black text-slate-950 dark:text-white font-['Fredoka',sans-serif] mb-4">
              Game Paused
            </h3>

            <div className="flex flex-col gap-2.5 w-full">
              <button
                onClick={() => {
                  soundManager.playTap();
                  setIsPaused(false);
                }}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-black rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Resume Play</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playTap();
                  onBackToTables();
                }}
                className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white font-black rounded-xl shadow-md cursor-pointer active:scale-95 transition-all"
              >
                Change Times Table
              </button>

              <button
                onClick={() => {
                  soundManager.playTap();
                  onGoHome();
                }}
                className="w-full py-2.5 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-200 font-black rounded-xl border border-slate-300 dark:border-slate-700 cursor-pointer active:scale-95 transition-all"
              >
                Exit to Main Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
