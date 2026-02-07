/**
 * Lecture 7: Customer Churn and Incrementality
 *
 * This lecture covers the evolution from naive churn prediction to incrementality-based targeting:
 * - Churn and CLV connection
 * - Traditional churn prediction approach (and its flaw)
 * - Outcome-based vs incrementality-based targeting (2x2 matrix)
 * - The incrementality revolution
 * - Uplift modeling
 * - Industry applications
 * - The strategic shift from prediction to causality
 */

import type { LectureContent, ContentSection } from '../types';
import type { DiagramData } from '$lib/components/diagrams';
import type { ExplanationStep } from '$lib/components/animation';

// =============================================================================
// Section 1: Churn and CLV
// =============================================================================

const churnClvSection: ContentSection = {
	id: 'churn-and-clv',
	type: 'text',
	title: 'Churn and CLV',
	content: `This lecture directly continues the **Customer Lifetime Value** theme, because the most critical driver of CLV is customer retention. The connection is mathematically direct and strategically unavoidable:

**If a customer churns, all future cash flows disappear.**

Recall the CLV formula: each future period's contribution is multiplied by the retention probability raised to the power of time. When a customer leaves, the retention term drops to zero, and every subsequent period's value vanishes with it. CLV depends on retention the way a building depends on its foundation.

**Customer churn** means:
- **Lost revenue** — immediate and ongoing
- **Lost margin** — not just revenue, but the profit that customer would have generated
- **A signal of deeper problems** — product-market fit issues, pricing problems, competitive pressure, poor onboarding, or declining satisfaction

**This makes churn prevention the most direct lever on CLV.** Improving retention by even a few percentage points compounds across the entire customer base and across all future periods. The question is not whether to invest in retention, but how to invest intelligently.

The traditional answer — predict who will churn and target them with retention campaigns — sounds logical. But as we will see, this approach has a fundamental flaw that wastes most of the retention budget.`
};

// =============================================================================
// Section 2: The Traditional Approach (Animated Explanation)
// =============================================================================

const traditionalSteps: ExplanationStep[] = [
	{
		id: 'trad-1',
		title: 'Churn Prediction Model',
		description:
			'The traditional approach starts by building a machine learning model trained on usage patterns, demographics, payment data, and interaction history. The model outputs a churn propensity score — a probability estimate of whether each customer will leave. Customers are then ranked from highest to lowest churn risk, creating a prioritized list for retention efforts.',
		diagram: {
			nodes: [
				{ id: 'data', label: 'Customer Data\nUsage, Demographics\nPayments, History', type: 'variable', x: 80, y: 90 },
				{ id: 'model', label: 'ML Prediction\nModel', type: 'treatment', x: 230, y: 90 },
				{ id: 'score', label: 'Churn\nPropensity Score', type: 'outcome', x: 380, y: 90 }
			],
			edges: [
				{ id: 'd-m', source: 'data', target: 'model', label: 'features' },
				{ id: 'm-s', source: 'model', target: 'score', label: 'predicts' }
			]
		},
		highlights: ['score'],
		annotations: [{ targetId: 'score', text: 'Probability of leaving', position: 'top' }]
	},
	{
		id: 'trad-2',
		title: 'Targeting High Risk',
		description:
			'The natural next step: take the top-N customers with the highest churn risk and launch a retention campaign. Offer them discounts, bonuses, dedicated support, special deals — anything to prevent them from leaving. This sounds completely logical. You know who is most likely to leave, so you focus your resources on keeping them. What could go wrong?',
		diagram: {
			nodes: [
				{ id: 'ranked', label: 'Ranked\nCustomers', type: 'variable', x: 80, y: 90 },
				{ id: 'top-n', label: 'Top-N\nHighest Risk', type: 'confounder', x: 230, y: 90 },
				{ id: 'campaign', label: 'Retention\nCampaign', type: 'treatment', x: 380, y: 90 }
			],
			edges: [
				{ id: 'r-t', source: 'ranked', target: 'top-n', label: 'select' },
				{ id: 't-c', source: 'top-n', target: 'campaign', label: 'target with' }
			]
		},
		highlights: ['top-n'],
		annotations: [{ targetId: 'top-n', text: 'Sounds logical...', position: 'top' }]
	},
	{
		id: 'trad-3',
		title: 'The Hidden Problem',
		description:
			'Not all high-risk customers are the same. Within the "high churn risk" group, three fundamentally different types of customers exist: (1) those who will leave no matter what you do — no discount or intervention can change their mind; (2) those who will stay no matter what — they look risky by the model but will actually remain; (3) those who will leave IF you do not intervene, but will stay IF you do. The retention budget is wasted on groups 1 and 2, and only group 3 represents real return on investment.',
		diagram: {
			nodes: [
				{ id: 'high-risk', label: 'High Risk\nCustomers', type: 'confounder', x: 210, y: 30 },
				{ id: 'leave', label: 'Type 1\nWill Leave\nNo Matter What', type: 'variable', x: 60, y: 130 },
				{ id: 'stay', label: 'Type 2\nWill Stay\nNo Matter What', type: 'control', x: 210, y: 130 },
				{ id: 'persuadable', label: 'Type 3\nPersuadable\nTHE TARGET', type: 'outcome', x: 370, y: 130 }
			],
			edges: [
				{ id: 'h-l', source: 'high-risk', target: 'leave' },
				{ id: 'h-s', source: 'high-risk', target: 'stay' },
				{ id: 'h-p', source: 'high-risk', target: 'persuadable' }
			]
		},
		highlights: ['persuadable'],
		annotations: [
			{ targetId: 'leave', text: 'Budget wasted', position: 'bottom' },
			{ targetId: 'stay', text: 'Budget wasted', position: 'bottom' },
			{ targetId: 'persuadable', text: 'Real ROI here', position: 'bottom' }
		]
	},
	{
		id: 'trad-4',
		title: 'The Fitness Example',
		description:
			'Consider a fitness subscription service that identifies 10,000 high-risk customers and launches an expensive retention campaign with free months and bonus offers. Reality: some customers leave anyway (they already decided), some would have stayed regardless (they just had unusual usage patterns), and only a fraction were actually persuadable. The ROI is weak because the model predicted churn risk, not the IMPACT of intervention. Prediction alone is not enough.',
		diagram: {
			nodes: [
				{ id: 'ten-k', label: '10,000\nHigh-Risk', type: 'confounder', x: 80, y: 90 },
				{ id: 'expensive', label: 'Expensive\nCampaign', type: 'treatment', x: 230, y: 90 },
				{ id: 'weak-roi', label: 'Weak ROI\nMost Budget Wasted', type: 'variable', x: 380, y: 90 }
			],
			edges: [
				{ id: 't-e', source: 'ten-k', target: 'expensive', label: 'invest in' },
				{ id: 'e-w', source: 'expensive', target: 'weak-roi', label: 'produces' }
			]
		},
		highlights: ['weak-roi'],
		annotations: [{ targetId: 'weak-roi', text: 'Predicts risk, not impact', position: 'top' }]
	}
];

const traditionalApproachSection: ContentSection = {
	id: 'traditional-approach',
	type: 'explanation',
	title: 'The Traditional Approach (and Its Flaw)',
	explanation: {
		steps: traditionalSteps
	}
};

// =============================================================================
// Section 3: Outcome-Based vs Incrementality-Based Targeting (Diagram)
// =============================================================================

const targetingMatrixDiagram: DiagramData = {
	nodes: [
		// Axis labels
		{ id: 'y-axis', label: 'Churn Risk\n(high)', type: 'variable', x: 20, y: 30 },
		{ id: 'x-axis', label: 'Retention Sensitivity (high)', type: 'variable', x: 380, y: 220 },
		// Quadrants (2x2 matrix)
		{ id: 'q-tl', label: 'Will Leave\nRegardless', type: 'control', x: 110, y: 60 },
		{ id: 'q-tr', label: 'Persuadable\nTHE TARGET', type: 'outcome', x: 340, y: 60 },
		{ id: 'q-bl', label: 'Safe\nAnyway', type: 'variable', x: 110, y: 170 },
		{ id: 'q-br', label: 'Might\nBackfire', type: 'confounder', x: 340, y: 170 }
	],
	edges: [
		// Matrix structure
		{ id: 'tl-tr', source: 'q-tl', target: 'q-tr', label: 'sensitivity' },
		{ id: 'bl-br', source: 'q-bl', target: 'q-br', label: 'sensitivity' },
		{ id: 'tl-bl', source: 'q-tl', target: 'q-bl', label: 'risk' },
		{ id: 'tr-br', source: 'q-tr', target: 'q-br', label: 'risk' }
	]
};

const targetingMatrixSection: ContentSection = {
	id: 'targeting-matrix',
	type: 'diagram',
	title: 'Outcome-Based vs Incrementality-Based Targeting',
	diagram: targetingMatrixDiagram,
	content: `This 2x2 matrix is the core framework for understanding incrementality-based targeting. It classifies customers along two dimensions:

**Y-axis: Churn Risk** (low to high) — How likely is the customer to leave?

**X-axis: Retention Sensitivity** (low to high) — How likely is the customer to respond to intervention?

**The four quadrants:**

| Quadrant | Description | Action |
|---|---|---|
| **Will Leave Regardless** (top-left) | High risk, low sensitivity. These customers have decided to leave — no discount or campaign will change their mind. | Do not waste budget here |
| **Persuadable** (top-right) | High risk, high sensitivity. These customers will leave IF you do nothing, but will stay IF you intervene. **This is the optimal target for retention campaigns.** | Focus resources here |
| **Safe Anyway** (bottom-left) | Low risk, low sensitivity. These customers are stable and do not need intervention. | No action needed |
| **Might Backfire** (bottom-right) | Low risk, high sensitivity. These customers are currently safe but are sensitive to interventions — a retention offer might actually remind them to consider leaving. | Avoid intervention |

**The critical insight:** Traditional outcome-based targeting focuses only on the Y-axis (churn risk), lumping the top-left and top-right quadrants together. Incrementality-based targeting uses both axes to isolate the top-right quadrant — the only group where retention spending generates real ROI.`
};

// =============================================================================
// Section 4: The Incrementality Revolution
// =============================================================================

const incrementalitySection: ContentSection = {
	id: 'incrementality-revolution',
	type: 'text',
	title: 'The Incrementality Revolution',
	content: `The incrementality approach reframes the fundamental question of retention marketing:

**Old question:** "Who will churn?"

**New question:** "Who can we convince to stay?"

This is not a subtle distinction — it represents a paradigm shift from prediction to intervention design.

**Two dimensions instead of one:**

The incrementality model evaluates customers on two independent dimensions:

1. **Churn propensity** — the probability of leaving (the traditional metric)
2. **Retention sensitivity** — the probability of responding to intervention (the new dimension)

A customer can have high churn risk but low retention sensitivity (they are leaving and nothing will stop them). Another customer can have moderate churn risk but high retention sensitivity (they are on the fence and a well-timed intervention will keep them). The second customer is far more valuable to target, even though the first has a higher churn score.

**Empirical evidence:**

Research by Eva Ascarza demonstrated that incrementality-based targeting can reduce churn by approximately **8.7 percentage points** compared to traditional outcome-based models. This is a substantial effect — for a company with millions of customers, this translates to hundreds of thousands of retained customers and the associated lifetime value.

**Why the effect is so large:** Traditional targeting wastes most of the retention budget on customers who cannot be influenced. By redirecting those resources to persuadable customers only, the same budget produces dramatically higher retention rates.`
};

// =============================================================================
// Section 5: Uplift Modeling (Animated Explanation)
// =============================================================================

const upliftSteps: ExplanationStep[] = [
	{
		id: 'uplift-1',
		title: 'The Concept',
		description:
			'Uplift modeling estimates the ADDITIONAL effect of an intervention on each individual customer. The core formula: Uplift = P(stay | treated) minus P(stay | not treated). This is essentially a medical approach applied to marketing: the customer is the patient, and the retention campaign is the therapy. The goal is to measure the treatment effect for each individual, not just predict the outcome.',
		diagram: {
			nodes: [
				{ id: 'treated', label: 'P(stay | treated)', type: 'treatment', x: 80, y: 90 },
				{ id: 'minus', label: 'minus', type: 'variable', x: 220, y: 90 },
				{ id: 'untreated', label: 'P(stay | not treated)', type: 'control', x: 360, y: 90 },
				{ id: 'uplift', label: 'Uplift\n(Incremental Effect)', type: 'outcome', x: 220, y: 180 }
			],
			edges: [
				{ id: 't-m', source: 'treated', target: 'minus' },
				{ id: 'u-m', source: 'untreated', target: 'minus' },
				{ id: 'm-up', source: 'minus', target: 'uplift', label: 'equals' }
			]
		},
		highlights: ['uplift'],
		annotations: [{ targetId: 'uplift', text: 'The causal effect of intervention', position: 'bottom' }]
	},
	{
		id: 'uplift-2',
		title: 'From Prediction to Causality',
		description:
			'Uplift modeling represents the transition from predicting outcomes to predicting the effect of actions. It combines machine learning prediction with causal reasoning, using experimental data (randomized treatment/control groups) and specialized uplift modeling algorithms. This is the step from asking "what will happen?" to asking "what will happen BECAUSE of what we do?" — a fundamentally different and more actionable question.',
		diagram: {
			nodes: [
				{ id: 'ml', label: 'ML\nPrediction', type: 'treatment', x: 80, y: 90 },
				{ id: 'plus', label: 'combined\nwith', type: 'variable', x: 210, y: 90 },
				{ id: 'causal', label: 'Causal\nReasoning', type: 'control', x: 340, y: 90 },
				{ id: 'result', label: 'Predict Effect\nof Actions', type: 'outcome', x: 210, y: 180 }
			],
			edges: [
				{ id: 'ml-p', source: 'ml', target: 'plus' },
				{ id: 'c-p', source: 'causal', target: 'plus' },
				{ id: 'p-r', source: 'plus', target: 'result', label: 'produces' }
			]
		},
		highlights: ['result'],
		annotations: [{ targetId: 'result', text: 'From "what" to "because of what"', position: 'bottom' }]
	},
	{
		id: 'uplift-3',
		title: 'Business Impact',
		description:
			'The practical impact of uplift modeling is transformative: retention resources are directed only at customers with high response potential, eliminating waste on unreachable or already-safe customers. This produces higher ROI, cheaper campaigns, and better customer insight. Companies gain understanding of who reacts to stimuli, which mechanisms work, and which customer segments are sensitive to different types of intervention.',
		diagram: {
			nodes: [
				{ id: 'uplift-model', label: 'Uplift\nModel', type: 'treatment', x: 210, y: 40 },
				{ id: 'roi', label: 'Higher ROI', type: 'outcome', x: 60, y: 140 },
				{ id: 'cost', label: 'Cheaper\nCampaigns', type: 'outcome', x: 190, y: 140 },
				{ id: 'insight', label: 'Better Customer\nInsight', type: 'outcome', x: 350, y: 140 }
			],
			edges: [
				{ id: 'u-r', source: 'uplift-model', target: 'roi' },
				{ id: 'u-c', source: 'uplift-model', target: 'cost' },
				{ id: 'u-i', source: 'uplift-model', target: 'insight' }
			]
		},
		highlights: ['roi', 'cost', 'insight'],
		annotations: [{ targetId: 'uplift-model', text: 'Target only persuadable customers', position: 'top' }]
	}
];

const upliftModelingSection: ContentSection = {
	id: 'uplift-modeling',
	type: 'explanation',
	title: 'Uplift Modeling',
	explanation: {
		steps: upliftSteps
	}
};

// =============================================================================
// Section 6: Industry Applications
// =============================================================================

const industryApplicationsSection: ContentSection = {
	id: 'industry-applications',
	type: 'text',
	title: 'Industry Applications',
	content: `Incrementality-based targeting applies across any industry where customer retention matters and intervention resources are limited:

**Telecom:**
The classic retention battleground. The key question is not "who will cancel their contract?" but "who will renew their contract IF offered a discount?" Telecom companies have large customer bases and standardized intervention tools (discounts, upgraded plans, loyalty bonuses), making them ideal candidates for uplift modeling. Targeting only persuadable customers can reduce retention campaign costs by 40-60% while maintaining the same retention rates.

**E-commerce:**
Who will respond to a loyalty program invitation? Who will increase purchase frequency after receiving a personalized offer? E-commerce platforms generate rich behavioral data that feeds uplift models effectively. The challenge is distinguishing between customers who would buy anyway and those whose behavior changes because of the intervention.

**SaaS (Software as a Service):**
Who needs onboarding support to avoid churning, versus who will figure it out on their own? SaaS companies face a particular version of this problem: providing too much support to self-sufficient users wastes resources and can feel intrusive, while providing too little support to struggling users leads to churn. Incrementality modeling helps optimize the support allocation.

**The common thread:** Each industry applies incrementality to focus resources on **changeable outcomes**. The investment goes where it will actually make a difference, rather than being spread across all at-risk customers regardless of whether they can be influenced.`
};

// =============================================================================
// Section 7: The Strategic Shift
// =============================================================================

const strategicShiftSection: ContentSection = {
	id: 'strategic-shift',
	type: 'text',
	title: 'The Strategic Shift',
	content: `The evolution from outcome-based to incrementality-based targeting represents one of the most significant strategic shifts in modern customer analytics:

**Old model:**
Predict churn -> Target high risk customers -> Hope the intervention works

**New model:**
Predict *changeable* churn -> Target *influenceable* customers -> Measure the *causal impact* of intervention

**This is the transition from predicting outcomes to predicting the effect of actions.**

The old model asks: "What will happen?" This is prediction — valuable, but incomplete.

The new model asks: "What will happen *because of what we do*?" This is causal inference applied to business decisions — prediction plus causality.

**Why incrementality is growing:**
- Businesses are shifting from **reactive retention** (respond to churn signals) to **proactive intervention design** (design interventions for maximum causal impact)
- Data infrastructure now supports the experimental designs that uplift modeling requires
- Competition for customers has intensified, making budget efficiency critical
- The analytical tools and frameworks (uplift modeling, causal forests, meta-learners) have matured

**The broader implication:** This shift extends beyond churn. Any business decision about customer intervention — upselling, cross-selling, re-engagement, onboarding — benefits from the same incrementality framework. The question is always the same: "Will this action change the outcome, or would the outcome happen anyway?"

Incrementality transforms marketing from a prediction exercise into a **decision science** — one that optimizes not for what will happen, but for what the business can *make* happen.`
};

// =============================================================================
// Export Lecture Content
// =============================================================================

export const lectureContent: LectureContent = {
	lectureId: 'churn-incrementality',
	sections: [
		churnClvSection,
		traditionalApproachSection,
		targetingMatrixSection,
		incrementalitySection,
		upliftModelingSection,
		industryApplicationsSection,
		strategicShiftSection
	]
};
