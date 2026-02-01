/**
 * Lecture 10: Python Demo - Sentiment Analysis Pipeline
 *
 * This lecture covers practical NLP implementation:
 * - NLP pipeline overview
 * - Text preprocessing steps (tokenization, lemmatization, POS tagging)
 * - spaCy processing demonstration
 * - Transformer pipeline with Hugging Face
 * - Batch processing for scale
 * - Business applications and limitations
 */

import type { LectureContent, ContentSection } from '../types';
import type { DiagramData } from '$lib/components/diagrams';
import type { ExplanationStep } from '$lib/components/animation';

// =============================================================================
// Section 1: NLP Pipeline Overview
// =============================================================================

const overviewSection: ContentSection = {
	id: 'nlp-pipeline-overview',
	type: 'text',
	title: 'NLP Pipeline Overview',
	content: `This lecture demonstrates a complete sentiment analysis pipeline in Python - from raw text to sentiment classification.

**The Full Pipeline:**

\`\`\`
Raw Text → Preprocessing → Model → Sentiment Label + Score
\`\`\`

**Key Libraries:**

| Library | Purpose |
|---------|---------|
| **pandas** | Data manipulation, DataFrame operations |
| **spaCy** | Text preprocessing, tokenization, NLP utilities |
| **transformers** | Hugging Face library for BERT/DistilBERT models |

**Data Source:**

We'll use Amazon product reviews as our example dataset:
- Real consumer feedback
- Mix of positive/negative/neutral
- Variable length and complexity
- Common business use case

**Pipeline Architecture:**

1. **Load Data** - Read reviews into pandas DataFrame
2. **Preprocess** - Clean and normalize text with spaCy
3. **Classify** - Apply transformer model for sentiment
4. **Aggregate** - Summarize results for business insights

**Why This Stack?**

- **pandas** - Industry standard for data manipulation
- **spaCy** - Fast, production-ready NLP
- **transformers** - State-of-the-art accuracy

**Key Insight:**
This pipeline can process thousands of reviews in minutes, providing insights that would take human analysts weeks to generate manually.`
};

// =============================================================================
// Section 2: Text Preprocessing Steps - Animated Explanation
// =============================================================================

const preprocessingSteps: ExplanationStep[] = [
	{
		id: 'prep-1',
		title: 'Tokenization',
		description:
			'Tokenization splits text into individual units (tokens). For English, this usually means words and punctuation. "I love this product!" becomes ["I", "love", "this", "product", "!"]. This is the foundation of all NLP processing.',
		diagram: {
			nodes: [
				{ id: 'text', label: '"I love this!"', type: 'treatment', x: 100, y: 90 },
				{ id: 'tokens', label: '["I", "love", "this", "!"]', type: 'outcome', x: 300, y: 90 }
			],
			edges: [{ id: 't-tk', source: 'text', target: 'tokens', label: 'tokenize' }]
		},
		highlights: ['tokens'],
		annotations: [{ targetId: 'tokens', text: 'Split into units', position: 'bottom' }]
	},
	{
		id: 'prep-2',
		title: 'Lemmatization',
		description:
			'Lemmatization reduces words to their base form (lemma). "running" → "run", "better" → "good", "was" → "be". This normalizes vocabulary so the model sees fewer unique words while preserving meaning.',
		diagram: {
			nodes: [
				{ id: 'running', label: '"running"', type: 'treatment', x: 80, y: 60 },
				{ id: 'better', label: '"better"', type: 'treatment', x: 80, y: 120 },
				{ id: 'run', label: '"run"', type: 'outcome', x: 280, y: 60 },
				{ id: 'good', label: '"good"', type: 'outcome', x: 280, y: 120 }
			],
			edges: [
				{ id: 'r-r', source: 'running', target: 'run', label: 'lemmatize' },
				{ id: 'b-g', source: 'better', target: 'good', label: 'lemmatize' }
			]
		},
		highlights: ['run', 'good'],
		annotations: [{ targetId: 'run', text: 'Base form', position: 'right' }]
	},
	{
		id: 'prep-3',
		title: 'POS Tagging',
		description:
			'Part-of-Speech (POS) tagging identifies the grammatical role of each token. "I" = PRON, "love" = VERB, "this" = DET, "product" = NOUN. POS tags help disambiguate word meanings and enable grammar-aware analysis.',
		diagram: {
			nodes: [
				{ id: 'i', label: 'I → PRON', type: 'treatment', x: 70, y: 60 },
				{ id: 'love', label: 'love → VERB', type: 'control', x: 70, y: 100 },
				{ id: 'this', label: 'this → DET', type: 'variable', x: 70, y: 140 },
				{ id: 'product', label: 'product → NOUN', type: 'outcome', x: 280, y: 100 }
			],
			edges: []
		},
		highlights: ['i', 'love', 'this', 'product'],
		annotations: [{ targetId: 'love', text: 'Grammatical roles', position: 'right' }]
	},
	{
		id: 'prep-4',
		title: 'Stop Word Removal',
		description:
			'Stop words are common words with little semantic value: "the", "is", "and", "a", "in". Removing them reduces noise and focuses analysis on meaningful content words. "The product is great" → "product great".',
		diagram: {
			nodes: [
				{ id: 'full', label: '"The product is great"', type: 'treatment', x: 100, y: 90 },
				{ id: 'clean', label: '"product great"', type: 'outcome', x: 310, y: 90 }
			],
			edges: [{ id: 'f-c', source: 'full', target: 'clean', label: 'remove stops' }]
		},
		highlights: ['clean'],
		annotations: [{ targetId: 'clean', text: 'Focus on content words', position: 'bottom' }]
	},
	{
		id: 'prep-5',
		title: 'Clean Text Ready',
		description:
			'After preprocessing, text is normalized and ready for analysis. The pipeline: Raw → Tokenize → Lemmatize → POS Tag → Remove Stops → Clean. For transformer models, some preprocessing is optional (they handle raw text well).',
		diagram: {
			nodes: [
				{ id: 'raw', label: 'Raw Text', type: 'treatment', x: 50, y: 90 },
				{ id: 'tokenize', label: 'Tokenize', type: 'variable', x: 130, y: 90 },
				{ id: 'lemma', label: 'Lemmatize', type: 'variable', x: 210, y: 90 },
				{ id: 'pos', label: 'POS Tag', type: 'variable', x: 290, y: 90 },
				{ id: 'clean', label: 'Clean', type: 'outcome', x: 370, y: 90 }
			],
			edges: [
				{ id: 'r-t', source: 'raw', target: 'tokenize' },
				{ id: 't-l', source: 'tokenize', target: 'lemma' },
				{ id: 'l-p', source: 'lemma', target: 'pos' },
				{ id: 'p-c', source: 'pos', target: 'clean' }
			]
		},
		highlights: ['clean'],
		annotations: [{ targetId: 'clean', text: 'Ready for model', position: 'bottom' }]
	}
];

const preprocessingSection: ContentSection = {
	id: 'text-preprocessing',
	type: 'explanation',
	title: 'Text Preprocessing Steps',
	explanation: {
		steps: preprocessingSteps
	}
};

// =============================================================================
// Section 3: spaCy Processing - Diagram
// =============================================================================

const spacyDiagram: DiagramData = {
	nodes: [
		{ id: 'input', label: '"I love this device"', type: 'treatment', x: 50, y: 30 },
		{ id: 'nlp', label: 'spaCy nlp()', type: 'control', x: 50, y: 90 },
		{ id: 'doc', label: 'Doc Object', type: 'variable', x: 170, y: 90 },
		{ id: 'tokens', label: 'Tokens', type: 'outcome', x: 280, y: 50 },
		{ id: 'lemmas', label: 'Lemmas', type: 'outcome', x: 280, y: 90 },
		{ id: 'pos', label: 'POS Tags', type: 'outcome', x: 280, y: 130 }
	],
	edges: [
		{ id: 'i-n', source: 'input', target: 'nlp' },
		{ id: 'n-d', source: 'nlp', target: 'doc', label: 'process' },
		{ id: 'd-t', source: 'doc', target: 'tokens' },
		{ id: 'd-l', source: 'doc', target: 'lemmas' },
		{ id: 'd-p', source: 'doc', target: 'pos' }
	]
};

const spacySection: ContentSection = {
	id: 'spacy-processing',
	type: 'diagram',
	title: 'spaCy Processing',
	diagram: spacyDiagram,
	content: `**spaCy** is a fast, production-ready NLP library. Here's how it processes text:

**Basic Usage:**

\`\`\`python
import spacy

# Load English model
nlp = spacy.load("en_core_web_sm")

# Process text
doc = nlp("I love this device")

# Access tokens
for token in doc:
    print(token.text, token.lemma_, token.pos_)
\`\`\`

**Output:**

| Token | Lemma | POS |
|-------|-------|-----|
| I | I | PRON |
| love | love | VERB |
| this | this | DET |
| device | device | NOUN |

**The Doc Object:**

spaCy's \`Doc\` object contains rich annotations:
- \`token.text\` - Original text
- \`token.lemma_\` - Base form
- \`token.pos_\` - Part of speech
- \`token.dep_\` - Syntactic dependency
- \`token.is_stop\` - Is it a stop word?

**Why spaCy?**

- Fast: Optimized Cython code
- Accurate: State-of-the-art models
- Production-ready: Scales to millions of documents
- Batteries included: Tokenization, NER, POS, parsing in one call`
};

// =============================================================================
// Section 4: Transformer Pipeline
// =============================================================================

const transformerSection: ContentSection = {
	id: 'transformer-pipeline',
	type: 'text',
	title: 'Transformer Pipeline',
	content: `The **Hugging Face transformers** library provides pre-built sentiment analysis pipelines.

**Basic Usage:**

\`\`\`python
from transformers import pipeline

# Create sentiment pipeline (downloads model automatically)
sentiment_pipeline = pipeline("sentiment-analysis")

# Analyze text
result = sentiment_pipeline("We are very happy with this purchase")
print(result)
\`\`\`

**Output:**

\`\`\`python
[{'label': 'POSITIVE', 'score': 0.9998}]
\`\`\`

**Understanding the Output:**

| Field | Value | Meaning |
|-------|-------|---------|
| label | POSITIVE | Predicted sentiment class |
| score | 0.9998 | Model confidence (0-1) |

**Using DistilBERT:**

\`\`\`python
# Specify DistilBERT for faster inference
sentiment = pipeline(
    "sentiment-analysis",
    model="distilbert-base-uncased-finetuned-sst-2-english"
)
\`\`\`

**Batch Processing:**

\`\`\`python
texts = [
    "Great product, highly recommend!",
    "Terrible quality, broke immediately",
    "It's okay, nothing special"
]

results = sentiment_pipeline(texts)
# Returns list of {label, score} for each text
\`\`\`

**Key Insight:**
With just 3 lines of code, you have access to state-of-the-art sentiment analysis. The hard work (training, optimization) is already done.`
};

// =============================================================================
// Section 5: Batch Processing - Diagram
// =============================================================================

const batchDiagram: DiagramData = {
	nodes: [
		{ id: 'reviews', label: '1000 Reviews', type: 'treatment', x: 50, y: 90 },
		{ id: 'model', label: 'Sentiment Model', type: 'control', x: 170, y: 90 },
		{ id: 'labels', label: 'Labels + Scores', type: 'outcome', x: 290, y: 90 },
		{ id: 'df', label: 'DataFrame', type: 'outcome', x: 390, y: 90 }
	],
	edges: [
		{ id: 'r-m', source: 'reviews', target: 'model', label: 'batch' },
		{ id: 'm-l', source: 'model', target: 'labels', label: 'classify' },
		{ id: 'l-d', source: 'labels', target: 'df', label: 'store' }
	]
};

const batchSection: ContentSection = {
	id: 'batch-processing',
	type: 'diagram',
	title: 'Batch Processing',
	diagram: batchDiagram,
	content: `For real-world applications, you need to process thousands or millions of reviews efficiently.

**Complete Pipeline Example:**

\`\`\`python
import pandas as pd
from transformers import pipeline

# Load data
df = pd.read_csv("amazon_reviews.csv")

# Initialize model
sentiment = pipeline("sentiment-analysis", device=0)  # GPU

# Process in batches
def analyze_batch(texts, batch_size=32):
    results = []
    for i in range(0, len(texts), batch_size):
        batch = texts[i:i+batch_size]
        batch_results = sentiment(batch)
        results.extend(batch_results)
    return results

# Apply to dataframe
results = analyze_batch(df['review_text'].tolist())

# Add results to dataframe
df['sentiment'] = [r['label'] for r in results]
df['confidence'] = [r['score'] for r in results]
\`\`\`

**Performance Tips:**

| Optimization | Impact |
|--------------|--------|
| Use GPU | 10-50x faster |
| Batch processing | More efficient than one-by-one |
| Use DistilBERT | 60% faster than BERT |
| Truncate long texts | Faster processing |

**Result DataFrame:**

| review_text | sentiment | confidence |
|-------------|-----------|------------|
| "Great product!" | POSITIVE | 0.9995 |
| "Broke after a week" | NEGATIVE | 0.9987 |
| "It works fine" | POSITIVE | 0.7823 |

**Key Insight:**
With proper batching and GPU, you can process 10,000 reviews in under a minute.`
};

// =============================================================================
// Section 6: Business Applications
// =============================================================================

const applicationsSection: ContentSection = {
	id: 'business-applications',
	type: 'text',
	title: 'Business Applications',
	content: `Sentiment analysis output feeds into various business applications and decisions.

**Application 1: Aggregate Sentiment Tracking**

\`\`\`python
# Calculate sentiment distribution
sentiment_counts = df['sentiment'].value_counts(normalize=True)

# Track over time
monthly_sentiment = df.groupby('month')['sentiment'].apply(
    lambda x: (x == 'POSITIVE').mean()
)
\`\`\`

**Application 2: Product Problem Detection**

\`\`\`python
# Find common themes in negative reviews
negative_reviews = df[df['sentiment'] == 'NEGATIVE']
# Apply topic modeling or keyword extraction
\`\`\`

**Application 3: Early Warning System**

\`\`\`python
# Alert if negative sentiment spikes
if daily_negative_rate > threshold:
    send_alert("Negative sentiment spike detected!")
\`\`\`

**The Analysis Model:**

\`\`\`
Text → Sentiment → Aggregation → Insight → Action
\`\`\`

| Stage | Output |
|-------|--------|
| Text | Raw reviews |
| Sentiment | Labels + confidence |
| Aggregation | Trends, distributions |
| Insight | "Product X has quality issues" |
| Action | Investigate, fix, respond |

**Limitations to Remember:**

Even transformers are imperfect:
- **Domain shift** - Model trained on movie reviews may struggle with medical texts
- **Irony/sarcasm** - Still challenging for all methods
- **Nuance** - "Not bad" is mildly positive, may be classified as negative
- **Context** - Short texts have less signal

**Key Insight:**
Sentiment analysis is a tool for scale, not perfect accuracy. Use it to identify patterns and prioritize human review, not as final truth.`
};

// =============================================================================
// Export Lecture Content
// =============================================================================

export const lectureContent: LectureContent = {
	lectureId: 'python-sentiment-demo',
	sections: [
		overviewSection,
		preprocessingSection,
		spacySection,
		transformerSection,
		batchSection,
		applicationsSection
	]
};
