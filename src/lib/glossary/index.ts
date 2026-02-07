/**
 * Glossary module exports.
 * Provides types, data, and utilities for the glossary feature.
 */

// Types
export type { GlossaryConcept, ConceptCategory, ConceptCategoryInfo } from './types';
export { categoryInfo, allCategories } from './types';

// Data
export { module1Concepts } from './concepts/module1';
export { module2Concepts } from './concepts/module2';
export { module3Concepts } from './concepts/module3';
export { module4Concepts } from './concepts/module4';

// Utilities
export {
	searchConcepts,
	filterByCategory,
	filterByLecture,
	getRelatedConcepts,
	sortAlphabetically,
	groupByFirstLetter,
	getAvailableLetters,
	getConceptById,
	getUniqueCategories
} from './utils';

// Aggregated concepts (add more modules as they're created)
import { module1Concepts } from './concepts/module1';
import { module2Concepts } from './concepts/module2';
import { module3Concepts } from './concepts/module3';
import { module4Concepts } from './concepts/module4';

export const allConcepts = [...module1Concepts, ...module2Concepts, ...module3Concepts, ...module4Concepts];
