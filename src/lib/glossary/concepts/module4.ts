/**
 * Module 4 glossary concepts: Customer Preferences and Lifetime Value Analysis.
 * Contains ~43 core concepts covering all 8 lectures.
 */

import type { GlossaryConcept } from '../types';

// ============================================================================
// Module 4 Concepts (~43 concepts)
// ============================================================================

export const module4Concepts: GlossaryConcept[] = [
	// -------------------------------------------------------------------------
	// Lecture 1: Consumer Demand and Preference Analysis (5 terms)
	// -------------------------------------------------------------------------
	{
		id: 'market-segmentation',
		term: 'Market Segmentation',
		definition:
			'The process of dividing a market into distinct groups of customers who have similar characteristics, needs, and purchasing behaviors.',
		extendedDefinition: `Market segmentation is the foundation of targeted marketing strategy:

- Identifies groups with shared needs and willingness to pay
- Enables tailored product offerings, messaging, and pricing
- Prevents the mistake of treating all customers identically
- Segments can be based on demographics, behavior, psychographics, or geography

Without proper segmentation, businesses risk building products for the wrong audience — the music store case study demonstrates this clearly.`,
		category: 'foundation',
		relatedConcepts: ['target-market', 'positioning', 'stp-framework', 'k-means-clustering'],
		lectureId: 1,
		moduleId: '4',
		tags: ['strategy', 'core', 'marketing']
	},
	{
		id: 'target-market',
		term: 'Target Market',
		definition:
			'The specific segment of consumers a company aims to serve with its products, marketing, and pricing strategy.',
		category: 'foundation',
		relatedConcepts: ['market-segmentation', 'positioning', 'stp-framework'],
		lectureId: 1,
		moduleId: '4',
		tags: ['strategy', 'core']
	},
	{
		id: 'positioning',
		term: 'Positioning',
		definition:
			'The process of establishing a brand or product image in the minds of the target market relative to competitors.',
		extendedDefinition: `Positioning answers: "Why should this customer choose us over alternatives?"

Key dimensions:
- **Value proposition** — what unique benefit is offered
- **Competitive differentiation** — how it differs from alternatives
- **Customer perception** — how the target market actually perceives the offering

Effective positioning requires understanding both customer preferences (conjoint analysis) and competitive landscape (market mapping).`,
		category: 'foundation',
		relatedConcepts: ['market-segmentation', 'target-market', 'stp-framework', 'market-mapping'],
		lectureId: 1,
		moduleId: '4',
		tags: ['strategy', 'core', 'branding']
	},
	{
		id: 'conjoint-analysis-overview',
		term: 'Conjoint Analysis',
		definition:
			'A method for measuring how customers value different product attributes by analyzing their trade-off decisions across product profiles.',
		category: 'method',
		relatedConcepts: ['part-worth-utility', 'attribute-importance', 'product-profile'],
		lectureId: 1,
		moduleId: '4',
		tags: ['method', 'core', 'preferences']
	},
	{
		id: 'customer-lifetime-value-overview',
		term: 'Customer Lifetime Value (CLV)',
		definition:
			'The total net profit a company expects to earn from its entire relationship with a customer, accounting for retention, margins, and the time value of money.',
		category: 'foundation',
		relatedConcepts: ['discounted-clv', 'retention-rate', 'contribution-margin', 'discount-rate'],
		lectureId: 1,
		moduleId: '4',
		tags: ['finance', 'core', 'strategy']
	},

	// -------------------------------------------------------------------------
	// Lecture 2: Segmentation, Targeting, and Positioning (7 terms)
	// -------------------------------------------------------------------------
	{
		id: 'stp-framework',
		term: 'STP Framework',
		definition:
			'The three-stage marketing strategy process: Segmentation (divide market), Targeting (choose segments), and Positioning (differentiate offering).',
		extendedDefinition: `STP is the foundational framework for marketing strategy:

1. **Segmentation** — Identify distinct groups within the broader market
2. **Targeting** — Evaluate segments and select the most attractive ones
3. **Positioning** — Develop a unique value proposition for each target segment

The framework ensures marketing effort is focused on the right customers with the right message, rather than broadcasting to everyone.`,
		category: 'foundation',
		relatedConcepts: ['market-segmentation', 'target-market', 'positioning', 'k-means-clustering'],
		lectureId: 2,
		moduleId: '4',
		tags: ['framework', 'core', 'strategy']
	},
	{
		id: 'demographic-segmentation',
		term: 'Demographic Segmentation',
		definition:
			'Dividing markets based on measurable population characteristics such as age, gender, income, education, and family size.',
		category: 'method',
		relatedConcepts: ['psychographic-segmentation', 'behavioral-segmentation', 'market-segmentation'],
		lectureId: 2,
		moduleId: '4',
		tags: ['segmentation', 'method']
	},
	{
		id: 'psychographic-segmentation',
		term: 'Psychographic Segmentation',
		definition:
			'Dividing markets based on lifestyle, values, personality traits, attitudes, and interests.',
		category: 'method',
		relatedConcepts: ['demographic-segmentation', 'behavioral-segmentation', 'market-segmentation'],
		lectureId: 2,
		moduleId: '4',
		tags: ['segmentation', 'method']
	},
	{
		id: 'behavioral-segmentation',
		term: 'Behavioral Segmentation',
		definition:
			'Dividing markets based on observable customer actions: purchase frequency, usage patterns, brand loyalty, and response to marketing.',
		category: 'method',
		relatedConcepts: ['demographic-segmentation', 'psychographic-segmentation', 'k-means-clustering'],
		lectureId: 2,
		moduleId: '4',
		tags: ['segmentation', 'method']
	},
	{
		id: 'k-means-clustering',
		term: 'K-means Clustering',
		definition:
			'A machine learning algorithm that groups observations into k clusters by minimizing the within-cluster sum of squares (distance to cluster center).',
		extendedDefinition: `K-means is the most widely used clustering algorithm for customer segmentation:

**How it works:**
1. Choose k (number of clusters)
2. Initialize k random cluster centers
3. Assign each observation to the nearest center
4. Recalculate centers as the mean of assigned observations
5. Repeat steps 3-4 until convergence

**Important considerations:**
- Sensitive to feature scaling — always standardize first
- Requires choosing k in advance (use Elbow Method or Silhouette Score)
- Finds spherical clusters — may not capture complex segment shapes
- Results depend on initialization — use multiple random starts`,
		category: 'method',
		relatedConcepts: ['feature-scaling-m4', 'elbow-method', 'silhouette-score', 'market-segmentation'],
		lectureId: 2,
		moduleId: '4',
		tags: ['ml', 'clustering', 'core']
	},
	{
		id: 'vertical-attributes',
		term: 'Vertical Attributes',
		definition:
			'Product characteristics where all consumers agree on the preference ordering — everyone prefers more quality, lower price, or faster performance.',
		category: 'foundation',
		relatedConcepts: ['horizontal-attributes', 'conjoint-analysis-overview'],
		lectureId: 2,
		moduleId: '4',
		tags: ['preferences', 'attributes']
	},
	{
		id: 'horizontal-attributes',
		term: 'Horizontal Attributes',
		definition:
			'Product characteristics where consumer preferences differ — some prefer red, others blue; some prefer sweet, others savory.',
		extendedDefinition: `Horizontal attributes are where segmentation becomes critical:

- No universal "better" or "worse" — only personal preference
- Create natural market segments based on taste clusters
- Enable differentiation without direct quality competition
- Examples: color, flavor, design style, brand personality

Market mapping plots products along horizontal attribute dimensions to reveal competitive positioning.`,
		category: 'foundation',
		relatedConcepts: ['vertical-attributes', 'market-mapping', 'positioning'],
		lectureId: 2,
		moduleId: '4',
		tags: ['preferences', 'attributes']
	},

	// -------------------------------------------------------------------------
	// Lecture 3: Conjoint Analysis (6 terms)
	// -------------------------------------------------------------------------
	{
		id: 'conjoint-analysis-detailed',
		term: 'Conjoint Analysis (Detailed)',
		definition:
			'A survey-based method where respondents evaluate product profiles with varying attribute levels, revealing the implicit value (part-worth utility) of each attribute.',
		extendedDefinition: `Conjoint analysis is the gold standard for measuring customer preferences:

**Process:**
1. Define product attributes and levels (e.g., brand: A/B/C, price: $10/$20/$30)
2. Create product profiles combining different attribute levels
3. Respondents rank or rate profiles
4. Statistical analysis decomposes overall preferences into part-worth utilities

**Key insight:** Conjoint measures what people DO (choose between trade-offs), not what they SAY they want. This reveals true preference intensity.

**Pretest requirement:** Always pretest the survey instrument to ensure attributes are relevant and levels are realistic.`,
		category: 'method',
		relatedConcepts: ['part-worth-utility', 'attribute-importance', 'product-profile', 'conjoint-pretest'],
		lectureId: 3,
		moduleId: '4',
		tags: ['method', 'core', 'research']
	},
	{
		id: 'product-profile',
		term: 'Product Profile',
		definition:
			'A hypothetical product description used in conjoint analysis, defined by specific levels of each attribute being studied.',
		category: 'method',
		relatedConcepts: ['conjoint-analysis-detailed', 'part-worth-utility'],
		lectureId: 3,
		moduleId: '4',
		tags: ['conjoint', 'research']
	},
	{
		id: 'part-worth-utility',
		term: 'Part-worth Utility',
		definition:
			'The numeric value representing how much a specific attribute level contributes to overall product preference in conjoint analysis.',
		extendedDefinition: `Part-worth utilities are the core output of conjoint analysis:

- Each attribute level gets a utility score
- Higher utility = stronger preference for that level
- The range of utilities within an attribute indicates that attribute's importance
- Utilities are relative, not absolute — only meaningful in comparison

**Example:** Brand A: +2.5, Brand B: +1.0, Brand C: -3.5
This means Brand A is most preferred, and brand matters a lot (range = 6.0).`,
		category: 'method',
		relatedConcepts: ['conjoint-analysis-detailed', 'attribute-importance', 'trade-off-analysis'],
		lectureId: 3,
		moduleId: '4',
		tags: ['conjoint', 'core', 'measurement']
	},
	{
		id: 'trade-off-analysis',
		term: 'Trade-off Analysis',
		definition:
			'The core mechanism of conjoint analysis: forcing respondents to make choices between competing product features, revealing true preference priorities.',
		category: 'method',
		relatedConcepts: ['conjoint-analysis-detailed', 'part-worth-utility'],
		lectureId: 3,
		moduleId: '4',
		tags: ['conjoint', 'decision-making']
	},
	{
		id: 'attribute-importance',
		term: 'Attribute Importance',
		definition:
			'The relative weight of each product attribute in driving overall preference, calculated from the range of part-worth utilities within that attribute.',
		category: 'method',
		relatedConcepts: ['part-worth-utility', 'conjoint-analysis-detailed'],
		lectureId: 3,
		moduleId: '4',
		tags: ['conjoint', 'measurement']
	},
	{
		id: 'conjoint-pretest',
		term: 'Pretest',
		definition:
			'A preliminary test of the conjoint survey design to verify that attributes are relevant, levels are realistic, and respondents can meaningfully evaluate the profiles.',
		category: 'design',
		relatedConcepts: ['conjoint-analysis-detailed', 'product-profile'],
		lectureId: 3,
		moduleId: '4',
		tags: ['research-design', 'quality']
	},

	// -------------------------------------------------------------------------
	// Lecture 4: Introduction to CLV Analysis (7 terms)
	// -------------------------------------------------------------------------
	{
		id: 'customer-acquisition-cost',
		term: 'Customer Acquisition Cost (CAC)',
		definition:
			'The total cost of acquiring a new customer, including marketing, sales, and onboarding expenses.',
		extendedDefinition: `CAC is the investment side of the CLV equation:

- CLV must exceed CAC for a customer to be profitable
- CAC/CLV ratio is a key business health metric
- High CAC is acceptable if CLV is proportionally high
- Tracking CAC by acquisition channel reveals the most efficient growth strategies`,
		category: 'foundation',
		relatedConcepts: ['contribution-margin', 'customer-lifetime-value-overview', 'payback-period'],
		lectureId: 4,
		moduleId: '4',
		tags: ['finance', 'metric', 'core']
	},
	{
		id: 'contribution-margin',
		term: 'Contribution Margin',
		definition:
			'The profit per customer per period after subtracting variable costs — the "M" in the CLV formula.',
		category: 'foundation',
		relatedConcepts: ['customer-lifetime-value-overview', 'discount-rate', 'retention-rate'],
		lectureId: 4,
		moduleId: '4',
		tags: ['finance', 'clv-component']
	},
	{
		id: 'retention-rate',
		term: 'Retention Rate',
		definition:
			'The proportion of customers who continue their relationship with the company from one period to the next — the "R" in the CLV formula.',
		extendedDefinition: `Retention rate is the most powerful lever on CLV:

- Even small improvements compound across all future periods
- A 5% improvement in retention can increase CLV by 25-95%
- Retention probability in period t = R^t (geometric decay)
- Drives the "planning horizon" — how far into the future CLV calculations extend meaningfully

The connection to churn: Retention Rate = 1 - Churn Rate.`,
		category: 'foundation',
		relatedConcepts: ['customer-churn', 'retention-probability', 'customer-lifetime-value-overview'],
		lectureId: 4,
		moduleId: '4',
		tags: ['finance', 'clv-component', 'core']
	},
	{
		id: 'discount-rate',
		term: 'Discount Rate',
		definition:
			'The rate used to convert future cash flows to present value, reflecting the time value of money and risk — the "i" in the CLV formula.',
		category: 'foundation',
		relatedConcepts: ['time-value-of-money', 'discounted-clv', 'contribution-margin'],
		lectureId: 4,
		moduleId: '4',
		tags: ['finance', 'clv-component']
	},
	{
		id: 'time-value-of-money',
		term: 'Time Value of Money',
		definition:
			'The financial principle that a dollar received today is worth more than a dollar received in the future, due to opportunity cost and risk.',
		category: 'foundation',
		relatedConcepts: ['discount-rate', 'discounted-clv'],
		lectureId: 4,
		moduleId: '4',
		tags: ['finance', 'core']
	},
	{
		id: 'payback-period',
		term: 'Payback Period',
		definition:
			'The time required for cumulative CLV to exceed the initial customer acquisition cost — when the customer investment becomes profitable.',
		category: 'foundation',
		relatedConcepts: ['customer-acquisition-cost', 'customer-lifetime-value-overview'],
		lectureId: 4,
		moduleId: '4',
		tags: ['finance', 'metric']
	},
	{
		id: 'metric-misalignment',
		term: 'Metric Misalignment',
		definition:
			'The error of optimizing short-term metrics (conversion rate, revenue) at the expense of long-term value (CLV, retention), leading to suboptimal business decisions.',
		category: 'bias',
		relatedConcepts: ['customer-lifetime-value-overview', 'customer-acquisition-cost'],
		lectureId: 4,
		moduleId: '4',
		tags: ['strategy', 'pitfall']
	},

	// -------------------------------------------------------------------------
	// Lecture 5: CLV Calculation and Application (5 terms)
	// -------------------------------------------------------------------------
	{
		id: 'discounted-clv',
		term: 'Discounted CLV',
		definition:
			'CLV calculated with future cash flows discounted to present value using a discount rate, producing the financially correct customer valuation.',
		extendedDefinition: `The discounted CLV formula:

CLV = Sum over t from 1 to T of: (M * R^t) / (1 + i)^t

Where:
- **M** = contribution margin per period
- **R** = retention rate
- **i** = discount rate
- **T** = planning horizon (number of periods)
- **R^t** = probability of retention through period t
- **(1+i)^t** = discount factor for period t

Always use discounted CLV for business decisions. Undiscounted CLV systematically overstates customer value.`,
		category: 'estimator',
		relatedConcepts: ['undiscounted-clv', 'discount-rate', 'retention-rate', 'clv-formula'],
		lectureId: 5,
		moduleId: '4',
		tags: ['finance', 'core', 'calculation']
	},
	{
		id: 'undiscounted-clv',
		term: 'Undiscounted CLV',
		definition:
			'CLV calculated without accounting for the time value of money — simpler but systematically overstates the true value of future cash flows.',
		category: 'estimator',
		relatedConcepts: ['discounted-clv', 'time-value-of-money'],
		lectureId: 5,
		moduleId: '4',
		tags: ['finance', 'calculation']
	},
	{
		id: 'planning-horizon',
		term: 'Planning Horizon',
		definition:
			'The number of future periods (T) over which CLV is calculated — determined by how far into the future meaningful retention probability exists.',
		category: 'foundation',
		relatedConcepts: ['retention-probability', 'discounted-clv'],
		lectureId: 5,
		moduleId: '4',
		tags: ['finance', 'clv-component']
	},
	{
		id: 'retention-probability',
		term: 'Retention Probability',
		definition:
			'The cumulative probability that a customer remains active through period t, calculated as R^t where R is the per-period retention rate.',
		category: 'estimator',
		relatedConcepts: ['retention-rate', 'planning-horizon', 'cumulative-clv'],
		lectureId: 5,
		moduleId: '4',
		tags: ['finance', 'probability']
	},
	{
		id: 'cumulative-clv',
		term: 'Cumulative CLV',
		definition:
			'The running total of discounted CLV across periods, showing how customer value accumulates over time and when profitability is reached.',
		category: 'estimator',
		relatedConcepts: ['discounted-clv', 'payback-period', 'planning-horizon'],
		lectureId: 5,
		moduleId: '4',
		tags: ['finance', 'calculation']
	},

	// -------------------------------------------------------------------------
	// Lecture 6: AI-Generated Content and Engagement (5 terms)
	// -------------------------------------------------------------------------
	{
		id: 'ai-generated-content-m4',
		term: 'AI-Generated Content (AGC)',
		definition:
			'Content produced by AI systems (especially LLMs) for marketing purposes, which faces an engagement paradox: high quality but reduced trust when AI origin is disclosed.',
		category: 'foundation',
		relatedConcepts: ['large-language-models-m4', 'personal-voice', 'content-homogenization-m4'],
		lectureId: 6,
		moduleId: '4',
		tags: ['ai', 'content', 'engagement']
	},
	{
		id: 'large-language-models-m4',
		term: 'Large Language Models (LLMs)',
		definition:
			'AI models trained on massive text datasets that generate human-like content by predicting the most likely next token in a sequence.',
		category: 'method',
		relatedConcepts: ['next-token-prediction', 'ai-generated-content-m4'],
		lectureId: 6,
		moduleId: '4',
		tags: ['ai', 'technology']
	},
	{
		id: 'next-token-prediction',
		term: 'Next Token Prediction',
		definition:
			'The core mechanism of LLMs: given a sequence of tokens, predicting the most probable next token to generate coherent text.',
		category: 'method',
		relatedConcepts: ['large-language-models-m4'],
		lectureId: 6,
		moduleId: '4',
		tags: ['ai', 'mechanism']
	},
	{
		id: 'personal-voice',
		term: 'Personal Voice',
		definition:
			'The unique writing style, perspective, and authenticity that distinguishes human-created content from AI-generated content.',
		category: 'foundation',
		relatedConcepts: ['ai-generated-content-m4', 'content-homogenization-m4'],
		lectureId: 6,
		moduleId: '4',
		tags: ['content', 'authenticity']
	},
	{
		id: 'content-homogenization-m4',
		term: 'Content Homogenization',
		definition:
			'The tendency for AI-generated content to converge toward similar styles, reducing diversity of voice and making brand differentiation harder.',
		category: 'bias',
		relatedConcepts: ['ai-generated-content-m4', 'personal-voice'],
		lectureId: 6,
		moduleId: '4',
		tags: ['ai', 'risk']
	},

	// -------------------------------------------------------------------------
	// Lecture 7: Customer Churn and Incrementality (6 terms)
	// -------------------------------------------------------------------------
	{
		id: 'customer-churn',
		term: 'Customer Churn',
		definition:
			'The loss of customers who stop doing business with a company, directly reducing CLV by eliminating all future cash flows from that customer.',
		extendedDefinition: `Churn is the most direct threat to CLV:

- When a customer churns, the retention term R^t drops to zero
- All future period values vanish
- Churn Rate = 1 - Retention Rate
- Even small improvements in churn prevention compound across the entire customer base

The critical insight: predicting who will churn is not the same as knowing who can be saved.`,
		category: 'foundation',
		relatedConcepts: ['retention-rate', 'churn-propensity-score', 'customer-lifetime-value-overview'],
		lectureId: 7,
		moduleId: '4',
		tags: ['retention', 'core', 'risk']
	},
	{
		id: 'churn-propensity-score',
		term: 'Churn Propensity Score',
		definition:
			'A probability estimate from a machine learning model predicting how likely each customer is to leave the company.',
		category: 'method',
		relatedConcepts: ['customer-churn', 'outcome-based-targeting', 'incrementality-based-targeting'],
		lectureId: 7,
		moduleId: '4',
		tags: ['prediction', 'ml', 'metric']
	},
	{
		id: 'outcome-based-targeting',
		term: 'Outcome-Based Targeting',
		definition:
			'The traditional approach of targeting customers with the highest churn risk for retention campaigns — flawed because it ignores whether those customers can actually be influenced.',
		category: 'method',
		relatedConcepts: ['incrementality-based-targeting', 'churn-propensity-score', 'retention-sensitivity'],
		lectureId: 7,
		moduleId: '4',
		tags: ['targeting', 'traditional']
	},
	{
		id: 'incrementality-based-targeting',
		term: 'Incrementality-Based Targeting',
		definition:
			'Targeting customers based on the estimated causal effect of intervention — focusing on those whose behavior will change because of the retention campaign.',
		extendedDefinition: `Incrementality reframes the question from "Who will churn?" to "Who can we convince to stay?"

Uses two dimensions:
1. **Churn propensity** — probability of leaving (traditional)
2. **Retention sensitivity** — probability of responding to intervention (new)

The optimal target is the **top-right quadrant** of the 2x2 matrix: high churn risk AND high retention sensitivity. Research shows this approach reduces churn by ~8.7 percentage points compared to outcome-based targeting.`,
		category: 'method',
		relatedConcepts: ['outcome-based-targeting', 'retention-sensitivity', 'uplift-modeling'],
		lectureId: 7,
		moduleId: '4',
		tags: ['targeting', 'causal', 'core']
	},
	{
		id: 'retention-sensitivity',
		term: 'Retention Sensitivity',
		definition:
			'The degree to which a customer will respond to a retention intervention — the second dimension in incrementality-based targeting.',
		category: 'method',
		relatedConcepts: ['incrementality-based-targeting', 'uplift-modeling', 'customer-churn'],
		lectureId: 7,
		moduleId: '4',
		tags: ['targeting', 'measurement']
	},
	{
		id: 'uplift-modeling',
		term: 'Uplift Modeling',
		definition:
			'A method that estimates the additional (incremental) effect of an intervention on each individual, combining ML prediction with causal reasoning.',
		extendedDefinition: `Uplift = P(stay | treated) - P(stay | not treated)

This is the individual-level treatment effect:
- Positive uplift = intervention helps retain this customer
- Zero uplift = intervention has no effect
- Negative uplift = intervention may actually trigger churn

Requires experimental data (randomized treatment/control) to estimate the causal effect, not just observational predictions.`,
		category: 'method',
		relatedConcepts: ['incrementality-based-targeting', 'retention-sensitivity', 'churn-propensity-score'],
		lectureId: 7,
		moduleId: '4',
		tags: ['causal', 'ml', 'core']
	},

	// -------------------------------------------------------------------------
	// Lecture 8: Python Demo — Segmentation and CLV (4 terms)
	// -------------------------------------------------------------------------
	{
		id: 'feature-scaling-m4',
		term: 'Feature Scaling',
		definition:
			'Transforming features to a common scale before clustering, preventing variables with larger numeric ranges from dominating the distance calculations.',
		category: 'method',
		relatedConcepts: ['standardization-m4', 'k-means-clustering'],
		lectureId: 8,
		moduleId: '4',
		tags: ['preprocessing', 'ml']
	},
	{
		id: 'standardization-m4',
		term: 'Standardization',
		definition:
			'A specific feature scaling method that transforms each variable to mean=0 and standard deviation=1, making all features contribute equally to clustering.',
		category: 'method',
		relatedConcepts: ['feature-scaling-m4', 'k-means-clustering'],
		lectureId: 8,
		moduleId: '4',
		tags: ['preprocessing', 'ml']
	},
	{
		id: 'silhouette-score',
		term: 'Silhouette Score',
		definition:
			'A metric measuring cluster quality by comparing within-cluster similarity to between-cluster separation; ranges from -1 (poor) to +1 (excellent).',
		extendedDefinition: `Interpretation:

| Score | Meaning |
|-------|---------|
| Close to +1 | Well-separated clusters |
| Near 0 | Overlapping clusters |
| Negative | Misassigned observations |

In the demo: silhouette ~ 0.19 (moderate). Real-world behavioral data rarely produces high silhouette scores — human behavior is messy and multidimensional.`,
		category: 'method',
		relatedConcepts: ['elbow-method', 'k-means-clustering'],
		lectureId: 8,
		moduleId: '4',
		tags: ['metric', 'clustering', 'quality']
	},
	{
		id: 'elbow-method',
		term: 'Elbow Method',
		definition:
			'A technique for choosing the optimal number of clusters by plotting k versus within-cluster sum of squares and identifying the "elbow" point of diminishing returns.',
		category: 'method',
		relatedConcepts: ['silhouette-score', 'k-means-clustering'],
		lectureId: 8,
		moduleId: '4',
		tags: ['metric', 'clustering', 'selection']
	},

	// -------------------------------------------------------------------------
	// Additional cross-cutting terms
	// -------------------------------------------------------------------------
	{
		id: 'market-mapping',
		term: 'Market Mapping',
		definition:
			'A visual tool that plots brands or products on a 2D space defined by key attributes, revealing competitive positioning and market gaps.',
		category: 'method',
		relatedConcepts: ['positioning', 'horizontal-attributes', 'stp-framework'],
		lectureId: 2,
		moduleId: '4',
		tags: ['visualization', 'strategy']
	},
	{
		id: 'clv-formula',
		term: 'CLV Formula',
		definition:
			'CLV = sum from t=1 to T of (M * R^t) / (1 + i)^t, where M is margin, R is retention rate, i is discount rate, and T is the planning horizon.',
		category: 'estimator',
		relatedConcepts: ['discounted-clv', 'contribution-margin', 'retention-rate', 'discount-rate'],
		lectureId: 5,
		moduleId: '4',
		tags: ['finance', 'formula', 'core']
	}
];
