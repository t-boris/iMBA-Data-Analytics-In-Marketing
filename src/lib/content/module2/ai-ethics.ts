/**
 * Lecture 6: AI Ethics in Marketing
 *
 * This lecture covers:
 * - AI as a double-edged sword in marketing
 * - Bias amplification in AI systems
 * - Transparency and explainability challenges
 * - Privacy regulations (GDPR, CCPA)
 * - Fairness research and debiasing strategies
 * - Building responsible AI practices
 */

import type { LectureContent, ContentSection } from '../types';
import type { DiagramData } from '$lib/components/diagrams';
import type { ExplanationStep } from '$lib/components/animation';

// =============================================================================
// Section 1: AI as a Double-Edged Sword
// =============================================================================

const doubleEdgedSwordSection: ContentSection = {
	id: 'double-edged-sword',
	type: 'text',
	title: 'AI as a Double-Edged Sword',
	content: `**The Promise and Peril of AI in Marketing**

Artificial intelligence has transformed marketing capabilities, but with that power comes significant responsibility.

**The Benefits**

- **Personalization at Scale** - AI enables one-to-one marketing for millions of customers
- **Accuracy** - Predictions improve customer matching and reduce wasted spend
- **Efficiency** - Automation handles routine decisions, freeing human creativity
- **Discovery** - Pattern recognition finds insights humans might miss
- **Speed** - Real-time optimization adapts to changing conditions

**The Risks**

- **Inequality** - AI can systematically disadvantage certain groups
- **Privacy Violations** - Personalization requires data that may be misused
- **Trust Erosion** - Hidden algorithms can damage brand relationships
- **Autonomy Loss** - Over-reliance on AI reduces human judgment
- **Manipulation** - Persuasion capabilities can cross ethical lines

**The Central Question**

How do we capture AI's benefits while managing its risks?

This lecture explores the ethical dimensions every marketing analyst must understand: bias, transparency, privacy, and fairness.

**Balance is Required**

AI ethics is not about avoiding AI - it's about using AI responsibly. The companies that get this right will build sustainable competitive advantages through trust.`
};

// =============================================================================
// Section 2: Bias in AI Systems (Animated Explanation)
// =============================================================================

const biasAmplificationSteps: ExplanationStep[] = [
	{
		id: 'bias-1',
		title: 'Step 1: Training Data',
		description:
			'AI systems learn from historical data. This data reflects past decisions - including past biases. If historical lending favored certain demographics, the data will encode those patterns.',
		diagram: {
			nodes: [
				{ id: 'data', label: 'Training\nData', type: 'variable', x: 210, y: 60 }
			],
			edges: []
		},
		highlights: ['data'],
		annotations: [{ targetId: 'data', text: 'Historical, potentially biased', position: 'bottom' }]
	},
	{
		id: 'bias-2',
		title: 'Step 2: ML Model Learns Patterns',
		description:
			'The machine learning model learns to replicate patterns in the training data. If the data contains biased decisions, the model learns to make similar biased predictions.',
		diagram: {
			nodes: [
				{ id: 'data', label: 'Training\nData', type: 'variable', x: 110, y: 60 },
				{ id: 'model', label: 'ML Model', type: 'confounder', x: 310, y: 60 }
			],
			edges: [{ id: 'd-m', source: 'data', target: 'model' }]
		},
		highlights: ['model'],
		annotations: [{ targetId: 'model', text: 'Learns both signal and bias', position: 'bottom' }]
	},
	{
		id: 'bias-3',
		title: 'Step 3: Predictions Amplify Bias',
		description:
			'When the model makes predictions, it can amplify original biases. Small historical differences become larger as the model optimizes for patterns it learned.',
		diagram: {
			nodes: [
				{ id: 'data', label: 'Training\nData', type: 'variable', x: 80, y: 60 },
				{ id: 'model', label: 'ML Model', type: 'confounder', x: 210, y: 60 },
				{ id: 'predictions', label: 'Predictions', type: 'outcome', x: 340, y: 60 }
			],
			edges: [
				{ id: 'd-m', source: 'data', target: 'model' },
				{ id: 'm-p', source: 'model', target: 'predictions' }
			]
		},
		highlights: ['predictions'],
		annotations: [{ targetId: 'predictions', text: 'Amplified bias', position: 'bottom' }]
	},
	{
		id: 'bias-4',
		title: 'The Key Insight',
		description:
			'AI does not just repeat bias - it can amplify it. The feedback loop between predictions and outcomes can make small historical biases worse over time. This is why bias detection and mitigation are critical.',
		diagram: {
			nodes: [
				{ id: 'data', label: 'Biased\nData', type: 'variable', x: 80, y: 40 },
				{ id: 'model', label: 'ML Model', type: 'confounder', x: 210, y: 40 },
				{ id: 'predictions', label: 'Amplified\nBias', type: 'treatment', x: 340, y: 40 },
				{ id: 'insight', label: 'AI Amplifies\nNot Just Repeats', type: 'outcome', x: 210, y: 120 }
			],
			edges: [
				{ id: 'd-m', source: 'data', target: 'model' },
				{ id: 'm-p', source: 'model', target: 'predictions' },
				{ id: 'p-i', source: 'predictions', target: 'insight', style: 'dashed' }
			]
		},
		highlights: ['insight'],
		annotations: [{ targetId: 'insight', text: 'Critical for responsible AI', position: 'bottom' }]
	}
];

const biasAmplificationSection: ContentSection = {
	id: 'bias-amplification',
	type: 'explanation',
	title: 'Bias in AI Systems',
	explanation: {
		steps: biasAmplificationSteps
	}
};

// =============================================================================
// Section 3: The Transparency Problem (Diagram)
// =============================================================================

const transparencyDiagram: DiagramData = {
	nodes: [
		{ id: 'user', label: 'User', type: 'variable', x: 80, y: 80 },
		{ id: 'questions', label: '???', type: 'control', x: 80, y: 140 },
		{ id: 'ai', label: 'AI Decision\nProcess', type: 'confounder', x: 210, y: 80 },
		{ id: 'hidden', label: '(Hidden)', type: 'variable', x: 210, y: 140 },
		{ id: 'recommendations', label: 'Recommendations', type: 'outcome', x: 340, y: 80 },
		{ id: 'shown', label: 'Products, Ads,\nContent', type: 'variable', x: 340, y: 140 }
	],
	edges: [
		{ id: 'u-ai', source: 'user', target: 'ai', style: 'dashed' },
		{ id: 'ai-r', source: 'ai', target: 'recommendations' }
	]
};

const transparencySection: ContentSection = {
	id: 'transparency-problem',
	type: 'diagram',
	title: 'The Transparency Problem',
	diagram: transparencyDiagram,
	content: `**Users Often Do Not Know AI is Making Decisions**

Consider the typical user experience:

1. A customer visits a website
2. They see product recommendations, targeted ads, or personalized content
3. They may not realize an AI system made these choices
4. The reasons for specific recommendations remain hidden

**Why Transparency Matters**

**Consumer Autonomy**
- People should understand when algorithms influence their choices
- Informed consent requires knowing data is being used
- Hidden manipulation undermines genuine preference satisfaction

**Trust and Relationships**
- Discovering hidden AI decisions can feel deceptive
- Brands risk backlash when algorithmic practices are exposed
- Long-term relationships require transparency

**Fairness Accountability**
- Without transparency, users cannot challenge unfair treatment
- Regulators cannot audit invisible decision-making
- Companies cannot identify and fix problems they cannot see

**The "Black Box" Problem**

Many AI systems, especially deep learning models, are difficult to explain even for their creators. The model finds patterns, but the reasons may be opaque.

This creates a fundamental tension: the most accurate models are often the least interpretable. Balancing accuracy and explainability is an ongoing challenge.

**Emerging Standards**

Regulations increasingly require algorithmic transparency:
- Right to explanation in some contexts
- Disclosure when AI is making decisions
- Auditability requirements for high-stakes applications`
};

// =============================================================================
// Section 4: Privacy and Regulations
// =============================================================================

const privacyRegulationsSection: ContentSection = {
	id: 'privacy-regulations',
	type: 'text',
	title: 'Privacy and Regulations',
	content: `**The Regulatory Landscape**

Privacy regulations are reshaping what companies can do with customer data:

**GDPR (General Data Protection Regulation - Europe)**

- **Consent Required** - Explicit permission needed for data collection
- **Right to Erasure** - Users can request data deletion
- **Right to Explanation** - Users can ask for logic behind automated decisions
- **Data Portability** - Users can take their data to competitors
- **Heavy Penalties** - Fines up to 4% of global revenue

**CCPA (California Consumer Privacy Act)**

- **Right to Know** - What data is collected and why
- **Right to Delete** - Request removal of personal information
- **Right to Opt-Out** - Refuse sale of personal data
- **Non-Discrimination** - Cannot penalize users who exercise rights
- **Expanding Model** - Other US states adopting similar frameworks

**Data Stewardship Responsibility**

Regulations reflect a fundamental shift in perspective:

**Old Model:**
- Data as a resource to be exploited
- Collect everything, figure out use later
- Privacy as a compliance burden

**New Model:**
- Data as a trust relationship
- Collect only what's needed with clear purpose
- Privacy as a competitive advantage

**Companies as Data Protectors, Not Exploiters**

The most successful companies are positioning themselves as stewards of customer data rather than extractors. This builds trust and reduces regulatory risk.

**Practical Implications**

For marketing analytics, this means:
- Design systems with privacy from the start
- Document data usage and retention policies
- Build consent and opt-out mechanisms
- Regular privacy impact assessments
- Consider anonymization and aggregation techniques`
};

// =============================================================================
// Section 5: Fairness Research (Animated Explanation)
// =============================================================================

const fairnessResearchSteps: ExplanationStep[] = [
	{
		id: 'fairness-1',
		title: 'Step 1: Biased Algorithm',
		description:
			'Starting point: an algorithm that produces unfair outcomes. Perhaps it systematically offers worse terms to certain demographic groups, even without explicit demographic variables.',
		diagram: {
			nodes: [
				{ id: 'biased', label: 'Biased\nAlgorithm', type: 'confounder', x: 120, y: 60 },
				{ id: 'unfair', label: 'Unfair\nOutcomes', type: 'treatment', x: 300, y: 60 }
			],
			edges: [{ id: 'b-u', source: 'biased', target: 'unfair' }]
		},
		highlights: ['biased', 'unfair'],
		annotations: [{ targetId: 'unfair', text: 'Systematic disadvantage', position: 'bottom' }]
	},
	{
		id: 'fairness-2',
		title: 'Step 2: Apply Debiasing',
		description:
			'Researchers have developed debiasing techniques: reweighting training data, constraining the model to equalize outcomes, or post-processing predictions to remove disparities.',
		diagram: {
			nodes: [
				{ id: 'biased', label: 'Biased\nAlgorithm', type: 'confounder', x: 80, y: 60 },
				{ id: 'debiasing', label: 'Debiasing\nIntervention', type: 'control', x: 210, y: 60 },
				{ id: 'improved', label: 'Improved\nAlgorithm', type: 'variable', x: 340, y: 60 }
			],
			edges: [
				{ id: 'b-d', source: 'biased', target: 'debiasing' },
				{ id: 'd-i', source: 'debiasing', target: 'improved' }
			]
		},
		highlights: ['debiasing'],
		annotations: [{ targetId: 'debiasing', text: 'Reweighting, constraints, post-processing', position: 'bottom' }]
	},
	{
		id: 'fairness-3',
		title: 'Step 3: Small Accuracy Loss',
		description:
			'Debiasing often involves a trade-off: slightly reduced prediction accuracy on average. The model gives up some performance to achieve fairer outcomes across groups.',
		diagram: {
			nodes: [
				{ id: 'debiased', label: 'Debiased\nModel', type: 'control', x: 130, y: 60 },
				{ id: 'accuracy', label: 'Accuracy:\n95% -> 92%', type: 'variable', x: 290, y: 60 }
			],
			edges: [{ id: 'd-a', source: 'debiased', target: 'accuracy' }]
		},
		highlights: ['accuracy'],
		annotations: [{ targetId: 'accuracy', text: 'Small but real trade-off', position: 'bottom' }]
	},
	{
		id: 'fairness-4',
		title: 'Step 4: More Fair and Sustainable',
		description:
			'But the trade-off is often worth it. Fairer algorithms build trust, reduce regulatory risk, and create sustainable business practices. Short-term accuracy loss leads to long-term success.',
		diagram: {
			nodes: [
				{ id: 'tradeoff', label: 'Small Accuracy\nLoss', type: 'variable', x: 80, y: 40 },
				{ id: 'fair', label: 'Fair\nOutcomes', type: 'outcome', x: 210, y: 40 },
				{ id: 'trust', label: 'Trust', type: 'outcome', x: 280, y: 110 },
				{ id: 'sustainable', label: 'Sustainable\nBusiness', type: 'outcome', x: 140, y: 110 }
			],
			edges: [
				{ id: 't-f', source: 'tradeoff', target: 'fair' },
				{ id: 'f-trust', source: 'fair', target: 'trust' },
				{ id: 'f-s', source: 'fair', target: 'sustainable' }
			]
		},
		highlights: ['fair', 'trust', 'sustainable'],
		annotations: [{ targetId: 'fair', text: 'Long-term value > short-term accuracy', position: 'top' }]
	}
];

const fairnessResearchSection: ContentSection = {
	id: 'fairness-research',
	type: 'explanation',
	title: 'Fairness Research',
	explanation: {
		steps: fairnessResearchSteps
	}
};

// =============================================================================
// Section 6: Three Lessons on Fairness (Diagram)
// =============================================================================

const threeLessonsDiagram: DiagramData = {
	nodes: [
		{ id: 'contextual', label: 'Contextual', type: 'treatment', x: 80, y: 60 },
		{ id: 'invisible', label: 'Invisible', type: 'control', x: 210, y: 60 },
		{ id: 'choice', label: 'A Choice', type: 'confounder', x: 340, y: 60 },
		{ id: 'ctx-detail', label: 'No Universal\nFormula', type: 'variable', x: 80, y: 130 },
		{ id: 'inv-detail', label: 'Bias Without\nExplicit Markers', type: 'variable', x: 210, y: 130 },
		{ id: 'choice-detail', label: 'Debiasing is\nIntentional', type: 'variable', x: 340, y: 130 }
	],
	edges: [
		{ id: 'ctx-cd', source: 'contextual', target: 'ctx-detail' },
		{ id: 'inv-id', source: 'invisible', target: 'inv-detail' },
		{ id: 'ch-chd', source: 'choice', target: 'choice-detail' },
		{ id: 'ctx-inv', source: 'contextual', target: 'invisible', style: 'dashed' },
		{ id: 'inv-ch', source: 'invisible', target: 'choice', style: 'dashed' }
	]
};

const threeLessonsSection: ContentSection = {
	id: 'three-lessons',
	type: 'diagram',
	title: 'Three Lessons on Fairness',
	diagram: threeLessonsDiagram,
	content: `**Fairness is Contextual**

There is no universal fairness formula. What counts as "fair" depends on:
- The specific application and stakes involved
- Which groups are affected and how
- Legal requirements in different jurisdictions
- Stakeholder expectations and values

Example: Equal approval rates might be fair for some loans but not others. Context determines the appropriate fairness definition.

**Fairness is Invisible**

Bias can exist even without explicit demographic variables:
- Zip codes proxy for race and income
- Purchase history reflects economic opportunity
- Language patterns encode cultural background
- The algorithm finds patterns we do not intend

You cannot simply remove protected variables and assume fairness. Proxy discrimination is real and common.

**Fairness is a Choice**

Debiasing does not happen automatically. It requires:
- Intentional measurement of outcomes across groups
- Explicit fairness constraints in model design
- Trade-off decisions between accuracy and equity
- Ongoing monitoring and adjustment

Organizations must choose to prioritize fairness. Without deliberate effort, optimization will find and exploit whatever patterns exist - including biased ones.

**Implications for Practice**

1. Define fairness explicitly for your context
2. Measure outcomes across relevant groups
3. Build fairness into the design process
4. Accept reasonable accuracy trade-offs
5. Monitor continuously - fairness is not a one-time fix`
};

// =============================================================================
// Section 7: Responsible AI Summary
// =============================================================================

const responsibleAiSection: ContentSection = {
	id: 'responsible-ai',
	type: 'text',
	title: 'Summary: Responsible AI',
	content: `**AI Amplifies Capabilities But Requires Responsibility**

The core message of this lecture:

> AI is a powerful amplifier. It amplifies both our capabilities and our biases. Success depends not just on what AI can do, but on how we choose to use it.

**Success Depends on HOW It's Used**

The same AI capabilities can:
- Provide helpful personalization OR manipulate vulnerable users
- Reduce costs and errors OR entrench discrimination
- Create value for customers OR extract value from them

The technology itself is neutral. Our choices determine the outcomes.

**Ethical AI Framework Components**

**1. Fairness**
- Measure outcomes across groups
- Define appropriate fairness criteria
- Build and test debiasing mechanisms
- Accept reasonable accuracy trade-offs

**2. Transparency**
- Disclose when AI makes decisions
- Provide explanations where possible
- Enable meaningful user control
- Document systems for auditability

**3. Accountability**
- Assign responsibility for AI decisions
- Create feedback and appeal mechanisms
- Regular audits and monitoring
- Clear governance structures

**Long-Term Trust Over Short-Term Efficiency**

The companies that will thrive are those that build trust through responsible AI:
- Short-term gains from exploitation erode brand equity
- Regulatory penalties will increase for bad actors
- Customer preferences are shifting toward ethical companies
- Employee recruitment and retention favor responsible employers

**Final Thoughts**

AI ethics is not a constraint on innovation - it's a foundation for sustainable innovation. The most successful marketing organizations will be those that harness AI's power while maintaining the trust of customers, regulators, and society.

**Key Takeaways**
1. AI amplifies both capability and bias
2. Fairness is contextual, invisible, and a choice
3. Transparency builds trust and enables accountability
4. Privacy regulations are reshaping data practices
5. Responsible AI creates sustainable competitive advantage`
};

// =============================================================================
// Export Lecture Content
// =============================================================================

export const lectureContent: LectureContent = {
	lectureId: 'ai-ethics',
	sections: [
		doubleEdgedSwordSection,
		biasAmplificationSection,
		transparencySection,
		privacyRegulationsSection,
		fairnessResearchSection,
		threeLessonsSection,
		responsibleAiSection
	]
};
