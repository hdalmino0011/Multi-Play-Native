import React from 'react';

// Crisp, scalable pure SVG/CSS Vector Illustrations for Multi Play!

export const FishVector: React.FC<{
  className?: string;
  variant?: 0 | 1 | 2 | 3 | number;
  size?: number;
}> = ({ className = '', variant = 0, size = 64 }) => {
  const colors = [
    { body: '#0ea5e9', belly: '#bae6fd', fin: '#0284c7', tail: '#0369a1', eye: '#0f172a' },
    { body: '#f97316', belly: '#ffedd5', fin: '#ea580c', tail: '#c2410c', eye: '#0f172a' },
    { body: '#a855f7', belly: '#f3e8ff', fin: '#9333ea', tail: '#7e22ce', eye: '#0f172a' },
    { body: '#10b981', belly: '#d1fae5', fin: '#059669', tail: '#047857', eye: '#0f172a' },
  ];
  const c = colors[Math.abs(variant) % colors.length];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-md select-none ${className}`}
    >
      {/* Tail fin */}
      <path
        d="M25 50 C10 32 5 28 2 34 C6 44 14 50 14 50 C14 50 6 56 2 66 C5 72 10 68 25 50 Z"
        fill={c.tail}
      />
      {/* Dorsal fin */}
      <path d="M45 28 C55 12 70 20 75 32 Z" fill={c.fin} />
      {/* Ventral fin */}
      <path d="M48 72 C56 86 68 80 72 68 Z" fill={c.fin} />
      {/* Body */}
      <ellipse cx="58" cy="50" rx="34" ry="24" fill={c.body} />
      {/* Belly curve */}
      <path
        d="M32 54 C38 68 65 72 82 56 C70 70 42 68 32 54 Z"
        fill={c.belly}
        opacity="0.9"
      />
      {/* Pectoral Fin */}
      <path
        d="M48 50 C40 58 46 66 54 58 C52 52 50 50 48 50 Z"
        fill={c.fin}
      />
      {/* Eye */}
      <circle cx="76" cy="44" r="6.5" fill="#ffffff" />
      <circle cx="78" cy="44" r="3.5" fill={c.eye} />
      <circle cx="79.5" cy="42.5" r="1.2" fill="#ffffff" />
      {/* Smile */}
      <path
        d="M86 52 Q82 58 76 56"
        stroke="#0f172a"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Scales pattern */}
      <path
        d="M46 42 Q50 46 46 50 M56 38 Q60 42 56 46 M56 52 Q60 56 56 60"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
};

export const ButterflyVector: React.FC<{
  className?: string;
  variant?: 0 | 1 | 2 | 3 | number;
  size?: number;
}> = ({ className = '', variant = 0, size = 64 }) => {
  const palettes = [
    { top: '#c084fc', bottom: '#e879f9', accent: '#fef08a', body: '#581c87' },
    { top: '#60a5fa', bottom: '#38bdf8', accent: '#fef08a', body: '#1e3a8a' },
    { top: '#f472b6', bottom: '#fb7185', accent: '#fef08a', body: '#831843' },
    { top: '#fbbf24', bottom: '#f97316', accent: '#ffffff', body: '#78350f' },
  ];
  const p = palettes[Math.abs(variant) % palettes.length];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-md select-none ${className}`}
    >
      {/* Left Top Wing */}
      <path
        d="M48 46 C40 16 10 16 16 44 C20 54 36 54 48 48 Z"
        fill={p.top}
      />
      <circle cx="30" cy="36" r="6" fill={p.accent} opacity="0.9" />

      {/* Right Top Wing */}
      <path
        d="M52 46 C60 16 90 16 84 44 C80 54 64 54 52 48 Z"
        fill={p.top}
      />
      <circle cx="70" cy="36" r="6" fill={p.accent} opacity="0.9" />

      {/* Left Bottom Wing */}
      <path
        d="M48 52 C38 56 22 62 26 78 C30 90 46 80 49 60 Z"
        fill={p.bottom}
      />
      <circle cx="36" cy="70" r="4" fill={p.accent} opacity="0.8" />

      {/* Right Bottom Wing */}
      <path
        d="M52 52 C62 56 78 62 74 78 C70 90 54 80 51 60 Z"
        fill={p.bottom}
      />
      <circle cx="64" cy="70" r="4" fill={p.accent} opacity="0.8" />

      {/* Antennae */}
      <path
        d="M48 30 Q44 18 36 20 M52 30 Q56 18 64 20"
        stroke={p.body}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="36" cy="20" r="2" fill={p.body} />
      <circle cx="64" cy="20" r="2" fill={p.body} />

      {/* Body */}
      <ellipse cx="50" cy="50" rx="4.5" ry="20" fill={p.body} />
      <circle cx="50" cy="30" r="5.5" fill={p.body} />
    </svg>
  );
};

export const BalloonVector: React.FC<{
  className?: string;
  variant?: 0 | 1 | 2 | 3 | number;
  size?: number;
}> = ({ className = '', variant = 0, size = 64 }) => {
  const colors = [
    { main: '#f43f5e', highlight: '#fda4af', knot: '#e11d48' },
    { main: '#8b5cf6', highlight: '#c4b5fd', knot: '#7c3aed' },
    { main: '#10b981', highlight: '#6ee7b7', knot: '#059669' },
    { main: '#f59e0b', highlight: '#fde68a', knot: '#d97706' },
  ];
  const c = colors[Math.abs(variant) % colors.length];

  return (
    <svg
      width={size}
      height={size * 1.25}
      viewBox="0 0 100 125"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-lg select-none ${className}`}
    >
      {/* Balloon string */}
      <path
        d="M50 92 Q42 105 52 118 T48 128"
        stroke="#94a3b8"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Knot */}
      <polygon points="46,88 54,88 52,94 48,94" fill={c.knot} />
      {/* Main Oval */}
      <path
        d="M50 8 C22 8 16 38 16 56 C16 78 40 88 50 88 C60 88 84 78 84 56 C84 38 78 8 50 8 Z"
        fill={c.main}
      />
      {/* 3D Highlight curve */}
      <path
        d="M32 20 C24 30 24 50 30 64"
        stroke={c.highlight}
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.75"
      />
      <circle cx="34" cy="18" r="3" fill="#ffffff" opacity="0.8" />
    </svg>
  );
};

export const BalloonBurstVector: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = '', size = 70 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
    >
      <polygon
        points="50,10 62,35 90,30 72,50 90,70 62,65 50,90 38,65 10,70 28,50 10,30 38,35"
        fill="#fbbf24"
      />
      <polygon
        points="50,22 58,40 78,36 66,50 78,64 58,60 50,78 42,60 22,64 34,50 22,36 42,40"
        fill="#ef4444"
      />
      <circle cx="50" cy="50" r="12" fill="#ffffff" />
      {/* Sparks */}
      <circle cx="20" cy="20" r="3" fill="#f59e0b" />
      <circle cx="80" cy="20" r="3" fill="#ec4899" />
      <circle cx="80" cy="80" r="3" fill="#3b82f6" />
      <circle cx="20" cy="80" r="3" fill="#10b981" />
    </svg>
  );
};

export const AppleVector: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = '', size = 64 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-md select-none ${className}`}
    >
      {/* Stem */}
      <path
        d="M50 28 Q52 12 62 10"
        stroke="#78350f"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Leaf */}
      <path
        d="M52 24 C64 16 76 22 72 32 C60 32 54 26 52 24 Z"
        fill="#22c55e"
      />
      {/* Apple Body */}
      <path
        d="M50 32 C42 22 16 22 16 52 C16 80 40 92 50 90 C60 92 84 80 84 52 C84 22 58 22 50 32 Z"
        fill="#ef4444"
      />
      {/* Shading/Highlights */}
      <path
        d="M30 38 C22 46 22 62 26 72"
        stroke="#fca5a5"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.8"
      />
      <circle cx="32" cy="34" r="2.5" fill="#ffffff" opacity="0.8" />
    </svg>
  );
};

export const BasketVector: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = '', size = 80 }) => {
  return (
    <svg
      width={size}
      height={size * 0.8}
      viewBox="0 0 100 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-md select-none ${className}`}
    >
      {/* Handle */}
      <path
        d="M20 40 C20 10 80 10 80 40"
        stroke="#92400e"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M23 40 C23 14 77 14 77 40"
        stroke="#d97706"
        strokeWidth="2"
        fill="none"
      />
      {/* Basket Base */}
      <path
        d="M10 38 L22 74 Q24 78 28 78 L72 78 Q76 78 78 74 L90 38 Q92 34 88 34 L12 34 Q8 34 10 38 Z"
        fill="#b45309"
      />
      {/* Rim */}
      <rect x="8" y="32" width="84" height="7" rx="3.5" fill="#78350f" />
      {/* Weave pattern */}
      <path
        d="M20 38 L30 78 M40 38 L48 78 M60 38 L52 78 M80 38 L70 78 M14 50 L86 50 M18 64 L82 64"
        stroke="#f59e0b"
        strokeWidth="2"
        opacity="0.85"
      />
      {/* Gingham cloth top */}
      <path
        d="M25 34 Q35 44 45 34 Q55 44 65 34 Q75 44 85 34 L85 32 L25 32 Z"
        fill="#ef4444"
        opacity="0.9"
      />
    </svg>
  );
};

export const TrophyVector: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = '', size = 80 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-lg select-none ${className}`}
    >
      {/* Base */}
      <rect x="30" y="82" width="40" height="12" rx="4" fill="#78350f" />
      <rect x="36" y="74" width="28" height="8" rx="2" fill="#d97706" />
      {/* Stem */}
      <path d="M44 58 L44 74 L56 74 L56 58 Z" fill="#f59e0b" />
      {/* Handles */}
      <path
        d="M25 24 C10 24 10 48 28 48 L28 42 C16 42 16 30 26 30 Z"
        fill="#f59e0b"
      />
      <path
        d="M75 24 C90 24 90 48 72 48 L72 42 C84 42 84 30 74 30 Z"
        fill="#f59e0b"
      />
      {/* Cup Body */}
      <path
        d="M24 16 L76 16 L70 50 C68 62 32 62 30 50 Z"
        fill="#fbbf24"
      />
      {/* Cup Rim */}
      <ellipse cx="50" cy="16" rx="26" ry="6" fill="#fef08a" />
      <ellipse cx="50" cy="16" rx="22" ry="4" fill="#f59e0b" />
      {/* Star Emblem */}
      <polygon
        points="50,28 53,35 60,35 55,40 57,47 50,43 43,47 45,40 40,35 47,35"
        fill="#f59e0b"
      />
      {/* Highlights */}
      <path
        d="M34 22 C30 32 32 46 36 50"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.8"
      />
    </svg>
  );
};

export const FishermanBoatVector: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = '', size = 120 }) => {
  return (
    <svg
      width={size}
      height={size * 0.75}
      viewBox="0 0 160 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-md select-none ${className}`}
    >
      {/* Boat */}
      <path
        d="M20 70 L35 102 Q40 106 48 106 L112 106 Q120 106 125 102 L144 70 Z"
        fill="#92400e"
      />
      <rect x="15" y="66" width="134" height="6" rx="3" fill="#b45309" />
      {/* Character */}
      {/* Body */}
      <rect x="68" y="44" width="24" height="26" rx="6" fill="#f59e0b" />
      {/* Head */}
      <circle cx="80" cy="30" r="14" fill="#fed7aa" />
      {/* Hat */}
      <path d="M60 26 L100 26 L90 14 L70 14 Z" fill="#0284c7" />
      <ellipse cx="80" cy="26" rx="22" ry="4" fill="#0369a1" />
      {/* Eyes & Smile */}
      <circle cx="76" cy="30" r="2" fill="#0f172a" />
      <circle cx="84" cy="30" r="2" fill="#0f172a" />
      <path d="M77 35 Q80 38 83 35" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
      {/* Rod */}
      <path
        d="M84 48 L148 12"
        stroke="#78350f"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Fishing Line */}
      <path
        d="M148 12 L148 85 Q145 92 140 92"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeDasharray="3 2"
      />
      {/* Hook */}
      <path
        d="M140 92 C136 92 136 98 142 98 C146 98 146 94 146 94"
        stroke="#475569"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
};

export const ButterflyCatcherVector: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = '', size = 100 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-md select-none ${className}`}
    >
      {/* Kid Head & Hair */}
      <circle cx="50" cy="34" r="18" fill="#fed7aa" />
      <path d="M32 30 C32 18 68 18 68 30 C64 22 38 22 32 30 Z" fill="#78350f" />
      {/* Eyes and Rosy Cheeks */}
      <circle cx="45" cy="34" r="2" fill="#0f172a" />
      <circle cx="55" cy="34" r="2" fill="#0f172a" />
      <circle cx="41" cy="40" r="3" fill="#f87171" opacity="0.6" />
      <circle cx="59" cy="40" r="3" fill="#f87171" opacity="0.6" />
      <path d="M46 40 Q50 44 54 40" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
      {/* Shirt */}
      <path d="M35 52 L65 52 L70 88 L30 88 Z" fill="#8b5cf6" />
      {/* Net Stick */}
      <line x1="55" y1="65" x2="98" y2="25" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
      {/* Net Ring */}
      <ellipse cx="102" cy="22" rx="14" ry="10" stroke="#f59e0b" strokeWidth="3" fill="none" />
      {/* Net mesh */}
      <path d="M92 24 Q105 45 112 24" stroke="#e2e8f0" strokeWidth="2" fill="#f8fafc" fillOpacity="0.4" />
      <path d="M96 22 L108 34 M108 22 L96 34" stroke="#cbd5e1" strokeWidth="1" />
    </svg>
  );
};

export const DartLauncherVector: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = '', size = 80 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-md select-none ${className}`}
    >
      {/* Target board */}
      <circle cx="50" cy="50" r="45" fill="#ef4444" />
      <circle cx="50" cy="50" r="35" fill="#ffffff" />
      <circle cx="50" cy="50" r="25" fill="#ef4444" />
      <circle cx="50" cy="50" r="15" fill="#ffffff" />
      <circle cx="50" cy="50" r="7" fill="#fbbf24" />
      {/* Dart arrow */}
      <path d="M25 80 L75 30" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />
      <polygon points="75,30 65,32 73,40" fill="#0f172a" />
      <polygon points="25,80 18,88 28,84" fill="#f43f5e" />
    </svg>
  );
};

export const SunVector: React.FC<{ size?: number; className?: string }> = ({
  size = 72,
  className = '',
}) => {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-md select-none ${className}`}
    >
      <defs>
        <radialGradient id={`sunGrad-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fffbeb" />
          <stop offset="35%" stopColor="#fef08a" />
          <stop offset="70%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#f59e0b" />
        </radialGradient>
        <linearGradient id={`rayGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
        <filter id={`sunGlow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Sun Rays - 12 alternating radiating petal rays */}
      <g filter={`url(#sunGlow-${id})`}>
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = i * 30;
          const isLong = i % 2 === 0;
          const length = isLong ? 54 : 46;
          const width = isLong ? 7 : 5;
          return (
            <line
              key={i}
              x1="60"
              y1="60"
              x2={60 + Math.sin((angle * Math.PI) / 180) * length}
              y2={60 - Math.cos((angle * Math.PI) / 180) * length}
              stroke={`url(#rayGrad-${id})`}
              strokeWidth={width}
              strokeLinecap="round"
              opacity={isLong ? 0.95 : 0.8}
            />
          );
        })}
      </g>

      {/* Outer Sun Glow Ring */}
      <circle cx="60" cy="60" r="33" fill="#fef08a" opacity="0.4" />

      {/* Main Sun Body */}
      <circle cx="60" cy="60" r="30" fill={`url(#sunGrad-${id})`} stroke="#f59e0b" strokeWidth="2.5" />

      {/* Cute Kawaii Eyes with Sparkle Highlights */}
      <g>
        {/* Left Eye */}
        <circle cx="51" cy="55" r="4" fill="#451a03" />
        <circle cx="49.5" cy="53.5" r="1.5" fill="#ffffff" />
        <circle cx="52.5" cy="56.5" r="0.8" fill="#ffffff" />

        {/* Right Eye */}
        <circle cx="69" cy="55" r="4" fill="#451a03" />
        <circle cx="67.5" cy="53.5" r="1.5" fill="#ffffff" />
        <circle cx="70.5" cy="56.5" r="0.8" fill="#ffffff" />

        {/* Cheerful Open Smile */}
        <path
          d="M53 64 Q60 72 67 64"
          stroke="#451a03"
          strokeWidth="2.8"
          strokeLinecap="round"
          fill="#dc2626"
        />

        {/* Rosy Glowing Cheeks */}
        <ellipse cx="44" cy="62" rx="4" ry="2.5" fill="#f43f5e" opacity="0.65" />
        <ellipse cx="76" cy="62" rx="4" ry="2.5" fill="#f43f5e" opacity="0.65" />
      </g>
    </svg>
  );
};

export const MoonVector: React.FC<{ size?: number; className?: string }> = ({
  size = 72,
  className = '',
}) => {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-md select-none ${className}`}
    >
      <defs>
        <linearGradient id={`moonGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="60%" stopColor="#facc15" />
          <stop offset="100%" stopColor="#eab308" />
        </linearGradient>
      </defs>

      {/* Crescent Moon */}
      <path
        d="M82 22 C56 22 36 42 36 66 C36 90 56 110 82 110 C92 110 99 107 104 102 C78 102 60 84 60 64 C60 44 78 26 104 26 C99 23 92 22 82 22 Z"
        fill={`url(#moonGrad-${id})`}
        stroke="#ca8a04"
        strokeWidth="2"
      />

      {/* Sleeping Cute Face on Moon */}
      {/* Eye (Curved closed happy lash) */}
      <path
        d="M68 58 Q73 63 78 58"
        stroke="#713f12"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Soft Smile */}
      <path
        d="M69 70 Q74 74 79 70"
        stroke="#713f12"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Cheek */}
      <ellipse cx="78" cy="65" rx="3.5" ry="2" fill="#f43f5e" opacity="0.6" />

      {/* Twinkling Mini Stars Around */}
      <polygon points="28,32 30,38 36,38 31,42 33,48 28,44 23,48 25,42 20,38 26,38" fill="#fef08a" />
      <polygon points="20,78 22,82 26,82 23,85 24,89 20,86 16,89 17,85 14,82 18,82" fill="#ffffff" opacity="0.9" />
      <polygon points="98,14 99,17 103,17 100,19 101,23 98,20 95,23 96,19 93,17 97,17" fill="#ffffff" opacity="0.85" />
    </svg>
  );
};

export const TreeVector: React.FC<{ size?: number; className?: string }> = ({
  size = 140,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size * 1.2}
      viewBox="0 0 140 168"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-md select-none ${className}`}
    >
      {/* Trunk */}
      <path d="M58 90 L52 160 L88 160 L82 90 Z" fill="#78350f" />
      {/* Roots */}
      <path d="M52 155 Q42 165 30 162 M88 155 Q98 165 110 162" stroke="#78350f" strokeWidth="6" strokeLinecap="round" />
      {/* Foliage */}
      <circle cx="70" cy="55" r="42" fill="#16a34a" />
      <circle cx="44" cy="65" r="32" fill="#22c55e" />
      <circle cx="96" cy="65" r="32" fill="#15803d" />
      <circle cx="70" cy="40" r="34" fill="#4ade80" />
      {/* Apples on tree */}
      <circle cx="50" cy="48" r="6" fill="#ef4444" />
      <circle cx="90" cy="54" r="6" fill="#ef4444" />
      <circle cx="68" cy="74" r="6" fill="#ef4444" />
      <circle cx="36" cy="74" r="5" fill="#ef4444" />
      <circle cx="102" cy="76" r="5" fill="#ef4444" />
    </svg>
  );
};

export const BookVector: React.FC<{ size?: number; className?: string }> = ({
  size = 64,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-md select-none ${className}`}
    >
      {/* Pages base */}
      <path d="M12 28 C30 22 48 26 50 32 C52 26 70 22 88 28 L88 78 C70 72 52 76 50 82 C48 76 30 72 12 78 Z" fill="#f8fafc" />
      {/* Book Cover edges */}
      <path d="M10 26 C28 20 48 24 50 30 C52 24 72 20 90 26 L90 80 C72 74 52 78 50 84 C48 78 28 74 10 80 Z" stroke="#3b82f6" strokeWidth="4" fill="none" />
      {/* Spine */}
      <line x1="50" y1="30" x2="50" y2="84" stroke="#1d4ed8" strokeWidth="3" />
      {/* Text lines */}
      <line x1="20" y1="42" x2="42" y2="40" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="20" y1="52" x2="42" y2="50" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="20" y1="62" x2="38" y2="60" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="58" y1="40" x2="80" y2="42" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="58" y1="50" x2="80" y2="52" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="58" y1="60" x2="76" y2="62" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
      {/* Bookmark */}
      <path d="M50 30 L50 60 L44 54 L38 60 L38 30 Z" fill="#ef4444" />
    </svg>
  );
};

export const RocketVector: React.FC<{ size?: number; className?: string }> = ({
  size = 64,
  className = '',
}) => {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-md select-none ${className}`}
    >
      <defs>
        <linearGradient id={`rocketGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id={`fireGrad-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="40%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
      </defs>
      {/* Rocket Fins */}
      <path d="M30 65 L18 80 L35 78 Z" fill="#ef4444" stroke="#991b1b" strokeWidth="2" />
      <path d="M70 65 L82 80 L65 78 Z" fill="#ef4444" stroke="#991b1b" strokeWidth="2" />
      {/* Thruster Flame */}
      <path d="M42 78 Q50 98 58 78 Q50 90 42 78 Z" fill={`url(#fireGrad-${id})`} />
      {/* Body */}
      <path
        d="M50 14 C35 34 35 65 36 78 L64 78 C65 65 65 34 50 14 Z"
        fill={`url(#rocketGrad-${id})`}
        stroke="#1d4ed8"
        strokeWidth="2.5"
      />
      {/* Nose cone tip */}
      <path d="M50 14 C42 26 40 34 39 38 L61 38 C60 34 58 26 50 14 Z" fill="#ef4444" />
      {/* Porthole Window */}
      <circle cx="50" cy="50" r="10" fill="#f8fafc" stroke="#64748b" strokeWidth="3" />
      <circle cx="50" cy="50" r="7" fill="#38bdf8" />
      <ellipse cx="48" cy="48" rx="3" ry="1.5" fill="#ffffff" opacity="0.8" />
    </svg>
  );
};

export const QuizCardsVector: React.FC<{ size?: number; className?: string }> = ({
  size = 64,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-md select-none ${className}`}
    >
      {/* Back card */}
      <rect x="14" y="24" width="56" height="66" rx="10" transform="rotate(-12 14 24)" fill="#e0e7ff" stroke="#6366f1" strokeWidth="3" />
      {/* Front card */}
      <rect x="30" y="16" width="56" height="68" rx="10" fill="#ffffff" stroke="#ec4899" strokeWidth="3" />
      {/* Multiplication symbol and check */}
      <text x="46" y="44" fill="#ec4899" fontSize="24" fontWeight="900" fontFamily="sans-serif">×</text>
      <circle cx="58" cy="62" r="10" fill="#10b981" />
      <path d="M54 62 L57 65 L63 58" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Pencil */}
      <path d="M78 80 L88 40 L82 34 L72 74 Z" fill="#f59e0b" />
      <polygon points="78,80 72,74 70,82" fill="#0f172a" />
    </svg>
  );
};

export const StarVector: React.FC<{ size?: number; className?: string; fill?: string }> = ({
  size = 28,
  className = '',
  fill = '#f59e0b',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-xs select-none ${className}`}
    >
      <polygon
        points="50,10 63,38 93,38 68,56 78,84 50,67 22,84 32,56 7,38 37,38"
        fill={fill}
      />
    </svg>
  );
};

export const FlameVector: React.FC<{ size?: number; className?: string }> = ({
  size = 32,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
    >
      <path
        d="M50 10 C50 10 70 35 70 60 C70 78 60 90 50 90 C40 90 30 78 30 60 C30 45 40 30 50 10 Z"
        fill="#f97316"
      />
      <path
        d="M50 35 C50 35 62 50 62 65 C62 76 56 84 50 84 C44 84 38 76 38 65 C38 55 45 45 50 35 Z"
        fill="#facc15"
      />
    </svg>
  );
};

export const CardsMatchVector: React.FC<{ size?: number; className?: string }> = ({
  size = 48,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-md select-none ${className}`}
    >
      {/* Left Card */}
      <rect x="8" y="20" width="38" height="56" rx="8" fill="#ec4899" stroke="#be185d" strokeWidth="2.5" />
      <circle cx="27" cy="48" r="10" fill="#fdf2f8" />
      <text x="27" y="53" fill="#be185d" fontSize="14" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">?</text>
      
      {/* Right Card (Matched) */}
      <rect x="54" y="20" width="38" height="56" rx="8" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2.5" />
      <circle cx="73" cy="48" r="10" fill="#eff6ff" />
      <path d="M68 48 L72 52 L78 44" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Sparkles */}
      <polygon points="50,12 52,18 58,20 52,22 50,28 48,22 42,20 48,18" fill="#f59e0b" />
    </svg>
  );
};

export const CloudVector: React.FC<{
  size?: number;
  className?: string;
  fill?: string;
  fillOpacity?: number;
}> = ({
  size = 64,
  className = '',
  fill = '#ffffff',
  fillOpacity = 0.85,
}) => {
  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 100 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-sm select-none ${className}`}
    >
      <path
        d="M20 48 L80 48 C90 48 95 40 92 32 C90 24 82 22 76 25 C72 12 55 10 46 20 C42 16 32 18 30 26 C22 26 12 34 20 48 Z"
        fill={fill}
        fillOpacity={fillOpacity}
      />
    </svg>
  );
};

export const GithubVector: React.FC<{ size?: number; className?: string }> = ({
  size = 20,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none ${className}`}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
};

export const FlowerVector: React.FC<{
  size?: number;
  className?: string;
  variant?: 0 | 1 | 2;
}> = ({ size = 20, className = '', variant = 0 }) => {
  const petals = variant === 1 ? '#f472b6' : variant === 2 ? '#38bdf8' : '#fb7185';
  const center = '#facc15';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none drop-shadow-xs ${className}`}
    >
      <circle cx="20" cy="11" r="7" fill={petals} />
      <circle cx="29" cy="20" r="7" fill={petals} />
      <circle cx="20" cy="29" r="7" fill={petals} />
      <circle cx="11" cy="20" r="7" fill={petals} />
      <circle cx="20" cy="20" r="6" fill={center} />
      <circle cx="20" cy="20" r="3" fill="#f59e0b" />
    </svg>
  );
};

export const SparkleStarVector: React.FC<{
  size?: number;
  className?: string;
  fill?: string;
}> = ({ size = 24, className = '', fill = '#f59e0b' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none drop-shadow-sm ${className}`}
    >
      <path
        d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
        fill={fill}
      />
      <circle cx="12" cy="12" r="2.5" fill="#ffffff" />
    </svg>
  );
};

