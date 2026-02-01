/**
 * Lecture 5: FGC Deep Dive
 *
 * This lecture covers Firm-Generated Content effectiveness and strategies:
 * - FGC business impact
 * - FGC effectiveness model (valence, receptivity, susceptibility)
 * - Managerial response types (rational, emotional, mixed)
 * - Response personalization effects
 * - Online vs offline response strategy
 * - Analysis methods (transformers, embeddings, LDA)
 */

import type { LectureContent, ContentSection } from '../types';
import type { DiagramData } from '$lib/components/diagrams';
import type { ExplanationStep } from '$lib/components/animation';

// =============================================================================
// Section 1: FGC Business Impact
// =============================================================================

const fgcBusinessImpactSection: ContentSection = {
	id: 'fgc-business-impact',
	type: 'text',
	title: 'FGC Business Impact',
	content: `Firm-Generated Content is not decorative - it is a measurable financial lever. Research consistently shows that FGC directly affects key business metrics.

**Research Findings:**

Studies show FGC positively impacts:
- **Customer spending** - Engaged customers spend more
- **Cross-buying** - Content exposure increases category exploration
- **Customer profitability** - Content-engaged customers have higher LTV
- **Brand consideration** - FGC keeps brands in consideration sets

**The FGC Value Chain:**

\`\`\`
FGC → Engagement → More Buying → Higher Customer Value
\`\`\`

Each step in this chain is measurable:
1. Content reach and engagement metrics
2. Purchase frequency and basket size
3. Customer lifetime value calculations

**Why It Matters:**

Many organizations treat content as a cost center. But FGC should be treated as an investment with calculable ROI:
- Track content-attributed conversions
- Measure engagement-to-revenue pathways
- Attribute customer value to content touchpoints

**Strategic Implication:**

Content is not decoration. It is a business driver that deserves rigorous measurement and optimization.`
};

// =============================================================================
// Section 2: FGC Effectiveness Model - Animated Explanation
// =============================================================================

const fgcEffectivenessSteps: ExplanationStep[] = [
	{
		id: 'eff-1',
		title: 'Valence',
		description:
			'Valence refers to the tone of the FGC message - positive, neutral, or negative. Positive valence includes promotional enthusiasm, appreciation, and good news. Neutral valence is informational. Negative acknowledgment happens in crisis or complaint responses. Valence matters, but it is not the strongest factor.',
		diagram: {
			nodes: [{ id: 'valence', label: 'Valence (Tone)', type: 'treatment', x: 210, y: 90 }],
			edges: []
		},
		highlights: ['valence'],
		annotations: [{ targetId: 'valence', text: 'Positive/Neutral/Negative tone', position: 'bottom' }]
	},
	{
		id: 'eff-2',
		title: 'Receptivity',
		description:
			'Receptivity is the audience\'s readiness to receive the message. This is the STRONGEST factor in FGC effectiveness. Receptivity depends on: timing (is this the right moment?), context (is the customer in buying mode?), relationship (does the customer trust the brand?). The same content performs vastly differently based on receptivity.',
		diagram: {
			nodes: [
				{ id: 'valence', label: 'Valence', type: 'treatment', x: 130, y: 90 },
				{ id: 'receptivity', label: 'Receptivity', type: 'outcome', x: 290, y: 90 }
			],
			edges: []
		},
		highlights: ['receptivity'],
		annotations: [{ targetId: 'receptivity', text: 'STRONGEST factor', position: 'bottom' }]
	},
	{
		id: 'eff-3',
		title: 'Customer Susceptibility',
		description:
			'Customer susceptibility is individual responsiveness to marketing messages. Some customers are highly susceptible - they respond to FGC readily. Others are resistant - they ignore or dismiss FGC. Susceptibility varies by customer and can be measured through response history.',
		diagram: {
			nodes: [
				{ id: 'valence', label: 'Valence', type: 'treatment', x: 80, y: 90 },
				{ id: 'receptivity', label: 'Receptivity', type: 'outcome', x: 210, y: 90 },
				{ id: 'susceptibility', label: 'Customer Susceptibility', type: 'control', x: 360, y: 90 }
			],
			edges: []
		},
		highlights: ['susceptibility'],
		annotations: [{ targetId: 'susceptibility', text: 'Individual responsiveness', position: 'bottom' }]
	},
	{
		id: 'eff-4',
		title: 'Effectiveness Hierarchy',
		description:
			'Research reveals a clear hierarchy: Receptivity > Valence > Susceptibility. Context matters more than content. The right message at the wrong time fails. The adequate message at the perfect time succeeds. Focus on reaching customers when they are receptive.',
		diagram: {
			nodes: [
				{ id: 'effectiveness', label: 'FGC Effectiveness', type: 'outcome', x: 210, y: 30 },
				{ id: 'receptivity', label: 'Receptivity', type: 'outcome', x: 120, y: 100 },
				{ id: 'valence', label: 'Valence', type: 'treatment', x: 210, y: 100 },
				{ id: 'susceptibility', label: 'Susceptibility', type: 'control', x: 310, y: 100 },
				{ id: 'rank', label: '1st > 2nd > 3rd', type: 'variable', x: 210, y: 170 }
			],
			edges: [
				{ id: 'r-e', source: 'receptivity', target: 'effectiveness', label: '1st' },
				{ id: 'v-e', source: 'valence', target: 'effectiveness', label: '2nd' },
				{ id: 's-e', source: 'susceptibility', target: 'effectiveness', label: '3rd' }
			]
		},
		highlights: ['receptivity', 'effectiveness'],
		annotations: [{ targetId: 'rank', text: 'Importance ranking', position: 'bottom' }]
	},
	{
		id: 'eff-5',
		title: 'Key Insight',
		description:
			'"Context matters more than content." This is the central insight for FGC strategy. Brands should invest heavily in: timing optimization, audience segmentation by receptivity, contextual triggers, and personalization based on customer state - not just message crafting.',
		diagram: {
			nodes: [
				{ id: 'insight', label: 'Context > Content', type: 'outcome', x: 210, y: 40 },
				{ id: 'timing', label: 'Timing', type: 'variable', x: 80, y: 120 },
				{ id: 'segmentation', label: 'Segmentation', type: 'variable', x: 170, y: 120 },
				{ id: 'triggers', label: 'Triggers', type: 'variable', x: 250, y: 120 },
				{ id: 'personalization', label: 'Personalization', type: 'variable', x: 350, y: 120 }
			],
			edges: [
				{ id: 't-i', source: 'timing', target: 'insight' },
				{ id: 's-i', source: 'segmentation', target: 'insight' },
				{ id: 'tr-i', source: 'triggers', target: 'insight' },
				{ id: 'p-i', source: 'personalization', target: 'insight' }
			]
		},
		highlights: ['insight'],
		annotations: [{ targetId: 'insight', text: 'Strategic priority', position: 'top' }]
	}
];

const fgcEffectivenessSection: ContentSection = {
	id: 'fgc-effectiveness-model',
	type: 'explanation',
	title: 'FGC Effectiveness Model',
	explanation: {
		steps: fgcEffectivenessSteps
	}
};

// =============================================================================
// Section 3: Managerial Response Types - Animated Explanation
// =============================================================================

const responseTypeSteps: ExplanationStep[] = [
	{
		id: 'resp-1',
		title: 'Rational Response',
		description:
			'Rational responses focus on facts, procedures, and solutions. Example: "We apologize for the delay. Your order shipped via tracking #12345 and will arrive by Friday." Rational responses are professional and informative but may feel cold or impersonal.',
		diagram: {
			nodes: [
				{ id: 'rational', label: 'Rational Response', type: 'treatment', x: 210, y: 60 },
				{ id: 'facts', label: 'Facts', type: 'variable', x: 120, y: 140 },
				{ id: 'procedures', label: 'Procedures', type: 'variable', x: 210, y: 140 },
				{ id: 'solutions', label: 'Solutions', type: 'variable', x: 310, y: 140 }
			],
			edges: [
				{ id: 'r-f', source: 'rational', target: 'facts' },
				{ id: 'r-p', source: 'rational', target: 'procedures' },
				{ id: 'r-s', source: 'rational', target: 'solutions' }
			]
		},
		highlights: ['rational'],
		annotations: [{ targetId: 'rational', text: 'Professional but potentially cold', position: 'top' }]
	},
	{
		id: 'resp-2',
		title: 'Emotional Response',
		description:
			'Emotional responses focus on empathy, apology, and recognition of feelings. Example: "We are so sorry to hear about your frustrating experience. We understand how disappointing this must have been." Emotional responses feel caring but may lack substance.',
		diagram: {
			nodes: [
				{ id: 'emotional', label: 'Emotional Response', type: 'control', x: 210, y: 60 },
				{ id: 'empathy', label: 'Empathy', type: 'variable', x: 120, y: 140 },
				{ id: 'apology', label: 'Apology', type: 'variable', x: 210, y: 140 },
				{ id: 'recognition', label: 'Recognition', type: 'variable', x: 310, y: 140 }
			],
			edges: [
				{ id: 'e-em', source: 'emotional', target: 'empathy' },
				{ id: 'e-a', source: 'emotional', target: 'apology' },
				{ id: 'e-r', source: 'emotional', target: 'recognition' }
			]
		},
		highlights: ['emotional'],
		annotations: [{ targetId: 'emotional', text: 'Caring but may lack substance', position: 'top' }]
	},
	{
		id: 'resp-3',
		title: 'Mixed Response',
		description:
			'Mixed responses combine both rational and emotional elements. Example: "We are truly sorry for your frustrating experience - you deserve better. Your order has been reshipped via express (tracking #12345) and will arrive tomorrow. We have also added a 20% credit to your account." This approach is MOST EFFECTIVE.',
		diagram: {
			nodes: [
				{ id: 'mixed', label: 'Mixed Response', type: 'outcome', x: 210, y: 30 },
				{ id: 'empathy', label: 'Empathy', type: 'control', x: 100, y: 100 },
				{ id: 'facts', label: 'Facts', type: 'treatment', x: 210, y: 100 },
				{ id: 'solution', label: 'Solution', type: 'treatment', x: 320, y: 100 },
				{ id: 'most-effective', label: 'MOST EFFECTIVE', type: 'outcome', x: 210, y: 170 }
			],
			edges: [
				{ id: 'm-e', source: 'mixed', target: 'empathy' },
				{ id: 'm-f', source: 'mixed', target: 'facts' },
				{ id: 'm-s', source: 'mixed', target: 'solution' },
				{ id: 'e-me', source: 'empathy', target: 'most-effective' },
				{ id: 'f-me', source: 'facts', target: 'most-effective' },
				{ id: 's-me', source: 'solution', target: 'most-effective' }
			]
		},
		highlights: ['mixed', 'most-effective'],
		annotations: [{ targetId: 'most-effective', text: 'Combines both approaches', position: 'bottom' }]
	},
	{
		id: 'resp-4',
		title: 'Effectiveness Ranking',
		description:
			'Research shows consistent ranking: Mixed > Emotional > Rational (in isolation). Customers want to feel heard AND get their problem solved. Pure rational feels dismissive. Pure emotional feels hollow. The combination demonstrates both care and competence.',
		diagram: {
			nodes: [
				{ id: 'ranking', label: 'Effectiveness Ranking', type: 'variable', x: 210, y: 30 },
				{ id: 'mixed', label: 'Mixed (Best)', type: 'outcome', x: 130, y: 100 },
				{ id: 'emotional', label: 'Emotional', type: 'control', x: 210, y: 100 },
				{ id: 'rational', label: 'Rational', type: 'treatment', x: 290, y: 100 }
			],
			edges: [
				{ id: 'r-m', source: 'ranking', target: 'mixed', label: '1st' },
				{ id: 'r-e', source: 'ranking', target: 'emotional', label: '2nd' },
				{ id: 'r-r', source: 'ranking', target: 'rational', label: '3rd' }
			]
		},
		highlights: ['mixed'],
		annotations: [{ targetId: 'mixed', text: 'Care + Competence', position: 'bottom' }]
	}
];

const responseTypeSection: ContentSection = {
	id: 'managerial-response-types',
	type: 'explanation',
	title: 'Managerial Response Types',
	explanation: {
		steps: responseTypeSteps
	}
};

// =============================================================================
// Section 4: Response Personalization - Diagram
// =============================================================================

const personalizationDiagram: DiagramData = {
	nodes: [
		{ id: 'generic', label: 'Generic Template', type: 'confounder', x: 60, y: 50 },
		{ id: 'low-impact', label: 'Low Impact', type: 'confounder', x: 200, y: 50 },
		{ id: 'personalized', label: 'Personalized Response', type: 'treatment', x: 60, y: 130 },
		{ id: 'higher-ratings', label: 'Higher Ratings', type: 'outcome', x: 200, y: 100 },
		{ id: 'higher-sales', label: 'Higher Sales', type: 'outcome', x: 200, y: 160 }
	],
	edges: [
		{ id: 'g-l', source: 'generic', target: 'low-impact', label: 'leads to' },
		{ id: 'p-hr', source: 'personalized', target: 'higher-ratings', label: 'drives' },
		{ id: 'p-hs', source: 'personalized', target: 'higher-sales', label: 'drives' }
	]
};

const personalizationSection: ContentSection = {
	id: 'response-personalization',
	type: 'diagram',
	title: 'Response Personalization',
	diagram: personalizationDiagram,
	content: `Personalization in managerial responses significantly impacts effectiveness.

**Generic vs Personalized:**

| Response Type | Characteristics | Impact |
|---------------|-----------------|--------|
| Generic Template | "We apologize for any inconvenience" | Low - feels scripted |
| Personalized | Addresses specific issues mentioned | High - feels genuine |

**What Personalization Means:**

Effective personalization:
- References specific details from the customer's complaint
- Addresses the particular product or service mentioned
- Acknowledges the specific impact on the customer
- Offers solutions tailored to their situation

**Research Finding:**

Studies show personalized responses lead to:
- Higher subsequent ratings from the same reviewer
- Increased purchase likelihood
- Better brand perception among observers

**Critical Insight: Respond to Positive Reviews Too**

Most brands only respond to negative reviews. But research shows that responding to positive reviews:
- Increases customer loyalty
- Encourages future UGC
- Signals appreciation to observers
- Builds community engagement

**Recommendation:**

Develop response frameworks (not templates) that guide personalization while ensuring key elements are included.`
};

// =============================================================================
// Section 5: Online vs Offline Response Strategy
// =============================================================================

const onlineOfflineSection: ContentSection = {
	id: 'online-offline-strategy',
	type: 'text',
	title: 'Online vs Offline Response Strategy',
	content: `Response strategy differs fundamentally between online and offline contexts because of the audience.

**Offline Response (Private Conversation):**

In private customer service interactions:
- **Full acceptance of blame** is usually optimal
- Customer is the only audience
- Goal is resolution and retention
- Admitting fault shows accountability
- No concern about observer perception

**Online Response (Public Performance):**

In public online responses:
- **Moderate defense can work** (carefully)
- Observers are watching and judging
- Both complainant and brand reputation matter
- Complete capitulation may seem weak
- Some context/explanation can be appropriate

**Key Insight:**

> "Online response = public performance, not private conversation"

Every online response is read by:
- The original complainer
- Potential customers evaluating the brand
- Competitors looking for weaknesses
- Media scanning for stories

**The Balance:**

Online responses must balance:
- **Acknowledgment** - Show you take concerns seriously
- **Brand protection** - Don't admit to things you didn't do
- **Professionalism** - Never get defensive or hostile
- **Resolution** - Offer concrete steps forward

**Best Practices:**

1. Take hostile exchanges to private channels
2. Respond publicly but resolve privately
3. Show empathy without accepting false claims
4. Provide factual context when appropriate
5. Always offer a path to resolution`
};

// =============================================================================
// Section 6: Analysis Methods
// =============================================================================

const analysisMethodsSection: ContentSection = {
	id: 'analysis-methods',
	type: 'text',
	title: 'Analysis Methods',
	content: `Modern text analysis methods reveal what drives FGC effectiveness.

**Transformer Models for Classification:**

**RoBERTa** (Robustly Optimized BERT Approach) can classify:
- Response strategies (rational/emotional/mixed)
- Sentiment at scale
- Topic categorization
- Intent detection

These models understand context, handling nuance that keyword approaches miss.

**Sentence Embeddings for Similarity:**

Sentence embedding models convert text to numerical vectors. This enables:
- Finding similar responses/complaints
- Clustering conversation types
- Measuring response-to-complaint alignment
- Detecting anomalies and outliers

**LDA for Topic Extraction:**

Latent Dirichlet Allocation (LDA) identifies:
- Common complaint themes
- Recurring response patterns
- Topic trends over time
- Content gaps

**What Text Analysis Reveals:**

| Analysis Type | Business Insight |
|---------------|------------------|
| Response classification | Which strategies work best |
| Sentiment tracking | How perception changes over time |
| Topic extraction | What customers care about |
| Similarity analysis | Response consistency |

**The Value:**

Text analysis connects FGC to outcomes:
- Which response types correlate with re-purchase?
- What topics predict churn?
- How does response time affect resolution?
- What language drives positive rating changes?

**Key Insight:**

> "Text analysis reveals what drives revenue"

The combination of NLP and business outcomes data allows optimization of FGC strategy based on evidence, not intuition.`
};

// =============================================================================
// Export Lecture Content
// =============================================================================

export const lectureContent: LectureContent = {
	lectureId: 'fgc-deep-dive',
	sections: [
		fgcBusinessImpactSection,
		fgcEffectivenessSection,
		responseTypeSection,
		personalizationSection,
		onlineOfflineSection,
		analysisMethodsSection
	]
};
