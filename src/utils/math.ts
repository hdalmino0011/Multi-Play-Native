import { MathOperation, Question } from '../types';

export const OPERATION_SYMBOLS: Record<MathOperation, string> = {
  multiply: '×',
};

export const OPERATION_NAMES: Record<MathOperation, string> = {
  multiply: 'Multiplication',
};

export function generateQuestions(
  _op: MathOperation = 'multiply',
  baseNumber: number,
  count = 10
): Question[] {
  const multipliers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].sort(() => Math.random() - 0.5);
  const questions: Question[] = [];

  for (let i = 0; i < count; i++) {
    const mult = multipliers[i % multipliers.length];
    const num1 = baseNumber;
    const num2 = mult;
    const answer = num1 * num2;

    // Generate 3 unique, realistic distractors around the answer
    const wrongOptions = new Set<number>();
    
    // Distractor 1: near multiple (e.g. table * (multiplier + 1) or table * (multiplier - 1))
    if (mult > 1) wrongOptions.add(num1 * (mult - 1));
    wrongOptions.add(num1 * (mult + 1));

    // Distractor 2 & 3: near arithmetic offsets (+/- 1, 2, 3, 4)
    while (wrongOptions.size < 3) {
      const deltas = [-3, -2, -1, 1, 2, 3, 4, 5];
      const delta = deltas[Math.floor(Math.random() * deltas.length)];
      const candidate = answer + delta;
      if (candidate > 0 && candidate !== answer) {
        wrongOptions.add(candidate);
      }
    }

    const optionsList = Array.from(wrongOptions).filter((v) => v !== answer).slice(0, 3);
    const options = [answer, ...optionsList].sort(() => Math.random() - 0.5);

    questions.push({
      num1,
      num2,
      operation: 'multiply',
      symbol: '×',
      answer,
      options,
      table: baseNumber,
      multiplier: mult,
    });
  }

  return questions;
}
