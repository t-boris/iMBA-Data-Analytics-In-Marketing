/**
 * Lecture 9: Sentiment Analysis Application
 *
 * This lecture covers sentiment analysis theory and methods:
 * - Sentiment analysis purpose and use cases
 * - Dictionary-based methods (VADER)
 * - BERT introduction and bidirectional context
 * - Pretraining tasks (MLM, NSP)
 * - Fine-tuning for sentiment classification
 * - BERT vs Dictionary comparison
 */

import type { LectureContent, ContentSection } from '../types';
import type { DiagramData } from '$lib/components/diagrams';
import type { ExplanationStep } from '$lib/components/animation';

// =============================================================================
// Section 1: Sentiment Analysis Purpose
// =============================================================================

const purposeSection: ContentSection = {
	id: 'sentiment-purpose',
	type: 'text',
	title: 'Sentiment Analysis Purpose',
	content: `**Sentiment analysis** is the automatic classification of text by emotional tone - determining whether content expresses positive, negative, or neutral sentiment.

**Output Categories:**

| Category | Example | Business Signal |
|----------|---------|-----------------|
| Positive | "Love this product!" | Satisfaction, advocacy |
| Negative | "Terrible experience" | Churn risk, issues |
| Neutral | "Arrived on Tuesday" | Informational only |

**Common Use Cases:**

- **Product reviews** - Aggregate customer sentiment for products
- **Social media monitoring** - Track brand perception in real-time
- **Customer support** - Prioritize angry customers, route to specialists
- **Market research** - Understand consumer attitudes at scale

**Why Automate?**

Manual sentiment coding is:
- **Slow** - Humans can process ~100 reviews/hour
- **Expensive** - Requires trained analysts
- **Inconsistent** - Different coders disagree on edge cases

Automated sentiment analysis can process millions of documents consistently.

**Example Application:**

Amazon reviews for consumer electronics:
- 50,000 reviews for a smartphone
- Manual analysis: 500 hours (~$10,000)
- Automated analysis: minutes (~$5)

**Key Insight:**
Sentiment analysis transforms unstructured text into structured data that can feed dashboards, models, and business decisions.`
};

// =============================================================================
// Section 2: Dictionary-Based Methods - Animated Explanation
// =============================================================================

const dictionarySteps: ExplanationStep[] = [
	{
		id: 'dict-1',
		title: 'VADER Approach',
		description:
			'VADER (Valence Aware Dictionary and sEntiment Reasoner) is a popular dictionary-based method. It works by assigning pre-defined sentiment scores to individual words. "Love" = +3, "Hate" = -3, "Good" = +2, etc.',
		diagram: {
			nodes: [
				{ id: 'vader', label: 'VADER Dictionary', type: 'treatment', x: 210, y: 90 }
			],
			edges: []
		},
		highlights: ['vader'],
		annotations: [{ targetId: 'vader', text: 'Words have pre-assigned scores', position: 'bottom' }]
	},
	{
		id: 'dict-2',
		title: 'How It Works',
		description:
			'The algorithm tokenizes text into words, looks up each word in the dictionary, applies modifiers (negation, intensifiers), and sums the scores. Final score determines positive/negative/neutral classification.',
		diagram: {
			nodes: [
				{ id: 'text', label: 'Input Text', type: 'treatment', x: 80, y: 90 },
				{ id: 'lookup', label: 'Word Lookup', type: 'variable', x: 210, y: 90 },
				{ id: 'sum', label: 'Sum Scores', type: 'outcome', x: 340, y: 90 }
			],
			edges: [
				{ id: 't-l', source: 'text', target: 'lookup', label: 'tokenize' },
				{ id: 'l-s', source: 'lookup', target: 'sum', label: 'aggregate' }
			]
		},
		highlights: ['lookup', 'sum'],
		annotations: [{ targetId: 'sum', text: 'Simple addition', position: 'bottom' }]
	},
	{
		id: 'dict-3',
		title: 'The Context Problem',
		description:
			'Consider: "This phone is sick!" Dictionary approach: "sick" = negative word → classifies as negative. Reality: In slang context, "sick" means "awesome" → should be positive. The dictionary cannot understand context.',
		diagram: {
			nodes: [
				{ id: 'input', label: '"This phone is sick!"', type: 'treatment', x: 130, y: 60 },
				{ id: 'dict', label: 'Dictionary: sick = -2', type: 'confounder', x: 130, y: 130 },
				{ id: 'wrong', label: 'Result: Negative', type: 'confounder', x: 300, y: 90 }
			],
			edges: [
				{ id: 'i-d', source: 'input', target: 'dict' },
				{ id: 'd-w', source: 'dict', target: 'wrong', label: 'wrong!' }
			]
		},
		highlights: ['wrong'],
		annotations: [{ targetId: 'wrong', text: 'Context ignored', position: 'right' }]
	},
	{
		id: 'dict-4',
		title: 'Sarcasm Failure',
		description:
			'Sarcasm is another failure mode. "Oh great, another software update that breaks everything." Words "great" and "update" are neutral/positive, but the sentence is clearly negative. Dictionary methods miss the sarcastic intent entirely.',
		diagram: {
			nodes: [
				{ id: 'sarcasm', label: '"Oh great..."', type: 'treatment', x: 130, y: 90 },
				{ id: 'positive', label: 'great = +2', type: 'outcome', x: 290, y: 60 },
				{ id: 'reality', label: 'Actually: Negative', type: 'confounder', x: 290, y: 120 }
			],
			edges: [
				{ id: 's-p', source: 'sarcasm', target: 'positive' },
				{ id: 's-r', source: 'sarcasm', target: 'reality' }
			]
		},
		highlights: ['positive', 'reality'],
		annotations: [{ targetId: 'reality', text: 'Sarcasm undetected', position: 'bottom' }]
	},
	{
		id: 'dict-5',
		title: 'Dictionary Limitations',
		description:
			'Summary of dictionary method limitations: No context understanding, fails on slang/evolving language, misses sarcasm and irony, domain-specific meanings ignored. Fast and simple, but accuracy ceiling around 70-80%.',
		diagram: {
			nodes: [
				{ id: 'dict', label: 'Dictionary Method', type: 'treatment', x: 130, y: 90 },
				{ id: 'fast', label: 'Fast & Simple', type: 'outcome', x: 290, y: 50 },
				{ id: 'limited', label: '70-80% Accuracy', type: 'confounder', x: 290, y: 130 }
			],
			edges: [
				{ id: 'd-f', source: 'dict', target: 'fast', label: 'pro' },
				{ id: 'd-l', source: 'dict', target: 'limited', label: 'con' }
			]
		},
		highlights: ['limited'],
		annotations: [{ targetId: 'limited', text: 'Ceiling on accuracy', position: 'bottom' }]
	}
];

const dictionarySection: ContentSection = {
	id: 'dictionary-methods',
	type: 'explanation',
	title: 'Dictionary-Based Methods',
	explanation: {
		steps: dictionarySteps
	}
};

// =============================================================================
// Section 3: BERT Introduction - Animated Explanation
// =============================================================================

const bertSteps: ExplanationStep[] = [
	{
		id: 'bert-1',
		title: 'What is BERT?',
		description:
			'BERT = Bidirectional Encoder Representations from Transformers. Released by Google in 2018, it revolutionized NLP by understanding context from both directions simultaneously. BERT reads the entire sentence at once, not word by word.',
		diagram: {
			nodes: [
				{ id: 'bert', label: 'BERT', type: 'treatment', x: 210, y: 90 }
			],
			edges: []
		},
		highlights: ['bert'],
		annotations: [{ targetId: 'bert', text: 'Bidirectional Encoder Representations from Transformers', position: 'bottom' }]
	},
	{
		id: 'bert-2',
		title: 'Bidirectional Context',
		description:
			'The key innovation: "Bidirectional" means BERT considers context from BOTH left and right of each word. Old models read left-to-right only. BERT sees the full sentence when understanding any word.',
		diagram: {
			nodes: [
				{ id: 'left', label: 'Left Context', type: 'treatment', x: 80, y: 90 },
				{ id: 'word', label: 'Target Word', type: 'variable', x: 210, y: 90 },
				{ id: 'right', label: 'Right Context', type: 'control', x: 340, y: 90 }
			],
			edges: [
				{ id: 'l-w', source: 'left', target: 'word', label: 'informs' },
				{ id: 'r-w', source: 'right', target: 'word', label: 'informs' }
			]
		},
		highlights: ['left', 'right'],
		annotations: [{ targetId: 'word', text: 'Both directions', position: 'bottom' }]
	},
	{
		id: 'bert-3',
		title: 'Old vs New Approach',
		description:
			'Old models (RNNs, LSTMs): Process words sequentially, left-to-right. By the time they reach "sick", they have lost context from earlier words. BERT: Processes all words simultaneously, maintaining full context for every position.',
		diagram: {
			nodes: [
				{ id: 'old', label: 'Old: Sequential', type: 'confounder', x: 130, y: 60 },
				{ id: 'new', label: 'BERT: Simultaneous', type: 'outcome', x: 130, y: 130 },
				{ id: 'context', label: 'Full Context', type: 'outcome', x: 300, y: 130 }
			],
			edges: [
				{ id: 'n-c', source: 'new', target: 'context', label: 'enables' }
			]
		},
		highlights: ['new', 'context'],
		annotations: [{ targetId: 'context', text: 'Complete understanding', position: 'right' }]
	},
	{
		id: 'bert-4',
		title: 'Solving the Slang Problem',
		description:
			'"This phone is sick!" - BERT sees "phone" + "is" + context of tech review → understands "sick" is positive slang. The bidirectional context allows BERT to disambiguate word meanings based on surrounding words.',
		diagram: {
			nodes: [
				{ id: 'input', label: '"This phone is sick!"', type: 'treatment', x: 80, y: 90 },
				{ id: 'context', label: 'Full Context', type: 'variable', x: 210, y: 90 },
				{ id: 'correct', label: 'Result: Positive', type: 'outcome', x: 340, y: 90 }
			],
			edges: [
				{ id: 'i-c', source: 'input', target: 'context', label: 'analyzes' },
				{ id: 'c-r', source: 'context', target: 'correct', label: 'understands' }
			]
		},
		highlights: ['correct'],
		annotations: [{ targetId: 'correct', text: 'Context-aware', position: 'bottom' }]
	}
];

const bertSection: ContentSection = {
	id: 'bert-introduction',
	type: 'explanation',
	title: 'BERT Introduction',
	explanation: {
		steps: bertSteps
	}
};

// =============================================================================
// Section 4: Pretraining Tasks - Diagram
// =============================================================================

const pretrainingDiagram: DiagramData = {
	nodes: [
		{ id: 'bert', label: 'BERT Training', type: 'treatment', x: 60, y: 90 },
		{ id: 'mlm', label: 'Masked Language Modeling', type: 'control', x: 200, y: 50 },
		{ id: 'nsp', label: 'Next Sentence Prediction', type: 'variable', x: 200, y: 130 },
		{ id: 'knowledge', label: 'Language Knowledge', type: 'outcome', x: 350, y: 90 }
	],
	edges: [
		{ id: 'b-m', source: 'bert', target: 'mlm' },
		{ id: 'b-n', source: 'bert', target: 'nsp' },
		{ id: 'm-k', source: 'mlm', target: 'knowledge' },
		{ id: 'n-k', source: 'nsp', target: 'knowledge' }
	]
};

const pretrainingSection: ContentSection = {
	id: 'pretraining-tasks',
	type: 'diagram',
	title: 'Pretraining Tasks',
	diagram: pretrainingDiagram,
	content: `BERT learns language through two pretraining tasks on massive text corpora (Wikipedia, books, web pages).

**Task 1: Masked Language Modeling (MLM)**

- Random words in sentences are masked (hidden)
- BERT predicts the masked words
- Example: "The cat sat on the [MASK]" → BERT predicts "mat"
- This teaches BERT word relationships and context

**Task 2: Next Sentence Prediction (NSP)**

- Given two sentences, predict if B follows A
- Example: "The man went to the store." + "He bought milk." → Yes
- Example: "The man went to the store." + "Penguins live in Antarctica." → No
- This teaches BERT document structure and discourse

**The Result:**

After pretraining on billions of words:
- BERT understands grammar and syntax
- BERT understands word meanings in context
- BERT understands relationships between sentences
- BERT has general "language knowledge"

**Key Insight:**
Pretraining is unsupervised - BERT learns from raw text without labels. This knowledge then transfers to specific tasks like sentiment analysis.`
};

// =============================================================================
// Section 5: Fine-Tuning
// =============================================================================

const fineTuningSection: ContentSection = {
	id: 'fine-tuning',
	type: 'text',
	title: 'Fine-Tuning for Sentiment',
	content: `After pretraining, BERT has general language understanding. **Fine-tuning** adapts this knowledge to a specific task like sentiment classification.

**The Fine-Tuning Process:**

1. Take pretrained BERT (language knowledge)
2. Add a classification layer on top
3. Train on labeled sentiment data (reviews with positive/negative labels)
4. BERT adjusts its weights slightly for sentiment task

**Fine-Tuning Dataset Example:**

| Text | Label |
|------|-------|
| "Amazing product, highly recommend!" | Positive |
| "Broke after one week, waste of money" | Negative |
| "Does what it says, nothing special" | Neutral |

**Output Format:**

Fine-tuned BERT outputs:
- **Label**: Positive, Negative, or Neutral
- **Confidence Score**: 0.0 to 1.0

Example: "We are very happy with this purchase"
- Label: Positive
- Confidence: 0.9998

**DistilBERT: A Lighter Alternative**

- DistilBERT is a compressed version of BERT
- 40% smaller, 60% faster
- 97% of BERT's performance
- Often preferred for production deployment

**Key Insight:**
Fine-tuning is efficient - you need only thousands of labeled examples (not millions) because BERT already understands language from pretraining.`
};

// =============================================================================
// Section 6: BERT vs Dictionary - Diagram
// =============================================================================

const comparisonDiagram: DiagramData = {
	nodes: [
		{ id: 'dict', label: 'Dictionary Methods', type: 'treatment', x: 100, y: 50 },
		{ id: 'bert', label: 'BERT/Transformers', type: 'control', x: 100, y: 130 },
		{ id: 'fast', label: 'Fast', type: 'outcome', x: 220, y: 30 },
		{ id: 'simple', label: 'Simple', type: 'outcome', x: 300, y: 50 },
		{ id: 'nocontext', label: 'No Context', type: 'confounder', x: 380, y: 30 },
		{ id: 'slow', label: 'Slower', type: 'confounder', x: 220, y: 150 },
		{ id: 'complex', label: 'Complex', type: 'confounder', x: 300, y: 130 },
		{ id: 'context', label: 'Full Context', type: 'outcome', x: 380, y: 150 }
	],
	edges: [
		{ id: 'd-f', source: 'dict', target: 'fast' },
		{ id: 'd-s', source: 'dict', target: 'simple' },
		{ id: 'd-n', source: 'dict', target: 'nocontext' },
		{ id: 'b-sl', source: 'bert', target: 'slow' },
		{ id: 'b-c', source: 'bert', target: 'complex' },
		{ id: 'b-co', source: 'bert', target: 'context' }
	]
};

const comparisonSection: ContentSection = {
	id: 'bert-vs-dictionary',
	type: 'diagram',
	title: 'BERT vs Dictionary Methods',
	diagram: comparisonDiagram,
	content: `Choosing between dictionary methods and BERT depends on your use case.

**Dictionary Methods**

| Aspect | Assessment |
|--------|------------|
| Speed | Very fast (milliseconds) |
| Setup | Simple, no training needed |
| Accuracy | 70-80% |
| Context | None |
| Resources | Minimal |

**Best for:** Quick analysis, limited compute, simple texts, exploratory work

**BERT/Transformers**

| Aspect | Assessment |
|--------|------------|
| Speed | Slower (needs GPU for scale) |
| Setup | Requires fine-tuning |
| Accuracy | 85-95% |
| Context | Full bidirectional |
| Resources | Significant |

**Best for:** Production systems, complex texts, high-stakes decisions

**Decision Framework:**

\`\`\`
If (volume > 1M documents AND accuracy critical):
    → Use BERT with GPU infrastructure

If (exploratory analysis OR limited resources):
    → Start with dictionary methods

If (domain-specific language):
    → Fine-tune BERT on domain data
\`\`\`

**Key Insight:**
The accuracy vs. speed trade-off is real. Many teams use dictionary methods for initial filtering, then BERT for final classification of important cases.`
};

// =============================================================================
// Export Lecture Content
// =============================================================================

export const lectureContent: LectureContent = {
	lectureId: 'sentiment-analysis',
	sections: [
		purposeSection,
		dictionarySection,
		bertSection,
		pretrainingSection,
		fineTuningSection,
		comparisonSection
	]
};
