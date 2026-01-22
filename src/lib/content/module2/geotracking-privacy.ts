/**
 * Lecture 3: Geotracking Data and Privacy
 *
 * This lecture covers:
 * - How geotracking improves customer behavior prediction
 * - The privacy-accuracy trade-off
 * - Regulatory landscape (GDPR, CCPA)
 * - Strategic balance for businesses
 */

import type { LectureContent, ContentSection } from '../types';
import type { DiagramData } from '$lib/components/diagrams';
import type { ExplanationStep } from '$lib/components/animation';

// =============================================================================
// Section 1: Research Question
// =============================================================================

const researchQuestionSection: ContentSection = {
	id: 'research-question',
	type: 'text',
	title: 'Research Question',
	content: `**Can geotracking improve customer behavior prediction?**

This question drives a growing body of marketing research. Location data captures real-world behavior in ways that surveys and transaction records cannot.

**The Dataset**

Researchers studied a massive dataset to answer this question:
- **120 million trips** tracked via mobile devices
- **40,000 users** over an extended period
- **400 restaurants** in Texas

This data was combined with:
- **Demographics** - Age, income, household composition
- **Behavioral history** - Past purchases, loyalty program activity
- **Contextual signals** - Time of day, day of week

The research question: Does adding geotracking data to traditional predictive models significantly improve prediction accuracy?

**Spoiler: The answer is yes, but with important caveats about privacy.**`
};

// =============================================================================
// Section 2: How Geotracking Improves Prediction (Animated Explanation)
// =============================================================================

const geotrackingImprovementSteps: ExplanationStep[] = [
	{
		id: 'geo-1',
		title: 'Baseline Model: Demographics Only',
		description:
			'Traditional prediction models rely on demographics: age, income, location, household size. These provide a baseline level of prediction accuracy.',
		diagram: {
			nodes: [
				{ id: 'demo', label: 'Demographics', type: 'treatment', x: 210, y: 60 }
			],
			edges: []
		},
		highlights: ['demo'],
		annotations: [{ targetId: 'demo', text: 'Age, income, household', position: 'bottom' }]
	},
	{
		id: 'geo-2',
		title: 'Adding Behavioral Data',
		description:
			'Adding behavioral history improves predictions. Past purchases, loyalty program engagement, and purchase frequency provide additional signal about future behavior.',
		diagram: {
			nodes: [
				{ id: 'demo', label: 'Demographics', type: 'treatment', x: 130, y: 60 },
				{ id: 'behavior', label: 'Behavioral History', type: 'control', x: 290, y: 60 },
				{ id: 'prediction', label: 'Prediction', type: 'outcome', x: 210, y: 130 }
			],
			edges: [
				{ id: 'd-p', source: 'demo', target: 'prediction' },
				{ id: 'b-p', source: 'behavior', target: 'prediction' }
			]
		},
		highlights: ['behavior'],
		annotations: [{ targetId: 'behavior', text: 'Past purchases, loyalty', position: 'top' }]
	},
	{
		id: 'geo-3',
		title: 'Adding Geotracking Data',
		description:
			'Geotracking data captures real-world behavior that neither demographics nor transaction history can reveal. Where people go, how long they stay, what routes they take - this is behavioral context at its richest.',
		diagram: {
			nodes: [
				{ id: 'demo', label: 'Demographics', type: 'treatment', x: 80, y: 40 },
				{ id: 'behavior', label: 'Behavioral', type: 'control', x: 210, y: 40 },
				{ id: 'geo', label: 'Geotracking', type: 'confounder', x: 340, y: 40 },
				{ id: 'prediction', label: 'Prediction', type: 'outcome', x: 210, y: 120 }
			],
			edges: [
				{ id: 'd-p', source: 'demo', target: 'prediction' },
				{ id: 'b-p', source: 'behavior', target: 'prediction' },
				{ id: 'g-p', source: 'geo', target: 'prediction' }
			]
		},
		highlights: ['geo', 'prediction'],
		annotations: [{ targetId: 'geo', text: '+15% accuracy boost', position: 'top' }]
	},
	{
		id: 'geo-4',
		title: 'The Real Behavior Context',
		description:
			'The key insight: geotracking captures "real behavior context" - the physical world patterns that precede and predict customer decisions. Someone who visits gym facilities regularly has different dining preferences than someone who frequents entertainment venues.',
		diagram: {
			nodes: [
				{ id: 'demo', label: 'Demographics', type: 'treatment', x: 60, y: 30 },
				{ id: 'behavior', label: 'Behavioral', type: 'control', x: 180, y: 30 },
				{ id: 'geo', label: 'Geotracking', type: 'confounder', x: 300, y: 30 },
				{ id: 'context', label: 'Real Behavior\nContext', type: 'variable', x: 380, y: 90 },
				{ id: 'prediction', label: 'Better\nPrediction', type: 'outcome', x: 210, y: 130 }
			],
			edges: [
				{ id: 'd-p', source: 'demo', target: 'prediction' },
				{ id: 'b-p', source: 'behavior', target: 'prediction' },
				{ id: 'g-c', source: 'geo', target: 'context' },
				{ id: 'c-p', source: 'context', target: 'prediction' }
			]
		},
		highlights: ['context', 'prediction'],
		annotations: [{ targetId: 'context', text: 'Where you go reveals who you are', position: 'right' }]
	}
];

const geotrackingImprovementSection: ContentSection = {
	id: 'geotracking-improvement',
	type: 'explanation',
	title: 'How Geotracking Improves Prediction',
	explanation: {
		steps: geotrackingImprovementSteps
	}
};

// =============================================================================
// Section 3: Privacy Concerns
// =============================================================================

const privacyConcernsSection: ContentSection = {
	id: 'privacy-concerns',
	type: 'text',
	title: 'Privacy Concerns',
	content: `**Consumer Privacy Rights**

While geotracking improves prediction, it raises significant privacy concerns:
- **Location reveals sensitive information** - religious practices, medical visits, political affiliations
- **Aggregation risk** - combining location with other data creates detailed personal profiles
- **Consent complexity** - do users truly understand what they're agreeing to?

**The Regulatory Landscape**

Governments are responding with privacy regulations:

**GDPR (Europe)**
- Requires explicit consent for data collection
- Right to be forgotten
- Data portability requirements
- Significant fines for violations

**CCPA (California)**
- Right to know what data is collected
- Right to delete personal information
- Right to opt-out of data sales
- Expanding to other US states

**The Trade-off Challenge**

This creates a fundamental tension for marketers:
- More data = better predictions = better customer experiences
- But more data collection = higher privacy risk = regulatory exposure

How do companies navigate this trade-off? The research provides some answers.`
};

// =============================================================================
// Section 4: Privacy vs Accuracy Trade-off (Animated Explanation)
// =============================================================================

const privacyAccuracySteps: ExplanationStep[] = [
	{
		id: 'tradeoff-1',
		title: 'The Trade-off Framework',
		description:
			'We can visualize the privacy-accuracy trade-off on a graph. The X-axis represents privacy restrictions (from none to maximum), and the Y-axis represents prediction accuracy.',
		diagram: {
			nodes: [
				{ id: 'x-axis', label: 'Privacy Restrictions', type: 'variable', x: 210, y: 140 },
				{ id: 'y-axis', label: 'Prediction\nAccuracy', type: 'variable', x: 40, y: 60 }
			],
			edges: []
		},
		highlights: ['x-axis', 'y-axis'],
		annotations: [
			{ targetId: 'x-axis', text: 'Low → High', position: 'bottom' },
			{ targetId: 'y-axis', text: 'Low → High', position: 'left' }
		]
	},
	{
		id: 'tradeoff-2',
		title: 'Full Data Point',
		description:
			'With full, unrestricted geotracking data, prediction accuracy is highest. This is the "full data" scenario - maximum accuracy but minimum privacy protection.',
		diagram: {
			nodes: [
				{ id: 'x-axis', label: 'Privacy Restrictions', type: 'variable', x: 210, y: 140 },
				{ id: 'y-axis', label: 'Accuracy', type: 'variable', x: 40, y: 60 },
				{ id: 'full', label: 'Full Data', type: 'treatment', x: 100, y: 40 }
			],
			edges: []
		},
		highlights: ['full'],
		annotations: [{ targetId: 'full', text: 'Highest accuracy\nLowest privacy', position: 'right' }]
	},
	{
		id: 'tradeoff-3',
		title: 'Aggregated/Synthetic Data',
		description:
			'One privacy approach: aggregate or synthesize data so individuals cannot be identified. This provides strong privacy but reduces prediction accuracy by approximately 16%.',
		diagram: {
			nodes: [
				{ id: 'x-axis', label: 'Privacy Restrictions', type: 'variable', x: 210, y: 140 },
				{ id: 'y-axis', label: 'Accuracy', type: 'variable', x: 40, y: 60 },
				{ id: 'full', label: 'Full Data', type: 'treatment', x: 100, y: 40 },
				{ id: 'agg', label: 'Aggregated/\nSynthetic', type: 'control', x: 320, y: 80 }
			],
			edges: [
				{ id: 'f-a', source: 'full', target: 'agg', style: 'dashed' }
			]
		},
		highlights: ['agg'],
		annotations: [{ targetId: 'agg', text: '~16% accuracy loss', position: 'bottom' }]
	},
	{
		id: 'tradeoff-4',
		title: 'Geofence/Reduced Frequency',
		description:
			'Alternative approaches like geofencing (only tracking near certain locations) or reduced collection frequency preserve more accuracy. These approaches show only about 5% accuracy loss.',
		diagram: {
			nodes: [
				{ id: 'x-axis', label: 'Privacy Restrictions', type: 'variable', x: 210, y: 140 },
				{ id: 'y-axis', label: 'Accuracy', type: 'variable', x: 40, y: 60 },
				{ id: 'full', label: 'Full Data', type: 'treatment', x: 100, y: 40 },
				{ id: 'geo', label: 'Geofence/\nReduced', type: 'confounder', x: 200, y: 55 },
				{ id: 'agg', label: 'Aggregated/\nSynthetic', type: 'control', x: 320, y: 80 }
			],
			edges: [
				{ id: 'f-g', source: 'full', target: 'geo', style: 'dashed' },
				{ id: 'g-a', source: 'geo', target: 'agg', style: 'dashed' }
			]
		},
		highlights: ['geo'],
		annotations: [{ targetId: 'geo', text: '~5% accuracy loss', position: 'bottom' }]
	},
	{
		id: 'tradeoff-5',
		title: 'Key Insight',
		description:
			'The critical finding: even privacy-restricted geotracking data significantly outperforms models with no geotracking at all. Companies can respect privacy while still benefiting from location data - they just need to choose their approach wisely.',
		diagram: {
			nodes: [
				{ id: 'full', label: 'Full Data', type: 'treatment', x: 80, y: 40 },
				{ id: 'geo', label: 'Geofence', type: 'confounder', x: 180, y: 55 },
				{ id: 'agg', label: 'Aggregated', type: 'control', x: 280, y: 75 },
				{ id: 'none', label: 'No Geo Data', type: 'outcome', x: 380, y: 110 }
			],
			edges: [
				{ id: 'f-g', source: 'full', target: 'geo', style: 'dashed' },
				{ id: 'g-a', source: 'geo', target: 'agg', style: 'dashed' },
				{ id: 'a-n', source: 'agg', target: 'none', style: 'dashed' }
			]
		},
		highlights: ['geo', 'agg'],
		annotations: [{ targetId: 'none', text: 'Still worse than restricted geo', position: 'bottom' }]
	}
];

const privacyAccuracySection: ContentSection = {
	id: 'privacy-accuracy-tradeoff',
	type: 'explanation',
	title: 'Privacy vs Accuracy Trade-off',
	explanation: {
		steps: privacyAccuracySteps
	}
};

// =============================================================================
// Section 5: Business Trade-Off Table (Diagram)
// =============================================================================

const businessTradeoffDiagram: DiagramData = {
	nodes: [
		{ id: 'accuracy-title', label: 'Accuracy Side', type: 'treatment', x: 110, y: 30 },
		{ id: 'acc-1', label: 'Higher Precision', type: 'variable', x: 110, y: 90 },
		{ id: 'acc-2', label: 'More Detailed Data', type: 'variable', x: 110, y: 140 },
		{ id: 'privacy-title', label: 'Privacy Side', type: 'control', x: 310, y: 30 },
		{ id: 'priv-1', label: 'Regulatory Risk', type: 'variable', x: 310, y: 90 },
		{ id: 'priv-2', label: 'Ethical Complexity', type: 'variable', x: 310, y: 140 }
	],
	edges: [
		{ id: 'at-a1', source: 'accuracy-title', target: 'acc-1' },
		{ id: 'a1-a2', source: 'acc-1', target: 'acc-2' },
		{ id: 'pt-p1', source: 'privacy-title', target: 'priv-1' },
		{ id: 'p1-p2', source: 'priv-1', target: 'priv-2' }
	]
};

const businessTradeoffSection: ContentSection = {
	id: 'business-tradeoff',
	type: 'diagram',
	title: 'Business Trade-Off Table',
	diagram: businessTradeoffDiagram,
	content: `**Companies must choose their optimal balance point.**

**Benefits of more data (Accuracy Side):**
- Higher precision in targeting and personalization
- More detailed understanding of customer journeys
- Better ROI on marketing spend
- Competitive advantage in customer experience

**Costs of more data (Privacy Side):**
- Higher regulatory risk (GDPR fines can reach 4% of global revenue)
- Ethical complexity and brand reputation risk
- Consumer trust erosion if data practices are exposed
- Operational costs of data security and compliance

**Finding the Balance**

The research suggests a middle path: use privacy-preserving techniques that maintain most predictive value while reducing risk:
- Geofencing instead of continuous tracking
- Aggregation where individual-level data isn't essential
- Clear consent and transparency with users
- Regular privacy impact assessments`
};

// =============================================================================
// Section 6: Key Findings
// =============================================================================

const keyFindingsSection: ContentSection = {
	id: 'key-findings',
	type: 'text',
	title: 'Key Findings',
	content: `**Summary: What We Learned**

**1. Geotracking Significantly Improves Prediction**

Adding location data to traditional predictive models can boost accuracy by 15% or more. This is not a marginal improvement - it's a substantial competitive advantage for companies that can leverage this data effectively.

**2. Privacy Regulations Reduce Performance**

Privacy restrictions come with real costs. Full compliance with strict privacy requirements can reduce prediction accuracy by up to 16%. This is the price of privacy.

**3. Even Restricted Data Outperforms No Data**

Here's the good news: privacy-compliant geotracking approaches still significantly outperform models with no location data at all. You don't have to choose between privacy and prediction - you can have most of both.

**4. Strategic Balance Required**

The optimal strategy depends on:
- Your industry and competitive dynamics
- Your regulatory environment
- Your customer base's privacy expectations
- Your technical capabilities for privacy-preserving analytics

**Practical Implications**

For marketers, this research suggests:
- **Don't ignore geotracking** - the predictive value is real and significant
- **Invest in privacy-preserving techniques** - they recover most of the value
- **Be transparent with customers** - trust is a competitive advantage
- **Monitor the regulatory landscape** - it's evolving quickly`
};

// =============================================================================
// Export Lecture Content
// =============================================================================

export const lectureContent: LectureContent = {
	lectureId: 'geotracking-privacy',
	sections: [
		researchQuestionSection,
		geotrackingImprovementSection,
		privacyConcernsSection,
		privacyAccuracySection,
		businessTradeoffSection,
		keyFindingsSection
	]
};
