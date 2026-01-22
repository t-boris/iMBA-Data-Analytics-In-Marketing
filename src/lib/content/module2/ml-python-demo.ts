/**
 * Lecture 8: Building and Comparing Predictive Models in Python
 *
 * This lecture covers:
 * - Python libraries for ML (Pandas, NumPy, Scikit-learn)
 * - Loading and preparing data
 * - Train-test split implementation
 * - Classification metrics explained
 * - Model comparison: Logistic, Ridge, Lasso, Random Forest
 */

import type { LectureContent, ContentSection } from '../types';
import type { DiagramData } from '$lib/components/diagrams';
import type { ExplanationStep } from '$lib/components/animation';

// =============================================================================
// Section 1: Python Setup
// =============================================================================

const setupSection: ContentSection = {
	id: 'python-setup',
	type: 'text',
	title: 'Setting Up Python for ML',
	content: `**Essential Libraries**

Before building models, we load the core Python libraries:

\`\`\`python
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score
\`\`\`

**What Each Library Does**

| Library | Purpose |
|---------|---------|
| **Pandas** | Data manipulation and DataFrames |
| **NumPy** | Numerical operations and arrays |
| **Scikit-learn** | ML models, training, and evaluation |

**Why These Tools?**

- **Pandas** makes data loading and cleaning straightforward
- **NumPy** handles the math efficiently under the hood
- **Scikit-learn** provides consistent APIs for all models

This stack is the industry standard for ML in Python.`
};

// =============================================================================
// Section 2: Data Loading
// =============================================================================

const dataLoadingSection: ContentSection = {
	id: 'data-loading',
	type: 'text',
	title: 'Loading the Dataset',
	content: `**Loading the Smartwatch Data**

\`\`\`python
df = pd.read_csv("smartwatch_data.csv")
print(df.shape)
\`\`\`

Output: \`(120000, 40)\`

**Dataset Size**
- **120,000 observations** - plenty of data for reliable ML
- **40 variables** - 39 features plus the target

**Defining Features and Target**

\`\`\`python
# Target variable: did they adopt?
y = df["adopt"]

# Features: everything except the target
X = df.drop("adopt", axis=1)
\`\`\`

**Understanding the Split**

- **X** contains all predictor variables (what we know about each person)
- **y** contains the outcome (0 = didn't buy, 1 = bought)

The model learns patterns in X that predict y.`
};

// =============================================================================
// Section 3: Train-Test Split (Diagram)
// =============================================================================

const trainTestDiagram: DiagramData = {
	nodes: [
		{ id: 'full', label: 'Full Dataset\n120,000 rows', type: 'variable', x: 100, y: 80 },
		{ id: 'train', label: 'Training Set\n70% (84,000)', type: 'treatment', x: 300, y: 40 },
		{ id: 'test', label: 'Test Set\n30% (36,000)', type: 'outcome', x: 300, y: 120 }
	],
	edges: [
		{ id: 'f-tr', source: 'full', target: 'train' },
		{ id: 'f-te', source: 'full', target: 'test' }
	]
};

const trainTestSection: ContentSection = {
	id: 'train-test-split',
	type: 'diagram',
	title: 'Train-Test Split',
	diagram: trainTestDiagram,
	content: `**Splitting the Data**

\`\`\`python
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)
\`\`\`

**The Split Ratio**

- **70% Training** - 84,000 examples for learning
- **30% Testing** - 36,000 examples for evaluation

**Why This Matters**

The test set simulates "future" customers we haven't seen yet. A model that performs well on the test set should generalize to real new customers.

**random_state=42** ensures reproducible results - the same split every time we run the code.`
};

// =============================================================================
// Section 4: Classification Metrics (Animated Explanation)
// =============================================================================

const metricsSteps: ExplanationStep[] = [
	{
		id: 'metric-1',
		title: 'Step 1: Accuracy',
		description:
			'Accuracy is the simplest metric: what fraction of predictions are correct? It works well when classes are balanced.',
		diagram: {
			nodes: [
				{ id: 'accuracy', label: 'Accuracy', type: 'treatment', x: 210, y: 60 }
			],
			edges: []
		},
		highlights: ['accuracy'],
		annotations: [{ targetId: 'accuracy', text: 'Correct / Total', position: 'bottom' }]
	},
	{
		id: 'metric-2',
		title: 'Step 2: Precision',
		description:
			'Precision asks: of all the people we predicted would buy, how many actually bought? High precision means few false alarms.',
		diagram: {
			nodes: [
				{ id: 'accuracy', label: 'Accuracy', type: 'variable', x: 120, y: 60 },
				{ id: 'precision', label: 'Precision', type: 'treatment', x: 300, y: 60 }
			],
			edges: []
		},
		highlights: ['precision'],
		annotations: [{ targetId: 'precision', text: 'True Pos / Predicted Pos', position: 'bottom' }]
	},
	{
		id: 'metric-3',
		title: 'Step 3: Recall',
		description:
			'Recall asks: of all the people who actually bought, how many did we correctly identify? High recall means we catch most buyers.',
		diagram: {
			nodes: [
				{ id: 'accuracy', label: 'Accuracy', type: 'variable', x: 80, y: 60 },
				{ id: 'precision', label: 'Precision', type: 'variable', x: 210, y: 60 },
				{ id: 'recall', label: 'Recall', type: 'treatment', x: 340, y: 60 }
			],
			edges: []
		},
		highlights: ['recall'],
		annotations: [{ targetId: 'recall', text: 'True Pos / Actual Pos', position: 'bottom' }]
	},
	{
		id: 'metric-4',
		title: 'Step 4: F1 Score',
		description:
			'F1 is the harmonic mean of precision and recall. It balances both concerns and is especially useful when classes are imbalanced.',
		diagram: {
			nodes: [
				{ id: 'precision', label: 'Precision', type: 'variable', x: 120, y: 40 },
				{ id: 'recall', label: 'Recall', type: 'variable', x: 120, y: 100 },
				{ id: 'f1', label: 'F1 Score', type: 'outcome', x: 300, y: 70 }
			],
			edges: [
				{ id: 'p-f', source: 'precision', target: 'f1' },
				{ id: 'r-f', source: 'recall', target: 'f1' }
			]
		},
		highlights: ['f1'],
		annotations: [{ targetId: 'f1', text: 'Harmonic mean', position: 'right' }]
	},
	{
		id: 'metric-5',
		title: 'Step 5: ROC AUC',
		description:
			'ROC AUC measures how well the model ranks predictions. A score of 1.0 is perfect ranking; 0.5 is random guessing.',
		diagram: {
			nodes: [
				{ id: 'roc', label: 'ROC AUC', type: 'treatment', x: 210, y: 60 }
			],
			edges: []
		},
		highlights: ['roc'],
		annotations: [{ targetId: 'roc', text: '0.5 = random, 1.0 = perfect', position: 'bottom' }]
	}
];

const metricsSection: ContentSection = {
	id: 'classification-metrics',
	type: 'explanation',
	title: 'Classification Metrics',
	explanation: {
		steps: metricsSteps
	}
};

// =============================================================================
// Section 5: Model Comparison (Animated Explanation)
// =============================================================================

const modelComparisonSteps: ExplanationStep[] = [
	{
		id: 'model-1',
		title: 'Step 1: Logistic Regression Baseline',
		description:
			'Logistic regression is our baseline - simple, interpretable, and fast. It predicts log-odds of adoption based on features.',
		diagram: {
			nodes: [
				{ id: 'logistic', label: 'Logistic\nRegression', type: 'treatment', x: 210, y: 60 }
			],
			edges: []
		},
		highlights: ['logistic'],
		annotations: [{ targetId: 'logistic', text: 'Accuracy ~73%', position: 'bottom' }]
	},
	{
		id: 'model-2',
		title: 'Step 2: Ridge Regression (L2)',
		description:
			'Ridge adds L2 regularization, shrinking coefficients to prevent overfitting. Similar accuracy but more stable.',
		diagram: {
			nodes: [
				{ id: 'logistic', label: 'Logistic', type: 'variable', x: 120, y: 60 },
				{ id: 'ridge', label: 'Ridge (L2)', type: 'treatment', x: 300, y: 60 }
			],
			edges: []
		},
		highlights: ['ridge'],
		annotations: [{ targetId: 'ridge', text: 'Accuracy ~73%', position: 'bottom' }]
	},
	{
		id: 'model-3',
		title: 'Step 3: Lasso Regression (L1)',
		description:
			'Lasso adds L1 regularization, which can zero out unimportant features. Great for feature selection in high-dimensional data.',
		diagram: {
			nodes: [
				{ id: 'logistic', label: 'Logistic', type: 'variable', x: 80, y: 60 },
				{ id: 'ridge', label: 'Ridge', type: 'variable', x: 210, y: 60 },
				{ id: 'lasso', label: 'Lasso (L1)', type: 'treatment', x: 340, y: 60 }
			],
			edges: []
		},
		highlights: ['lasso'],
		annotations: [{ targetId: 'lasso', text: 'Accuracy ~73%', position: 'bottom' }]
	},
	{
		id: 'model-4',
		title: 'Step 4: Random Forest',
		description:
			'Random Forest builds many decision trees and combines their predictions. It handles nonlinear relationships naturally.',
		diagram: {
			nodes: [
				{ id: 'linear', label: 'Linear Models\n~73%', type: 'variable', x: 120, y: 60 },
				{ id: 'rf', label: 'Random\nForest', type: 'outcome', x: 300, y: 60 }
			],
			edges: []
		},
		highlights: ['rf'],
		annotations: [{ targetId: 'rf', text: 'Accuracy ~84%!', position: 'bottom' }]
	},
	{
		id: 'model-5',
		title: 'Step 5: Random Forest Wins',
		description:
			'Random Forest achieves 84% accuracy vs 73% for linear models - a significant improvement by capturing nonlinear patterns in the data.',
		diagram: {
			nodes: [
				{ id: 'winner', label: 'Random Forest\nWINS', type: 'outcome', x: 210, y: 60 }
			],
			edges: []
		},
		highlights: ['winner'],
		annotations: [{ targetId: 'winner', text: '+11% accuracy gain', position: 'bottom' }]
	}
];

const modelComparisonSection: ContentSection = {
	id: 'model-comparison',
	type: 'explanation',
	title: 'Comparing Models',
	explanation: {
		steps: modelComparisonSteps
	}
};

// =============================================================================
// Section 6: Results Table
// =============================================================================

const resultsSection: ContentSection = {
	id: 'results-table',
	type: 'text',
	title: 'Final Results',
	content: `**Model Performance Summary**

| Model | Accuracy | F1 Score | Notes |
|-------|----------|----------|-------|
| Logistic Regression | ~73% | ~72% | Simple baseline |
| Ridge (L2) | ~73% | ~72% | More stable coefficients |
| Lasso (L1) | ~73% | ~72% | Feature selection |
| **Random Forest** | **~84%** | **~83%** | **Best performance** |

**Why Random Forest Wins**

Random Forest outperforms linear models because:

1. **Captures nonlinearity** - Consumer behavior isn't linear
2. **Handles interactions** - Combines features in complex ways
3. **Robust to noise** - Multiple trees average out errors
4. **No feature scaling needed** - Works with raw data

**The Python Code**

\`\`\`python
# Random Forest implementation
rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)
y_pred = rf.predict(X_test)

# Evaluate
print(f"Accuracy: {accuracy_score(y_test, y_pred):.2%}")
print(f"F1 Score: {f1_score(y_test, y_pred):.2%}")
\`\`\`

**Business Impact**

Moving from 73% to 84% accuracy means:
- Better targeting of likely adopters
- Less wasted marketing spend
- More accurate demand forecasting
- Improved customer segmentation`
};

// =============================================================================
// Section 7: Key Takeaways
// =============================================================================

const takeawaysSection: ContentSection = {
	id: 'key-takeaways',
	type: 'text',
	title: 'Key Takeaways',
	content: `**What We Learned**

**1. Random Forest handles nonlinearity best**

Consumer behavior is complex. Random Forest captures patterns that linear models miss, leading to an 11% accuracy improvement.

**2. Regularization improves stability**

Ridge and Lasso don't improve accuracy much here, but they prevent overfitting and make models more reliable on new data.

**3. Lasso enables feature selection**

L1 regularization zeros out unimportant variables, telling us which features actually matter for prediction.

**4. Noise variables test robustness**

A good model should ignore random noise. Checking that noise features get low importance validates model quality.

**5. Metrics matter for business context**

Choose metrics based on business goals:
- **Accuracy** when classes are balanced
- **Precision** when false positives are costly
- **Recall** when missing positives is costly
- **F1** for a balanced view

**Next Steps for Students**

1. Remove noise variables and retrain - does accuracy improve?
2. Print coefficients from logistic/ridge/lasso - which features matter?
3. Try feature importance from Random Forest - what drives predictions?

**Module 2 Complete**

You now understand:
- AI vs ML and why prediction matters
- Bias-variance trade-off and model selection
- Privacy considerations in data use
- LLMs for market research
- Combining prediction with causality
- Ethical AI considerations
- End-to-end ML implementation in Python`
};

// =============================================================================
// Export Lecture Content
// =============================================================================

export const lectureContent: LectureContent = {
	lectureId: 'ml-python-demo',
	sections: [
		setupSection,
		dataLoadingSection,
		trainTestSection,
		metricsSection,
		modelComparisonSection,
		resultsSection,
		takeawaysSection
	]
};
