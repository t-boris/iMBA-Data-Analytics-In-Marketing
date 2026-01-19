/**
 * Lecture 2: Key Thinkers in Causality
 *
 * This lecture covers the intellectual history of causal inference:
 * - Jerzy Neyman and the potential outcomes framework
 * - Donald Rubin and the Rubin Causal Model
 * - Judea Pearl and DAGs/do-calculus
 * - Nobel Prize 2021: Angrist, Card, Imbens
 */

import type { LectureContent, ContentSection } from '../types';
import type { DiagramData } from '$lib/components/diagrams';
import type { ExplanationStep } from '$lib/components/animation';
import { createTreatmentEffectExplanation } from '$lib/components/animation';

// =============================================================================
// Section 1: Introduction - Evolution of Causal Thinking
// =============================================================================

const introSection: ContentSection = {
	id: 'intro',
	type: 'text',
	title: 'The Evolution of Causal Thinking',
	content: `Causal inference as a rigorous statistical discipline emerged over the course of the 20th century, shaped by brilliant thinkers who gave us the language and tools to answer "what if" questions from data.

Before these developments, statisticians largely focused on describing associations - correlations and regressions. The shift to causal reasoning required new conceptual frameworks: potential outcomes, counterfactuals, and graphical models.

In this lecture, we'll trace the key intellectual contributions that form the foundation of modern causal inference. Understanding these ideas is essential for anyone applying causal methods in marketing analytics.`
};

// =============================================================================
// Section 2: Jerzy Neyman - Potential Outcomes (1923)
// =============================================================================

const neymanDiagram: DiagramData = {
	nodes: [
		{ id: 'unit', label: 'Unit i', type: 'variable', x: 210, y: 20 },
		{ id: 'y1', label: 'Y(1)', type: 'treatment', x: 60, y: 120 },
		{ id: 'y0', label: 'Y(0)', type: 'control', x: 360, y: 120 }
	],
	edges: [
		{ id: 'u-y1', source: 'unit', target: 'y1', label: 'if treated' },
		{ id: 'u-y0', source: 'unit', target: 'y0', label: 'if not treated' }
	]
};

const neymanSection: ContentSection = {
	id: 'neyman',
	type: 'diagram',
	title: 'Jerzy Neyman (1923): Potential Outcomes',
	diagram: neymanDiagram,
	content: `Polish statistician Jerzy Neyman introduced the potential outcomes framework in his 1923 paper on agricultural experiments. This simple but profound idea states that for every unit (person, plot, customer), there exist TWO potential outcomes:

- **Y(1)**: The outcome that WOULD occur if the unit receives treatment
- **Y(0)**: The outcome that WOULD occur if the unit does NOT receive treatment

The individual treatment effect is then defined as the difference: Y(1) - Y(0).

The radical insight is that both potential outcomes exist conceptually for every unit, even though we can only ever observe one. This "fundamental problem of causal inference" is why we need statistical methods to estimate average effects from groups.`
};

// =============================================================================
// Section 3: Donald Rubin - The Rubin Causal Model
// =============================================================================

const rubinSection: ContentSection = {
	id: 'rubin',
	type: 'explanation',
	title: 'Donald Rubin: The Rubin Causal Model',
	explanation: {
		steps: createTreatmentEffectExplanation()
	}
};

// =============================================================================
// Section 4: Judea Pearl - DAGs and Do-Calculus
// =============================================================================

const pearlDoDiagram: DiagramData = {
	nodes: [
		{ id: 'confounder', label: 'U', type: 'confounder', x: 210, y: 20 },
		{ id: 'treatment', label: 'X', type: 'treatment', x: 60, y: 120 },
		{ id: 'outcome', label: 'Y', type: 'outcome', x: 360, y: 120 }
	],
	edges: [
		{ id: 'u-x', source: 'confounder', target: 'treatment', style: 'dashed' },
		{ id: 'u-y', source: 'confounder', target: 'outcome' },
		{ id: 'x-y', source: 'treatment', target: 'outcome', label: 'do(X)' }
	]
};

const pearlSection: ContentSection = {
	id: 'pearl',
	type: 'diagram',
	title: 'Judea Pearl: DAGs and the do-Operator',
	diagram: pearlDoDiagram,
	content: `Computer scientist Judea Pearl revolutionized causal inference by introducing Directed Acyclic Graphs (DAGs) and the do-calculus. His framework provides a graphical language for representing causal assumptions.

The key innovation is the **do-operator**: do(X=x) represents an intervention that sets X to value x, as opposed to merely observing X=x. This distinction is crucial:

- **P(Y | X=x)** - The probability of Y given that we OBSERVE X equals x (correlation)
- **P(Y | do(X=x))** - The probability of Y if we INTERVENE to SET X to x (causation)

The dashed arrow from U to X in the diagram shows that when we intervene (do), we "cut" the incoming arrows to X. This graphical surgery isolates the causal effect of X on Y from confounding.

Pearl's do-calculus provides rules for determining when and how causal effects can be identified from observational data.`
};

// =============================================================================
// Section 5: Nobel Prize 2021 - Natural Experiments
// =============================================================================

const nobelSteps: ExplanationStep[] = [
	{
		id: 'nobel-1',
		title: 'The 2021 Nobel Prize in Economics',
		description:
			'In 2021, the Nobel Prize in Economics was awarded to David Card, Joshua Angrist, and Guido Imbens for their methodological contributions to analyzing causal relationships using observational data.',
		diagram: {
			nodes: [
				{ id: 'card', label: 'David Card', type: 'treatment', x: 60, y: 60 },
				{ id: 'angrist', label: 'Joshua Angrist', type: 'treatment', x: 210, y: 60 },
				{ id: 'imbens', label: 'Guido Imbens', type: 'treatment', x: 360, y: 60 }
			],
			edges: []
		},
		highlights: ['card', 'angrist', 'imbens']
	},
	{
		id: 'nobel-2',
		title: 'Natural Experiments',
		description:
			'Card pioneered the use of "natural experiments" - situations where nature or policy creates as-if random variation. His famous study with Alan Krueger used New Jersey\'s minimum wage increase as a natural experiment to study employment effects.',
		diagram: {
			nodes: [
				{ id: 'policy', label: 'Policy Change', type: 'confounder', x: 210, y: 20 },
				{ id: 'treated', label: 'NJ (Treated)', type: 'treatment', x: 60, y: 120 },
				{ id: 'control', label: 'PA (Control)', type: 'control', x: 360, y: 120 }
			],
			edges: [
				{ id: 'p-t', source: 'policy', target: 'treated', label: 'affected' },
				{ id: 'p-c', source: 'policy', target: 'control', label: 'unaffected', style: 'dashed' }
			]
		},
		highlights: ['treated', 'control']
	},
	{
		id: 'nobel-3',
		title: 'Instrumental Variables',
		description:
			'Angrist and Imbens developed the framework for using instrumental variables to identify Local Average Treatment Effects (LATE). An instrument affects treatment assignment but has no direct effect on outcomes.',
		diagram: {
			nodes: [
				{ id: 'instrument', label: 'Instrument Z', type: 'variable', x: 60, y: 60 },
				{ id: 'treatment', label: 'Treatment D', type: 'treatment', x: 210, y: 60 },
				{ id: 'outcome', label: 'Outcome Y', type: 'outcome', x: 360, y: 60 },
				{ id: 'confounder', label: 'U', type: 'confounder', x: 285, y: 120 }
			],
			edges: [
				{ id: 'z-d', source: 'instrument', target: 'treatment' },
				{ id: 'd-y', source: 'treatment', target: 'outcome' },
				{ id: 'u-d', source: 'confounder', target: 'treatment', style: 'dashed' },
				{ id: 'u-y', source: 'confounder', target: 'outcome', style: 'dashed' }
			]
		},
		highlights: ['instrument', 'z-d'],
		annotations: [{ targetId: 'instrument', text: 'Exogenous variation', position: 'left' }]
	},
	{
		id: 'nobel-4',
		title: 'The Credibility Revolution',
		description:
			'Together, these economists sparked the "credibility revolution" in empirical economics. Their work shifted focus from complex statistical models to research designs that create credible comparisons - bringing experimental thinking to observational studies.',
		diagram: {
			nodes: [
				{ id: 'design', label: 'Research Design', type: 'variable', x: 210, y: 20 },
				{ id: 'did', label: 'Diff-in-Diff', type: 'treatment', x: 60, y: 100 },
				{ id: 'iv', label: 'IV / 2SLS', type: 'treatment', x: 210, y: 100 },
				{ id: 'rdd', label: 'Regression\nDiscontinuity', type: 'treatment', x: 360, y: 100 }
			],
			edges: [
				{ id: 'd-did', source: 'design', target: 'did' },
				{ id: 'd-iv', source: 'design', target: 'iv' },
				{ id: 'd-rdd', source: 'design', target: 'rdd' }
			]
		},
		highlights: ['did', 'iv', 'rdd']
	}
];

const nobelSection: ContentSection = {
	id: 'nobel',
	type: 'explanation',
	title: 'The 2021 Nobel Prize: Natural Experiments',
	explanation: {
		steps: nobelSteps
	}
};

// =============================================================================
// Section 6: Timeline of Contributions
// =============================================================================

const timelineSection: ContentSection = {
	id: 'timeline',
	type: 'text',
	title: 'A Century of Causal Thinking',
	content: `The development of causal inference spans a century:

- **1923**: Neyman introduces potential outcomes for agricultural experiments
- **1974**: Rubin formalizes the framework, connecting to missing data
- **1988**: Pearl publishes on causal networks and probabilistic reasoning
- **1994**: Card and Krueger's minimum wage study demonstrates natural experiments
- **2021**: Nobel Prize recognizes the transformative impact on empirical research

This intellectual lineage shows how ideas build upon each other. Today, marketers and data scientists benefit from this rich tradition when designing A/B tests, analyzing quasi-experiments, or building causal models for attribution.`
};

// =============================================================================
// Export Lecture Content
// =============================================================================

export const lectureContent: LectureContent = {
	lectureId: 'key-thinkers',
	sections: [
		introSection,
		neymanSection,
		rubinSection,
		pearlSection,
		nobelSection,
		timelineSection
	]
};
