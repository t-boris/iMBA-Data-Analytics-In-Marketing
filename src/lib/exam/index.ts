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
export { module3Questions } from './questions/module3';
export { module4Questions } from './questions/module4';

// Aggregated questions
import { module1Questions } from './questions/module1';
import { module2Questions } from './questions/module2';
import { module3Questions } from './questions/module3';
import { module4Questions } from './questions/module4';
export const allQuestions = [...module1Questions, ...module2Questions, ...module3Questions, ...module4Questions];

// Get questions by module
export function getQuestionsByModule(moduleId: string) {
	switch (moduleId) {
		case 'module1':
		case '1':
			return module1Questions;
		case 'module2':
		case '2':
			return module2Questions;
		case 'module3':
		case '3':
			return module3Questions;
		case 'module4':
		case '4':
			return module4Questions;
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
