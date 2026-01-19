/**
 * Lecture 4: Matching Methods
 *
 * This lecture covers methods for handling confounding in observational data:
 * - When RCTs aren't possible
 * - Propensity Score Matching (PSM)
 * - Inverse Probability Weighting (IPW)
 * - Synthetic Control Methods
 * - Limitations of matching approaches
 */

import type { LectureContent, ContentSection } from '../types';
import type { DiagramData } from '$lib/components/diagrams';
import { createMatchingExplanation } from '$lib/components/animation';

// =============================================================================
// Section 1: When RCTs Aren't Possible
// =============================================================================

const introSection: ContentSection = {
	id: 'intro',
	type: 'text',
	title: 'When RCTs Are Not Possible',
	content: `Randomized controlled trials (RCTs) are the gold standard for causal inference, but they are not always feasible. In marketing and business contexts, we often face situations where randomization is impossible, unethical, or prohibitively expensive:

**Ethical constraints:** We cannot randomly assign customers to receive defective products or poor service to study the effects on loyalty.

**Practical constraints:** We cannot randomly assign store locations, historical advertising decisions, or competitor actions.

**Cost constraints:** Large-scale RCTs across diverse markets may be too expensive to run.

**Timing constraints:** When we need answers about past decisions, we must work with existing observational data.

In these cases, we turn to **matching methods** - statistical techniques that attempt to create "pseudo-randomization" by finding comparable treated and control units from observational data. The key insight is that if we can make the treated and control groups similar on all relevant characteristics, we can approximate what an RCT would have shown.`
};

// =============================================================================
// Section 2: The Matching Idea (Animated Explanation)
// =============================================================================

const matchingExplanationSection: ContentSection = {
	id: 'matching-explanation',
	type: 'explanation',
	title: 'Understanding Matching',
	explanation: {
		steps: createMatchingExplanation()
	}
};

// =============================================================================
// Section 3: Propensity Score Matching (PSM)
// =============================================================================

const psmDiagram: DiagramData = {
	nodes: [
		{ id: 'covariates', label: 'Covariates X', type: 'variable', x: 210, y: 10 },
		{ id: 'logistic', label: 'Logistic Regression', type: 'variable', x: 210, y: 70 },
		{ id: 'pscore', label: 'e(X) = P(T=1|X)', type: 'confounder', x: 210, y: 130 },
		{ id: 'match', label: 'Match on e(X)', type: 'outcome', x: 210, y: 190 }
	],
	edges: [
		{ id: 'cov-log', source: 'covariates', target: 'logistic' },
		{ id: 'log-ps', source: 'logistic', target: 'pscore' },
		{ id: 'ps-match', source: 'pscore', target: 'match' }
	]
};

const psmSection: ContentSection = {
	id: 'psm',
	type: 'diagram',
	title: 'Propensity Score Matching (PSM)',
	diagram: psmDiagram,
	content: `**Propensity Score Matching** is the most widely used matching method. The propensity score is the probability of receiving treatment given observed covariates:

**e(X) = P(T = 1 | X)**

The key theorem (Rosenbaum & Rubin, 1983) states that if treatment assignment is independent of potential outcomes given X, then it is also independent given the propensity score e(X). This means we can reduce the "curse of dimensionality" - instead of matching on many covariates, we match on a single summary score.

**PSM Implementation Steps:**

1. **Estimate the propensity score:** Run a logistic regression with treatment as the outcome and all confounders as predictors.

2. **Check common support:** Ensure there is overlap in propensity scores between treated and control groups. Units outside the overlap cannot be matched.

3. **Match:** For each treated unit, find one or more control units with similar propensity scores. Common algorithms include nearest neighbor matching, caliper matching, and kernel matching.

4. **Assess balance:** Check that the matched groups have similar covariate distributions.

5. **Estimate the effect:** Compare outcomes between matched treated and control units.

**Marketing Example:** A retailer wants to know if their loyalty program increases spending. They estimate propensity scores using customer demographics, past purchase history, and engagement metrics. They then match loyalty members to non-members with similar scores to estimate the program's causal effect.`
};

// =============================================================================
// Section 4: Inverse Probability Weighting (IPW)
// =============================================================================

const ipwDiagram: DiagramData = {
	nodes: [
		{ id: 'treated', label: 'Treated (T=1)', type: 'treatment', x: 60, y: 60 },
		{ id: 'control', label: 'Control (T=0)', type: 'control', x: 360, y: 60 },
		{ id: 'weight-t', label: 'Weight: 1/e(X)', type: 'variable', x: 60, y: 130 },
		{ id: 'weight-c', label: 'Weight: 1/(1-e(X))', type: 'variable', x: 360, y: 130 },
		{ id: 'ate', label: 'Weighted ATE', type: 'outcome', x: 210, y: 190 }
	],
	edges: [
		{ id: 't-wt', source: 'treated', target: 'weight-t' },
		{ id: 'c-wc', source: 'control', target: 'weight-c' },
		{ id: 'wt-ate', source: 'weight-t', target: 'ate' },
		{ id: 'wc-ate', source: 'weight-c', target: 'ate' }
	]
};

const ipwSection: ContentSection = {
	id: 'ipw',
	type: 'diagram',
	title: 'Inverse Probability Weighting (IPW)',
	diagram: ipwDiagram,
	content: `**Inverse Probability Weighting** is an alternative to matching that uses all observations but reweights them to create balance. Instead of discarding unmatched units, IPW upweights units that are "surprising" given their treatment status.

**The Intuition:**

- A treated unit with a low propensity score (unlikely to be treated given their characteristics) is "surprising" and gets a high weight
- A control unit with a high propensity score (should have been treated but wasn't) is also "surprising" and gets a high weight
- This reweighting creates a pseudo-population where treatment is independent of covariates

**The IPW Estimator:**

For the Average Treatment Effect (ATE):
- Weight treated units by **1 / e(X)**
- Weight control units by **1 / (1 - e(X))**

**ATE = E[Y * T / e(X)] - E[Y * (1-T) / (1 - e(X))]**

**Advantages of IPW over PSM:**
- Uses all data (no units discarded)
- Easy to extend to continuous treatments
- Can be combined with regression for "doubly robust" estimators

**Disadvantages:**
- Can have high variance when propensity scores are extreme (near 0 or 1)
- Sensitive to misspecification of the propensity score model

**Marketing Example:** An e-commerce company uses IPW to estimate the effect of showing personalized recommendations. They weight customers inversely by their probability of seeing recommendations (based on session features) to estimate what average sales would be if everyone saw (or didn't see) recommendations.`
};

// =============================================================================
// Section 5: Synthetic Control Method
// =============================================================================

const syntheticDiagram: DiagramData = {
	nodes: [
		{ id: 'treated-unit', label: 'California', type: 'treatment', x: 60, y: 40 },
		{ id: 'donor1', label: 'Texas', type: 'control', x: 280, y: 20 },
		{ id: 'donor2', label: 'Florida', type: 'control', x: 340, y: 60 },
		{ id: 'donor3', label: 'New York', type: 'control', x: 280, y: 100 },
		{ id: 'synthetic', label: 'Synthetic CA', type: 'variable', x: 170, y: 120 },
		{ id: 'effect', label: 'Treatment Effect', type: 'outcome', x: 115, y: 180 }
	],
	edges: [
		{ id: 'd1-syn', source: 'donor1', target: 'synthetic', label: 'w1' },
		{ id: 'd2-syn', source: 'donor2', target: 'synthetic', label: 'w2' },
		{ id: 'd3-syn', source: 'donor3', target: 'synthetic', label: 'w3' },
		{ id: 't-eff', source: 'treated-unit', target: 'effect' },
		{ id: 'syn-eff', source: 'synthetic', target: 'effect', style: 'dashed' }
	]
};

const syntheticSection: ContentSection = {
	id: 'synthetic-control',
	type: 'diagram',
	title: 'Synthetic Control Method',
	diagram: syntheticDiagram,
	content: `The **Synthetic Control Method** (Abadie & Gardeazabal, 2003; Abadie et al., 2010) is designed for situations where we have very few treated units - often just one. It creates a "synthetic" control by optimally weighting untreated units to match the pre-treatment trajectory of the treated unit.

**The Setup:**

Imagine California implements a new policy, and we want to estimate its effect. We have data on California and all other states before and after the policy.

**The Method:**

1. Choose a "donor pool" of control units (other states that did not implement the policy)

2. Find weights w1, w2, w3, ... for donor units that minimize the distance between:
   - Weighted average of donors' pre-treatment outcomes
   - Treated unit's pre-treatment outcomes

3. The "synthetic control" is this weighted average of donors

4. The treatment effect is the difference between the treated unit and its synthetic counterpart in the post-treatment period

**Key Advantages:**
- Works with just one treated unit
- Creates transparent, interpretable counterfactual
- Pre-treatment fit validates the approach
- Widely used in policy evaluation

**Marketing Example:** A retail chain tests a new store format in one flagship location. They create a synthetic control using a weighted combination of similar stores that didn't get the new format. If the synthetic perfectly tracks the flagship store before the renovation, the post-renovation gap reveals the format's causal effect.`
};

// =============================================================================
// Section 6: Limitations of Matching Methods
// =============================================================================

const limitationsSection: ContentSection = {
	id: 'limitations',
	type: 'text',
	title: 'Limitations and Assumptions',
	content: `While matching methods are powerful tools, they rely on critical assumptions that may not hold in practice:

**1. Unconfoundedness (Selection on Observables)**

The most critical assumption: treatment assignment must be independent of potential outcomes, conditional on observed covariates. In plain terms, there must be no unobserved confounders. If an unmeasured variable affects both treatment and outcome, matching will still produce biased estimates.

This assumption is **untestable** - we can never prove that we have measured all relevant confounders.

**2. Common Support (Overlap)**

There must be sufficient overlap in covariate distributions between treated and control groups. If some treated units have no comparable controls (or vice versa), we cannot estimate effects for those units. This limits the population for which we can make causal claims.

**3. Correct Model Specification**

For propensity score methods, we must correctly specify the model predicting treatment. Including wrong variables or wrong functional forms can lead to bias.

**4. SUTVA (Stable Unit Treatment Value Assumption)**

Each unit's outcome depends only on its own treatment status, not on others' treatments. Violated when there are spillovers or network effects (e.g., treating one customer affects their friends' behavior).

**When Matching May Not Be Enough:**

- When key confounders are unmeasured (use instrumental variables instead)
- When there's severe overlap violation (consider different identification strategies)
- When you need effects for very different populations (extrapolation is risky)

**Best Practices:**
- Conduct sensitivity analyses to assess robustness to hidden confounders
- Report balance diagnostics transparently
- Be explicit about the estimand (ATT vs ATE) and target population
- Consider doubly robust methods that combine matching/weighting with regression`
};

// =============================================================================
// Export Lecture Content
// =============================================================================

export const lectureContent: LectureContent = {
	lectureId: 'matching-methods',
	sections: [
		introSection,
		matchingExplanationSection,
		psmSection,
		ipwSection,
		syntheticSection,
		limitationsSection
	]
};
