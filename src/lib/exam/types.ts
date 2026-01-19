/**
 * Type definitions for the exam/quiz system.
 * These types power the flashcard and quiz functionality.
 */

import type { DiagramData } from '$lib/components/diagrams';

/**
 * Difficulty levels for questions.
 * - easy: Definition recall, basic concept identification
 * - medium: Concept application, scenario analysis
 * - hard: Multi-concept integration, edge cases, methodology comparison
 */
export type QuestionDifficulty = 'easy' | 'medium' | 'hard';

/**
 * Represents a single flashcard question.
 */
export interface Question {
	/** Unique identifier for the question */
	id: string;
	/** The question text */
	question: string;
	/** The answer text */
	answer: string;
	/** Difficulty level of the question */
	difficulty: QuestionDifficulty;
	/** Lecture ID (1-8) that this question relates to */
	lectureId: number;
	/** Optional diagram data for visual questions */
	diagramData?: DiagramData;
}

/**
 * Configuration for generating a quiz.
 */
export interface QuizConfig {
	/** Total number of questions to include */
	questionCount: number;
	/** Difficulty filter (or 'mixed' for all difficulties) */
	difficulty: QuestionDifficulty | 'mixed';
	/** Optional lecture filter (undefined means all lectures) */
	lectureIds?: number[];
	/** Whether to shuffle questions */
	shuffle: boolean;
	/** Optional time limit in seconds */
	timeLimitSeconds?: number;
}

/**
 * Represents the state of a quiz in progress.
 */
export interface QuizState {
	/** The questions in this quiz */
	questions: Question[];
	/** Current question index (0-based) */
	currentIndex: number;
	/** User's answers (question id -> whether correct) */
	answers: Map<string, boolean>;
	/** Start time of the quiz */
	startTime: Date;
	/** Whether the quiz is complete */
	isComplete: boolean;
}

/**
 * Quiz results summary.
 */
export interface QuizResult {
	/** Total questions answered */
	totalQuestions: number;
	/** Number of correct answers */
	correctAnswers: number;
	/** Percentage score (0-100) */
	score: number;
	/** Time taken in seconds */
	timeTakenSeconds: number;
	/** Breakdown by difficulty */
	byDifficulty: {
		easy: { correct: number; total: number };
		medium: { correct: number; total: number };
		hard: { correct: number; total: number };
	};
	/** Breakdown by lecture */
	byLecture: Map<number, { correct: number; total: number }>;
}
