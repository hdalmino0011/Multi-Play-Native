import React from 'react';
import { StarVector } from './illustrations/VectorGraphics';

interface MathVisualizerProps {
  table: number;
  multiplier: number;
  answer?: number;
}

export const MathVisualizer: React.FC<MathVisualizerProps> = ({
  table = 2,
  multiplier = 3,
  answer: propAnswer,
}) => {
  const answer = propAnswer ?? table * multiplier;

  // We show up to 10 rows/groups max for visual clarity
  const groupsCount = Math.min(multiplier, 12);
  const itemsPerGroup = Math.min(table, 12);

  return (
    <div className="w-full max-w-xl mx-auto bg-amber-50/95 dark:bg-slate-800/95 rounded-2xl p-2.5 sm:p-3 border-2 border-amber-300 dark:border-slate-700 shadow-sm space-y-1.5 overflow-hidden my-1">
      {/* Explanation Headline */}
      <div className="flex flex-col items-center text-center">
        <span className="text-[10px] uppercase tracking-wider font-black text-amber-800 dark:text-amber-300">
          HOW TO VISUALIZE:
        </span>
        <div className="text-xs sm:text-sm font-black text-slate-950 dark:text-amber-200">
          <span className="text-indigo-600 dark:text-indigo-400">{multiplier}</span> equal groups of{' '}
          <span className="text-amber-600 dark:text-amber-400">{table}</span> ={' '}
          <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{answer}</span>
        </div>
      </div>

      {/* Visual Star Groups Grid */}
      <div className="w-full bg-white dark:bg-slate-900 p-2 rounded-xl border border-amber-200 dark:border-slate-700 max-h-40 overflow-y-auto">
        <div className="flex flex-col gap-1 items-center justify-center">
          {Array.from({ length: groupsCount }, (_, rowIdx) => (
            <div key={rowIdx} className="flex items-center gap-1.5 bg-amber-50/80 dark:bg-slate-800/80 px-2 py-0.5 rounded-lg border border-amber-200/60 dark:border-slate-700/60">
              <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 w-12 text-right shrink-0">
                Group #{rowIdx + 1}:
              </span>
              <div className="flex items-center gap-1 flex-wrap">
                {Array.from({ length: itemsPerGroup }, (_, colIdx) => (
                  <span
                    key={colIdx}
                    className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center bg-amber-100 dark:bg-slate-700 border border-amber-300 dark:border-slate-600 rounded-md shadow-2xs shrink-0"
                    title={`Star ${colIdx + 1} in Group ${rowIdx + 1}`}
                  >
                    <StarVector size={11} fill="#f59e0b" />
                  </span>
                ))}
              </div>
              <span className="text-[10px] font-black text-amber-700 dark:text-amber-300 ml-1 shrink-0">
                ({table})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
