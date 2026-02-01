/**
 * Lecture 6: AGC Deep Dive
 *
 * This lecture covers AI-Generated Content and LLM architecture:
 * - AGC paradox (more content, less engagement)
 * - Perceived authenticity problem
 * - How LLMs work (simplified transformer explanation)
 * - Attention mechanism
 * - Impact on communities (Q&A, freelance markets)
 * - AGC strategic position (pros, cons, solutions)
 */

import type { LectureContent, ContentSection } from '../types';
import type { DiagramData } from '$lib/components/diagrams';
import type { ExplanationStep } from '$lib/components/animation';

// =============================================================================
// Section 1: AGC Paradox
// =============================================================================

const agcParadoxSection: ContentSection = {
	id: 'agc-paradox',
	type: 'text',
	title: 'The AGC Paradox',
	content: `AI-Generated Content creates a fascinating paradox: more content, but less connection.

**What AI Assistance Enables:**

With AI writing assistance, content creators produce:
- **More posts** - higher volume output
- **Longer content** - expanded word counts
- **Better structure** - cleaner organization
- **Faster turnaround** - reduced time to publish

This seems like a pure win for content marketing.

**The Engagement Problem:**

Yet research shows AI-assisted content often receives:
- **Fewer comments** - less discussion generated
- **Lower engagement** - reduced likes, shares, reactions
- **Less community interaction** - fewer follow-up conversations

**The Paradox:**

> More Content does NOT equal More Interaction

**Why This Happens:**

AI-generated content often lacks:
- **Personal signal** - what makes the author unique
- **Authentic voice** - genuine personality and perspective
- **Emotional resonance** - feelings that connect with readers
- **Imperfection** - the human touches that build connection

**The Implication:**

Brands cannot simply scale content with AI and expect engagement to scale proportionally. The human element that drives connection may be diminished even as volume increases.`
};

// =============================================================================
// Section 2: Perceived Authenticity Problem - Animated Explanation
// =============================================================================

const authenticitySteps: ExplanationStep[] = [
	{
		id: 'auth-1',
		title: 'AI Text Characteristics',
		description:
			'AI-generated text has distinctive characteristics that can signal inauthenticity. These include: formal and polished language, predictable structure, generic examples, lack of personal anecdotes, and consistent tone throughout. While these traits can indicate quality, they may also signal "not human."',
		diagram: {
			nodes: [
				{ id: 'ai-text', label: 'AI Text', type: 'confounder', x: 210, y: 30 },
				{ id: 'formal', label: 'Formal', type: 'variable', x: 80, y: 100 },
				{ id: 'predictable', label: 'Predictable', type: 'variable', x: 170, y: 100 },
				{ id: 'generic', label: 'Generic', type: 'variable', x: 260, y: 100 },
				{ id: 'consistent', label: 'Consistent', type: 'variable', x: 350, y: 100 }
			],
			edges: [
				{ id: 'a-f', source: 'ai-text', target: 'formal' },
				{ id: 'a-p', source: 'ai-text', target: 'predictable' },
				{ id: 'a-g', source: 'ai-text', target: 'generic' },
				{ id: 'a-c', source: 'ai-text', target: 'consistent' }
			]
		},
		highlights: ['ai-text'],
		annotations: [{ targetId: 'ai-text', text: 'Signals that may indicate AI origin', position: 'top' }]
	},
	{
		id: 'auth-2',
		title: 'Human Text Characteristics',
		description:
			'Human-written text tends to include: first-person narratives, personal experiences, emotional variability, unique perspectives, and authentic imperfections. These signals create a sense of genuine authorship that readers trust.',
		diagram: {
			nodes: [
				{ id: 'human-text', label: 'Human Text', type: 'treatment', x: 210, y: 30 },
				{ id: 'first-person', label: 'First-Person', type: 'variable', x: 70, y: 100 },
				{ id: 'experience', label: 'Personal Experience', type: 'variable', x: 180, y: 100 },
				{ id: 'emotional', label: 'Emotional', type: 'variable', x: 300, y: 100 },
				{ id: 'unique', label: 'Unique Voice', type: 'variable', x: 400, y: 100 }
			],
			edges: [
				{ id: 'h-fp', source: 'human-text', target: 'first-person' },
				{ id: 'h-e', source: 'human-text', target: 'experience' },
				{ id: 'h-em', source: 'human-text', target: 'emotional' },
				{ id: 'h-u', source: 'human-text', target: 'unique' }
			]
		},
		highlights: ['human-text'],
		annotations: [{ targetId: 'human-text', text: 'Signals that indicate human authorship', position: 'top' }]
	},
	{
		id: 'auth-3',
		title: 'Perceived Authenticity',
		description:
			'When readers evaluate content, they form perceptions about authenticity. AI text often scores lower on perceived authenticity because it lacks personal signals. Importantly, this perception matters even when content quality is identical.',
		diagram: {
			nodes: [
				{ id: 'ai-text', label: 'AI Text', type: 'confounder', x: 120, y: 40 },
				{ id: 'human-text', label: 'Human Text', type: 'treatment', x: 300, y: 40 },
				{ id: 'ai-auth', label: 'Lower Authenticity', type: 'confounder', x: 120, y: 130 },
				{ id: 'human-auth', label: 'Higher Authenticity', type: 'outcome', x: 300, y: 130 }
			],
			edges: [
				{ id: 'a-aa', source: 'ai-text', target: 'ai-auth' },
				{ id: 'h-ha', source: 'human-text', target: 'human-auth' }
			]
		},
		highlights: ['ai-auth', 'human-auth'],
		annotations: [{ targetId: 'ai-auth', text: 'Perception gap', position: 'bottom' }]
	},
	{
		id: 'auth-4',
		title: 'Engagement Impact',
		description:
			'The authenticity gap leads to an engagement gap. AI-generated content, when perceived as such, loses engagement even if the content quality is high. This creates a strategic challenge: how to use AI for efficiency while maintaining authentic engagement.',
		diagram: {
			nodes: [
				{ id: 'ai-content', label: 'AI Content', type: 'confounder', x: 80, y: 40 },
				{ id: 'low-auth', label: 'Low Authenticity', type: 'confounder', x: 210, y: 40 },
				{ id: 'low-engage', label: 'Low Engagement', type: 'confounder', x: 350, y: 40 },
				{ id: 'insight', label: 'AI loses engagement without customization', type: 'variable', x: 210, y: 130 }
			],
			edges: [
				{ id: 'a-la', source: 'ai-content', target: 'low-auth', label: 'perceived' },
				{ id: 'la-le', source: 'low-auth', target: 'low-engage', label: 'causes' }
			]
		},
		highlights: ['insight'],
		annotations: [{ targetId: 'insight', text: 'Customization is essential', position: 'bottom' }]
	}
];

const authenticitySection: ContentSection = {
	id: 'perceived-authenticity',
	type: 'explanation',
	title: 'Perceived Authenticity Problem',
	explanation: {
		steps: authenticitySteps
	}
};

// =============================================================================
// Section 3: How LLMs Work - Animated Explanation
// =============================================================================

const llmSteps: ExplanationStep[] = [
	{
		id: 'llm-1',
		title: 'Training Data',
		description:
			'Large Language Models are trained on massive text corpora - billions of words from books, websites, articles, and more. This training data represents the breadth of human written expression. The model learns patterns from this enormous dataset.',
		diagram: {
			nodes: [
				{ id: 'data', label: 'Training Data', type: 'treatment', x: 210, y: 60 },
				{ id: 'books', label: 'Books', type: 'variable', x: 90, y: 140 },
				{ id: 'web', label: 'Websites', type: 'variable', x: 170, y: 140 },
				{ id: 'articles', label: 'Articles', type: 'variable', x: 260, y: 140 },
				{ id: 'more', label: 'More...', type: 'variable', x: 340, y: 140 }
			],
			edges: [
				{ id: 'd-b', source: 'data', target: 'books' },
				{ id: 'd-w', source: 'data', target: 'web' },
				{ id: 'd-a', source: 'data', target: 'articles' },
				{ id: 'd-m', source: 'data', target: 'more' }
			]
		},
		highlights: ['data'],
		annotations: [{ targetId: 'data', text: 'Billions of words', position: 'top' }]
	},
	{
		id: 'llm-2',
		title: 'Pattern Learning',
		description:
			'During training, the model learns probabilistic patterns: what words tend to follow what other words, what structures are common, what styles exist. The model does not memorize text - it learns statistical relationships between words and concepts.',
		diagram: {
			nodes: [
				{ id: 'data', label: 'Training Data', type: 'treatment', x: 90, y: 90 },
				{ id: 'patterns', label: 'Pattern Learning', type: 'control', x: 280, y: 90 },
				{ id: 'prob', label: 'Probabilistic Word Patterns', type: 'variable', x: 280, y: 160 }
			],
			edges: [
				{ id: 'd-p', source: 'data', target: 'patterns', label: 'feeds' },
				{ id: 'p-pr', source: 'patterns', target: 'prob' }
			]
		},
		highlights: ['patterns'],
		annotations: [{ targetId: 'patterns', text: 'Statistical relationships', position: 'top' }]
	},
	{
		id: 'llm-3',
		title: 'Next Token Prediction',
		description:
			'At its core, an LLM predicts the next word (token) given previous context. When you provide a prompt, the model calculates probabilities for what should come next. It selects a token, adds it to the context, and repeats. Generation is sequential prediction.',
		diagram: {
			nodes: [
				{ id: 'context', label: 'Context (Prompt)', type: 'treatment', x: 80, y: 90 },
				{ id: 'prediction', label: 'Next Token Prediction', type: 'control', x: 250, y: 90 },
				{ id: 'output', label: 'Generated Text', type: 'outcome', x: 400, y: 90 }
			],
			edges: [
				{ id: 'c-p', source: 'context', target: 'prediction', label: 'input' },
				{ id: 'p-o', source: 'prediction', target: 'output', label: 'generates' },
				{ id: 'o-c', source: 'output', target: 'context', label: 'extends', style: 'dashed' }
			]
		},
		highlights: ['prediction'],
		annotations: [{ targetId: 'prediction', text: 'Predict continuation', position: 'top' }]
	},
	{
		id: 'llm-4',
		title: 'Key Insight',
		description:
			'LLMs predict, they do not "understand" in the human sense. They are extremely sophisticated pattern matchers that produce statistically likely continuations. This is why AI can write fluent text that lacks genuine insight - it generates what sounds right based on training patterns.',
		diagram: {
			nodes: [
				{ id: 'insight', label: 'LLMs predict, not understand', type: 'outcome', x: 210, y: 40 },
				{ id: 'pattern', label: 'Pattern Matching', type: 'control', x: 120, y: 120 },
				{ id: 'stats', label: 'Statistical Likelihood', type: 'variable', x: 300, y: 120 },
				{ id: 'implication', label: 'Fluent but not insightful', type: 'confounder', x: 210, y: 180 }
			],
			edges: [
				{ id: 'p-i', source: 'pattern', target: 'insight' },
				{ id: 's-i', source: 'stats', target: 'insight' },
				{ id: 'i-im', source: 'insight', target: 'implication' }
			]
		},
		highlights: ['insight', 'implication'],
		annotations: [{ targetId: 'insight', text: 'Fundamental limitation', position: 'top' }]
	}
];

const llmSection: ContentSection = {
	id: 'how-llms-work',
	type: 'explanation',
	title: 'How LLMs Work',
	explanation: {
		steps: llmSteps
	}
};

// =============================================================================
// Section 4: Attention Mechanism - Diagram
// =============================================================================

const attentionDiagram: DiagramData = {
	nodes: [
		{ id: 'input', label: 'Input Tokens', type: 'treatment', x: 50, y: 90 },
		{ id: 'attention', label: 'Attention Layer', type: 'control', x: 155, y: 90 },
		{ id: 'context', label: 'Context Understanding', type: 'variable', x: 270, y: 90 },
		{ id: 'output', label: 'Output', type: 'outcome', x: 380, y: 90 }
	],
	edges: [
		{ id: 'i-a', source: 'input', target: 'attention', label: 'all words' },
		{ id: 'a-c', source: 'attention', target: 'context', label: 'weighs importance' },
		{ id: 'c-o', source: 'context', target: 'output', label: 'generates' }
	]
};

const attentionSection: ContentSection = {
	id: 'attention-mechanism',
	type: 'diagram',
	title: 'Attention Mechanism',
	diagram: attentionDiagram,
	content: `The **attention mechanism** is the breakthrough that makes modern LLMs possible.

**What Attention Does:**

Unlike older models that processed words one at a time (left to right), attention allows the model to consider all words simultaneously and determine which are most relevant to each other.

**How It Works:**

1. **Input Tokens** - Text is broken into tokens (roughly words/subwords)
2. **Attention Layer** - Each token "attends to" every other token
3. **Context Understanding** - The model weighs which words matter for understanding each word
4. **Output** - Informed by full bidirectional context

**The Key Innovation:**

> Bidirectional context (unlike older models)

Previous models like RNNs processed text sequentially - they could only see what came before. Transformers with attention can see the entire context at once, understanding how words at the beginning relate to words at the end.

**Example:**

In "The bank by the river was flooded":
- Attention helps the model understand "bank" means riverbank, not financial bank
- It considers "river" and "flooded" when interpreting "bank"
- Full context disambiguates meaning

**Why This Matters for AGC:**

Attention enables LLMs to generate coherent, contextually appropriate text at scale - the foundation of all modern AI-generated content.`
};

// =============================================================================
// Section 5: Impact on Communities
// =============================================================================

const communityImpactSection: ContentSection = {
	id: 'impact-on-communities',
	type: 'text',
	title: 'Impact on Communities',
	content: `The rise of AGC has measurable impacts on online communities and labor markets.

**Post-ChatGPT Effects on Q&A Communities:**

Research documents significant changes after ChatGPT's release:
- **Drop in Q&A activity** - Fewer questions being asked
- **Expert participation decline** - Top contributors reducing involvement
- **Answer quality concerns** - AI-generated answers flooding platforms
- **Trust erosion** - Users unsure if answers are AI or human

**Impact on Technical Forums:**

Stack Overflow and similar programming communities experienced:
- Reduced question volume
- Concerns about AI-generated answers
- Policy debates about AI content disclosure

**Freelance Market Effects:**

Studies show significant labor market impacts:
- **~21% decline** in writing and coding task postings
- Reduced demand for entry-level content work
- Wage pressure on content creation services
- Shift toward "AI-assisted" service offerings

**Platform Implications:**

| Platform Type | Impact |
|---------------|--------|
| Q&A Sites | Reduced human engagement |
| Freelance Platforms | Task displacement |
| Social Networks | Content authenticity concerns |
| Review Sites | Fake review detection challenges |

**The Broader Question:**

What happens to communities built on human contribution when AI can generate equivalent content? This is an ongoing challenge for platform designers, community managers, and marketers relying on authentic UGC.`
};

// =============================================================================
// Section 6: AGC Strategic Position - Animated Explanation
// =============================================================================

const strategicSteps: ExplanationStep[] = [
	{
		id: 'strat-1',
		title: 'AGC Advantages',
		description:
			'AI-Generated Content offers significant advantages: Scalability - produce unlimited content. Speed - generate in seconds vs hours. Personalization - customize for segments or individuals. Cost efficiency - reduce content production costs. Consistency - maintain tone and style at scale.',
		diagram: {
			nodes: [
				{ id: 'advantages', label: 'AGC Advantages', type: 'outcome', x: 210, y: 30 },
				{ id: 'scale', label: 'Scalability', type: 'variable', x: 70, y: 110 },
				{ id: 'speed', label: 'Speed', type: 'variable', x: 150, y: 110 },
				{ id: 'personal', label: 'Personalization', type: 'variable', x: 250, y: 110 },
				{ id: 'cost', label: 'Cost Efficiency', type: 'variable', x: 360, y: 110 }
			],
			edges: [
				{ id: 'a-sc', source: 'advantages', target: 'scale' },
				{ id: 'a-sp', source: 'advantages', target: 'speed' },
				{ id: 'a-p', source: 'advantages', target: 'personal' },
				{ id: 'a-c', source: 'advantages', target: 'cost' }
			]
		},
		highlights: ['advantages'],
		annotations: [{ targetId: 'advantages', text: 'Clear operational benefits', position: 'top' }]
	},
	{
		id: 'strat-2',
		title: 'AGC Limitations',
		description:
			'However, AGC has significant limitations: Repetitiveness - AI patterns become recognizable. Predictability - lack of surprising insights. Homogenization - content starts to sound the same across brands. Authenticity gap - perceived as less genuine.',
		diagram: {
			nodes: [
				{ id: 'limitations', label: 'AGC Limitations', type: 'confounder', x: 210, y: 30 },
				{ id: 'repetitive', label: 'Repetitiveness', type: 'variable', x: 70, y: 110 },
				{ id: 'predictable', label: 'Predictability', type: 'variable', x: 170, y: 110 },
				{ id: 'homogen', label: 'Homogenization', type: 'variable', x: 280, y: 110 },
				{ id: 'auth-gap', label: 'Authenticity Gap', type: 'confounder', x: 400, y: 110 }
			],
			edges: [
				{ id: 'l-r', source: 'limitations', target: 'repetitive' },
				{ id: 'l-p', source: 'limitations', target: 'predictable' },
				{ id: 'l-h', source: 'limitations', target: 'homogen' },
				{ id: 'l-a', source: 'limitations', target: 'auth-gap' }
			]
		},
		highlights: ['limitations', 'auth-gap'],
		annotations: [{ targetId: 'auth-gap', text: 'Core strategic challenge', position: 'bottom' }]
	},
	{
		id: 'strat-3',
		title: 'Solutions',
		description:
			'Strategic approaches can mitigate AGC limitations: Prompt engineering - craft prompts that produce unique outputs. Chain-of-Thought - have AI reason through problems step by step. Style customization - train or prompt for brand-specific voice. Human oversight - review and edit AI outputs.',
		diagram: {
			nodes: [
				{ id: 'solutions', label: 'AGC Solutions', type: 'treatment', x: 210, y: 30 },
				{ id: 'prompt', label: 'Prompt Engineering', type: 'variable', x: 70, y: 110 },
				{ id: 'cot', label: 'Chain-of-Thought', type: 'variable', x: 190, y: 110 },
				{ id: 'style', label: 'Style Customization', type: 'variable', x: 330, y: 110 }
			],
			edges: [
				{ id: 's-p', source: 'solutions', target: 'prompt' },
				{ id: 's-c', source: 'solutions', target: 'cot' },
				{ id: 's-st', source: 'solutions', target: 'style' }
			]
		},
		highlights: ['solutions'],
		annotations: [{ targetId: 'solutions', text: 'Mitigation strategies', position: 'top' }]
	},
	{
		id: 'strat-4',
		title: 'Optimal Approach',
		description:
			'Research and practice point to one optimal approach: AI + Human Editing. Pure AI content loses authenticity. Pure human content cannot scale. The combination - AI for drafting, human for refinement and personalization - captures benefits while mitigating limitations.',
		diagram: {
			nodes: [
				{ id: 'optimal', label: 'AI + Human Editing', type: 'outcome', x: 210, y: 30 },
				{ id: 'ai', label: 'AI Drafting', type: 'control', x: 120, y: 100 },
				{ id: 'human', label: 'Human Refinement', type: 'treatment', x: 300, y: 100 },
				{ id: 'best', label: 'Best of Both', type: 'outcome', x: 210, y: 170 }
			],
			edges: [
				{ id: 'o-a', source: 'optimal', target: 'ai' },
				{ id: 'o-h', source: 'optimal', target: 'human' },
				{ id: 'a-b', source: 'ai', target: 'best', label: 'scale' },
				{ id: 'h-b', source: 'human', target: 'best', label: 'authenticity' }
			]
		},
		highlights: ['optimal', 'best'],
		annotations: [{ targetId: 'optimal', text: 'Recommended approach', position: 'top' }]
	},
	{
		id: 'strat-5',
		title: 'Key Insight',
		description:
			'"Engagement requires human signal." This is the fundamental insight for AGC strategy. AI can produce content, but engagement comes from authentic human connection. The human element - whether in creation, editing, or curation - remains essential for content that truly connects.',
		diagram: {
			nodes: [
				{ id: 'insight', label: 'Engagement requires human signal', type: 'outcome', x: 210, y: 50 },
				{ id: 'ai-only', label: 'AI Only', type: 'confounder', x: 100, y: 130 },
				{ id: 'ai-human', label: 'AI + Human', type: 'outcome', x: 210, y: 130 },
				{ id: 'human-only', label: 'Human Only', type: 'treatment', x: 320, y: 130 },
				{ id: 'scale-auth', label: 'Scale + Authenticity', type: 'outcome', x: 210, y: 200 }
			],
			edges: [
				{ id: 'ah-sa', source: 'ai-human', target: 'scale-auth', label: 'achieves' }
			]
		},
		highlights: ['insight', 'ai-human', 'scale-auth'],
		annotations: [{ targetId: 'insight', text: 'Strategic imperative', position: 'top' }]
	}
];

const strategicSection: ContentSection = {
	id: 'agc-strategic-position',
	type: 'explanation',
	title: 'AGC Strategic Position',
	explanation: {
		steps: strategicSteps
	}
};

// =============================================================================
// Export Lecture Content
// =============================================================================

export const lectureContent: LectureContent = {
	lectureId: 'agc-deep-dive',
	sections: [
		agcParadoxSection,
		authenticitySection,
		llmSection,
		attentionSection,
		communityImpactSection,
		strategicSection
	]
};
