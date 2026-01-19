/**
 * Utility functions for the exam/quiz system.
 * Provides question selection, filtering, and shuffling capabilities.
 */

import type { Question, QuestionDifficulty } from './types';

/**
 * Fisher-Yates shuffle algorithm for randomizing array order.
 * Creates a new shuffled array without mutating the original.
 *
 * @param array - The array to shuffle
 * @returns A new array with elements in random order
 */
export function shuffleArray<T>(array: T[]): T[] {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}

/**
 * Filters questions by difficulty level.
 *
 * @param questions - Array of questions to filter
 * @param difficulty - The difficulty level to filter by
 * @returns Array of questions matching the specified difficulty
 */
export function getQuestionsByDifficulty(
	questions: Question[],
	difficulty: QuestionDifficulty
): Question[] {
	return questions.filter((q) => q.difficulty === difficulty);
}

/**
 * Filters questions by lecture ID.
 *
 * @param questions - Array of questions to filter
 * @param lectureId - The lecture ID to filter by (1-8)
 * @returns Array of questions from the specified lecture
 */
export function getQuestionsByLecture(questions: Question[], lectureId: number): Question[] {
	return questions.filter((q) => q.lectureId === lectureId);
}

/**
 * Filters questions by multiple lecture IDs.
 *
 * @param questions - Array of questions to filter
 * @param lectureIds - Array of lecture IDs to include
 * @returns Array of questions from any of the specified lectures
 */
export function getQuestionsByLectures(questions: Question[], lectureIds: number[]): Question[] {
	return questions.filter((q) => lectureIds.includes(q.lectureId));
}

/**
 * Selects a random subset of questions with optional difficulty filtering.
 *
 * When difficulty is 'mixed', the function attempts to maintain a proportional
 * distribution based on the original question pool's difficulty breakdown.
 *
 * @param count - Number of questions to select
 * @param difficulty - Difficulty filter: 'easy', 'medium', 'hard', or 'mixed'
 * @param questions - Source array of questions to select from
 * @returns Array of randomly selected questions
 */
export function selectQuestions(
	count: number,
	difficulty: 'easy' | 'medium' | 'hard' | 'mixed',
	questions: Question[]
): Question[] {
	if (questions.length === 0) {
		return [];
	}

	let pool: Question[];

	if (difficulty === 'mixed') {
		// For mixed difficulty, use all questions
		pool = questions;
	} else {
		// Filter by specific difficulty
		pool = getQuestionsByDifficulty(questions, difficulty);
	}

	// If requesting more questions than available, return all (shuffled)
	if (count >= pool.length) {
		return shuffleArray(pool);
	}

	// Shuffle and take the first `count` questions
	const shuffled = shuffleArray(pool);
	return shuffled.slice(0, count);
}

/**
 * Selects questions with proportional difficulty distribution.
 * Useful for creating balanced quizzes that cover all difficulty levels.
 *
 * @param count - Total number of questions to select
 * @param questions - Source array of questions
 * @param proportions - Optional custom proportions (default: 20% easy, 40% medium, 40% hard)
 * @returns Array of questions with proportional difficulty distribution
 */
export function selectQuestionsProportional(
	count: number,
	questions: Question[],
	proportions: { easy: number; medium: number; hard: number } = {
		easy: 0.2,
		medium: 0.4,
		hard: 0.4
	}
): Question[] {
	const easyQuestions = getQuestionsByDifficulty(questions, 'easy');
	const mediumQuestions = getQuestionsByDifficulty(questions, 'medium');
	const hardQuestions = getQuestionsByDifficulty(questions, 'hard');

	// Calculate target counts for each difficulty
	const easyCount = Math.round(count * proportions.easy);
	const mediumCount = Math.round(count * proportions.medium);
	const hardCount = count - easyCount - mediumCount; // Use remainder for hard

	// Select from each pool
	const selectedEasy = selectQuestions(easyCount, 'easy', easyQuestions);
	const selectedMedium = selectQuestions(mediumCount, 'medium', mediumQuestions);
	const selectedHard = selectQuestions(hardCount, 'hard', hardQuestions);

	// Combine and shuffle final selection
	return shuffleArray([...selectedEasy, ...selectedMedium, ...selectedHard]);
}

/**
 * Selects questions ensuring coverage across all specified lectures.
 * Distributes questions as evenly as possible across lectures.
 *
 * @param count - Total number of questions to select
 * @param questions - Source array of questions
 * @param lectureIds - Array of lecture IDs to cover (default: 1-8)
 * @returns Array of questions with balanced lecture coverage
 */
export function selectQuestionsWithLectureCoverage(
	count: number,
	questions: Question[],
	lectureIds: number[] = [1, 2, 3, 4, 5, 6, 7, 8]
): Question[] {
	const questionsPerLecture = Math.floor(count / lectureIds.length);
	const remainder = count % lectureIds.length;

	const selected: Question[] = [];

	lectureIds.forEach((lectureId, index) => {
		const lectureQuestions = getQuestionsByLecture(questions, lectureId);
		// Give extra question to first `remainder` lectures
		const targetCount = questionsPerLecture + (index < remainder ? 1 : 0);
		const shuffled = shuffleArray(lectureQuestions);
		selected.push(...shuffled.slice(0, Math.min(targetCount, shuffled.length)));
	});

	return shuffleArray(selected);
}

/**
 * Gets unique lecture IDs from a set of questions.
 *
 * @param questions - Array of questions
 * @returns Sorted array of unique lecture IDs
 */
export function getUniqueLectureIds(questions: Question[]): number[] {
	const lectureIds = new Set(questions.map((q) => q.lectureId));
	return Array.from(lectureIds).sort((a, b) => a - b);
}

/**
 * Gets statistics about a question set.
 *
 * @param questions - Array of questions to analyze
 * @returns Object with count breakdowns by difficulty and lecture
 */
export function getQuestionStats(questions: Question[]): {
	total: number;
	byDifficulty: { easy: number; medium: number; hard: number };
	byLecture: Map<number, number>;
} {
	const byDifficulty = {
		easy: 0,
		medium: 0,
		hard: 0
	};

	const byLecture = new Map<number, number>();

	for (const q of questions) {
		byDifficulty[q.difficulty]++;
		byLecture.set(q.lectureId, (byLecture.get(q.lectureId) || 0) + 1);
	}

	return {
		total: questions.length,
		byDifficulty,
		byLecture
	};
}

/**
 * Validates that a question array has the expected structure.
 *
 * @param questions - Array of questions to validate
 * @returns Object with validation result and any error messages
 */
export function validateQuestions(questions: Question[]): {
	valid: boolean;
	errors: string[];
} {
	const errors: string[] = [];
	const ids = new Set<string>();

	for (let i = 0; i < questions.length; i++) {
		const q = questions[i];

		// Check for duplicate IDs
		if (ids.has(q.id)) {
			errors.push(`Duplicate question ID: ${q.id}`);
		}
		ids.add(q.id);

		// Check required fields
		if (!q.question || q.question.trim() === '') {
			errors.push(`Question ${i} (${q.id}): missing question text`);
		}
		if (!q.answer || q.answer.trim() === '') {
			errors.push(`Question ${i} (${q.id}): missing answer text`);
		}
		if (!['easy', 'medium', 'hard'].includes(q.difficulty)) {
			errors.push(`Question ${i} (${q.id}): invalid difficulty "${q.difficulty}"`);
		}
		if (q.lectureId < 1 || q.lectureId > 8) {
			errors.push(`Question ${i} (${q.id}): invalid lectureId ${q.lectureId}`);
		}
	}

	return {
		valid: errors.length === 0,
		errors
	};
}
