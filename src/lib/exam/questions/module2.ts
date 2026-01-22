/**
 * Module 2: AI, Prediction & Machine Learning - Question Bank
 *
 * Contains 50 flashcard questions covering all 8 lectures:
 * - L1: Introduction to AI, ML, and Prediction
 * - L2: ML Frameworks (Bias-Variance, Train-Test Split)
 * - L3: Geotracking Data and Privacy
 * - L4: LLMs for Market Research
 * - L5: Prediction vs Causality
 * - L6: AI Ethics
 * - L7: Smartwatch Adoption Case Study
 * - L8: ML Models in Python
 *
 * Distribution: 10 easy, 25 medium, 15 hard
 * Coverage: 5-8 questions per lecture
 */

import type { Question } from '../types';

export const module2Questions: Question[] = [
	// =============================================================================
	// LECTURE 1: Introduction to AI, ML, and Prediction (6 questions: 2 easy, 3 medium, 1 hard)
	// =============================================================================

	// L1 - Easy
	{
		id: 'm2-l1-e1',
		question: 'What is the relationship between AI and Machine Learning?',
		answer:
			'Machine Learning is a subset of Artificial Intelligence. AI is the broad field of creating intelligent machines, while ML specifically focuses on algorithms that learn from data without being explicitly programmed. Not all AI is ML, but all ML is AI.',
		difficulty: 'easy',
		lectureId: 1
	},
	{
		id: 'm2-l1-e2',
		question: 'What question does prediction answer versus causality?',
		answer:
			'Prediction answers "What will happen?" based on patterns and correlations in data. Causality answers "Why did it happen?" by establishing cause-and-effect relationships. Prediction is forward-looking, while causality explains underlying mechanisms.',
		difficulty: 'easy',
		lectureId: 1
	},

	// L1 - Medium
	{
		id: 'm2-l1-m1',
		question: 'Why is prediction becoming increasingly valuable in marketing?',
		answer:
			'Prediction creates value through: (1) Reduced decision-making costs - automating targeting and personalization; (2) Speed - instant recommendations at scale; (3) Personalization - tailored experiences for millions; (4) Forecasting - better inventory and resource planning. As computing costs drop, prediction becomes more accessible and impactful.',
		difficulty: 'medium',
		lectureId: 1
	},
	{
		id: 'm2-l1-m2',
		question: 'What is Deep Learning and how does it differ from traditional ML?',
		answer:
			'Deep Learning uses neural networks with many layers to learn hierarchical representations. Unlike traditional ML which requires manual feature engineering, deep learning automatically discovers relevant features from raw data. It excels with unstructured data like images, text, and audio but requires more data and computation.',
		difficulty: 'medium',
		lectureId: 1
	},
	{
		id: 'm2-l1-m3',
		question: 'In what scenarios might prediction fail even with good ML models?',
		answer:
			'ML prediction fails when: (1) Novel events occur that were not in training data (black swan events); (2) The data distribution shifts significantly; (3) Underlying causal mechanisms change; (4) Edge cases not represented in historical data. Examples: pandemics, natural disasters, celebrity visits. This is why human oversight and domain knowledge remain essential.',
		difficulty: 'medium',
		lectureId: 1
	},

	// L1 - Hard
	{
		id: 'm2-l1-h1',
		question:
			'A marketing team argues that their ML model is useless because it cannot explain WHY customers behave certain ways. How would you respond?',
		answer:
			'This conflates prediction with causality. ML excels at prediction - identifying WHO will respond - which is valuable for targeting, personalization, and forecasting. Causality is needed for understanding WHY and measuring intervention effects. Both are valuable for different purposes. Use ML for operational decisions at scale, and causal inference for strategic evaluation. The best marketing analytics combines both approaches.',
		difficulty: 'hard',
		lectureId: 1
	},

	// =============================================================================
	// LECTURE 2: ML Frameworks (8 questions: 2 easy, 4 medium, 2 hard)
	// =============================================================================

	// L2 - Easy
	{
		id: 'm2-l2-e1',
		question: 'What is the purpose of splitting data into training and test sets?',
		answer:
			'Training data is used to teach the model patterns. Test data is held out and used only for final evaluation. This split prevents overfitting and provides honest performance estimates on truly unseen data, simulating how the model will perform on new customers.',
		difficulty: 'easy',
		lectureId: 2
	},
	{
		id: 'm2-l2-e2',
		question: 'What is overfitting?',
		answer:
			'Overfitting occurs when a model learns noise in the training data rather than true patterns. The model performs excellently on training data but poorly on new, unseen data. It has essentially memorized the training examples rather than learning generalizable patterns.',
		difficulty: 'easy',
		lectureId: 2
	},

	// L2 - Medium
	{
		id: 'm2-l2-m1',
		question: 'Explain the bias-variance trade-off in machine learning.',
		answer:
			'Bias is error from overly simple models that underfit (miss patterns). Variance is error from overly complex models that overfit (capture noise). Simple models have high bias, low variance. Complex models have low bias, high variance. Optimal performance requires balancing both - the classic U-shaped error curve shows minimum total error in the middle.',
		difficulty: 'medium',
		lectureId: 2
	},
	{
		id: 'm2-l2-m2',
		question: 'What is the role of validation data and how does it differ from test data?',
		answer:
			'Validation data is used during model development to tune hyperparameters and make modeling decisions. Test data is used only for final, one-time evaluation. Using test data repeatedly for decisions would cause "data leakage" - the test set would no longer represent truly unseen data. The three-way split (train/validation/test) is the gold standard.',
		difficulty: 'medium',
		lectureId: 2
	},
	{
		id: 'm2-l2-m3',
		question: 'What are hyperparameters and why cannot they be learned from data?',
		answer:
			'Hyperparameters are model settings chosen before training begins, such as learning rate, tree depth, or regularization strength. They control the learning process itself rather than being learned from data. They must be set via validation experiments because the training process optimizes model parameters, not these meta-settings.',
		difficulty: 'medium',
		lectureId: 2
	},
	{
		id: 'm2-l2-m4',
		question: 'What is feature engineering and why does it matter for ML?',
		answer:
			'Feature engineering is the process of creating, transforming, and selecting input variables to improve model performance. Raw data often needs preprocessing: encoding categories, scaling numbers, creating interactions, extracting signals from text. Good features can dramatically improve model performance, though deep learning reduces this need by learning features automatically.',
		difficulty: 'medium',
		lectureId: 2
	},

	// L2 - Hard
	{
		id: 'm2-l2-h1',
		question:
			'Your model achieves 95% accuracy on training data but only 60% on test data. Diagnose the problem and propose solutions.',
		answer:
			'This is classic overfitting - high variance, low bias. The model memorized training data rather than learning generalizable patterns. Solutions: (1) Add regularization (L1/L2 penalties); (2) Reduce model complexity (fewer features, shallower trees); (3) Get more training data; (4) Use dropout (for neural networks); (5) Early stopping; (6) Cross-validation to detect overfitting earlier; (7) Feature selection to remove noise.',
		difficulty: 'hard',
		lectureId: 2
	},
	{
		id: 'm2-l2-h2',
		question:
			'Your model achieves 55% accuracy on both training and test data for a binary classification problem. Diagnose the problem and propose solutions.',
		answer:
			'This is underfitting - high bias, the model is too simple to capture underlying patterns (55% is barely better than random 50% for binary classification). Solutions: (1) Add more features; (2) Use a more complex model (e.g., switch from linear to tree-based); (3) Create interaction features; (4) Reduce regularization if applied; (5) Add polynomial features for nonlinear relationships; (6) Check data quality - the signal may genuinely be weak.',
		difficulty: 'hard',
		lectureId: 2
	},

	// =============================================================================
	// LECTURE 3: Geotracking and Privacy (6 questions: 1 easy, 4 medium, 1 hard)
	// =============================================================================

	// L3 - Easy
	{
		id: 'm2-l3-e1',
		question: 'How much did geotracking data improve prediction accuracy in the restaurant study?',
		answer:
			'Adding geotracking data increased prediction accuracy by approximately 15%. This improvement enabled better staff scheduling, inventory optimization, and targeted marketing. The key insight: real-world behavioral context provides signals that demographics and purchase history alone cannot.',
		difficulty: 'easy',
		lectureId: 3
	},

	// L3 - Medium
	{
		id: 'm2-l3-m1',
		question: 'What is the trade-off between data richness and privacy in marketing analytics?',
		answer:
			'More detailed data improves prediction accuracy but increases privacy risks and regulatory exposure. Stricter privacy protections (aggregation, synthetic data, geofencing) reduce prediction accuracy but protect consumers and comply with regulations. Businesses must find the optimal balance between analytical value and ethical/legal responsibility.',
		difficulty: 'medium',
		lectureId: 3
	},
	{
		id: 'm2-l3-m2',
		question: 'What is synthetic data and why is it useful for privacy protection?',
		answer:
			'Synthetic data is artificially generated data that mimics real patterns without containing actual personal information. It allows analytics while protecting individual privacy. The trade-off: synthetic data typically reduces prediction accuracy (16% drop in the study) because it cannot perfectly replicate all meaningful patterns in real data.',
		difficulty: 'medium',
		lectureId: 3
	},
	{
		id: 'm2-l3-m3',
		question: 'What are GDPR and CCPA, and why should marketers care?',
		answer:
			'GDPR (General Data Protection Regulation) governs data protection in the EU. CCPA (California Consumer Privacy Act) provides similar rights in California. Violations can result in substantial fines, reputational damage, and loss of customer trust. Marketers must design data practices that comply with these regulations while still enabling effective analytics.',
		difficulty: 'medium',
		lectureId: 3
	},
	{
		id: 'm2-l3-m4',
		question:
			'The study found that restricted geotracking still outperforms no geotracking. What is the strategic implication?',
		answer:
			'Even under privacy restrictions, location data provides value. Companies should not abandon geotracking entirely when regulations tighten - they should find privacy-compliant ways to use it. The strategic implication: invest in privacy-preserving analytics methods rather than abandoning data collection altogether.',
		difficulty: 'medium',
		lectureId: 3
	},

	// L3 - Hard
	{
		id: 'm2-l3-h1',
		question:
			'A company wants to use detailed location tracking but faces new privacy regulations. Design a tiered approach that balances accuracy and compliance.',
		answer:
			'Tiered approach: (1) Tier 1 (highest accuracy, most restricted): Full geotracking for users who explicitly consent, with clear value exchange; (2) Tier 2 (moderate): Geofenced data only around business locations; (3) Tier 3 (privacy-first): Aggregated/synthetic data for general analytics. Implement differential privacy, regular audits, and transparent communication. Test accuracy at each tier to understand the true cost of privacy measures.',
		difficulty: 'hard',
		lectureId: 3
	},

	// =============================================================================
	// LECTURE 4: LLMs for Market Research (6 questions: 1 easy, 3 medium, 2 hard)
	// =============================================================================

	// L4 - Easy
	{
		id: 'm2-l4-e1',
		question: 'What is a Large Language Model (LLM)?',
		answer:
			'An LLM is an AI model trained on massive text datasets that can generate human-like text, answer questions, and perform various language tasks. Examples include GPT, Claude, and LLaMA. LLMs learn statistical patterns of language and can simulate human responses with surprising accuracy.',
		difficulty: 'easy',
		lectureId: 4
	},

	// L4 - Medium
	{
		id: 'm2-l4-m1',
		question: 'How can LLMs be used to accelerate market research?',
		answer:
			'LLMs can generate thousands of survey responses quickly that mimic real consumer patterns. This enables: (1) Rapid hypothesis testing before expensive real surveys; (2) Scale - thousands of responses in minutes; (3) Cost reduction - 10-100x cheaper than traditional methods; (4) Iteration - quick testing of different product concepts. LLMs serve as a research accelerator, not replacement.',
		difficulty: 'medium',
		lectureId: 4
	},
	{
		id: 'm2-l4-m2',
		question: 'What is fine-tuning in the context of LLMs?',
		answer:
			'Fine-tuning adapts a pre-trained LLM using domain-specific or task-specific data. For market research, this means training on historical surveys from your market/brand to improve accuracy. Fine-tuned GPT models better predicted willingness-to-pay for new products by learning specific market dynamics rather than relying on general knowledge.',
		difficulty: 'medium',
		lectureId: 4
	},
	{
		id: 'm2-l4-m3',
		question: 'The Microsoft/Harvard study found GPT-generated responses aligned with human responses. What specifically matched?',
		answer:
			'Key alignments: (1) Willingness-to-pay distributions; (2) Reactions to product characteristics; (3) Shape of demand curves (quantity vs price relationships). GPT reproduced "textbook" economic behavior as if responses came from real consumers, validating its use for preliminary research.',
		difficulty: 'medium',
		lectureId: 4
	},

	// L4 - Hard
	{
		id: 'm2-l4-h1',
		question: 'What are the limitations of using LLMs for market research? When should you NOT rely on LLM-generated data?',
		answer:
			'Limitations: (1) Novel product categories - LLMs only know patterns from training data; (2) New market segments not well-represented in training; (3) Rapidly changing preferences; (4) Cultural nuances not captured in text; (5) Extreme or edge-case scenarios. Do not rely on LLMs for: final go/no-go decisions, precise quantitative estimates, or contexts where being wrong is costly. Use LLMs for preliminary exploration, then validate with real research.',
		difficulty: 'hard',
		lectureId: 4
	},
	{
		id: 'm2-l4-h2',
		question:
			'Design a research workflow that integrates LLM-generated insights with traditional market research.',
		answer:
			'Integrated workflow: (1) Start with LLM exploration - generate 1000s of responses to test multiple product concepts quickly; (2) Identify promising directions from patterns; (3) Design focused human survey based on LLM findings; (4) Collect real responses (smaller, targeted sample); (5) Compare LLM vs human responses - calibrate the model; (6) Fine-tune LLM on real data; (7) Use calibrated LLM for ongoing monitoring, humans for critical decisions. This balances speed/cost with accuracy/validity.',
		difficulty: 'hard',
		lectureId: 4
	},

	// =============================================================================
	// LECTURE 5: Prediction + Causality (8 questions: 1 easy, 5 medium, 2 hard)
	// =============================================================================

	// L5 - Easy
	{
		id: 'm2-l5-e1',
		question: 'What is the key difference between prediction and causality in marketing analytics?',
		answer:
			'Prediction identifies patterns to forecast WHAT will happen (who will click, what sales will be). Causality establishes WHY it happened (did the ad cause the purchase, or would they have bought anyway). Prediction is based on correlations; causality requires understanding true cause-and-effect relationships.',
		difficulty: 'easy',
		lectureId: 5
	},

	// L5 - Medium
	{
		id: 'm2-l5-m1',
		question:
			'An ML model predicts that a customer has 80% probability of clicking an ad. Does this mean showing the ad will increase their purchase probability?',
		answer:
			'No. The 80% prediction tells us the customer is likely to click, but not whether the ad CAUSED the click. They might have clicked/purchased anyway - perhaps they were already searching for the product. To know if the ad increases purchases, we need causal inference (experiments or quasi-experimental methods), not just prediction.',
		difficulty: 'medium',
		lectureId: 5
	},
	{
		id: 'm2-l5-m2',
		question: 'Why might targeting the highest-predicted clickers NOT maximize revenue?',
		answer:
			'High-probability clickers might: (1) Click anyway without the ad (no incremental impact); (2) Click but not convert to purchases; (3) Be expensive to reach with diminishing returns. Maximum revenue comes from targeting users with highest INCREMENTAL response - those who would not have converted without the intervention. This requires causal measurement, not just prediction.',
		difficulty: 'medium',
		lectureId: 5
	},
	{
		id: 'm2-l5-m3',
		question: 'Explain how the mobile advertising research combined ML and causal inference.',
		answer:
			'Two-model framework: (1) Targeting Model (ML) predicted which users were likely to click/convert; (2) Outcomes Model (Causal) measured actual incremental revenue from showing ads. Key insight: feeding causal insights back into targeting improved both prediction AND profitability. The models together answered WHO to target and WHETHER targeting works.',
		difficulty: 'medium',
		lectureId: 5
	},
	{
		id: 'm2-l5-m4',
		question: 'How can ML features be used in causal regression?',
		answer:
			'ML can extract features from unstructured data (sentiment, topics, intent from text) that then become control variables in causal regressions. This allows researchers to account for previously unmeasurable confounders. Example: NLP extracts customer sentiment from reviews; these sentiment scores control for attitude differences when estimating causal effects of marketing actions.',
		difficulty: 'medium',
		lectureId: 5
	},
	{
		id: 'm2-l5-m5',
		question: 'The research found that more privacy sometimes led to higher revenue. Explain this counterintuitive finding.',
		answer:
			'Privacy restrictions prevented over-targeting of "obvious" customers who would have converted anyway. This forced the algorithm to find users with genuine incremental response - those who truly needed the ad to convert. Less personalization paradoxically improved efficiency by reducing wasted spend on customers with zero incremental value.',
		difficulty: 'medium',
		lectureId: 5
	},

	// L5 - Hard
	{
		id: 'm2-l5-h1',
		question:
			'A marketing director says: "Our ML model has 90% accuracy, so we do not need experiments." Critique this reasoning.',
		answer:
			'Prediction accuracy tells you nothing about causal impact. A 90% accurate model identifies WHO is likely to convert, not WHETHER your marketing CAUSES conversions. You could perfectly predict who will buy while still wasting money on ads that have zero incremental effect. Experiments are needed to measure if interventions actually change behavior. The director confuses prediction (what will happen) with causation (what our actions cause).',
		difficulty: 'hard',
		lectureId: 5
	},
	{
		id: 'm2-l5-h2',
		question:
			'Design a marketing analytics system that integrates prediction and causality for a subscription service.',
		answer:
			'Integrated system: (1) Prediction layer: ML predicts churn probability, lifetime value, response likelihood for each customer; (2) Causal layer: Run periodic experiments to measure incremental effects of retention offers, upsells, reactivation campaigns; (3) Integration: Use causal estimates to weight predictions - target customers with high churn probability AND high response to intervention; (4) Feedback loop: Actual outcomes update both models; (5) Reporting: Show both predicted vs actual, and incremental vs baseline metrics.',
		difficulty: 'hard',
		lectureId: 5
	},

	// =============================================================================
	// LECTURE 6: AI Ethics (6 questions: 1 easy, 3 medium, 2 hard)
	// =============================================================================

	// L6 - Easy
	{
		id: 'm2-l6-e1',
		question: 'What is algorithmic bias?',
		answer:
			'Algorithmic bias is systematic error in AI systems that creates unfair outcomes, often resulting from biased training data or flawed model design. AI can inherit and amplify historical discrimination even without explicit demographic features, leading to unequal treatment of different groups.',
		difficulty: 'easy',
		lectureId: 6
	},

	// L6 - Medium
	{
		id: 'm2-l6-m1',
		question: 'The Amazon hiring AI case showed bias even though gender was not an input. How did this happen?',
		answer:
			'The model learned from historical hiring data where men dominated technical roles. It identified correlates of gender (certain words, activities, schools) as negative signals without explicitly using gender. The bias was embedded in the patterns, not the explicit features. This shows that removing protected attributes is insufficient for preventing discrimination.',
		difficulty: 'medium',
		lectureId: 6
	},
	{
		id: 'm2-l6-m2',
		question: 'What is the trade-off between accuracy and fairness in AI systems?',
		answer:
			'Debiasing often reduces predictive accuracy because: (1) Removing predictive features that correlate with protected attributes hurts performance; (2) Forcing equal treatment across groups may ignore real differences; (3) Historical patterns may be genuinely predictive even if unfair. However, the crowdlending study showed debiased AI still outperformed biased human decisions, suggesting the trade-off may be smaller than assumed.',
		difficulty: 'medium',
		lectureId: 6
	},
	{
		id: 'm2-l6-m3',
		question: 'What are the three lessons on fairness from the AI ethics lecture?',
		answer:
			'(1) Fairness is contextual - there is no universal formula; what counts as fair depends on the application and stakeholders; (2) Bias is invisible - it can exist even without explicit protected attributes in the data; (3) Debiasing is a choice - it requires intentional, strategic decisions, not automatic processes. Organizations must actively decide how to define and pursue fairness.',
		difficulty: 'medium',
		lectureId: 6
	},

	// L6 - Hard
	{
		id: 'm2-l6-h1',
		question:
			'A credit scoring AI shows different approval rates for different demographic groups, but claims to not use demographic data. Investigate possible causes and recommend solutions.',
		answer:
			'Possible causes: (1) Proxy discrimination - features correlated with demographics (ZIP code, job type) create indirect bias; (2) Historical bias in training data reflects past discrimination; (3) Unequal data quality across groups; (4) Different base rates mask disparate impact. Solutions: (1) Audit for disparate impact across groups; (2) Remove or adjust proxy variables; (3) Use fairness constraints in training; (4) Collect more representative data; (5) Test counterfactually - would decisions change if demographics were different?',
		difficulty: 'hard',
		lectureId: 6
	},
	{
		id: 'm2-l6-h2',
		question:
			'Design an ethical AI framework for a marketing organization that balances personalization effectiveness with consumer protection.',
		answer:
			'Framework components: (1) Data governance - clear consent, minimal collection, retention limits; (2) Transparency - disclose AI use in targeting and recommendations; (3) Fairness audits - regular bias testing across segments; (4) Opt-out mechanisms - easy ways to avoid personalization; (5) Human oversight - humans review high-stakes decisions; (6) Accountability - clear ownership for AI outcomes; (7) Privacy by design - build protection into systems, not as afterthought; (8) Regular review - update policies as technology and regulations evolve.',
		difficulty: 'hard',
		lectureId: 6
	},

	// =============================================================================
	// LECTURE 7: Smartwatch Adoption (5 questions: 1 easy, 3 medium, 1 hard)
	// =============================================================================

	// L7 - Easy
	{
		id: 'm2-l7-e1',
		question: 'What type of ML problem is predicting smartwatch adoption?',
		answer:
			'Binary classification - the outcome variable "adopt" takes only two values: 1 (bought the smartwatch) or 0 (did not buy). The model learns to classify customers into these two categories based on their features.',
		difficulty: 'easy',
		lectureId: 7
	},

	// L7 - Medium
	{
		id: 'm2-l7-m1',
		question: 'Why were "noise variables" included in the smartwatch dataset?',
		answer:
			'Noise variables are random features with no real predictive power. They test model robustness - a good model should learn to ignore them and give them low importance. If a model weights noise variables heavily, it is likely overfitting to random patterns rather than learning true signals.',
		difficulty: 'medium',
		lectureId: 7
	},
	{
		id: 'm2-l7-m2',
		question: 'Why might ML be preferred over econometrics for the smartwatch prediction problem?',
		answer:
			'ML advantages: (1) Handles 39 predictors without pre-specifying relationships; (2) Automatic feature selection identifies what matters; (3) Captures nonlinear relationships that consumer behavior often exhibits; (4) Data-driven rather than assumption-driven. Econometrics requires pre-specified models and strong assumptions that may not hold with high-dimensional, complex behavioral data.',
		difficulty: 'medium',
		lectureId: 7
	},
	{
		id: 'm2-l7-m3',
		question: 'What categories of features are available in the smartwatch dataset and why does this diversity matter?',
		answer:
			'Categories: demographics (age, gender), behavioral (recency, tenure, gym membership), health (BMI, cardiac risk), geographic (gyms in ZIP), activity (daily physical activity). Diversity matters because: (1) Multiple signal sources improve prediction; (2) Different features may be predictive for different customer segments; (3) Allows the model to discover unexpected relationships (e.g., gym proximity predicting tech adoption).',
		difficulty: 'medium',
		lectureId: 7
	},

	// L7 - Hard
	{
		id: 'm2-l7-h1',
		question:
			'The smartwatch problem could also be framed as continuous prediction (demand volume). When would you choose binary classification vs continuous prediction, and what are the trade-offs?',
		answer:
			'Choose binary for: targeting decisions (who to reach), simple action thresholds, limited outcome variation. Choose continuous for: inventory planning (need quantities), budget allocation, understanding demand elasticity. Trade-offs: binary is simpler but loses magnitude information; continuous requires more data and handles outliers harder. Hybrid approach: use binary for customer selection, then continuous for volume prediction among predicted adopters.',
		difficulty: 'hard',
		lectureId: 7
	},

	// =============================================================================
	// LECTURE 8: ML Models in Python (5 questions: 1 easy, 3 medium, 1 hard)
	// =============================================================================

	// L8 - Easy
	{
		id: 'm2-l8-e1',
		question: 'What is the F1 score and when is it useful?',
		answer:
			'F1 score is the harmonic mean of precision and recall. It provides a balanced measure when both false positives and false negatives matter. It is especially useful for imbalanced datasets where accuracy can be misleading (e.g., 95% accuracy is meaningless if 95% of data is one class).',
		difficulty: 'easy',
		lectureId: 8
	},

	// L8 - Medium
	{
		id: 'm2-l8-m1',
		question: 'Why did Random Forest outperform logistic regression models in the smartwatch case?',
		answer:
			'Random Forest achieved 84% accuracy vs 73% for logistic models because: (1) Consumer behavior is nonlinear - trees capture this naturally; (2) Handles feature interactions automatically; (3) Robust to noise through averaging many trees; (4) Does not require feature scaling. The 11% accuracy improvement came from capturing patterns that linear models miss.',
		difficulty: 'medium',
		lectureId: 8
	},
	{
		id: 'm2-l8-m2',
		question: 'What is the difference between Ridge (L2) and Lasso (L1) regularization?',
		answer:
			'Ridge (L2) shrinks all coefficients toward zero but never exactly to zero - improves stability without feature selection. Lasso (L1) can shrink coefficients exactly to zero - performs automatic feature selection by eliminating unimportant variables. Use Ridge when all features are potentially relevant; use Lasso when you want to identify which features matter.',
		difficulty: 'medium',
		lectureId: 8
	},
	{
		id: 'm2-l8-m3',
		question: 'What is the difference between precision and recall? When would you prioritize each?',
		answer:
			'Precision: of predicted positives, how many are truly positive (avoid false alarms). Recall: of actual positives, how many did we catch (avoid missing cases). Prioritize precision when: false positives are costly (spam filtering, fraud alerts). Prioritize recall when: missing cases is costly (disease detection, fraud prevention). Business context determines the right balance.',
		difficulty: 'medium',
		lectureId: 8
	},

	// L8 - Hard
	{
		id: 'm2-l8-h1',
		question:
			'After running all four models, what additional analyses would you recommend to improve the smartwatch prediction system before deployment?',
		answer:
			'Additional analyses: (1) Feature importance from Random Forest - understand drivers; (2) Remove noise variables and retrain - should improve slightly; (3) Hyperparameter tuning via cross-validation; (4) Analyze misclassifications - are errors systematic?; (5) Test on temporal holdout (future data) not just random split; (6) Calibrate probabilities for reliable confidence scores; (7) A/B test the model in production before full rollout; (8) Monitor for data drift post-deployment.',
		difficulty: 'hard',
		lectureId: 8
	}
];
