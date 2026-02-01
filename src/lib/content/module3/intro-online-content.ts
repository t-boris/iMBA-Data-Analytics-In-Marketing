/**
 * Lecture 1: Introduction to Online Content
 *
 * This lecture covers the fundamentals of online content in marketing:
 * - The rise of unstructured data
 * - Net Promoter Score (NPS) and its limitations
 * - Social listening processes
 * - Content ecosystem: UGC, FGC, AGC
 */

import type { LectureContent, ContentSection } from '../types';
import type { DiagramData } from '$lib/components/diagrams';
import type { ExplanationStep } from '$lib/components/animation';

// =============================================================================
// Section 1: The Rise of Unstructured Data
// =============================================================================

const unstructuredDataSection: ContentSection = {
	id: 'unstructured-data',
	type: 'text',
	title: 'The Rise of Unstructured Data',
	content: `In recent years, an estimated **90% of all data created** has been unstructured. Unlike traditional tabular data with neat rows and columns, unstructured data lacks a fixed schema or organization.

**What is unstructured data?**
- Text: reviews, comments, posts, emails
- Media: images, videos, audio
- Documents: PDFs, presentations, reports

**Why does this matter for marketing?**

Traditional marketing analytics focuses on structured data: transactions, demographics, click streams. But unstructured data - especially text - reveals the *why* behind customer behavior:

- Why did a customer churn?
- What problems are customers experiencing?
- How do customers feel about your brand?

The challenge is that unstructured data requires different analytical approaches. You can't simply sum or average text. This module explores techniques for extracting value from textual content.`
};

// =============================================================================
// Section 2: Structured vs Unstructured Data (Diagram)
// =============================================================================

const structuredVsUnstructuredDiagram: DiagramData = {
	nodes: [
		{ id: 'structured', label: 'Structured Data', type: 'treatment', x: 80, y: 60 },
		{ id: 'unstructured', label: 'Unstructured Data', type: 'control', x: 340, y: 60 },
		{ id: 'what', label: 'WHAT happened', type: 'outcome', x: 80, y: 150 },
		{ id: 'why', label: 'WHY it happened', type: 'outcome', x: 340, y: 150 }
	],
	edges: [
		{ id: 's-what', source: 'structured', target: 'what', label: 'reveals' },
		{ id: 'u-why', source: 'unstructured', target: 'why', label: 'reveals' }
	]
};

const structuredVsUnstructuredSection: ContentSection = {
	id: 'structured-vs-unstructured',
	type: 'diagram',
	title: 'Structured vs Unstructured Data',
	diagram: structuredVsUnstructuredDiagram,
	content: `**Structured data** tells you *what* happened:
- Purchases, transactions, coordinates
- Click rates, conversion metrics
- Demographic attributes

**Unstructured data** reveals *why* it happened:
- Emotions and motivations
- Customer experiences
- Brand perceptions

The most powerful insights come from combining both: using structured data to identify patterns, then using unstructured data to understand the drivers.

**Example:** You observe a spike in customer churn (structured). By analyzing support tickets and reviews (unstructured), you discover the cause: a recent product update broke a popular feature.`
};

// =============================================================================
// Section 3: Net Promoter Score (Animated Explanation)
// =============================================================================

const npsSteps: ExplanationStep[] = [
	{
		id: 'nps-1',
		title: 'The NPS Question',
		description:
			'Net Promoter Score starts with a simple question: "On a scale of 0-10, how likely are you to recommend us to a friend or colleague?" This single question aims to capture overall customer loyalty.',
		diagram: {
			nodes: [
				{ id: 'question', label: 'NPS Question', type: 'treatment', x: 210, y: 60 },
				{ id: 'scale', label: '0-10 Scale', type: 'variable', x: 210, y: 140 }
			],
			edges: [{ id: 'q-s', source: 'question', target: 'scale' }]
		},
		highlights: ['question', 'scale'],
		annotations: [{ targetId: 'question', text: 'Single-question survey', position: 'top' }]
	},
	{
		id: 'nps-2',
		title: 'Customer Categories',
		description:
			'Respondents are categorized based on their score. Promoters (9-10) are loyal enthusiasts. Passives (7-8) are satisfied but unenthusiastic. Detractors (0-6) are unhappy customers who may damage the brand through negative word-of-mouth.',
		diagram: {
			nodes: [
				{ id: 'promoters', label: 'Promoters (9-10)', type: 'treatment', x: 80, y: 60 },
				{ id: 'passives', label: 'Passives (7-8)', type: 'variable', x: 210, y: 60 },
				{ id: 'detractors', label: 'Detractors (0-6)', type: 'control', x: 340, y: 60 }
			],
			edges: []
		},
		highlights: ['promoters', 'passives', 'detractors'],
		annotations: [
			{ targetId: 'promoters', text: 'Loyal enthusiasts', position: 'bottom' },
			{ targetId: 'detractors', text: 'Unhappy customers', position: 'bottom' }
		]
	},
	{
		id: 'nps-3',
		title: 'The NPS Formula',
		description:
			'NPS = % Promoters - % Detractors. The score ranges from -100 (all detractors) to +100 (all promoters). Passives are excluded from the calculation but count in the denominator for percentages.',
		diagram: {
			nodes: [
				{ id: 'promoters', label: '% Promoters', type: 'treatment', x: 80, y: 60 },
				{ id: 'minus', label: '-', type: 'variable', x: 210, y: 60 },
				{ id: 'detractors', label: '% Detractors', type: 'control', x: 340, y: 60 },
				{ id: 'nps', label: 'NPS Score', type: 'outcome', x: 210, y: 140 }
			],
			edges: [
				{ id: 'p-m', source: 'promoters', target: 'minus' },
				{ id: 'd-m', source: 'detractors', target: 'minus' },
				{ id: 'm-n', source: 'minus', target: 'nps' }
			]
		},
		highlights: ['nps'],
		annotations: [{ targetId: 'nps', text: 'Range: -100 to +100', position: 'bottom' }]
	},
	{
		id: 'nps-4',
		title: 'NPS Limitations',
		description:
			'While widely used, NPS has significant limitations: 1) No context - a score tells you satisfaction level but not WHY. 2) Low response rates - typically 10-30%. 3) Cultural bias - scoring norms vary globally. 4) Gaming - employees may manipulate scores. This is why text analytics complements NPS.',
		diagram: {
			nodes: [
				{ id: 'nps', label: 'NPS Score', type: 'outcome', x: 210, y: 40 },
				{ id: 'nocontext', label: 'No Context', type: 'confounder', x: 80, y: 120 },
				{ id: 'lowresponse', label: 'Low Response', type: 'confounder', x: 210, y: 120 },
				{ id: 'bias', label: 'Cultural Bias', type: 'confounder', x: 340, y: 120 },
				{ id: 'text', label: 'Text Analytics', type: 'treatment', x: 210, y: 200 }
			],
			edges: [
				{ id: 'nc-n', source: 'nocontext', target: 'nps', style: 'dashed' },
				{ id: 'lr-n', source: 'lowresponse', target: 'nps', style: 'dashed' },
				{ id: 'b-n', source: 'bias', target: 'nps', style: 'dashed' },
				{ id: 't-n', source: 'text', target: 'nps', label: 'complements' }
			]
		},
		highlights: ['nocontext', 'lowresponse', 'bias', 'text'],
		annotations: [{ targetId: 'text', text: 'Provides the WHY', position: 'bottom' }]
	}
];

const npsSection: ContentSection = {
	id: 'nps-explanation',
	type: 'explanation',
	title: 'Net Promoter Score (NPS)',
	explanation: {
		steps: npsSteps
	}
};

// =============================================================================
// Section 4: Social Listening (Diagram)
// =============================================================================

const socialListeningDiagram: DiagramData = {
	nodes: [
		{ id: 'discussions', label: 'Online Discussions', type: 'treatment', x: 40, y: 90 },
		{ id: 'monitor', label: 'Monitor & Track', type: 'variable', x: 150, y: 90 },
		{ id: 'sentiment', label: 'Analyze Sentiment', type: 'variable', x: 260, y: 90 },
		{ id: 'themes', label: 'Extract Themes', type: 'variable', x: 370, y: 90 },
		{ id: 'insights', label: 'Actionable Insights', type: 'outcome', x: 480, y: 90 }
	],
	edges: [
		{ id: 'd-m', source: 'discussions', target: 'monitor' },
		{ id: 'm-s', source: 'monitor', target: 'sentiment' },
		{ id: 's-t', source: 'sentiment', target: 'themes' },
		{ id: 't-i', source: 'themes', target: 'insights' }
	]
};

const socialListeningSection: ContentSection = {
	id: 'social-listening',
	type: 'diagram',
	title: 'Social Listening',
	diagram: socialListeningDiagram,
	content: `**Social listening** is the process of monitoring online conversations to understand what customers are saying about your brand, products, competitors, and industry.

**The Social Listening Pipeline:**

1. **Monitor & Track** - Collect mentions from social media, forums, review sites, blogs
2. **Analyze Sentiment** - Determine if mentions are positive, negative, or neutral
3. **Extract Themes** - Identify recurring topics and patterns
4. **Actionable Insights** - Convert analysis into business decisions

**Why Social Listening Matters:**
- Proactive issue detection before problems escalate
- Competitive intelligence on market perception
- Product feedback for innovation priorities
- Crisis management through early warning signals

**Example:** A hotel chain discovers through social listening that "slow check-in" appears frequently in negative mentions. They redesign the process, reducing complaints by 40%.`
};

// =============================================================================
// Section 5: Content Ecosystem Triangle (Animated Explanation)
// =============================================================================

const ecosystemSteps: ExplanationStep[] = [
	{
		id: 'eco-1',
		title: 'User-Generated Content (UGC)',
		description:
			'UGC is organic content created by consumers - reviews, comments, social posts, forum discussions, Q&A responses. It is unpaid and uncontrolled by the brand. UGC is typically perceived as most authentic because it comes from real users sharing genuine experiences.',
		diagram: {
			nodes: [{ id: 'ugc', label: 'User-Generated Content', type: 'treatment', x: 210, y: 90 }],
			edges: []
		},
		highlights: ['ugc'],
		annotations: [{ targetId: 'ugc', text: 'Reviews, comments, posts', position: 'bottom' }]
	},
	{
		id: 'eco-2',
		title: 'Firm-Generated Content (FGC)',
		description:
			'FGC is content created by companies - marketing posts, promotional materials, customer support responses, official communications. It is strategic, controlled, and aligned with brand objectives. While less trusted than UGC, FGC allows precise messaging.',
		diagram: {
			nodes: [
				{ id: 'ugc', label: 'User-Generated Content', type: 'treatment', x: 130, y: 60 },
				{ id: 'fgc', label: 'Firm-Generated Content', type: 'control', x: 290, y: 60 }
			],
			edges: []
		},
		highlights: ['fgc'],
		annotations: [{ targetId: 'fgc', text: 'Marketing, support, brand', position: 'bottom' }]
	},
	{
		id: 'eco-3',
		title: 'AI-Generated Content (AGC)',
		description:
			'AGC is content created by AI systems - chatbot responses, AI-written posts, personalized product descriptions, automated emails. It is scalable and fast but raises authenticity concerns. Consumers often perceive AGC as less trustworthy when they know it is machine-generated.',
		diagram: {
			nodes: [
				{ id: 'ugc', label: 'User-Generated Content', type: 'treatment', x: 210, y: 40 },
				{ id: 'fgc', label: 'Firm-Generated Content', type: 'control', x: 100, y: 130 },
				{ id: 'agc', label: 'AI-Generated Content', type: 'confounder', x: 320, y: 130 }
			],
			edges: []
		},
		highlights: ['agc'],
		annotations: [{ targetId: 'agc', text: 'Chatbots, AI posts, personalized', position: 'bottom' }]
	},
	{
		id: 'eco-4',
		title: 'The Mixed Content Environment',
		description:
			'In reality, consumers encounter all three content types simultaneously. A product page might show user reviews (UGC), brand descriptions (FGC), and AI-generated recommendations (AGC). Understanding how these interact and affect trust is crucial for marketing strategy.',
		diagram: {
			nodes: [
				{ id: 'ugc', label: 'User-Generated Content', type: 'treatment', x: 210, y: 30 },
				{ id: 'fgc', label: 'Firm-Generated Content', type: 'control', x: 90, y: 130 },
				{ id: 'agc', label: 'AI-Generated Content', type: 'confounder', x: 330, y: 130 },
				{ id: 'consumer', label: 'Consumer', type: 'outcome', x: 210, y: 200 }
			],
			edges: [
				{ id: 'u-c', source: 'ugc', target: 'consumer' },
				{ id: 'f-c', source: 'fgc', target: 'consumer' },
				{ id: 'a-c', source: 'agc', target: 'consumer' }
			]
		},
		highlights: ['consumer'],
		annotations: [{ targetId: 'consumer', text: 'Evaluates all content types', position: 'bottom' }]
	}
];

const ecosystemSection: ContentSection = {
	id: 'content-ecosystem',
	type: 'explanation',
	title: 'Content Ecosystem Triangle',
	explanation: {
		steps: ecosystemSteps
	}
};

// =============================================================================
// Section 6: Analysis Methods Preview
// =============================================================================

const analysisPreviewSection: ContentSection = {
	id: 'analysis-preview',
	type: 'text',
	title: 'Analysis Methods Preview',
	content: `This module will explore several approaches to analyzing online content:

**Sentiment Analysis**
Automatically determining whether text expresses positive, negative, or neutral sentiment. Used for brand monitoring, product feedback analysis, and customer satisfaction tracking.

**Topic Modeling**
Discovering abstract themes in large text collections. Useful for identifying what customers talk about and emerging concerns.

**Large Language Models (LLMs)**
Advanced AI systems that can understand context, generate text, and perform sophisticated analysis. Enables conversational interfaces and nuanced content understanding.

**Ethical Considerations**
As text analytics becomes more powerful, important concerns arise:
- **Fake reviews** - How to detect and handle inauthentic content
- **Misinformation** - The spread of false information through content
- **Privacy** - Ethical use of consumer-generated data
- **Bias** - Ensuring fair analysis across demographics

The goal is to extract actionable insights from text while maintaining ethical standards and respecting consumer trust.`
};

// =============================================================================
// Export Lecture Content
// =============================================================================

export const lectureContent: LectureContent = {
	lectureId: 'intro-online-content',
	sections: [
		unstructuredDataSection,
		structuredVsUnstructuredSection,
		npsSection,
		socialListeningSection,
		ecosystemSection,
		analysisPreviewSection
	]
};
