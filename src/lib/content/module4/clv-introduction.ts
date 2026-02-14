/**
 * Lecture 4: Introduction to CLV Analysis
 *
 * This lecture covers WHY Customer Lifetime Value matters strategically:
 * - What CLV is and why it matters
 * - Strategic importance and alignment problem
 * - CLV components (CAC, margin, retention, discount rate)
 * - The payback period trap
 * - Discounted vs undiscounted CLV
 * - Bonobos guide shops example
 * - CLV as a common language
 */

import type { LectureContent, ContentSection } from '../types';
import type { DiagramData } from '$lib/components/diagrams';
import type { ExplanationStep } from '$lib/components/animation';

// =============================================================================
// Section 1: What is Customer Lifetime Value?
// =============================================================================

const whatIsClvSection: ContentSection = {
	id: 'what-is-clv',
	type: 'text',
	title: 'What is Customer Lifetime Value?',
	content: `**Customer Lifetime Value (CLV)** is the total discounted profit a company expects to earn from a customer over the entire duration of their relationship. It is the central metric for customer-centric companies and a cornerstone of modern marketing analytics.

CLV is increasingly used in:
- **Pre-IPO reporting** — demonstrating long-term revenue sustainability to potential investors
- **Investor analytics** — showing growth quality beyond quarterly revenue numbers
- **Strategic planning** — guiding resource allocation across acquisition and retention
- **Growth assessment** — evaluating whether customer relationships are strengthening or deteriorating

**The fundamental shift:** CLV represents a transition from short-term revenue thinking to long-term customer economics. Rather than asking "How much did we sell this quarter?", CLV asks "How much is each customer relationship worth over its full lifetime?"

This distinction matters because a company that acquires many customers cheaply but loses them quickly may appear successful in the short term while actually destroying value. CLV exposes this by accounting for the full arc of the customer relationship — from acquisition through retention to eventual churn.`
};

// =============================================================================
// Section 2: Why CLV Matters (Animated Explanation)
// =============================================================================

const whyClvSteps: ExplanationStep[] = [
	{
		id: 'clv-why-1',
		title: 'Strategic Importance',
		description:
			'CLV reflects the value of customer retention, the importance of loyalty, the long-term profitability of different segments, and the effectiveness of acquisition channels. Companies with high CLV can invest more aggressively in marketing because each acquired customer generates more lifetime profit. This creates a virtuous cycle: higher CLV enables higher marketing spend, which attracts better customers, which further increases CLV.',
		diagram: {
			nodes: [
				{ id: 'clv-metric', label: 'High CLV', type: 'outcome', x: 210, y: 40 },
				{ id: 'retention', label: 'Retention\nValue', type: 'treatment', x: 80, y: 130 },
				{ id: 'loyalty', label: 'Customer\nLoyalty', type: 'treatment', x: 210, y: 130 },
				{ id: 'segment', label: 'Segment\nProfitability', type: 'treatment', x: 340, y: 130 }
			],
			edges: [
				{ id: 'c-r', source: 'clv-metric', target: 'retention', label: 'reflects' },
				{ id: 'c-l', source: 'clv-metric', target: 'loyalty', label: 'measures' },
				{ id: 'c-s', source: 'clv-metric', target: 'segment', label: 'evaluates' }
			]
		},
		highlights: ['clv-metric'],
		annotations: [{ targetId: 'clv-metric', text: 'Central strategic metric', position: 'top' }]
	},
	{
		id: 'clv-why-2',
		title: 'The Alignment Problem',
		description:
			'In practice, different departments often calculate CLV differently. Marketing uses CLV to justify advertising spend and may inflate assumptions. Finance uses CLV for company valuation and may apply conservative discount rates. Operations may ignore CLV entirely, treating it as a "non-operational" metric. This creates a situation where three departments in the same company are working with three different numbers for the same metric.',
		diagram: {
			nodes: [
				{ id: 'marketing', label: 'Marketing\nCLV: $500', type: 'treatment', x: 80, y: 60 },
				{ id: 'finance', label: 'Finance\nCLV: $280', type: 'control', x: 340, y: 60 },
				{ id: 'operations', label: 'Operations\nCLV: ignored', type: 'confounder', x: 210, y: 150 }
			],
			edges: [
				{ id: 'm-o', source: 'marketing', target: 'operations', label: 'different values' },
				{ id: 'f-o', source: 'finance', target: 'operations', label: 'conflicting data' },
				{ id: 'm-f', source: 'marketing', target: 'finance', label: 'misaligned' }
			]
		},
		highlights: ['marketing', 'finance', 'operations'],
		annotations: [{ targetId: 'operations', text: 'Three views, one metric', position: 'bottom' }]
	},
	{
		id: 'clv-why-3',
		title: 'Metric Misalignment',
		description:
			'When departments use different CLV definitions, the consequences are severe. Bad investment decisions follow from inflated or deflated CLV numbers. Budget allocation becomes a political battle rather than a data-driven process. KPI conflicts emerge when marketing targets "customer acquisition" while finance targets "profitability" using incompatible CLV calculations. The result is strategic chaos — the company pulls in multiple directions simultaneously, wasting resources and missing opportunities.',
		diagram: {
			nodes: [
				{ id: 'misalign', label: 'Metric\nMisalignment', type: 'confounder', x: 210, y: 40 },
				{ id: 'bad-decisions', label: 'Bad\nDecisions', type: 'variable', x: 80, y: 130 },
				{ id: 'budget-fail', label: 'Wrong Budget\nAllocation', type: 'variable', x: 210, y: 130 },
				{ id: 'kpi-conflict', label: 'KPI\nConflicts', type: 'variable', x: 340, y: 130 }
			],
			edges: [
				{ id: 'm-bd', source: 'misalign', target: 'bad-decisions' },
				{ id: 'm-bf', source: 'misalign', target: 'budget-fail' },
				{ id: 'm-kc', source: 'misalign', target: 'kpi-conflict' }
			]
		},
		highlights: ['misalign'],
		annotations: [{ targetId: 'misalign', text: 'Root cause of strategic chaos', position: 'top' }]
	},
	{
		id: 'clv-why-4',
		title: 'Standardization Solution',
		description:
			'The solution is CLV standardization: one formula, one set of assumptions, used across the entire company. When marketing, finance, strategy, and operations all use the same CLV calculation, the company operates with a single strategy instead of competing agendas. Standardized CLV enables aligned investment decisions, consistent budget allocation, unified KPIs, and coherent strategic planning. It transforms CLV from a contested number into a shared truth.',
		diagram: {
			nodes: [
				{ id: 'one-formula', label: 'One CLV\nFormula', type: 'outcome', x: 210, y: 40 },
				{ id: 'mkt-aligned', label: 'Marketing', type: 'treatment', x: 60, y: 130 },
				{ id: 'fin-aligned', label: 'Finance', type: 'treatment', x: 160, y: 130 },
				{ id: 'str-aligned', label: 'Strategy', type: 'treatment', x: 260, y: 130 },
				{ id: 'ops-aligned', label: 'Operations', type: 'treatment', x: 360, y: 130 }
			],
			edges: [
				{ id: 'f-m', source: 'one-formula', target: 'mkt-aligned', label: 'aligned' },
				{ id: 'f-f', source: 'one-formula', target: 'fin-aligned', label: 'aligned' },
				{ id: 'f-s', source: 'one-formula', target: 'str-aligned', label: 'aligned' },
				{ id: 'f-o', source: 'one-formula', target: 'ops-aligned', label: 'aligned' }
			]
		},
		highlights: ['one-formula'],
		annotations: [{ targetId: 'one-formula', text: 'Single source of truth', position: 'top' }]
	}
];

const whyClvSection: ContentSection = {
	id: 'why-clv-matters',
	type: 'explanation',
	title: 'Why CLV Matters',
	explanation: {
		steps: whyClvSteps
	}
};

// =============================================================================
// Section 3: CLV Components (Diagram)
// =============================================================================

const clvComponentsDiagram: DiagramData = {
	nodes: [
		{ id: 'cac', label: 'Customer Acquisition\nCost (CAC)\nAds, sales, promos', type: 'control', x: 80, y: 40 },
		{ id: 'margin', label: 'Contribution\nMargin\nRevenue - Variable Costs', type: 'treatment', x: 340, y: 40 },
		{ id: 'retention', label: 'Retention\nRate\nP(customer stays)', type: 'confounder', x: 80, y: 180 },
		{ id: 'discount', label: 'Discount\nRate\nTime value of money', type: 'variable', x: 340, y: 180 },
		{ id: 'clv', label: 'CLV', type: 'outcome', x: 210, y: 110 }
	],
	edges: [
		{ id: 'cac-clv', source: 'cac', target: 'clv', label: 'reduces' },
		{ id: 'margin-clv', source: 'margin', target: 'clv', label: 'increases' },
		{ id: 'retention-clv', source: 'retention', target: 'clv', label: 'multiplies' },
		{ id: 'discount-clv', source: 'discount', target: 'clv', label: 'discounts' }
	]
};

const clvComponentsSection: ContentSection = {
	id: 'clv-components',
	type: 'diagram',
	title: 'CLV Components',
	diagram: clvComponentsDiagram,
	content: `CLV is determined by four key components that interact to produce the total lifetime value of a customer:

**Customer Acquisition Cost (CAC)** — The total cost of acquiring a new customer, including advertising, sales commissions, promotions, and onboarding expenses. CAC **reduces** CLV because it is an upfront investment that must be recouped through future profits.

**Contribution Margin (M)** — The profit generated per customer per period after subtracting variable costs from revenue. This is NOT revenue — it is revenue minus the direct costs of serving that customer. Contribution margin **increases** CLV as it represents the recurring profit stream.

**Retention Rate (R)** — The probability that a customer remains active from one period to the next. Retention **multiplies** CLV because it compounds over time: a 75% retention rate means only 56.25% remain after two years (0.75 \u00d7 0.75), and only 42.19% after three years.

**Discount Rate (i)** — The rate used to convert future cash flows to present value, typically reflecting the company's cost of capital. The discount rate **discounts** CLV by making future profits worth less than current profits, accounting for inflation, risk, and opportunity cost.`
};

// =============================================================================
// Section 4: The Payback Period Trap
// =============================================================================

const paybackSection: ContentSection = {
	id: 'payback-period-trap',
	type: 'text',
	title: 'The Payback Period Trap',
	content: `Many companies default to the **payback period** as their primary metric for evaluating customer acquisition investments. The payback period measures how long it takes for revenue from a customer to recoup the acquisition cost.

While simple and intuitive, the payback period contains a dangerous trap:

**What it ignores:**
- **Long-term profit** — Payback only looks at the early period, ignoring all value generated after the break-even point
- **Retention effects** — It does not account for the compounding value of loyal customers who stay for years
- **Tail value** — High-CLV customers often generate most of their value after the payback period ends

**The real risk:** Companies that rely exclusively on payback period may cut profitable acquisition channels because the initial payback appears slow. A channel that takes 8 months to pay back but generates customers with a 5-year CLV of $2,000 is far more valuable than a channel that pays back in 2 months but produces customers who churn after 6 months.

**Example:** If your CAC is $200 and customers generate $30/month in margin, the payback period is about 7 months. A payback-focused manager might cut this channel. But if retention is 80% annually, the 3-year CLV of these customers could exceed $700 — making $200 in acquisition a highly profitable investment.

The payback period answers "How fast do I get my money back?" but CLV answers the far more important question: "How much is this customer worth?"
`
};

// =============================================================================
// Section 5: Discounted vs Undiscounted CLV (Animated Explanation)
// =============================================================================

const discountSteps: ExplanationStep[] = [
	{
		id: 'disc-1',
		title: 'Undiscounted CLV',
		description:
			'The simplest approach to CLV is to sum all expected future profits without any discounting. For example, if a customer generates $185 per year for 3 years, the undiscounted CLV would be $555. The problem: $100 today is NOT equal to $100 three years from now. Undiscounted CLV overstates value, especially for companies with short customer lifecycles. It is simpler to calculate but strategically misleading — it inflates the apparent value of long-horizon customers and can lead to overinvestment in acquisition.',
		diagram: {
			nodes: [
				{ id: 'yr1-u', label: 'Year 1\n$185', type: 'treatment', x: 80, y: 60 },
				{ id: 'yr2-u', label: 'Year 2\n$185', type: 'treatment', x: 210, y: 60 },
				{ id: 'yr3-u', label: 'Year 3\n$185', type: 'treatment', x: 340, y: 60 },
				{ id: 'total-u', label: 'Total: $555\n(overstated)', type: 'confounder', x: 210, y: 150 }
			],
			edges: [
				{ id: 'y1-t', source: 'yr1-u', target: 'total-u' },
				{ id: 'y2-t', source: 'yr2-u', target: 'total-u' },
				{ id: 'y3-t', source: 'yr3-u', target: 'total-u' }
			]
		},
		highlights: ['total-u'],
		annotations: [{ targetId: 'total-u', text: 'Ignores time value of money', position: 'bottom' }]
	},
	{
		id: 'disc-2',
		title: 'Time Value of Money',
		description:
			'Money today is worth more than the same amount in the future due to three factors: inflation erodes purchasing power over time, risk means future payments may not materialize, and opportunity cost means today\'s money could be invested for returns. The formula for present value is: PV = FV / (1 + r)\u1D57, where r is the discount rate and t is the number of periods. At a 10% discount rate, $100 in 3 years is worth only $75.13 today.',
		diagram: {
			nodes: [
				{ id: 'today', label: '$100 Today', type: 'outcome', x: 80, y: 90 },
				{ id: 'future', label: '$100 in 3 Years', type: 'variable', x: 340, y: 90 },
				{ id: 'pv', label: 'PV = $75.13\nat 10% rate', type: 'control', x: 210, y: 90 }
			],
			edges: [
				{ id: 'f-pv', source: 'future', target: 'pv', label: 'discount' },
				{ id: 'pv-t', source: 'pv', target: 'today', label: 'equivalent' }
			]
		},
		highlights: ['today', 'pv'],
		annotations: [{ targetId: 'pv', text: 'PV = FV / (1 + r)^t', position: 'top' }]
	},
	{
		id: 'disc-3',
		title: 'Discounted CLV',
		description:
			'Discounted CLV applies the discount rate to all future cash flows before summing them. This is the financially correct approach because it accounts for the time value of money, makes CLV comparable to other valuation models used in finance, aligns with the company\'s cost of capital, and produces numbers suitable for investment decisions. When deciding how much to spend acquiring a customer, only the discounted CLV gives you an accurate answer.',
		diagram: {
			nodes: [
				{ id: 'yr1-d', label: 'Year 1\n$185', type: 'outcome', x: 80, y: 60 },
				{ id: 'yr2-d', label: 'Year 2\n$126', type: 'treatment', x: 210, y: 60 },
				{ id: 'yr3-d', label: 'Year 3\n$86', type: 'control', x: 340, y: 60 },
				{ id: 'total-d', label: 'Total: $397\n(accurate)', type: 'outcome', x: 210, y: 150 }
			],
			edges: [
				{ id: 'y1-td', source: 'yr1-d', target: 'total-d' },
				{ id: 'y2-td', source: 'yr2-d', target: 'total-d' },
				{ id: 'y3-td', source: 'yr3-d', target: 'total-d' }
			]
		},
		highlights: ['total-d'],
		annotations: [{ targetId: 'total-d', text: 'Accounts for time value', position: 'bottom' }]
	}
];

const discountedClvSection: ContentSection = {
	id: 'discounted-vs-undiscounted',
	type: 'explanation',
	title: 'Discounted vs Undiscounted CLV',
	explanation: {
		steps: discountSteps
	}
};

// =============================================================================
// Section 6: Bonobos Guide Shops Example
// =============================================================================

const bonobosSection: ContentSection = {
	id: 'bonobos-example',
	type: 'text',
	title: 'Bonobos Guide Shops Example',
	content: `**Bonobos**, the men's clothing brand, pioneered "guide shops" — small offline fitting rooms where customers try on clothes, get expert styling advice, and then place their order online for home delivery. The model seemed counterintuitive: why invest in expensive retail space when you could sell everything online?

**CLV analysis provided the answer.**

When Bonobos analyzed customer lifetime value by acquisition channel, they discovered that guide shop customers had **significantly higher CLV** than online-only customers. Guide shop customers:
- Made larger initial purchases due to hands-on fitting experience
- Had higher retention rates from the personal relationship with stylists
- Showed greater cross-category purchasing over time
- Referred more new customers

**The strategic implication:** Despite guide shops having a higher cost-per-acquisition than digital channels, the lifetime value of these customers more than justified the investment. The higher upfront cost was offset by dramatically better retention and purchasing behavior over years.

**Result:** Bonobos increased investment in the guide shop channel, opening more locations. CLV analysis transformed what looked like an expensive experiment into a proven growth strategy. Without CLV, a simple payback analysis might have killed the program — the upfront costs were significant and early returns modest. But the long-term value was compelling.

This case illustrates a core CLV principle: **the right metric reveals the right strategy.** Payback period would have said "cut this expensive channel." CLV said "double down on it."`
};

// =============================================================================
// Section 7: CLV as a Common Language
// =============================================================================

const commonLanguageSection: ContentSection = {
	id: 'clv-common-language',
	type: 'text',
	title: 'CLV as a Common Language',
	content: `CLV is more than a metric — it is the **unified language of customer economics**. When adopted consistently across an organization, CLV enables:

**Aligning cross-department decisions** — Marketing, finance, product, and operations can debate strategy using the same numbers. When everyone agrees on what a customer is worth, conversations shift from "my department needs more budget" to "where does the next dollar create the most customer value?"

**Investing in the right channels** — CLV reveals which acquisition channels produce the most valuable customers, not just the most customers. A channel that acquires fewer customers but with 3x higher CLV is often the better investment.

**Evaluating retention strategies** — Retention programs are expensive to run. CLV quantifies their impact: if improving retention from 75% to 80% increases average CLV by $120, you know exactly how much you can spend on retention initiatives and still profit.

**Comparing customer segments** — Not all customer segments are equal. CLV enables apples-to-apples comparison: Segment A may have 10,000 customers with $200 CLV ($2M total value), while Segment B has 2,000 customers with $800 CLV ($1.6M total value). The right strategy for each is very different.

**Planning growth** — CLV-based planning asks: "How much will it cost to acquire the next 10,000 customers, and what will their aggregate CLV be?" This connects marketing spend directly to business value creation.

The next lecture will move from CLV strategy to CLV calculation — introducing the formula, walking through a complete worked example, and demonstrating the mathematical mechanics of computing CLV step by step.`
};

// =============================================================================
// Export Lecture Content
// =============================================================================

export const lectureContent: LectureContent = {
	lectureId: 'clv-introduction',
	sections: [
		whatIsClvSection,
		whyClvSection,
		clvComponentsSection,
		paybackSection,
		discountedClvSection,
		bonobosSection,
		commonLanguageSection
	]
};
