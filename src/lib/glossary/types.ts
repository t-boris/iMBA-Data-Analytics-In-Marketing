/**
 * Glossary types for causal inference concepts.
 * Provides structured data for educational glossary functionality.
 */

import type { DiagramData } from '$lib/components/diagrams';

/**
 * Categories for organizing glossary concepts.
 * Each category represents a different aspect of causal inference.
 */
export type ConceptCategory =
	| 'foundation'
	| 'method'
	| 'assumption'
	| 'estimator'
	| 'bias'
	| 'design'
	| 'dag'
	| 'nlp';

/**
 * A glossary concept representing a causal inference term.
 */
export interface GlossaryConcept {
	/** Unique identifier (kebab-case, e.g., 'selection-bias') */
	id: string;
	/** Display term */
	term: string;
	/** 1-2 sentence definition */
	definition: string;
	/** Longer explanation with markdown support */
	extendedDefinition?: string;
	/** Concept category for organization */
	category: ConceptCategory;
	/** IDs of related concepts for cross-referencing */
	relatedConcepts: string[];
	/** Source lecture number (1-8) */
	lectureId: number;
	/** Module identifier */
	moduleId: string;
	/** Optional visualization data */
	diagramData?: DiagramData;
	/** Tags for filtering and search */
	tags: string[];
}

/**
 * Metadata for a concept category.
 */
export interface ConceptCategoryInfo {
	/** Category identifier */
	id: ConceptCategory;
	/** Display label */
	label: string;
	/** Tailwind color class (without prefix) */
	color: string;
}

/**
 * Category metadata lookup.
 * Maps category IDs to display information.
 */
export const categoryInfo: Record<ConceptCategory, ConceptCategoryInfo> = {
	foundation: { id: 'foundation', label: 'Foundation', color: 'blue' },
	method: { id: 'method', label: 'Method', color: 'purple' },
	assumption: { id: 'assumption', label: 'Assumption', color: 'amber' },
	estimator: { id: 'estimator', label: 'Estimator', color: 'emerald' },
	bias: { id: 'bias', label: 'Bias', color: 'red' },
	design: { id: 'design', label: 'Design', color: 'slate' },
	dag: { id: 'dag', label: 'DAG', color: 'cyan' },
	nlp: { id: 'nlp', label: 'NLP & Text', color: 'violet' }
};

/**
 * All available concept categories.
 */
export const allCategories: ConceptCategory[] = [
	'foundation',
	'method',
	'assumption',
	'estimator',
	'bias',
	'design',
	'dag',
	'nlp'
];
