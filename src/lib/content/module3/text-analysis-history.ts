/**
 * Lecture 2: Text Analysis - Historical Perspective
 *
 * This lecture covers the evolution of text communication:
 * - Text as a social force
 * - Evolution from oral tradition to digital platforms
 * - User reviews and their economic effects
 * - Digital text risks: misinformation, echo chambers
 * - Qualitative vs quantitative analysis approaches
 */

import type { LectureContent, ContentSection } from '../types';
import type { DiagramData } from '$lib/components/diagrams';
import type { ExplanationStep } from '$lib/components/animation';

// =============================================================================
// Section 1: Text as Social Force
// =============================================================================

const textSocialForceSection: ContentSection = {
	id: 'text-social-force',
	type: 'text',
	title: 'Text as Social Force',
	content: `Text is far more than a passive record of events - it is an active force that shapes society. Throughout history, text has:

**Transmitted Knowledge**
From religious scriptures to scientific papers, text enables knowledge to persist across generations and spread across geographies.

**Coordinated Action**
Political manifestos, corporate memos, and social media posts organize collective behavior at scales impossible through oral communication.

**Influenced Behavior**
Advertising copy, persuasive essays, and online reviews shape decisions from what we buy to what we believe.

**"Text doesn't just reflect society - it shapes it."**

**Examples of Text's Power:**
- The printing of Luther's 95 Theses accelerated the Protestant Reformation
- Harriet Beecher Stowe's "Uncle Tom's Cabin" mobilized abolitionist sentiment
- Corporate earnings reports move billions in stock value
- A viral tweet can destroy or elevate a brand overnight

Understanding text analysis is not just about extracting information - it's about understanding a primary mechanism through which markets and societies operate.`
};

// =============================================================================
// Section 2: Evolution of Text Communication (Animated Explanation)
// =============================================================================

const evolutionSteps: ExplanationStep[] = [
	{
		id: 'evo-1',
		title: 'Oral Tradition',
		description:
			'Before writing, knowledge was transmitted orally through stories, songs, and memorized recitations. This was limited by human memory capacity and prone to distortion as information passed through generations. Knowledge could only spread as fast as people could travel.',
		diagram: {
			nodes: [
				{ id: 'oral', label: 'Oral Tradition', type: 'treatment', x: 210, y: 90 }
			],
			edges: []
		},
		highlights: ['oral'],
		annotations: [{ targetId: 'oral', text: 'Limited by memory, high distortion', position: 'bottom' }]
	},
	{
		id: 'evo-2',
		title: 'Printing Press',
		description:
			'Gutenberg\'s printing press (c. 1440) revolutionized knowledge dissemination. Books became affordable, literacy rates rose, and ideas could spread without distortion. This democratized knowledge and enabled movements like the Protestant Reformation and the Scientific Revolution.',
		diagram: {
			nodes: [
				{ id: 'oral', label: 'Oral Tradition', type: 'variable', x: 130, y: 60 },
				{ id: 'print', label: 'Printing Press', type: 'treatment', x: 290, y: 60 }
			],
			edges: [{ id: 'o-p', source: 'oral', target: 'print', label: 'evolves to' }]
		},
		highlights: ['print'],
		annotations: [{ targetId: 'print', text: 'Democratized knowledge', position: 'bottom' }]
	},
	{
		id: 'evo-3',
		title: 'Computer-Mediated Communication',
		description:
			'Email, forums, and early websites enabled instant text communication at global scale. For the first time, ordinary people could publish to worldwide audiences. This created new forms of discourse: threaded discussions, email chains, and hyperlinked documents.',
		diagram: {
			nodes: [
				{ id: 'oral', label: 'Oral Tradition', type: 'variable', x: 60, y: 60 },
				{ id: 'print', label: 'Printing Press', type: 'variable', x: 210, y: 60 },
				{ id: 'cmc', label: 'Computer-Mediated', type: 'treatment', x: 360, y: 60 }
			],
			edges: [
				{ id: 'o-p', source: 'oral', target: 'print' },
				{ id: 'p-c', source: 'print', target: 'cmc', label: 'evolves to' }
			]
		},
		highlights: ['cmc'],
		annotations: [{ targetId: 'cmc', text: 'Email, forums, global scale', position: 'bottom' }]
	},
	{
		id: 'evo-4',
		title: 'Social Platforms',
		description:
			'Social media platforms transformed text into a real-time, algorithmically-amplified medium. Content can go viral in hours, reaching millions. Algorithms curate what users see, creating filter bubbles. The speed and scale are unprecedented in human history.',
		diagram: {
			nodes: [
				{ id: 'oral', label: 'Oral Tradition', type: 'variable', x: 30, y: 60 },
				{ id: 'print', label: 'Printing Press', type: 'variable', x: 140, y: 60 },
				{ id: 'cmc', label: 'Computer-Mediated', type: 'variable', x: 280, y: 60 },
				{ id: 'social', label: 'Social Platforms', type: 'outcome', x: 420, y: 60 }
			],
			edges: [
				{ id: 'o-p', source: 'oral', target: 'print' },
				{ id: 'p-c', source: 'print', target: 'cmc' },
				{ id: 'c-s', source: 'cmc', target: 'social', label: 'evolves to' }
			]
		},
		highlights: ['social'],
		annotations: [{ targetId: 'social', text: 'Instant, viral, algorithmic', position: 'bottom' }]
	}
];

const evolutionSection: ContentSection = {
	id: 'evolution-timeline',
	type: 'explanation',
	title: 'Evolution of Text Communication',
	explanation: {
		steps: evolutionSteps
	}
};

// =============================================================================
// Section 3: User Reviews Revolution (Diagram)
// =============================================================================

const userReviewsDiagram: DiagramData = {
	nodes: [
		{ id: 'reviews', label: 'User Reviews', type: 'treatment', x: 50, y: 90 },
		{ id: 'proof', label: 'Social Proof', type: 'variable', x: 150, y: 90 },
		{ id: 'uncertainty', label: 'Reduced Uncertainty', type: 'variable', x: 260, y: 90 },
		{ id: 'decision', label: 'Purchase Decision', type: 'outcome', x: 370, y: 90 }
	],
	edges: [
		{ id: 'r-p', source: 'reviews', target: 'proof', label: 'creates' },
		{ id: 'p-u', source: 'proof', target: 'uncertainty', label: 'leads to' },
		{ id: 'u-d', source: 'uncertainty', target: 'decision', label: 'enables' }
	]
};

const userReviewsSection: ContentSection = {
	id: 'user-reviews',
	type: 'diagram',
	title: 'User Reviews Revolution',
	diagram: userReviewsDiagram,
	content: `The rise of online user reviews fundamentally changed consumer behavior and market dynamics.

**The Review Effect Chain:**

1. **User Reviews** - Consumers share experiences online
2. **Social Proof** - Other consumers see peer validation
3. **Reduced Uncertainty** - Buyers feel more confident about quality
4. **Purchase Decision** - Lower perceived risk enables buying

**Economic Impact:**

Research shows that:
- A one-star increase in Yelp ratings leads to 5-9% revenue increase for restaurants
- Products with reviews sell 270% more than products without
- 91% of consumers read online reviews before purchasing

**The Trust Premium:**

User reviews are trusted because they come from "people like me" - not paid marketers. This creates:
- **Authenticity value** - Reviews perceived as unbiased opinions
- **Information value** - Details about real-world product performance
- **Risk reduction** - Validation from others who already purchased

**The Transformation:**

Before reviews, consumers relied on brand advertising and expert recommendations. Now, peer opinions often carry more weight than professional reviews or marketing claims.`
};

// =============================================================================
// Section 4: Digital Text Risks (Animated Explanation)
// =============================================================================

const riskSteps: ExplanationStep[] = [
	{
		id: 'risk-1',
		title: 'Misinformation',
		description:
			'False claims can spread rapidly online, often faster than corrections. In marketing contexts, this includes fake product claims, false health benefits, and misleading competitive information. The viral nature of social platforms amplifies misinformation reach.',
		diagram: {
			nodes: [
				{ id: 'misinfo', label: 'Misinformation', type: 'confounder', x: 210, y: 90 }
			],
			edges: []
		},
		highlights: ['misinfo'],
		annotations: [{ targetId: 'misinfo', text: 'False claims spreading rapidly', position: 'bottom' }]
	},
	{
		id: 'risk-2',
		title: 'Echo Chambers',
		description:
			'Algorithms show users content similar to what they already engage with. This creates "filter bubbles" where people only see perspectives that confirm their existing beliefs. For brands, this means audiences may be more polarized than they appear.',
		diagram: {
			nodes: [
				{ id: 'misinfo', label: 'Misinformation', type: 'confounder', x: 130, y: 60 },
				{ id: 'echo', label: 'Echo Chambers', type: 'confounder', x: 290, y: 60 }
			],
			edges: []
		},
		highlights: ['echo'],
		annotations: [{ targetId: 'echo', text: 'Algorithmic bubble reinforcement', position: 'bottom' }]
	},
	{
		id: 'risk-3',
		title: 'Narrative Manipulation',
		description:
			'Bad actors can strategically frame information to influence perception. This includes astroturfing (fake grassroots campaigns), coordinated inauthentic behavior, and strategic timing of information release. Brands must monitor for both attacks and opportunities.',
		diagram: {
			nodes: [
				{ id: 'misinfo', label: 'Misinformation', type: 'confounder', x: 100, y: 60 },
				{ id: 'echo', label: 'Echo Chambers', type: 'confounder', x: 210, y: 60 },
				{ id: 'narrative', label: 'Narrative Manipulation', type: 'confounder', x: 320, y: 60 }
			],
			edges: []
		},
		highlights: ['narrative'],
		annotations: [{ targetId: 'narrative', text: 'Strategic framing by bad actors', position: 'bottom' }]
	},
	{
		id: 'risk-4',
		title: 'Combined Impact on Brand Perception',
		description:
			'Together, these digital text risks create a challenging environment for brands. False information about products spreads in echo chambers and gets amplified through manipulation. Monitoring and responding to these dynamics is essential for modern marketing.',
		diagram: {
			nodes: [
				{ id: 'misinfo', label: 'Misinformation', type: 'confounder', x: 100, y: 40 },
				{ id: 'echo', label: 'Echo Chambers', type: 'confounder', x: 210, y: 40 },
				{ id: 'narrative', label: 'Narrative Manipulation', type: 'confounder', x: 320, y: 40 },
				{ id: 'brand', label: 'Brand Perception', type: 'outcome', x: 210, y: 130 }
			],
			edges: [
				{ id: 'm-b', source: 'misinfo', target: 'brand' },
				{ id: 'e-b', source: 'echo', target: 'brand' },
				{ id: 'n-b', source: 'narrative', target: 'brand' }
			]
		},
		highlights: ['brand'],
		annotations: [{ targetId: 'brand', text: 'All risks affect perception', position: 'bottom' }]
	}
];

const risksSection: ContentSection = {
	id: 'digital-risks',
	type: 'explanation',
	title: 'Digital Text Risks',
	explanation: {
		steps: riskSteps
	}
};

// =============================================================================
// Section 5: Qualitative vs Quantitative Analysis
// =============================================================================

const analysisApproachesSection: ContentSection = {
	id: 'analysis-approaches',
	type: 'text',
	title: 'Qualitative vs Quantitative Analysis',
	content: `Analyzing text content can follow qualitative or quantitative approaches - each with strengths for different purposes.

**Qualitative Approaches**

**Netnography**
Qualitative observation of online communities. Researchers immerse themselves in forums, social media groups, and review sites to understand cultural meanings and consumer practices. Rich insights but labor-intensive and hard to scale.

*Best for: Deep understanding of consumer culture, discovering unexpected themes, exploring new markets*

**Quantitative Approaches**

**Sentiment Analysis**
Automated measurement of text tone - positive, negative, neutral. Can process millions of texts quickly. Provides numeric metrics but may miss context and nuance.

*Best for: Brand monitoring at scale, tracking sentiment trends over time, competitive benchmarking*

**Topic Modeling**
Algorithmic extraction of themes from large text collections. Discovers what topics are discussed and their prevalence. Useful for organizing unstructured feedback.

*Best for: Understanding discussion themes, organizing feedback categories, identifying emerging issues*

**Large Language Models (LLMs)**
Advanced AI that understands context and can generate human-like text. Can perform sophisticated analysis including summarization, classification, and question answering.

*Best for: Nuanced analysis, handling complex queries, generating insights from unstructured data*

**The Hybrid Approach**

The most effective text analytics combines approaches:
1. **Quantitative** for scale - process large volumes
2. **Qualitative** for depth - understand context
3. **LLMs** for synthesis - bridge quantity and quality

This module will explore all three approaches and when to apply each.`
};

// =============================================================================
// Export Lecture Content
// =============================================================================

export const lectureContent: LectureContent = {
	lectureId: 'text-analysis-history',
	sections: [
		textSocialForceSection,
		evolutionSection,
		userReviewsSection,
		risksSection,
		analysisApproachesSection
	]
};
