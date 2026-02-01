/**
 * Lecture 7: Online Content Emerging Concerns
 *
 * This lecture covers content integrity challenges:
 * - Content authenticity in digital environment
 * - Fake reviews lifecycle and detection
 * - Misinformation impact on consumer behavior
 * - Corrective communication strategies
 * - Content moderation economics
 */

import type { LectureContent, ContentSection } from '../types';
import type { DiagramData } from '$lib/components/diagrams';
import type { ExplanationStep } from '$lib/components/animation';

// =============================================================================
// Section 1: Content Authenticity Challenge
// =============================================================================

const authenticitySection: ContentSection = {
	id: 'authenticity-challenge',
	type: 'text',
	title: 'Content Authenticity Challenge',
	content: `The digital environment is saturated with reviews, recommendations, comparisons, and testimonials. But how much of this content reflects genuine experiences versus coordinated manipulation?

**The Core Problem:**

Content influences critical business outcomes:
- **Purchase decisions** - Reviews drive conversion rates
- **Willingness to pay** - Perceived quality affects price tolerance
- **Brand reputation** - Aggregate sentiment shapes brand equity

When content is manipulated, these signals become unreliable.

**Types of Content Manipulation:**

| Type | Method | Detection Difficulty |
|------|--------|---------------------|
| Fake Reviews | Purchased or incentivized | Moderate |
| Review Bombing | Coordinated negative attacks | Easy (pattern) |
| Astroturfing | Fake grassroots campaigns | Difficult |
| Misinformation | False claims spread organically | Very Difficult |

**Why It Matters for Analysts:**

Data from reviews and social media is a key input for marketing analytics. If that data is corrupted by manipulation, models built on it will produce misleading insights.

**Key Insight:**
Content analytics must include content quality assessment - not just sentiment analysis, but authenticity verification.`
};

// =============================================================================
// Section 2: Fake Reviews Lifecycle - Animated Explanation
// =============================================================================

const fakeReviewSteps: ExplanationStep[] = [
	{
		id: 'fake-1',
		title: 'Fake Review Created',
		description:
			'Fake reviews are created through purchase (paid review services), incentives (free products for positive reviews), or coordination (brand employees or partners). These reviews typically feature generic praise, perfect ratings, and lack specific product details.',
		diagram: {
			nodes: [
				{ id: 'fake', label: 'Fake Review Created', type: 'confounder', x: 210, y: 90 }
			],
			edges: []
		},
		highlights: ['fake'],
		annotations: [{ targetId: 'fake', text: 'Purchased or coordinated', position: 'bottom' }]
	},
	{
		id: 'fake-2',
		title: 'Short-term Sales Boost',
		description:
			'In the short term, fake positive reviews create a halo effect. Higher ratings attract more clicks, better search ranking, and increased conversion. Products with manipulated 5-star ratings can see 20-30% conversion lifts temporarily.',
		diagram: {
			nodes: [
				{ id: 'fake', label: 'Fake Reviews', type: 'confounder', x: 130, y: 90 },
				{ id: 'boost', label: 'Sales Boost', type: 'outcome', x: 290, y: 90 }
			],
			edges: [{ id: 'f-b', source: 'fake', target: 'boost', label: 'short-term' }]
		},
		highlights: ['boost'],
		annotations: [{ targetId: 'boost', text: '+20-30% conversion', position: 'bottom' }]
	},
	{
		id: 'fake-3',
		title: 'Manipulation Stops',
		description:
			'Fake review campaigns are expensive and risky (platform detection, legal issues). When the campaign ends, real customers start purchasing based on inflated expectations. Their authentic experiences will differ from fake promises.',
		diagram: {
			nodes: [
				{ id: 'fake', label: 'Fake Reviews', type: 'confounder', x: 80, y: 90 },
				{ id: 'boost', label: 'Sales Boost', type: 'outcome', x: 210, y: 90 },
				{ id: 'stop', label: 'Campaign Ends', type: 'variable', x: 340, y: 90 }
			],
			edges: [
				{ id: 'f-b', source: 'fake', target: 'boost' },
				{ id: 'b-s', source: 'boost', target: 'stop', label: 'eventually' }
			]
		},
		highlights: ['stop'],
		annotations: [{ targetId: 'stop', text: 'Real customers arrive', position: 'bottom' }]
	},
	{
		id: 'fake-4',
		title: 'Ratings Drop',
		description:
			'Real customers, encountering products that do not match inflated expectations, leave negative reviews. For genuinely low-quality products, this correction is severe. Average ratings drop, sometimes below where they would have been without manipulation.',
		diagram: {
			nodes: [
				{ id: 'real', label: 'Real Customers', type: 'treatment', x: 80, y: 90 },
				{ id: 'mismatch', label: 'Expectation Mismatch', type: 'confounder', x: 210, y: 90 },
				{ id: 'drop', label: 'Ratings Drop', type: 'confounder', x: 340, y: 90 }
			],
			edges: [
				{ id: 'r-m', source: 'real', target: 'mismatch', label: 'experience' },
				{ id: 'm-d', source: 'mismatch', target: 'drop', label: 'negative reviews' }
			]
		},
		highlights: ['drop'],
		annotations: [{ targetId: 'drop', text: 'Below natural baseline', position: 'bottom' }]
	},
	{
		id: 'fake-5',
		title: 'Long-term Model',
		description:
			'The full cycle shows why fake reviews backfire for low-quality products: short-term gains are followed by long-term reputation damage. Only products that can genuinely satisfy customers benefit from initial visibility boosts.',
		diagram: {
			nodes: [
				{ id: 'fake', label: 'Fake Reviews', type: 'confounder', x: 60, y: 90 },
				{ id: 'boost', label: 'Short Boost', type: 'outcome', x: 160, y: 90 },
				{ id: 'real', label: 'Real Experience', type: 'treatment', x: 260, y: 90 },
				{ id: 'drop', label: 'Long-term Drop', type: 'confounder', x: 360, y: 90 }
			],
			edges: [
				{ id: 'f-b', source: 'fake', target: 'boost' },
				{ id: 'b-r', source: 'boost', target: 'real' },
				{ id: 'r-d', source: 'real', target: 'drop' }
			]
		},
		highlights: ['fake', 'drop'],
		annotations: [{ targetId: 'drop', text: 'Net negative for poor products', position: 'bottom' }]
	}
];

const fakeReviewSection: ContentSection = {
	id: 'fake-reviews-lifecycle',
	type: 'explanation',
	title: 'Fake Reviews Lifecycle',
	explanation: {
		steps: fakeReviewSteps
	}
};

// =============================================================================
// Section 3: Detecting Suspicious Reviews
// =============================================================================

const detectingSection: ContentSection = {
	id: 'detecting-suspicious',
	type: 'text',
	title: 'Detecting Suspicious Reviews',
	content: `Platforms and researchers have developed methods to identify potentially fake reviews. While no method is perfect, combining signals improves detection accuracy.

**Linguistic Signals:**

- **Generic language** - Lacks specific product details
- **Superlative overuse** - "Best ever!", "Amazing!", "Perfect!"
- **First-person emphasis** - "I absolutely love..." (mimics authenticity)
- **Short length** - Fake reviews often lack depth
- **Grammar patterns** - Non-native patterns in domestic markets

**Behavioral Signals:**

- **Publication timing** - Spikes of reviews in short windows
- **Reviewer history** - Single-review accounts, all 5-star ratings
- **Rating distribution** - Bimodal (1s and 5s) suggests manipulation
- **Purchase verification** - Unverified purchases are higher risk

**Network Signals:**

- **Reviewer clusters** - Groups that review the same products
- **IP/device patterns** - Multiple reviews from same source
- **Copy-paste content** - Identical or near-identical text across reviews

**For Analysts:**

When building models on review data:
1. Filter for verified purchases when possible
2. Check for rating distribution anomalies
3. Consider weighting by reviewer credibility
4. Be skeptical of perfect 5.0 averages with few reviews

**Key Insight:**
Data quality assessment should precede data analysis. Garbage in = garbage out.`
};

// =============================================================================
// Section 4: Misinformation Impact - Animated Explanation
// =============================================================================

const misinfoSteps: ExplanationStep[] = [
	{
		id: 'misinfo-1',
		title: 'False Claims Spread',
		description:
			'Misinformation about products can spread through social media, forums, messaging apps, or even mainstream media. Unlike fake reviews (which inflate), misinformation typically deflates - spreading false concerns about safety, quality, or ethics.',
		diagram: {
			nodes: [
				{ id: 'false', label: 'False Claims', type: 'confounder', x: 210, y: 90 }
			],
			edges: []
		},
		highlights: ['false'],
		annotations: [{ targetId: 'false', text: 'Spreads via social networks', position: 'bottom' }]
	},
	{
		id: 'misinfo-2',
		title: 'Perceived Risk Increases',
		description:
			'When consumers encounter negative claims about a product - whether true or false - their perceived risk of purchase increases. Even if consumers do not fully believe the claims, uncertainty creates hesitation.',
		diagram: {
			nodes: [
				{ id: 'false', label: 'False Claims', type: 'confounder', x: 130, y: 90 },
				{ id: 'risk', label: 'Perceived Risk', type: 'confounder', x: 290, y: 90 }
			],
			edges: [{ id: 'f-r', source: 'false', target: 'risk', label: 'increases' }]
		},
		highlights: ['risk'],
		annotations: [{ targetId: 'risk', text: 'Uncertainty = hesitation', position: 'bottom' }]
	},
	{
		id: 'misinfo-3',
		title: 'Willingness to Pay Decreases',
		description:
			'Higher perceived risk leads directly to lower willingness to pay. Consumers demand a "risk discount" - if they buy at all, they expect a lower price to compensate for uncertainty.',
		diagram: {
			nodes: [
				{ id: 'risk', label: 'Perceived Risk', type: 'confounder', x: 130, y: 90 },
				{ id: 'wtp', label: 'WTP Decreases', type: 'outcome', x: 290, y: 90 }
			],
			edges: [{ id: 'r-w', source: 'risk', target: 'wtp', label: 'causes' }]
		},
		highlights: ['wtp'],
		annotations: [{ targetId: 'wtp', text: 'Risk discount demanded', position: 'bottom' }]
	},
	{
		id: 'misinfo-4',
		title: 'Demand Falls',
		description:
			'Lower WTP translates to lower demand. Some consumers switch to competitors. Others delay purchase. The brand loses both immediate sales and long-term customer relationships that would have developed.',
		diagram: {
			nodes: [
				{ id: 'wtp', label: 'Lower WTP', type: 'outcome', x: 130, y: 90 },
				{ id: 'demand', label: 'Demand Falls', type: 'confounder', x: 290, y: 90 }
			],
			edges: [{ id: 'w-d', source: 'wtp', target: 'demand', label: 'reduces' }]
		},
		highlights: ['demand'],
		annotations: [{ targetId: 'demand', text: 'Sales and relationships lost', position: 'bottom' }]
	},
	{
		id: 'misinfo-5',
		title: 'Complete Impact Chain',
		description:
			'The full misinformation impact model: False claims → Increased perceived risk → Decreased willingness to pay → Reduced demand. Each step compounds, and recovery requires proactive correction.',
		diagram: {
			nodes: [
				{ id: 'false', label: 'Misinformation', type: 'confounder', x: 50, y: 90 },
				{ id: 'risk', label: 'Risk', type: 'confounder', x: 140, y: 90 },
				{ id: 'wtp', label: 'WTP', type: 'outcome', x: 230, y: 90 },
				{ id: 'demand', label: 'Demand', type: 'confounder', x: 320, y: 90 }
			],
			edges: [
				{ id: 'f-r', source: 'false', target: 'risk', label: '↑' },
				{ id: 'r-w', source: 'risk', target: 'wtp', label: '↓' },
				{ id: 'w-d', source: 'wtp', target: 'demand', label: '↓' }
			]
		},
		highlights: ['false', 'demand'],
		annotations: [{ targetId: 'demand', text: 'Cascading negative effects', position: 'bottom' }]
	}
];

const misinfoSection: ContentSection = {
	id: 'misinformation-impact',
	type: 'explanation',
	title: 'Misinformation Impact',
	explanation: {
		steps: misinfoSteps
	}
};

// =============================================================================
// Section 5: Corrective Communication - Diagram
// =============================================================================

const correctiveDiagram: DiagramData = {
	nodes: [
		{ id: 'misinfo', label: 'Misinformation', type: 'confounder', x: 50, y: 90 },
		{ id: 'response', label: 'Brand Response', type: 'treatment', x: 150, y: 90 },
		{ id: 'quick', label: 'Quick Response', type: 'variable', x: 250, y: 40 },
		{ id: 'data', label: 'Transparent Data', type: 'variable', x: 250, y: 90 },
		{ id: 'facts', label: 'Verifiable Facts', type: 'variable', x: 250, y: 140 },
		{ id: 'recovery', label: 'Trust Recovery', type: 'outcome', x: 360, y: 90 }
	],
	edges: [
		{ id: 'm-r', source: 'misinfo', target: 'response', label: 'triggers' },
		{ id: 'r-q', source: 'response', target: 'quick' },
		{ id: 'r-d', source: 'response', target: 'data' },
		{ id: 'r-f', source: 'response', target: 'facts' },
		{ id: 'q-rec', source: 'quick', target: 'recovery' },
		{ id: 'd-rec', source: 'data', target: 'recovery' },
		{ id: 'f-rec', source: 'facts', target: 'recovery' }
	]
};

const correctiveSection: ContentSection = {
	id: 'corrective-communication',
	type: 'diagram',
	title: 'Corrective Communication',
	diagram: correctiveDiagram,
	content: `When misinformation spreads, brands must respond strategically. Research shows that effective correction requires multiple elements working together.

**Response Strategy Components:**

**1. Quick Response**
- Speed matters - misinformation gains momentum
- First 24-48 hours are critical
- Delayed response allows false narrative to solidify

**2. Transparent Data**
- Share verifiable evidence (test results, certifications, audits)
- Third-party validation increases credibility
- Data should be accessible and easy to understand

**3. Verifiable Facts**
- Provide specific, checkable claims
- Link to authoritative sources
- Avoid vague reassurances ("We take quality seriously")

**What Does NOT Work:**

- Aggressive denial without evidence
- Attacking the messenger
- Ignoring and hoping it goes away
- Overclaiming ("100% safe" when nuance exists)

**Key Insight:**
Trust recovery is slower than trust destruction. Prevention (monitoring) is more efficient than correction (crisis response).`
};

// =============================================================================
// Section 6: Content Moderation Economics - Animated Explanation
// =============================================================================

const moderationSteps: ExplanationStep[] = [
	{
		id: 'mod-1',
		title: 'Ad-Supported Platforms',
		description:
			'Platforms funded by advertising (Facebook, YouTube, TikTok) have a core incentive: maximize user time and engagement. More content = more ad impressions. This creates a bias toward allowing more content, even borderline content.',
		diagram: {
			nodes: [
				{ id: 'ad', label: 'Ad-Supported', type: 'treatment', x: 130, y: 90 },
				{ id: 'incentive', label: 'More Content/Time', type: 'outcome', x: 290, y: 90 }
			],
			edges: [{ id: 'a-i', source: 'ad', target: 'incentive', label: 'incentivizes' }]
		},
		highlights: ['incentive'],
		annotations: [{ targetId: 'incentive', text: 'Content volume > quality', position: 'bottom' }]
	},
	{
		id: 'mod-2',
		title: 'Subscription Platforms',
		description:
			'Platforms funded by subscriptions (Netflix, Spotify, NYT) have different incentives: retain subscribers through quality experience. This creates bias toward stricter moderation - users pay for a curated, trustworthy environment.',
		diagram: {
			nodes: [
				{ id: 'sub', label: 'Subscription', type: 'control', x: 130, y: 90 },
				{ id: 'incentive', label: 'Quality Environment', type: 'outcome', x: 290, y: 90 }
			],
			edges: [{ id: 's-i', source: 'sub', target: 'incentive', label: 'incentivizes' }]
		},
		highlights: ['incentive'],
		annotations: [{ targetId: 'incentive', text: 'Quality > volume', position: 'bottom' }]
	},
	{
		id: 'mod-3',
		title: 'Moderation Bias',
		description:
			'Automated moderation (AI classifiers) introduces systematic biases. Algorithms trained on historical decisions may: over-remove minority viewpoints, miss sophisticated manipulation, fail on novel content types, or apply rules inconsistently.',
		diagram: {
			nodes: [
				{ id: 'algo', label: 'Algorithm', type: 'variable', x: 130, y: 90 },
				{ id: 'bias', label: 'Moderation Bias', type: 'confounder', x: 290, y: 90 }
			],
			edges: [{ id: 'a-b', source: 'algo', target: 'bias', label: 'produces' }]
		},
		highlights: ['bias'],
		annotations: [{ targetId: 'bias', text: 'Systematic errors', position: 'bottom' }]
	},
	{
		id: 'mod-4',
		title: 'Platform Differences',
		description:
			'Different platforms = different moderation = different content quality. Data from Twitter differs from LinkedIn which differs from Reddit. Analysts must understand platform-specific content biases.',
		diagram: {
			nodes: [
				{ id: 'platform', label: 'Platform', type: 'treatment', x: 80, y: 90 },
				{ id: 'moderation', label: 'Moderation Rules', type: 'variable', x: 210, y: 90 },
				{ id: 'content', label: 'Content Quality', type: 'outcome', x: 340, y: 90 }
			],
			edges: [
				{ id: 'p-m', source: 'platform', target: 'moderation', label: 'determines' },
				{ id: 'm-c', source: 'moderation', target: 'content', label: 'shapes' }
			]
		},
		highlights: ['platform', 'content'],
		annotations: [{ targetId: 'content', text: 'Platform-specific bias', position: 'bottom' }]
	},
	{
		id: 'mod-5',
		title: 'Analyst Insight',
		description:
			'For data analysts: social data is not raw truth. It is signal + noise + platform bias. Always ask: What moderation rules shaped this dataset? What content was removed? What voices are systematically amplified or suppressed?',
		diagram: {
			nodes: [
				{ id: 'data', label: 'Social Data', type: 'treatment', x: 60, y: 90 },
				{ id: 'signal', label: 'Signal', type: 'outcome', x: 160, y: 60 },
				{ id: 'noise', label: 'Noise', type: 'confounder', x: 160, y: 120 },
				{ id: 'platform', label: 'Platform Bias', type: 'confounder', x: 280, y: 90 },
				{ id: 'insight', label: 'Insight', type: 'variable', x: 380, y: 90 }
			],
			edges: [
				{ id: 'd-s', source: 'data', target: 'signal' },
				{ id: 'd-n', source: 'data', target: 'noise' },
				{ id: 's-p', source: 'signal', target: 'platform' },
				{ id: 'n-p', source: 'noise', target: 'platform' },
				{ id: 'p-i', source: 'platform', target: 'insight' }
			]
		},
		highlights: ['platform'],
		annotations: [{ targetId: 'platform', text: 'Data ≠ Truth', position: 'bottom' }]
	}
];

const moderationSection: ContentSection = {
	id: 'moderation-economics',
	type: 'explanation',
	title: 'Content Moderation Economics',
	explanation: {
		steps: moderationSteps
	}
};

// =============================================================================
// Export Lecture Content
// =============================================================================

export const lectureContent: LectureContent = {
	lectureId: 'emerging-concerns',
	sections: [
		authenticitySection,
		fakeReviewSection,
		detectingSection,
		misinfoSection,
		correctiveSection,
		moderationSection
	]
};
