/**
 * Utility functions for glossary operations.
 * Provides search, filter, and grouping functionality.
 */

import type { GlossaryConcept, ConceptCategory } from './types';

/**
 * Search concepts by term and definition.
 * Returns concepts where the search query matches term, definition, or tags.
 */
export function searchConcepts(query: string, concepts: GlossaryConcept[]): GlossaryConcept[] {
	if (!query.trim()) return concepts;

	const lowerQuery = query.toLowerCase().trim();

	return concepts.filter(
		(concept) =>
			concept.term.toLowerCase().includes(lowerQuery) ||
			concept.definition.toLowerCase().includes(lowerQuery) ||
			concept.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
	);
}

/**
 * Filter concepts by category.
 */
export function filterByCategory(
	category: ConceptCategory | 'all',
	concepts: GlossaryConcept[]
): GlossaryConcept[] {
	if (category === 'all') return concepts;
	return concepts.filter((concept) => concept.category === category);
}

/**
 * Filter concepts by lecture ID.
 */
export function filterByLecture(lectureId: number, concepts: GlossaryConcept[]): GlossaryConcept[] {
	return concepts.filter((concept) => concept.lectureId === lectureId);
}

/**
 * Get related concepts for a given concept ID.
 */
export function getRelatedConcepts(
	conceptId: string,
	concepts: GlossaryConcept[]
): GlossaryConcept[] {
	const concept = concepts.find((c) => c.id === conceptId);
	if (!concept) return [];

	return concepts.filter((c) => concept.relatedConcepts.includes(c.id));
}

/**
 * Sort concepts alphabetically by term.
 */
export function sortAlphabetically(concepts: GlossaryConcept[]): GlossaryConcept[] {
	return [...concepts].sort((a, b) => a.term.localeCompare(b.term));
}

/**
 * Group concepts by their first letter.
 * Returns a Map with letters as keys and arrays of concepts as values.
 */
export function groupByFirstLetter(
	concepts: GlossaryConcept[]
): Map<string, GlossaryConcept[]> {
	const sorted = sortAlphabetically(concepts);
	const groups = new Map<string, GlossaryConcept[]>();

	for (const concept of sorted) {
		const firstLetter = concept.term.charAt(0).toUpperCase();
		if (!groups.has(firstLetter)) {
			groups.set(firstLetter, []);
		}
		groups.get(firstLetter)!.push(concept);
	}

	return groups;
}

/**
 * Get all unique first letters from concepts.
 */
export function getAvailableLetters(concepts: GlossaryConcept[]): Set<string> {
	const letters = new Set<string>();
	for (const concept of concepts) {
		letters.add(concept.term.charAt(0).toUpperCase());
	}
	return letters;
}

/**
 * Get a concept by its ID.
 */
export function getConceptById(
	id: string,
	concepts: GlossaryConcept[]
): GlossaryConcept | undefined {
	return concepts.find((c) => c.id === id);
}

/**
 * Get all unique categories from a list of concepts.
 */
export function getUniqueCategories(concepts: GlossaryConcept[]): ConceptCategory[] {
	const categories = new Set<ConceptCategory>();
	for (const concept of concepts) {
		categories.add(concept.category);
	}
	return Array.from(categories);
}
