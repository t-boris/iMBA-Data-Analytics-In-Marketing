/**
 * Lecture 3: Types of Content
 *
 * This lecture covers the content type classification framework:
 * - Content ecosystem overview
 * - User-Generated Content (UGC) deep breakdown
 * - Firm-Generated Content (FGC) deep breakdown
 * - AI-Generated Content (AGC) deep breakdown
 * - Content authenticity and trust dynamics
 * - Content analytics framework
 */

import type { LectureContent, ContentSection } from '../types';
import type { DiagramData } from '$lib/components/diagrams';
import type { ExplanationStep } from '$lib/components/animation';

// =============================================================================
// Section 1: Content Ecosystem Overview
// =============================================================================

const ecosystemOverviewSection: ContentSection = {
	id: 'ecosystem-overview',
	type: 'text',
	title: 'Content Ecosystem Overview',
	content: `In the modern digital environment, consumers encounter multiple types of content simultaneously. Understanding how these content types interact is essential for effective marketing strategy.

**A Product Launch Example**

Consider a new smartphone launch. Consumers encounter:
- **User reviews** on Amazon and Best Buy (UGC)
- **Brand social posts** announcing features (FGC)
- **AI-generated product descriptions** on comparison sites (AGC)
- **Community discussions** on Reddit and forums (UGC)
- **Customer support responses** from the brand (FGC)
- **Chatbot recommendations** on retailer sites (AGC)

**Different Trust Dynamics**

Each content type has different trust characteristics:
- **UGC** - Highest perceived authenticity but variable quality
- **FGC** - Controlled quality but known promotional intent
- **AGC** - Scalable and consistent but authenticity concerns

**Different Engagement Patterns**

Users interact with content types differently:
- UGC: High engagement, often sought actively
- FGC: Passive consumption, skeptical evaluation
- AGC: Varies by perceived authenticity

**The Marketing Challenge**

Marketers must:
1. Understand how each content type influences consumers
2. Optimize their own FGC for effectiveness
3. Monitor and respond to UGC
4. Evaluate AGC opportunities and risks
5. Create coherent experiences across content types`
};

// =============================================================================
// Section 2: User-Generated Content (UGC) - Animated Explanation
// =============================================================================

const ugcSteps: ExplanationStep[] = [
	{
		id: 'ugc-1',
		title: 'UGC Definition',
		description:
			'User-Generated Content (UGC) is organic content created by consumers without payment or direction from brands. It represents authentic, unfiltered opinions from real product users. This includes any content where the creator has no commercial relationship with the brand.',
		diagram: {
			nodes: [
				{ id: 'ugc', label: 'User-Generated Content', type: 'treatment', x: 210, y: 90 }
			],
			edges: []
		},
		highlights: ['ugc'],
		annotations: [{ targetId: 'ugc', text: 'Organic content from consumers', position: 'bottom' }]
	},
	{
		id: 'ugc-2',
		title: 'UGC Examples',
		description:
			'UGC takes many forms: product reviews on retail sites, social media posts about experiences, forum discussions and Q&A, unboxing videos and tutorials, photos shared with product hashtags. Any time a consumer creates content about a product or brand without compensation, it is UGC.',
		diagram: {
			nodes: [
				{ id: 'ugc', label: 'User-Generated Content', type: 'treatment', x: 210, y: 40 },
				{ id: 'reviews', label: 'Reviews', type: 'variable', x: 80, y: 120 },
				{ id: 'posts', label: 'Social Posts', type: 'variable', x: 170, y: 120 },
				{ id: 'qa', label: 'Q&A', type: 'variable', x: 250, y: 120 },
				{ id: 'videos', label: 'Videos', type: 'variable', x: 340, y: 120 }
			],
			edges: [
				{ id: 'u-r', source: 'ugc', target: 'reviews' },
				{ id: 'u-p', source: 'ugc', target: 'posts' },
				{ id: 'u-q', source: 'ugc', target: 'qa' },
				{ id: 'u-v', source: 'ugc', target: 'videos' }
			]
		},
		highlights: ['reviews', 'posts', 'qa', 'videos'],
		annotations: [{ targetId: 'reviews', text: 'Amazon, Yelp', position: 'bottom' }]
	},
	{
		id: 'ugc-3',
		title: 'UGC Properties',
		description:
			'UGC has distinctive properties: Authentic - comes from real user experiences. Variable - quality and tone range widely. Unpredictable - brands cannot control what users say. Persistent - content remains visible long-term. These properties create both opportunities and challenges.',
		diagram: {
			nodes: [
				{ id: 'ugc', label: 'User-Generated Content', type: 'treatment', x: 210, y: 40 },
				{ id: 'authentic', label: 'Authentic', type: 'outcome', x: 80, y: 120 },
				{ id: 'variable', label: 'Variable', type: 'confounder', x: 170, y: 120 },
				{ id: 'unpredictable', label: 'Unpredictable', type: 'confounder', x: 270, y: 120 },
				{ id: 'persistent', label: 'Persistent', type: 'variable', x: 370, y: 120 }
			],
			edges: [
				{ id: 'u-a', source: 'ugc', target: 'authentic' },
				{ id: 'u-v', source: 'ugc', target: 'variable' },
				{ id: 'u-un', source: 'ugc', target: 'unpredictable' },
				{ id: 'u-p', source: 'ugc', target: 'persistent' }
			]
		},
		highlights: ['authentic', 'variable', 'unpredictable'],
		annotations: [{ targetId: 'authentic', text: 'Real experiences', position: 'bottom' }]
	},
	{
		id: 'ugc-4',
		title: 'UGC Analytical Value',
		description:
			'For marketers, UGC provides critical signals: Problem detection - what issues customers face. Expectation mapping - what customers expect vs receive. Satisfaction indicators - sentiment about product experience. Competitive insights - how you compare to alternatives. Trend identification - emerging themes and concerns.',
		diagram: {
			nodes: [
				{ id: 'ugc', label: 'User-Generated Content', type: 'treatment', x: 210, y: 30 },
				{ id: 'problems', label: 'Problem Detection', type: 'outcome', x: 80, y: 100 },
				{ id: 'expectations', label: 'Expectation Mapping', type: 'outcome', x: 210, y: 100 },
				{ id: 'satisfaction', label: 'Satisfaction Signals', type: 'outcome', x: 340, y: 100 },
				{ id: 'insights', label: 'Actionable Insights', type: 'outcome', x: 210, y: 170 }
			],
			edges: [
				{ id: 'u-pr', source: 'ugc', target: 'problems' },
				{ id: 'u-ex', source: 'ugc', target: 'expectations' },
				{ id: 'u-sa', source: 'ugc', target: 'satisfaction' },
				{ id: 'pr-i', source: 'problems', target: 'insights' },
				{ id: 'ex-i', source: 'expectations', target: 'insights' },
				{ id: 'sa-i', source: 'satisfaction', target: 'insights' }
			]
		},
		highlights: ['insights'],
		annotations: [{ targetId: 'insights', text: 'Drive product and marketing decisions', position: 'bottom' }]
	}
];

const ugcSection: ContentSection = {
	id: 'ugc-breakdown',
	type: 'explanation',
	title: 'User-Generated Content (UGC)',
	explanation: {
		steps: ugcSteps
	}
};

// =============================================================================
// Section 3: Firm-Generated Content (FGC) - Animated Explanation
// =============================================================================

const fgcSteps: ExplanationStep[] = [
	{
		id: 'fgc-1',
		title: 'FGC Definition',
		description:
			'Firm-Generated Content (FGC) is content created by companies for marketing, communication, or customer service purposes. This includes any brand-authored content across owned and paid media channels. The brand has full control over messaging and presentation.',
		diagram: {
			nodes: [
				{ id: 'fgc', label: 'Firm-Generated Content', type: 'control', x: 210, y: 90 }
			],
			edges: []
		},
		highlights: ['fgc'],
		annotations: [{ targetId: 'fgc', text: 'Brand-created content', position: 'bottom' }]
	},
	{
		id: 'fgc-2',
		title: 'FGC Examples',
		description:
			'FGC spans multiple channels: social media marketing posts, promotional emails and newsletters, customer support responses, product descriptions and documentation, advertising copy, press releases. Any content where the brand is the author counts as FGC.',
		diagram: {
			nodes: [
				{ id: 'fgc', label: 'Firm-Generated Content', type: 'control', x: 210, y: 40 },
				{ id: 'marketing', label: 'Marketing Posts', type: 'variable', x: 80, y: 120 },
				{ id: 'support', label: 'Support Responses', type: 'variable', x: 190, y: 120 },
				{ id: 'promos', label: 'Promotions', type: 'variable', x: 290, y: 120 },
				{ id: 'docs', label: 'Documentation', type: 'variable', x: 390, y: 120 }
			],
			edges: [
				{ id: 'f-m', source: 'fgc', target: 'marketing' },
				{ id: 'f-s', source: 'fgc', target: 'support' },
				{ id: 'f-p', source: 'fgc', target: 'promos' },
				{ id: 'f-d', source: 'fgc', target: 'docs' }
			]
		},
		highlights: ['marketing', 'support', 'promos', 'docs'],
		annotations: [{ targetId: 'support', text: 'Service interactions', position: 'bottom' }]
	},
	{
		id: 'fgc-3',
		title: 'FGC Properties',
		description:
			'FGC has distinct characteristics: Strategic - designed to achieve business objectives. Controlled - brand determines all aspects. Measurable - performance can be tracked precisely. Consistent - maintains brand voice and standards. However, consumers recognize commercial intent.',
		diagram: {
			nodes: [
				{ id: 'fgc', label: 'Firm-Generated Content', type: 'control', x: 210, y: 40 },
				{ id: 'strategic', label: 'Strategic', type: 'treatment', x: 80, y: 120 },
				{ id: 'controlled', label: 'Controlled', type: 'treatment', x: 170, y: 120 },
				{ id: 'measurable', label: 'Measurable', type: 'outcome', x: 270, y: 120 },
				{ id: 'consistent', label: 'Consistent', type: 'treatment', x: 370, y: 120 }
			],
			edges: [
				{ id: 'f-st', source: 'fgc', target: 'strategic' },
				{ id: 'f-co', source: 'fgc', target: 'controlled' },
				{ id: 'f-me', source: 'fgc', target: 'measurable' },
				{ id: 'f-cn', source: 'fgc', target: 'consistent' }
			]
		},
		highlights: ['strategic', 'controlled', 'measurable'],
		annotations: [{ targetId: 'strategic', text: 'Business objectives', position: 'bottom' }]
	},
	{
		id: 'fgc-4',
		title: 'FGC Effectiveness Context',
		description:
			'FGC effectiveness depends heavily on context and receptivity. Consumers who already trust a brand are more receptive to FGC. Timing matters - promotional content performs differently in different contexts. Channel fit is critical - what works on Instagram may not work on LinkedIn.',
		diagram: {
			nodes: [
				{ id: 'fgc', label: 'Firm-Generated Content', type: 'control', x: 210, y: 30 },
				{ id: 'context', label: 'Context', type: 'confounder', x: 80, y: 100 },
				{ id: 'receptivity', label: 'Receptivity', type: 'confounder', x: 210, y: 100 },
				{ id: 'channel', label: 'Channel Fit', type: 'confounder', x: 340, y: 100 },
				{ id: 'effectiveness', label: 'Effectiveness', type: 'outcome', x: 210, y: 170 }
			],
			edges: [
				{ id: 'f-e', source: 'fgc', target: 'effectiveness' },
				{ id: 'c-e', source: 'context', target: 'effectiveness' },
				{ id: 'r-e', source: 'receptivity', target: 'effectiveness' },
				{ id: 'ch-e', source: 'channel', target: 'effectiveness' }
			]
		},
		highlights: ['context', 'receptivity', 'effectiveness'],
		annotations: [{ targetId: 'effectiveness', text: 'Depends on context', position: 'bottom' }]
	}
];

const fgcSection: ContentSection = {
	id: 'fgc-breakdown',
	type: 'explanation',
	title: 'Firm-Generated Content (FGC)',
	explanation: {
		steps: fgcSteps
	}
};

// =============================================================================
// Section 4: AI-Generated Content (AGC) - Animated Explanation
// =============================================================================

const agcSteps: ExplanationStep[] = [
	{
		id: 'agc-1',
		title: 'AGC Definition',
		description:
			'AI-Generated Content (AGC) is text created by generative AI models such as large language models (LLMs). This is a rapidly growing category as AI capabilities advance. AGC can be fully automated or AI-assisted with human oversight.',
		diagram: {
			nodes: [
				{ id: 'agc', label: 'AI-Generated Content', type: 'confounder', x: 210, y: 90 }
			],
			edges: []
		},
		highlights: ['agc'],
		annotations: [{ targetId: 'agc', text: 'Created by generative AI', position: 'bottom' }]
	},
	{
		id: 'agc-2',
		title: 'AGC Examples',
		description:
			'AGC is increasingly common: chatbot responses for customer service, AI-written product descriptions, personalized email content, automated social media posts, AI-assisted ad copy, dynamic website content. Much content you encounter daily may now be AI-generated.',
		diagram: {
			nodes: [
				{ id: 'agc', label: 'AI-Generated Content', type: 'confounder', x: 210, y: 40 },
				{ id: 'chatbots', label: 'Chatbots', type: 'variable', x: 80, y: 120 },
				{ id: 'descriptions', label: 'Descriptions', type: 'variable', x: 170, y: 120 },
				{ id: 'personalized', label: 'Personalized Emails', type: 'variable', x: 290, y: 120 },
				{ id: 'ads', label: 'Ad Copy', type: 'variable', x: 400, y: 120 }
			],
			edges: [
				{ id: 'a-ch', source: 'agc', target: 'chatbots' },
				{ id: 'a-d', source: 'agc', target: 'descriptions' },
				{ id: 'a-p', source: 'agc', target: 'personalized' },
				{ id: 'a-ad', source: 'agc', target: 'ads' }
			]
		},
		highlights: ['chatbots', 'descriptions', 'personalized', 'ads'],
		annotations: [{ targetId: 'chatbots', text: 'Customer service', position: 'bottom' }]
	},
	{
		id: 'agc-3',
		title: 'AGC Properties',
		description:
			'AGC has unique characteristics: Scalable - can produce unlimited content. Fast - generates in seconds. Personalizable - can customize for individuals. Consistent - maintains tone and style. Cost-effective - reduces content production costs. However, may lack genuine creativity and emotional resonance.',
		diagram: {
			nodes: [
				{ id: 'agc', label: 'AI-Generated Content', type: 'confounder', x: 210, y: 40 },
				{ id: 'scalable', label: 'Scalable', type: 'treatment', x: 80, y: 120 },
				{ id: 'fast', label: 'Fast', type: 'treatment', x: 160, y: 120 },
				{ id: 'personalized', label: 'Personalized', type: 'treatment', x: 260, y: 120 },
				{ id: 'cost', label: 'Cost-Effective', type: 'outcome', x: 370, y: 120 }
			],
			edges: [
				{ id: 'a-sc', source: 'agc', target: 'scalable' },
				{ id: 'a-f', source: 'agc', target: 'fast' },
				{ id: 'a-pe', source: 'agc', target: 'personalized' },
				{ id: 'a-co', source: 'agc', target: 'cost' }
			]
		},
		highlights: ['scalable', 'fast', 'personalized'],
		annotations: [{ targetId: 'scalable', text: 'Unlimited volume', position: 'bottom' }]
	},
	{
		id: 'agc-4',
		title: 'AGC Authenticity Challenge',
		description:
			'The central challenge with AGC is perceived authenticity. Research shows that when consumers know content is AI-generated, they rate it as less trustworthy - even if the content quality is identical. This creates a tension between AGC efficiency and consumer trust.',
		diagram: {
			nodes: [
				{ id: 'agc', label: 'AI-Generated Content', type: 'confounder', x: 210, y: 30 },
				{ id: 'disclosure', label: 'AI Disclosure', type: 'variable', x: 80, y: 100 },
				{ id: 'perception', label: 'Perceived Authenticity', type: 'outcome', x: 210, y: 100 },
				{ id: 'trust', label: 'Consumer Trust', type: 'outcome', x: 340, y: 100 },
				{ id: 'tension', label: 'Efficiency vs Trust', type: 'confounder', x: 210, y: 170 }
			],
			edges: [
				{ id: 'a-d', source: 'agc', target: 'disclosure' },
				{ id: 'd-p', source: 'disclosure', target: 'perception', label: 'reduces' },
				{ id: 'p-t', source: 'perception', target: 'trust' },
				{ id: 'a-t', source: 'agc', target: 'tension' },
				{ id: 't-te', source: 'trust', target: 'tension' }
			]
		},
		highlights: ['perception', 'trust', 'tension'],
		annotations: [{ targetId: 'tension', text: 'Core AGC dilemma', position: 'bottom' }]
	}
];

const agcSection: ContentSection = {
	id: 'agc-breakdown',
	type: 'explanation',
	title: 'AI-Generated Content (AGC)',
	explanation: {
		steps: agcSteps
	}
};

// =============================================================================
// Section 5: Content Authenticity (Diagram)
// =============================================================================

const authenticityDiagram: DiagramData = {
	nodes: [
		{ id: 'authenticity', label: 'Content Authenticity', type: 'treatment', x: 60, y: 90 },
		{ id: 'trust', label: 'Perceived Trust', type: 'variable', x: 200, y: 90 },
		{ id: 'engagement', label: 'Engagement', type: 'variable', x: 340, y: 90 },
		{ id: 'conversion', label: 'Conversion', type: 'outcome', x: 480, y: 90 }
	],
	edges: [
		{ id: 'a-t', source: 'authenticity', target: 'trust', label: 'drives' },
		{ id: 't-e', source: 'trust', target: 'engagement', label: 'enables' },
		{ id: 'e-c', source: 'engagement', target: 'conversion', label: 'leads to' }
	]
};

const authenticitySection: ContentSection = {
	id: 'content-authenticity',
	type: 'diagram',
	title: 'Content Authenticity',
	diagram: authenticityDiagram,
	content: `Authenticity is the cornerstone of content effectiveness. The path from content to conversion flows through perceived trust.

**The Authenticity Spectrum:**

| Content Type | Perceived Authenticity | Trust Level |
|--------------|------------------------|-------------|
| UGC | Highest | High (unbiased peer) |
| FGC | Medium | Medium (known commercial) |
| AGC | Lowest (when known) | Variable |

**Why UGC Wins on Authenticity:**
- No commercial relationship with brand
- Represents real user experiences
- Includes both positive and negative feedback
- Written in natural consumer language

**The AGC Paradox:**
AI can generate high-quality content that is often indistinguishable from human writing. Yet when consumers learn content is AI-generated, trust drops significantly - even for identical content. This suggests authenticity is as much about source attribution as content quality.

**Implications for Marketers:**
1. Amplify authentic UGC where possible
2. Ensure FGC provides genuine value, not just promotion
3. Consider disclosure implications for AGC
4. Build authenticity through consistent, honest communication`
};

// =============================================================================
// Section 6: Content Analytics Framework
// =============================================================================

const analyticsFrameworkSection: ContentSection = {
	id: 'analytics-framework',
	type: 'text',
	title: 'Content Analytics Framework',
	content: `To extract value from content analysis, marketers need a structured framework for measurement and attribution.

**Key Measurement Dimensions:**

**1. Engagement Metrics**
- Views, impressions, reach
- Likes, shares, comments
- Time spent, scroll depth
- Click-through rates

**2. Sentiment Metrics**
- Positive/negative/neutral ratio
- Sentiment intensity
- Emotional tone (joy, anger, fear, etc.)
- Sentiment trends over time

**3. Conversion Metrics**
- Content-attributed purchases
- Lead generation
- Sign-ups and registrations
- Download and trial starts

**4. Reach and Amplification**
- Organic vs paid reach
- Share velocity
- Influencer amplification
- Cross-platform spread

**5. ROI Attribution**
- Content production cost
- Revenue attributed to content
- Lifetime value of content-acquired customers
- Content efficiency ratios

**Building an Attribution Model:**

The challenge is connecting content consumption to business outcomes. Consider:
- **First-touch attribution** - Credit to first content touchpoint
- **Last-touch attribution** - Credit to final content before conversion
- **Multi-touch attribution** - Distribute credit across touchpoints
- **Incrementality testing** - Measure causal impact of content

**Metrics That Matter by Content Type:**

| Content Type | Primary Metrics | Secondary Metrics |
|--------------|----------------|-------------------|
| UGC | Sentiment, volume, themes | Share rate, response rate |
| FGC | Engagement, CTR, conversion | Reach, brand lift |
| AGC | Efficiency, personalization lift | Quality scores, trust metrics |

The goal is understanding which content drives value and optimizing the content mix accordingly.`
};

// =============================================================================
// Export Lecture Content
// =============================================================================

export const lectureContent: LectureContent = {
	lectureId: 'types-of-content',
	sections: [
		ecosystemOverviewSection,
		ugcSection,
		fgcSection,
		agcSection,
		authenticitySection,
		analyticsFrameworkSection
	]
};
