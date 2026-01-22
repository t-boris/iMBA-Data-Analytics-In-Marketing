/**
 * Lecture 1: Introduction to AI, ML, and Prediction
 *
 * This lecture covers the foundational concepts of AI and ML:
 * - What AI and ML are and how they differ
 * - Why AI/ML matter now: computing, data, and breakthroughs
 * - How AI reduces prediction cost and creates value
 * - System-wide transformation potential
 */

import type { LectureContent, ContentSection } from '../types';
import type { DiagramData } from '$lib/components/diagrams';
import type { ExplanationStep } from '$lib/components/animation';

// =============================================================================
// Section 1: What is AI and ML?
// =============================================================================

const whatIsAIMLSection: ContentSection = {
	id: 'what-is-ai-ml',
	type: 'text',
	title: 'What is AI and ML?',
	content: `**Artificial Intelligence (AI)** is the broad field of computer science focused on creating systems that can perform tasks typically requiring human intelligence. This includes reasoning, learning, perception, and decision-making.

**Machine Learning (ML)** is a subset of AI that focuses specifically on systems that learn from data. Rather than being explicitly programmed with rules, ML algorithms identify patterns in data and improve their performance through experience.

Think of it this way:
- **AI is the goal** - creating intelligent systems
- **ML is a method** - achieving that goal through data-driven learning

For marketers, this distinction matters because ML provides the practical toolkit for prediction, segmentation, personalization, and automation that drives modern marketing analytics.`
};

// =============================================================================
// Section 2: Why AI/ML Matter Now (Animated Explanation)
// =============================================================================

const whyAIMLMatterSteps: ExplanationStep[] = [
	{
		id: 'why-1',
		title: 'The Computing Revolution',
		description:
			'The first factor enabling modern AI/ML is the dramatic reduction in computing costs. What cost millions of dollars in the 1960s now costs pennies. Cloud computing makes massive computational power accessible to anyone.',
		diagram: {
			nodes: [
				{ id: 'computing', label: 'Computing Cost', type: 'treatment', x: 210, y: 60 }
			],
			edges: []
		},
		highlights: ['computing'],
		annotations: [{ targetId: 'computing', text: '1000x cheaper since 2000', position: 'bottom' }]
	},
	{
		id: 'why-2',
		title: 'The Data Explosion',
		description:
			'The second factor is the explosion of available data. Social media, IoT devices, mobile phones, and digital transactions generate unprecedented amounts of data. ML algorithms need data to learn - and now there is plenty.',
		diagram: {
			nodes: [
				{ id: 'computing', label: 'Computing Cost', type: 'treatment', x: 100, y: 60 },
				{ id: 'data', label: 'Data Availability', type: 'control', x: 320, y: 60 },
				{ id: 'social', label: 'Social Media', type: 'variable', x: 210, y: 130 },
				{ id: 'iot', label: 'IoT Sensors', type: 'variable', x: 320, y: 130 },
				{ id: 'mobile', label: 'Mobile Data', type: 'variable', x: 430, y: 130 }
			],
			edges: [
				{ id: 's-d', source: 'social', target: 'data' },
				{ id: 'i-d', source: 'iot', target: 'data' },
				{ id: 'm-d', source: 'mobile', target: 'data' }
			]
		},
		highlights: ['data', 'social', 'iot', 'mobile']
	},
	{
		id: 'why-3',
		title: 'ML Breakthroughs',
		description:
			'The third factor is algorithmic breakthroughs. Deep learning, neural networks, and transformer architectures have dramatically improved what ML can do. These advances enable everything from image recognition to language understanding.',
		diagram: {
			nodes: [
				{ id: 'computing', label: 'Computing Cost', type: 'treatment', x: 60, y: 30 },
				{ id: 'data', label: 'Data Availability', type: 'control', x: 210, y: 30 },
				{ id: 'breakthroughs', label: 'ML Breakthroughs', type: 'confounder', x: 360, y: 30 },
				{ id: 'neural', label: 'Neural Networks', type: 'variable', x: 100, y: 120 },
				{ id: 'deep', label: 'Deep Learning', type: 'variable', x: 250, y: 120 },
				{ id: 'transformer', label: 'Transformers', type: 'variable', x: 400, y: 120 }
			],
			edges: [
				{ id: 'n-b', source: 'neural', target: 'breakthroughs' },
				{ id: 'd-b', source: 'deep', target: 'breakthroughs' },
				{ id: 't-b', source: 'transformer', target: 'breakthroughs' }
			]
		},
		highlights: ['breakthroughs', 'neural', 'deep', 'transformer']
	},
	{
		id: 'why-4',
		title: 'The Perfect Storm',
		description:
			'Together, these three forces - cheap computing, abundant data, and algorithmic advances - create the perfect conditions for AI/ML to transform business. Marketing is particularly well-positioned to benefit because of its data richness and need for prediction.',
		diagram: {
			nodes: [
				{ id: 'computing', label: 'Computing Cost', type: 'treatment', x: 60, y: 30 },
				{ id: 'data', label: 'Data Availability', type: 'control', x: 210, y: 30 },
				{ id: 'breakthroughs', label: 'ML Breakthroughs', type: 'confounder', x: 360, y: 30 },
				{ id: 'aiml', label: 'AI/ML Revolution', type: 'outcome', x: 210, y: 120 }
			],
			edges: [
				{ id: 'c-a', source: 'computing', target: 'aiml' },
				{ id: 'd-a', source: 'data', target: 'aiml' },
				{ id: 'b-a', source: 'breakthroughs', target: 'aiml' }
			]
		},
		highlights: ['aiml'],
		annotations: [{ targetId: 'aiml', text: 'Convergence creates opportunity', position: 'bottom' }]
	}
];

const whyAIMLMatterSection: ContentSection = {
	id: 'why-ai-ml-matter',
	type: 'explanation',
	title: 'Why AI/ML Matter Now',
	explanation: {
		steps: whyAIMLMatterSteps
	}
};

// =============================================================================
// Section 3: AI Reduces Prediction Cost (Diagram)
// =============================================================================

const predictionValueDiagram: DiagramData = {
	nodes: [
		{ id: 'prediction', label: 'Prediction', type: 'treatment', x: 60, y: 60 },
		{ id: 'decision', label: 'Decision', type: 'variable', x: 210, y: 60 },
		{ id: 'value', label: 'Value Creation', type: 'outcome', x: 360, y: 60 }
	],
	edges: [
		{ id: 'p-d', source: 'prediction', target: 'decision', label: 'Informs' },
		{ id: 'd-v', source: 'decision', target: 'value', label: 'Drives' }
	]
};

const predictionCostSection: ContentSection = {
	id: 'prediction-cost',
	type: 'diagram',
	title: 'AI Reduces Prediction Cost',
	diagram: predictionValueDiagram,
	content: `The book "Prediction Machines" by Ajay Agrawal, Joshua Gans, and Avi Goldfarb provides a powerful framework: **AI is fundamentally about reducing the cost of prediction.**

When prediction becomes cheap, it gets used more:
- **Prediction informs decisions** - Better forecasts lead to better choices
- **Decisions drive value** - Smarter choices create business outcomes
- **Lower cost means more use** - Tasks that weren't worth predicting before now become feasible

For marketing, this means:
- Predicting which customers will churn (and intervening)
- Forecasting demand for inventory planning
- Personalizing content for each customer
- Identifying high-value prospects

As prediction costs fall, the bottleneck shifts to decision-making quality and the value of the outcomes being optimized.`
};

// =============================================================================
// Section 4: System-Wide Transformation
// =============================================================================

const systemTransformationSection: ContentSection = {
	id: 'system-transformation',
	type: 'text',
	title: 'System-Wide Transformation',
	content: `**The Climate Corporation Example**

Consider The Climate Corporation (acquired by Monsanto for $1B). They don't just use AI for one task - they've built their entire business around prediction:
- Weather prediction for field-level recommendations
- Yield prediction for insurance pricing
- Pest/disease prediction for treatment timing

This illustrates how AI transforms business architecture, not just individual tasks.

**From Point Solutions to Business Architecture**

Early AI adoption often starts with point solutions: a recommendation engine here, a chatbot there. But the real transformation comes when AI becomes central to business architecture:
- Data flows are redesigned for ML consumption
- Decisions are structured for algorithmic optimization
- Feedback loops are built for continuous learning

**Marketing Implications**

For marketing organizations, this means:
- Moving from campaign-by-campaign to always-on optimization
- Building customer data platforms that feed ML models
- Creating feedback loops from outcomes back to predictions
- Rethinking organizational structure around data science capabilities`
};

// =============================================================================
// Section 5: Key Takeaway
// =============================================================================

const keyTakeawaySection: ContentSection = {
	id: 'key-takeaway',
	type: 'text',
	title: 'Key Takeaway',
	content: `Three lessons for marketers entering the AI/ML era:

**1. Customer Prediction as Core Competency**
The ability to predict customer behavior - purchases, churn, lifetime value, response to offers - is becoming a core marketing competency. Organizations that excel at prediction will outperform those that don't.

**2. Systemic Mindset**
Don't think of AI as isolated tools. Think systemically: how can prediction transform your entire marketing operation? What would your marketing look like if prediction cost nothing?

**3. Continuous Evolution**
AI capabilities are advancing rapidly. The techniques that are cutting-edge today will be commoditized tomorrow. Build organizational capabilities to continuously adopt and adapt.

**Real Example: Starbucks DeepBrew**

Starbucks' DeepBrew AI platform demonstrates all three principles:
- Predicts individual customer preferences for personalized recommendations
- Integrates across mobile app, rewards program, and in-store operations
- Continuously learns from hundreds of millions of transactions

The result: increased customer engagement, higher average ticket, and stronger loyalty - all driven by prediction.`
};

// =============================================================================
// Export Lecture Content
// =============================================================================

export const lectureContent: LectureContent = {
	lectureId: 'introduction-ai-ml',
	sections: [
		whatIsAIMLSection,
		whyAIMLMatterSection,
		predictionCostSection,
		systemTransformationSection,
		keyTakeawaySection
	]
};
