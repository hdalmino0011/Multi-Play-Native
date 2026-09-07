import React, { useState, useEffect, useRef } from 'react';
import { Question } from '../types';
import { soundManager } from '../utils/audio';
import {
  FishVector,
  FishermanBoatVector,
  SunVector,
  MoonVector,
  CloudVector,
  StarVector,
} from './illustrations/VectorGraphics';
import { Sparkles } from 'lucide-react';

interface FishingStageProps {
  question: Question;
  selectedOption: number | null;
  fishingTarget: number | null;
  isLocked: boolean;
  onSelectOption: (option: number) => void;
  isLastAnswerCorrect: boolean | null;
}

interface Point {
  x: number;
  y: number;
}

export const FishingStage: React.FC<FishingStageProps> = ({
  question,
  selectedOption,
  fishingTarget,
  isLocked,
  onSelectOption,
  isLastAnswerCorrect,
}) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const boatRef = useRef<HTMLDivElement>(null);
  const fishRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Animation phase:
  // 'idle': bobber floating in water, gentle line
  // 'casting': rod whips, hook shoots to target fish
  // 'hooked': hook latches onto fish, fish struggles, line taut
  // 'reeling': rod bent, hook and fish pulled up towards boat
  // 'caught': fish drops into boat bucket, celebration
  // 'escaped': wrong answer, fish slips off hook and swims away
  const [phase, setPhase] = useState<'idle' | 'casting' | 'hooked' | 'reeling' | 'caught' | 'escaped'>('idle');
  const [activeFishIdx, setActiveFishIdx] = useState<number | null>(null);

  // Measured coordinates relative to stage container
  const [rodTip, setRodTip] = useState<Point>({ x: 95, y: 15 });
  const [bucketPos, setBucketPos] = useState<Point>({ x: 45, y: 55 });
  const [hookPos, setHookPos] = useState<Point>({ x: 115, y: 85 });
  const [fishCoords, setFishCoords] = useState<Point[]>([]);
  const [reelProgress, setReelProgress] = useState<number>(0);

  // Bobber idle movement
  const [bobberYOffset, setBobberYOffset] = useState<number>(0);

  // Splash particles for realistic water impacts
  const [splashes, setSplashes] = useState<{ id: number; x: number; y: number; size: number }[]>([]);

  // Update layout coordinates on mount & resize
  const measureCoords = () => {
    if (!stageRef.current) return;
    const stageRect = stageRef.current.getBoundingClientRect();

    if (boatRef.current) {
      const boatRect = boatRef.current.getBoundingClientRect();
      const tipX = boatRect.left - stageRect.left + boatRect.width * (148 / 160);
      const tipY = boatRect.top - stageRect.top + boatRect.height * (12 / 120);
      const bX = boatRect.left - stageRect.left + boatRect.width * 0.28;
      const bY = boatRect.top - stageRect.top + boatRect.height * 0.62;

      setRodTip({ x: tipX, y: tipY });
      setBucketPos({ x: bX, y: bY });

      if (phase === 'idle') {
        setHookPos({ x: tipX + 18, y: tipY + 68 });
      }
    }

    const coords: Point[] = [];
    fishRefs.current.forEach((ref) => {
      if (ref) {
        const r = ref.getBoundingClientRect();
        coords.push({
          x: r.left - stageRect.left + r.width / 2,
          y: r.top - stageRect.top + r.height / 2,
        });
      }
    });
    setFishCoords(coords);
  };

  useEffect(() => {
    measureCoords();
    const handleResize = () => measureCoords();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [question]);

  // Idle water bobbing animation
  useEffect(() => {
    if (phase !== 'idle') return;
    let animId: number;
    const startTime = Date.now();

    const loop = () => {
      const elapsed = Date.now() - startTime;
      const offset = Math.sin(elapsed / 320) * 4;
      setBobberYOffset(offset);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // Handle User Click on Fish
  const handleFishClick = (opt: number, idx: number) => {
    if (isLocked || phase !== 'idle') return;
    setActiveFishIdx(idx);
    measureCoords();
    onSelectOption(opt);
  };

  // Trigger Fishing Sequence when fishingTarget changes
  useEffect(() => {
    if (fishingTarget === null) {
      setPhase('idle');
      setActiveFishIdx(null);
      setReelProgress(0);
      return;
    }

    const idx = question.options.indexOf(fishingTarget);
    if (idx === -1) return;
    setActiveFishIdx(idx);

    // Get exact fish target coordinate
    let targetX = rodTip.x + 120;
    let targetY = 180;
    if (fishRefs.current[idx] && stageRef.current) {
      const sRect = stageRef.current.getBoundingClientRect();
      const fRect = fishRefs.current[idx]!.getBoundingClientRect();
      targetX = fRect.left - sRect.left + fRect.width / 2;
      targetY = fRect.top - sRect.top + fRect.height / 2;
    }

    // === 1. CASTING PHASE (0ms -> 280ms) ===
    setPhase('casting');
    soundManager.playCast();

    // Hook travels down
    const castStartTime = performance.now();
    const startX = rodTip.x;
    const startY = rodTip.y;
    const endX = targetX;
    const endY = targetY - 14;

    let animFrame: number;
    const castLoop = (now: number) => {
      const elapsed = now - castStartTime;
      const p = Math.min(1, elapsed / 280);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - p, 3);
      setHookPos({
        x: startX + (endX - startX) * ease,
        y: startY + (endY - startY) * ease,
      });

      if (p < 1) {
        animFrame = requestAnimationFrame(castLoop);
      }
    };
    animFrame = requestAnimationFrame(castLoop);

    // === 2. HOOKED PHASE (at 280ms) ===
    const hookTimer = setTimeout(() => {
      setPhase('hooked');
      setHookPos({ x: endX, y: endY });
      soundManager.playSplash();

      // Trigger water splash at fish position
      setSplashes((prev) => [
        ...prev,
        { id: Date.now(), x: endX, y: targetY, size: 40 },
      ]);

      // === 3. REELING / RESOLUTION PHASE (at 600ms) ===
      const reelTimer = setTimeout(() => {
        const isCorrect = isLastAnswerCorrect ?? (fishingTarget === question.answer);

        if (isCorrect) {
          // Reeling In Success
          setPhase('reeling');
          soundManager.playReel();

          const reelStartTime = performance.now();
          const reelLoop = (now: number) => {
            const elapsed = now - reelStartTime;
            const progress = Math.min(1, elapsed / 600);
            const ease = progress * progress * (3 - 2 * progress); // smoothstep
            setReelProgress(ease);

            // Interpolate hook from fish location up to bucket
            const curX = endX + (bucketPos.x - endX) * ease;
            const curY = endY + (bucketPos.y - endY) * ease;
            setHookPos({ x: curX, y: curY });

            if (progress < 1) {
              animFrame = requestAnimationFrame(reelLoop);
            } else {
              // CAUGHT IN BOAT!
              setPhase('caught');
              soundManager.playSplash();
              setSplashes((prev) => [
                ...prev,
                { id: Date.now() + 1, x: bucketPos.x, y: bucketPos.y, size: 30 },
              ]);
            }
          };
          animFrame = requestAnimationFrame(reelLoop);
        } else {
          // ESCAPED! (Wrong answer)
          setPhase('escaped');
          soundManager.playSplash();
          // Hook snaps up slightly
          setHookPos({ x: endX, y: endY - 45 });
          setSplashes((prev) => [
            ...prev,
            { id: Date.now() + 2, x: endX, y: targetY, size: 50 },
          ]);
        }
      }, 340);

      return () => clearTimeout(reelTimer);
    }, 280);

    return () => {
      cancelAnimationFrame(animFrame);
      clearTimeout(hookTimer);
    };
  }, [fishingTarget, isLastAnswerCorrect, question]);

  // SVG Line Calculation
  const getFishingLinePath = (): string => {
    const startX = rodTip.x;
    const startY = rodTip.y;
    const curHookX = hookPos.x;
    const curHookY = hookPos.y + (phase === 'idle' ? bobberYOffset : 0);

    if (phase === 'idle') {
      // Gentle hanging slack line
      const midX = (startX + curHookX) / 2 + 5;
      const midY = (startY + curHookY) / 2 + 10;
      return `M ${startX} ${startY} Q ${midX} ${midY} ${curHookX} ${curHookY}`;
    }

    if (phase === 'casting') {
      // Sweeping cast loop
      const midX = (startX + curHookX) / 2 + 15;
      const midY = Math.min(startY, curHookY) - 15;
      return `M ${startX} ${startY} Q ${midX} ${midY} ${curHookX} ${curHookY}`;
    }

    if (phase === 'hooked' || phase === 'reeling') {
      // Taut line with subtle curve under tension
      const midX = (startX + curHookX) / 2 - 8;
      const midY = (startY + curHookY) / 2 - 4;
      return `M ${startX} ${startY} Q ${midX} ${midY} ${curHookX} ${curHookY}`;
    }

    // Escaped / snaps back
    const midX = (startX + curHookX) / 2;
    const midY = (startY + curHookY) / 2;
    return `M ${startX} ${startY} Q ${midX} ${midY} ${curHookX} ${curHookY}`;
  };

  // Fisherman expressions & rod bending based on phase
  const fishermanExpression =
    phase === 'caught' ? 'happy' : phase === 'escaped' ? 'surprised' : 'normal';
  const rodTension =
    phase === 'casting' ? 'cast' : phase === 'reeling' || phase === 'hooked' ? 'reel' : 'idle';

  return (
    <div
      ref={stageRef}
      className="relative w-full h-full min-h-[240px] sm:min-h-[270px] bg-gradient-to-b from-sky-300 via-sky-400 to-teal-700 dark:from-slate-950 dark:via-indigo-950 dark:to-cyan-950 overflow-hidden flex flex-col justify-between select-none"
    >
      {/* Day Sun / Night Moon with Twinkling Stars */}
      <div className="absolute top-1 right-2 pointer-events-none z-10">
        <div className="dark:hidden animate-pulse">
          <SunVector size={36} />
        </div>
        <div className="hidden dark:block animate-pulse">
          <MoonVector size={40} />
        </div>
      </div>

      {/* Clouds / Night Clouds */}
      <div className="absolute top-2 left-4 pointer-events-none opacity-80 dark:opacity-30">
        <CloudVector size={42} />
      </div>

      {/* Night Stars on Water Sky */}
      <div className="hidden dark:block absolute inset-0 pointer-events-none">
        <div className="absolute top-2 left-1/4 animate-pulse">
          <StarVector size={12} fill="#fde047" />
        </div>
        <div className="absolute top-4 right-1/3 animate-pulse delay-500">
          <StarVector size={10} fill="#a5f3fc" />
        </div>
        <div className="absolute top-6 left-12 animate-ping delay-300">
          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
        </div>
      </div>

      {/* Floating Water Waves and Ripples */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-10 w-8 h-8 rounded-full border-2 border-white/30 dark:border-cyan-300/40 animate-ripple"></div>
        <div className="absolute top-1/3 right-16 w-12 h-12 rounded-full border-2 border-white/20 dark:border-cyan-300/30 animate-ripple delay-500"></div>
        <div className="absolute bottom-6 left-1/3 w-6 h-6 rounded-full border-2 border-white/30 dark:border-cyan-300/40 animate-ripple delay-300"></div>
      </div>

      {/* Water Surface Shimmer Line */}
      <div className="absolute top-16 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"></div>

      {/* Boat & Fisherman with Dynamic Animated Rod */}
      <div
        ref={boatRef}
        className="absolute top-1 left-2 sm:left-4 z-20 transition-transform duration-300"
      >
        <FishermanBoatVector
          size={78}
          showStaticLine={false}
          rodTension={rodTension}
          expression={fishermanExpression}
        />
      </div>

      {/* ========================================================================= */}
      {/* DYNAMIC SVG FISHING LINE & HOOK OVERLAY                                   */}
      {/* ========================================================================= */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-visible">
        {/* Glow behind line */}
        <path
          d={getFishingLinePath()}
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Dynamic High-Contrast Fishing Line */}
        <path
          d={getFishingLinePath()}
          stroke="#f8fafc"
          strokeWidth="1.8"
          strokeDasharray={phase === 'hooked' || phase === 'reeling' ? 'none' : '4 2'}
          fill="none"
          strokeLinecap="round"
        />

        {/* IDLE FLOATING BOBBER ON WATER */}
        {phase === 'idle' && (
          <g transform={`translate(${hookPos.x}, ${hookPos.y + bobberYOffset})`}>
            {/* Water ring under bobber */}
            <ellipse cx="0" cy="8" rx="8" ry="3" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" className="animate-ping" />
            {/* Bobber sphere */}
            <circle cx="0" cy="0" r="6" fill="#ef4444" />
            <path d="M -6 0 A 6 6 0 0 0 6 0 Z" fill="#ffffff" />
            <circle cx="-2" cy="-2" r="1.5" fill="#ffffff" opacity="0.8" />
            <line x1="0" y1="-8" x2="0" y2="0" stroke="#f8fafc" strokeWidth="1.5" />
            {/* Small submerged hook */}
            <path d="M 0 0 L 0 10 Q -3 14 -5 10" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
          </g>
        )}

        {/* ACTIVE METALLIC FISHING HOOK */}
        {phase !== 'idle' && (
          <g
            transform={`translate(${hookPos.x}, ${hookPos.y})`}
            className="transition-transform duration-75"
          >
            {/* Hook Shank & Curved Barb */}
            <path
              d="M 0 -2 L 0 12 C 0 18 -8 18 -8 12 C -8 8 -3 8 -3 10"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="2.8"
              strokeLinecap="round"
              className="drop-shadow-sm"
            />
            {/* Shiny Barb Tip */}
            <path d="M -8 12 L -5 9" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
            {/* Sinker weight */}
            <ellipse cx="0" cy="2" rx="2.5" ry="3.5" fill="#475569" stroke="#94a3b8" strokeWidth="1" />
          </g>
        )}

        {/* Dynamic Water Splash Particles */}
        {splashes.map((s) => (
          <g key={s.id} transform={`translate(${s.x}, ${s.y})`} className="animate-ping">
            <circle cx="0" cy="0" r={s.size * 0.4} fill="none" stroke="#67e8f9" strokeWidth="2.5" />
            <circle cx="0" cy="0" r={s.size * 0.7} fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
            <circle cx="-12" cy="-10" r="2.5" fill="#e0f2fe" />
            <circle cx="14" cy="-8" r="2" fill="#e0f2fe" />
            <circle cx="4" cy="-16" r="3" fill="#ffffff" />
          </g>
        ))}
      </svg>

      {/* ========================================================================= */}
      {/* REELED FISH IN MID-AIR (FOLLOWS HOOK DIRECTLY TO BOAT)                   */}
      {/* ========================================================================= */}
      {(phase === 'reeling' || phase === 'hooked') && activeFishIdx !== null && (
        <div
          className="absolute z-35 pointer-events-none transition-transform duration-75"
          style={{
            left: `${hookPos.x - 30}px`,
            top: `${hookPos.y}px`,
          }}
        >
          <div
            className={`relative flex items-center justify-center ${
              phase === 'hooked' ? 'animate-wiggle' : 'animate-pulse'
            }`}
            style={{
              transform: `rotate(${phase === 'hooked' ? 25 : 45}deg) scale(${
                1 + Math.sin(reelProgress * Math.PI) * 0.2
              })`,
            }}
          >
            <FishVector
              size={54}
              variant={activeFishIdx % 4}
              className="drop-shadow-lg filter"
            />
            <span className="absolute inset-0 flex items-center justify-center text-slate-950 font-black text-base sm:text-lg drop-shadow-[0_1px_2px_rgba(255,255,255,0.95)] pr-1">
              {question.options[activeFishIdx]}
            </span>

            {/* Droplets dripping from fish */}
            <div className="absolute -bottom-2 left-4 w-1.5 h-2 bg-sky-200 rounded-full animate-ping"></div>
            <div className="absolute -bottom-4 left-6 w-1 h-1.5 bg-white rounded-full animate-bounce"></div>
          </div>
        </div>
      )}

      {/* ESCAPED FISH SWIMMING AWAY DOWNWARDS */}
      {phase === 'escaped' && activeFishIdx !== null && (
        <div
          className="absolute z-35 pointer-events-none transition-all duration-700 ease-out"
          style={{
            left: `${hookPos.x - 50}px`,
            top: `${hookPos.y + 60}px`,
            opacity: 0.4,
            transform: 'scale(0.85) rotate(-35deg)',
          }}
        >
          <FishVector size={48} variant={activeFishIdx % 4} />
          <span className="absolute -top-4 -right-2 text-yellow-300 font-bold text-xs">
            Splash!
          </span>
        </div>
      )}

      {/* CAUGHT BANNER AT THE BOAT */}
      {phase === 'caught' && (
        <div
          className="absolute z-40 flex items-center gap-1.5 px-3 py-1 bg-amber-400 text-amber-950 font-black text-xs sm:text-sm rounded-full shadow-lg border-2 border-amber-500 animate-bounce"
          style={{
            left: `${bucketPos.x - 10}px`,
            top: `${bucketPos.y - 30}px`,
          }}
        >
          <Sparkles className="w-4 h-4 fill-current text-amber-900" />
          <span>CAUGHT!</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* INTERACTIVE FISH SCHOOL (BOTTOM ROW)                                      */}
      {/* ========================================================================= */}
      <div className="relative z-10 grid grid-cols-4 gap-2 mt-auto mb-2 px-2 sm:px-4 w-full max-w-2xl mx-auto">
        {question.options.map((opt, idx) => {
          const isAnswer = opt === question.answer;
          const isChosen = selectedOption === opt;
          const isBeingReeled = activeFishIdx === idx && (phase === 'reeling' || phase === 'caught');
          const isTarget = fishingTarget === opt;

          return (
            <button
              key={idx}
              ref={(el) => {
                fishRefs.current[idx] = el;
              }}
              onClick={() => handleFishClick(opt, idx)}
              disabled={isLocked}
              className={`group relative flex flex-col items-center justify-center p-1 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer ${
                isTarget && phase === 'hooked'
                  ? 'animate-wiggle'
                  : 'animate-swim'
              } ${
                isChosen
                  ? isAnswer
                    ? 'ring-4 ring-emerald-400 bg-emerald-400/30'
                    : 'ring-4 ring-rose-400 bg-rose-400/30'
                  : 'hover:bg-white/20 dark:hover:bg-cyan-900/30'
              } ${isBeingReeled ? 'opacity-0 scale-50' : 'opacity-100'}`}
              style={{ animationDelay: `${idx * 0.45}s` }}
            >
              <div className="relative">
                <FishVector
                  size={54}
                  variant={idx % 4}
                  className="transform group-hover:scale-110 transition-transform"
                />
                <span className="absolute inset-0 flex items-center justify-center text-slate-950 font-black text-base sm:text-lg drop-shadow-[0_1px_2px_rgba(255,255,255,0.95)] pr-1">
                  {opt}
                </span>
              </div>

              {/* Water bubbling ring at the fish slot */}
              {isTarget && phase === 'hooked' && (
                <div className="absolute -top-7 flex items-center gap-1 text-yellow-300 font-black text-xs animate-bounce bg-slate-900/70 px-2 py-0.5 rounded-full border border-yellow-400/60 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 fill-current text-yellow-400" />
                  <span>HOOKED!</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
