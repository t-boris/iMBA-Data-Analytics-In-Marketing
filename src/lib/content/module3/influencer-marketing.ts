/**
 * Lecture 8: Influencer Marketing Introduction
 *
 * This lecture covers influencer marketing fundamentals:
 * - Influencer role in digital ecosystem
 * - Tier classification (mega to nano)
 * - Engagement rate metrics
 * - Monetization models
 * - Effectiveness factors
 * - Live stream commerce
 * - AI/Virtual influencers
 */

import type { LectureContent, ContentSection } from '../types';
import type { DiagramData } from '$lib/components/diagrams';
import type { ExplanationStep } from '$lib/components/animation';

// =============================================================================
// Section 1: Influencer Role
// =============================================================================

const influencerRoleSection: ContentSection = {
	id: 'influencer-role',
	type: 'text',
	title: 'The Influencer Role',
	content: `Influencers occupy a unique position in the digital content ecosystem. They are neither traditional celebrities nor anonymous consumers - they are trusted intermediaries who amplify and shape brand messages.

**What Makes an Influencer:**

- **Credibility** - Established expertise or authenticity in a domain
- **Rapport** - Personal connection with their audience
- **Perceived expertise** - Audience believes they know what they are talking about
- **Content creation** - Ability to create engaging, shareable content

**Key Insight:**

> "An influencer is a channel of TRUST, not just reach."

Reach (follower count) is easy to measure but often misleading. What matters is whether the audience trusts the influencer's recommendations enough to act on them.

**Why Influencers Work:**

1. **Para-social relationships** - Followers feel they "know" the influencer
2. **Native content** - Recommendations feel organic, not like ads
3. **Social proof** - "If they use it, maybe I should too"
4. **Aspirational identification** - Followers want to be like the influencer

**Business Value:**

Influencer marketing spending has grown from $1.7B (2016) to over $16B (2022). Brands invest because influencer content often outperforms traditional advertising on engagement and conversion metrics.`
};

// =============================================================================
// Section 2: Influencer Tier Pyramid - Animated Explanation
// =============================================================================

const tierSteps: ExplanationStep[] = [
	{
		id: 'tier-1',
		title: 'Mega-Influencers',
		description:
			'Mega-influencers have millions of followers - celebrities, athletes, major content creators. They offer massive reach but at high cost ($10K-$1M+ per post). Their connection to followers is often weaker because audience is too large for personal engagement.',
		diagram: {
			nodes: [
				{ id: 'mega', label: 'Mega (1M+)', type: 'treatment', x: 210, y: 90 }
			],
			edges: []
		},
		highlights: ['mega'],
		annotations: [{ targetId: 'mega', text: 'Huge reach, high cost, weak connection', position: 'bottom' }]
	},
	{
		id: 'tier-2',
		title: 'Macro-Influencers',
		description:
			'Macro-influencers have 100K-1M followers. They are often niche experts or rising stars. They offer strong reach within specific categories and can still maintain meaningful audience engagement. Pricing: $1K-$10K per post.',
		diagram: {
			nodes: [
				{ id: 'mega', label: 'Mega (1M+)', type: 'treatment', x: 210, y: 50 },
				{ id: 'macro', label: 'Macro (100K-1M)', type: 'control', x: 210, y: 120 }
			],
			edges: []
		},
		highlights: ['macro'],
		annotations: [{ targetId: 'macro', text: 'Niche expertise, strong reach', position: 'bottom' }]
	},
	{
		id: 'tier-3',
		title: 'Micro-Influencers',
		description:
			'Micro-influencers have 10K-100K followers. They typically have high engagement rates because they can still interact with followers personally. Their recommendations feel more authentic. Often the best ROI tier for conversions. Pricing: $100-$1K per post.',
		diagram: {
			nodes: [
				{ id: 'mega', label: 'Mega (1M+)', type: 'treatment', x: 210, y: 40 },
				{ id: 'macro', label: 'Macro (100K-1M)', type: 'control', x: 210, y: 90 },
				{ id: 'micro', label: 'Micro (10K-100K)', type: 'outcome', x: 210, y: 140 }
			],
			edges: []
		},
		highlights: ['micro'],
		annotations: [{ targetId: 'micro', text: 'High engagement, high trust', position: 'bottom' }]
	},
	{
		id: 'tier-4',
		title: 'Nano-Influencers',
		description:
			'Nano-influencers have under 10K followers. They have the highest engagement rates - often 5-8% vs 1-2% for mega-influencers. They represent local or hyper-niche influence. Often work for free products rather than cash. Authentic word-of-mouth at scale.',
		diagram: {
			nodes: [
				{ id: 'mega', label: 'Mega (1M+)', type: 'treatment', x: 210, y: 30 },
				{ id: 'macro', label: 'Macro (100K-1M)', type: 'control', x: 210, y: 70 },
				{ id: 'micro', label: 'Micro (10K-100K)', type: 'outcome', x: 210, y: 110 },
				{ id: 'nano', label: 'Nano (<10K)', type: 'variable', x: 210, y: 150 }
			],
			edges: []
		},
		highlights: ['nano'],
		annotations: [{ targetId: 'nano', text: 'Highest engagement, local influence', position: 'bottom' }]
	},
	{
		id: 'tier-5',
		title: 'The Pyramid Pattern',
		description:
			'The influencer ecosystem forms a pyramid: few mega-influencers at top, millions of nano-influencers at bottom. Engagement rate is inversely correlated with follower count. Choosing the right tier depends on campaign goals: awareness (top) vs conversion (bottom).',
		diagram: {
			nodes: [
				{ id: 'mega', label: 'Mega', type: 'treatment', x: 210, y: 30 },
				{ id: 'macro', label: 'Macro', type: 'control', x: 210, y: 70 },
				{ id: 'micro', label: 'Micro', type: 'outcome', x: 210, y: 110 },
				{ id: 'nano', label: 'Nano', type: 'variable', x: 210, y: 150 },
				{ id: 'reach', label: 'Reach', type: 'treatment', x: 80, y: 30 },
				{ id: 'engage', label: 'Engagement', type: 'outcome', x: 340, y: 150 }
			],
			edges: [
				{ id: 'r-m', source: 'reach', target: 'mega', label: 'high' },
				{ id: 'e-n', source: 'nano', target: 'engage', label: 'high' }
			]
		},
		highlights: ['mega', 'nano', 'reach', 'engage'],
		annotations: [{ targetId: 'engage', text: 'Inverse correlation', position: 'right' }]
	}
];

const tierSection: ContentSection = {
	id: 'influencer-tiers',
	type: 'explanation',
	title: 'Influencer Tier Pyramid',
	explanation: {
		steps: tierSteps
	}
};

// =============================================================================
// Section 3: Engagement Rate - Diagram
// =============================================================================

const engagementDiagram: DiagramData = {
	nodes: [
		{ id: 'likes', label: 'Likes', type: 'treatment', x: 50, y: 50 },
		{ id: 'comments', label: 'Comments', type: 'control', x: 50, y: 90 },
		{ id: 'shares', label: 'Shares', type: 'variable', x: 50, y: 130 },
		{ id: 'sum', label: 'Sum', type: 'variable', x: 150, y: 90 },
		{ id: 'followers', label: 'Followers', type: 'treatment', x: 250, y: 90 },
		{ id: 'rate', label: 'Engagement Rate', type: 'outcome', x: 360, y: 90 }
	],
	edges: [
		{ id: 'l-s', source: 'likes', target: 'sum' },
		{ id: 'c-s', source: 'comments', target: 'sum' },
		{ id: 'sh-s', source: 'shares', target: 'sum' },
		{ id: 's-r', source: 'sum', target: 'rate', label: '÷' },
		{ id: 'f-r', source: 'followers', target: 'rate' }
	]
};

const engagementSection: ContentSection = {
	id: 'engagement-rate',
	type: 'diagram',
	title: 'Engagement Rate',
	diagram: engagementDiagram,
	content: `**Engagement Rate** is the key metric for evaluating influencer effectiveness beyond raw follower counts.

**The Formula:**

\`\`\`
Engagement Rate = (Likes + Comments + Shares) / Followers
\`\`\`

**Typical Benchmarks:**

| Tier | Typical Engagement Rate |
|------|------------------------|
| Mega (1M+) | 1-2% |
| Macro (100K-1M) | 2-3% |
| Micro (10K-100K) | 3-5% |
| Nano (<10K) | 5-8%+ |

**Why Smaller = Higher Engagement:**

1. **Personal connection** - Nano-influencers can reply to comments
2. **Niche relevance** - Followers self-selected for interest
3. **Authenticity perception** - Feels less commercial
4. **Algorithm boost** - Platforms may favor engaged communities

**Key Insight:**

> "Trust density matters more than audience size."

A nano-influencer with 5,000 highly engaged followers who trust their recommendations may drive more conversions than a mega-influencer with 5 million passive followers.

**For Campaign Planning:**

- **Awareness goals** → Prioritize reach (larger influencers)
- **Conversion goals** → Prioritize engagement (smaller influencers)
- **Best practice** → Mix of tiers for both reach and trust`
};

// =============================================================================
// Section 4: Monetization Models
// =============================================================================

const monetizationSection: ContentSection = {
	id: 'monetization-models',
	type: 'text',
	title: 'Influencer Monetization Models',
	content: `Influencers monetize their audience through several distinct business models. Understanding these models helps brands choose the right partnership structure.

**1. Affiliate Marketing**

- Influencer shares unique tracking link
- Earns commission on each sale (typically 5-30%)
- Performance-based: influencer only earns if audience converts
- Best for: Products with clear purchase path, price-sensitive influencers

**2. Sponsored Posts**

- Fixed fee for creating and sharing branded content
- Pricing varies by tier, platform, and content type
- Brand controls messaging (with disclosure requirements)
- Best for: Awareness campaigns, new product launches

**3. Brand Ambassadorship**

- Long-term partnership (months to years)
- Influencer represents brand across multiple touchpoints
- Often includes exclusivity clauses
- Best for: Building authentic brand association, lifestyle brands

**4. Direct Product Sales**

- Influencer sells own products/services
- Courses, coaching, merchandise, digital products
- Highest margin but requires product development
- Best for: Expert influencers with loyal audience

**Partnership Selection Matrix:**

| Model | Brand Control | Performance Link | Authenticity |
|-------|--------------|------------------|--------------|
| Affiliate | Low | Direct | High |
| Sponsored | High | Indirect | Medium |
| Ambassador | Medium | Long-term | High |
| Direct Sales | N/A | N/A | Highest |

**Key Insight:**
The best model depends on campaign objectives. Affiliate for direct response, sponsored for reach, ambassador for brand building.`
};

// =============================================================================
// Section 5: Effectiveness Factors - Animated Explanation
// =============================================================================

const effectivenessSteps: ExplanationStep[] = [
	{
		id: 'effect-1',
		title: 'Influencer Originality',
		description:
			'Influencers who maintain a unique, consistent style generate higher engagement. Original content stands out in crowded feeds. When an influencer\'s voice is distinctive, followers pay more attention - including to sponsored content.',
		diagram: {
			nodes: [
				{ id: 'originality', label: 'Originality', type: 'treatment', x: 130, y: 90 },
				{ id: 'impact', label: 'Higher Impact', type: 'outcome', x: 290, y: 90 }
			],
			edges: [{ id: 'o-i', source: 'originality', target: 'impact', label: 'increases' }]
		},
		highlights: ['originality'],
		annotations: [{ targetId: 'originality', text: 'Unique style = attention', position: 'bottom' }]
	},
	{
		id: 'effect-2',
		title: 'Sponsor Salience',
		description:
			'When sponsorship is too visible or feels forced, trust decreases. The "ad feel" triggers consumer skepticism. Effective influencer content integrates brand mentions naturally. Required disclosures should be present but not overwhelming.',
		diagram: {
			nodes: [
				{ id: 'salience', label: 'High Sponsor Salience', type: 'confounder', x: 130, y: 90 },
				{ id: 'trust', label: 'Lower Trust', type: 'confounder', x: 290, y: 90 }
			],
			edges: [{ id: 's-t', source: 'salience', target: 'trust', label: 'reduces' }]
		},
		highlights: ['salience', 'trust'],
		annotations: [{ targetId: 'salience', text: 'Too visible = skepticism', position: 'bottom' }]
	},
	{
		id: 'effect-3',
		title: 'Brand-Influencer Fit',
		description:
			'Alignment between brand and influencer matters enormously. When a fitness influencer promotes athletic wear, it feels natural. When they promote unrelated products, credibility suffers. Fit = believability = conversion.',
		diagram: {
			nodes: [
				{ id: 'fit', label: 'Brand-Influencer Fit', type: 'treatment', x: 130, y: 90 },
				{ id: 'conversion', label: 'Higher Conversion', type: 'outcome', x: 290, y: 90 }
			],
			edges: [{ id: 'f-c', source: 'fit', target: 'conversion', label: 'enables' }]
		},
		highlights: ['fit'],
		annotations: [{ targetId: 'fit', text: 'Alignment = credibility', position: 'bottom' }]
	},
	{
		id: 'effect-4',
		title: 'Inverted U-Curve',
		description:
			'There is an optimal posting frequency for sponsored content. Too little: missed opportunity. Too much: audience fatigue and trust erosion. Research shows an inverted U relationship - effectiveness peaks at moderate frequency then declines.',
		diagram: {
			nodes: [
				{ id: 'low', label: 'Low Frequency', type: 'variable', x: 60, y: 90 },
				{ id: 'optimal', label: 'Optimal', type: 'outcome', x: 180, y: 50 },
				{ id: 'high', label: 'High Frequency', type: 'confounder', x: 300, y: 90 },
				{ id: 'fatigue', label: 'Audience Fatigue', type: 'confounder', x: 380, y: 90 }
			],
			edges: [
				{ id: 'l-o', source: 'low', target: 'optimal', label: '↑' },
				{ id: 'o-h', source: 'optimal', target: 'high', label: '↓' },
				{ id: 'h-f', source: 'high', target: 'fatigue', label: 'causes' }
			]
		},
		highlights: ['optimal', 'fatigue'],
		annotations: [{ targetId: 'optimal', text: 'Sweet spot exists', position: 'top' }]
	}
];

const effectivenessSection: ContentSection = {
	id: 'effectiveness-factors',
	type: 'explanation',
	title: 'Effectiveness Factors',
	explanation: {
		steps: effectivenessSteps
	}
};

// =============================================================================
// Section 6: Live Stream Commerce - Diagram
// =============================================================================

const livestreamDiagram: DiagramData = {
	nodes: [
		{ id: 'demo', label: 'Live Demo', type: 'treatment', x: 50, y: 90 },
		{ id: 'qa', label: 'Real-time Q&A', type: 'control', x: 150, y: 90 },
		{ id: 'urgency', label: 'Urgency', type: 'variable', x: 250, y: 90 },
		{ id: 'purchase', label: 'Instant Purchase', type: 'outcome', x: 360, y: 90 }
	],
	edges: [
		{ id: 'd-q', source: 'demo', target: 'qa', label: 'enables' },
		{ id: 'q-u', source: 'qa', target: 'urgency', label: 'creates' },
		{ id: 'u-p', source: 'urgency', target: 'purchase', label: 'drives' }
	]
};

const livestreamSection: ContentSection = {
	id: 'live-stream-commerce',
	type: 'diagram',
	title: 'Live Stream Commerce',
	diagram: livestreamDiagram,
	content: `**Live stream commerce** combines influencer marketing with real-time shopping - a format pioneered in China and now spreading globally.

**The Live Commerce Experience:**

1. **Live Demo** - Influencer shows product in real-time, demonstrates features
2. **Real-time Q&A** - Viewers ask questions, get immediate answers
3. **Urgency** - Limited-time offers, "only 50 left" countdowns
4. **Instant Purchase** - Buy button integrated directly in stream

**Impact Statistics:**

- **+107% revenue growth** for sellers using livestream (vs. non-livestream)
- Average conversion rates 10x higher than traditional e-commerce
- Viewers spend 2-3x more time compared to static product pages

**Why Live Commerce Works:**

- **Reduced uncertainty** - See product in action, ask questions
- **Entertainment value** - Shopping becomes content
- **Social proof** - See others buying in real-time
- **FOMO** - Limited offers create purchase urgency

**Cross-Channel Amplification:**

Live streams generate content that extends beyond the event:
- Clips shared on social media
- Highlights compiled for those who missed live
- Comments/reactions create additional UGC
- Creates anticipation for next stream

**Key Insight:**
Live commerce collapses the funnel - awareness, consideration, and purchase happen in a single session.`
};

// =============================================================================
// Section 7: AI Influencers
// =============================================================================

const aiInfluencerSection: ContentSection = {
	id: 'ai-influencers',
	type: 'text',
	title: 'AI and Virtual Influencers',
	content: `A new category of influencer has emerged: virtual characters that exist only in digital form, created and managed by studios or AI systems.

**What Are Virtual Influencers?**

- Computer-generated characters with human-like appearances
- Managed by creative teams or increasingly by AI
- Have backstories, personalities, and social media presence
- Example: Lil Miquela (3M+ Instagram followers), Lu do Magalu (Brazil)

**Advantages for Brands:**

| Advantage | Explanation |
|-----------|-------------|
| Full Control | No personal scandals, always on-brand |
| Scalability | Can "appear" in multiple places simultaneously |
| Consistency | Never tired, never off-message |
| Cost | No ongoing talent fees (after creation) |
| Creativity | Can do impossible things (fly, teleport, etc.) |

**Challenges and Risks:**

- **Authenticity questions** - Can a fake person give authentic recommendations?
- **Uncanny valley** - Some find CGI characters unsettling
- **Disclosure requirements** - Must consumers be told they are not real?
- **Limited relatability** - Cannot share genuine personal experiences

**Consumer Response:**

Research shows mixed reactions:
- **Gen Z** more accepting of virtual influencers
- **Older consumers** often find them inauthentic
- **Product category matters** - Fashion/beauty vs. healthcare/finance
- **Transparency helps** - Audiences appreciate honesty about virtual nature

**The Future:**

As AI improves, virtual influencers will become:
- More realistic and harder to distinguish
- More personalized (AI-generated content for each viewer)
- More interactive (AI conversations, not just posts)

**Key Insight:**
Virtual influencers test the limits of authenticity. Their success depends on whether audiences value the content itself over the "realness" of its source.`
};

// =============================================================================
// Export Lecture Content
// =============================================================================

export const lectureContent: LectureContent = {
	lectureId: 'influencer-marketing',
	sections: [
		influencerRoleSection,
		tierSection,
		engagementSection,
		monetizationSection,
		effectivenessSection,
		livestreamSection,
		aiInfluencerSection
	]
};
