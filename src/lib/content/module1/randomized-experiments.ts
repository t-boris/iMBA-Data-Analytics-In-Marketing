/**
 * Lecture 3: Randomized Experiments & A/B Testing
 *
 * This lecture covers:
 * - Why randomization is the gold standard for causal inference
 * - How RCTs work (using animated explanation)
 * - A/B testing in marketing contexts
 * - Sample size and statistical power
 * - Common pitfalls (SUTVA violations, attrition, etc.)
 * - When RCTs aren't possible
 */

import type { LectureContent, ContentSection } from '../types';
import type { DiagramData } from '$lib/components/diagrams';
import { createRCTExplanation } from '$lib/components/animation';

// =============================================================================
// Section 1: Why Randomization?
// =============================================================================

const whyRandomizationSection: ContentSection = {
	id: 'why-randomization',
	type: 'text',
	title: 'Why Randomization is the Gold Standard',
	content: `Randomized Controlled Trials (RCTs) are considered the "gold standard" for establishing causation. But why does random assignment to treatment and control groups solve the causal inference problem?

The answer lies in what randomization accomplishes:

1. **Eliminates selection bias**: When treatment is randomly assigned, the characteristics that might influence outcomes are distributed equally across groups - on average. High-engaged and low-engaged customers are equally likely to end up in either group.

2. **Balances confounders**: Even confounders we don't know about or can't measure are balanced by randomization. This is the key advantage over observational methods.

3. **Creates valid counterfactual**: The control group provides a valid estimate of what WOULD have happened to the treatment group had they not been treated.

4. **Simplifies analysis**: With proper randomization, a simple difference in means gives us an unbiased estimate of the Average Treatment Effect (ATE).

In marketing, A/B tests are the most common application of randomized experiments. When done correctly, they provide the most credible evidence for causal effects of marketing interventions.`
};

// =============================================================================
// Section 2: How RCTs Work (Animated)
// =============================================================================

const rctSection: ContentSection = {
	id: 'how-rcts-work',
	type: 'explanation',
	title: 'How Randomized Experiments Work',
	explanation: {
		steps: createRCTExplanation()
	}
};

// =============================================================================
// Section 3: A/B Testing in Marketing
// =============================================================================

const abTestDiagram: DiagramData = {
	nodes: [
		{ id: 'visitors', label: 'Visitors', type: 'variable', x: 210, y: 20 },
		{ id: 'variant-a', label: 'Control (A)', type: 'control', x: 60, y: 100 },
		{ id: 'variant-b', label: 'Treatment (B)', type: 'treatment', x: 360, y: 100 }
	],
	edges: [
		{ id: 'v-a', source: 'visitors', target: 'variant-a', label: '50%' },
		{ id: 'v-b', source: 'visitors', target: 'variant-b', label: '50%' }
	]
};

const abTestSection: ContentSection = {
	id: 'ab-testing',
	type: 'diagram',
	title: 'A/B Testing in Marketing',
	diagram: abTestDiagram,
	content: `A/B testing is the practical application of randomized experiments in digital marketing. Here's a typical setup:

**The Process:**
1. Define a clear hypothesis (e.g., "A new button color will increase click-through rate")
2. Randomly assign visitors to see either Variant A (control) or Variant B (treatment)
3. Measure the outcome of interest (clicks, conversions, revenue)
4. Compare outcomes between groups to estimate the causal effect

**What can be tested:**
- Landing page designs and copy
- Email subject lines and content
- Pricing strategies
- Ad creatives and targeting
- Product recommendations
- Checkout flow modifications

**Key principle**: Only ONE variable should change between variants. If you change the button color AND the headline, you won't know which change caused any difference in outcomes.`
};

// =============================================================================
// Section 4: Sample Size & Power
// =============================================================================

const sampleSizeSection: ContentSection = {
	id: 'sample-size',
	type: 'text',
	title: 'Sample Size and Statistical Power',
	content: `One of the most common mistakes in A/B testing is running experiments with too few observations. Understanding statistical power is essential for designing effective experiments.

**Key Concepts:**

- **Statistical Power**: The probability of detecting a true effect when one exists. Typically, we aim for 80% power.
- **Significance Level (alpha)**: The probability of falsely detecting an effect when none exists. Usually set at 5%.
- **Minimum Detectable Effect (MDE)**: The smallest effect size you want to be able to detect.

**The Sample Size Trade-off:**

Larger samples increase power but cost more time and resources. The required sample size depends on:

1. **Baseline conversion rate**: Lower baselines need larger samples
2. **Minimum detectable effect**: Smaller effects need larger samples
3. **Desired power**: Higher power needs larger samples
4. **Variance in the outcome**: Higher variance needs larger samples

**Rule of thumb**: For typical conversion rates (1-10%), you often need thousands of observations per variant to detect meaningful effects (e.g., 10-20% relative lift).

**Warning**: "Peeking" at results before reaching your planned sample size and stopping early inflates false positive rates. Pre-commit to your sample size or use sequential testing methods.`
};

// =============================================================================
// Section 5: Common Pitfalls
// =============================================================================

const pitfallsSection: ContentSection = {
	id: 'pitfalls',
	type: 'text',
	title: 'Common Pitfalls in A/B Testing',
	content: `Even well-intentioned experiments can fail. Here are the most common pitfalls:

**1. SUTVA Violations**
The Stable Unit Treatment Value Assumption requires that one unit's treatment doesn't affect another's outcome. Violated when:
- Users share accounts or devices
- Network effects exist (social platforms)
- Treatment affects inventory/supply

**2. Differential Attrition**
If treatment causes some users to drop out differently than control, your remaining samples are no longer comparable. For example, a frustrating new checkout flow might cause more treatment users to abandon.

**3. Treatment Contamination**
When control group members are exposed to the treatment:
- Users clearing cookies get re-randomized
- Word-of-mouth about the treatment variant
- Employees inadvertently sharing information

**4. Novelty Effect**
Users may respond differently to something simply because it's new, not because it's better. Effects may diminish over time.

**5. Multiple Comparisons**
Testing many variants or metrics inflates false positive rates. If you test 20 things at 5% significance, you expect one false positive even with no real effects.`
};

// =============================================================================
// Section 6: When RCTs Aren't Possible
// =============================================================================

const whenNotPossibleSection: ContentSection = {
	id: 'when-not-possible',
	type: 'text',
	title: 'When RCTs Aren\'t Possible',
	content: `While RCTs are the gold standard, they're not always feasible. Understanding these limitations helps us know when to turn to other methods.

**Practical Constraints:**

- **Ethical concerns**: You can't randomly assign customers to receive harmful treatments or withhold beneficial ones indefinitely
- **Cost and time**: Some experiments are too expensive or take too long to run
- **Scale requirements**: Some treatments can only be applied at aggregate levels (store, region, time period)
- **Stakeholder resistance**: Business teams may resist random assignment that could disadvantage some customers

**Technical Challenges:**

- **Spillover effects**: Hard to isolate treatment when users interact
- **Long-term outcomes**: Difficult to maintain randomization over extended periods
- **Rare events**: May take enormous samples to detect effects on infrequent outcomes

**Historical Questions:**

- **Past decisions**: Can't randomize things that already happened
- **Policy changes**: One-time events can't be repeated with different treatments

**What to do instead:**

When randomization isn't possible, we turn to quasi-experimental methods:
- **Matching methods** (next lecture): Create comparable groups from observational data
- **Instrumental Variables**: Exploit external sources of random variation
- **Difference-in-Differences**: Compare changes over time between affected and unaffected groups

These methods require stronger assumptions but can still provide credible causal evidence when designed carefully.`
};

// =============================================================================
// Export Lecture Content
// =============================================================================

export const lectureContent: LectureContent = {
	lectureId: 'randomized-experiments',
	sections: [
		whyRandomizationSection,
		rctSection,
		abTestSection,
		sampleSizeSection,
		pitfallsSection,
		whenNotPossibleSection
	]
};
