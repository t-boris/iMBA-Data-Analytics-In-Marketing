/**
 * Module 2 glossary concepts: AI, Prediction & Machine Learning.
 * Contains ~30 core concepts covering all 8 lectures.
 */

import type { GlossaryConcept } from '../types';

// ============================================================================
// Module 2 Concepts (~30 concepts)
// ============================================================================

export const module2Concepts: GlossaryConcept[] = [
	// -------------------------------------------------------------------------
	// Core AI/ML Concepts (Lecture 1)
	// -------------------------------------------------------------------------
	{
		id: 'artificial-intelligence',
		term: 'Artificial Intelligence (AI)',
		definition:
			'A broad field encompassing machines that can perform tasks typically requiring human intelligence, including learning, reasoning, and decision-making.',
		extendedDefinition: `Artificial Intelligence is the overarching field of creating intelligent machines. It includes:

- **Narrow AI**: Systems designed for specific tasks (recommendation engines, image recognition)
- **General AI**: Hypothetical systems with human-like general intelligence

In marketing, AI enables personalization at scale, automated decision-making, and pattern recognition in large datasets.`,
		category: 'foundation',
		relatedConcepts: ['machine-learning', 'deep-learning', 'prediction'],
		lectureId: 1,
		moduleId: 'module2',
		tags: ['core', 'introduction', 'technology']
	},
	{
		id: 'machine-learning',
		term: 'Machine Learning (ML)',
		definition:
			'A subset of AI where algorithms learn patterns from data without being explicitly programmed, improving performance through experience.',
		extendedDefinition: `Machine Learning is the practical engine behind most AI applications. Key characteristics:

- **Data-driven**: Models learn from examples rather than hard-coded rules
- **Iterative**: Performance improves as more data becomes available
- **Generalizable**: Can apply learned patterns to new, unseen data

ML types include supervised learning (labeled data), unsupervised learning (pattern discovery), and reinforcement learning (reward-based).`,
		category: 'foundation',
		relatedConcepts: ['artificial-intelligence', 'prediction', 'training-data'],
		lectureId: 1,
		moduleId: 'module2',
		tags: ['core', 'introduction', 'technology']
	},
	{
		id: 'prediction',
		term: 'Prediction',
		definition:
			'The process of using patterns in data to forecast what is likely to happen next, answering "what will occur" rather than "why".',
		extendedDefinition: `Prediction focuses on forecasting outcomes based on correlations:

- **Forward-looking**: Estimates future values or classifications
- **Pattern-based**: Relies on statistical relationships in data
- **Complementary to causality**: Prediction tells us *what*, causality tells us *why*

In marketing, prediction enables targeting, personalization, demand forecasting, and churn prevention.`,
		category: 'foundation',
		relatedConcepts: ['machine-learning', 'causality-ml'],
		lectureId: 1,
		moduleId: 'module2',
		tags: ['core', 'introduction']
	},
	{
		id: 'deep-learning',
		term: 'Deep Learning',
		definition:
			'A subset of ML using neural networks with many layers to learn hierarchical representations of data, particularly effective for unstructured data like images and text.',
		category: 'foundation',
		relatedConcepts: ['machine-learning', 'neural-network', 'large-language-model'],
		lectureId: 1,
		moduleId: 'module2',
		tags: ['technology', 'advanced']
	},
	{
		id: 'neural-network',
		term: 'Neural Network',
		definition:
			'A computing system inspired by biological neural networks, consisting of interconnected nodes (neurons) that process information in layers.',
		category: 'foundation',
		relatedConcepts: ['deep-learning', 'machine-learning'],
		lectureId: 1,
		moduleId: 'module2',
		tags: ['technology', 'model']
	},

	// -------------------------------------------------------------------------
	// ML Framework Concepts (Lecture 2)
	// -------------------------------------------------------------------------
	{
		id: 'training-data',
		term: 'Training Data',
		definition:
			'The subset of data used to teach a machine learning model patterns and relationships.',
		extendedDefinition: `Training data is where learning happens. The model sees these examples and adjusts its parameters to minimize prediction errors.

**Key considerations:**
- Must be representative of the target population
- Larger training sets generally improve performance
- Quality matters more than quantity`,
		category: 'method',
		relatedConcepts: ['test-data', 'validation-data', 'train-test-split'],
		lectureId: 2,
		moduleId: 'module2',
		tags: ['data', 'methodology']
	},
	{
		id: 'test-data',
		term: 'Test Data',
		definition:
			'Data held out from training, used only for final model evaluation to assess performance on truly unseen examples.',
		category: 'method',
		relatedConcepts: ['training-data', 'validation-data', 'train-test-split'],
		lectureId: 2,
		moduleId: 'module2',
		tags: ['data', 'methodology']
	},
	{
		id: 'validation-data',
		term: 'Validation Data',
		definition:
			'A separate dataset used during model development to tune hyperparameters and make modeling decisions without contaminating the test set.',
		category: 'method',
		relatedConcepts: ['training-data', 'test-data', 'hyperparameter'],
		lectureId: 2,
		moduleId: 'module2',
		tags: ['data', 'methodology']
	},
	{
		id: 'train-test-split',
		term: 'Train-Test Split',
		definition:
			'The practice of dividing data into separate training and testing subsets to enable honest evaluation of model performance.',
		extendedDefinition: `A typical split is 70% training, 30% testing. This separation ensures:

- **Honest evaluation**: Model tested on data it never saw during training
- **Overfitting detection**: Reveals when models memorize rather than generalize
- **Reproducibility**: Same split allows consistent comparisons`,
		category: 'method',
		relatedConcepts: ['training-data', 'test-data', 'overfitting'],
		lectureId: 2,
		moduleId: 'module2',
		tags: ['methodology', 'core']
	},
	{
		id: 'bias-ml',
		term: 'Bias (ML)',
		definition:
			'In ML context, error from overly simple models that underfit the data by missing relevant patterns.',
		extendedDefinition: `ML bias differs from statistical bias:

- **High bias**: Model too simple, misses patterns (underfitting)
- **Low bias**: Model captures complex relationships

High bias models have consistent but systematically wrong predictions.`,
		category: 'bias',
		relatedConcepts: ['variance-ml', 'bias-variance-tradeoff', 'underfitting'],
		lectureId: 2,
		moduleId: 'module2',
		tags: ['core', 'model-evaluation']
	},
	{
		id: 'variance-ml',
		term: 'Variance (ML)',
		definition:
			'Error from models that are too sensitive to training data, leading to high variability in predictions across different datasets.',
		extendedDefinition: `High variance means the model captures noise as if it were signal:

- **High variance**: Model changes dramatically with different training data
- **Low variance**: Model stable across different samples

High variance models perform great on training data but poorly on new data.`,
		category: 'bias',
		relatedConcepts: ['bias-ml', 'bias-variance-tradeoff', 'overfitting'],
		lectureId: 2,
		moduleId: 'module2',
		tags: ['core', 'model-evaluation']
	},
	{
		id: 'bias-variance-tradeoff',
		term: 'Bias-Variance Trade-off',
		definition:
			'The fundamental tension in ML between models that are too simple (high bias) and too complex (high variance), with optimal performance in between.',
		extendedDefinition: `The classic U-shaped error curve:

- **Left side**: High bias, low variance (underfitting)
- **Right side**: Low bias, high variance (overfitting)
- **Optimal**: Balance in the middle

This trade-off is why validation sets are essential for model selection.`,
		category: 'foundation',
		relatedConcepts: ['bias-ml', 'variance-ml', 'overfitting', 'underfitting'],
		lectureId: 2,
		moduleId: 'module2',
		tags: ['core', 'theory']
	},
	{
		id: 'overfitting',
		term: 'Overfitting',
		definition:
			'When a model learns noise in training data rather than true patterns, performing well on training data but poorly on new data.',
		category: 'bias',
		relatedConcepts: ['variance-ml', 'underfitting', 'regularization'],
		lectureId: 2,
		moduleId: 'module2',
		tags: ['core', 'model-evaluation']
	},
	{
		id: 'underfitting',
		term: 'Underfitting',
		definition:
			'When a model is too simple to capture the underlying patterns in data, performing poorly on both training and test data.',
		category: 'bias',
		relatedConcepts: ['bias-ml', 'overfitting'],
		lectureId: 2,
		moduleId: 'module2',
		tags: ['core', 'model-evaluation']
	},
	{
		id: 'hyperparameter',
		term: 'Hyperparameter',
		definition:
			'Model settings chosen before training begins (not learned from data), such as learning rate, tree depth, or regularization strength.',
		category: 'method',
		relatedConcepts: ['validation-data', 'regularization'],
		lectureId: 2,
		moduleId: 'module2',
		tags: ['methodology', 'model']
	},

	// -------------------------------------------------------------------------
	// Data & Privacy (Lecture 3)
	// -------------------------------------------------------------------------
	{
		id: 'geotracking-data',
		term: 'Geotracking Data',
		definition:
			'Location-based data that tracks where and when consumers move in physical space, enabling location-aware predictions.',
		category: 'method',
		relatedConcepts: ['consumer-privacy', 'data-anonymization'],
		lectureId: 3,
		moduleId: 'module2',
		tags: ['data', 'privacy']
	},
	{
		id: 'consumer-privacy',
		term: 'Consumer Privacy',
		definition:
			'The right of individuals to control how their personal data is collected, stored, and used by organizations.',
		category: 'foundation',
		relatedConcepts: ['gdpr', 'ccpa', 'data-anonymization'],
		lectureId: 3,
		moduleId: 'module2',
		tags: ['ethics', 'regulation']
	},
	{
		id: 'synthetic-data',
		term: 'Synthetic Data',
		definition:
			'Artificially generated data that mimics real data patterns without containing actual personal information.',
		category: 'method',
		relatedConcepts: ['data-anonymization', 'consumer-privacy'],
		lectureId: 3,
		moduleId: 'module2',
		tags: ['data', 'privacy']
	},
	{
		id: 'gdpr',
		term: 'GDPR',
		definition:
			'General Data Protection Regulation - European Union regulation governing personal data protection and privacy.',
		category: 'foundation',
		relatedConcepts: ['ccpa', 'consumer-privacy'],
		lectureId: 3,
		moduleId: 'module2',
		tags: ['regulation', 'privacy']
	},
	{
		id: 'ccpa',
		term: 'CCPA',
		definition:
			'California Consumer Privacy Act - US state law giving California residents rights over their personal data.',
		category: 'foundation',
		relatedConcepts: ['gdpr', 'consumer-privacy'],
		lectureId: 3,
		moduleId: 'module2',
		tags: ['regulation', 'privacy']
	},
	{
		id: 'data-anonymization',
		term: 'Data Anonymization',
		definition:
			'The process of removing or encrypting personal identifiers from data to protect individual privacy while retaining analytical value.',
		category: 'method',
		relatedConcepts: ['consumer-privacy', 'synthetic-data'],
		lectureId: 3,
		moduleId: 'module2',
		tags: ['privacy', 'methodology']
	},

	// -------------------------------------------------------------------------
	// LLMs (Lecture 4)
	// -------------------------------------------------------------------------
	{
		id: 'large-language-model',
		term: 'Large Language Model (LLM)',
		definition:
			'AI models trained on massive text datasets that can generate human-like text, answer questions, and perform various language tasks.',
		extendedDefinition: `LLMs like GPT have transformed market research:

- **Generate survey responses** that mimic real consumers
- **Scale research** by producing thousands of responses quickly
- **Reduce costs** compared to traditional methods

LLMs are not human but can simulate realistic consumer behavior for preliminary research.`,
		category: 'foundation',
		relatedConcepts: ['deep-learning', 'fine-tuning'],
		lectureId: 4,
		moduleId: 'module2',
		tags: ['technology', 'ai']
	},
	{
		id: 'fine-tuning',
		term: 'Fine-Tuning',
		definition:
			'The process of adapting a pre-trained model using domain-specific or task-specific data to improve performance on particular applications.',
		category: 'method',
		relatedConcepts: ['large-language-model', 'training-data'],
		lectureId: 4,
		moduleId: 'module2',
		tags: ['methodology', 'ai']
	},

	// -------------------------------------------------------------------------
	// Prediction + Causality (Lecture 5)
	// -------------------------------------------------------------------------
	{
		id: 'causality-ml',
		term: 'Causality',
		definition:
			'Understanding cause-and-effect relationships to answer "why" something happened, as opposed to prediction which answers "what" will happen.',
		extendedDefinition: `Prediction and causality are complementary:

- **Prediction**: Identifies patterns, targets customers, forecasts outcomes
- **Causality**: Validates that actions create value, measures true impact

The best marketing analytics combines both approaches.`,
		category: 'foundation',
		relatedConcepts: ['prediction', 'causal-inference'],
		lectureId: 5,
		moduleId: 'module2',
		tags: ['core', 'theory']
	},

	// -------------------------------------------------------------------------
	// Ethics (Lecture 6)
	// -------------------------------------------------------------------------
	{
		id: 'algorithmic-bias',
		term: 'Algorithmic Bias',
		definition:
			'Systematic errors in AI systems that create unfair outcomes, often resulting from biased training data or flawed model design.',
		extendedDefinition: `Algorithmic bias can:

- **Amplify existing inequalities** in historical data
- **Discriminate** against protected groups even without explicit demographic features
- **Undermine trust** when discovered

Addressing bias requires awareness, measurement, and intentional mitigation.`,
		category: 'bias',
		relatedConcepts: ['debiasing', 'fairness-ml'],
		lectureId: 6,
		moduleId: 'module2',
		tags: ['ethics', 'core']
	},
	{
		id: 'fairness-ml',
		term: 'Fairness (AI)',
		definition:
			'The principle that AI systems should treat different groups equitably and not produce discriminatory outcomes.',
		category: 'foundation',
		relatedConcepts: ['algorithmic-bias', 'debiasing'],
		lectureId: 6,
		moduleId: 'module2',
		tags: ['ethics']
	},
	{
		id: 'debiasing',
		term: 'Debiasing',
		definition:
			'Intentional modification of algorithms or training processes to reduce unfair bias and improve fairness.',
		category: 'method',
		relatedConcepts: ['algorithmic-bias', 'fairness-ml'],
		lectureId: 6,
		moduleId: 'module2',
		tags: ['ethics', 'methodology']
	},
	{
		id: 'transparency-ai',
		term: 'Transparency (AI)',
		definition:
			'The degree to which users understand when and how AI is being used in decisions that affect them.',
		category: 'foundation',
		relatedConcepts: ['fairness-ml', 'consumer-privacy'],
		lectureId: 6,
		moduleId: 'module2',
		tags: ['ethics']
	},

	// -------------------------------------------------------------------------
	// Classification & Models (Lectures 7-8)
	// -------------------------------------------------------------------------
	{
		id: 'binary-classification',
		term: 'Binary Classification',
		definition:
			'A prediction problem where the outcome variable takes only two values (0 or 1), such as purchase/no-purchase or click/no-click.',
		category: 'method',
		relatedConcepts: ['logistic-regression', 'random-forest', 'accuracy'],
		lectureId: 7,
		moduleId: 'module2',
		tags: ['model', 'core']
	},
	{
		id: 'logistic-regression',
		term: 'Logistic Regression',
		definition:
			'A probabilistic model for binary classification that estimates the probability of an outcome based on a linear combination of features.',
		category: 'estimator',
		relatedConcepts: ['binary-classification', 'regularization'],
		lectureId: 8,
		moduleId: 'module2',
		tags: ['model', 'baseline']
	},
	{
		id: 'random-forest',
		term: 'Random Forest',
		definition:
			'An ensemble learning method that builds multiple decision trees and combines their predictions, effective at capturing nonlinear relationships.',
		extendedDefinition: `Random Forest advantages:

- **Handles nonlinearity** naturally through tree structures
- **Robust to overfitting** via averaging many trees
- **Feature importance** built-in for interpretability
- **No feature scaling** required`,
		category: 'estimator',
		relatedConcepts: ['binary-classification', 'accuracy'],
		lectureId: 8,
		moduleId: 'module2',
		tags: ['model', 'ensemble']
	},
	{
		id: 'regularization',
		term: 'Regularization',
		definition:
			'Techniques that add penalties to model complexity to prevent overfitting, including L1 (Lasso) and L2 (Ridge) regularization.',
		category: 'method',
		relatedConcepts: ['overfitting', 'logistic-regression'],
		lectureId: 8,
		moduleId: 'module2',
		tags: ['methodology', 'model']
	},
	{
		id: 'accuracy',
		term: 'Accuracy',
		definition:
			'The fraction of predictions that are correct, calculated as (true positives + true negatives) / total predictions.',
		category: 'estimator',
		relatedConcepts: ['precision', 'recall', 'f1-score'],
		lectureId: 8,
		moduleId: 'module2',
		tags: ['metrics', 'evaluation']
	},
	{
		id: 'precision',
		term: 'Precision',
		definition:
			'The proportion of positive predictions that are actually correct: true positives / (true positives + false positives).',
		category: 'estimator',
		relatedConcepts: ['accuracy', 'recall', 'f1-score'],
		lectureId: 8,
		moduleId: 'module2',
		tags: ['metrics', 'evaluation']
	},
	{
		id: 'recall',
		term: 'Recall',
		definition:
			'The proportion of actual positives that were correctly identified: true positives / (true positives + false negatives).',
		category: 'estimator',
		relatedConcepts: ['accuracy', 'precision', 'f1-score'],
		lectureId: 8,
		moduleId: 'module2',
		tags: ['metrics', 'evaluation']
	},
	{
		id: 'f1-score',
		term: 'F1 Score',
		definition:
			'The harmonic mean of precision and recall, providing a balanced measure when both false positives and false negatives matter.',
		category: 'estimator',
		relatedConcepts: ['precision', 'recall', 'accuracy'],
		lectureId: 8,
		moduleId: 'module2',
		tags: ['metrics', 'evaluation']
	},
	{
		id: 'roc-auc',
		term: 'ROC AUC',
		definition:
			'Area Under the ROC Curve - a measure of how well a model ranks predictions, where 1.0 is perfect and 0.5 is random guessing.',
		category: 'estimator',
		relatedConcepts: ['accuracy', 'binary-classification'],
		lectureId: 8,
		moduleId: 'module2',
		tags: ['metrics', 'evaluation']
	},
	{
		id: 'support-vector-classifier',
		term: 'Support Vector Classifier (SVC)',
		definition:
			'A classification algorithm that finds the optimal hyperplane to separate classes by maximizing the margin between the closest data points (support vectors) of each class.',
		extendedDefinition: `Support Vector Classifiers are powerful for binary classification:

**Key Features:**
- **Maximum margin**: Finds the decision boundary with the largest gap between classes
- **Support vectors**: Only the closest points to the boundary determine the model
- **Kernel trick**: Can handle non-linear boundaries using kernel functions (RBF, polynomial)

**When to use SVCs:**
- High-dimensional data (many features)
- Clear margin of separation exists
- Medium-sized datasets (slower on very large data)

**Marketing applications:**
- Customer segmentation
- Churn prediction
- Sentiment classification`,
		category: 'estimator',
		relatedConcepts: ['binary-classification', 'logistic-regression', 'random-forest'],
		lectureId: 8,
		moduleId: 'module2',
		tags: ['model', 'classification']
	},
	{
		id: 'point-solution',
		term: 'Point Solution',
		definition:
			'An AI application that improves a single task or process without changing the broader business system or workflow.',
		extendedDefinition: `From "Power and Prediction" by Agrawal, Gans, and Goldfarb:

**Point solutions** are incremental AI adoptions:
- Replace one step with a better prediction
- Minimal disruption to existing processes
- Quick wins with limited transformation

**Examples:**
- A chatbot for customer service
- An email subject line optimizer
- A single recommendation widget

Point solutions are low-risk but capture only a fraction of AI's potential value.`,
		category: 'foundation',
		relatedConcepts: ['system-transformation', 'prediction'],
		lectureId: 1,
		moduleId: 'module2',
		tags: ['strategy', 'adoption']
	},
	{
		id: 'system-transformation',
		term: 'System-Based Transformation',
		definition:
			'A fundamental redesign of business processes and architecture around AI prediction capabilities, creating new ways of operating rather than just improving existing tasks.',
		extendedDefinition: `From "Power and Prediction" by Agrawal, Gans, and Goldfarb:

**System transformation** reimagines the entire workflow:
- Prediction becomes central to business architecture
- Data flows redesigned for ML consumption
- Decisions restructured for algorithmic optimization
- Feedback loops built for continuous learning

**Key distinction from point solutions:**
- Point solutions: AI improves existing processes
- System transformation: AI enables entirely new processes

**Example: Amazon**
- Point solution: Better product recommendations
- System transformation: Anticipatory shipping (predicting orders before they're placed)

System transformation captures the full value of AI but requires significant organizational change.`,
		category: 'foundation',
		relatedConcepts: ['point-solution', 'prediction'],
		lectureId: 1,
		moduleId: 'module2',
		tags: ['strategy', 'adoption']
	}
];
