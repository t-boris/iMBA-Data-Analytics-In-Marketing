/**
 * Lecture 7: Predicting Smartwatch Adoption with Machine Learning
 *
 * This lecture covers:
 * - Business problem: predicting which consumers will adopt smartwatches
 * - Binary classification setup
 * - Dataset features and structure
 * - Train-test split rationale
 * - Why ML over traditional econometrics
 */

import type { LectureContent, ContentSection } from '../types';
import type { DiagramData } from '$lib/components/diagrams';
import type { ExplanationStep } from '$lib/components/animation';

// =============================================================================
// Section 1: Business Problem
// =============================================================================

const businessProblemSection: ContentSection = {
	id: 'business-problem',
	type: 'text',
	title: 'The Business Problem',
	content: `**Smartwatch Market Explosion**

The smartwatch market has grown dramatically:
- **2016:** 37 million devices sold
- **Today:** Over 253 million devices

Modern smartwatches are wearable computers offering:
- Health and fitness tracking
- Phone calls and messaging
- Integration with device ecosystems
- Apps and games

**The Marketing Manager's Challenge**

Imagine you're a marketing manager launching a new smartwatch. Your key question:

> Which consumers are most likely to adopt the new smartwatch?

This prediction is critical for:
- **Marketing strategy** - Target the right customers
- **Inventory planning** - Stock appropriate quantities
- **Resource allocation** - Focus budget where it matters

**Why Prediction Matters**

Without prediction, you're guessing. With ML prediction, you can:
- Identify high-probability adopters before launch
- Personalize marketing messages to different segments
- Optimize ad spend by targeting likely buyers
- Plan production based on demand forecasts`
};

// =============================================================================
// Section 2: Target Variable (Animated Explanation)
// =============================================================================

const targetVariableSteps: ExplanationStep[] = [
	{
		id: 'target-1',
		title: 'Step 1: The Adopt Variable',
		description:
			'Our target variable is "adopt" - whether a consumer bought the smartwatch (1) or not (0). This is what we want to predict.',
		diagram: {
			nodes: [
				{ id: 'adopt', label: 'adopt', type: 'outcome', x: 210, y: 60 }
			],
			edges: []
		},
		highlights: ['adopt'],
		annotations: [{ targetId: 'adopt', text: '0 = No, 1 = Yes', position: 'bottom' }]
	},
	{
		id: 'target-2',
		title: 'Step 2: Binary Classification',
		description:
			'When the outcome is 0 or 1, this is called binary classification. The model learns to predict which class each consumer belongs to.',
		diagram: {
			nodes: [
				{ id: 'adopt', label: 'adopt', type: 'outcome', x: 210, y: 40 },
				{ id: 'binary', label: 'Binary\nClassification', type: 'treatment', x: 210, y: 120 }
			],
			edges: [{ id: 'a-b', source: 'adopt', target: 'binary' }]
		},
		highlights: ['binary'],
		annotations: [{ targetId: 'binary', text: 'Two possible outcomes', position: 'bottom' }]
	},
	{
		id: 'target-3',
		title: 'Step 3: Extension to Continuous',
		description:
			'The same ML techniques can predict continuous quantities like total sales, revenue, or demand volume - not just yes/no.',
		diagram: {
			nodes: [
				{ id: 'binary', label: 'Binary\n(0 or 1)', type: 'treatment', x: 120, y: 60 },
				{ id: 'continuous', label: 'Continuous\n(numbers)', type: 'confounder', x: 300, y: 60 }
			],
			edges: []
		},
		highlights: ['binary', 'continuous'],
		annotations: [
			{ targetId: 'binary', text: 'Will they buy?', position: 'bottom' },
			{ targetId: 'continuous', text: 'How many will they buy?', position: 'bottom' }
		]
	},
	{
		id: 'target-4',
		title: 'Step 4: Real-World Applications',
		description:
			'Beyond adoption, ML prediction applies to clicks, conversions, revenue, demand volume, churn probability, and more.',
		diagram: {
			nodes: [
				{ id: 'ml', label: 'ML\nPrediction', type: 'treatment', x: 100, y: 70 },
				{ id: 'clicks', label: 'Clicks', type: 'variable', x: 250, y: 30 },
				{ id: 'revenue', label: 'Revenue', type: 'variable', x: 320, y: 70 },
				{ id: 'demand', label: 'Demand', type: 'variable', x: 250, y: 110 }
			],
			edges: [
				{ id: 'm-c', source: 'ml', target: 'clicks' },
				{ id: 'm-r', source: 'ml', target: 'revenue' },
				{ id: 'm-d', source: 'ml', target: 'demand' }
			]
		},
		highlights: ['ml'],
		annotations: [{ targetId: 'ml', text: 'Same techniques, many applications', position: 'left' }]
	}
];

const targetVariableSection: ContentSection = {
	id: 'target-variable',
	type: 'explanation',
	title: 'Understanding the Target Variable',
	explanation: {
		steps: targetVariableSteps
	}
};

// =============================================================================
// Section 3: Dataset Features (Diagram)
// =============================================================================

const datasetFeaturesDiagram: DiagramData = {
	nodes: [
		{ id: 'features', label: '39 Variables', type: 'treatment', x: 210, y: 30 },
		{ id: 'demo', label: 'Demographics\nage, gender', type: 'variable', x: 80, y: 100 },
		{ id: 'behavior', label: 'Behavioral\nrecency, tenure, gym', type: 'variable', x: 210, y: 100 },
		{ id: 'health', label: 'Health\nBMI, cardiac risk', type: 'variable', x: 340, y: 100 },
		{ id: 'geo', label: 'Geographic\ngyms in ZIP', type: 'confounder', x: 120, y: 170 },
		{ id: 'noise', label: 'Noise Variables\n(random)', type: 'outcome', x: 300, y: 170 }
	],
	edges: [
		{ id: 'f-d', source: 'features', target: 'demo' },
		{ id: 'f-b', source: 'features', target: 'behavior' },
		{ id: 'f-h', source: 'features', target: 'health' },
		{ id: 'f-g', source: 'features', target: 'geo' },
		{ id: 'f-n', source: 'features', target: 'noise' }
	]
};

const datasetFeaturesSection: ContentSection = {
	id: 'dataset-features',
	type: 'diagram',
	title: 'Dataset Structure',
	diagram: datasetFeaturesDiagram,
	content: `**Rich, Multi-Dimensional Data**

The smartwatch dataset contains 39 variables across several categories:

**Demographics**
- Age, gender
- Basic profiling data

**Behavioral Indicators**
- Recency (how recently they've engaged)
- Tenure (how long they've been customers)
- Gym membership status

**Health & Geographic**
- BMI (Body Mass Index)
- Cardiac risk scores
- Number of gyms in ZIP code
- Daily physical activity levels

**Noise Variables**
Random variables intentionally added to test model robustness. A good model should learn to ignore these.

**Why This Matters**

The variety of features lets ML discover:
- Which factors actually predict adoption
- Complex interactions between variables
- Non-obvious patterns humans might miss`
};

// =============================================================================
// Section 4: Train-Test Split
// =============================================================================

const trainTestSplitSection: ContentSection = {
	id: 'train-test-split',
	type: 'text',
	title: 'Train-Test Split',
	content: `**Why Split the Data?**

Before building any model, we divide data into separate sets:

**Training Set (70%)**
- Used to teach the model patterns
- Model sees these examples and learns from them
- This is where learning happens

**Test Set (30%)**
- Held out completely during training
- Used only for final evaluation
- Simulates "unseen" future data

**The Core Purpose**

The split serves one critical goal: **honest evaluation**.

Without a test set, a model could simply memorize training data. It would score perfectly on training examples but fail on new customers.

**Preventing Overfitting**

Overfitting occurs when a model:
- Learns noise instead of signal
- Performs great on training data
- Fails on new, unseen data

Train-test split reveals this problem before it's too late.

**Validation Sets**

For tuning hyperparameters (model settings), we often use a third set:
- **Validation set** - Used during development to tune settings
- Prevents "data leakage" from test set into model design

This three-way split (train/validation/test) is the gold standard for reliable ML.`
};

// =============================================================================
// Section 5: Why ML Over Econometrics (Animated Explanation)
// =============================================================================

const mlVsEconometricsSteps: ExplanationStep[] = [
	{
		id: 'compare-1',
		title: 'Step 1: Traditional Econometrics',
		description:
			'Econometric models require pre-specified structures and strong assumptions about relationships. The researcher decides which variables matter and how they interact.',
		diagram: {
			nodes: [
				{ id: 'econ', label: 'Econometrics', type: 'confounder', x: 210, y: 60 }
			],
			edges: []
		},
		highlights: ['econ'],
		annotations: [{ targetId: 'econ', text: 'Pre-specified, assumption-heavy', position: 'bottom' }]
	},
	{
		id: 'compare-2',
		title: 'Step 2: Machine Learning Approach',
		description:
			'ML models are flexible and data-driven. They discover patterns without pre-specified structures, letting the data reveal what matters.',
		diagram: {
			nodes: [
				{ id: 'econ', label: 'Econometrics', type: 'confounder', x: 120, y: 60 },
				{ id: 'ml', label: 'Machine\nLearning', type: 'treatment', x: 300, y: 60 }
			],
			edges: []
		},
		highlights: ['ml'],
		annotations: [{ targetId: 'ml', text: 'Flexible, data-driven', position: 'bottom' }]
	},
	{
		id: 'compare-3',
		title: 'Step 3: ML Advantages',
		description:
			'ML excels when you have many predictors, want automatic feature selection, or need to capture complex nonlinear relationships.',
		diagram: {
			nodes: [
				{ id: 'ml', label: 'ML', type: 'treatment', x: 100, y: 70 },
				{ id: 'many', label: 'Many\nPredictors', type: 'variable', x: 240, y: 30 },
				{ id: 'auto', label: 'Auto Feature\nSelection', type: 'variable', x: 320, y: 70 },
				{ id: 'nonlinear', label: 'Nonlinear\nRelationships', type: 'variable', x: 240, y: 110 }
			],
			edges: [
				{ id: 'm-ma', source: 'ml', target: 'many' },
				{ id: 'm-au', source: 'ml', target: 'auto' },
				{ id: 'm-no', source: 'ml', target: 'nonlinear' }
			]
		},
		highlights: ['many', 'auto', 'nonlinear'],
		annotations: [{ targetId: 'auto', text: 'Key ML strength', position: 'right' }]
	},
	{
		id: 'compare-4',
		title: 'Step 4: The Comparison',
		description:
			'Econometrics offers interpretability and causal inference. ML offers predictive power and flexibility. For pure prediction tasks like adoption forecasting, ML typically wins.',
		diagram: {
			nodes: [
				{ id: 'econ', label: 'Econometrics', type: 'confounder', x: 100, y: 50 },
				{ id: 'ml', label: 'ML', type: 'treatment', x: 100, y: 110 },
				{ id: 'interp', label: 'Interpretable', type: 'variable', x: 280, y: 50 },
				{ id: 'power', label: 'Predictive\nPower', type: 'outcome', x: 280, y: 110 }
			],
			edges: [
				{ id: 'e-i', source: 'econ', target: 'interp' },
				{ id: 'm-p', source: 'ml', target: 'power' }
			]
		},
		highlights: ['power'],
		annotations: [{ targetId: 'power', text: 'ML advantage for prediction', position: 'right' }]
	}
];

const mlVsEconometricsSection: ContentSection = {
	id: 'ml-vs-econometrics',
	type: 'explanation',
	title: 'Why Machine Learning?',
	explanation: {
		steps: mlVsEconometricsSteps
	}
};

// =============================================================================
// Section 6: Next Steps
// =============================================================================

const nextStepsSection: ContentSection = {
	id: 'next-steps',
	type: 'text',
	title: 'Next Steps',
	content: `**Moving to Implementation**

With our problem defined and data understood, we're ready to build models.

**Models to Compare**

In the next lecture, we'll implement and compare:

| Model | Type | Key Feature |
|-------|------|-------------|
| Logistic Regression | Baseline | Interpretable coefficients |
| Ridge (L2) | Regularized | Shrinks coefficients, more stable |
| Lasso (L1) | Regularized | Feature selection via zeroing |
| Random Forest | Ensemble | Handles nonlinearity best |

**Our Goal**

Build models that accurately predict which consumers will adopt the smartwatch, then compare their performance to select the best approach.

**Key Takeaways from This Lecture**

1. **Smartwatch adoption is a binary classification problem** - predict 0 or 1
2. **Rich dataset with 39 variables** - demographics, behavior, health, geography
3. **Train-test split prevents overfitting** - honest evaluation on unseen data
4. **ML outperforms econometrics for prediction** - flexible, data-driven, handles complexity
5. **Noise variables test model robustness** - good models ignore random features

The next lecture brings this all together with Python code and real results.`
};

// =============================================================================
// Export Lecture Content
// =============================================================================

export const lectureContent: LectureContent = {
	lectureId: 'smartwatch-adoption',
	sections: [
		businessProblemSection,
		targetVariableSection,
		datasetFeaturesSection,
		trainTestSplitSection,
		mlVsEconometricsSection,
		nextStepsSection
	]
};
