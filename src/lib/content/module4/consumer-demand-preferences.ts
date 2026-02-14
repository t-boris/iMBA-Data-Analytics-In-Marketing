/**
 * Lecture 1: Consumer Demand and Preference Analysis
 *
 * This lecture introduces Module 4 through a music store case study:
 * - Why data-driven analysis matters
 * - The gap between product and customer
 * - Module roadmap: STP, Conjoint Analysis, CLV
 * - Key concepts preview
 */

import type { LectureContent, ContentSection } from '../types';
import type { DiagramData } from '$lib/components/diagrams';
import type { ExplanationStep } from '$lib/components/animation';

// =============================================================================
// Section 1: Module Overview
// =============================================================================

const moduleOverviewSection: ContentSection = {
	id: 'module-overview',
	type: 'text',
	title: 'Module Overview',
	content: `Welcome to Module 4: **Customer Preferences and Lifetime Value Analysis**. This module equips you with three powerful analytical frameworks that work together to drive data-informed marketing decisions.

**The Three Pillars of This Module:**

1. **STP Framework** (Segmentation, Targeting, Positioning) — Identify *who* your customer is, *which* segment to focus on, and *how* to position your product in their mind.

2. **Conjoint Analysis** — Measure *what* customers truly value inside a product by forcing real trade-offs, not just asking what they like.

3. **Customer Lifetime Value (CLV)** — Calculate the *long-term profitability* of a customer relationship, moving beyond single transactions to sustainable growth.

These tools form a natural progression: first you understand your customers (STP), then you measure their preferences (Conjoint), and finally you calculate their long-term value (CLV). Together, they transform marketing from guesswork into a data-driven discipline.

**Why does this matter?** Companies that align their products with actual customer preferences — not assumed ones — build sustainable competitive advantages. The difference between a successful product launch and a costly failure often comes down to whether these analyses were performed.`
};

// =============================================================================
// Section 2: The Music Store Case Study (Animated Explanation)
// =============================================================================

const caseStudySteps: ExplanationStep[] = [
	{
		id: 'case-1',
		title: 'The Investment',
		description:
			'A retail music store operating under tight credit conditions needed to quickly turn inventory into revenue. The store decided to invest in a premium line of bass amplifiers priced at $1,000-$2,000 — significantly above the usual $200-$600 range. The products were technologically advanced, visually striking, and unique in the market.',
		diagram: {
			nodes: [
				{ id: 'store', label: 'Music Store', type: 'treatment', x: 100, y: 90 },
				{ id: 'investment', label: 'Premium Amplifiers\n$1,000-$2,000', type: 'outcome', x: 320, y: 90 }
			],
			edges: [
				{ id: 's-i', source: 'store', target: 'investment', label: 'invests in' }
			]
		},
		highlights: ['store', 'investment'],
		annotations: [{ targetId: 'investment', text: 'Advanced tech, unique design', position: 'bottom' }]
	},
	{
		id: 'case-2',
		title: 'The Gap',
		description:
			'Customers visited the store, looked at the amplifiers, asked questions, took photos... but did not buy. A critical gap emerged between the product offering and the actual customer base. The target audience — hobby musicians and semi-professionals — had budgets of $200-$600 and prioritized practicality over premium features.',
		diagram: {
			nodes: [
				{ id: 'product', label: 'Product: Premium\n$1,000-$2,000', type: 'treatment', x: 80, y: 50 },
				{ id: 'customer', label: 'Target: Hobby\nMusicians', type: 'control', x: 320, y: 50 },
				{ id: 'budget', label: 'Budget:\n$200-$600', type: 'confounder', x: 80, y: 160 },
				{ id: 'priorities', label: 'Priority:\nPracticality', type: 'confounder', x: 320, y: 160 }
			],
			edges: [
				{ id: 'p-c', source: 'product', target: 'customer', label: 'mismatch', style: 'dashed' },
				{ id: 'b-p', source: 'budget', target: 'priorities', label: 'aligned' }
			]
		},
		highlights: ['product', 'customer', 'budget', 'priorities'],
		annotations: [
			{ targetId: 'product', text: 'What store valued', position: 'top' },
			{ targetId: 'customer', text: 'What customers needed', position: 'top' }
		]
	},
	{
		id: 'case-3',
		title: 'Three Missing Analyses',
		description:
			'Three analytical tools could have prevented this costly failure. Market Segmentation would have revealed the customer base was hobby musicians, not professionals. Conjoint Analysis would have shown customers valued price and practicality over technology and design. CLV analysis would have shown that building long-term relationships with budget-conscious musicians was more profitable than chasing one-time premium sales.',
		diagram: {
			nodes: [
				{ id: 'seg', label: 'Market\nSegmentation', type: 'treatment', x: 70, y: 60 },
				{ id: 'conj', label: 'Conjoint\nAnalysis', type: 'confounder', x: 210, y: 60 },
				{ id: 'clv', label: 'Customer\nLifetime Value', type: 'outcome', x: 350, y: 60 },
				{ id: 'decision', label: 'Data-Driven\nDecision', type: 'variable', x: 210, y: 170 }
			],
			edges: [
				{ id: 's-d', source: 'seg', target: 'decision' },
				{ id: 'c-d', source: 'conj', target: 'decision' },
				{ id: 'v-d', source: 'clv', target: 'decision' }
			]
		},
		highlights: ['seg', 'conj', 'clv', 'decision'],
		annotations: [{ targetId: 'decision', text: 'Could have prevented the failure', position: 'bottom' }]
	},
	{
		id: 'case-4',
		title: 'The Lesson',
		description:
			'Sustainable business decisions require alignment of four elements: the product, customer preferences, customer budget, and the correct market segment. Intuition led the store to invest based on what impressed them — technology and design. Data would have revealed what actually mattered to customers — price and practicality. The core lesson: data-driven analysis, not intuition, should drive product and marketing decisions.',
		diagram: {
			nodes: [
				{ id: 'product', label: 'Product', type: 'treatment', x: 210, y: 30 },
				{ id: 'prefs', label: 'Customer\nPreferences', type: 'control', x: 370, y: 100 },
				{ id: 'budget', label: 'Customer\nBudget', type: 'confounder', x: 280, y: 200 },
				{ id: 'segment', label: 'Market\nSegment', type: 'variable', x: 120, y: 200 },
				{ id: 'align', label: 'Alignment\n= Success', type: 'outcome', x: 210, y: 120 }
			],
			edges: [
				{ id: 'p-a', source: 'product', target: 'align' },
				{ id: 'pr-a', source: 'prefs', target: 'align' },
				{ id: 'b-a', source: 'budget', target: 'align' },
				{ id: 's-a', source: 'segment', target: 'align' }
			]
		},
		highlights: ['align'],
		annotations: [{ targetId: 'align', text: 'All four must converge', position: 'bottom' }]
	}
];

const caseStudySection: ContentSection = {
	id: 'music-store-case',
	type: 'explanation',
	title: 'The Music Store Case Study',
	explanation: {
		steps: caseStudySteps
	}
};

// =============================================================================
// Section 3: Why Data Over Intuition
// =============================================================================

const dataOverIntuitionSection: ContentSection = {
	id: 'data-over-intuition',
	type: 'text',
	title: 'Why Data Over Intuition',
	content: `The music store case reveals a fundamental problem with intuition-based decision making: **companies tend to overvalue attributes that matter to themselves, not to their customers.**

The store was impressed by the amplifiers' technological innovation and striking design. But customers cared about very different things:

| What the Store Valued | What Customers Valued |
|---|---|
| Cutting-edge technology | Adequate functionality |
| Premium design aesthetic | Practical durability |
| Market uniqueness | Affordable price point |
| "Wow factor" | Value for money |
| Professional-grade features | Hobby-appropriate features |

**The intuition trap:** When you are deeply immersed in a product category, you develop expert-level appreciation for subtle differences. But most customers are not experts. They make decisions based on practical considerations — price, basic functionality, and how well the product fits their actual use case.

**The data solution:** Rather than guessing what customers want, the three analytical tools in this module provide rigorous, quantitative answers:
- **STP** reveals who your real customers are and what segment they belong to
- **Conjoint Analysis** measures exactly which attributes drive their choices
- **CLV** calculates whether a customer relationship will be profitable long-term

The goal is to replace "gut feelings" with evidence-based marketing decisions.`
};

// =============================================================================
// Section 4: Module Roadmap (Diagram)
// =============================================================================

const moduleRoadmapDiagram: DiagramData = {
	nodes: [
		{ id: 'stp', label: 'STP Framework\nSegment → Target → Position', type: 'treatment', x: 60, y: 90 },
		{ id: 'conjoint', label: 'Conjoint Analysis\nMeasure attribute value', type: 'confounder', x: 220, y: 90 },
		{ id: 'clv', label: 'Customer Lifetime Value\nLong-term profitability', type: 'outcome', x: 380, y: 90 }
	],
	edges: [
		{ id: 's-c', source: 'stp', target: 'conjoint', label: 'identify segments' },
		{ id: 'c-v', source: 'conjoint', target: 'clv', label: 'measure preferences' }
	]
};

const moduleRoadmapSection: ContentSection = {
	id: 'module-roadmap',
	type: 'diagram',
	title: 'Module Roadmap',
	diagram: moduleRoadmapDiagram,
	content: `This module follows a logical progression through three interconnected analytical frameworks:

**Step 1: STP Framework** — First, we learn to segment the market, select the right target audience, and position our product effectively. This answers: *Who is our customer?*

**Step 2: Conjoint Analysis** — Next, we measure what those target customers actually value in a product by analyzing their trade-off decisions. This answers: *What do they want?*

**Step 3: Customer Lifetime Value** — Finally, we calculate the long-term economic value of customer relationships to make sustainable investment decisions. This answers: *How much is each customer worth?*

Each tool builds on the previous one. Effective conjoint analysis requires knowing your segment (STP), and meaningful CLV calculations require understanding customer preferences (Conjoint).`
};

// =============================================================================
// Section 5: Key Concepts Preview
// =============================================================================

const keyConceptsSection: ContentSection = {
	id: 'key-concepts-preview',
	type: 'text',
	title: 'Key Concepts Preview',
	content: `Here are the core concepts you will master in this module:

**Market Segmentation** — Dividing the market into groups of customers with similar characteristics, needs, or behaviors. Not all customers are alike, and effective marketing starts with understanding these differences.

**Target Market** — The specific segment(s) a company chooses to focus its marketing resources on. Selecting the right target is critical because resources are finite — you cannot serve everyone equally well.

**Positioning** — Creating a distinct image of the product in the target customer's mind relative to competitors. Positioning is not about the product itself — it is about *perception*.

**Conjoint Analysis** — A statistical method that measures how consumers value different product attributes and what trade-offs they are willing to make. It reveals the *relative importance* of features like price, quality, design, and functionality.

**Customer Lifetime Value (CLV)** — The total discounted profit a company expects to earn from a customer over the entire duration of their relationship. CLV shifts the focus from single transactions to long-term customer economics.`
};

// =============================================================================
// Section 6: The CLV Formula Preview
// =============================================================================

const clvPreviewSection: ContentSection = {
	id: 'clv-formula-preview',
	type: 'text',
	title: 'The CLV Formula Preview',
	content: `In Lectures 4 and 5, we will develop the full Customer Lifetime Value formula. Here is a preview of the key components:

**Conceptual Equation:**

<span class="formula">CLV <span class="op">=</span> <span class="op">Σ</span> discounted future profits from a customer</span>

**Key Components:**
- **Retention Rate (r)** — The probability that a customer continues doing business with you from one period to the next
- **Margin (m)** — The profit earned per customer per period
- **Discount Rate (d)** — The time value of money — future profits are worth less than present profits
- **Planning Horizon (T)** — How far into the future you project the customer relationship

**Why CLV Matters:**
- It tells you how much you can afford to spend acquiring a customer (Customer Acquisition Cost must be less than CLV)
- It identifies which customer segments are most valuable long-term
- It shifts strategy from short-term revenue maximization to sustainable growth
- Companies with high CLV can invest more aggressively in marketing while maintaining profitability

**The music store lesson revisited:** The premium amplifiers might have generated impressive single-sale revenue, but the store's typical customers — hobby musicians buying $200-$600 products repeatedly over years — likely had higher CLV. Chasing a single big sale at the expense of long-term customer relationships is a classic CLV mistake.`
};

// =============================================================================
// Export Lecture Content
// =============================================================================

export const lectureContent: LectureContent = {
	lectureId: 'consumer-demand-preferences',
	sections: [
		moduleOverviewSection,
		caseStudySection,
		dataOverIntuitionSection,
		moduleRoadmapSection,
		keyConceptsSection,
		clvPreviewSection
	]
};
