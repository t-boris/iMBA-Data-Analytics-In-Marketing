/**
 * Lecture 4: LLMs for Market Research
 *
 * This lecture covers:
 * - Traditional market research limitations
 * - Using GPT to augment market research
 * - Human vs GPT demand curves comparison
 * - Fine-tuning for domain-specific accuracy
 * - Practical applications and limitations
 */

import type { LectureContent, ContentSection } from '../types';
import type { DiagramData } from '$lib/components/diagrams';
import type { ExplanationStep } from '$lib/components/animation';

// =============================================================================
// Section 1: Traditional Market Research
// =============================================================================

const traditionalResearchSection: ContentSection = {
	id: 'traditional-research',
	type: 'text',
	title: 'Traditional Market Research',
	content: `**The Standard Toolkit**

For decades, marketers have relied on established methods to understand consumers:

**Surveys**
- Questionnaires sent to target audiences
- Structured questions about preferences, intentions, willingness-to-pay
- Limited by response rates and self-reporting biases

**Focus Groups**
- Small groups discussing products/concepts
- Rich qualitative insights
- Expensive, slow, and not statistically representative

**Conjoint Analysis**
- Sophisticated trade-off analysis
- Reveals hidden preferences
- Requires specialized expertise and significant investment

**The Limitations**

All traditional methods share common constraints:
- **Expensive** - Professional recruitment, incentives, analysis costs add up
- **Slow** - Weeks or months from design to results
- **Limited samples** - Budget constraints cap how many respondents you can reach
- **Hard to iterate** - Testing new concepts requires starting over

**The Emerging Question**

What if AI could generate consumer responses that closely mirror human behavior? Could LLMs like GPT become a rapid, low-cost supplement to traditional market research?`
};

// =============================================================================
// Section 2: The LLM Approach (Animated Explanation)
// =============================================================================

const llmApproachSteps: ExplanationStep[] = [
	{
		id: 'llm-1',
		title: 'Survey Question',
		description:
			'Start with a market research question: "How much would you pay for this new product?" or "Which features matter most to you?" - the same questions you would ask human respondents.',
		diagram: {
			nodes: [
				{ id: 'question', label: 'Survey\nQuestion', type: 'treatment', x: 210, y: 60 }
			],
			edges: []
		},
		highlights: ['question'],
		annotations: [{ targetId: 'question', text: 'Willingness-to-pay, preferences, etc.', position: 'bottom' }]
	},
	{
		id: 'llm-2',
		title: 'GPT Generates Responses',
		description:
			'Feed the question to GPT (or similar LLMs). The model can generate many synthetic "respondents" with different demographic profiles and contexts. This is fast and essentially unlimited in scale.',
		diagram: {
			nodes: [
				{ id: 'question', label: 'Survey\nQuestion', type: 'treatment', x: 100, y: 60 },
				{ id: 'gpt', label: 'GPT', type: 'confounder', x: 250, y: 60 },
				{ id: 'r1', label: 'Response 1', type: 'variable', x: 350, y: 20 },
				{ id: 'r2', label: 'Response 2', type: 'variable', x: 350, y: 60 },
				{ id: 'r3', label: 'Response N', type: 'variable', x: 350, y: 100 }
			],
			edges: [
				{ id: 'q-g', source: 'question', target: 'gpt' },
				{ id: 'g-r1', source: 'gpt', target: 'r1' },
				{ id: 'g-r2', source: 'gpt', target: 'r2' },
				{ id: 'g-r3', source: 'gpt', target: 'r3' }
			]
		},
		highlights: ['gpt'],
		annotations: [{ targetId: 'gpt', text: 'Generates multiple synthetic responses', position: 'bottom' }]
	},
	{
		id: 'llm-3',
		title: 'Human Responses for Comparison',
		description:
			'At the same time, collect actual human responses using traditional methods. This provides the ground truth for validating the GPT approach.',
		diagram: {
			nodes: [
				{ id: 'question', label: 'Survey\nQuestion', type: 'treatment', x: 210, y: 20 },
				{ id: 'gpt', label: 'GPT', type: 'confounder', x: 120, y: 90 },
				{ id: 'humans', label: 'Human\nRespondents', type: 'control', x: 300, y: 90 },
				{ id: 'gpt-resp', label: 'GPT\nResponses', type: 'variable', x: 120, y: 150 },
				{ id: 'human-resp', label: 'Human\nResponses', type: 'variable', x: 300, y: 150 }
			],
			edges: [
				{ id: 'q-g', source: 'question', target: 'gpt' },
				{ id: 'q-h', source: 'question', target: 'humans' },
				{ id: 'g-gr', source: 'gpt', target: 'gpt-resp' },
				{ id: 'h-hr', source: 'humans', target: 'human-resp' }
			]
		},
		highlights: ['humans', 'human-resp'],
		annotations: [{ targetId: 'human-resp', text: 'Ground truth for validation', position: 'bottom' }]
	},
	{
		id: 'llm-4',
		title: 'Correlation Analysis',
		description:
			'Compare GPT and human responses. Research from Microsoft and Harvard showed strong alignment in willingness-to-pay patterns. GPT responses correlate highly with actual human behavior for many product categories.',
		diagram: {
			nodes: [
				{ id: 'gpt-resp', label: 'GPT\nResponses', type: 'confounder', x: 120, y: 60 },
				{ id: 'human-resp', label: 'Human\nResponses', type: 'control', x: 300, y: 60 },
				{ id: 'correlation', label: 'Strong\nCorrelation', type: 'outcome', x: 210, y: 130 }
			],
			edges: [
				{ id: 'g-c', source: 'gpt-resp', target: 'correlation' },
				{ id: 'h-c', source: 'human-resp', target: 'correlation' }
			]
		},
		highlights: ['correlation'],
		annotations: [{ targetId: 'correlation', text: 'GPT mimics human preferences', position: 'bottom' }]
	}
];

const llmApproachSection: ContentSection = {
	id: 'llm-approach',
	type: 'explanation',
	title: 'The LLM Approach',
	explanation: {
		steps: llmApproachSteps
	}
};

// =============================================================================
// Section 3: Human vs GPT Demand Curves (Diagram)
// =============================================================================

const demandCurvesDiagram: DiagramData = {
	nodes: [
		// Simplified comparison showing alignment concept
		{ id: 'human-label', label: 'Human\nResponses', type: 'control', x: 100, y: 50 },
		{ id: 'gpt-label', label: 'GPT\nResponses', type: 'confounder', x: 300, y: 50 },
		{ id: 'correlation', label: 'High\nCorrelation', type: 'outcome', x: 200, y: 130 },
		{ id: 'wtp', label: 'Similar WTP\nPatterns', type: 'variable', x: 200, y: 30 }
	],
	edges: [
		{ id: 'h-c', source: 'human-label', target: 'correlation' },
		{ id: 'g-c', source: 'gpt-label', target: 'correlation' },
		{ id: 'h-w', source: 'human-label', target: 'wtp', style: 'dashed' },
		{ id: 'g-w', source: 'gpt-label', target: 'wtp', style: 'dashed' }
	]
};

const demandCurvesSection: ContentSection = {
	id: 'demand-curves',
	type: 'diagram',
	title: 'Human vs GPT Demand Curves',
	diagram: demandCurvesDiagram,
	content: `**Research Findings: Strong Alignment**

Research from Microsoft and Harvard compared demand curves derived from GPT responses to those from actual human subjects:

**The Experiment**
- Same products, same questions
- GPT prompted to respond as different consumer personas
- Human respondents recruited through traditional panels
- Willingness-to-pay measured at different price points

**Key Finding**
The demand curves closely overlap. GPT-generated responses predict human behavior with surprising accuracy:
- Correct directional predictions for price sensitivity
- Similar inflection points where demand drops sharply
- Consistent across multiple product categories

**Why It Works**
GPT has been trained on vast amounts of human-generated text, including:
- Product reviews expressing preferences
- Forum discussions about pricing and value
- Survey research published in academic literature
- Marketing content describing consumer behavior

The model has essentially "learned" human preference patterns from this training data.

**Important Caveat**
Alignment is strongest for established product categories where training data is abundant. Novel or niche categories may show weaker correlation.`
};

// =============================================================================
// Section 4: Fine-Tuning for Accuracy
// =============================================================================

const fineTuningSection: ContentSection = {
	id: 'fine-tuning',
	type: 'text',
	title: 'Fine-Tuning for Accuracy',
	content: `**Pre-trained GPT: A Good Baseline**

Out-of-the-box, GPT provides reasonable approximations of consumer behavior. But for specific business applications, accuracy can be improved through fine-tuning.

**What is Fine-Tuning?**

Fine-tuning adapts a pre-trained model to your specific domain:
1. Start with the general GPT model
2. Train it on your company's historical data
3. The model learns patterns specific to your customers and products

**Example: New Snack Flavor Predictions**

A food company wants to predict consumer reactions to new snack flavors:

**Without fine-tuning:**
- GPT provides general predictions based on broad patterns
- May miss brand-specific preferences or regional variations

**With fine-tuning:**
- Train on historical survey data from your customer base
- Include past product launch outcomes
- Model learns your specific consumer dynamics

**Result:** Fine-tuned models show 15-25% improvement in prediction accuracy for domain-specific questions.

**When to Fine-Tune**

Fine-tuning makes sense when:
- You have substantial historical data (thousands of examples)
- Domain-specific patterns differ from general consumer behavior
- High-stakes decisions justify the additional investment
- You plan to use the model repeatedly for similar research

For one-off questions in common product categories, pre-trained GPT often suffices.`
};

// =============================================================================
// Section 5: Practical Applications (Animated Explanation)
// =============================================================================

const practicalApplicationsSteps: ExplanationStep[] = [
	{
		id: 'practical-1',
		title: 'The Idea Filtering Workflow',
		description:
			'Companies generate many new product ideas. Traditional research on every idea is prohibitively expensive. LLMs enable rapid screening of concepts.',
		diagram: {
			nodes: [
				{ id: 'idea', label: 'New Idea', type: 'treatment', x: 100, y: 60 },
				{ id: 'gpt', label: 'GPT Test', type: 'confounder', x: 250, y: 60 }
			],
			edges: [
				{ id: 'i-g', source: 'idea', target: 'gpt' }
			]
		},
		highlights: ['idea', 'gpt'],
		annotations: [{ targetId: 'gpt', text: 'Fast, cheap initial screen', position: 'bottom' }]
	},
	{
		id: 'practical-2',
		title: 'Filter to Promising Ideas',
		description:
			'GPT testing quickly identifies which concepts resonate. Low-scoring ideas are deprioritized. This reduces the number of concepts requiring expensive human validation.',
		diagram: {
			nodes: [
				{ id: 'idea', label: 'New Idea', type: 'treatment', x: 80, y: 60 },
				{ id: 'gpt', label: 'GPT Test', type: 'confounder', x: 180, y: 60 },
				{ id: 'filter', label: 'Filter', type: 'variable', x: 280, y: 60 },
				{ id: 'promising', label: 'Promising', type: 'outcome', x: 370, y: 30 },
				{ id: 'deprioritized', label: 'Deprioritized', type: 'control', x: 370, y: 90 }
			],
			edges: [
				{ id: 'i-g', source: 'idea', target: 'gpt' },
				{ id: 'g-f', source: 'gpt', target: 'filter' },
				{ id: 'f-p', source: 'filter', target: 'promising' },
				{ id: 'f-d', source: 'filter', target: 'deprioritized' }
			]
		},
		highlights: ['filter', 'promising'],
		annotations: [{ targetId: 'filter', text: 'Most ideas filtered out', position: 'bottom' }]
	},
	{
		id: 'practical-3',
		title: 'Human Validation for Winners',
		description:
			'Only the most promising concepts proceed to expensive human research. This dramatically reduces the cost of concept testing while maintaining quality.',
		diagram: {
			nodes: [
				{ id: 'idea', label: 'Idea', type: 'treatment', x: 50, y: 60 },
				{ id: 'gpt', label: 'GPT', type: 'confounder', x: 130, y: 60 },
				{ id: 'promising', label: 'Top Ideas', type: 'variable', x: 230, y: 60 },
				{ id: 'human', label: 'Human\nValidation', type: 'control', x: 340, y: 60 },
				{ id: 'launch', label: 'Launch', type: 'outcome', x: 430, y: 60 }
			],
			edges: [
				{ id: 'i-g', source: 'idea', target: 'gpt' },
				{ id: 'g-p', source: 'gpt', target: 'promising' },
				{ id: 'p-h', source: 'promising', target: 'human' },
				{ id: 'h-l', source: 'human', target: 'launch' }
			]
		},
		highlights: ['human', 'launch'],
		annotations: [{ targetId: 'human', text: 'Only validate winners', position: 'bottom' }]
	},
	{
		id: 'practical-4',
		title: 'The Speed and Cost Advantage',
		description:
			'The LLM-assisted workflow delivers massive efficiency gains. Ideas that would take months and millions to test can be screened in days for a fraction of the cost.',
		diagram: {
			nodes: [
				{ id: 'many-ideas', label: '100 Ideas', type: 'treatment', x: 80, y: 30 },
				{ id: 'gpt-screen', label: 'GPT Screen', type: 'confounder', x: 180, y: 30 },
				{ id: 'few-ideas', label: '10 Ideas', type: 'variable', x: 280, y: 30 },
				{ id: 'human-test', label: 'Human Test', type: 'control', x: 380, y: 30 },
				{ id: 'speed', label: '10x Faster', type: 'outcome', x: 180, y: 110 },
				{ id: 'cost', label: '100x Cheaper', type: 'outcome', x: 280, y: 110 }
			],
			edges: [
				{ id: 'm-g', source: 'many-ideas', target: 'gpt-screen' },
				{ id: 'g-f', source: 'gpt-screen', target: 'few-ideas' },
				{ id: 'f-h', source: 'few-ideas', target: 'human-test' },
				{ id: 'gs-s', source: 'gpt-screen', target: 'speed' },
				{ id: 'fi-c', source: 'few-ideas', target: 'cost' }
			]
		},
		highlights: ['speed', 'cost'],
		annotations: [{ targetId: 'speed', text: 'Days instead of months', position: 'bottom' }]
	}
];

const practicalApplicationsSection: ContentSection = {
	id: 'practical-applications',
	type: 'explanation',
	title: 'Practical Applications',
	explanation: {
		steps: practicalApplicationsSteps
	}
};

// =============================================================================
// Section 6: Limitations & Summary
// =============================================================================

const limitationsSummarySection: ContentSection = {
	id: 'limitations-summary',
	type: 'text',
	title: 'Limitations & Summary',
	content: `**Important Limitations**

LLMs are powerful tools, but they are not magic. Key limitations to remember:

**1. AI Mimics But Isn't Human**
- GPT generates statistically plausible responses based on training data
- It doesn't actually experience preferences or make decisions
- Edge cases and unusual consumer segments may not be well-represented

**2. Struggles with Novel Categories**
- Strong performance in established product categories
- Weaker for truly innovative products with no historical precedent
- Cannot predict reactions to genuinely novel experiences

**3. Training Data Biases**
- Model reflects biases in its training data
- May not represent all demographic segments equally
- Important to validate with diverse human samples

**4. Not a Replacement**
- Best used as a research accelerator, not a replacement for human research
- Critical decisions should still involve human validation
- Regulatory and high-stakes contexts require human evidence

**Summary: The LLM Market Research Playbook**

**Use LLMs for:**
- Rapid hypothesis testing at scale
- Early-stage concept screening
- Generating initial price sensitivity estimates
- Exploring consumer language and framing

**Complement with human research for:**
- Final validation before major investments
- Novel product categories
- High-stakes pricing decisions
- Regulatory or legal requirements

**The Bottom Line**

LLMs don't replace market research - they transform it. By handling the high-volume, low-risk screening work, they free researchers to focus on the nuanced, high-value questions that require human insight.

**Key metrics to remember:**
- 10x faster than traditional concept testing
- 100x cheaper per concept evaluated
- Strong correlation with human responses for established categories
- Always validate winners with human research`
};

// =============================================================================
// Export Lecture Content
// =============================================================================

export const lectureContent: LectureContent = {
	lectureId: 'llm-market-research',
	sections: [
		traditionalResearchSection,
		llmApproachSection,
		demandCurvesSection,
		fineTuningSection,
		practicalApplicationsSection,
		limitationsSummarySection
	]
};
