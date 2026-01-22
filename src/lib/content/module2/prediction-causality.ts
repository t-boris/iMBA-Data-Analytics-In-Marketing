/**
 * Lecture 5: Prediction and Causality
 *
 * This lecture covers:
 * - Prediction vs causality: different but complementary questions
 * - Mobile advertising case study combining ML and causal inference
 * - How to integrate ML prediction with causal analysis
 * - Strategic implications for marketing decision-making
 */

import type { LectureContent, ContentSection } from '../types';
import type { DiagramData } from '$lib/components/diagrams';
import type { ExplanationStep } from '$lib/components/animation';

// =============================================================================
// Section 1: Prediction vs Causality
// =============================================================================

const predictionVsCausalitySection: ContentSection = {
	id: 'prediction-vs-causality',
	type: 'text',
	title: 'Prediction vs Causality',
	content: `**Two Fundamental Questions**

In marketing analytics, we often confuse two very different questions:

**Prediction: "What will happen?"**
- Based on correlations and patterns in data
- Useful for targeting, personalization, forecasting
- Answers: Who is likely to click? What will sales be next quarter?
- Machine learning excels at this

**Causality: "Why did it happen?"**
- Based on cause-and-effect relationships
- Useful for understanding impact and making interventions
- Answers: Did the ad cause the purchase? What effect did the promotion have?
- Requires careful experimental or quasi-experimental design

**Why Both Matter**

Consider a simple example: You run an ad campaign and observe that people who saw the ad purchased more.

- **Prediction** tells you: These are the characteristics of high-value customers
- **Causality** tells you: Did the ad actually increase purchases, or would those customers have bought anyway?

Without causality, you might keep targeting people who would have purchased regardless - wasting ad spend while claiming success.

**The Module Connection**

This lecture bridges Module 2 (prediction with ML) and Module 1 (causal inference). The most powerful marketing analytics combines both approaches.`
};

// =============================================================================
// Section 2: The Critical Difference (Animated Explanation)
// =============================================================================

const criticalDifferenceSteps: ExplanationStep[] = [
	{
		id: 'critical-1',
		title: 'Step 1: Prediction',
		description:
			'Machine learning models are excellent at prediction. Given features about a user, they can estimate the probability of clicking an ad with high accuracy.',
		diagram: {
			nodes: [
				{ id: 'prediction', label: 'Prediction\nModel', type: 'confounder', x: 110, y: 60 },
				{ id: 'output', label: 'High Click\nProbability', type: 'outcome', x: 310, y: 60 }
			],
			edges: [{ id: 'p-o', source: 'prediction', target: 'output' }]
		},
		highlights: ['prediction', 'output'],
		annotations: [{ targetId: 'output', text: '85% likely to click', position: 'bottom' }]
	},
	{
		id: 'critical-2',
		title: 'Step 2: But Did the Ad Cause the Click?',
		description:
			'Prediction tells us the probability of clicking, but not whether the ad caused the click. The user might have clicked anyway - perhaps they were already searching for the product.',
		diagram: {
			nodes: [
				{ id: 'prediction', label: 'Prediction\nModel', type: 'confounder', x: 110, y: 40 },
				{ id: 'output', label: 'High Click\nProbability', type: 'outcome', x: 310, y: 40 },
				{ id: 'question', label: 'Did the Ad\nCAUSE the Click?', type: 'treatment', x: 210, y: 120 }
			],
			edges: [{ id: 'p-o', source: 'prediction', target: 'output' }]
		},
		highlights: ['question'],
		annotations: [{ targetId: 'question', text: 'Prediction cannot answer this', position: 'bottom' }]
	},
	{
		id: 'critical-3',
		title: 'Step 3: Causality Answers the "Why"',
		description:
			'Causal inference asks: Would this person have clicked even without seeing the ad? This is the counterfactual question - and it determines whether the ad spend was worthwhile.',
		diagram: {
			nodes: [
				{ id: 'causality', label: 'Causal\nAnalysis', type: 'treatment', x: 110, y: 60 },
				{ id: 'counterfactual', label: 'Would They Click\nAnyway?', type: 'variable', x: 310, y: 60 }
			],
			edges: [{ id: 'c-cf', source: 'causality', target: 'counterfactual' }]
		},
		highlights: ['causality', 'counterfactual'],
		annotations: [{ targetId: 'counterfactual', text: 'The counterfactual question', position: 'bottom' }]
	},
	{
		id: 'critical-4',
		title: 'Step 4: Both Needed for Full Picture',
		description:
			'Optimal marketing decisions require both: prediction identifies who to target, while causality measures the true incremental impact. Together, they answer who AND whether.',
		diagram: {
			nodes: [
				{ id: 'prediction', label: 'Prediction', type: 'confounder', x: 100, y: 30 },
				{ id: 'causality', label: 'Causality', type: 'treatment', x: 100, y: 100 },
				{ id: 'who', label: 'WHO to Target', type: 'variable', x: 280, y: 30 },
				{ id: 'whether', label: 'WHETHER It Works', type: 'variable', x: 280, y: 100 },
				{ id: 'optimal', label: 'Optimal\nDecisions', type: 'outcome', x: 380, y: 65 }
			],
			edges: [
				{ id: 'p-w', source: 'prediction', target: 'who' },
				{ id: 'c-wh', source: 'causality', target: 'whether' },
				{ id: 'who-o', source: 'who', target: 'optimal' },
				{ id: 'wh-o', source: 'whether', target: 'optimal' }
			]
		},
		highlights: ['optimal'],
		annotations: [{ targetId: 'optimal', text: 'Prediction + Causality = Better Marketing', position: 'right' }]
	}
];

const criticalDifferenceSection: ContentSection = {
	id: 'critical-difference',
	type: 'explanation',
	title: 'The Critical Difference',
	explanation: {
		steps: criticalDifferenceSteps
	}
};

// =============================================================================
// Section 3: Mobile Advertising Case Study (Diagram)
// =============================================================================

const mobileAdvertisingDiagram: DiagramData = {
	nodes: [
		{ id: 'targeting', label: 'Targeting Model\n(ML)', type: 'confounder', x: 100, y: 50 },
		{ id: 'outcomes', label: 'Market Outcomes\n(Causal)', type: 'treatment', x: 320, y: 50 },
		{ id: 'who', label: 'Who Sees Ads', type: 'variable', x: 100, y: 130 },
		{ id: 'impact', label: 'Economic Impact', type: 'variable', x: 320, y: 130 },
		{ id: 'decision', label: 'Optimal Ad\nStrategy', type: 'outcome', x: 210, y: 180 }
	],
	edges: [
		{ id: 't-w', source: 'targeting', target: 'who' },
		{ id: 'o-i', source: 'outcomes', target: 'impact' },
		{ id: 'w-d', source: 'who', target: 'decision' },
		{ id: 'i-d', source: 'impact', target: 'decision' },
		{ id: 't-o', source: 'targeting', target: 'outcomes', style: 'dashed' }
	]
};

const mobileAdvertisingSection: ContentSection = {
	id: 'mobile-advertising',
	type: 'diagram',
	title: 'Mobile Advertising Case Study',
	diagram: mobileAdvertisingDiagram,
	content: `**A Two-Model Framework**

Research on mobile advertising demonstrates the power of combining prediction and causality:

**Model 1: Targeting Model (Machine Learning)**
- Predicts which users are most likely to click/convert
- Uses features: demographics, browsing history, location, device
- Goal: Identify high-potential users for ad delivery
- This is the prediction problem

**Model 2: Market Outcomes Model (Causal Inference)**
- Measures the actual economic impact of showing ads
- Uses experimental or quasi-experimental methods
- Answers: What is the incremental revenue from advertising?
- This is the causality problem

**How They Work Together**

The targeting model decides WHO sees the ad.
The outcomes model measures WHETHER showing the ad was profitable.

The dashed arrow shows the key insight: feeding causal insights back into targeting improves both prediction AND profitability.

**The Research Setting**
- Large mobile advertising platform
- Millions of ad impressions analyzed
- A/B tests to establish causal effects
- ML models to predict user behavior`
};

// =============================================================================
// Section 4: Key Results
// =============================================================================

const keyResultsSection: ContentSection = {
	id: 'key-results',
	type: 'text',
	title: 'Key Results',
	content: `**Surprising Findings**

The mobile advertising research revealed counterintuitive results:

**1. ML Targeting Improves Click-Through Rate**

Machine learning targeting achieved a **+67% increase** in click-through rate compared to random targeting. This is the prediction success story - ML is very good at identifying who will click.

**2. But Best Targeting Does Not Equal Maximum Revenue**

Here's the surprise: targeting the users most likely to click did not maximize revenue. Why?

- High-probability clickers might click anyway (no incremental impact)
- Some users who click don't convert to purchases
- The cost of reaching "easy" targets may not justify the return

**3. More Privacy Sometimes Equals Higher Revenue**

Even more surprising: in some conditions, using less personal data (more privacy protection) actually increased revenue. This happened because:

- Privacy restrictions prevented over-targeting of "obvious" customers
- Forced the algorithm to find users with genuine incremental response
- Reduced wasted spend on users who would convert anyway

**The Core Insight**

**More prediction power does not automatically mean more profit.**

The relationship between prediction accuracy and business outcomes is not linear. Optimal marketing requires understanding the causal impact, not just the prediction accuracy.

This is why companies need both prediction AND causality in their analytics toolkit.`
};

// =============================================================================
// Section 5: Combining ML + Causality (Animated Explanation)
// =============================================================================

const combiningMlCausalitySteps: ExplanationStep[] = [
	{
		id: 'combine-1',
		title: 'Step 1: Unstructured Data',
		description:
			'Marketing generates massive amounts of unstructured data: customer reviews, social media posts, support tickets, survey responses. This data is rich in signal but hard to use in traditional analysis.',
		diagram: {
			nodes: [
				{ id: 'unstructured', label: 'Unstructured\nData', type: 'variable', x: 210, y: 60 }
			],
			edges: []
		},
		highlights: ['unstructured'],
		annotations: [{ targetId: 'unstructured', text: 'Reviews, text, social media', position: 'bottom' }]
	},
	{
		id: 'combine-2',
		title: 'Step 2: ML/NLP Extracts Features',
		description:
			'Machine learning and natural language processing transform unstructured text into structured features: sentiment scores, topic classifications, intent signals, entity mentions.',
		diagram: {
			nodes: [
				{ id: 'unstructured', label: 'Unstructured\nData', type: 'variable', x: 100, y: 60 },
				{ id: 'mlnlp', label: 'ML / NLP', type: 'confounder', x: 250, y: 60 },
				{ id: 'features', label: 'Extracted\nFeatures', type: 'variable', x: 380, y: 60 }
			],
			edges: [
				{ id: 'u-m', source: 'unstructured', target: 'mlnlp' },
				{ id: 'm-f', source: 'mlnlp', target: 'features' }
			]
		},
		highlights: ['mlnlp', 'features'],
		annotations: [{ targetId: 'features', text: 'Sentiment, intent, topics', position: 'bottom' }]
	},
	{
		id: 'combine-3',
		title: 'Step 3: Features Feed Causal Regression',
		description:
			'The ML-extracted features become control variables in causal regression models. This allows researchers to account for previously unmeasurable confounders and isolate causal effects.',
		diagram: {
			nodes: [
				{ id: 'unstructured', label: 'Unstructured', type: 'variable', x: 60, y: 40 },
				{ id: 'mlnlp', label: 'ML/NLP', type: 'confounder', x: 160, y: 40 },
				{ id: 'features', label: 'Features', type: 'variable', x: 260, y: 40 },
				{ id: 'causal', label: 'Causal\nRegression', type: 'treatment', x: 360, y: 40 }
			],
			edges: [
				{ id: 'u-m', source: 'unstructured', target: 'mlnlp' },
				{ id: 'm-f', source: 'mlnlp', target: 'features' },
				{ id: 'f-c', source: 'features', target: 'causal' }
			]
		},
		highlights: ['causal'],
		annotations: [{ targetId: 'causal', text: 'Control for text-derived confounders', position: 'bottom' }]
	},
	{
		id: 'combine-4',
		title: 'Step 4: Estimated Causal Effects',
		description:
			'The output is credible causal estimates that leverage both the pattern-finding power of ML and the rigor of causal inference. This is the best of both worlds.',
		diagram: {
			nodes: [
				{ id: 'unstructured', label: 'Unstructured', type: 'variable', x: 50, y: 30 },
				{ id: 'mlnlp', label: 'ML/NLP', type: 'confounder', x: 140, y: 30 },
				{ id: 'features', label: 'Features', type: 'variable', x: 230, y: 30 },
				{ id: 'causal', label: 'Causal\nRegression', type: 'treatment', x: 320, y: 30 },
				{ id: 'effects', label: 'Estimated\nCausal Effects', type: 'outcome', x: 410, y: 30 },
				{ id: 'best', label: 'ML Power +\nCausal Rigor', type: 'outcome', x: 230, y: 120 }
			],
			edges: [
				{ id: 'u-m', source: 'unstructured', target: 'mlnlp' },
				{ id: 'm-f', source: 'mlnlp', target: 'features' },
				{ id: 'f-c', source: 'features', target: 'causal' },
				{ id: 'c-e', source: 'causal', target: 'effects' },
				{ id: 'e-b', source: 'effects', target: 'best' }
			]
		},
		highlights: ['effects', 'best'],
		annotations: [{ targetId: 'effects', text: 'Actionable insights', position: 'right' }]
	}
];

const combiningMlCausalitySection: ContentSection = {
	id: 'combining-ml-causality',
	type: 'explanation',
	title: 'Combining ML + Causality',
	explanation: {
		steps: combiningMlCausalitySteps
	}
};

// =============================================================================
// Section 6: Strategic Integration
// =============================================================================

const strategicIntegrationSection: ContentSection = {
	id: 'strategic-integration',
	type: 'text',
	title: 'Strategic Integration',
	content: `**The Modern Marketing Analytics Stack**

The most sophisticated marketing organizations combine prediction and causality:

**Prediction (ML) Provides:**
- Fast, scalable decisions
- Personalization at scale
- Pattern recognition in complex data
- Operational efficiency

**Causality Provides:**
- Strategic confidence
- Investment justification
- Counterfactual understanding
- Risk assessment

**Together: Tactical + Strategic Intelligence**

| Capability | Prediction | Causality | Combined |
|------------|-----------|-----------|----------|
| Speed | Fast | Slower | Balanced |
| Scale | High | Limited | Prioritized |
| Confidence | Correlational | Causal | Full picture |
| Use case | Targeting | Evaluation | Both |

**This Is the Future of Marketing Analytics**

The leading companies are not choosing between ML and causal inference - they're integrating both:

1. **Use ML** to identify patterns, target customers, and automate decisions
2. **Use causality** to validate that ML-driven actions actually create value
3. **Feed causal insights back** to improve ML models
4. **Iterate continuously** as data and markets evolve

**Key Takeaways**

- Prediction without causality risks optimizing for the wrong outcomes
- Causality without prediction is too slow for modern marketing
- The combination creates a sustainable competitive advantage
- Start with prediction for quick wins, add causality for strategic decisions

**Connection to Module 1**

The causal inference methods from Module 1 (experiments, DID, IV, matching) are essential for evaluating the predictions from Module 2. These two modules are complementary, not competing frameworks.`
};

// =============================================================================
// Export Lecture Content
// =============================================================================

export const lectureContent: LectureContent = {
	lectureId: 'prediction-causality',
	sections: [
		predictionVsCausalitySection,
		criticalDifferenceSection,
		mobileAdvertisingSection,
		keyResultsSection,
		combiningMlCausalitySection,
		strategicIntegrationSection
	]
};
