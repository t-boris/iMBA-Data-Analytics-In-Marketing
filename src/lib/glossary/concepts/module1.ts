/**
 * Module 1 glossary concepts: Causal Inference Foundations.
 * Contains ~35 core concepts covering all 8 lectures.
 */

import type { GlossaryConcept } from '../types';
import type { DiagramData } from '$lib/components/diagrams';

// ============================================================================
// Diagram Data for Key Concepts
// ============================================================================

const confoundingDiagram: DiagramData = {
	nodes: [
		{ id: 'confounder', label: 'Confounder (Z)', type: 'confounder', x: 150, y: 50 },
		{ id: 'treatment', label: 'Treatment (T)', type: 'treatment', x: 50, y: 150 },
		{ id: 'outcome', label: 'Outcome (Y)', type: 'outcome', x: 250, y: 150 }
	],
	edges: [
		{ id: 'e1', source: 'confounder', target: 'treatment', style: 'solid' },
		{ id: 'e2', source: 'confounder', target: 'outcome', style: 'solid' },
		{ id: 'e3', source: 'treatment', target: 'outcome', style: 'solid' }
	]
};

const colliderDiagram: DiagramData = {
	nodes: [
		{ id: 'treatment', label: 'Treatment (T)', type: 'treatment', x: 50, y: 50 },
		{ id: 'unobserved', label: 'Unobserved (U)', type: 'variable', x: 250, y: 50 },
		{ id: 'collider', label: 'Collider (C)', type: 'confounder', x: 150, y: 150 },
		{ id: 'outcome', label: 'Outcome (Y)', type: 'outcome', x: 250, y: 150 }
	],
	edges: [
		{ id: 'e1', source: 'treatment', target: 'collider', style: 'solid' },
		{ id: 'e2', source: 'unobserved', target: 'collider', style: 'solid' },
		{ id: 'e3', source: 'unobserved', target: 'outcome', style: 'solid' }
	]
};

const ivDiagram: DiagramData = {
	nodes: [
		{ id: 'instrument', label: 'Instrument (Z)', type: 'variable', x: 50, y: 100 },
		{ id: 'treatment', label: 'Treatment (T)', type: 'treatment', x: 150, y: 100 },
		{ id: 'outcome', label: 'Outcome (Y)', type: 'outcome', x: 250, y: 100 },
		{ id: 'unobserved', label: 'Unobserved (U)', type: 'confounder', x: 200, y: 30 }
	],
	edges: [
		{ id: 'e1', source: 'instrument', target: 'treatment', style: 'solid' },
		{ id: 'e2', source: 'treatment', target: 'outcome', style: 'solid' },
		{ id: 'e3', source: 'unobserved', target: 'treatment', style: 'dashed' },
		{ id: 'e4', source: 'unobserved', target: 'outcome', style: 'dashed' }
	]
};

const mediatorDiagram: DiagramData = {
	nodes: [
		{ id: 'treatment', label: 'Treatment (T)', type: 'treatment', x: 50, y: 100 },
		{ id: 'mediator', label: 'Mediator (M)', type: 'variable', x: 150, y: 100 },
		{ id: 'outcome', label: 'Outcome (Y)', type: 'outcome', x: 250, y: 100 }
	],
	edges: [
		{ id: 'e1', source: 'treatment', target: 'mediator', style: 'solid' },
		{ id: 'e2', source: 'mediator', target: 'outcome', style: 'solid' },
		{ id: 'e3', source: 'treatment', target: 'outcome', style: 'dashed', label: 'Direct' }
	]
};

// ============================================================================
// Module 1 Concepts (~35 concepts)
// ============================================================================

export const module1Concepts: GlossaryConcept[] = [
	// -------------------------------------------------------------------------
	// Foundations (Lecture 1)
	// -------------------------------------------------------------------------
	{
		id: 'causal-inference',
		term: 'Causal Inference',
		definition:
			'The process of determining cause-and-effect relationships from data, going beyond mere correlation to establish that changes in one variable actually produce changes in another.',
		extendedDefinition: `Causal inference is the scientific discipline of drawing conclusions about causal relationships from data. Unlike descriptive statistics or prediction, causal inference asks: **"What would happen if we intervened?"**

Key questions in causal inference include:
- Does treatment X actually cause outcome Y?
- What is the magnitude of the causal effect?
- For whom does the effect apply?

The fundamental challenge is that we can never directly observe causation - we can only infer it through careful research design and statistical methods.`,
		category: 'foundation',
		relatedConcepts: ['counterfactual', 'potential-outcomes', 'treatment-effect'],
		lectureId: 1,
		moduleId: 'module1',
		tags: ['core', 'introduction', 'theory']
	},
	{
		id: 'counterfactual',
		term: 'Counterfactual',
		definition:
			'The outcome that would have occurred under a different treatment condition - what would have happened if a treated unit had not been treated, or vice versa.',
		extendedDefinition: `A counterfactual represents an alternate reality: the outcome a unit would have experienced had they received a different treatment.

For example, if a patient took a medication and recovered, the counterfactual is: "What would have happened if this same patient had NOT taken the medication?"

**The Fundamental Problem**: We can never observe both potential outcomes for the same unit at the same time. This is why causal inference requires comparing different units or time periods, introducing potential biases.`,
		category: 'foundation',
		relatedConcepts: ['potential-outcomes', 'fundamental-problem', 'treatment-effect'],
		lectureId: 1,
		moduleId: 'module1',
		tags: ['core', 'theory', 'potential-outcomes']
	},
	{
		id: 'potential-outcomes',
		term: 'Potential Outcomes Framework',
		definition:
			'A framework (also called Rubin Causal Model) where each unit has potential outcomes under each possible treatment condition, though only one can ever be observed.',
		extendedDefinition: `The Potential Outcomes Framework, developed by Donald Rubin, formalizes causal inference using the notation:

- **Y(1)**: Potential outcome if treated
- **Y(0)**: Potential outcome if not treated

For any individual i:
- **Individual Treatment Effect**: tau_i = Y_i(1) - Y_i(0)

The framework makes explicit that causation is defined by comparing what WOULD happen under different conditions, even though we can only observe ONE outcome per unit.`,
		category: 'foundation',
		relatedConcepts: ['counterfactual', 'treatment-effect', 'fundamental-problem', 'ate'],
		lectureId: 1,
		moduleId: 'module1',
		tags: ['core', 'theory', 'rubin']
	},
	{
		id: 'treatment-effect',
		term: 'Treatment Effect',
		definition:
			'The causal effect of a treatment on an outcome - the difference in outcomes between receiving treatment and not receiving treatment for a given unit.',
		extendedDefinition: `The treatment effect is the quantity we want to estimate in causal inference. It can be defined at different levels:

- **Individual Treatment Effect (ITE)**: tau_i = Y_i(1) - Y_i(0) (unobservable for any single unit)
- **Average Treatment Effect (ATE)**: E[Y(1) - Y(0)] across all units
- **Average Treatment Effect on Treated (ATT)**: E[Y(1) - Y(0) | T=1]

Different research designs estimate different treatment effects. Understanding WHICH effect you're estimating is crucial for interpretation.`,
		category: 'foundation',
		relatedConcepts: ['ate', 'att', 'atu', 'potential-outcomes'],
		lectureId: 1,
		moduleId: 'module1',
		tags: ['core', 'effect', 'estimation']
	},
	{
		id: 'fundamental-problem',
		term: 'Fundamental Problem of Causal Inference',
		definition:
			'We can only observe one potential outcome for each unit at any given time - the treatment and control outcomes cannot both be observed for the same unit.',
		extendedDefinition: `The Fundamental Problem states that causal inference is impossible for individual units because we can never observe the counterfactual outcome.

**Example**: If a marketing campaign increases sales, we cannot know what sales would have been without the campaign for those same stores at that same time.

**Solutions**:
1. **Randomization**: Create comparable groups where the average counterfactual can be inferred
2. **Assumptions**: Make identifying assumptions that allow estimation (e.g., parallel trends)
3. **Panel data**: Use the same unit at different times as an approximation`,
		category: 'foundation',
		relatedConcepts: ['counterfactual', 'potential-outcomes', 'selection-bias'],
		lectureId: 1,
		moduleId: 'module1',
		tags: ['core', 'theory', 'problem']
	},

	// -------------------------------------------------------------------------
	// Estimators (Lecture 3)
	// -------------------------------------------------------------------------
	{
		id: 'ate',
		term: 'Average Treatment Effect (ATE)',
		definition:
			'The average causal effect of treatment across the entire population, measuring what would happen on average if everyone received treatment versus no one receiving treatment.',
		extendedDefinition: `The ATE answers: "What is the average effect if we applied the treatment to everyone in the population?"

**Formula**: ATE = E[Y(1) - Y(0)] = E[Y(1)] - E[Y(0)]

**When estimated correctly**: ATE tells us the expected change in outcome from applying treatment to a randomly selected individual.

**Note**: ATE is the target estimand when you want to know the effect of a universal policy. It differs from ATT when treatment effects are heterogeneous.`,
		category: 'estimator',
		relatedConcepts: ['att', 'atu', 'treatment-effect', 'late'],
		lectureId: 3,
		moduleId: 'module1',
		tags: ['estimand', 'effect', 'population']
	},
	{
		id: 'att',
		term: 'Average Treatment Effect on the Treated (ATT)',
		definition:
			'The average causal effect specifically among those who actually received the treatment, measuring how effective the treatment was for its actual recipients.',
		extendedDefinition: `The ATT answers: "What was the average effect for those who were treated?"

**Formula**: ATT = E[Y(1) - Y(0) | T=1]

**Example**: If we're evaluating a job training program, ATT measures the effect for those who enrolled. This may differ from ATE if people who benefit most are more likely to enroll.

**Methods that estimate ATT**:
- Propensity score matching (typically)
- Regression discontinuity (at the cutoff)
- Difference-in-differences (for treated group)`,
		category: 'estimator',
		relatedConcepts: ['ate', 'atu', 'selection-bias', 'propensity-score'],
		lectureId: 3,
		moduleId: 'module1',
		tags: ['estimand', 'effect', 'treated']
	},
	{
		id: 'atu',
		term: 'Average Treatment Effect on the Untreated (ATU)',
		definition:
			'The average causal effect that treatment would have had on those who did not receive it - the potential benefit for the untreated population.',
		extendedDefinition: `The ATU answers: "What would the effect have been for those who were NOT treated?"

**Formula**: ATU = E[Y(1) - Y(0) | T=0]

**Example**: If a company offers optional training, ATU measures what effect the training would have had on employees who chose not to participate.

**Relationship**: ATE = ATT * P(T=1) + ATU * P(T=0)

ATU is relevant for deciding whether to expand a program to non-participants.`,
		category: 'estimator',
		relatedConcepts: ['ate', 'att', 'selection-bias'],
		lectureId: 3,
		moduleId: 'module1',
		tags: ['estimand', 'effect', 'untreated']
	},
	{
		id: 'late',
		term: 'Local Average Treatment Effect (LATE)',
		definition:
			'The average treatment effect for compliers in an instrumental variables analysis - those whose treatment status is affected by the instrument.',
		extendedDefinition: `LATE (also called Complier Average Causal Effect - CACE) is the estimand in IV analysis.

**Complier types**:
- **Compliers**: Take treatment when encouraged, don't take when not encouraged
- **Always-takers**: Always take treatment regardless of encouragement
- **Never-takers**: Never take treatment regardless of encouragement
- **Defiers**: Do the opposite of encouragement (assumed to not exist)

**LATE** is the treatment effect only for compliers. This may be very different from ATE if compliers are special.

**Example**: In a draft lottery (Vietnam), LATE is the effect of military service for those who would serve only if drafted.`,
		category: 'estimator',
		relatedConcepts: ['iv', 'two-stage-ls', 'ate', 'exclusion-restriction'],
		lectureId: 7,
		moduleId: 'module1',
		tags: ['estimand', 'iv', 'compliers']
	},
	{
		id: 'itt',
		term: 'Intent-to-Treat (ITT)',
		definition:
			'The effect of being assigned to treatment, regardless of whether subjects actually complied with their assignment - comparing groups as originally randomized.',
		extendedDefinition: `ITT compares outcomes based on original treatment ASSIGNMENT, not actual treatment RECEIVED.

**Formula**: ITT = E[Y | Assigned to Treatment] - E[Y | Assigned to Control]

**Advantages**:
- Preserves randomization
- Avoids selection bias from non-compliance
- Estimates real-world policy effects (not everyone complies)

**Relationship to LATE**: LATE = ITT / (Compliance Rate)

**Example**: In a drug trial, ITT compares all patients assigned to the drug vs. placebo, even if some didn't take their pills.`,
		category: 'estimator',
		relatedConcepts: ['late', 'rct', 'ate'],
		lectureId: 3,
		moduleId: 'module1',
		tags: ['estimand', 'compliance', 'rct']
	},

	// -------------------------------------------------------------------------
	// Biases (Lectures 1, 4)
	// -------------------------------------------------------------------------
	{
		id: 'selection-bias',
		term: 'Selection Bias',
		definition:
			'Systematic difference between treatment and control groups that exists prior to treatment, arising when treatment assignment is not random and correlated with potential outcomes.',
		extendedDefinition: `Selection bias occurs when units "select" into treatment based on characteristics related to the outcome.

**Mathematical Form**:
E[Y|T=1] - E[Y|T=0] = ATE + Selection Bias

Selection Bias = E[Y(0)|T=1] - E[Y(0)|T=0]

**Example**: People who attend college have higher earnings. But they may have had higher earnings anyway due to ability, motivation, or family background. Comparing college graduates to non-graduates confounds the effect of education with pre-existing differences.

**Solutions**: Randomization, matching, IV, diff-in-diff, regression discontinuity`,
		category: 'bias',
		relatedConcepts: ['confounding', 'rct', 'unconfoundedness'],
		lectureId: 1,
		moduleId: 'module1',
		tags: ['bias', 'identification', 'endogeneity']
	},
	{
		id: 'confounding',
		term: 'Confounding',
		definition:
			'When a third variable (confounder) influences both the treatment and the outcome, creating a spurious association that can be mistaken for a causal relationship.',
		extendedDefinition: `A confounder is a variable that:
1. Affects the treatment assignment
2. Affects the outcome
3. Is NOT on the causal path from treatment to outcome

**Example**: Ice cream sales and drowning deaths are correlated. But hot weather (confounder) causes both - it's not that ice cream causes drowning.

**In a DAG**: Confounding creates a "backdoor path" from treatment to outcome.

**Solutions**:
- Control for the confounder (if observed)
- Randomize treatment (breaks the T<-C link)
- Find an instrument (unaffected by C)`,
		category: 'bias',
		relatedConcepts: ['confounder-node', 'backdoor-path', 'selection-bias', 'omitted-variable-bias'],
		lectureId: 1,
		moduleId: 'module1',
		diagramData: confoundingDiagram,
		tags: ['bias', 'dag', 'identification']
	},
	{
		id: 'omitted-variable-bias',
		term: 'Omitted Variable Bias',
		definition:
			'Bias in causal estimates arising from excluding a relevant variable that is correlated with both the treatment and outcome from the analysis.',
		extendedDefinition: `OVB occurs when a confounding variable is not included in the regression model.

**Formula**: If true model is Y = b0 + b1*T + b2*X + e, but we estimate Y = b0 + b1*T + e:

Bias = b2 * (correlation between T and X)

**Direction of bias depends on**:
- Sign of omitted variable's effect on outcome (b2)
- Sign of correlation between omitted variable and treatment

**Example**: Estimating returns to education without controlling for ability. If ability increases both education and earnings, we overestimate education's effect.`,
		category: 'bias',
		relatedConcepts: ['confounding', 'selection-bias', 'unconfoundedness'],
		lectureId: 4,
		moduleId: 'module1',
		tags: ['bias', 'regression', 'identification']
	},
	{
		id: 'collider-bias',
		term: 'Collider Bias',
		definition:
			'Bias introduced when conditioning on a variable that is a common effect (collider) of both treatment and outcome, or their causes, opening a non-causal path.',
		extendedDefinition: `A collider is a variable that is caused by two other variables. Conditioning on a collider OPENS a spurious path.

**Example**: Among hospitalized patients (collider of disease and treatment-seeking), we might find that a medication appears harmful. But hospitalization itself is caused by both disease severity and treatment - conditioning on it creates bias.

**The "bad control" problem**: Not all variables should be controlled for! Colliders should NOT be conditioned on.

**In a DAG**: X -> C <- Y means C is a collider. Conditioning on C induces an association between X and Y.`,
		category: 'bias',
		relatedConcepts: ['collider-node', 'confounding', 'dag'],
		lectureId: 4,
		moduleId: 'module1',
		diagramData: colliderDiagram,
		tags: ['bias', 'dag', 'bad-control']
	},

	// -------------------------------------------------------------------------
	// Methods (Lectures 3, 4, 5, 7)
	// -------------------------------------------------------------------------
	{
		id: 'rct',
		term: 'Randomized Controlled Trial (RCT)',
		definition:
			'The gold standard for causal inference where units are randomly assigned to treatment and control groups, ensuring any differences in outcomes can be attributed to the treatment.',
		extendedDefinition: `RCTs eliminate selection bias through random assignment, which ensures:
- Treatment and control groups are comparable on average
- Observed AND unobserved confounders are balanced
- Simple comparison of means estimates the ATE

**Key properties**:
- **Internal validity**: Strong - causation is established
- **External validity**: May be limited - lab vs. field conditions

**Challenges**: Expensive, ethical constraints, compliance issues, spillovers

**In business**: A/B testing is a form of RCT for digital products.`,
		category: 'method',
		relatedConcepts: ['randomization', 'ate', 'balance', 'itt'],
		lectureId: 3,
		moduleId: 'module1',
		tags: ['method', 'gold-standard', 'experiment']
	},
	{
		id: 'matching',
		term: 'Matching',
		definition:
			'A method that pairs treated and control units with similar observable characteristics to create comparable groups, approximating what randomization would achieve.',
		extendedDefinition: `Matching creates comparison groups by finding control units that "look like" treated units on observed covariates.

**Types of matching**:
- **Exact matching**: Same values on all covariates
- **Nearest neighbor**: Closest match in covariate space
- **Caliper matching**: Match within a maximum distance
- **Propensity score matching**: Match on P(T=1|X)

**Assumption**: Unconfoundedness - no unobserved confounders

**Limitations**:
- Cannot match on unobserved characteristics
- May lose observations if no good match exists
- Curse of dimensionality with many covariates`,
		category: 'method',
		relatedConcepts: ['propensity-score', 'unconfoundedness', 'common-support', 'att'],
		lectureId: 4,
		moduleId: 'module1',
		tags: ['method', 'observational', 'selection-on-observables']
	},
	{
		id: 'propensity-score',
		term: 'Propensity Score',
		definition:
			'The probability of receiving treatment given observed characteristics - a single score that summarizes all observed covariates for matching or weighting purposes.',
		extendedDefinition: `The propensity score e(X) = P(T=1|X) reduces the dimensionality problem in matching.

**Rosenbaum-Rubin theorem**: If unconfoundedness holds given X, it also holds given e(X).

**Uses**:
1. **Matching**: Match on propensity score instead of all covariates
2. **Weighting**: Create pseudo-populations (IPW)
3. **Stratification**: Block by propensity score quintiles
4. **Regression**: Include as a control variable

**Estimation**: Typically logistic regression of treatment on covariates.

**Balance check**: After matching/weighting, covariates should be balanced between groups.`,
		category: 'method',
		relatedConcepts: ['matching', 'common-support', 'unconfoundedness'],
		lectureId: 4,
		moduleId: 'module1',
		tags: ['method', 'score', 'matching']
	},
	{
		id: 'iv',
		term: 'Instrumental Variables (IV)',
		definition:
			'A method that uses an external source of variation (instrument) that affects treatment but has no direct effect on the outcome, to identify causal effects despite unmeasured confounding.',
		extendedDefinition: `IV solves the problem of unobserved confounders by finding "natural experiments."

**Requirements for a valid instrument**:
1. **Relevance**: Z affects T (testable)
2. **Exclusion restriction**: Z affects Y ONLY through T (untestable)
3. **Independence**: Z is as good as randomly assigned

**Examples**:
- Distance to college (for education's effect)
- Weather (for attendance effects)
- Birth quarter (for compulsory schooling)
- Draft lottery (for military service effects)

**Estimand**: LATE for compliers`,
		category: 'method',
		relatedConcepts: ['two-stage-ls', 'exclusion-restriction', 'relevance', 'late'],
		lectureId: 7,
		moduleId: 'module1',
		diagramData: ivDiagram,
		tags: ['method', 'endogeneity', 'instrument']
	},
	{
		id: 'did',
		term: 'Difference-in-Differences (DiD)',
		definition:
			'A method comparing the change in outcomes over time between a treatment group and a control group, using the control group trend as the counterfactual for the treated.',
		extendedDefinition: `DiD uses two differences to eliminate both time-invariant confounders and common time trends.

**Formula**: DiD = (Y_treated,after - Y_treated,before) - (Y_control,after - Y_control,before)

**Key assumption**: Parallel trends - absent treatment, both groups would have followed the same trajectory.

**Advantages**:
- Controls for time-invariant unobservables
- Controls for common time shocks
- Works with aggregate data

**Limitations**:
- Parallel trends assumption is untestable
- Treatment timing must be sharp
- Sensitive to functional form`,
		category: 'method',
		relatedConcepts: ['parallel-trends', 'treatment-group', 'control-group'],
		lectureId: 5,
		moduleId: 'module1',
		tags: ['method', 'panel', 'quasi-experiment']
	},
	{
		id: 'two-stage-ls',
		term: 'Two-Stage Least Squares (2SLS)',
		definition:
			'The standard estimation procedure for instrumental variables, first predicting treatment from instruments, then regressing outcome on predicted treatment.',
		extendedDefinition: `2SLS implements IV estimation in two stages:

**Stage 1**: Regress treatment on instrument(s)
T = pi_0 + pi_1*Z + v

**Stage 2**: Regress outcome on predicted treatment
Y = b_0 + b_1*T_hat + u

**Why it works**: T_hat contains only the variation in T caused by Z, which is exogenous.

**Requirements**:
- At least as many instruments as endogenous variables
- F-statistic > 10 for first stage (rule of thumb)

**With controls**: Include same controls in both stages.`,
		category: 'method',
		relatedConcepts: ['iv', 'relevance', 'exclusion-restriction'],
		lectureId: 7,
		moduleId: 'module1',
		tags: ['method', 'estimation', 'iv']
	},

	// -------------------------------------------------------------------------
	// Assumptions (Lectures 2, 4, 5, 7)
	// -------------------------------------------------------------------------
	{
		id: 'sutva',
		term: 'SUTVA (Stable Unit Treatment Value Assumption)',
		definition:
			'The assumption that a unit\'s potential outcomes depend only on their own treatment status, not on others\' treatments, and that there is only one version of treatment.',
		extendedDefinition: `SUTVA has two components:

**1. No interference (spillovers)**:
Unit i's outcome doesn't depend on whether unit j is treated.
- Violated when: Vaccinations (herd immunity), peer effects, market equilibrium effects

**2. No hidden variations of treatment**:
Treatment is well-defined and consistent across units.
- Violated when: Different doctors give "same" treatment differently

**When violated**:
- Standard estimands become undefined
- Need to define network effects or use cluster randomization

**Example of violation**: Estimating effect of job training. If trained workers take jobs from untrained workers, SUTVA is violated.`,
		category: 'assumption',
		relatedConcepts: ['potential-outcomes', 'ate', 'rct'],
		lectureId: 2,
		moduleId: 'module1',
		tags: ['assumption', 'identification', 'spillovers']
	},
	{
		id: 'unconfoundedness',
		term: 'Unconfoundedness',
		definition:
			'The assumption that treatment assignment is independent of potential outcomes conditional on observed covariates - all confounders are measured and controlled for.',
		extendedDefinition: `Also called "selection on observables" or "conditional independence assumption."

**Formal statement**: (Y(0), Y(1)) independent of T | X

Given covariates X, treatment assignment is as good as random.

**Implications**:
- No unobserved confounders after conditioning on X
- Can estimate causal effects by comparing units with same X

**Methods that rely on unconfoundedness**:
- Matching
- Propensity score methods
- Regression adjustment

**Limitation**: Cannot test whether all confounders are observed!`,
		category: 'assumption',
		relatedConcepts: ['matching', 'propensity-score', 'confounding', 'selection-bias'],
		lectureId: 4,
		moduleId: 'module1',
		tags: ['assumption', 'identification', 'observational']
	},
	{
		id: 'parallel-trends',
		term: 'Parallel Trends',
		definition:
			'The key assumption in difference-in-differences that treatment and control groups would have followed the same outcome trajectory in the absence of treatment.',
		extendedDefinition: `Parallel trends means: E[Y(0)_post - Y(0)_pre | T=1] = E[Y(0)_post - Y(0)_pre | T=0]

**Cannot be directly tested** because we don't observe Y(0) for treated group post-treatment.

**Suggestive evidence**:
- Pre-treatment trends look parallel (placebo tests)
- No differential pre-trends
- Event study showing effects only after treatment

**Threats to parallel trends**:
- Groups were already on different trajectories
- Other events differentially affected groups
- Compositional changes over time

**Relaxations**: Parallel trends after conditioning on covariates, or parallel growth rates.`,
		category: 'assumption',
		relatedConcepts: ['did', 'treatment-group', 'control-group'],
		lectureId: 5,
		moduleId: 'module1',
		tags: ['assumption', 'did', 'identification']
	},
	{
		id: 'exclusion-restriction',
		term: 'Exclusion Restriction',
		definition:
			'The assumption in IV analysis that the instrument affects the outcome only through its effect on the treatment - there is no direct effect of the instrument on the outcome.',
		extendedDefinition: `The exclusion restriction states: Z -> Y only through T

**Cannot be tested statistically** - must rely on theory and argument.

**Violations**:
- Direct effect: Z -> Y exists
- Correlated unobservables: Z and U are related

**Example**:
- Instrument: Distance to college
- Treatment: Years of education
- Violation: Distance also affects labor market opportunities directly

**Defense**: Provide compelling argument for why instrument ONLY affects outcome through treatment.`,
		category: 'assumption',
		relatedConcepts: ['iv', 'relevance', 'two-stage-ls'],
		lectureId: 7,
		moduleId: 'module1',
		tags: ['assumption', 'iv', 'identification']
	},
	{
		id: 'relevance',
		term: 'Relevance (First Stage)',
		definition:
			'The assumption in IV analysis that the instrument must have a sufficiently strong correlation with the treatment - the instrument actually affects treatment.',
		extendedDefinition: `Relevance means: Cov(Z, T) != 0

**This IS testable** via the first-stage regression.

**Weak instrument problem**:
- If correlation is small but non-zero, IV estimates have:
  - Large standard errors
  - Finite sample bias toward OLS
  - Unreliable inference

**Rule of thumb**: First-stage F-statistic > 10 (Stock & Yogo)

**Solutions for weak instruments**:
- LIML estimator
- Weak-instrument robust confidence intervals
- Find better instrument`,
		category: 'assumption',
		relatedConcepts: ['iv', 'exclusion-restriction', 'two-stage-ls'],
		lectureId: 7,
		moduleId: 'module1',
		tags: ['assumption', 'iv', 'first-stage']
	},
	{
		id: 'common-support',
		term: 'Common Support (Overlap)',
		definition:
			'The requirement that for each combination of covariate values, there is a positive probability of receiving either treatment or control - both groups exist at all covariate levels.',
		extendedDefinition: `Common support means: 0 < P(T=1|X) < 1 for all X

**Why it matters**:
- Can only estimate treatment effects where we observe both treated and control units
- Extrapolation outside common support requires strong assumptions

**Violations**:
- Certain covariate values only appear in treatment group
- Propensity scores of 0 or 1

**Solutions**:
- Trim sample to region of overlap
- Restrict estimation to common support
- Report how much data is lost

**Diagnostics**: Plot propensity score distributions for treatment and control.`,
		category: 'assumption',
		relatedConcepts: ['propensity-score', 'matching', 'unconfoundedness'],
		lectureId: 4,
		moduleId: 'module1',
		tags: ['assumption', 'matching', 'overlap']
	},

	// -------------------------------------------------------------------------
	// Design Elements (Lectures 3, 6)
	// -------------------------------------------------------------------------
	{
		id: 'treatment-group',
		term: 'Treatment Group',
		definition:
			'The set of units that receive the intervention or treatment being studied, whose outcomes are compared to the control group to estimate effects.',
		extendedDefinition: `The treatment group (or "treated group") consists of units assigned to receive the intervention.

**Characteristics**:
- In RCTs: Randomly selected from the study population
- In observational studies: Those who received treatment (may be non-random)

**Issues to consider**:
- Is assignment complete (all assigned actually treated)?
- Is there contamination (control units receiving treatment)?
- Is the treatment well-defined and consistent?

**Related concepts**:
- Treatment-on-treated: Actual recipients
- Intent-to-treat: Those assigned to treatment`,
		category: 'design',
		relatedConcepts: ['control-group', 'randomization', 'rct', 'att'],
		lectureId: 3,
		moduleId: 'module1',
		tags: ['design', 'groups', 'assignment']
	},
	{
		id: 'control-group',
		term: 'Control Group',
		definition:
			'The set of units that do not receive the treatment, serving as the comparison baseline to estimate what would have happened to treated units without treatment.',
		extendedDefinition: `The control group provides the counterfactual: what outcomes look like without treatment.

**Types of controls**:
- **No treatment**: Pure control receiving nothing
- **Placebo**: Inert treatment (controls for placebo effects)
- **Active control**: Alternative treatment (for comparative effectiveness)
- **Waitlist control**: Will receive treatment later

**Quality of control**:
- Should be comparable to treatment group on observables
- Ideally comparable on unobservables (via randomization)
- Should experience same conditions except for treatment

**Threats**: Spillovers, Hawthorne effects, attrition differences.`,
		category: 'design',
		relatedConcepts: ['treatment-group', 'randomization', 'parallel-trends'],
		lectureId: 3,
		moduleId: 'module1',
		tags: ['design', 'groups', 'counterfactual']
	},
	{
		id: 'randomization',
		term: 'Randomization',
		definition:
			'The process of randomly assigning units to treatment and control groups, ensuring that assignment is independent of potential outcomes and creating comparable groups.',
		extendedDefinition: `Randomization is the key tool for establishing causation because it:

1. **Breaks confounding**: Treatment assignment is independent of all confounders
2. **Creates balance**: Groups are comparable in expectation
3. **Enables simple estimation**: Difference in means = ATE

**Types of randomization**:
- **Simple**: Each unit independently randomized
- **Stratified**: Randomize within blocks of similar units
- **Cluster**: Randomize groups (classrooms, stores)

**Practical considerations**:
- Balance may not hold in small samples
- Check balance on observables after randomization
- Pre-register randomization procedure`,
		category: 'design',
		relatedConcepts: ['rct', 'balance', 'treatment-group', 'control-group'],
		lectureId: 3,
		moduleId: 'module1',
		tags: ['design', 'experiment', 'assignment']
	},
	{
		id: 'balance',
		term: 'Balance',
		definition:
			'The similarity of covariate distributions between treatment and control groups - balanced groups are comparable on observed characteristics before treatment.',
		extendedDefinition: `Balance is achieved when treatment and control groups have similar distributions of covariates.

**Measuring balance**:
- Standardized mean differences (< 0.1 is good)
- Variance ratios
- Visual comparison (histograms, density plots)
- Joint tests of balance

**Achieving balance**:
- Randomization (in expectation)
- Stratification (ex ante)
- Matching (ex post)
- Weighting (ex post)

**Why balance matters**:
- Imbalanced groups suggest confounding
- Unbalanced covariates may affect outcomes
- Reduces model dependence in analysis`,
		category: 'design',
		relatedConcepts: ['randomization', 'matching', 'propensity-score'],
		lectureId: 3,
		moduleId: 'module1',
		tags: ['design', 'diagnostics', 'covariates']
	},
	{
		id: 'external-validity',
		term: 'External Validity',
		definition:
			'Whether the causal findings from a study generalize to other populations, settings, time periods, or treatments beyond the specific study context.',
		extendedDefinition: `External validity asks: "Do these results apply elsewhere?"

**Threats to external validity**:
- **Sample selection**: Study population differs from target population
- **Setting effects**: Lab vs. field, different countries
- **Treatment variation**: Specific implementation may not replicate
- **Time effects**: Effects may change over time
- **Scaling effects**: Effects may differ at larger scale

**Improving external validity**:
- Multi-site studies
- Heterogeneity analysis (does effect vary by subgroup?)
- Field experiments over lab
- Replication in different contexts

**Trade-off**: Often tension between internal validity (clean causal estimate) and external validity (broad applicability).`,
		category: 'design',
		relatedConcepts: ['rct', 'ate', 'treatment-effect'],
		lectureId: 6,
		moduleId: 'module1',
		tags: ['design', 'validity', 'generalization']
	},

	// -------------------------------------------------------------------------
	// DAG Concepts (Lecture 2)
	// -------------------------------------------------------------------------
	{
		id: 'dag',
		term: 'DAG (Directed Acyclic Graph)',
		definition:
			'A visual representation of causal relationships using nodes (variables) and directed edges (arrows showing causal direction), with no cycles allowed.',
		extendedDefinition: `DAGs encode causal assumptions about how variables relate to each other.

**Components**:
- **Nodes**: Variables (treatment, outcome, confounders, etc.)
- **Edges**: Arrows showing direct causal effects
- **Directed**: Arrows point from cause to effect
- **Acyclic**: No variable can cause itself (no loops)

**Uses**:
1. Make causal assumptions explicit
2. Identify confounders to control for
3. Identify colliders to NOT control for
4. Determine if causal effect is identified
5. Communicate causal structure to others

**Rules**:
- d-separation determines conditional independence
- Backdoor criterion identifies sufficient controls`,
		category: 'dag',
		relatedConcepts: ['backdoor-path', 'collider-node', 'confounder-node', 'mediator'],
		lectureId: 2,
		moduleId: 'module1',
		tags: ['dag', 'visualization', 'theory']
	},
	{
		id: 'backdoor-path',
		term: 'Backdoor Path',
		definition:
			'A non-causal path connecting treatment and outcome through one or more confounders - these paths must be blocked to identify the causal effect.',
		extendedDefinition: `A backdoor path is any path from T to Y that has an arrow pointing INTO T.

**Example**: T <- C -> Y is a backdoor path through confounder C.

**Backdoor criterion**:
A set of variables Z satisfies the backdoor criterion if:
1. No variable in Z is a descendant of T
2. Z blocks all backdoor paths from T to Y

**Blocking paths**:
- Conditioning on a variable on the path blocks it
- BUT conditioning on a collider OPENS a path

**Practical use**: Draw DAG -> identify backdoor paths -> find variables to control for.`,
		category: 'dag',
		relatedConcepts: ['dag', 'confounding', 'confounder-node', 'collider-node'],
		lectureId: 2,
		moduleId: 'module1',
		tags: ['dag', 'identification', 'path']
	},
	{
		id: 'collider-node',
		term: 'Collider',
		definition:
			'A variable in a DAG that has two or more arrows pointing into it - conditioning on a collider opens a spurious association between its causes.',
		extendedDefinition: `A collider is created when two variables both cause a third:

X -> C <- Y (C is a collider)

**Key insight**:
- A path through a collider is BLOCKED by default
- Conditioning on a collider OPENS the path (creates spurious association)

**"Explain away" effect**:
If we know C occurred, learning X happened makes Y less likely (and vice versa).

**Example**:
Talent -> Hollywood Success <- Beauty
Among successful actors (conditioning on success), we might see negative correlation between talent and beauty - but this is spurious!

**Rule**: Never condition on a collider (or its descendants) unless necessary.`,
		category: 'dag',
		relatedConcepts: ['collider-bias', 'dag', 'backdoor-path'],
		lectureId: 2,
		moduleId: 'module1',
		tags: ['dag', 'node', 'bad-control']
	},
	{
		id: 'mediator',
		term: 'Mediator',
		definition:
			'A variable through which the treatment affects the outcome - it is on the causal pathway between treatment and outcome.',
		extendedDefinition: `A mediator M lies on the causal path: T -> M -> Y

**Example**:
Education -> Income -> Health
Income mediates the effect of education on health.

**Direct vs. Indirect Effects**:
- **Total effect**: T -> Y (all pathways)
- **Direct effect**: T -> Y (not through M)
- **Indirect effect**: T -> M -> Y (through mediator)

**Should you control for mediators?**
- **No**: If you want the total effect of T on Y
- **Yes**: If you want to decompose into direct/indirect effects

**Warning**: Controlling for a mediator may introduce collider bias if there are unobserved common causes of M and Y.`,
		category: 'dag',
		relatedConcepts: ['dag', 'treatment-effect', 'collider-bias'],
		lectureId: 2,
		moduleId: 'module1',
		diagramData: mediatorDiagram,
		tags: ['dag', 'node', 'mechanism']
	},
	{
		id: 'confounder-node',
		term: 'Confounder (DAG)',
		definition:
			'A variable in a DAG that has arrows pointing to both the treatment and outcome, creating a backdoor path that must be controlled for to identify causal effects.',
		extendedDefinition: `In a DAG, a confounder creates a non-causal association between treatment and outcome:

T <- C -> Y (C is a confounder)

**Properties**:
- Causes (or is associated with) treatment assignment
- Causes (or is associated with) the outcome
- Is NOT caused by the treatment

**Types of confounders**:
- **Observed**: Can be controlled for via regression/matching
- **Unobserved**: Requires IV, RD, or other methods

**Control strategy**:
- Include in regression
- Match on confounder
- Stratify by confounder

**Caution**: Not everything correlated with T and Y is a confounder. Must consider causal structure!`,
		category: 'dag',
		relatedConcepts: ['confounding', 'backdoor-path', 'dag', 'omitted-variable-bias'],
		lectureId: 2,
		moduleId: 'module1',
		tags: ['dag', 'node', 'identification']
	}
];

/**
 * Module 1 concepts count.
 */
export const module1ConceptCount = module1Concepts.length;
