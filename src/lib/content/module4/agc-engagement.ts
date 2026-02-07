/**
 * Lecture 6: AI-Generated Content and Engagement
 *
 * This lecture examines the paradox of AI-generated content:
 * - The AGC engagement paradox (more content, less interaction)
 * - How LLMs work (next token prediction)
 * - AI content vs human content comparison
 * - Why AI content reduces engagement
 * - Platform-level effects (Stack Overflow, freelance markets)
 * - Content homogenization risks
 * - The hybrid solution (AI + human editing)
 */

import type { LectureContent, ContentSection } from '../types';
import type { DiagramData } from '$lib/components/diagrams';
import type { ExplanationStep } from '$lib/components/animation';

// =============================================================================
// Section 1: The AGC Engagement Paradox
// =============================================================================

const agcParadoxSection: ContentSection = {
	id: 'agc-engagement-paradox',
	type: 'text',
	title: 'The AGC Engagement Paradox',
	content: `A striking observation emerged from an educational case study: when students were allowed to use generative AI tools for writing discussion posts, their outputs became **longer, better structured, and more information-dense**. The writing quality improved on every traditional metric.

But something unexpected happened: **engagement dropped**. Fewer comments, fewer replies, fewer meaningful interactions. The discussion boards became quieter despite the posts being objectively "better."

This is the **AGC Engagement Paradox**:

**More text does not equal more engagement.**

The paradox reveals a fundamental tension in AI-generated content. When AI writes, it optimizes for information density and structural clarity. But human engagement is driven by something different: **personal voice, vulnerability, individual perspective, and emotional authenticity**. AI excels at the first set of qualities while systematically stripping away the second.

This paradox has profound implications for marketing, platform design, and content strategy. If AI scales content production but simultaneously reduces engagement, the relationship between content quantity and content value is not linear — it may even be inverse.`
};

// =============================================================================
// Section 2: How LLMs Work (Animated Explanation)
// =============================================================================

const llmSteps: ExplanationStep[] = [
	{
		id: 'llm-1',
		title: 'Large Language Models',
		description:
			'Large Language Models (LLMs) are AI systems trained on massive text datasets to generate human-like language. They can understand context, generate responses, continue text, form explanations, and produce structured materials. Models like GPT, Claude, and Gemini represent the current state of the art in text generation, capable of producing content that is often indistinguishable from human writing at the surface level.',
		diagram: {
			nodes: [
				{ id: 'training-data', label: 'Massive Text\nDatasets', type: 'variable', x: 60, y: 90 },
				{ id: 'llm', label: 'Large Language\nModel', type: 'treatment', x: 210, y: 90 },
				{ id: 'output', label: 'Human-like\nText Output', type: 'outcome', x: 360, y: 90 }
			],
			edges: [
				{ id: 'td-llm', source: 'training-data', target: 'llm', label: 'trained on' },
				{ id: 'llm-out', source: 'llm', target: 'output', label: 'generates' }
			]
		},
		highlights: ['llm'],
		annotations: [{ targetId: 'llm', text: 'AI trained on billions of words', position: 'top' }]
	},
	{
		id: 'llm-2',
		title: 'Next Token Prediction',
		description:
			'The core mechanism of LLMs is next token prediction: given a sequence of words, the model predicts the most probable next word. LLMs do not "understand" meaning the way humans do — they work on statistical patterns learned from training data. When you ask "What is the capital of France?" the model generates "Paris" not because it knows geography, but because "Paris" is the statistically most probable continuation of that text pattern.',
		diagram: {
			nodes: [
				{ id: 'input', label: 'Input Text\n"Capital of France?"', type: 'control', x: 80, y: 90 },
				{ id: 'predict', label: 'Statistical\nPrediction', type: 'treatment', x: 220, y: 90 },
				{ id: 'token', label: 'Next Token\n"Paris"', type: 'outcome', x: 360, y: 90 }
			],
			edges: [
				{ id: 'i-p', source: 'input', target: 'predict', label: 'context' },
				{ id: 'p-t', source: 'predict', target: 'token', label: 'most probable' }
			]
		},
		highlights: ['predict'],
		annotations: [{ targetId: 'predict', text: 'Pattern matching, not understanding', position: 'top' }]
	},
	{
		id: 'llm-3',
		title: 'Content Generation Benefits',
		description:
			'AI-powered content generation offers significant practical benefits: lower production cost, reduced language barriers, lower entry threshold for non-native speakers, and dramatically faster production speed. Applications span articles, product descriptions, Q&A responses, documentation, marketing copy, and customer support. For businesses, this means scaling content production at a fraction of the traditional cost.',
		diagram: {
			nodes: [
				{ id: 'ai-gen', label: 'AI Content\nGeneration', type: 'treatment', x: 210, y: 40 },
				{ id: 'cost', label: 'Lower Cost', type: 'outcome', x: 60, y: 140 },
				{ id: 'barrier', label: 'Reduced\nLanguage Barriers', type: 'outcome', x: 170, y: 140 },
				{ id: 'threshold', label: 'Lower Entry\nThreshold', type: 'outcome', x: 290, y: 140 },
				{ id: 'speed', label: 'Faster\nProduction', type: 'outcome', x: 400, y: 140 }
			],
			edges: [
				{ id: 'a-c', source: 'ai-gen', target: 'cost' },
				{ id: 'a-b', source: 'ai-gen', target: 'barrier' },
				{ id: 'a-t', source: 'ai-gen', target: 'threshold' },
				{ id: 'a-s', source: 'ai-gen', target: 'speed' }
			]
		},
		highlights: ['cost', 'barrier', 'threshold', 'speed'],
		annotations: [{ targetId: 'ai-gen', text: 'Productivity multiplier', position: 'top' }]
	},
	{
		id: 'llm-4',
		title: 'The Scale Problem',
		description:
			'AI enables content production at unprecedented scale. But a critical insight emerges: content scale going up does not mean engagement goes up. The relationship between quantity and value is not linear. More articles, more posts, more responses — but not necessarily more interaction, more trust, or more connection. This is the fundamental challenge that businesses face when deploying AI for content at scale.',
		diagram: {
			nodes: [
				{ id: 'scale', label: 'Content\nScale', type: 'treatment', x: 100, y: 90 },
				{ id: 'arrow', label: 'does NOT\nequal', type: 'confounder', x: 220, y: 90 },
				{ id: 'engagement', label: 'Engagement\nScale', type: 'variable', x: 340, y: 90 }
			],
			edges: [
				{ id: 's-a', source: 'scale', target: 'arrow' },
				{ id: 'a-e', source: 'arrow', target: 'engagement' }
			]
		},
		highlights: ['arrow'],
		annotations: [{ targetId: 'arrow', text: 'Non-linear relationship', position: 'top' }]
	}
];

const llmExplanationSection: ContentSection = {
	id: 'how-llms-work',
	type: 'explanation',
	title: 'How LLMs Work',
	explanation: {
		steps: llmSteps
	}
};

// =============================================================================
// Section 3: AI Content vs Human Content (Diagram)
// =============================================================================

const contentComparisonDiagram: DiagramData = {
	nodes: [
		// AI Content cluster (left)
		{ id: 'ai-label', label: 'AI Content', type: 'control', x: 80, y: 30 },
		{ id: 'ai-volume', label: 'Volume\nHigh', type: 'control', x: 30, y: 100 },
		{ id: 'ai-structure', label: 'Structure\nHigh', type: 'control', x: 130, y: 100 },
		{ id: 'ai-voice', label: 'Personal Voice\nLow', type: 'variable', x: 30, y: 170 },
		{ id: 'ai-engage', label: 'Engagement\nLow', type: 'variable', x: 130, y: 170 },
		// Human Content cluster (right)
		{ id: 'human-label', label: 'Human Content', type: 'treatment', x: 380, y: 30 },
		{ id: 'human-volume', label: 'Volume\nLower', type: 'variable', x: 330, y: 100 },
		{ id: 'human-structure', label: 'Structure\nVariable', type: 'variable', x: 430, y: 100 },
		{ id: 'human-voice', label: 'Personal Voice\nHigh', type: 'treatment', x: 330, y: 170 },
		{ id: 'human-engage', label: 'Engagement\nHigh', type: 'treatment', x: 430, y: 170 },
		// Center: Hybrid
		{ id: 'hybrid', label: 'Hybrid\nAI + Human Editing', type: 'outcome', x: 230, y: 130 }
	],
	edges: [
		// AI cluster connections
		{ id: 'al-av', source: 'ai-label', target: 'ai-volume' },
		{ id: 'al-as', source: 'ai-label', target: 'ai-structure' },
		{ id: 'al-avv', source: 'ai-label', target: 'ai-voice' },
		{ id: 'al-ae', source: 'ai-label', target: 'ai-engage' },
		// Human cluster connections
		{ id: 'hl-hv', source: 'human-label', target: 'human-volume' },
		{ id: 'hl-hs', source: 'human-label', target: 'human-structure' },
		{ id: 'hl-hvv', source: 'human-label', target: 'human-voice' },
		{ id: 'hl-he', source: 'human-label', target: 'human-engage' },
		// Hybrid connections
		{ id: 'as-hy', source: 'ai-structure', target: 'hybrid', label: 'structure' },
		{ id: 'hvv-hy', source: 'human-voice', target: 'hybrid', label: 'voice' },
		{ id: 'he-hy', source: 'human-engage', target: 'hybrid', label: 'engagement' }
	]
};

const contentComparisonSection: ContentSection = {
	id: 'ai-vs-human-content',
	type: 'diagram',
	title: 'AI Content vs Human Content',
	diagram: contentComparisonDiagram,
	content: `This comparison reveals the fundamental trade-off between AI-generated and human-created content:

**AI Content** excels at volume and structural quality but falls short on personal voice and engagement. It produces well-organized, grammatically correct, information-dense text — but text that lacks individuality and emotional resonance.

**Human Content** may be less consistent in structure and slower to produce, but it carries personal voice, authentic perspective, and the kind of individuality that drives engagement. People respond to people, not to algorithms.

**The Hybrid Approach** (center) represents the optimal strategy: combine AI's structural advantages with human editing and personal voice. This produces content that is both efficient to create and engaging to consume. The hybrid model leverages AI for the first draft, structure, and information gathering, while the human contributor adds perspective, personality, and authentic connection.`
};

// =============================================================================
// Section 4: Why AI Content Reduces Engagement
// =============================================================================

const whyEngagementDropsSection: ContentSection = {
	id: 'why-ai-reduces-engagement',
	type: 'text',
	title: 'Why AI Content Reduces Engagement',
	content: `Text analysis of AI-generated posts reveals a consistent pattern of linguistic features that correlate with reduced engagement:

**What AI posts lack:**
- Fewer **first-person pronouns** ("I think," "in my experience," "I disagree")
- Fewer **personal formulations** and subjective observations
- Less **individuality** in word choice and sentence structure
- Less **"human voice"** — the distinctive way a person expresses themselves

**Personal Voice** is the expression of individual position and style in text. It is what makes a discussion post feel like a conversation with a real person rather than a textbook excerpt.

**AI content is characteristically:**
- **Neutral** — avoids taking strong positions
- **Universal** — speaks in generalizations rather than specific experience
- **Smoothed** — removes rough edges, contradictions, and uncertainty
- **Depersonalized** — strips away the author's unique perspective

**The fundamental insight:** People engage with people, not with algorithms. When readers sense that a text was written by a machine — even if they cannot consciously identify why — their motivation to respond, comment, or continue the conversation drops. Engagement is fundamentally a social act, and social acts require the perception of a social partner.

This explains why longer, better-structured AI posts generate fewer comments than shorter, rougher human posts. The missing ingredient is not information quality — it is **human presence**.`
};

// =============================================================================
// Section 5: Platform-Level Effects
// =============================================================================

const platformEffectsSection: ContentSection = {
	id: 'platform-level-effects',
	type: 'text',
	title: 'Platform-Level Effects',
	content: `The engagement paradox is not limited to academic discussion boards. It manifests at the platform level across the digital economy:

**Stack Overflow and Technical Communities:**
After the widespread adoption of generative AI tools, Stack Overflow experienced decreased activity, fewer expert answers, and reduced community participation. When anyone can generate a competent-sounding answer with AI, the incentive for experts to write original, thoughtful responses diminishes. The result is a potential erosion of the knowledge commons that these platforms were built to serve.

**Freelance Markets:**
Research documented approximately a **21% decline in writing and coding job postings** within roughly 8 months of the ChatGPT launch. The most affected categories were **automation-prone tasks**: routine writing, basic coding, template-based content creation, and formulaic documentation.

**What this means structurally:**
These are not temporary disruptions — they represent structural labor market shifts. The tasks most vulnerable to AI displacement are those that require the least personal voice and creative judgment. Paradoxically, these are also the tasks where AI replacement most clearly reduces the human element that drives engagement.

**The implication for marketing:** Platforms and businesses that rely on user engagement must understand that scaling content through AI may undermine the very engagement metrics they depend on. The strategy cannot be "replace human content with AI content" — it must be more nuanced.`
};

// =============================================================================
// Section 6: Content Homogenization
// =============================================================================

const homogenizationSection: ContentSection = {
	id: 'content-homogenization',
	type: 'text',
	title: 'Content Homogenization',
	content: `A second-order effect of AI-generated content is **content homogenization** — the convergence of text toward similar templates, patterns, and structures.

**Why AI texts are often similar to each other:**
LLMs are trained on the same datasets and optimized for the same objective (next token prediction). This means they tend to produce outputs that follow common patterns, use similar vocabulary, and adopt comparable structures. When thousands of people use the same AI tools to generate content, the resulting texts inevitably converge.

**The homogenization risks:**
- **Less opinion diversity** — AI smooths out disagreement and controversy, producing "safe" middle-ground content
- **Less individuality** — unique voices, unusual perspectives, and creative framings are systematically filtered out
- **Less creativity** — AI optimizes for the most probable continuation, not the most surprising or insightful one
- **Lower emotional engagement** — homogeneous content fails to provoke the emotional reactions that drive sharing, commenting, and discussion

**The deeper problem:** Quantity and quality are different variables. A platform with ten thousand AI-generated articles may have less informational diversity than one with a thousand human-written pieces. Volume creates the illusion of richness while potentially reducing the actual variety of perspectives available.

**For marketers:** Content that looks the same as everything else fails to differentiate the brand. If competitors are all using AI to generate similar content, the competitive advantage shifts to whoever can add the most authentic human element.`
};

// =============================================================================
// Section 7: The Hybrid Solution
// =============================================================================

const hybridSolutionSection: ContentSection = {
	id: 'hybrid-solution',
	type: 'text',
	title: 'The Hybrid Solution',
	content: `The lesson of the AGC engagement paradox is not that AI should be avoided — it is that AI must be deployed thoughtfully, with human contribution preserved where it matters most.

**AI is powerful for:**
- **Productivity** — first drafts, outlines, research summaries
- **Scalability** — producing content across languages, formats, and channels
- **Support** — helping non-native speakers, reducing language barriers, automating routine documentation

**But human contribution remains critical for:**
- **Engagement** — personal voice drives interaction
- **Trust** — audiences trust content they perceive as authentically human
- **Originality** — unique perspectives and creative insights cannot be replicated by statistical prediction
- **Social dynamics** — conversations, debates, and community-building require human participants

**The optimal approach: AI + Human Editing + Personal Voice**

The best results come from a hybrid workflow:
1. **AI generates** the structural foundation — draft text, information gathering, formatting
2. **Human edits** for accuracy, adds personal perspective and experience
3. **Personal voice** is deliberately injected — first-person observations, specific examples, genuine opinions

**The human-in-the-loop is not optional for engagement-dependent platforms.** Any content strategy that aims to drive user interaction, community participation, or brand loyalty must maintain the human element. AI is a tool that amplifies human capability — but it cannot replace the human connection that engagement depends on.

**Strategic takeaway:** The competitive advantage in the age of AI content is not who can produce the most content, but who can most effectively combine AI efficiency with human authenticity.`
};

// =============================================================================
// Export Lecture Content
// =============================================================================

export const lectureContent: LectureContent = {
	lectureId: 'agc-engagement',
	sections: [
		agcParadoxSection,
		llmExplanationSection,
		contentComparisonSection,
		whyEngagementDropsSection,
		platformEffectsSection,
		homogenizationSection,
		hybridSolutionSection
	]
};
