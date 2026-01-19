/**
 * Glossary module exports.
 * Provides types, data, and utilities for the glossary feature.
 */

// Types
export type { GlossaryConcept, ConceptCategory, ConceptCategoryInfo } from './types';
export { categoryInfo, allCategories } from './types';

// Data
export { module1Concepts } from './concepts/module1';

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

export const allConcepts = [...module1Concepts];
