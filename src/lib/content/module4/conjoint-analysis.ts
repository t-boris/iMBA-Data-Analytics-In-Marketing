/**
 * Lecture 3: Conjoint Analysis
 *
 * This lecture covers conjoint analysis methodology:
 * - Connection from STP to Conjoint
 * - How conjoint analysis works (4-step process)
 * - Part-worth utility measurement
 * - Why conjoint beats simple surveys
 * - Trade-offs and willingness to pay
 * - Practical applications
 * - Best practices
 */

import type { LectureContent, ContentSection } from '../types';
import type { DiagramData } from '$lib/components/diagrams';
import type { ExplanationStep } from '$lib/components/animation';

// =============================================================================
// Section 1: From STP to Conjoint
// =============================================================================

const fromStpSection: ContentSection = {
	id: 'from-stp-to-conjoint',
	type: 'text',
	title: 'From STP to Conjoint',
	content: `In the previous lecture, we explored the **STP Framework** — how to segment the market, select target segments, and position your product. STP answers the question: *Who is our customer and how should we appear to them?*

But STP leaves a deeper question unanswered:

**What exactly do customers value *inside* the product?**

Knowing you should target "urban commuters" or "premium tech enthusiasts" is important, but it does not tell you which specific product attributes drive their purchasing decisions. Should you invest in a better camera or a longer battery? Is screen size more important than price? Would customers accept a heavier design for more features?

This is where **Conjoint Analysis** enters the picture. While STP tells you *who* to target, conjoint analysis tells you *what* they value — and critically, **what trade-offs they are willing to make**.

Conjoint analysis is a statistical method that decomposes a product into its individual attributes, measures the utility (value) customers assign to each attribute level, and reveals the relative importance of different product features. It transforms vague questions like "what do customers want?" into precise, quantitative answers.`
};

// =============================================================================
// Section 2: How Conjoint Analysis Works (Animated Explanation)
// =============================================================================

const conjointSteps: ExplanationStep[] = [
	{
		id: 'conj-1',
		title: 'Define Attributes',
		description:
			'The first step is selecting the product attributes to study. For a smartphone, these might be screen size, camera quality, battery life, and price. A critical rule: include only significant attributes. Too many causes respondent fatigue and noisy data. Typically 4-6 attributes with 2-4 levels each works well. Each attribute must have clearly defined levels (e.g., camera: basic, good, excellent).',
		diagram: {
			nodes: [
				{ id: 'product', label: 'Product', type: 'treatment', x: 210, y: 40 },
				{ id: 'screen', label: 'Screen Size\nSmall | Medium | Large', type: 'variable', x: 60, y: 140 },
				{ id: 'camera', label: 'Camera\nBasic | Good | Excellent', type: 'variable', x: 210, y: 140 },
				{ id: 'battery', label: 'Battery\nShort | Medium | Long', type: 'variable', x: 360, y: 140 }
			],
			edges: [
				{ id: 'p-s', source: 'product', target: 'screen' },
				{ id: 'p-c', source: 'product', target: 'camera' },
				{ id: 'p-b', source: 'product', target: 'battery' }
			]
		},
		highlights: ['product', 'screen', 'camera', 'battery'],
		annotations: [{ targetId: 'product', text: 'Decompose into attributes', position: 'top' }]
	},
	{
		id: 'conj-2',
		title: 'Create Product Profiles',
		description:
			'Attribute levels are combined into realistic product profiles (hypothetical products). Each profile represents a specific combination of attribute values. For example: Profile A has a large screen, excellent camera, long battery, and high price. Profile B has a medium screen, good camera, medium battery, and mid price. Profiles must be realistic — no "best on everything at lowest price" — to force genuine trade-offs.',
		diagram: {
			nodes: [
				{ id: 'profile-a', label: 'Profile A\nLarge + Excellent + Long\nHigh Price', type: 'treatment', x: 100, y: 90 },
				{ id: 'vs', label: 'vs', type: 'variable', x: 210, y: 90 },
				{ id: 'profile-b', label: 'Profile B\nMedium + Good + Medium\nMid Price', type: 'control', x: 320, y: 90 }
			],
			edges: [
				{ id: 'a-vs', source: 'profile-a', target: 'vs' },
				{ id: 'vs-b', source: 'vs', target: 'profile-b' }
			]
		},
		highlights: ['profile-a', 'profile-b'],
		annotations: [
			{ targetId: 'profile-a', text: 'Premium configuration', position: 'top' },
			{ targetId: 'profile-b', text: 'Balanced configuration', position: 'top' }
		]
	},
	{
		id: 'conj-3',
		title: 'Collect Preferences',
		description:
			'Product profiles are shown to survey respondents who must choose between them, rank them, or rate them. The key insight: this forces real trade-offs. Unlike simple surveys where respondents can rate everything as "very important," conjoint analysis makes them confront reality — you cannot have the best camera, longest battery, AND lowest price. This mirrors actual purchasing behavior where every choice involves sacrifice.',
		diagram: {
			nodes: [
				{ id: 'profiles', label: 'Product\nProfiles', type: 'treatment', x: 80, y: 90 },
				{ id: 'respondent', label: 'Respondent', type: 'control', x: 210, y: 90 },
				{ id: 'choice', label: 'Forced\nChoice', type: 'outcome', x: 340, y: 90 }
			],
			edges: [
				{ id: 'p-r', source: 'profiles', target: 'respondent', label: 'shown to' },
				{ id: 'r-c', source: 'respondent', target: 'choice', label: 'must choose' }
			]
		},
		highlights: ['choice'],
		annotations: [{ targetId: 'choice', text: 'Reveals real preferences', position: 'bottom' }]
	},
	{
		id: 'conj-4',
		title: 'Calculate Part-Worth Utilities',
		description:
			'A statistical model (typically regression-based or choice-based) decomposes overall preference into part-worth utilities for each attribute level. This reveals: (1) how much utility each attribute level contributes, and (2) the relative importance of each attribute. For example: Price = 40% importance, Camera = 25%, Battery = 20%, Screen = 15%. Total utility of a profile equals the sum of part-worth utilities of its attribute levels.',
		diagram: {
			nodes: [
				{ id: 'model', label: 'Statistical\nModel', type: 'treatment', x: 210, y: 40 },
				{ id: 'price-u', label: 'Price\nImportance: 40%', type: 'outcome', x: 60, y: 140 },
				{ id: 'camera-u', label: 'Camera\nImportance: 25%', type: 'confounder', x: 170, y: 140 },
				{ id: 'battery-u', label: 'Battery\nImportance: 20%', type: 'control', x: 280, y: 140 },
				{ id: 'screen-u', label: 'Screen\nImportance: 15%', type: 'variable', x: 390, y: 140 }
			],
			edges: [
				{ id: 'm-p', source: 'model', target: 'price-u' },
				{ id: 'm-c', source: 'model', target: 'camera-u' },
				{ id: 'm-b', source: 'model', target: 'battery-u' },
				{ id: 'm-s', source: 'model', target: 'screen-u' }
			]
		},
		highlights: ['price-u', 'camera-u', 'battery-u', 'screen-u'],
		annotations: [{ targetId: 'price-u', text: 'Most important attribute', position: 'bottom' }]
	}
];

const conjointMethodSection: ContentSection = {
	id: 'how-conjoint-works',
	type: 'explanation',
	title: 'How Conjoint Analysis Works',
	explanation: {
		steps: conjointSteps
	}
};

// =============================================================================
// Section 3: Part-Worth Utility Chart (Diagram)
// =============================================================================

const partWorthDiagram: DiagramData = {
	nodes: [
		// Price group (most important - outcome/green)
		{ id: 'price-label', label: 'Price (40%)', type: 'outcome', x: 80, y: 30 },
		{ id: 'price-low', label: 'Low: +0.8', type: 'outcome', x: 40, y: 90 },
		{ id: 'price-mid', label: 'Mid: +0.3', type: 'variable', x: 120, y: 90 },
		{ id: 'price-high', label: 'High: -0.5', type: 'variable', x: 200, y: 90 },
		// Camera group
		{ id: 'camera-label', label: 'Camera (25%)', type: 'confounder', x: 80, y: 150 },
		{ id: 'cam-basic', label: 'Basic: -0.3', type: 'variable', x: 40, y: 210 },
		{ id: 'cam-good', label: 'Good: +0.1', type: 'variable', x: 120, y: 210 },
		{ id: 'cam-excel', label: 'Excellent: +0.5', type: 'confounder', x: 210, y: 210 },
		// Battery group
		{ id: 'battery-label', label: 'Battery (20%)', type: 'control', x: 340, y: 30 },
		{ id: 'bat-short', label: 'Short: -0.4', type: 'variable', x: 290, y: 90 },
		{ id: 'bat-med', label: 'Medium: +0.1', type: 'variable', x: 370, y: 90 },
		{ id: 'bat-long', label: 'Long: +0.3', type: 'control', x: 440, y: 90 },
		// Screen group
		{ id: 'screen-label', label: 'Screen (15%)', type: 'variable', x: 340, y: 150 },
		{ id: 'scr-small', label: 'Small: -0.1', type: 'variable', x: 290, y: 210 },
		{ id: 'scr-med', label: 'Medium: +0.1', type: 'variable', x: 370, y: 210 },
		{ id: 'scr-large', label: 'Large: +0.2', type: 'variable', x: 450, y: 210 }
	],
	edges: [
		// Price connections
		{ id: 'pl-pl', source: 'price-label', target: 'price-low' },
		{ id: 'pl-pm', source: 'price-label', target: 'price-mid' },
		{ id: 'pl-ph', source: 'price-label', target: 'price-high' },
		// Camera connections
		{ id: 'cl-cb', source: 'camera-label', target: 'cam-basic' },
		{ id: 'cl-cg', source: 'camera-label', target: 'cam-good' },
		{ id: 'cl-ce', source: 'camera-label', target: 'cam-excel' },
		// Battery connections
		{ id: 'bl-bs', source: 'battery-label', target: 'bat-short' },
		{ id: 'bl-bm', source: 'battery-label', target: 'bat-med' },
		{ id: 'bl-bl', source: 'battery-label', target: 'bat-long' },
		// Screen connections
		{ id: 'sl-ss', source: 'screen-label', target: 'scr-small' },
		{ id: 'sl-sm', source: 'screen-label', target: 'scr-med' },
		{ id: 'sl-sl', source: 'screen-label', target: 'scr-large' }
	]
};

const partWorthSection: ContentSection = {
	id: 'part-worth-utility',
	type: 'diagram',
	title: 'Part-Worth Utility Chart',
	diagram: partWorthDiagram,
	content: `**Part-worth utilities** quantify the value customers assign to each attribute level.

**Reading this chart:**
- Each attribute group shows its relative importance (percentage)
- Within each group, levels have positive or negative utility values
- Higher utility = more preferred by customers
- <span class="formula"><span class="var">U</span><sub>profile</sub> <span class="op">=</span> <span class="op">Σ</span> part-worth utilities of its attribute levels</span>

**Example calculation:**

A phone with Low Price (+0.8) + Excellent Camera (+0.5) + Medium Battery (+0.1) + Medium Screen (+0.1):

<span class="formula"><span class="var">U</span> <span class="op">=</span> 0.8 <span class="op">+</span> 0.5 <span class="op">+</span> 0.1 <span class="op">+</span> 0.1 <span class="op">=</span> <strong>1.5</strong></span>

A phone with High Price (-0.5) + Basic Camera (-0.3) + Long Battery (+0.3) + Large Screen (+0.2):

<span class="formula"><span class="var">U</span> <span class="op">=</span> −0.5 <span class="op">+</span> (−0.3) <span class="op">+</span> 0.3 <span class="op">+</span> 0.2 <span class="op">=</span> <strong>−0.3</strong></span>

The first configuration is strongly preferred because it maximizes the most important attribute (price) and the second-most important (camera).

**Attribute importance** is calculated as:

<span class="formula">Importance<sub><span class="var">i</span></sub> <span class="op">=</span> Range<sub><span class="var">i</span></sub> <span class="op">/</span> <span class="op">Σ</span> Range<sub>all</sub></span>

Price has the widest range (1.3 = 0.8 − (−0.5)), indicating it drives the most variation in customer preference.`
};

// =============================================================================
// Section 4: Why Conjoint Beats Simple Surveys
// =============================================================================

const conjointVsSurveySection: ContentSection = {
	id: 'conjoint-vs-survey',
	type: 'text',
	title: 'Why Conjoint Beats Simple Surveys',
	content: `A direct comparison reveals why conjoint analysis produces better insights than traditional survey questions:

| Aspect | Simple Survey | Conjoint Analysis |
|---|---|---|
| **Question** | "How important is the camera?" | "Would you choose Phone A (great camera, high price) or Phone B (good camera, low price)?" |
| **Response** | Everyone says "very important" | Forces a real trade-off choice |
| **Result** | All attributes seem equally important | Reveals relative importance with precision |
| **Trade-offs** | Not captured | Explicitly measured |
| **Behavior** | Stated preference (what people SAY) | Modeled preference (closer to what people DO) |
| **Insight** | "Customers want everything" | "Price matters 40%, camera 25%, battery 20%" |

**The core problem with simple surveys:** When asked to rate importance on a scale, people tend to rate everything as "important" or "very important." This provides no useful differentiation. A product manager hearing "customers want better camera AND lower price AND longer battery" has no actionable guidance.

**Conjoint forces reality:** By presenting complete product profiles, conjoint analysis forces respondents to make the same trade-offs they face in real purchasing situations. You cannot have the best camera, longest battery, AND lowest price — so which do you sacrifice?

**The result:** Conjoint analysis models actual buying behavior rather than aspirational stated preferences. This makes it far more predictive of market outcomes.`
};

// =============================================================================
// Section 5: Trade-offs and Willingness to Pay
// =============================================================================

const tradeoffsSection: ContentSection = {
	id: 'tradeoffs-willingness-to-pay',
	type: 'text',
	title: 'Trade-offs and Willingness to Pay',
	content: `The true power of conjoint analysis lies in its ability to **quantify trade-offs** — the specific sacrifices customers are willing to make for improvements in other attributes.

**Common trade-off patterns:**

- **Accept smaller battery for lower price** — Budget-conscious customers make this trade-off frequently. Conjoint quantifies exactly how much battery life they will sacrifice for each dollar saved.

- **Pay more for better camera** — Photography enthusiasts are willing to pay a premium, but conjoint reveals the precise price ceiling before they switch to a competitor.

- **Sacrifice design for functionality** — Practical users often prefer utility over aesthetics, but the extent of this trade-off varies dramatically by segment.

**Willingness to Pay (WTP):**

Conjoint analysis can calculate the monetary value customers assign to each attribute improvement. If customers give +0.5 utility to "excellent camera" (vs. +0.1 for "good camera"), and +0.8 utility to "low price" (vs. +0.3 for "mid price"), you can calculate how much more customers would pay for the camera upgrade.

**Why this matters for business:**
- **Pricing decisions:** Know exactly how much premium you can charge for feature upgrades
- **Feature prioritization:** Invest in attributes with the highest utility per development dollar
- **Product line design:** Create configurations that maximize perceived value at each price tier
- **Competitive strategy:** Understand which competitor features are most threatening to your positioning`
};

// =============================================================================
// Section 6: Practical Application
// =============================================================================

const practicalApplicationSection: ContentSection = {
	id: 'practical-application',
	type: 'text',
	title: 'Practical Application',
	content: `Conjoint analysis is used across industries whenever product design, pricing, or feature decisions need customer input:

**Common use cases:**
- **Product launch:** Which combination of features will maximize market adoption?
- **Product redesign:** Which improvements will customers value most?
- **Pricing strategy:** What is the optimal price point for each configuration?
- **Feature prioritization:** Where should the development team invest next?

**Streaming Service Example:**

A streaming platform wants to design its subscription tiers. The conjoint study uses three attributes:

| Attribute | Levels |
|---|---|
| Price | $8/month, $13/month, $18/month |
| Content | Standard, Premium, Exclusive |
| Video Quality | SD, HD, 4K |

**Results might reveal:**
- Price is the dominant factor for 60% of respondents (budget segment)
- Content quality drives decisions for 25% (content enthusiasts)
- Video quality matters primarily to 15% (tech enthusiasts)

**Strategic implication:** Design tiers that match segments:
- **Basic tier** ($8): Standard content, HD quality — serves price-sensitive segment
- **Premium tier** ($13): Premium content, HD quality — serves content enthusiasts
- **Ultimate tier** ($18): Exclusive content, 4K quality — serves tech enthusiasts

Each tier is optimized for its target segment's utility profile, maximizing both customer satisfaction and revenue.`
};

// =============================================================================
// Section 7: Best Practices
// =============================================================================

const bestPracticesSection: ContentSection = {
	id: 'best-practices',
	type: 'text',
	title: 'Best Practices',
	content: `Running an effective conjoint analysis requires careful design and execution. Follow these four key rules:

**Rule 1: Choose only significant attributes**

Include attributes that genuinely matter for customer decisions. Too many attributes (more than 6-7) create respondent fatigue — tired respondents give random answers, producing noisy, unreliable data. Focus on attributes where customers actually make trade-offs.

**Rule 2: Create realistic profiles**

Product profiles must be plausible and achievable. A profile with "best camera, longest battery, lightest weight, AND lowest price" is not realistic and will distort results. Each profile should represent a combination that could actually exist in the market.

**Rule 3: Pretest the survey**

Before full deployment, run a pretest with a small sample. Check that respondents understand the attributes and levels, the choice task is not confusing, and the attribute levels cover the relevant range. Fix any issues before collecting the full dataset.

**Rule 4: Segment the results**

Do not just calculate overall averages — different customer segments may have dramatically different utility profiles. A price-sensitive segment and a quality-seeking segment will show opposite patterns. Combining their results averages out the differences and makes both insights useless.

**Advanced tip:** Combine conjoint analysis with STP for maximum precision. Use STP to identify segments, then run separate conjoint analyses for each segment. This reveals not just what the "average customer" wants, but what each specific segment values — enabling tailored products, pricing, and messaging for each group.`
};

// =============================================================================
// Export Lecture Content
// =============================================================================

export const lectureContent: LectureContent = {
	lectureId: 'conjoint-analysis',
	sections: [
		fromStpSection,
		conjointMethodSection,
		partWorthSection,
		conjointVsSurveySection,
		tradeoffsSection,
		practicalApplicationSection,
		bestPracticesSection
	]
};
