/**
 * Lecture 1: Introduction to Causal Analysis
 *
 * This lecture covers the fundamental concepts of causal inference:
 * - What is causal inference and why does it matter
 * - Confounding and why naive correlations mislead us
 * - Spurious correlation with the classic ice cream example
 * - Selection bias and how it distorts our conclusions
 */

import type { LectureContent, ContentSection } from '../types';
import type { DiagramData } from '$lib/components/diagrams';
import type { ExplanationStep } from '$lib/components/animation';
import { createConfoundingExplanation } from '$lib/components/animation';

// =============================================================================
// Section 1: What is Causal Inference?
// =============================================================================

const introSection: ContentSection = {
	id: 'intro',
	type: 'text',
	title: 'What is Causal Inference?',
	content: `Causal inference is the process of determining whether a relationship between two variables is truly causal or merely correlational. In marketing and business analytics, this distinction is critical: we don't just want to know that two things are related - we want to know if changing one will actually affect the other.

Consider a marketing example: you observe that customers who receive email promotions spend 20% more than those who don't. Does this mean the emails cause higher spending? Or are the customers who opted into emails simply more engaged to begin with?

This is the fundamental challenge of causal inference: separating true cause-and-effect relationships from mere correlation. Getting this wrong can lead to wasted marketing budgets, ineffective interventions, and misleading conclusions.`
};

// =============================================================================
// Section 2: Confounding (Animated Explanation)
// =============================================================================

const confoundingSection: ContentSection = {
	id: 'confounding',
	type: 'explanation',
	title: 'Understanding Confounding',
	explanation: {
		steps: createConfoundingExplanation()
	}
};

// =============================================================================
// Section 3: Spurious Correlation (Ice Cream Example)
// =============================================================================

const iceCreamDiagram: DiagramData = {
	nodes: [
		{ id: 'ice-cream', label: 'Ice Cream Sales', type: 'treatment', x: 100, y: 140 },
		{ id: 'drowning', label: 'Drowning Deaths', type: 'outcome', x: 300, y: 140 },
		{ id: 'summer', label: 'Summer Heat', type: 'confounder', x: 200, y: 40 }
	],
	edges: [
		{ id: 's-i', source: 'summer', target: 'ice-cream' },
		{ id: 's-d', source: 'summer', target: 'drowning' },
		{ id: 'i-d', source: 'ice-cream', target: 'drowning', label: 'Spurious', style: 'dashed' }
	]
};

const spuriousSection: ContentSection = {
	id: 'spurious',
	type: 'diagram',
	title: 'The Classic Example: Ice Cream and Drowning',
	diagram: iceCreamDiagram,
	content: `There's a strong positive correlation between ice cream sales and drowning deaths. Does ice cream cause drowning? Of course not! The real culprit is summer heat - it causes both increased ice cream consumption AND more people swimming, leading to more drowning incidents. This is a textbook example of spurious correlation created by a confounder.`
};

// =============================================================================
// Section 4: Selection Bias (Animated Explanation)
// =============================================================================

const selectionBiasSteps: ExplanationStep[] = [
	{
		id: 'selection-1',
		title: 'The Population',
		description:
			'Imagine we want to study the effect of a new marketing campaign on customer spending. We have a population of potential customers with varying levels of engagement.',
		diagram: {
			nodes: [
				{ id: 'population', label: 'All Customers', type: 'variable', x: 200, y: 80 }
			],
			edges: []
		},
		highlights: ['population']
	},
	{
		id: 'selection-2',
		title: 'Self-Selection into Treatment',
		description:
			'Now, customers who are already highly engaged are more likely to sign up for marketing emails. This creates selection bias - treatment assignment is not random!',
		diagram: {
			nodes: [
				{ id: 'population', label: 'All Customers', type: 'variable', x: 200, y: 40 },
				{ id: 'engagement', label: 'Engagement', type: 'confounder', x: 200, y: 120 },
				{ id: 'emails', label: 'Email Signup', type: 'treatment', x: 100, y: 200 },
				{ id: 'no-emails', label: 'No Emails', type: 'control', x: 300, y: 200 }
			],
			edges: [
				{ id: 'p-e', source: 'population', target: 'engagement' },
				{ id: 'e-em', source: 'engagement', target: 'emails' },
				{ id: 'e-no', source: 'engagement', target: 'no-emails', style: 'dashed' }
			]
		},
		highlights: ['engagement'],
		annotations: [{ targetId: 'engagement', text: 'Drives self-selection', position: 'right' }]
	},
	{
		id: 'selection-3',
		title: 'Biased Comparison',
		description:
			'If we simply compare email subscribers to non-subscribers, we\'re comparing highly engaged customers to less engaged ones. Any difference in spending might be due to engagement, not the emails!',
		diagram: {
			nodes: [
				{ id: 'engagement', label: 'Engagement', type: 'confounder', x: 200, y: 40 },
				{ id: 'emails', label: 'Email Signup', type: 'treatment', x: 100, y: 140 },
				{ id: 'spending', label: 'Spending', type: 'outcome', x: 300, y: 140 }
			],
			edges: [
				{ id: 'e-em', source: 'engagement', target: 'emails' },
				{ id: 'e-sp', source: 'engagement', target: 'spending' },
				{ id: 'em-sp', source: 'emails', target: 'spending', label: 'Biased?', style: 'dashed' }
			]
		},
		highlights: ['em-sp'],
		annotations: [
			{ targetId: 'em-sp', text: 'Cannot trust this comparison!', position: 'bottom' }
		]
	},
	{
		id: 'selection-4',
		title: 'The Selection Bias Problem',
		description:
			'Selection bias occurs when the process by which units select into treatment is related to the outcome. To get a true causal effect, we need methods that account for or eliminate this selection process - like randomized experiments or careful statistical adjustments.',
		diagram: {
			nodes: [
				{ id: 'engagement', label: 'Engagement', type: 'confounder', x: 200, y: 40 },
				{ id: 'emails', label: 'Email Signup', type: 'treatment', x: 100, y: 140 },
				{ id: 'spending', label: 'Spending', type: 'outcome', x: 300, y: 140 }
			],
			edges: [
				{ id: 'e-em', source: 'engagement', target: 'emails' },
				{ id: 'e-sp', source: 'engagement', target: 'spending' },
				{ id: 'em-sp', source: 'emails', target: 'spending', label: 'True Effect?', style: 'dashed' }
			]
		},
		highlights: ['e-em', 'e-sp']
	}
];

const selectionBiasSection: ContentSection = {
	id: 'selection-bias',
	type: 'explanation',
	title: 'Selection Bias',
	explanation: {
		steps: selectionBiasSteps
	}
};

// =============================================================================
// Section 5: Key Takeaway
// =============================================================================

const takeawaySection: ContentSection = {
	id: 'takeaway',
	type: 'text',
	title: 'Key Takeaway: Why Causal Methods Matter',
	content: `The examples above illustrate why we can't simply rely on correlations to make business decisions. Confounding and selection bias are everywhere - and they can lead us to completely wrong conclusions.

In this course, you'll learn a toolkit of methods for establishing causal relationships:

1. **Randomized Experiments (A/B Tests)** - The gold standard. By randomly assigning treatment, we eliminate confounding by design.

2. **Matching Methods** - When randomization isn't possible, we can try to create comparable groups by matching on observed characteristics.

3. **Instrumental Variables** - Using external sources of variation that affect treatment but not outcomes directly.

4. **Difference-in-Differences** - Comparing changes over time between treated and untreated groups.

Each method has its strengths, limitations, and assumptions. Understanding when and how to apply them is essential for any data-driven marketer or analyst.`
};

// =============================================================================
// Export Lecture Content
// =============================================================================

export const lectureContent: LectureContent = {
	lectureId: 'introduction',
	sections: [
		introSection,
		confoundingSection,
		spuriousSection,
		selectionBiasSection,
		takeawaySection
	]
};
