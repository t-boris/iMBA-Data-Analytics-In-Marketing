/**
 * Module 3: User, Firm & AI-Generated Content - Question Bank
 *
 * Contains 50 flashcard questions covering all 10 lectures:
 * - L1: Introduction to Online Content
 * - L2: Text Analysis - Historical Perspective
 * - L3: Types of Content
 * - L4: UGC Deep Dive
 * - L5: FGC Deep Dive
 * - L6: AGC Deep Dive
 * - L7: Online Content Emerging Concerns
 * - L8: Influencer Marketing Introduction
 * - L9: Sentiment Analysis Application
 * - L10: Python Demo: Sentiment Pipeline
 *
 * Distribution: 10 easy (20%), 27 medium (54%), 13 hard (26%)
 * Coverage: 4-6 questions per lecture
 */

import type { Question } from '../types';

export const module3Questions: Question[] = [
	// =============================================================================
	// LECTURE 1: Introduction to Online Content (5 questions: 1 easy, 3 medium, 1 hard)
	// =============================================================================

	// L1 - Easy
	{
		id: 'm3-l1-e1',
		question: 'What are the three main types of online content discussed in this module?',
		answer:
			'User-Generated Content (UGC) - created by consumers; Firm-Generated Content (FGC) - created by brands; AI-Generated Content (AGC) - created by artificial intelligence. Each type has different authenticity perceptions and trust levels.',
		difficulty: 'easy',
		lectureId: 1
	},

	// L1 - Medium
	{
		id: 'm3-l1-m1',
		question: 'What is Net Promoter Score (NPS) and how is it calculated?',
		answer:
			'NPS = % Promoters (9-10 rating) - % Detractors (0-6 rating). Passives (7-8) are not counted. NPS ranges from -100 to +100. Above 0 is positive, above 50 is excellent, above 70 is world-class. It measures customer loyalty and advocacy likelihood.',
		difficulty: 'medium',
		lectureId: 1
	},
	{
		id: 'm3-l1-m2',
		question: 'What is social listening and what are its key steps?',
		answer:
			'Social listening is monitoring online conversations about brands, products, and industries. Key steps: (1) Monitor & Track - collect mentions from social media, forums, reviews; (2) Analyze Sentiment - determine tone; (3) Extract Themes - identify patterns; (4) Generate Actionable Insights - inform business decisions.',
		difficulty: 'medium',
		lectureId: 1
	},
	{
		id: 'm3-l1-m3',
		question: 'Why is UGC often considered more trustworthy than FGC?',
		answer:
			'UGC is more trusted because: (1) No commercial relationship with the brand; (2) Represents real user experiences; (3) Includes both positive and negative feedback; (4) Written in natural consumer language. Consumers know FGC has promotional intent, which triggers skepticism.',
		difficulty: 'medium',
		lectureId: 1
	},

	// L1 - Hard
	{
		id: 'm3-l1-h1',
		question: 'How does the content ecosystem create a feedback loop that affects brand perception?',
		answer:
			'UGC shapes consumer expectations → Expectations affect purchase decisions → Experiences generate new UGC → This shapes future expectations. FGC tries to influence this loop but faces trust barriers. AGC complicates the ecosystem by blurring authenticity signals. Brands must manage all three content types strategically.',
		difficulty: 'hard',
		lectureId: 1
	},

	// =============================================================================
	// LECTURE 2: Text Analysis - Historical Perspective (4 questions: 1 easy, 2 medium, 1 hard)
	// =============================================================================

	// L2 - Easy
	{
		id: 'm3-l2-e1',
		question: 'How has the dominant form of communication evolved over time?',
		answer:
			'Evolution: Oral tradition (stories passed verbally) → Written text (manuscripts, books) → Print media (mass production) → Digital text (instant, global, interactive). Each transition increased scale and speed but also introduced new challenges like misinformation.',
		difficulty: 'easy',
		lectureId: 2
	},

	// L2 - Medium
	{
		id: 'm3-l2-m1',
		question: 'How did online user reviews fundamentally change consumer behavior?',
		answer:
			'User reviews created a trust chain: Reviews → Social Proof → Reduced Uncertainty → Purchase Decision. Before reviews, consumers relied on brand claims and personal networks. Reviews democratized information access, shifted power to consumers, and created accountability for product quality.',
		difficulty: 'medium',
		lectureId: 2
	},
	{
		id: 'm3-l2-m2',
		question: 'What risks does the digital text era introduce for content authenticity?',
		answer:
			'Digital text introduces: (1) Scale of misinformation - false content spreads instantly; (2) Authenticity challenges - hard to verify sources; (3) Manipulation potential - fake reviews, bots, coordinated campaigns; (4) Echo chambers - algorithmic reinforcement of existing beliefs. Verification becomes critical.',
		difficulty: 'medium',
		lectureId: 2
	},

	// L2 - Hard
	{
		id: 'm3-l2-h1',
		question: 'Why might the shift to digital text be considered both democratizing and destabilizing?',
		answer:
			'Democratizing: Everyone can publish, no gatekeepers, information accessibility, consumer empowerment. Destabilizing: No quality control, misinformation spreads easily, trust becomes harder to establish, overwhelming volume makes signal extraction difficult. The same features that empower also create chaos.',
		difficulty: 'hard',
		lectureId: 2
	},

	// =============================================================================
	// LECTURE 3: Types of Content (5 questions: 1 easy, 3 medium, 1 hard)
	// =============================================================================

	// L3 - Easy
	{
		id: 'm3-l3-e1',
		question: 'What is the relationship between content authenticity and consumer trust?',
		answer:
			'Authenticity drives trust: Authentic Content → Perceived Trust → Engagement → Conversion. UGC typically scores highest on authenticity (no commercial intent), FGC medium (known bias), AGC lowest when disclosed (artificial origin). Trust is the mediating variable to conversion.',
		difficulty: 'easy',
		lectureId: 3
	},

	// L3 - Medium
	{
		id: 'm3-l3-m1',
		question: 'Compare the perceived authenticity of UGC, FGC, and AGC.',
		answer:
			'UGC: Highest authenticity - unbiased peer experiences. FGC: Medium - consumers expect commercial intent but value useful information. AGC: Lowest when known - even identical quality content loses trust when AI origin is revealed. This creates the "AGC paradox."',
		difficulty: 'medium',
		lectureId: 3
	},
	{
		id: 'm3-l3-m2',
		question: 'What is content receptivity and why does it matter?',
		answer:
			'Content receptivity is the degree to which consumers are open to being influenced by content. It varies by: (1) Content type - UGC more receptive; (2) Consumer characteristics - prior attitudes, involvement; (3) Context - product category, decision stage. Matching content to receptivity improves effectiveness.',
		difficulty: 'medium',
		lectureId: 3
	},
	{
		id: 'm3-l3-m3',
		question: 'What factors determine which type of content is most effective for a brand?',
		answer:
			'Effectiveness depends on: (1) Goal - awareness (FGC/influencer) vs trust (UGC); (2) Product type - experience goods benefit more from UGC; (3) Consumer stage - early: FGC for information, late: UGC for validation; (4) Authenticity requirements - sensitive categories need more UGC.',
		difficulty: 'medium',
		lectureId: 3
	},

	// L3 - Hard
	{
		id: 'm3-l3-h1',
		question: 'How should a brand strategically balance UGC, FGC, and AGC in its content mix?',
		answer:
			'Strategic balance: Use FGC for controlled messaging and product information. Amplify UGC for social proof and authenticity. Consider AGC for scale and consistency, with transparency about AI origin. Monitor content ecosystem health. Key: UGC validates FGC claims; AGC supports at scale but cannot replace authentic UGC.',
		difficulty: 'hard',
		lectureId: 3
	},

	// =============================================================================
	// LECTURE 4: UGC Deep Dive (6 questions: 1 easy, 3 medium, 2 hard)
	// =============================================================================

	// L4 - Easy
	{
		id: 'm3-l4-e1',
		question: 'What are the four key UGC metrics for a dashboard?',
		answer:
			'(1) Ratings - numerical scores (1-5 stars), aggregatable; (2) Chatter - volume of mentions and discussions; (3) Positive Valence - praise, satisfaction, enthusiasm; (4) Negative Valence - complaints, problems, disappointment. Together they provide comprehensive UGC health.',
		difficulty: 'easy',
		lectureId: 4
	},

	// L4 - Medium
	{
		id: 'm3-l4-m1',
		question: 'What is negativity bias and why does it matter for UGC analysis?',
		answer:
			'Negativity bias is the tendency for negative information to have 2-5x more impact than positive information of equal intensity. Implications: One negative review outweighs multiple positive reviews; brands must prioritize addressing negative content; negative valence requires special monitoring.',
		difficulty: 'medium',
		lectureId: 4
	},
	{
		id: 'm3-l4-m2',
		question: 'What is fit uncertainty and how do Q&A sections help address it?',
		answer:
			'Fit uncertainty is consumer doubt about whether a product suits their specific situation. Q&A sections help by: (1) Allowing specific situation questions; (2) Providing peer-to-peer trusted answers; (3) Creating informed purchases with calibrated expectations. Result: higher conversion, fewer returns, better satisfaction.',
		difficulty: 'medium',
		lectureId: 4
	},
	{
		id: 'm3-l4-m3',
		question: 'What factors drive content virality according to the lecture?',
		answer:
			'Virality drivers: (1) Social Currency - sharing makes people look good; (2) Emotional Resonance - strong emotions (humor, surprise, inspiration, outrage); (3) Practical Value - useful information worth sharing; (4) Narrative Quality - compelling story structure. Content must score high on multiple dimensions.',
		difficulty: 'medium',
		lectureId: 4
	},

	// L4 - Hard
	{
		id: 'm3-l4-h1',
		question: 'Explain the UGC impact chain from metrics to revenue.',
		answer:
			'UGC Metrics → Perceived Quality → Trust → Conversion → Sales. Each component: Ratings provide headline credibility; Chatter indicates social proof; Positive valence shows enthusiasm; Negative valence signals risk. The chain shows UGC is not just feedback - it is a marketing asset that directly affects revenue.',
		difficulty: 'hard',
		lectureId: 4
	},
	{
		id: 'm3-l4-h2',
		question: 'A product has high chatter but declining valence. What does this indicate and how should the brand respond?',
		answer:
			'High chatter + declining valence suggests: The product has visibility but growing problems. People are talking, but increasingly negatively. Brand should: (1) Analyze negative valence for specific issues; (2) Check for product defects or unmet expectations; (3) Address root causes, not symptoms; (4) Consider managerial responses to negative reviews. This is a warning signal, not necessarily crisis.',
		difficulty: 'hard',
		lectureId: 4
	},

	// =============================================================================
	// LECTURE 5: FGC Deep Dive (6 questions: 1 easy, 3 medium, 2 hard)
	// =============================================================================

	// L5 - Easy
	{
		id: 'm3-l5-e1',
		question: 'What is a managerial response and why is it important?',
		answer:
			'A managerial response is an official brand reply to user-generated content, especially reviews. It is important because: (1) Shows the brand is listening; (2) Can convert negative experiences to positive perceptions; (3) Signals to other readers that the brand cares; (4) Provides opportunity to clarify or resolve issues.',
		difficulty: 'easy',
		lectureId: 5
	},

	// L5 - Medium
	{
		id: 'm3-l5-m1',
		question: 'What makes a managerial response effective versus ineffective?',
		answer:
			'Effective: Personalized to the specific situation, acknowledges the experience, provides concrete solution, genuine tone. Ineffective: Generic templates, defensive language, ignores the actual complaint, overly corporate tone. Research shows personalized responses significantly outperform generic templates.',
		difficulty: 'medium',
		lectureId: 5
	},
	{
		id: 'm3-l5-m2',
		question: 'What is the receptivity-valence-susceptibility framework for FGC effectiveness?',
		answer:
			'Framework: Content Receptivity (is consumer open?) > Valence of Response (positive/helpful tone?) > Customer Susceptibility (individual responsiveness). All three must align for FGC to be effective. Low receptivity customers will not respond regardless of response quality.',
		difficulty: 'medium',
		lectureId: 5
	},
	{
		id: 'm3-l5-m3',
		question: 'When should a brand use rational versus emotional responses to reviews?',
		answer:
			'Rational responses (facts, solutions): Best for functional complaints, product defects, factual errors, B2B contexts. Emotional responses (empathy, appreciation): Best for experience-based complaints, emotional dissatisfaction, service failures. Match response type to complaint type for maximum effectiveness.',
		difficulty: 'medium',
		lectureId: 5
	},

	// L5 - Hard
	{
		id: 'm3-l5-h1',
		question: 'How does responding to reviews affect not just the reviewer but other readers?',
		answer:
			'Third-party effects: Other readers observe how the brand handles complaints. A good response signals: (1) Accountability - brand owns problems; (2) Responsiveness - brand will help if issues arise; (3) Trustworthiness - brand is honest about limitations. This can be more valuable than converting the original reviewer.',
		difficulty: 'hard',
		lectureId: 5
	},
	{
		id: 'm3-l5-h2',
		question: 'A brand receives a highly detailed negative review. Should they respond publicly, privately, or both? Why?',
		answer:
			'Optimal strategy: Both. Public response: Acknowledge issue, demonstrate accountability, signal responsiveness to other readers. Private follow-up: Resolve specific details, offer compensation if warranted, avoid public back-and-forth. Public shows you care; private resolves the issue. Never argue publicly.',
		difficulty: 'hard',
		lectureId: 5
	},

	// =============================================================================
	// LECTURE 6: AGC Deep Dive (6 questions: 1 easy, 3 medium, 2 hard)
	// =============================================================================

	// L6 - Easy
	{
		id: 'm3-l6-e1',
		question: 'What is a Large Language Model (LLM)?',
		answer:
			'An LLM is an AI model trained on massive text datasets that can generate human-like text, answer questions, and perform language tasks. Examples include GPT-4 and Claude. They are characterized by: training on billions of words, ability to follow complex instructions, and broad knowledge across domains.',
		difficulty: 'easy',
		lectureId: 6
	},

	// L6 - Medium
	{
		id: 'm3-l6-m1',
		question: 'What is the attention mechanism and why is it important for LLMs?',
		answer:
			'The attention mechanism allows models to weigh the importance of different input parts simultaneously. Unlike older models that processed words sequentially, attention enables: (1) Parallel processing of all words; (2) Understanding which words relate to each other; (3) Capturing long-range dependencies. This is the breakthrough enabling modern NLP.',
		difficulty: 'medium',
		lectureId: 6
	},
	{
		id: 'm3-l6-m2',
		question: 'What is the AGC authenticity paradox?',
		answer:
			'AGC can generate high-quality content often indistinguishable from human writing. Yet when consumers learn content is AI-generated, trust drops significantly - even for identical content. Paradox: The quality is good, but the source matters. This suggests authenticity is about source attribution, not just content quality.',
		difficulty: 'medium',
		lectureId: 6
	},
	{
		id: 'm3-l6-m3',
		question: 'What is content homogenization and why is it a concern?',
		answer:
			'Content homogenization is the tendency for AI-generated content to converge toward similar styles and patterns. Concerns: (1) Reduced content diversity; (2) Loss of unique brand voices; (3) Indistinguishable content across competitors; (4) Potential for misinformation to spread if patterns are copied. Brands must actively maintain differentiation.',
		difficulty: 'medium',
		lectureId: 6
	},

	// L6 - Hard
	{
		id: 'm3-l6-h1',
		question: 'Should brands disclose when they use AI-generated content? What are the tradeoffs?',
		answer:
			'Tradeoffs: Disclosure: Builds long-term trust, avoids backlash if discovered, may be legally required. Non-disclosure: Maintains perceived authenticity short-term, risks trust damage if revealed. Recommendation: Disclose, because: (1) Risk of discovery is high; (2) Trust recovery is harder than initial trust building; (3) Regulatory pressure is increasing. Transparency is becoming the default expectation.',
		difficulty: 'hard',
		lectureId: 6
	},
	{
		id: 'm3-l6-h2',
		question: 'How might AGC change the competitive dynamics of content marketing?',
		answer:
			'AGC changes competition: (1) Lowers barriers - everyone can produce volume; (2) Shifts advantage to authenticity - UGC and genuine experiences become more valuable; (3) Speed increases - faster response cycles; (4) Homogenization risk - differentiation becomes harder. Winners will be brands that use AGC for efficiency while maintaining authentic human connections.',
		difficulty: 'hard',
		lectureId: 6
	},

	// =============================================================================
	// LECTURE 7: Online Content Emerging Concerns (5 questions: 1 easy, 3 medium, 1 hard)
	// =============================================================================

	// L7 - Easy
	{
		id: 'm3-l7-e1',
		question: 'What is the typical lifecycle of fake reviews?',
		answer:
			'Lifecycle: (1) Fake reviews created (purchased/coordinated); (2) Short-term sales boost; (3) Campaign ends; (4) Real customers arrive with mismatched expectations; (5) Ratings drop, often below baseline. Fake reviews backfire for genuinely poor products.',
		difficulty: 'easy',
		lectureId: 7
	},

	// L7 - Medium
	{
		id: 'm3-l7-m1',
		question: 'What signals help detect suspicious reviews?',
		answer:
			'Detection signals: Linguistic (generic language, superlative overuse, short length); Behavioral (publication timing spikes, single-review accounts, bimodal ratings); Network (reviewer clusters, same IP/device, copy-paste content). Combining multiple signals improves detection accuracy.',
		difficulty: 'medium',
		lectureId: 7
	},
	{
		id: 'm3-l7-m2',
		question: 'How does misinformation affect consumer willingness to pay?',
		answer:
			'Impact chain: False Claims → Perceived Risk Increases → Willingness to Pay Decreases → Demand Falls. Even if consumers do not fully believe claims, uncertainty creates hesitation. They demand a "risk discount" or switch to competitors. Recovery requires proactive correction.',
		difficulty: 'medium',
		lectureId: 7
	},
	{
		id: 'm3-l7-m3',
		question: 'What makes corrective communication effective against misinformation?',
		answer:
			'Effective correction requires: (1) Quick response - first 24-48 hours critical; (2) Transparent data - verifiable evidence, third-party validation; (3) Verifiable facts - specific, checkable claims. Ineffective: aggressive denial, attacking messenger, ignoring issue, overclaiming. Trust recovery is slower than destruction.',
		difficulty: 'medium',
		lectureId: 7
	},

	// L7 - Hard
	{
		id: 'm3-l7-h1',
		question: 'How do platform business models affect content moderation and data quality for analysts?',
		answer:
			'Ad-supported platforms incentivize more content/engagement, leading to laxer moderation. Subscription platforms incentivize quality, leading to stricter moderation. Implication: Data from different platforms has different biases. Analysts must ask: What moderation shaped this data? What was removed? Data ≠ Truth, Data = Signal + Noise + Platform Bias.',
		difficulty: 'hard',
		lectureId: 7
	},

	// =============================================================================
	// LECTURE 8: Influencer Marketing (5 questions: 1 easy, 3 medium, 1 hard)
	// =============================================================================

	// L8 - Easy
	{
		id: 'm3-l8-e1',
		question: 'What are the four influencer tiers and their typical engagement rates?',
		answer:
			'Mega (1M+): 1-2% engagement; Macro (100K-1M): 2-3%; Micro (10K-100K): 3-5%; Nano (<10K): 5-8%+. Key insight: Engagement rate is inversely correlated with follower count. Smaller influencers have higher engagement due to personal connection.',
		difficulty: 'easy',
		lectureId: 8
	},

	// L8 - Medium
	{
		id: 'm3-l8-m1',
		question: 'Why do smaller influencers often have higher engagement rates?',
		answer:
			'Smaller influencers have higher engagement because: (1) Personal connection - can actually reply to followers; (2) Niche relevance - followers self-selected for interest; (3) Authenticity perception - feels less commercial; (4) Algorithm boost - platforms may favor engaged communities. Trust density matters more than audience size.',
		difficulty: 'medium',
		lectureId: 8
	},
	{
		id: 'm3-l8-m2',
		question: 'What is the inverted U relationship in influencer posting frequency?',
		answer:
			'Effectiveness peaks at moderate posting frequency: Too little → missed opportunity; Optimal → maximum effectiveness; Too much → audience fatigue and trust erosion. Brands and influencers must find the sweet spot. Excessive sponsored content degrades authenticity perception.',
		difficulty: 'medium',
		lectureId: 8
	},
	{
		id: 'm3-l8-m3',
		question: 'What makes live stream commerce effective?',
		answer:
			'Live commerce combines: (1) Live demo - see product in action; (2) Real-time Q&A - immediate answers; (3) Urgency - limited-time offers; (4) Instant purchase - integrated buy button. Stats show +107% revenue for sellers using livestream. It collapses the funnel - awareness to purchase in one session.',
		difficulty: 'medium',
		lectureId: 8
	},

	// L8 - Hard
	{
		id: 'm3-l8-h1',
		question: 'A brand is deciding between one mega-influencer or 50 nano-influencers for the same budget. What factors should guide this decision?',
		answer:
			'Decision factors: Awareness goal → mega (reach); Conversion goal → nanos (trust/engagement); Brand category → nanos for trust-intensive products; Geographic targeting → nanos for local markets; Content authenticity → nanos feel more genuine. Also consider: campaign management complexity with 50 partners vs 1. Often the best strategy combines tiers.',
		difficulty: 'hard',
		lectureId: 8
	},

	// =============================================================================
	// LECTURE 9: Sentiment Analysis Application (4 questions: 1 easy, 2 medium, 1 hard)
	// =============================================================================

	// L9 - Easy
	{
		id: 'm3-l9-e1',
		question: 'What is sentiment analysis and what are its output categories?',
		answer:
			'Sentiment analysis is automatic classification of text by emotional tone. Output categories: Positive (praise, satisfaction), Negative (complaints, problems), Neutral (factual, informational). It transforms unstructured text into structured data for dashboards and decisions.',
		difficulty: 'easy',
		lectureId: 9
	},

	// L9 - Medium
	{
		id: 'm3-l9-m1',
		question: 'What are the limitations of dictionary-based sentiment analysis?',
		answer:
			'Dictionary limitations: (1) No context understanding - "sick phone" misclassified; (2) Fails on slang/evolving language; (3) Misses sarcasm and irony; (4) Domain-specific meanings ignored; (5) Accuracy ceiling ~70-80%. Fast and simple, but limited by word-by-word processing.',
		difficulty: 'medium',
		lectureId: 9
	},
	{
		id: 'm3-l9-m2',
		question: 'What is BERT and why does bidirectional context matter?',
		answer:
			'BERT (Bidirectional Encoder Representations from Transformers) processes all words simultaneously, understanding context from both left and right. This matters because: Word meanings depend on context ("sick" can be negative or positive slang). Old models processed left-to-right only, losing context. BERT achieves 85-95% accuracy.',
		difficulty: 'medium',
		lectureId: 9
	},

	// L9 - Hard
	{
		id: 'm3-l9-h1',
		question: 'When should a company choose dictionary methods versus transformer models for sentiment analysis?',
		answer:
			'Choose dictionary: Exploratory analysis, limited compute, simple texts, quick results needed, low-stakes decisions. Choose transformers: Production systems, complex texts, high-stakes decisions, domain-specific language (with fine-tuning). Hybrid approach: Use dictionary for initial filtering, transformers for final classification of important cases. Consider accuracy vs speed tradeoff.',
		difficulty: 'hard',
		lectureId: 9
	},

	// =============================================================================
	// LECTURE 10: Python Demo - Sentiment Pipeline (4 questions: 1 easy, 2 medium, 1 hard)
	// =============================================================================

	// L10 - Easy
	{
		id: 'm3-l10-e1',
		question: 'What are the main text preprocessing steps in an NLP pipeline?',
		answer:
			'Preprocessing steps: (1) Tokenization - split text into tokens; (2) Lemmatization - reduce to base form (running → run); (3) POS Tagging - identify parts of speech; (4) Stop Word Removal - remove common words like "the", "is". Result: clean, normalized text ready for analysis.',
		difficulty: 'easy',
		lectureId: 10
	},

	// L10 - Medium
	{
		id: 'm3-l10-m1',
		question: 'What is tokenization and why is it the foundation of NLP?',
		answer:
			'Tokenization splits text into individual units (tokens) - usually words and punctuation. Example: "I love this!" → ["I", "love", "this", "!"]. It is foundational because all subsequent NLP processing operates on tokens, not raw strings. Different tokenization choices affect downstream analysis.',
		difficulty: 'medium',
		lectureId: 10
	},
	{
		id: 'm3-l10-m2',
		question: 'How does batch processing improve sentiment analysis efficiency?',
		answer:
			'Batch processing: Process multiple texts together instead of one-by-one. Benefits: (1) GPU parallelization - process 32+ texts simultaneously; (2) Reduced overhead - fewer model loading operations; (3) Better throughput - 10,000 reviews in minutes vs hours. Use batch_size parameter in transformers pipeline.',
		difficulty: 'medium',
		lectureId: 10
	},

	// L10 - Hard
	{
		id: 'm3-l10-h1',
		question: 'What are the limitations of automated sentiment analysis even with state-of-the-art models?',
		answer:
			'Limitations: (1) Domain shift - model trained on movie reviews may fail on medical texts; (2) Sarcasm/irony - still challenging for all methods; (3) Nuance - "not bad" is mildly positive but may classify negative; (4) Context - short texts lack signal; (5) Language evolution - new slang confuses models. Use for scale and prioritization, not as absolute truth.',
		difficulty: 'hard',
		lectureId: 10
	}
];
