/**
 * Lecture 2: Foundations of Machine Learning Frameworks
 *
 * This lecture covers core ML concepts:
 * - The prediction problem with practical examples
 * - Train-test-validation split methodology
 * - Bias: the underfitting problem
 * - Variance: the overfitting problem
 * - The bias-variance trade-off
 * - Feature engineering fundamentals
 */

import type { LectureContent, ContentSection } from '../types';
import type { DiagramData } from '$lib/components/diagrams';
import type { ExplanationStep } from '$lib/components/animation';

// =============================================================================
// Section 1: The Prediction Problem
// =============================================================================

const predictionProblemSection: ContentSection = {
	id: 'prediction-problem',
	type: 'text',
	title: 'The Prediction Problem',
	content: `Consider a restaurant manager trying to predict how many walk-in customers will arrive each evening. This is a classic prediction problem with real business implications:

**Too few staff scheduled?**
- Long wait times, unhappy customers
- Lost revenue from turned-away diners
- Negative reviews

**Too many staff scheduled?**
- Wasted labor costs
- Bored employees
- Reduced profitability

The manager has historical data: day of week, weather, local events, past customer counts. But how should they use this data to make predictions?

**This is where Machine Learning comes in.**

ML provides a systematic framework for:
1. Learning patterns from historical data
2. Making predictions on new, unseen situations
3. Measuring and improving prediction accuracy

The key insight: we want models that **generalize** - that work well on data they haven't seen before, not just on the data they learned from.`
};

// =============================================================================
// Section 2: Train-Test-Validation Split (Animated Explanation)
// =============================================================================

const trainTestSplitSteps: ExplanationStep[] = [
	{
		id: 'split-1',
		title: 'Your Dataset',
		description:
			'You have a dataset of historical observations. Each row is an observation (e.g., one evening at the restaurant), and columns contain features (day of week, weather) and the outcome (customer count).',
		diagram: {
			nodes: [
				{ id: 'full-data', label: 'Full Dataset', type: 'variable', x: 210, y: 60 }
			],
			edges: []
		},
		highlights: ['full-data'],
		annotations: [{ targetId: 'full-data', text: '100% of your data', position: 'bottom' }]
	},
	{
		id: 'split-2',
		title: 'The Train-Test Split',
		description:
			'Split your data into two parts: Training data (typically 80%) to learn patterns, and Test data (20%) to evaluate how well the model generalizes. The test set is held out and never used during training.',
		diagram: {
			nodes: [
				{ id: 'full-data', label: 'Full Dataset', type: 'variable', x: 210, y: 20 },
				{ id: 'train', label: 'Training Set', type: 'treatment', x: 120, y: 100 },
				{ id: 'test', label: 'Test Set', type: 'control', x: 300, y: 100 }
			],
			edges: [
				{ id: 'f-tr', source: 'full-data', target: 'train', label: '80%' },
				{ id: 'f-te', source: 'full-data', target: 'test', label: '20%' }
			]
		},
		highlights: ['train', 'test'],
		annotations: [
			{ targetId: 'train', text: 'Learn from this', position: 'bottom' },
			{ targetId: 'test', text: 'Evaluate on this', position: 'bottom' }
		]
	},
	{
		id: 'split-3',
		title: 'Adding Validation',
		description:
			'For tuning model hyperparameters (settings that control how the model learns), we further split the training data. Validation data (15-20% of training) helps us choose the best model configuration without peeking at the test set.',
		diagram: {
			nodes: [
				{ id: 'full-data', label: 'Full Dataset', type: 'variable', x: 210, y: 10 },
				{ id: 'train-val', label: 'Train + Val', type: 'variable', x: 120, y: 70 },
				{ id: 'test', label: 'Test Set', type: 'control', x: 300, y: 70 },
				{ id: 'train', label: 'Training', type: 'treatment', x: 60, y: 140 },
				{ id: 'val', label: 'Validation', type: 'confounder', x: 180, y: 140 }
			],
			edges: [
				{ id: 'f-tv', source: 'full-data', target: 'train-val', label: '80%' },
				{ id: 'f-te', source: 'full-data', target: 'test', label: '20%' },
				{ id: 'tv-tr', source: 'train-val', target: 'train', label: '80%' },
				{ id: 'tv-v', source: 'train-val', target: 'val', label: '20%' }
			]
		},
		highlights: ['train', 'val', 'test'],
		annotations: [
			{ targetId: 'val', text: 'Tune hyperparameters', position: 'bottom' }
		]
	},
	{
		id: 'split-4',
		title: 'The Workflow',
		description:
			'The complete workflow: Train multiple model configurations on training data. Select the best one using validation data. Only at the very end, evaluate final performance on the test set. This gives an honest estimate of real-world performance.',
		diagram: {
			nodes: [
				{ id: 'train', label: 'Training', type: 'treatment', x: 60, y: 60 },
				{ id: 'val', label: 'Validation', type: 'confounder', x: 180, y: 60 },
				{ id: 'test', label: 'Test', type: 'control', x: 300, y: 60 },
				{ id: 'model', label: 'Best Model', type: 'outcome', x: 400, y: 60 }
			],
			edges: [
				{ id: 'tr-v', source: 'train', target: 'val', label: '1. Train' },
				{ id: 'v-te', source: 'val', target: 'test', label: '2. Tune' },
				{ id: 'te-m', source: 'test', target: 'model', label: '3. Evaluate' }
			]
		},
		highlights: ['model'],
		annotations: [{ targetId: 'model', text: 'Ready for production', position: 'bottom' }]
	}
];

const trainTestSplitSection: ContentSection = {
	id: 'train-test-split',
	type: 'explanation',
	title: 'Train-Test-Validation Split',
	explanation: {
		steps: trainTestSplitSteps
	}
};

// =============================================================================
// Section 3: Bias - The Underfitting Problem (Diagram)
// =============================================================================

const biasDiagram: DiagramData = {
	nodes: [
		{ id: 'simple-model', label: 'Simple Model', type: 'treatment', x: 60, y: 60 },
		{ id: 'high-bias', label: 'High Bias', type: 'confounder', x: 210, y: 60 },
		{ id: 'underfitting', label: 'Underfitting', type: 'outcome', x: 360, y: 60 }
	],
	edges: [
		{ id: 'sm-hb', source: 'simple-model', target: 'high-bias', label: 'Creates' },
		{ id: 'hb-uf', source: 'high-bias', target: 'underfitting', label: 'Causes' }
	]
};

const biasSection: ContentSection = {
	id: 'bias-underfitting',
	type: 'diagram',
	title: 'Bias: The Underfitting Problem',
	diagram: biasDiagram,
	content: `**Bias** refers to error from oversimplifying assumptions in the learning algorithm. A high-bias model doesn't capture the underlying patterns in the data.

**Symptoms of high bias:**
- Poor performance on training data
- Poor performance on test data
- The model is too simple to capture reality

**Restaurant Example:**
If you predict "50 customers every night" regardless of day or weather, you have a high-bias model. It's simple, but it misses obvious patterns (weekends are busier, bad weather reduces traffic).

**The Underfitting Problem:**
When a model has high bias, it "underfits" the data - it fails to capture important relationships. The model's assumptions are too restrictive.

**Solutions:**
- Use more complex models
- Add more relevant features
- Reduce regularization`
};

// =============================================================================
// Section 4: Variance - The Overfitting Problem (Diagram)
// =============================================================================

const varianceDiagram: DiagramData = {
	nodes: [
		{ id: 'complex-model', label: 'Complex Model', type: 'treatment', x: 60, y: 60 },
		{ id: 'high-variance', label: 'High Variance', type: 'confounder', x: 210, y: 60 },
		{ id: 'overfitting', label: 'Overfitting', type: 'outcome', x: 360, y: 60 }
	],
	edges: [
		{ id: 'cm-hv', source: 'complex-model', target: 'high-variance', label: 'Creates' },
		{ id: 'hv-of', source: 'high-variance', target: 'overfitting', label: 'Causes' }
	]
};

const varianceSection: ContentSection = {
	id: 'variance-overfitting',
	type: 'diagram',
	title: 'Variance: The Overfitting Problem',
	diagram: varianceDiagram,
	content: `**Variance** refers to error from sensitivity to small fluctuations in the training data. A high-variance model captures noise as if it were signal.

**Symptoms of high variance:**
- Excellent performance on training data
- Poor performance on test data
- The model memorized rather than learned

**Restaurant Example:**
If your model learns "On March 15, 2023, with partly cloudy skies and a local soccer game, we had exactly 73 customers" - it's memorizing specific instances rather than learning generalizable patterns.

**The Overfitting Problem:**
When a model has high variance, it "overfits" the data - it captures noise and random fluctuations that won't repeat in new data. The model is too flexible.

**Solutions:**
- Use simpler models
- Get more training data
- Increase regularization
- Use dropout (for neural networks)
- Cross-validation for model selection`
};

// =============================================================================
// Section 5: Bias-Variance Trade-off (Animated Explanation)
// =============================================================================

const biasVarianceTradeoffSteps: ExplanationStep[] = [
	{
		id: 'tradeoff-1',
		title: 'High Bias Region',
		description:
			'On the left side of the complexity spectrum, models are too simple. Error is high because the model cannot capture the true patterns. This is the "underfitting" zone.',
		diagram: {
			nodes: [
				{ id: 'bias', label: 'High Bias', type: 'confounder', x: 80, y: 60 },
				{ id: 'error', label: 'Error', type: 'outcome', x: 80, y: 130 }
			],
			edges: [
				{ id: 'b-e', source: 'bias', target: 'error', label: 'High' }
			]
		},
		highlights: ['bias'],
		annotations: [{ targetId: 'bias', text: 'Simple models', position: 'right' }]
	},
	{
		id: 'tradeoff-2',
		title: 'High Variance Region',
		description:
			'On the right side, models are too complex. They fit the training data perfectly but fail on new data. Error is high due to overfitting. This is the "memorization" zone.',
		diagram: {
			nodes: [
				{ id: 'bias', label: 'High Bias', type: 'confounder', x: 80, y: 60 },
				{ id: 'variance', label: 'High Variance', type: 'confounder', x: 340, y: 60 },
				{ id: 'error-l', label: 'Error', type: 'outcome', x: 80, y: 130 },
				{ id: 'error-r', label: 'Error', type: 'outcome', x: 340, y: 130 }
			],
			edges: [
				{ id: 'b-e', source: 'bias', target: 'error-l', label: 'High' },
				{ id: 'v-e', source: 'variance', target: 'error-r', label: 'High' }
			]
		},
		highlights: ['variance'],
		annotations: [{ targetId: 'variance', text: 'Complex models', position: 'left' }]
	},
	{
		id: 'tradeoff-3',
		title: 'The Optimal Point',
		description:
			'In the middle lies the sweet spot: enough complexity to capture true patterns, but not so much that the model memorizes noise. This is where total error is minimized.',
		diagram: {
			nodes: [
				{ id: 'bias', label: 'High Bias', type: 'confounder', x: 60, y: 40 },
				{ id: 'optimal', label: 'Optimal', type: 'treatment', x: 210, y: 40 },
				{ id: 'variance', label: 'High Variance', type: 'confounder', x: 360, y: 40 },
				{ id: 'error-l', label: 'High Error', type: 'outcome', x: 60, y: 120 },
				{ id: 'error-m', label: 'Low Error', type: 'outcome', x: 210, y: 120 },
				{ id: 'error-r', label: 'High Error', type: 'outcome', x: 360, y: 120 }
			],
			edges: [
				{ id: 'b-el', source: 'bias', target: 'error-l' },
				{ id: 'o-em', source: 'optimal', target: 'error-m' },
				{ id: 'v-er', source: 'variance', target: 'error-r' }
			]
		},
		highlights: ['optimal', 'error-m'],
		annotations: [{ targetId: 'optimal', text: 'Sweet spot', position: 'top' }]
	},
	{
		id: 'tradeoff-4',
		title: 'The Trade-off',
		description:
			'This is the fundamental bias-variance trade-off: as you reduce bias (more complex models), variance increases. As you reduce variance (simpler models), bias increases. The goal is to find the right balance for your specific problem.',
		diagram: {
			nodes: [
				{ id: 'underfitting', label: 'Underfitting', type: 'confounder', x: 60, y: 30 },
				{ id: 'just-right', label: 'Just Right', type: 'treatment', x: 210, y: 30 },
				{ id: 'overfitting', label: 'Overfitting', type: 'confounder', x: 360, y: 30 },
				{ id: 'arrow', label: 'Model Complexity', type: 'variable', x: 210, y: 100 }
			],
			edges: [
				{ id: 'u-jr', source: 'underfitting', target: 'just-right', style: 'dashed' },
				{ id: 'jr-o', source: 'just-right', target: 'overfitting', style: 'dashed' }
			]
		},
		highlights: ['just-right'],
		annotations: [
			{ targetId: 'underfitting', text: 'Too simple', position: 'bottom' },
			{ targetId: 'just-right', text: 'Balance', position: 'bottom' },
			{ targetId: 'overfitting', text: 'Too complex', position: 'bottom' }
		]
	}
];

const biasVarianceTradeoffSection: ContentSection = {
	id: 'bias-variance-tradeoff',
	type: 'explanation',
	title: 'Bias-Variance Trade-off',
	explanation: {
		steps: biasVarianceTradeoffSteps
	}
};

// =============================================================================
// Section 6: Feature Engineering
// =============================================================================

const featureEngineeringSection: ContentSection = {
	id: 'feature-engineering',
	type: 'text',
	title: 'Feature Engineering',
	content: `**Features** are the input variables your model uses to make predictions. Feature engineering - the process of creating and selecting features - is often the most important factor in model performance.

**Structured vs Unstructured Data**

**Structured data** has a clear schema:
- Customer demographics (age, income, location)
- Transaction history (amounts, dates, categories)
- Website behavior (pages viewed, time on site)

**Unstructured data** lacks a predefined schema:
- Text (reviews, emails, social media posts)
- Images (product photos, user-generated content)
- Audio/Video (customer service calls)

Modern ML can process both, often combining them for richer predictions.

**Feature Engineering Best Practices**

1. **Domain knowledge matters** - Understanding your business helps create meaningful features
2. **Interaction terms** - Sometimes features matter in combination (e.g., income × age)
3. **Temporal features** - Time-based patterns (day of week, seasonality)
4. **Aggregations** - Summarizing behavior (average purchase value, frequency)

**Model Evaluation Metrics**

How do you know if your model is good? Common metrics include:

- **MAE (Mean Absolute Error)** - Average prediction error magnitude
- **RMSE (Root Mean Square Error)** - Like MAE but penalizes large errors more
- **R-squared** - Proportion of variance explained (0 to 1)
- **MAPE (Mean Absolute Percentage Error)** - Error as percentage of actual value

Choose metrics that align with your business goals. Predicting customer count? MAE might be best. Predicting high-value purchases? You might weight errors by transaction size.`
};

// =============================================================================
// Export Lecture Content
// =============================================================================

export const lectureContent: LectureContent = {
	lectureId: 'ml-frameworks',
	sections: [
		predictionProblemSection,
		trainTestSplitSection,
		biasSection,
		varianceSection,
		biasVarianceTradeoffSection,
		featureEngineeringSection
	]
};
