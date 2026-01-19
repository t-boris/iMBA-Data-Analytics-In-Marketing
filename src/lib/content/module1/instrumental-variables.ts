/**
 * Lecture 5: Instrumental Variables
 *
 * This lecture covers instrumental variables methods:
 * - The endogeneity problem
 * - What makes a valid instrument
 * - Classic examples (Card's distance to college)
 * - Two-Stage Least Squares (2SLS)
 * - Finding instruments in marketing contexts
 */

import type { LectureContent, ContentSection } from '../types';
import type { DiagramData } from '$lib/components/diagrams';
import { createIVExplanation } from '$lib/components/animation';

// =============================================================================
// Section 1: The Endogeneity Problem
// =============================================================================

const introSection: ContentSection = {
	id: 'intro',
	type: 'text',
	title: 'The Endogeneity Problem',
	content: `In the previous lecture, we learned about matching methods that address confounding by adjusting for observed characteristics. But what happens when the confounders are **unobserved**?

**Endogeneity** occurs when the treatment variable is correlated with the error term in our regression - meaning there are unobserved factors that affect both treatment and outcome. This makes ordinary least squares (OLS) regression biased.

**Classic Example: Returns to Education**

Does more education cause higher earnings? The naive approach is to regress earnings on years of schooling. But this estimate is likely biased because:

- **Ability** is an unobserved confounder: Smarter people tend to get more education AND earn more
- **Family background** affects both educational attainment and earnings
- **Motivation** drives both schooling decisions and career success

Simple regression cannot separate the causal effect of education from these confounding factors.

**Why Matching Fails Here:**

Matching methods assume we can measure all confounders. But ability, motivation, and other such factors are inherently difficult to measure. Even with good proxies (test scores, etc.), unmeasured components create bias.

**The Solution: Instrumental Variables**

Instrumental Variables (IV) provide a way to estimate causal effects even with unobserved confounding. The key is finding an "instrument" - a source of exogenous variation in the treatment that is unrelated to the confounders.`
};

// =============================================================================
// Section 2: What is an Instrument? (Animated Explanation)
// =============================================================================

const ivExplanationSection: ContentSection = {
	id: 'iv-explanation',
	type: 'explanation',
	title: 'Understanding Instrumental Variables',
	explanation: {
		steps: createIVExplanation()
	}
};

// =============================================================================
// Section 3: Classic Example - Distance to College
// =============================================================================

const distanceDiagram: DiagramData = {
	nodes: [
		{ id: 'distance', label: 'Distance', type: 'variable', x: 60, y: 100 },
		{ id: 'education', label: 'Education', type: 'treatment', x: 210, y: 100 },
		{ id: 'earnings', label: 'Earnings', type: 'outcome', x: 360, y: 100 },
		{ id: 'ability', label: 'Ability (U)', type: 'confounder', x: 285, y: 20 }
	],
	edges: [
		{ id: 'd-e', source: 'distance', target: 'education' },
		{ id: 'e-earn', source: 'education', target: 'earnings' },
		{ id: 'a-e', source: 'ability', target: 'education', style: 'dashed' },
		{ id: 'a-earn', source: 'ability', target: 'earnings', style: 'dashed' }
	]
};

const distanceSection: ContentSection = {
	id: 'distance-example',
	type: 'diagram',
	title: 'Classic Example: Card (1995)',
	diagram: distanceDiagram,
	content: `David Card's influential study used **proximity to a four-year college** as an instrument for years of education. The logic:

**Why Distance is Relevant (First Condition):**
- Living near a college reduces the cost of attending (commuting, living at home)
- This increases the probability of getting more education
- Empirically, people who grew up near colleges do have more years of schooling

**Why Distance Satisfies Exclusion (Second Condition):**
- Your proximity to a college as a child should not directly affect your adult earnings
- Distance only affects earnings through its effect on education
- This is the key (and debatable!) assumption

**Card's Findings:**
- OLS estimates suggested each year of education increases wages by about 7%
- IV estimates using distance were actually higher (around 13%)
- This suggests OLS may underestimate the returns to education, possibly due to "ability bias" working in an unexpected direction

**Critique and Caveats:**
- Is distance really random? Families who value education might move closer to colleges
- Does distance affect earnings through other channels? (Local labor markets, networks)
- The IV estimate is a "Local Average Treatment Effect" (LATE) - it applies only to "compliers" whose education was affected by distance

This example illustrates both the power and the challenges of IV methods.`
};

// =============================================================================
// Section 4: Two-Stage Least Squares (2SLS)
// =============================================================================

const twoslsDiagram: DiagramData = {
	nodes: [
		{ id: 'z', label: 'Z (Instrument)', type: 'variable', x: 60, y: 80 },
		{ id: 'x-hat', label: 'X-hat (Fitted)', type: 'treatment', x: 210, y: 80 },
		{ id: 'y', label: 'Y (Outcome)', type: 'outcome', x: 360, y: 80 }
	],
	edges: [
		{ id: 'z-xhat', source: 'z', target: 'x-hat', label: 'Stage 1' },
		{ id: 'xhat-y', source: 'x-hat', target: 'y', label: 'Stage 2' }
	]
};

const twoslsSection: ContentSection = {
	id: 'twosls',
	type: 'diagram',
	title: 'Two-Stage Least Squares (2SLS)',
	diagram: twoslsDiagram,
	content: `**Two-Stage Least Squares (2SLS)** is the standard method for implementing IV estimation. As the name suggests, it involves two regression stages:

**Stage 1: First-Stage Regression**

Regress the endogenous treatment variable X on the instrument Z (and any exogenous controls):

**X = alpha + gamma * Z + controls + error**

Save the predicted values X-hat from this regression. X-hat captures only the variation in X that comes from Z.

**Stage 2: Second-Stage Regression**

Regress the outcome Y on the predicted values X-hat (and the same controls):

**Y = beta_0 + beta_1 * X-hat + controls + error**

The coefficient beta_1 is the IV estimate of the causal effect of X on Y.

**Why This Works:**

X-hat contains only the "good" variation in X - the part driven by the exogenous instrument Z. By using X-hat instead of X, we purge the regression of the "bad" variation that was correlated with unobserved confounders.

**Important Technical Notes:**

1. **Standard errors matter:** You must use 2SLS-corrected standard errors (most software does this automatically), not the naive second-stage standard errors.

2. **Weak instruments:** If Z only weakly predicts X (low first-stage F-statistic), the IV estimate can be badly biased. Rule of thumb: first-stage F > 10.

3. **Just-identified vs. over-identified:** With exactly one instrument for one endogenous variable, you're "just-identified." With more instruments than endogenous variables, you can test overidentifying restrictions.

4. **Multiple instruments:** You can have multiple instruments for one treatment variable. 2SLS efficiently combines them.`
};

// =============================================================================
// Section 5: Finding Valid Instruments
// =============================================================================

const instrumentCriteriaDiagram: DiagramData = {
	nodes: [
		{ id: 'z', label: 'Z (Instrument)', type: 'variable', x: 60, y: 60 },
		{ id: 'x', label: 'X (Treatment)', type: 'treatment', x: 210, y: 60 },
		{ id: 'y', label: 'Y (Outcome)', type: 'outcome', x: 360, y: 60 },
		{ id: 'u', label: 'U (Unobserved)', type: 'confounder', x: 285, y: 150 }
	],
	edges: [
		{ id: 'z-x', source: 'z', target: 'x' },
		{ id: 'x-y', source: 'x', target: 'y' },
		{ id: 'u-x', source: 'u', target: 'x', style: 'dashed' },
		{ id: 'u-y', source: 'u', target: 'y', style: 'dashed' }
	]
};

const criteriaSection: ContentSection = {
	id: 'instrument-criteria',
	type: 'diagram',
	title: 'Finding Valid Instruments',
	diagram: instrumentCriteriaDiagram,
	content: `Finding a valid instrument is the central challenge of IV analysis. A valid instrument must satisfy three conditions:

**1. Relevance (Testable)**

Z must be correlated with X. This is testable - just run the first-stage regression and check if gamma is significantly different from zero. The F-statistic on the excluded instruments should exceed 10 (Staiger & Stock rule of thumb).

**2. Exclusion Restriction (Untestable)**

Z must affect Y only through X, not directly. This is fundamentally untestable and must be argued based on theory and institutional knowledge. It is the most controversial assumption in any IV analysis.

**3. Independence (Partially Testable)**

Z must be uncorrelated with unmeasured confounders U. If Z is randomly assigned, this holds by design. With observational instruments, it is assumed based on context.

**Common Sources of Instruments:**

- **Natural experiments:** Policy changes, weather shocks, geographic boundaries
- **Randomization:** Encouragement designs, lottery-based assignment
- **Timing variation:** Staggered rollouts, unexpected events
- **Bureaucratic rules:** Discontinuities in eligibility, assignment cutoffs

**Red Flags for Invalid Instruments:**

- The instrument might directly affect the outcome through other channels
- The instrument is correlated with observable confounders (suggests correlation with unobservables)
- The economic/theoretical story for exclusion is weak
- Different instruments give very different estimates`
};

// =============================================================================
// Section 6: Marketing Applications
// =============================================================================

const marketingSection: ContentSection = {
	id: 'marketing-applications',
	type: 'text',
	title: 'IV Applications in Marketing',
	content: `Instrumental variables have powerful applications in marketing research, especially when we cannot run experiments:

**1. Advertising Effectiveness**

**Problem:** Companies advertise more in periods/markets where they expect high demand, creating endogeneity.

**Instruments:**
- **Advertising price shocks:** Changes in ad prices due to factors unrelated to product demand (e.g., major sporting events affecting TV ad costs)
- **Competitor ad spending:** As an instrument for total category advertising
- **Historical ad patterns:** Lagged decisions as instruments

**2. Price Elasticity**

**Problem:** Prices are set based on expected demand, biasing elasticity estimates.

**Instruments:**
- **Cost shifters:** Changes in input costs, exchange rates, tariffs
- **Hausman instruments:** Prices in other markets (assuming local demand shocks don't affect other markets)
- **Wholesaler costs:** Input prices that affect retail prices but not consumer demand directly

**3. Salesforce Effectiveness**

**Problem:** Salespeople are assigned to territories with different potential, confounding effort-outcome relationships.

**Instruments:**
- **Weather:** Affects ability to make sales calls but not underlying customer demand
- **Territory reassignments:** Exogenous changes in who covers which accounts
- **Distance to customers:** Affects call frequency but not customer needs

**4. Word-of-Mouth Effects**

**Problem:** People talk about products they like AND buy products they hear about.

**Instruments:**
- **Network structure:** Friends of friends as instruments
- **Random seeding:** Experimentally induced early adopters
- **Geographic proximity:** Closeness to early adopters

**Best Practices:**

1. Always present the first-stage results and F-statistics
2. Discuss the exclusion restriction explicitly and address potential violations
3. Compare IV estimates to OLS to understand the bias direction
4. Conduct sensitivity analyses for violations of exclusion
5. Be clear about what population the LATE applies to`
};

// =============================================================================
// Export Lecture Content
// =============================================================================

export const lectureContent: LectureContent = {
	lectureId: 'instrumental-variables',
	sections: [
		introSection,
		ivExplanationSection,
		distanceSection,
		twoslsSection,
		criteriaSection,
		marketingSection
	]
};
