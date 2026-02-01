/**
 * Lecture 4: UGC Deep Dive
 *
 * This lecture covers User-Generated Content metrics and analysis:
 * - UGC in purchase decisions
 * - Negativity bias
 * - UGC metrics dashboard (ratings, chatter, valence)
 * - Product Q&A and fit uncertainty
 * - Virality factors
 * - UGC impact model
 */

import type { LectureContent, ContentSection } from '../types';
import type { DiagramData } from '$lib/components/diagrams';
import type { ExplanationStep } from '$lib/components/animation';

// =============================================================================
// Section 1: UGC in Purchase Decisions
// =============================================================================

const ugcPurchaseDecisionsSection: ContentSection = {
	id: 'ugc-purchase-decisions',
	type: 'text',
	title: 'UGC in Purchase Decisions',
	content: `User-Generated Content plays a critical role in the modern consumer journey. Research consistently shows that UGC is one of the most influential factors in purchase decisions.

**The Numbers:**

- **~90% of consumers** read reviews before making a purchase
- **Q&A sections** are consulted by the majority of online shoppers
- Reviews are often **more trusted** than brand descriptions

**Why UGC Matters:**

UGC reduces purchase uncertainty in ways that firm-generated content cannot:
- **Information asymmetry** - Reviews reveal product realities not in marketing
- **Social proof** - Other buyers validate the purchase decision
- **Context fitting** - Users describe how products fit their specific situations

**Reviews Are Narratives, Not Just Ratings:**

A 4-star rating tells you little. But a review explaining "Great for beginners but advanced users will find it limiting" provides actionable context. The narrative content of reviews often matters more than the numerical score.

**Implications:**
1. Monitor UGC as a strategic information source
2. Analyze text content, not just ratings
3. Understand that UGC shapes expectations and satisfaction
4. Recognize that UGC is always relative to alternatives`
};

// =============================================================================
// Section 2: Negativity Bias - Animated Explanation
// =============================================================================

const negativityBiasSteps: ExplanationStep[] = [
	{
		id: 'neg-1',
		title: 'Positive Signal',
		description:
			'When consumers encounter positive UGC like "Great hotel, wonderful stay!", it registers as a positive signal. However, positive reviews are expected - they confirm what the brand promises. The impact is relatively weak because positivity is the default expectation.',
		diagram: {
			nodes: [
				{ id: 'positive', label: '"Great hotel"', type: 'outcome', x: 210, y: 60 },
				{ id: 'signal', label: 'Weak Positive Signal', type: 'variable', x: 210, y: 140 }
			],
			edges: [{ id: 'p-s', source: 'positive', target: 'signal' }]
		},
		highlights: ['positive'],
		annotations: [{ targetId: 'positive', text: 'Expected, confirms default', position: 'right' }]
	},
	{
		id: 'neg-2',
		title: 'Negative Signal',
		description:
			'When consumers encounter negative UGC like "Room had bedbugs!", it registers as a strong negative signal. Negative reviews are unexpected and threatening. They trigger loss aversion - the psychological tendency to weigh losses more heavily than gains.',
		diagram: {
			nodes: [
				{ id: 'negative', label: '"Room had bedbugs"', type: 'confounder', x: 210, y: 60 },
				{ id: 'signal', label: 'Strong Negative Signal', type: 'confounder', x: 210, y: 140 }
			],
			edges: [{ id: 'n-s', source: 'negative', target: 'signal' }]
		},
		highlights: ['negative', 'signal'],
		annotations: [{ targetId: 'negative', text: 'Unexpected, triggers alarm', position: 'right' }]
	},
	{
		id: 'neg-3',
		title: 'Asymmetric Impact',
		description:
			'The impact is asymmetric: negative content has 2-5x more influence than positive content of equal intensity. One detailed negative review can outweigh multiple positive reviews. This is called negativity bias - a fundamental cognitive bias in human information processing.',
		diagram: {
			nodes: [
				{ id: 'positive', label: 'Positive Review', type: 'outcome', x: 80, y: 60 },
				{ id: 'negative', label: 'Negative Review', type: 'confounder', x: 340, y: 60 },
				{ id: 'impact-pos', label: 'Impact: 1x', type: 'variable', x: 80, y: 140 },
				{ id: 'impact-neg', label: 'Impact: 2-5x', type: 'confounder', x: 340, y: 140 }
			],
			edges: [
				{ id: 'p-ip', source: 'positive', target: 'impact-pos' },
				{ id: 'n-in', source: 'negative', target: 'impact-neg' }
			]
		},
		highlights: ['impact-neg'],
		annotations: [{ targetId: 'impact-neg', text: 'Asymmetric influence', position: 'bottom' }]
	},
	{
		id: 'neg-4',
		title: 'Business Implication',
		description:
			'The business implication is clear: brands must analyze negative content deeply. Negative reviews reveal: critical product issues, service failures, unmet expectations, and competitive vulnerabilities. Addressing negativity is higher ROI than amplifying positivity.',
		diagram: {
			nodes: [
				{ id: 'negative', label: 'Negative UGC', type: 'confounder', x: 210, y: 30 },
				{ id: 'issues', label: 'Product Issues', type: 'variable', x: 80, y: 100 },
				{ id: 'failures', label: 'Service Failures', type: 'variable', x: 180, y: 100 },
				{ id: 'expectations', label: 'Unmet Expectations', type: 'variable', x: 300, y: 100 },
				{ id: 'action', label: 'Strategic Action', type: 'treatment', x: 210, y: 170 }
			],
			edges: [
				{ id: 'n-i', source: 'negative', target: 'issues' },
				{ id: 'n-f', source: 'negative', target: 'failures' },
				{ id: 'n-e', source: 'negative', target: 'expectations' },
				{ id: 'i-a', source: 'issues', target: 'action' },
				{ id: 'f-a', source: 'failures', target: 'action' },
				{ id: 'e-a', source: 'expectations', target: 'action' }
			]
		},
		highlights: ['action'],
		annotations: [{ targetId: 'action', text: 'Fix what negative UGC reveals', position: 'bottom' }]
	}
];

const negativityBiasSection: ContentSection = {
	id: 'negativity-bias',
	type: 'explanation',
	title: 'Negativity Bias',
	explanation: {
		steps: negativityBiasSteps
	}
};

// =============================================================================
// Section 3: UGC Metrics Dashboard - Animated Explanation
// =============================================================================

const ugcMetricsSteps: ExplanationStep[] = [
	{
		id: 'metrics-1',
		title: 'Ratings',
		description:
			'Ratings are numerical scores, typically on a 1-5 star scale. They are easy to aggregate and compare. Average rating, rating distribution, and rating trends are key metrics. However, ratings alone lack context - a 4.0 average could mean consistently good or polarized reviews.',
		diagram: {
			nodes: [{ id: 'ratings', label: 'Ratings (1-5 stars)', type: 'treatment', x: 210, y: 90 }],
			edges: []
		},
		highlights: ['ratings'],
		annotations: [{ targetId: 'ratings', text: 'Numerical, aggregatable', position: 'bottom' }]
	},
	{
		id: 'metrics-2',
		title: 'Chatter',
		description:
			'Chatter is the volume of mentions and discussions. High chatter indicates visibility and mindshare. Tracking chatter over time reveals: product launch reception, viral moments, crisis situations, and seasonal patterns. Chatter can be positive, negative, or neutral.',
		diagram: {
			nodes: [
				{ id: 'ratings', label: 'Ratings', type: 'treatment', x: 130, y: 90 },
				{ id: 'chatter', label: 'Chatter (Volume)', type: 'control', x: 290, y: 90 }
			],
			edges: []
		},
		highlights: ['chatter'],
		annotations: [{ targetId: 'chatter', text: 'Volume of mentions', position: 'bottom' }]
	},
	{
		id: 'metrics-3',
		title: 'Positive Valence',
		description:
			'Positive valence captures praise, satisfaction, and enthusiasm in UGC text. It goes beyond ratings to analyze the emotional tone of content. Positive valence indicators: superlatives, recommendation intent, repeat purchase mentions, emotional enthusiasm.',
		diagram: {
			nodes: [
				{ id: 'ratings', label: 'Ratings', type: 'treatment', x: 80, y: 90 },
				{ id: 'chatter', label: 'Chatter', type: 'control', x: 210, y: 90 },
				{ id: 'pos-valence', label: 'Positive Valence', type: 'outcome', x: 340, y: 90 }
			],
			edges: []
		},
		highlights: ['pos-valence'],
		annotations: [{ targetId: 'pos-valence', text: 'Praise and satisfaction', position: 'bottom' }]
	},
	{
		id: 'metrics-4',
		title: 'Negative Valence',
		description:
			'Negative valence captures complaints, problems, and disappointment. Given negativity bias, this metric requires special attention. Negative valence indicators: complaints, warnings to others, return/refund mentions, comparisons to superior alternatives.',
		diagram: {
			nodes: [
				{ id: 'ratings', label: 'Ratings', type: 'treatment', x: 60, y: 90 },
				{ id: 'chatter', label: 'Chatter', type: 'control', x: 160, y: 90 },
				{ id: 'pos-valence', label: 'Positive Valence', type: 'outcome', x: 260, y: 90 },
				{ id: 'neg-valence', label: 'Negative Valence', type: 'confounder', x: 370, y: 90 }
			],
			edges: []
		},
		highlights: ['neg-valence'],
		annotations: [{ targetId: 'neg-valence', text: 'Complaints and problems', position: 'bottom' }]
	},
	{
		id: 'metrics-5',
		title: 'Combined UGC Dashboard',
		description:
			'A complete UGC dashboard tracks all four metrics together. Ratings provide the headline number. Chatter shows engagement level. Positive/negative valence reveal sentiment composition. Together, they give a comprehensive view of UGC health.',
		diagram: {
			nodes: [
				{ id: 'ugc', label: 'UGC Dashboard', type: 'variable', x: 210, y: 30 },
				{ id: 'ratings', label: 'Ratings', type: 'treatment', x: 60, y: 110 },
				{ id: 'chatter', label: 'Chatter', type: 'control', x: 150, y: 110 },
				{ id: 'pos-valence', label: 'Valence+', type: 'outcome', x: 250, y: 110 },
				{ id: 'neg-valence', label: 'Valence-', type: 'confounder', x: 350, y: 110 }
			],
			edges: [
				{ id: 'u-r', source: 'ugc', target: 'ratings' },
				{ id: 'u-c', source: 'ugc', target: 'chatter' },
				{ id: 'u-p', source: 'ugc', target: 'pos-valence' },
				{ id: 'u-n', source: 'ugc', target: 'neg-valence' }
			]
		},
		highlights: ['ugc', 'ratings', 'chatter', 'pos-valence', 'neg-valence'],
		annotations: [{ targetId: 'ugc', text: 'Four key metrics', position: 'top' }]
	}
];

const ugcMetricsSection: ContentSection = {
	id: 'ugc-metrics-dashboard',
	type: 'explanation',
	title: 'UGC Metrics Dashboard',
	explanation: {
		steps: ugcMetricsSteps
	}
};

// =============================================================================
// Section 4: Product Q&A and Fit Uncertainty - Diagram
// =============================================================================

const fitUncertaintyDiagram: DiagramData = {
	nodes: [
		{ id: 'uncertainty', label: 'Fit Uncertainty', type: 'confounder', x: 50, y: 90 },
		{ id: 'qa', label: 'Q&A Section', type: 'treatment', x: 150, y: 90 },
		{ id: 'reduced', label: 'Reduced Uncertainty', type: 'outcome', x: 250, y: 50 },
		{ id: 'satisfaction', label: 'Higher Satisfaction', type: 'outcome', x: 360, y: 50 },
		{ id: 'fewer-neg', label: 'Fewer Neg Reviews', type: 'outcome', x: 360, y: 130 }
	],
	edges: [
		{ id: 'u-qa', source: 'uncertainty', target: 'qa', label: 'addressed by' },
		{ id: 'qa-r', source: 'qa', target: 'reduced', label: 'creates' },
		{ id: 'r-s', source: 'reduced', target: 'satisfaction', label: 'leads to' },
		{ id: 'r-fn', source: 'reduced', target: 'fewer-neg', label: 'leads to' }
	]
};

const fitUncertaintySection: ContentSection = {
	id: 'fit-uncertainty',
	type: 'diagram',
	title: 'Product Q&A and Fit Uncertainty',
	diagram: fitUncertaintyDiagram,
	content: `**Fit uncertainty** is the consumer's question: "Does this product suit my specific situation?"

Even with detailed product descriptions, consumers often wonder:
- "Will this laptop work for my use case?"
- "Is this dress suitable for my body type?"
- "Will this software integrate with my existing tools?"

**How Q&A Sections Help:**

Product Q&A sections directly address fit uncertainty:
- Consumers ask specific questions about their situations
- Other users (or the brand) provide contextual answers
- This peer-to-peer information is highly trusted

**Research Findings:**

Studies show that robust Q&A sections:
- Increase conversion rates
- Reduce return rates
- Lead to higher post-purchase satisfaction
- Generate fewer negative reviews

**Why It Works:**

Q&A creates **informed purchases**. Consumers who use Q&A have calibrated expectations. When expectations match reality, satisfaction increases. When expectations would not have been met, the Q&A prevents a mismatched purchase.

**For Marketers:**
- Invest in Q&A section quality
- Ensure quick, detailed responses
- Encourage existing customers to answer questions
- Monitor Q&A for recurring concerns`
};

// =============================================================================
// Section 5: Virality Factors - Animated Explanation
// =============================================================================

const viralitySteps: ExplanationStep[] = [
	{
		id: 'viral-1',
		title: 'Social Currency',
		description:
			'Content spreads when sharing improves the sharer\'s social image. People share content that makes them look: knowledgeable, insightful, funny, or connected. Ask: "Does sharing this make people look good?"',
		diagram: {
			nodes: [{ id: 'social', label: 'Social Currency', type: 'treatment', x: 210, y: 90 }],
			edges: []
		},
		highlights: ['social'],
		annotations: [{ targetId: 'social', text: 'Sharing improves social image', position: 'bottom' }]
	},
	{
		id: 'viral-2',
		title: 'Emotional Resonance',
		description:
			'Strong emotions drive sharing. Content that triggers intense emotional responses spreads faster. Both positive emotions (joy, awe, inspiration) and negative emotions (anger, fear, outrage) can drive virality. Neutral content rarely goes viral.',
		diagram: {
			nodes: [
				{ id: 'social', label: 'Social Currency', type: 'treatment', x: 130, y: 90 },
				{ id: 'emotion', label: 'Emotional Resonance', type: 'control', x: 290, y: 90 }
			],
			edges: []
		},
		highlights: ['emotion'],
		annotations: [{ targetId: 'emotion', text: 'Strong emotions drive sharing', position: 'bottom' }]
	},
	{
		id: 'viral-3',
		title: 'Viral Emotions',
		description:
			'Research identifies specific emotions that drive virality: Humor - universally shareable, crosses barriers. Surprise - unexpected twists capture attention. Inspiration - uplifting content people want to spread. Outrage - controversial content triggers defensive sharing.',
		diagram: {
			nodes: [
				{ id: 'emotion', label: 'Emotional Resonance', type: 'control', x: 210, y: 30 },
				{ id: 'humor', label: 'Humor', type: 'variable', x: 80, y: 110 },
				{ id: 'surprise', label: 'Surprise', type: 'variable', x: 160, y: 110 },
				{ id: 'inspiration', label: 'Inspiration', type: 'variable', x: 260, y: 110 },
				{ id: 'outrage', label: 'Outrage', type: 'confounder', x: 350, y: 110 }
			],
			edges: [
				{ id: 'e-h', source: 'emotion', target: 'humor' },
				{ id: 'e-s', source: 'emotion', target: 'surprise' },
				{ id: 'e-i', source: 'emotion', target: 'inspiration' },
				{ id: 'e-o', source: 'emotion', target: 'outrage' }
			]
		},
		highlights: ['humor', 'surprise', 'inspiration', 'outrage'],
		annotations: [{ targetId: 'inspiration', text: 'Positive emotions spread well', position: 'bottom' }]
	},
	{
		id: 'viral-4',
		title: 'Virality Formula',
		description:
			'Virality potential can be conceptualized as: V = Social Currency x Emotional Intensity x Practical Value x Narrative Quality. Content must score high on multiple dimensions to achieve viral spread. Missing any dimension significantly reduces sharing likelihood.',
		diagram: {
			nodes: [
				{ id: 'virality', label: 'Virality Potential', type: 'outcome', x: 210, y: 30 },
				{ id: 'social', label: 'Social Currency', type: 'treatment', x: 60, y: 110 },
				{ id: 'emotion', label: 'Emotion', type: 'control', x: 150, y: 110 },
				{ id: 'practical', label: 'Practical Value', type: 'variable', x: 250, y: 110 },
				{ id: 'narrative', label: 'Narrative', type: 'variable', x: 350, y: 110 }
			],
			edges: [
				{ id: 's-v', source: 'social', target: 'virality' },
				{ id: 'e-v', source: 'emotion', target: 'virality' },
				{ id: 'p-v', source: 'practical', target: 'virality' },
				{ id: 'n-v', source: 'narrative', target: 'virality' }
			]
		},
		highlights: ['virality'],
		annotations: [{ targetId: 'virality', text: 'Multi-factor equation', position: 'top' }]
	}
];

const viralitySection: ContentSection = {
	id: 'virality-factors',
	type: 'explanation',
	title: 'Virality Factors',
	explanation: {
		steps: viralitySteps
	}
};

// =============================================================================
// Section 6: UGC Impact Model - Diagram
// =============================================================================

const ugcImpactDiagram: DiagramData = {
	nodes: [
		{ id: 'ugc-metrics', label: 'UGC Metrics', type: 'treatment', x: 40, y: 90 },
		{ id: 'quality', label: 'Perceived Quality', type: 'variable', x: 130, y: 90 },
		{ id: 'trust', label: 'Trust', type: 'variable', x: 220, y: 90 },
		{ id: 'conversion', label: 'Conversion', type: 'outcome', x: 300, y: 90 },
		{ id: 'sales', label: 'Sales', type: 'outcome', x: 380, y: 90 }
	],
	edges: [
		{ id: 'u-q', source: 'ugc-metrics', target: 'quality', label: 'shapes' },
		{ id: 'q-t', source: 'quality', target: 'trust', label: 'builds' },
		{ id: 't-c', source: 'trust', target: 'conversion', label: 'enables' },
		{ id: 'c-s', source: 'conversion', target: 'sales', label: 'drives' }
	]
};

const ugcImpactSection: ContentSection = {
	id: 'ugc-impact-model',
	type: 'diagram',
	title: 'UGC Impact Model',
	diagram: ugcImpactDiagram,
	content: `UGC creates a causal chain from metrics to revenue.

**The UGC Signal Function:**

\`\`\`
UGC Signal = f(Ratings, Chatter, Valence+, Valence-)
\`\`\`

Each component contributes differently:
- **Ratings**: Headline credibility signal
- **Chatter**: Social proof through volume
- **Positive Valence**: Enthusiasm and recommendation signals
- **Negative Valence**: Risk and warning signals (weighted more heavily)

**How the Chain Works:**

1. **UGC Metrics** → Consumers see ratings, read reviews
2. **Perceived Quality** → UGC shapes expectations about product quality
3. **Trust** → Consistent, authentic UGC builds brand credibility
4. **Conversion** → Trust reduces purchase hesitation
5. **Sales** → Conversions translate to revenue

**Key Insight:**

UGC is not just feedback - it is a critical marketing asset. Every review, rating, and comment either builds or erodes the chain from perception to purchase.

**Strategic Implications:**

1. Treat UGC as a KPI, not just feedback
2. Invest in encouraging quality UGC
3. Respond strategically to negative UGC
4. Use UGC insights to improve product and service
5. Measure UGC impact on conversion and sales`
};

// =============================================================================
// Export Lecture Content
// =============================================================================

export const lectureContent: LectureContent = {
	lectureId: 'ugc-deep-dive',
	sections: [
		ugcPurchaseDecisionsSection,
		negativityBiasSection,
		ugcMetricsSection,
		fitUncertaintySection,
		viralitySection,
		ugcImpactSection
	]
};
