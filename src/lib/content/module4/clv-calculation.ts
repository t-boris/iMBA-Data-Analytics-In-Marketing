/**
 * Lecture 5: CLV Calculation and Application
 *
 * This lecture covers the quantitative heart of CLV:
 * - The CLV formula with all variables
 * - Step-by-step worked example (music community)
 * - CLV decay curve visualization
 * - Why each year adds less value
 * - The retention lever and its outsized impact
 * - Managerial applications of CLV
 * - Key exam points summary
 */

import type { LectureContent, ContentSection } from '../types';
import type { DiagramData } from '$lib/components/diagrams';
import type { ExplanationStep } from '$lib/components/animation';

// =============================================================================
// Section 1: The CLV Formula
// =============================================================================

const clvFormulaSection: ContentSection = {
	id: 'clv-formula',
	type: 'text',
	title: 'The CLV Formula',
	content: `The general CLV formula calculates the sum of discounted, retention-adjusted contributions over a planning horizon:

**CLV = sum of (M x R^t) / (1 + i)^t for t = 1 to T**

Each variable in this formula has a specific meaning and strategic implication:

| Variable | Name | Definition | Typical Values |
|---|---|---|---|
| **T** | Planning Horizon | Number of years to project CLV | 3 years (typical), up to 7 for tech companies |
| **M** | Contribution Margin | Revenue minus direct costs per period (NOT revenue) | Varies by industry |
| **R** | Retention Probability | Probability customer stays (0 to 1) | 0.60 - 0.95 depending on industry |
| **i** | Discount Rate | Cost of capital / time value of money | Typically 10-20% |

**Key insight:** A longer planning horizon increases CLV but also increases uncertainty. The trade-off between precision and completeness means most companies settle on 3-5 year horizons as a practical balance.

**Critical exam distinction:** Contribution Margin is NOT revenue. It is revenue minus variable costs of serving the customer. Using revenue instead of margin is a common error that dramatically overstates CLV.

**How the formula works:** For each future year, the expected margin (M) is multiplied by the probability that the customer is still active (R^t) and then discounted to present value by dividing by (1 + i)^t. The sum of all these discounted, retention-adjusted yearly values gives the total CLV.`
};

// =============================================================================
// Section 2: Step-by-Step CLV Calculation (Animated Explanation)
// =============================================================================

const calculationSteps: ExplanationStep[] = [
	{
		id: 'calc-1',
		title: 'Setup',
		description:
			'Consider a music community subscription service. Annual subscription fee: $150. Additional purchases (merchandise, concert tickets, digital content): $50 per year. Contribution margin on additional purchases: 70%, which gives $35 in profit. Total annual contribution margin: $150 (subscription) + $35 (extras margin) = $185. Retention rate: 75% annually. Discount rate: 10%. Customer acquisition cost: negligible in this example. We will calculate CLV over a 3-year planning horizon.',
		diagram: {
			nodes: [
				{ id: 'sub', label: 'Subscription\n$150/year', type: 'treatment', x: 80, y: 60 },
				{ id: 'extras', label: 'Extras Margin\n$50 x 70% = $35', type: 'treatment', x: 280, y: 60 },
				{ id: 'total', label: 'Total Margin\n$185/year', type: 'outcome', x: 180, y: 150 }
			],
			edges: [
				{ id: 's-t', source: 'sub', target: 'total', label: '$150' },
				{ id: 'e-t', source: 'extras', target: 'total', label: '$35' }
			]
		},
		highlights: ['total'],
		annotations: [{ targetId: 'total', text: 'M = $185 per year', position: 'bottom' }]
	},
	{
		id: 'calc-2',
		title: 'Year 1',
		description:
			'In Year 1, we capture the full contribution margin at face value. Since we are at the beginning of the relationship, the retention probability has not yet applied (the customer just signed up), and there is no discounting for the first period in this model. CLV after Year 1 = $185. This represents the first year of profit from this customer.',
		diagram: {
			nodes: [
				{ id: 'y1-margin', label: 'Margin\n$185', type: 'treatment', x: 80, y: 70 },
				{ id: 'y1-result', label: 'Year 1 CLV\n$185', type: 'outcome', x: 300, y: 70 }
			],
			edges: [
				{ id: 'y1-m-r', source: 'y1-margin', target: 'y1-result', label: 'full value' }
			]
		},
		highlights: ['y1-result'],
		annotations: [{ targetId: 'y1-result', text: 'First year at full value', position: 'bottom' }]
	},
	{
		id: 'calc-3',
		title: 'Year 2',
		description:
			'In Year 2, two forces reduce the contribution: (1) Only 75% of customers remain active (retention rate R = 0.75), and (2) future value is discounted at 10%. The calculation: $185 x 0.75 / 1.10 = $138.75 / 1.10 = approximately $126. Only 75% of customers are still paying, and their future dollars are worth less than today\'s dollars. Cumulative 2-year CLV = $185 + $126 = $311.',
		diagram: {
			nodes: [
				{ id: 'y2-margin', label: 'Margin\n$185', type: 'variable', x: 50, y: 70 },
				{ id: 'y2-ret', label: 'x 0.75\nRetention', type: 'confounder', x: 160, y: 70 },
				{ id: 'y2-disc', label: '/ 1.10\nDiscount', type: 'control', x: 270, y: 70 },
				{ id: 'y2-result', label: 'Year 2\n= $126', type: 'outcome', x: 380, y: 70 }
			],
			edges: [
				{ id: 'y2-m-r', source: 'y2-margin', target: 'y2-ret' },
				{ id: 'y2-r-d', source: 'y2-ret', target: 'y2-disc' },
				{ id: 'y2-d-res', source: 'y2-disc', target: 'y2-result' }
			]
		},
		highlights: ['y2-ret', 'y2-disc', 'y2-result'],
		annotations: [{ targetId: 'y2-result', text: '$185 x 0.75 / 1.10', position: 'bottom' }]
	},
	{
		id: 'calc-4',
		title: 'Year 3',
		description:
			'In Year 3, the compounding effect becomes clear. Retention applies squared: 0.75^2 = 0.5625 (only 56.25% of original customers remain). Discounting also compounds: (1.10)^2 = 1.21. The calculation: $185 x 0.5625 / 1.21 = $104.06 / 1.21 = approximately $86. Each additional year adds progressively less value due to the double compression of retention loss and discounting. Cumulative 3-year CLV = $185 + $126 + $86 = $397.',
		diagram: {
			nodes: [
				{ id: 'y3-margin', label: 'Margin\n$185', type: 'variable', x: 50, y: 70 },
				{ id: 'y3-ret', label: 'x 0.75^2\n= 0.5625', type: 'confounder', x: 160, y: 70 },
				{ id: 'y3-disc', label: '/ 1.10^2\n= 1.21', type: 'control', x: 270, y: 70 },
				{ id: 'y3-result', label: 'Year 3\n= $86', type: 'outcome', x: 380, y: 70 }
			],
			edges: [
				{ id: 'y3-m-r', source: 'y3-margin', target: 'y3-ret' },
				{ id: 'y3-r-d', source: 'y3-ret', target: 'y3-disc' },
				{ id: 'y3-d-res', source: 'y3-disc', target: 'y3-result' }
			]
		},
		highlights: ['y3-ret', 'y3-disc', 'y3-result'],
		annotations: [{ targetId: 'y3-result', text: 'Compounding reduces value', position: 'bottom' }]
	},
	{
		id: 'calc-5',
		title: 'Cumulative Result',
		description:
			'The 3-year CLV calculation shows diminishing marginal contribution: Year 1 adds $185, Year 2 adds $126, and Year 3 adds only $86. The cumulative values are: 1 year = $185, 2 years = $311, 3 years = $397. Each additional year contributes less because retention loss and discounting compound together. Key exam insight: long customer relationships are valuable, but discounting compresses the future. The first year typically contributes the most, and extending the horizon beyond 3-5 years adds progressively less incremental value.',
		diagram: {
			nodes: [
				{ id: 'cum-1', label: '1-Year CLV\n$185', type: 'treatment', x: 80, y: 70 },
				{ id: 'cum-2', label: '2-Year CLV\n$311', type: 'treatment', x: 210, y: 70 },
				{ id: 'cum-3', label: '3-Year CLV\n$397', type: 'outcome', x: 340, y: 70 },
				{ id: 'added', label: 'Added per year:\n$185 → $126 → $86', type: 'variable', x: 210, y: 160 }
			],
			edges: [
				{ id: 'c1-c2', source: 'cum-1', target: 'cum-2', label: '+$126' },
				{ id: 'c2-c3', source: 'cum-2', target: 'cum-3', label: '+$86' }
			]
		},
		highlights: ['cum-3', 'added'],
		annotations: [{ targetId: 'cum-3', text: 'Diminishing marginal contribution', position: 'top' }]
	}
];

const calculationSection: ContentSection = {
	id: 'step-by-step-calculation',
	type: 'explanation',
	title: 'Step-by-Step CLV Calculation',
	explanation: {
		steps: calculationSteps
	}
};

// =============================================================================
// Section 3: CLV Decay Curve (Diagram)
// =============================================================================

const decayCurveDiagram: DiagramData = {
	nodes: [
		{ id: 'year1', label: 'Year 1\n$185', type: 'treatment', x: 80, y: 50 },
		{ id: 'year2', label: 'Year 2\n$126', type: 'confounder', x: 210, y: 50 },
		{ id: 'year3', label: 'Year 3\n$86', type: 'control', x: 340, y: 50 },
		{ id: 'total', label: 'Total CLV\n$397', type: 'outcome', x: 210, y: 170 }
	],
	edges: [
		{ id: 'y1-t', source: 'year1', target: 'total', label: '$185' },
		{ id: 'y2-t', source: 'year2', target: 'total', label: '+$126 = $311' },
		{ id: 'y3-t', source: 'year3', target: 'total', label: '+$86 = $397' }
	]
};

const decayCurveSection: ContentSection = {
	id: 'clv-decay-curve',
	type: 'diagram',
	title: 'CLV Decay Curve',
	diagram: decayCurveDiagram,
	content: `The CLV decay curve visualizes how each successive year contributes less to the total customer lifetime value.

**Year 1: $185** — The largest single-year contribution. The customer is fully active and there is no discounting.

**Year 2: $126** — A 32% decrease from Year 1. Only 75% of customers remain, and the value is discounted by 10%.

**Year 3: $86** — A further 32% decrease from Year 2. Retention and discounting continue to compound, reducing the marginal contribution.

**Total CLV: $397** — The sum of all three years represents the present value of the customer relationship.

This pattern — rapid initial value followed by diminishing contributions — is characteristic of nearly all CLV calculations. The specific shape of the curve depends on the retention rate and discount rate:
- **Higher retention** → flatter decay (more value in later years)
- **Higher discount rate** → steeper decay (future years worth less)
- **Lower retention** → steeper decay (fewer customers remain)`
};

// =============================================================================
// Section 4: Why Each Year Adds Less
// =============================================================================

const whyLessSection: ContentSection = {
	id: 'why-each-year-less',
	type: 'text',
	title: 'Why Each Year Adds Less',
	content: `Two forces combine to compress the value of future years, creating exponential decay in yearly CLV contributions:

**(1) Retention < 1: Fewer customers survive each year**

With a 75% retention rate, the proportion of original customers remaining drops rapidly:

| Year | Retention Probability (R^t) | Customers Remaining |
|---|---|---|
| 1 | 1.000 | 100% |
| 2 | 0.750 | 75.0% |
| 3 | 0.5625 | 56.25% |
| 4 | 0.4219 | 42.19% |
| 5 | 0.3164 | 31.64% |

By Year 5, less than one-third of the original customer cohort remains active.

**(2) Discounting: Future dollars are worth less**

At a 10% discount rate, the present value of $1 received in the future declines:

| Year | Discount Factor 1/(1+i)^t | $1 Worth Today |
|---|---|---|
| 1 | 1.000 | $1.000 |
| 2 | 0.909 | $0.909 |
| 3 | 0.826 | $0.826 |
| 4 | 0.751 | $0.751 |
| 5 | 0.683 | $0.683 |

**Combined effect:** The yearly contribution to CLV is the margin multiplied by BOTH factors:

| Year | Margin | Retention | Discount | Yearly Contribution |
|---|---|---|---|---|
| 1 | $185 | 1.000 | 1.000 | **$185** |
| 2 | $185 | 0.750 | 0.909 | **$126** |
| 3 | $185 | 0.5625 | 0.826 | **$86** |
| 4 | $185 | 0.4219 | 0.751 | **$59** |
| 5 | $185 | 0.3164 | 0.683 | **$40** |

The combined effect is exponential decay. Each year, fewer customers remain AND each remaining customer's future profits are worth less in today's terms. This is why extending the planning horizon beyond 3-5 years adds relatively little to CLV.`
};

// =============================================================================
// Section 5: The Retention Lever
// =============================================================================

const retentionLeverSection: ContentSection = {
	id: 'retention-lever',
	type: 'text',
	title: 'The Retention Lever',
	content: `Small changes in retention have **outsized impact** on CLV because retention compounds exponentially through the R^t term. This makes retention the single most powerful lever for increasing customer lifetime value.

**Comparison: 75% vs 85% retention (3-year horizon, M=$185, i=10%)**

| Year | 75% Retention | 85% Retention |
|---|---|---|
| Year 1 | $185 | $185 |
| Year 2 | $126 | $143 |
| Year 3 | $86 | $111 |
| **3-Year CLV** | **$397** | **$439** |

A 10 percentage point improvement in retention (from 75% to 85%) increases 3-year CLV by approximately **$42 or about 10.6%**.

**Why the effect is so powerful:**

The retention rate affects every future year multiplicatively through R^t. At 75% retention, by Year 3 only 56.25% of customers remain (0.75^2). At 85% retention, 72.25% remain (0.85^2). That difference — 72.25% vs 56.25% — means 28% more customers generating revenue in Year 3.

**Over longer horizons, the gap widens dramatically:**

| Horizon | CLV at 75% R | CLV at 85% R | Difference |
|---|---|---|---|
| 3 years | $397 | $439 | +$42 (+10.6%) |
| 5 years | $496 | $587 | +$91 (+18.3%) |

**Managerial implication:** This is why retention programs are so valuable. If improving retention from 75% to 85% costs $20 per customer, and the CLV increase is $42-$91 per customer, the retention program has a strong positive ROI. Every dollar spent on retention earns back $2-$4 in additional CLV.

The math is clear: **invest in keeping customers, not just acquiring them.** Retention compounds; acquisition does not.`
};

// =============================================================================
// Section 6: Managerial Applications
// =============================================================================

const managerialSection: ContentSection = {
	id: 'managerial-applications',
	type: 'text',
	title: 'Managerial Applications',
	content: `CLV directly informs critical business decisions across marketing, finance, and strategy:

**Maximum Allowable Customer Acquisition Cost**

If CLV = $397, then spending $400 to acquire a customer is a guaranteed loss. The maximum allowable CAC is the CLV minus desired profit margin. If you target a 20% margin on acquisition, your maximum CAC = $397 x 0.80 = $318. Any channel that acquires customers for less than $318 is profitable.

**Retention Program ROI**

Retention programs have quantifiable returns through CLV. If a loyalty program costs $15 per customer annually and increases retention from 75% to 80%, calculate the CLV at both retention levels. If the CLV increase exceeds $15, the program generates positive ROI.

**Marketing Investment Justification**

CLV transforms marketing from a cost center into an investment proposition. Instead of "we spent $500K on marketing last quarter," the argument becomes "we acquired 2,000 customers with an average CLV of $397, creating $794K in customer value at a cost of $500K — a 59% return."

**Investor Storytelling**

Companies with high and growing CLV can argue for more aggressive growth investment. If CLV is increasing while CAC is stable, each new customer is worth more — a powerful signal to investors that the business model is strengthening.

**Segment-Level Resource Allocation**

When you know CLV by segment, resource allocation becomes data-driven. If Enterprise customers have 4x the CLV of SMB customers, disproportionately investing in enterprise acquisition and retention is mathematically justified.`
};

// =============================================================================
// Section 7: Key Exam Points
// =============================================================================

const examPointsSection: ContentSection = {
	id: 'key-exam-points',
	type: 'text',
	title: 'Key Exam Points',
	content: `This section summarizes the formulas and concepts students must know for examination:

**The CLV Formula:**

CLV = sum of (M x R^t) / (1 + i)^t for t = 1 to T

Where: T = planning horizon, M = contribution margin, R = retention probability, i = discount rate.

**Critical Distinctions:**

1. **Contribution Margin vs Revenue** — CLV uses margin (Revenue - Variable Costs), NOT total revenue. Using revenue overstates CLV and leads to overspending on acquisition.

2. **Why Discounting is Necessary** — Money today is worth more than money tomorrow due to inflation, risk, and opportunity cost. Undiscounted CLV overstates the true value of customers.

3. **Effect of Retention on CLV** — Retention enters the formula as R^t, creating exponential impact. A small increase in retention has a compounding effect across all future years, making it the most powerful CLV lever.

4. **Cumulative CLV Interpretation** — Each additional year adds less than the previous year due to the combined effects of retention loss and discounting. The first year typically contributes the most to total CLV.

5. **Maximum CAC Rule** — Customer acquisition cost must be less than CLV for a customer to be profitable. CAC > CLV means the company loses money on every customer acquired.

**Worked Example Summary:**

| Parameter | Value |
|---|---|
| Annual Contribution Margin (M) | $185 |
| Retention Rate (R) | 75% |
| Discount Rate (i) | 10% |
| Year 1 CLV | $185 |
| Year 2 CLV (cumulative) | $311 |
| Year 3 CLV (cumulative) | $397 |

**Remember:** CLV is a forward-looking metric that combines margin, retention, and time value of money into a single number representing the present value of a customer relationship.`
};

// =============================================================================
// Export Lecture Content
// =============================================================================

export const lectureContent: LectureContent = {
	lectureId: 'clv-calculation',
	sections: [
		clvFormulaSection,
		calculationSection,
		decayCurveSection,
		whyLessSection,
		retentionLeverSection,
		managerialSection,
		examPointsSection
	]
};
