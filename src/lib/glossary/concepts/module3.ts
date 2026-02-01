/**
 * Module 3 glossary concepts: User, Firm & AI-Generated Content.
 * Contains ~40 core concepts covering all 10 lectures.
 */

import type { GlossaryConcept } from '../types';

// ============================================================================
// Module 3 Concepts (~40 concepts)
// ============================================================================

export const module3Concepts: GlossaryConcept[] = [
	// -------------------------------------------------------------------------
	// Content Types (Lectures 1, 3)
	// -------------------------------------------------------------------------
	{
		id: 'user-generated-content',
		term: 'User-Generated Content (UGC)',
		definition:
			'Content created by consumers rather than brands, including reviews, ratings, social media posts, and forum discussions.',
		extendedDefinition: `UGC is considered the most authentic form of online content because:

- Created by real users with no commercial relationship to the brand
- Represents genuine experiences (both positive and negative)
- Written in natural consumer language
- Trusted more than brand-created content

Examples: Amazon reviews, TripAdvisor ratings, Reddit discussions, YouTube unboxing videos.`,
		category: 'foundation',
		relatedConcepts: ['firm-generated-content', 'ai-generated-content', 'content-authenticity'],
		lectureId: 1,
		moduleId: '3',
		tags: ['content-type', 'core', 'authenticity']
	},
	{
		id: 'firm-generated-content',
		term: 'Firm-Generated Content (FGC)',
		definition:
			'Content created by companies and brands, including marketing materials, product descriptions, and official social media posts.',
		extendedDefinition: `FGC is brand-controlled content with known commercial intent:

- Professionally produced, on-brand messaging
- Includes advertising, product pages, blog posts
- Consumers expect promotional bias
- Can still provide value through information

The key challenge for FGC is overcoming skepticism about its objectivity.`,
		category: 'foundation',
		relatedConcepts: ['user-generated-content', 'managerial-response', 'content-authenticity'],
		lectureId: 1,
		moduleId: '3',
		tags: ['content-type', 'core', 'marketing']
	},
	{
		id: 'ai-generated-content',
		term: 'AI-Generated Content (AGC)',
		definition:
			'Content produced by artificial intelligence systems, including LLM-written text, AI images, and automated responses.',
		extendedDefinition: `AGC is the newest content category, raising unique challenges:

- Can be indistinguishable from human content
- Quality often matches or exceeds human writing
- Trust drops significantly when AI origin is revealed
- Creates authenticity paradox: good content, questioned source

AGC is transforming content production but faces disclosure and trust challenges.`,
		category: 'foundation',
		relatedConcepts: ['large-language-model', 'perceived-authenticity', 'content-homogenization'],
		lectureId: 1,
		moduleId: '3',
		tags: ['content-type', 'core', 'ai']
	},
	{
		id: 'content-authenticity',
		term: 'Content Authenticity',
		definition:
			'The degree to which content is perceived as genuine, trustworthy, and representative of real experiences or opinions.',
		category: 'foundation',
		relatedConcepts: ['user-generated-content', 'perceived-authenticity', 'fake-reviews'],
		lectureId: 3,
		moduleId: '3',
		tags: ['trust', 'core']
	},
	{
		id: 'content-receptivity',
		term: 'Content Receptivity',
		definition:
			'The degree to which consumers are open to receiving and being influenced by different types of content.',
		category: 'method',
		relatedConcepts: ['customer-susceptibility', 'response-personalization'],
		lectureId: 3,
		moduleId: '3',
		tags: ['consumer-behavior', 'effectiveness']
	},
	{
		id: 'social-listening',
		term: 'Social Listening',
		definition:
			'The process of monitoring online conversations to understand what customers are saying about brands, products, competitors, and industries.',
		extendedDefinition: `Social listening involves:

1. **Monitoring** - Collecting mentions from social media, forums, reviews
2. **Analysis** - Determining sentiment and extracting themes
3. **Insights** - Converting analysis into actionable business decisions

It enables brands to respond to issues, identify trends, and understand market perception.`,
		category: 'method',
		relatedConcepts: ['sentiment-analysis', 'chatter', 'valence'],
		lectureId: 1,
		moduleId: '3',
		tags: ['analytics', 'monitoring', 'research']
	},

	// -------------------------------------------------------------------------
	// UGC Metrics (Lecture 4)
	// -------------------------------------------------------------------------
	{
		id: 'net-promoter-score',
		term: 'Net Promoter Score (NPS)',
		definition:
			'A customer loyalty metric calculated as the percentage of Promoters (9-10 rating) minus Detractors (0-6 rating).',
		extendedDefinition: `NPS = % Promoters - % Detractors

Score interpretation:
- **Above 0**: More promoters than detractors
- **Above 50**: Excellent customer loyalty
- **Above 70**: World-class

NPS provides a simple benchmark for customer sentiment but lacks nuance about specific issues.`,
		category: 'method',
		relatedConcepts: ['ratings', 'valence', 'chatter'],
		lectureId: 1,
		moduleId: '3',
		tags: ['metric', 'loyalty', 'measurement']
	},
	{
		id: 'ratings',
		term: 'Ratings',
		definition:
			'Numerical scores, typically on a 1-5 star scale, that provide aggregatable measures of product or service quality.',
		category: 'method',
		relatedConcepts: ['valence', 'chatter', 'net-promoter-score'],
		lectureId: 4,
		moduleId: '3',
		tags: ['metric', 'ugc', 'measurement']
	},
	{
		id: 'chatter',
		term: 'Chatter',
		definition:
			'The volume of mentions and discussions about a product, brand, or topic in online content.',
		extendedDefinition: `Chatter indicates visibility and mindshare:

- High chatter = high visibility (positive or negative)
- Tracking over time reveals: launches, viral moments, crises
- Chatter can be positive, negative, or neutral
- Volume alone does not indicate sentiment`,
		category: 'method',
		relatedConcepts: ['valence', 'ratings', 'social-listening'],
		lectureId: 4,
		moduleId: '3',
		tags: ['metric', 'ugc', 'volume']
	},
	{
		id: 'valence',
		term: 'Valence',
		definition:
			'The emotional tone of content, categorized as positive valence (praise, satisfaction) or negative valence (complaints, problems).',
		category: 'method',
		relatedConcepts: ['sentiment-analysis', 'negativity-bias', 'chatter'],
		lectureId: 4,
		moduleId: '3',
		tags: ['metric', 'sentiment', 'emotion']
	},
	{
		id: 'negativity-bias',
		term: 'Negativity Bias',
		definition:
			'The cognitive tendency for negative information to have a disproportionately larger impact than positive information of equal intensity.',
		extendedDefinition: `In UGC context:

- Negative reviews have 2-5x more influence than positive reviews
- One detailed negative review can outweigh multiple positive reviews
- This is a fundamental cognitive bias in information processing

Implication: Brands must pay special attention to negative content.`,
		category: 'bias',
		relatedConcepts: ['valence', 'fake-reviews', 'misinformation'],
		lectureId: 4,
		moduleId: '3',
		tags: ['psychology', 'consumer-behavior', 'core']
	},
	{
		id: 'fit-uncertainty',
		term: 'Fit Uncertainty',
		definition:
			'Consumer uncertainty about whether a product will suit their specific situation, use case, or preferences.',
		category: 'foundation',
		relatedConcepts: ['user-generated-content', 'ratings'],
		lectureId: 4,
		moduleId: '3',
		tags: ['consumer-behavior', 'decision-making']
	},
	{
		id: 'social-currency',
		term: 'Social Currency',
		definition:
			'The social value gained by sharing content that makes the sharer look knowledgeable, insightful, or connected.',
		category: 'method',
		relatedConcepts: ['emotional-resonance', 'chatter'],
		lectureId: 4,
		moduleId: '3',
		tags: ['virality', 'sharing', 'psychology']
	},
	{
		id: 'emotional-resonance',
		term: 'Emotional Resonance',
		definition:
			'The capacity of content to trigger strong emotional responses, which drives sharing and virality.',
		category: 'method',
		relatedConcepts: ['social-currency', 'valence'],
		lectureId: 4,
		moduleId: '3',
		tags: ['virality', 'emotion', 'engagement']
	},

	// -------------------------------------------------------------------------
	// FGC Concepts (Lecture 5)
	// -------------------------------------------------------------------------
	{
		id: 'managerial-response',
		term: 'Managerial Response',
		definition:
			'Official brand responses to user-generated content, particularly reviews or complaints.',
		extendedDefinition: `Effective managerial responses:

- Acknowledge the customer's experience
- Provide specific solutions or explanations
- Demonstrate that the brand is listening
- Can convert negative experiences into positive perceptions

Research shows personalized responses outperform generic templates.`,
		category: 'method',
		relatedConcepts: ['response-personalization', 'customer-susceptibility', 'firm-generated-content'],
		lectureId: 5,
		moduleId: '3',
		tags: ['strategy', 'customer-service', 'engagement']
	},
	{
		id: 'response-personalization',
		term: 'Response Personalization',
		definition:
			'Tailoring brand responses to individual customer situations rather than using generic templates.',
		category: 'method',
		relatedConcepts: ['managerial-response', 'content-receptivity'],
		lectureId: 5,
		moduleId: '3',
		tags: ['strategy', 'effectiveness']
	},
	{
		id: 'customer-susceptibility',
		term: 'Customer Susceptibility',
		definition:
			'The degree to which individual customers are influenced by managerial responses or firm-generated content.',
		category: 'method',
		relatedConcepts: ['content-receptivity', 'managerial-response'],
		lectureId: 5,
		moduleId: '3',
		tags: ['consumer-behavior', 'segmentation']
	},

	// -------------------------------------------------------------------------
	// AGC/LLM Concepts (Lecture 6)
	// -------------------------------------------------------------------------
	{
		id: 'large-language-model',
		term: 'Large Language Model (LLM)',
		definition:
			'AI models trained on massive text datasets that can generate human-like text, answer questions, and perform various language tasks.',
		extendedDefinition: `LLMs like GPT-4 and Claude are characterized by:

- Training on billions of words of text
- Ability to generate coherent, contextual responses
- Broad knowledge across many domains
- Capability to follow complex instructions

They power chatbots, content generation, and automated analysis.`,
		category: 'nlp',
		relatedConcepts: ['transformer-architecture', 'ai-generated-content', 'attention-mechanism'],
		lectureId: 6,
		moduleId: '3',
		tags: ['technology', 'ai', 'core']
	},
	{
		id: 'transformer-architecture',
		term: 'Transformer Architecture',
		definition:
			'The neural network architecture underlying modern LLMs, characterized by attention mechanisms that process all input simultaneously.',
		category: 'nlp',
		relatedConcepts: ['attention-mechanism', 'large-language-model', 'bert'],
		lectureId: 6,
		moduleId: '3',
		tags: ['technology', 'architecture']
	},
	{
		id: 'attention-mechanism',
		term: 'Attention Mechanism',
		definition:
			'A technique allowing models to weigh the importance of different parts of the input when generating output.',
		extendedDefinition: `Attention enables:

- Processing all words simultaneously (not sequentially)
- Understanding which words are relevant to each other
- Capturing long-range dependencies in text
- Context-aware understanding of word meanings

This is the breakthrough that makes modern NLP possible.`,
		category: 'nlp',
		relatedConcepts: ['transformer-architecture', 'bert', 'large-language-model'],
		lectureId: 6,
		moduleId: '3',
		tags: ['technology', 'core']
	},
	{
		id: 'perceived-authenticity',
		term: 'Perceived Authenticity',
		definition:
			'The degree to which content is believed to be genuine and trustworthy by consumers.',
		category: 'foundation',
		relatedConcepts: ['content-authenticity', 'ai-generated-content'],
		lectureId: 6,
		moduleId: '3',
		tags: ['trust', 'psychology']
	},
	{
		id: 'content-homogenization',
		term: 'Content Homogenization',
		definition:
			'The tendency for AI-generated content to converge toward similar styles and patterns, reducing diversity.',
		category: 'bias',
		relatedConcepts: ['ai-generated-content', 'large-language-model'],
		lectureId: 6,
		moduleId: '3',
		tags: ['risk', 'ai']
	},
	{
		id: 'prompt-engineering',
		term: 'Prompt Engineering',
		definition:
			'The practice of crafting effective instructions for LLMs to generate desired outputs.',
		category: 'nlp',
		relatedConcepts: ['large-language-model', 'ai-generated-content'],
		lectureId: 6,
		moduleId: '3',
		tags: ['technique', 'ai']
	},

	// -------------------------------------------------------------------------
	// Content Risks (Lecture 7)
	// -------------------------------------------------------------------------
	{
		id: 'fake-reviews',
		term: 'Fake Reviews',
		definition:
			'Reviews that do not represent genuine consumer experiences, created through purchase, incentives, or coordination.',
		extendedDefinition: `Fake reviews follow a predictable lifecycle:

1. Created (purchased or incentivized)
2. Short-term sales boost
3. Campaign ends
4. Real customers arrive with mismatched expectations
5. Ratings drop below baseline

Detection signals: generic language, timing spikes, reviewer patterns.`,
		category: 'bias',
		relatedConcepts: ['content-authenticity', 'misinformation', 'negativity-bias'],
		lectureId: 7,
		moduleId: '3',
		tags: ['risk', 'manipulation', 'core']
	},
	{
		id: 'misinformation',
		term: 'Misinformation',
		definition:
			'False or inaccurate information that spreads regardless of intent to deceive.',
		extendedDefinition: `Misinformation impact chain:

False Claims → Perceived Risk ↑ → WTP ↓ → Demand ↓

Unlike fake reviews (which inflate), misinformation typically deflates - spreading false concerns about safety, quality, or ethics.`,
		category: 'bias',
		relatedConcepts: ['fake-reviews', 'willingness-to-pay', 'echo-chambers'],
		lectureId: 7,
		moduleId: '3',
		tags: ['risk', 'trust', 'core']
	},
	{
		id: 'echo-chambers',
		term: 'Echo Chambers',
		definition:
			'Information environments where users are primarily exposed to opinions that reinforce their existing beliefs.',
		category: 'bias',
		relatedConcepts: ['misinformation', 'moderation-bias'],
		lectureId: 7,
		moduleId: '3',
		tags: ['risk', 'platforms']
	},
	{
		id: 'moderation-bias',
		term: 'Moderation Bias',
		definition:
			'Systematic errors in content moderation systems that may over-remove certain viewpoints or miss sophisticated manipulation.',
		category: 'bias',
		relatedConcepts: ['echo-chambers', 'misinformation'],
		lectureId: 7,
		moduleId: '3',
		tags: ['risk', 'platforms', 'algorithms']
	},
	{
		id: 'willingness-to-pay',
		term: 'Willingness to Pay (WTP)',
		definition:
			'The maximum amount a consumer would pay for a product, which can be affected by perceived quality signals including reviews.',
		category: 'foundation',
		relatedConcepts: ['misinformation', 'ratings', 'valence'],
		lectureId: 7,
		moduleId: '3',
		tags: ['economics', 'consumer-behavior']
	},

	// -------------------------------------------------------------------------
	// Influencer Marketing (Lecture 8)
	// -------------------------------------------------------------------------
	{
		id: 'influencer',
		term: 'Influencer',
		definition:
			'An individual who has built credibility and audience trust in a specific domain, with the ability to affect purchase decisions.',
		extendedDefinition: `Key insight: An influencer is a channel of TRUST, not just reach.

What makes an influencer:
- Credibility in their domain
- Rapport with audience
- Perceived expertise
- Content creation ability`,
		category: 'method',
		relatedConcepts: ['engagement-rate', 'brand-influencer-fit', 'live-stream-commerce'],
		lectureId: 8,
		moduleId: '3',
		tags: ['marketing', 'core']
	},
	{
		id: 'engagement-rate',
		term: 'Engagement Rate',
		definition:
			'A metric calculated as (Likes + Comments + Shares) / Followers, measuring audience interaction with content.',
		extendedDefinition: `Typical benchmarks:

| Tier | Engagement Rate |
|------|-----------------|
| Mega (1M+) | 1-2% |
| Macro (100K-1M) | 2-3% |
| Micro (10K-100K) | 3-5% |
| Nano (<10K) | 5-8%+ |

Smaller influencers typically have higher engagement rates.`,
		category: 'method',
		relatedConcepts: ['influencer', 'brand-influencer-fit'],
		lectureId: 8,
		moduleId: '3',
		tags: ['metric', 'measurement', 'core']
	},
	{
		id: 'brand-influencer-fit',
		term: 'Brand-Influencer Fit',
		definition:
			'The alignment between a brand\'s identity and an influencer\'s persona, audience, and content style.',
		category: 'method',
		relatedConcepts: ['influencer', 'engagement-rate'],
		lectureId: 8,
		moduleId: '3',
		tags: ['strategy', 'effectiveness']
	},
	{
		id: 'live-stream-commerce',
		term: 'Live Stream Commerce',
		definition:
			'A format combining live video streaming with real-time shopping, allowing instant purchases during broadcasts.',
		extendedDefinition: `Live commerce combines:

- Live demonstration of products
- Real-time Q&A with viewers
- Urgency through limited-time offers
- Instant purchase integration

Stats show +107% revenue growth for sellers using livestream vs non-livestream.`,
		category: 'method',
		relatedConcepts: ['influencer', 'engagement-rate'],
		lectureId: 8,
		moduleId: '3',
		tags: ['channel', 'e-commerce', 'emerging']
	},
	{
		id: 'inverted-u-relationship',
		term: 'Inverted U Relationship',
		definition:
			'The pattern where effectiveness peaks at moderate levels and declines at both low and high extremes.',
		extendedDefinition: `In influencer marketing, applies to posting frequency:

- Too little: missed opportunity
- Optimal: maximum effectiveness
- Too much: audience fatigue, trust erosion

This pattern appears across many marketing contexts.`,
		category: 'method',
		relatedConcepts: ['influencer', 'engagement-rate'],
		lectureId: 8,
		moduleId: '3',
		tags: ['pattern', 'effectiveness']
	},

	// -------------------------------------------------------------------------
	// NLP/Sentiment Analysis (Lectures 9-10)
	// -------------------------------------------------------------------------
	{
		id: 'sentiment-analysis',
		term: 'Sentiment Analysis',
		definition:
			'The automatic classification of text by emotional tone, determining whether content is positive, negative, or neutral.',
		extendedDefinition: `Sentiment analysis transforms unstructured text into structured data:

Use cases:
- Product review aggregation
- Social media monitoring
- Customer support prioritization
- Market research at scale

Methods range from dictionary-based (fast, simple) to transformer-based (accurate, complex).`,
		category: 'nlp',
		relatedConcepts: ['bert', 'tokenization', 'valence'],
		lectureId: 9,
		moduleId: '3',
		tags: ['technique', 'analytics', 'core']
	},
	{
		id: 'bert',
		term: 'BERT',
		definition:
			'Bidirectional Encoder Representations from Transformers - a pre-trained language model that understands context from both directions.',
		extendedDefinition: `BERT revolutionized NLP by:

- Processing all words simultaneously
- Understanding context from left AND right
- Learning from massive text corpora
- Enabling fine-tuning for specific tasks

BERT achieves 85-95% accuracy on sentiment tasks vs 70-80% for dictionary methods.`,
		category: 'nlp',
		relatedConcepts: ['transformer-architecture', 'distilbert', 'sentiment-analysis'],
		lectureId: 9,
		moduleId: '3',
		tags: ['model', 'technology', 'core']
	},
	{
		id: 'distilbert',
		term: 'DistilBERT',
		definition:
			'A compressed version of BERT that is 40% smaller and 60% faster while retaining 97% of performance.',
		category: 'nlp',
		relatedConcepts: ['bert', 'sentiment-analysis'],
		lectureId: 9,
		moduleId: '3',
		tags: ['model', 'optimization']
	},
	{
		id: 'tokenization',
		term: 'Tokenization',
		definition:
			'The process of splitting text into individual units (tokens) such as words, subwords, or characters.',
		category: 'nlp',
		relatedConcepts: ['lemmatization', 'stop-words', 'part-of-speech-tagging'],
		lectureId: 10,
		moduleId: '3',
		tags: ['preprocessing', 'technique']
	},
	{
		id: 'lemmatization',
		term: 'Lemmatization',
		definition:
			'The process of reducing words to their base or dictionary form (lemma), such as "running" to "run".',
		category: 'nlp',
		relatedConcepts: ['tokenization', 'part-of-speech-tagging'],
		lectureId: 10,
		moduleId: '3',
		tags: ['preprocessing', 'technique']
	},
	{
		id: 'stop-words',
		term: 'Stop Words',
		definition:
			'Common words with little semantic value (e.g., "the", "is", "and") that are often removed during text preprocessing.',
		category: 'nlp',
		relatedConcepts: ['tokenization', 'lemmatization'],
		lectureId: 10,
		moduleId: '3',
		tags: ['preprocessing', 'technique']
	},
	{
		id: 'part-of-speech-tagging',
		term: 'Part-of-Speech Tagging',
		definition:
			'The process of identifying the grammatical role (noun, verb, adjective, etc.) of each word in text.',
		category: 'nlp',
		relatedConcepts: ['tokenization', 'lemmatization'],
		lectureId: 10,
		moduleId: '3',
		tags: ['preprocessing', 'technique']
	}
];
