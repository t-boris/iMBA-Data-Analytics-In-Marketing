/**
 * Quiz configuration and state stores for the Exam Prep feature.
 * Manages quiz settings (length, difficulty, module) and runtime quiz state.
 */

import { writable } from 'svelte/store';

/**
 * Quiz length options - number of questions per quiz session.
 */
export type QuizLength = 5 | 10 | 15 | 25;

/**
 * Quiz difficulty levels.
 * - easy: Foundational concept recognition
 * - medium: Application and comparison questions
 * - hard: Synthesis and edge case scenarios
 * - mixed: Random selection across all difficulty levels
 */
export type QuizDifficulty = 'easy' | 'medium' | 'hard' | 'mixed';

/**
 * User's response to a flashcard question.
 * - got-it: User understood the concept
 * - need-review: User needs to review this concept again
 */
export type QuizAnswer = 'got-it' | 'need-review';

/**
 * Configuration for a quiz session.
 */
export interface QuizConfig {
  /** Number of questions in the quiz */
  length: QuizLength;
  /** Difficulty level for questions */
  difficulty: QuizDifficulty;
  /** Module ID to pull questions from */
  moduleId: string;
}

/**
 * Runtime state for an active quiz session.
 */
export interface QuizState {
  /** Array of questions for this quiz session */
  questions: any[]; // Will be Question[] from types when question bank is implemented
  /** Current question index (0-based) */
  currentIndex: number;
  /** Map of question IDs to user's answers */
  answers: Map<string, QuizAnswer>;
  /** Timestamp when quiz started (null if not started) */
  startTime: number | null;
}

/**
 * Default quiz configuration.
 */
const defaultConfig: QuizConfig = {
  length: 10,
  difficulty: 'mixed',
  moduleId: 'module1'
};

/**
 * Default quiz state.
 */
const defaultState: QuizState = {
  questions: [],
  currentIndex: 0,
  answers: new Map(),
  startTime: null
};

/**
 * Store for quiz configuration settings.
 * Used on the exam prep landing page to configure quiz parameters.
 */
export const quizConfig = writable<QuizConfig>(defaultConfig);

/**
 * Store for active quiz session state.
 * Tracks questions, progress, and user answers during a quiz.
 */
export const quizState = writable<QuizState>(defaultState);

/**
 * Reset quiz configuration to defaults.
 */
export function resetQuizConfig(): void {
  quizConfig.set(defaultConfig);
}

/**
 * Reset quiz state to defaults.
 */
export function resetQuizState(): void {
  quizState.set({
    ...defaultState,
    answers: new Map() // Create fresh Map instance
  });
}

/**
 * Start a new quiz with the given questions.
 */
export function startQuiz(questions: any[]): void {
  quizState.set({
    questions,
    currentIndex: 0,
    answers: new Map(),
    startTime: Date.now()
  });
}

/**
 * Record an answer for the current question.
 */
export function recordAnswer(questionId: string, answer: QuizAnswer): void {
  quizState.update((state) => {
    const newAnswers = new Map(state.answers);
    newAnswers.set(questionId, answer);
    return { ...state, answers: newAnswers };
  });
}

/**
 * Move to the next question.
 */
export function nextQuestion(): void {
  quizState.update((state) => ({
    ...state,
    currentIndex: Math.min(state.currentIndex + 1, state.questions.length - 1)
  }));
}

/**
 * Move to the previous question.
 */
export function previousQuestion(): void {
  quizState.update((state) => ({
    ...state,
    currentIndex: Math.max(state.currentIndex - 1, 0)
  }));
}
