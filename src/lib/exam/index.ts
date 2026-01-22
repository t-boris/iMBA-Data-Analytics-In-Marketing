/**
 * Exam/Quiz System Exports
 *
 * This module provides the complete exam and flashcard quiz system including:
 * - Type definitions for questions, quizzes, and results
 * - Question banks organized by module
 * - Utility functions for question selection and filtering
 */

// Type exports
export type {
	Question,
	QuestionDifficulty,
	QuizConfig,
	QuizState,
	QuizResult
} from './types';

// Question bank exports
export { module1Questions } from './questions/module1';
export { module2Questions } from './questions/module2';

// Aggregated questions
import { module1Questions } from './questions/module1';
import { module2Questions } from './questions/module2';
export const allQuestions = [...module1Questions, ...module2Questions];

// Get questions by module
export function getQuestionsByModule(moduleId: string) {
	switch (moduleId) {
		case 'module1':
		case '1':
			return module1Questions;
		case 'module2':
		case '2':
			return module2Questions;
		default:
			return allQuestions;
	}
}

// Utility function exports
export {
	shuffleArray,
	getQuestionsByDifficulty,
	getQuestionsByLecture,
	getQuestionsByLectures,
	selectQuestions,
	selectQuestionsProportional,
	selectQuestionsWithLectureCoverage,
	getUniqueLectureIds,
	getQuestionStats,
	validateQuestions
} from './utils';

// Persistence exports
export type { QuizHistory, MasteryStats } from './persistence';
export {
	saveQuizResult,
	getQuizHistory,
	clearQuizHistory,
	getMasteryStats,
	getLastQuizResult,
	getFormattedStats
} from './persistence';
