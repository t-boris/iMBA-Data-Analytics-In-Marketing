/**
 * Module 1: Causal Analysis - Question Bank
 *
 * Contains 100 flashcard questions covering all 8 lectures:
 * - L1: Introduction to Causal Analysis
 * - L2: Key Thinkers in Causality (Neyman, Rubin, Pearl)
 * - L3: Randomized Experiments & A/B Testing
 * - L4: Matching Methods
 * - L5: Instrumental Variables
 * - L6: Difference-in-Differences
 * - L7: Field Experiments
 * - L8: Python Implementation
 *
 * Distribution: 20 easy, 40 medium, 40 hard
 * Coverage: ~12-13 questions per lecture
 */

import type { Question } from '../types';

export const module1Questions: Question[] = [
	// =============================================================================
	// LECTURE 1: Introduction to Causal Analysis (13 questions: 3 easy, 5 medium, 5 hard)
	// =============================================================================

	// L1 - Easy
	{
		id: 'm1-l1-e1',
		question: 'What is the fundamental problem of causal inference?',
		answer:
			'We can only observe one potential outcome for each unit - the outcome under the treatment they actually received. We cannot observe what would have happened to the same unit under the alternative treatment condition (the counterfactual).',
		difficulty: 'easy',
		lectureId: 1
	},
	{
		id: 'm1-l1-e2',
		question: 'What is the key difference between correlation and causation?',
		answer:
			'Correlation describes a statistical association between two variables - they tend to move together. Causation means that one variable directly influences or produces changes in another. Correlation does not imply causation because the relationship could be due to confounding variables, reverse causality, or coincidence.',
		difficulty: 'easy',
		lectureId: 1
	},
	{
		id: 'm1-l1-e3',
		question: 'What is a counterfactual in causal inference?',
		answer:
			'A counterfactual is the potential outcome that would have occurred for a unit if they had received a different treatment than they actually did. It represents the "what if" scenario - what would have happened to the same individual under alternative conditions.',
		difficulty: 'easy',
		lectureId: 1
	},

	// L1 - Medium
	{
		id: 'm1-l1-m1',
		question:
			'A study finds that people who drink wine regularly have lower rates of heart disease. Why might this NOT prove that wine causes better heart health?',
		answer:
			'This correlation may not be causal because: (1) Confounding variables - wine drinkers may have higher socioeconomic status, better diets, or healthier lifestyles overall; (2) Selection bias - health-conscious people may choose wine while unhealthy people avoid alcohol; (3) Reverse causality - healthier people may be more likely to drink moderately; (4) Omitted variable bias - unmeasured factors may drive both behaviors.',
		difficulty: 'medium',
		lectureId: 1
	},
	{
		id: 'm1-l1-m2',
		question: 'What is selection bias and how does it threaten causal inference?',
		answer:
			'Selection bias occurs when the treatment and control groups differ systematically in ways other than the treatment itself. This means observed differences in outcomes cannot be attributed solely to the treatment - they may be due to pre-existing differences between groups. Selection bias makes counterfactual comparison invalid because we are not comparing like with like.',
		difficulty: 'medium',
		lectureId: 1
	},
	{
		id: 'm1-l1-m3',
		question: 'What is a confounding variable? Give an example in a marketing context.',
		answer:
			'A confounding variable is a third variable that influences both the treatment and the outcome, creating a spurious association. Example: A company observes that customers who receive promotional emails spend more. However, the confounding variable might be customer engagement - highly engaged customers both open more emails AND spend more, regardless of the emails. The emails may not cause higher spending.',
		difficulty: 'medium',
		lectureId: 1
	},
	{
		id: 'm1-l1-m4',
		question: 'Explain the concept of potential outcomes using a marketing example.',
		answer:
			'Potential outcomes represent the possible values of an outcome under different treatment conditions for the same unit. For a customer exposed to an ad campaign: Y(1) is their spending IF they see the ad, Y(0) is their spending IF they do not see the ad. The causal effect for that individual is Y(1) - Y(0). The fundamental problem is that we observe only Y(1) or Y(0), never both for the same customer.',
		difficulty: 'medium',
		lectureId: 1
	},
	{
		id: 'm1-l1-m5',
		question:
			'What role does temporal precedence play in establishing causation? Is it sufficient?',
		answer:
			'Temporal precedence means the cause must precede the effect in time - a necessary but not sufficient condition for causation. While X must happen before Y for X to cause Y, temporal ordering alone does not establish causation. Other criteria needed include: ruling out confounders, demonstrating a plausible mechanism, showing consistency across contexts, and ideally, experimental manipulation.',
		difficulty: 'medium',
		lectureId: 1
	},

	// L1 - Hard
	{
		id: 'm1-l1-h1',
		question:
			'A company runs a loyalty program where high-spending customers get exclusive discounts. They observe that loyalty members spend 40% more than non-members. What causal inference problems exist here, and how would you address them?',
		answer:
			'Problems: (1) Selection bias - high spenders self-select into the program, so the 40% difference may reflect pre-existing spending patterns, not program effects; (2) Reverse causality - spending causes membership, not vice versa; (3) Confounding - factors like brand affinity drive both membership and spending. Solutions: (1) RCT with random assignment to program eligibility; (2) Regression discontinuity if there is a spending threshold; (3) Difference-in-differences comparing spending changes before/after joining vs. non-members; (4) Matching on pre-period spending and demographics.',
		difficulty: 'hard',
		lectureId: 1
	},
	{
		id: 'm1-l1-h2',
		question:
			'Explain why "controlling for" confounders in regression may not solve the causal inference problem. What conditions must hold?',
		answer:
			'Controlling for confounders in regression only works under strict conditions: (1) All confounders must be observed and correctly measured - unobserved confounders still bias estimates; (2) The functional form must be correctly specified - nonlinear relationships or interactions can bias results; (3) No collider bias - conditioning on variables affected by both treatment and outcome opens backdoor paths; (4) No measurement error in confounders - this attenuates control and leaves residual confounding; (5) No post-treatment variables - controlling for mediators or consequences of treatment distorts the causal effect.',
		difficulty: 'hard',
		lectureId: 1
	},
	{
		id: 'm1-l1-h3',
		question:
			'What is the stable unit treatment value assumption (SUTVA) and why is it critical for causal inference? Give an example of a violation.',
		answer:
			'SUTVA has two parts: (1) No interference - one unit\'s treatment does not affect another unit\'s outcome; (2) No hidden variations - the treatment is well-defined with only one version. SUTVA is critical because it ensures potential outcomes Y(0) and Y(1) are well-defined for each unit. Violation example: In a social media marketing experiment, showing ads to some users affects their friends\' purchases through word-of-mouth (interference). Another example: "discounts" vary in amount across users, so Y(1) has multiple versions.',
		difficulty: 'hard',
		lectureId: 1
	},
	{
		id: 'm1-l1-h4',
		question:
			'Compare and contrast "average treatment effect" (ATE), "average treatment effect on the treated" (ATT), and "average treatment effect on the untreated" (ATU). When do they differ?',
		answer:
			'ATE = E[Y(1) - Y(0)] for the entire population; ATT = E[Y(1) - Y(0) | D=1] for those who received treatment; ATU = E[Y(1) - Y(0) | D=0] for those who did not. They differ when treatment effects are heterogeneous AND selection into treatment is correlated with treatment effects. Example: If people who benefit most from job training self-select into programs, ATT > ATU. They are equal only if: (1) treatment effects are homogeneous, or (2) selection is random/unrelated to effects. RCTs estimate ATE; observational methods often estimate ATT.',
		difficulty: 'hard',
		lectureId: 1
	},
	{
		id: 'm1-l1-h5',
		question:
			'A tech company finds that users who complete onboarding tutorials have 50% higher retention. The product team wants to make tutorials mandatory. Critique this decision from a causal inference perspective.',
		answer:
			'Causal concerns: (1) Selection bias - motivated users complete tutorials AND stay longer; mandatory tutorials affect unmotivated users differently; (2) The 50% lift is likely for "compliers" who chose tutorials, not "never-takers" who would be forced; (3) Mandatory tutorials may backfire - forcing unmotivated users could increase frustration and churn; (4) The counterfactual changes - current data shows voluntary tutorial users vs. non-users, not mandatory vs. non-mandatory. Recommendations: Run an RCT with random assignment to mandatory vs. optional tutorials; estimate effects for different user segments; consider instrumental variables using random encouragement.',
		difficulty: 'hard',
		lectureId: 1
	},

	// =============================================================================
	// LECTURE 2: Key Thinkers (13 questions: 3 easy, 5 medium, 5 hard)
	// =============================================================================

	// L2 - Easy
	{
		id: 'm1-l2-e1',
		question: "What is the Neyman-Rubin potential outcomes framework's core idea?",
		answer:
			'The potential outcomes framework defines causal effects in terms of potential outcomes: Y(1) is the outcome if treated, Y(0) is the outcome if not treated. The individual causal effect is Y(1) - Y(0). Since we observe only one outcome per unit, we estimate average effects by comparing groups, with randomization ensuring comparability.',
		difficulty: 'easy',
		lectureId: 2
	},
	{
		id: 'm1-l2-e2',
		question: 'What is a DAG (Directed Acyclic Graph) in causal inference?',
		answer:
			'A DAG is a visual representation of causal relationships where nodes represent variables and directed arrows represent causal effects. "Acyclic" means no variable can cause itself through any path. DAGs help identify confounders, mediators, and colliders, and determine what variables to control for to identify causal effects.',
		difficulty: 'easy',
		lectureId: 2
	},
	{
		id: 'm1-l2-e3',
		question: "What is Pearl's do-calculus designed to accomplish?",
		answer:
			'Do-calculus provides formal rules for determining when and how causal effects can be identified from observational data. The "do" operator, written as P(Y|do(X)), represents the distribution of Y when X is intervened upon (set to a value), as opposed to P(Y|X), which is the conditional distribution when X is merely observed. Do-calculus provides rules to convert interventional queries into observational ones when possible.',
		difficulty: 'easy',
		lectureId: 2
	},

	// L2 - Medium
	{
		id: 'm1-l2-m1',
		question:
			'Explain the difference between P(Y|X) and P(Y|do(X)) with a concrete example.',
		answer:
			'P(Y|X) is the probability of Y given that we observe X - it includes all associations, causal and non-causal. P(Y|do(X)) is the probability of Y when we intervene to set X to a specific value, breaking all incoming arrows to X. Example: P(lung cancer | yellow fingers) is high because smoking causes both. But P(lung cancer | do(yellow fingers)) - if we painted everyone\'s fingers yellow - would not increase cancer because we broke the smoking->fingers link. The do-operator captures causal, not just associational, relationships.',
		difficulty: 'medium',
		lectureId: 2
	},
	{
		id: 'm1-l2-m2',
		question:
			'What is a collider in a DAG? Why is conditioning on a collider problematic?',
		answer:
			'A collider is a variable that has two or more arrows pointing into it (X -> C <- Y). Conditioning on a collider opens a spurious path between its causes, creating association where none existed. Example: Talent and Beauty both cause Hollywood Success. Among successful actors (conditioning on success), talent and beauty become negatively correlated - less talented actors must be more beautiful to succeed. This creates bias when we did not intend to study this relationship.',
		difficulty: 'medium',
		lectureId: 2
	},
	{
		id: 'm1-l2-m3',
		question:
			'According to Rubin, what three conditions define the assignment mechanism in causal inference?',
		answer:
			"Rubin's assignment mechanism describes how units receive treatments: (1) Individualistic - a unit's assignment probability depends only on its own covariates, not others' outcomes; (2) Probabilistic - each unit has a probability strictly between 0 and 1 of receiving treatment (positivity); (3) Unconfounded - assignment is independent of potential outcomes given observed covariates (ignorability). When all three hold, causal effects can be identified from observational data by adjusting for covariates.",
		difficulty: 'medium',
		lectureId: 2
	},
	{
		id: 'm1-l2-m4',
		question:
			'What is the backdoor criterion in causal graphs, and how do you use it?',
		answer:
			"The backdoor criterion identifies a set of variables Z sufficient to control for confounding between treatment X and outcome Y. Z satisfies the backdoor criterion if: (1) No variable in Z is a descendant of X; (2) Z blocks all backdoor paths from X to Y (paths with an arrow into X). When satisfied, the causal effect is: P(Y|do(X)) = sum over z of P(Y|X,Z=z)P(Z=z). This allows us to estimate causal effects by adjusting for Z in regression or stratification.",
		difficulty: 'medium',
		lectureId: 2
	},
	{
		id: 'm1-l2-m5',
		question:
			'What is the ignorability assumption and why is it central to observational causal inference?',
		answer:
			'Ignorability (also called unconfoundedness or conditional independence) states: (Y(0), Y(1)) is independent of D | X, meaning treatment assignment D is independent of potential outcomes given observed covariates X. It is central because it allows us to interpret conditional differences as causal: E[Y|D=1,X] - E[Y|D=0,X] = E[Y(1)-Y(0)|X]. Without ignorability, unobserved confounders create selection bias, and observed associations do not reflect causal effects.',
		difficulty: 'medium',
		lectureId: 2
	},

	// L2 - Hard
	{
		id: 'm1-l2-h1',
		question:
			'Compare the strengths and limitations of the potential outcomes framework versus the structural causal model (DAG) approach.',
		answer:
			'Potential Outcomes: Strengths - precise definition of causal effects, clear connection to experimental design, straightforward assumptions (SUTVA, ignorability), well-suited for treatment effect estimation. Limitations - harder to represent complex causal structures, assumptions are about data not mechanisms. DAGs/SCM: Strengths - visualize complex relationships, identify confounders/mediators/colliders, formalize interventions with do-calculus, encode substantive knowledge. Limitations - requires stronger structural assumptions, may oversimplify continuous relationships, identification rules can be complex. Modern practice combines both: DAGs for structure, potential outcomes for estimation.',
		difficulty: 'hard',
		lectureId: 2
	},
	{
		id: 'm1-l2-h2',
		question:
			'Draw and explain a DAG where controlling for a variable introduces bias rather than removing it. What is this phenomenon called?',
		answer:
			'This is called "collider bias" or "M-bias." Example DAG: U1 -> X -> Y, U1 -> M <- U2, U2 -> Y. Here M is a collider between U1 and U2. X and Y have a causal path (X->Y). Without controlling for M, we correctly estimate this effect. But if we control for M (the collider), we open the path X <- U1 -> M <- U2 -> Y, creating spurious association. Another example: Controlling for "hospitalization" when studying treatment effects - hospitalized patients who received treatment may differ from those who did not in unobserved ways related to severity.',
		difficulty: 'hard',
		lectureId: 2
	},
	{
		id: 'm1-l2-h3',
		question:
			'Explain the front-door criterion and when it can identify causal effects that the backdoor criterion cannot.',
		answer:
			'The front-door criterion identifies causal effects through a mediating path when backdoor paths cannot be blocked. It requires: (1) M completely mediates the X->Y relationship (no direct X->Y path); (2) No unblocked backdoor paths from X to M; (3) X blocks all backdoor paths from M to Y. The effect is identified as: P(Y|do(X)) = sum over m of P(M=m|X) * sum over x\' of P(Y|M=m,X=x\')P(X=x\'). Example: Smoking->Tar->Cancer with unmeasured gene U affecting both Smoking and Cancer. We cannot block U directly, but can use tar deposits as a mediator to identify the smoking effect.',
		difficulty: 'hard',
		lectureId: 2
	},
	{
		id: 'm1-l2-h4',
		question:
			'What are the key differences between randomization in Neyman\'s original agricultural context versus Rubin\'s "Rubin Causal Model"?',
		answer:
			"Neyman (1923): Focused on finite-sample inference for experimental design; developed potential outcomes for agricultural plot experiments; assumed fixed potential outcomes; emphasized exact randomization-based inference without distributional assumptions; variance estimation accounted for finite population. Rubin's extensions: Generalized to observational studies; introduced ignorability assumption for non-random assignment; developed propensity scores for observational inference; emphasized role of covariates in achieving conditional ignorability; Bayesian framework for inference; focused on super-population causal effects. Rubin bridged the gap from controlled experiments to real-world observational data where randomization is not possible.",
		difficulty: 'hard',
		lectureId: 2
	},
	{
		id: 'm1-l2-h5',
		question:
			"How does Pearl's concept of 'intervention' differ from 'conditioning' in a causal graph? Illustrate with the do-operator.",
		answer:
			"Conditioning P(Y|X=x) asks: what is Y among units where X happens to equal x? It does not change the graph - all arrows remain, including those into X. Associations include confounding. Intervention P(Y|do(X=x)) asks: what would Y be if we set X to x for everyone? It mutilates the graph by removing all arrows into X, breaking confounding paths. Example: X <- U -> Y, X -> Y. P(Y|X) includes both the causal X->Y and confounding X<-U->Y paths. P(Y|do(X)) removes U->X, leaving only X->Y, giving the true causal effect. Mathematically: P(Y|do(X)) = sum over u of P(Y|X,U)P(U), marginalizing out the confounder, while P(Y|X) conditions on it.",
		difficulty: 'hard',
		lectureId: 2
	},

	// =============================================================================
	// LECTURE 3: Randomized Experiments & A/B Testing (12 questions: 2 easy, 5 medium, 5 hard)
	// =============================================================================

	// L3 - Easy
	{
		id: 'm1-l3-e1',
		question: 'What is the primary benefit of random assignment in experiments?',
		answer:
			'Random assignment ensures that treatment and control groups are comparable on average across all characteristics, both observed and unobserved. This eliminates selection bias and confounding, allowing us to attribute any difference in outcomes directly to the treatment. It makes the potential outcomes independent of treatment assignment.',
		difficulty: 'easy',
		lectureId: 3
	},
	{
		id: 'm1-l3-e2',
		question:
			'What is the Average Treatment Effect (ATE) and how is it estimated in an RCT?',
		answer:
			'The Average Treatment Effect (ATE) is the expected difference in outcomes between treatment and control conditions across the entire population: ATE = E[Y(1) - Y(0)]. In an RCT, it is estimated as the difference in mean outcomes between groups: ATE estimate = mean(Y | treated) - mean(Y | control). Random assignment ensures this difference reflects the causal effect.',
		difficulty: 'easy',
		lectureId: 3
	},

	// L3 - Medium
	{
		id: 'm1-l3-m1',
		question:
			'What is the difference between ATT (Average Treatment Effect on the Treated) and ATE? When does it matter?',
		answer:
			'ATE is the average effect across the entire population. ATT is the average effect specifically for those who received treatment. They differ when treatment effects are heterogeneous and correlated with selection into treatment. Example: Job training may have ATT > ATE if motivated people (who benefit more) self-select into training. In RCTs, ATE = ATT = ATU due to random assignment. In observational studies, they often differ, and the policy-relevant quantity depends on the intervention: mandatory policies need ATE, voluntary programs need ATT.',
		difficulty: 'medium',
		lectureId: 3
	},
	{
		id: 'm1-l3-m2',
		question:
			'Explain stratified randomization (blocking) and when you would use it.',
		answer:
			'Stratified randomization divides units into blocks based on important covariates, then randomizes within each block. Use when: (1) Key covariates are strongly related to outcomes - blocking ensures balance; (2) Sample size is small - pure randomization may yield imbalanced groups by chance; (3) You want to estimate treatment effects within subgroups; (4) Historical data suggests heterogeneous effects. Example: Block by gender and age group before randomizing marketing treatments, ensuring equal representation in each cell.',
		difficulty: 'medium',
		lectureId: 3
	},
	{
		id: 'm1-l3-m3',
		question:
			'What is the purpose of a power analysis before running an experiment?',
		answer:
			'Power analysis determines the sample size needed to detect a meaningful effect with adequate probability. It uses: (1) Effect size - the minimum meaningful difference to detect; (2) Significance level (alpha) - usually 0.05; (3) Power (1-beta) - probability of detecting true effect, usually 0.80; (4) Outcome variance. Purpose: Avoid underpowered experiments that waste resources by being unable to detect real effects, and avoid overpowered experiments that waste resources by using more samples than necessary.',
		difficulty: 'medium',
		lectureId: 3
	},
	{
		id: 'm1-l3-m4',
		question:
			'What is the intention-to-treat (ITT) principle and why is it important?',
		answer:
			'ITT analyzes participants based on their assigned treatment, regardless of whether they actually received or completed it. Importance: (1) Preserves randomization - analyzing only compliers breaks random assignment; (2) Reflects real-world effectiveness - non-compliance happens in practice; (3) Avoids selection bias from differential dropout; (4) Provides conservative but unbiased estimates. Example: If some treated customers never see an ad due to ad blockers, ITT still compares all assigned-to-treatment vs. control, giving the effect of the assignment policy.',
		difficulty: 'medium',
		lectureId: 3
	},
	{
		id: 'm1-l3-m5',
		question:
			'What threats to internal validity can occur even in randomized experiments?',
		answer:
			'Threats include: (1) Attrition - differential dropout between groups; (2) Non-compliance - subjects not adhering to assigned treatment; (3) Spillover - treatment affects control group through social contact; (4) Hawthorne effect - behavior changes from being observed; (5) Experimenter effects - researcher expectations influence outcomes; (6) Contamination - control group accesses treatment; (7) Compensatory rivalry - control group tries harder; (8) Demoralization - control group performs worse due to exclusion.',
		difficulty: 'medium',
		lectureId: 3
	},

	// L3 - Hard
	{
		id: 'm1-l3-h1',
		question:
			'What is noncompliance in experiments and how does it affect causal inference? What approaches address it?',
		answer:
			'Noncompliance occurs when subjects do not follow assigned treatment - some treated subjects do not take treatment (no-shows) or control subjects access it (crossovers). Effects: ITT estimates the effect of assignment, not treatment receipt; per-protocol analysis is biased by selection. Solutions: (1) ITT analysis for policy effect; (2) Instrumental variables using random assignment as instrument for actual treatment; (3) CACE/LATE - Local Average Treatment Effect for "compliers"; (4) Principal stratification identifying never-takers, always-takers, and compliers. Key: Assignment affects outcomes only through treatment (exclusion restriction).',
		difficulty: 'hard',
		lectureId: 3
	},
	{
		id: 'm1-l3-h2',
		question:
			'Explain the LATE (Local Average Treatment Effect) and complier average causal effect (CACE). What population do they apply to?',
		answer:
			'LATE/CACE is the average treatment effect for "compliers" - units who take treatment if assigned to it and do not take it if assigned to control. It differs from ATE because: (1) Never-takers would not take treatment regardless of assignment; (2) Always-takers would take treatment regardless; (3) Defiers do the opposite of assignment (assumed away). LATE applies only to compliers, whose behavior is changed by the instrument. Identification requires: randomization, exclusion restriction, first-stage effect, monotonicity. LATE may differ substantially from ATE if compliers are not representative.',
		difficulty: 'hard',
		lectureId: 3
	},
	{
		id: 'm1-l3-h3',
		question:
			'A company runs an A/B test with 5% significance level. After 20 different tests, they find one "significant" result. What statistical issue is this, and how should they address it?',
		answer:
			'This is the multiple comparisons problem (family-wise error rate inflation). With 20 independent tests at alpha=0.05, the probability of at least one false positive is 1-(0.95)^20 = 64%. Solutions: (1) Bonferroni correction - use alpha/k = 0.05/20 = 0.0025 per test; (2) Holm-Bonferroni - sequential rejection procedure, less conservative; (3) False Discovery Rate (FDR) control - Benjamini-Hochberg procedure when many true effects expected; (4) Pre-registration of primary outcomes to distinguish confirmatory from exploratory; (5) Reduce number of tests by focusing on theory-driven hypotheses.',
		difficulty: 'hard',
		lectureId: 3
	},
	{
		id: 'm1-l3-h4',
		question:
			'What is SUTVA and provide two realistic scenarios where it would be violated in an A/B test?',
		answer:
			'SUTVA (Stable Unit Treatment Value Assumption) requires: (1) No interference between units; (2) No hidden variations in treatment. Violation 1 - Social network interference: Testing a sharing feature where treated users can share with control users, affecting control outcomes (viral effects). The treatment status of friends affects your outcome. Violation 2 - Marketplace effects: Discounting items for treatment users reduces inventory, raising prices for control users. Or: Testing a driver bonus in ride-sharing changes driver supply, affecting wait times for everyone. Both cases mean Y_i(d) depends on treatment assignments of other units.',
		difficulty: 'hard',
		lectureId: 3
	},
	{
		id: 'm1-l3-h5',
		question:
			'How would you design an experiment to estimate both the direct effect of an ad and its spillover effects on social network connections?',
		answer:
			'Design approaches: (1) Two-stage randomization - first randomize clusters (friend groups), then individuals within clusters. This creates four conditions: individual treated in treated cluster, individual control in treated cluster, etc. (2) Ego-network design - randomize treatment, measure outcomes for treated individuals and their untreated friends separately. (3) Graph cluster randomization - partition network into isolated clusters, randomize clusters to minimize cross-cluster ties. Analysis: Direct effect = treated individuals vs. control individuals in control clusters. Spillover effect = untreated individuals in treated clusters vs. control clusters. Total effect = treated clusters vs. control clusters. Requires network data and sufficient sample size per condition.',
		difficulty: 'hard',
		lectureId: 3
	},

	// =============================================================================
	// LECTURE 4: Matching Methods (12 questions: 2 easy, 5 medium, 5 hard)
	// =============================================================================

	// L4 - Easy
	{
		id: 'm1-l4-e1',
		question: 'What is the basic idea behind matching methods in causal inference?',
		answer:
			'Matching methods attempt to create comparable treatment and control groups by pairing treated units with similar untreated units based on observed characteristics. The goal is to approximate the counterfactual - what would have happened to treated units had they not been treated - by finding untreated units with similar covariate profiles.',
		difficulty: 'easy',
		lectureId: 4
	},
	{
		id: 'm1-l4-e2',
		question: 'What is a propensity score?',
		answer:
			'The propensity score is the probability of receiving treatment given observed covariates: e(X) = P(D=1|X). It is typically estimated using logistic regression. Rosenbaum and Rubin showed that conditioning on the propensity score is sufficient for removing confounding bias if the ignorability assumption holds, reducing a high-dimensional matching problem to a single dimension.',
		difficulty: 'easy',
		lectureId: 4
	},

	// L4 - Medium
	{
		id: 'm1-l4-m1',
		question:
			'Compare exact matching with propensity score matching. When would you prefer each?',
		answer:
			'Exact matching: pairs units with identical covariate values. Preferred when: few categorical covariates, large sample, covariates are discrete. Limitation: "curse of dimensionality" - with many covariates, exact matches become rare. Propensity score matching: pairs units with similar treatment probabilities. Preferred when: many covariates, continuous variables, smaller samples. Advantage: reduces dimensionality. Limitation: balances only covariates included in the model, relies on correct specification. Use exact matching for key variables, propensity scores for remaining.',
		difficulty: 'medium',
		lectureId: 4
	},
	{
		id: 'm1-l4-m2',
		question:
			'What is covariate balance and how do you assess it after matching?',
		answer:
			'Covariate balance means the distribution of covariates is similar between matched treatment and control groups. Assessment: (1) Standardized mean differences - difference in means divided by pooled SD; should be <0.1 or 0.25; (2) Variance ratios - ratio of variances between groups; should be 0.5-2; (3) Comparison of distributions via histograms, QQ plots; (4) Statistical tests (t-tests, KS tests) - though underpowered with small samples; (5) Overall balance measures (L1 distance). Balance should improve after matching compared to raw data.',
		difficulty: 'medium',
		lectureId: 4
	},
	{
		id: 'm1-l4-m3',
		question:
			'What is the common support (overlap) assumption and why is it important for matching?',
		answer:
			'Common support requires that for each covariate combination, there is a positive probability of being in both treatment and control groups: 0 < P(D=1|X) < 1 for all X. Importance: (1) Without overlap, no valid comparison exists - treated units with X values never seen in control cannot be matched; (2) Extrapolation beyond support is model-dependent and unreliable; (3) Propensity scores of 0 or 1 indicate no comparable units. Solutions: trim samples to overlap region, check propensity score distributions, report effects only for supported region.',
		difficulty: 'medium',
		lectureId: 4
	},
	{
		id: 'm1-l4-m4',
		question:
			'Explain the difference between one-to-one matching and k-nearest neighbor matching. What are the trade-offs?',
		answer:
			'One-to-one: Each treated unit matched to exactly one control unit, typically the closest. Advantages: simple, each control used once, easy to interpret. Disadvantages: discards information from unmatched controls, may have poor matches if control pool is limited. K-nearest neighbors: Each treated unit matched to k closest control units. Advantages: uses more data, more stable estimates, better when matches are imperfect. Disadvantages: matched controls may be quite different with large k, weights needed in analysis. Trade-off: bias (worse matches) vs. variance (fewer matches). Caliper matching adds distance threshold to avoid poor matches.',
		difficulty: 'medium',
		lectureId: 4
	},
	{
		id: 'm1-l4-m5',
		question:
			'A marketing analyst matches customers who received a promotional email to similar customers who did not, based on demographics and past purchase history. What assumption must hold for this to identify a causal effect?',
		answer:
			'The crucial assumption is conditional independence (ignorability/unconfoundedness): treatment assignment is independent of potential outcomes given the matched covariates. This means demographics and purchase history capture ALL factors that jointly affect email receipt and future purchases. Violations occur if: (1) Unobserved factors exist (customer intent, brand affinity) affecting both; (2) Purchase history does not capture engagement level; (3) Email targeting used information not in the matching variables. The analyst should consider what determined email targeting and whether all those factors are included.',
		difficulty: 'medium',
		lectureId: 4
	},

	// L4 - Hard
	{
		id: 'm1-l4-h1',
		question:
			'Explain coarsened exact matching (CEM) and its advantages over propensity score matching.',
		answer:
			'CEM coarsens continuous covariates into bins, then performs exact matching on the coarsened variables. Process: (1) Define bins for each variable (e.g., age: 18-30, 31-45, 46-60); (2) Create strata of unique covariate combinations; (3) Discard strata without both treated and control units; (4) Weight remaining units for analysis. Advantages over PSM: (1) Directly controls imbalance - maximum imbalance is bounded by bin width; (2) Does not rely on model specification for propensity score; (3) Provides ex-ante balance guarantee; (4) More transparent and interpretable. Limitation: coarsening loses information; many strata may have no matches.',
		difficulty: 'hard',
		lectureId: 4
	},
	{
		id: 'm1-l4-h2',
		question:
			'What is the propensity score paradox, and what does it imply about using propensity scores for matching?',
		answer:
			'The propensity score paradox: matching on estimated propensity scores can sometimes increase variance or even bias compared to unadjusted comparisons, despite theoretical justification. Causes: (1) Estimation error in propensity scores adds noise; (2) True propensity score includes covariates unrelated to outcomes, which should not be balanced; (3) Matching on propensity score may imbalance prognostic covariates not in the model. Implications: (1) Include covariates related to outcomes, not just treatment; (2) Consider doubly robust estimators; (3) Check balance on important covariates directly; (4) Use propensity score weighting with caution when true score is unknown.',
		difficulty: 'hard',
		lectureId: 4
	},
	{
		id: 'm1-l4-h3',
		question:
			'Compare inverse probability weighting (IPW) with propensity score matching. When would you choose one over the other?',
		answer:
			'IPW: Weights each unit by inverse of treatment probability (1/e(X) for treated, 1/(1-e(X)) for control) to create a pseudo-population where treatment is independent of X. Matching: Pairs similar units and estimates effects from paired differences. Comparison: IPW uses all data (efficient) but sensitive to extreme weights from propensity scores near 0 or 1; matching is more robust to model misspecification but discards unmatched units. Choose IPW when: overlap is good, model is well-specified, sample is not huge. Choose matching when: overlap is limited, want robustness, need to identify specific counterfactual pairs. Doubly robust methods combine both for protection against misspecification.',
		difficulty: 'hard',
		lectureId: 4
	},
	{
		id: 'm1-l4-h4',
		question:
			'What is sensitivity analysis for unobserved confounding in matching studies? Describe one approach.',
		answer:
			"Sensitivity analysis quantifies how strong unobserved confounding would need to be to overturn findings. Rosenbaum's approach: Introduces parameter Gamma representing maximum ratio by which two units with same observed X can differ in treatment odds due to unobserved U. With Gamma=1 (no unobserved confounding), standard analysis applies. For Gamma>1, compute bounds on p-values/confidence intervals. Report the Gamma at which significance disappears. Interpretation: If Gamma=2 nullifies results, an unobserved confounder would need to double treatment odds while affecting outcomes. Compare to known confounders: if they have smaller effects, findings are robust. Other approaches: E-values, calibration with measured confounders.",
		difficulty: 'hard',
		lectureId: 4
	},
	{
		id: 'm1-l4-h5',
		question:
			'Design a matching strategy for evaluating a loyalty program where high-value customers were targeted for enrollment. Address selection bias and common support concerns.',
		answer:
			"Strategy: (1) Pre-matching diagnostics - examine propensity score distributions; identify overlap region; check if any customer types exist only in treatment or control. (2) Variable selection - include all targeting criteria (past spending, tenure, engagement); add outcome-predictive variables (category preferences, seasonal patterns); avoid post-treatment variables. (3) Matching approach - use caliper matching with replacement if control pool is limited; consider CEM for key targeting variables combined with propensity score for others. (4) Balance assessment - check standardized differences for all covariates, especially spending; verify distributions, not just means. (5) Address limited overlap - restrict analysis to common support region; report characteristics of excluded units; use trimmed estimators. (6) Sensitivity analysis - test robustness to unobserved confounders like 'intent to increase spending.'",
		difficulty: 'hard',
		lectureId: 4
	},

	// =============================================================================
	// LECTURE 5: Instrumental Variables (12 questions: 2 easy, 5 medium, 5 hard)
	// =============================================================================

	// L5 - Easy
	{
		id: 'm1-l5-e1',
		question:
			'What is an instrumental variable and what two key conditions must it satisfy?',
		answer:
			'An instrumental variable (IV) is a variable that affects the outcome only through its effect on the treatment. Two key conditions: (1) Relevance - the instrument must be correlated with the treatment (Z affects D); (2) Exclusion restriction - the instrument must affect the outcome only through the treatment, not directly or through other paths (Z affects Y only via D). These conditions allow us to isolate exogenous variation in treatment.',
		difficulty: 'easy',
		lectureId: 5
	},
	{
		id: 'm1-l5-e2',
		question: 'What is 2SLS (Two-Stage Least Squares) estimation?',
		answer:
			'2SLS is the standard method for instrumental variable estimation: Stage 1 - Regress the endogenous treatment variable on the instrument(s) and covariates to get predicted treatment values. Stage 2 - Regress the outcome on the predicted treatment values and covariates. The coefficient on predicted treatment is the IV estimate of the causal effect. 2SLS uses only the variation in treatment explained by the instrument, removing endogenous variation.',
		difficulty: 'easy',
		lectureId: 5
	},

	// L5 - Medium
	{
		id: 'm1-l5-m1',
		question:
			'Explain the exclusion restriction with an example where it might be violated.',
		answer:
			'The exclusion restriction requires that the instrument affects the outcome only through the treatment, with no direct effect or effect through other channels. Example: Using distance to college as an instrument for education on earnings. Violation: Distance affects not only college attendance but also local job market exposure, peer networks, and family wealth (people near colleges may be in wealthier areas). These create direct effects on earnings not through education. The IV estimate would then capture a mix of education effects and these other channels.',
		difficulty: 'medium',
		lectureId: 5
	},
	{
		id: 'm1-l5-m2',
		question: 'What is a weak instrument and why is it problematic?',
		answer:
			'A weak instrument is one that is only weakly correlated with the endogenous treatment variable. Problems: (1) IV estimates become biased toward OLS - weak instruments do not sufficiently isolate exogenous variation; (2) Confidence intervals become unreliable and may not have correct coverage; (3) Standard errors are large, reducing power; (4) Even small violations of exclusion restriction are amplified. Diagnosis: F-statistic from first stage should exceed 10 (rule of thumb). Solutions: find stronger instruments, combine multiple weak instruments, use weak-instrument robust inference methods.',
		difficulty: 'medium',
		lectureId: 5
	},
	{
		id: 'm1-l5-m3',
		question:
			'What is the Local Average Treatment Effect (LATE) interpretation of IV estimates?',
		answer:
			'IV estimates identify the LATE - the average treatment effect for "compliers," units whose treatment status is changed by the instrument. With binary instrument and treatment: compliers take treatment when Z=1 and not when Z=0. The estimate does not apply to: always-takers (always treated regardless of Z), never-takers (never treated regardless of Z), or defiers (opposite of instrument). LATE may differ from ATE if compliers are not representative. Policy relevance depends on whether the intervention affects the same population as the instrument.',
		difficulty: 'medium',
		lectureId: 5
	},
	{
		id: 'm1-l5-m4',
		question:
			'A company uses random assignment to a promotional email as an instrument for app engagement. Under what conditions is this valid?',
		answer:
			'Validity conditions: (1) Relevance - the email must actually increase app engagement; test with first-stage F-statistic. (2) Exclusion - email affects outcomes (e.g., purchases) only through app engagement, not directly. This fails if the email contains promotional offers that affect purchasing independently of engagement, or if receiving the email changes brand perception. (3) Independence - email assignment is random and unrelated to potential outcomes. (4) Monotonicity - no one engages less because they received the email. Recommendation: use emails without promotional content; verify no direct effect pathway.',
		difficulty: 'medium',
		lectureId: 5
	},
	{
		id: 'm1-l5-m5',
		question: 'What is the monotonicity assumption in IV and why is it needed?',
		answer:
			'Monotonicity requires that the instrument affects everyone in the same direction - no "defiers" who do the opposite of what the instrument encourages. Formally: D(Z=1) >= D(Z=0) for all units (or all <=). Example: If proximity to college is the instrument, no one chooses NOT to attend because they live close. Why needed: Without monotonicity, compliers and defiers could have opposite effects that cancel out, making the IV estimate uninterpretable. Monotonicity, combined with other assumptions, ensures IV identifies the average effect for compliers specifically.',
		difficulty: 'medium',
		lectureId: 5
	},

	// L5 - Hard
	{
		id: 'm1-l5-h1',
		question:
			'Explain the "forbidden regression" problem and how it relates to IV estimation with multiple instruments.',
		answer:
			'The forbidden regression refers to incorrectly including the endogenous variable directly in the second stage alongside instrumented variables, or mixing instrumented and non-instrumented variables incorrectly. With multiple instruments and one endogenous variable, the correct 2SLS procedure: (1) Regress endogenous X on all instruments and controls; (2) Use fitted X_hat in second stage. Forbidden approach: regressing Y on some instruments directly while also including X_hat. This invalidates the exclusion restriction logic. With multiple endogenous variables, each needs its own first stage. Key: instruments enter only the first stage; only predicted values enter the second stage alongside exogenous controls.',
		difficulty: 'hard',
		lectureId: 5
	},
	{
		id: 'm1-l5-h2',
		question:
			'Compare IV estimation with regression discontinuity design. When is each approach preferred?',
		answer:
			'IV: Uses an instrument that is correlated with treatment but not outcome (except through treatment). Identifies LATE for compliers. Requires finding valid instruments, which is often challenging. Applicable broadly if instrument exists. RDD: Uses a threshold in a running variable that determines treatment. Identifies LATE at the cutoff. Requires sharp/fuzzy discontinuity and local continuity of potential outcomes. Prefer RDD when: a clear threshold exists, observations cluster near cutoff, discontinuity is visually apparent. Prefer IV when: no natural threshold exists, a plausible instrument is available, population of interest is broader than cutoff neighborhood. RDD is often more credible due to visual validation, but estimates are very local.',
		difficulty: 'hard',
		lectureId: 5
	},
	{
		id: 'm1-l5-h3',
		question:
			'What are the implications of heterogeneous treatment effects for IV estimation? How does this relate to external validity?',
		answer:
			'With heterogeneous treatment effects, IV identifies LATE for compliers only - those whose treatment status changes with the instrument. Implications: (1) LATE may differ from ATE, ATT, or ATU if compliers are not representative; (2) Different instruments identify different LATEs (different complier populations); (3) Policy extrapolation is risky - the intervention may affect different people than the instrument. External validity concerns: (1) Compliers with one instrument may differ from target population; (2) Effects at one margin may not generalize to other margins; (3) Need to characterize compliers and compare to policy-relevant population. Solutions: bound ATE using IV estimates, characterize compliers with covariates, use multiple instruments to test robustness.',
		difficulty: 'hard',
		lectureId: 5
	},
	{
		id: 'm1-l5-h4',
		question:
			'Design an instrumental variable strategy to estimate the effect of advertising exposure on purchase behavior, where advertising is targeted based on user characteristics.',
		answer:
			'Challenge: Targeting creates confounding - factors predicting ad exposure also predict purchases. IV Strategy: (1) Ad auction randomness - use random variation in ad auction outcomes (winning bid prices vary randomly across impressions for similar users); instrument is "won auction for this impression." (2) Geographic variation - if ad campaigns vary by region for non-demand reasons (different sales team territories), use region as instrument for individual exposure. (3) Time-based variation - random server assignment determining which ads load first; platform A/B tests on ad delivery algorithms. (4) Exogenous shocks - competitor advertising spending as instrument for own-brand exposure (through attention competition). Validation: Check first-stage strength, argue exclusion restriction (no direct effect of instrument on purchases), consider LATE interpretation - who are the compliers?',
		difficulty: 'hard',
		lectureId: 5
	},
	{
		id: 'm1-l5-h5',
		question:
			'Explain the identification strategy for instrumental variables using the graphical/DAG framework. How do you visually identify a valid instrument?',
		answer:
			'In DAG terms, an instrument Z for treatment D on outcome Y must: (1) Have an arrow to D (relevance); (2) Have no direct arrow to Y (part of exclusion); (3) Have no backdoor paths to Y that do not go through D (no confounding of Z-Y relationship). Graphically, a valid instrument is a node with: Z -> D -> Y as the only path from Z to Y; no path Z -> Y or Z <- U -> Y for any U. Identification: P(Y|do(D)) can be identified using Z because Z provides exogenous variation in D. Common violations visible in DAGs: direct Z -> Y arrow; shared ancestor U -> Z and U -> Y; Z is a collider or descendant of a collider. DAGs help identify whether proposed instruments satisfy exclusion restriction by tracing all paths.',
		difficulty: 'hard',
		lectureId: 5
	},

	// =============================================================================
	// LECTURE 6: Difference-in-Differences (12 questions: 3 easy, 5 medium, 4 hard)
	// =============================================================================

	// L6 - Easy
	{
		id: 'm1-l6-e1',
		question: 'What is the basic idea behind difference-in-differences (DID)?',
		answer:
			'Difference-in-differences compares the change in outcomes over time between a treatment group and a control group. The first difference is the change over time within each group (post - pre). The second difference is between groups (treatment change - control change). This removes time-invariant confounders (differenced out within groups) and common time trends (captured by control group).',
		difficulty: 'easy',
		lectureId: 6
	},
	{
		id: 'm1-l6-e2',
		question: 'What is the parallel trends assumption in DID?',
		answer:
			'The parallel trends assumption states that in the absence of treatment, the treatment and control groups would have followed the same trend over time. This means any difference in trends after treatment is attributed to the treatment effect. The assumption cannot be directly tested since we do not observe the counterfactual, but we can examine whether trends were parallel in the pre-treatment period.',
		difficulty: 'easy',
		lectureId: 6
	},
	{
		id: 'm1-l6-e3',
		question: 'Write out the basic DID regression equation and explain each term.',
		answer:
			'Y_it = beta_0 + beta_1*Treat_i + beta_2*Post_t + beta_3*(Treat_i * Post_t) + epsilon_it. Where: beta_0 = baseline outcome for control pre-treatment; beta_1 = time-invariant difference between treatment and control groups; beta_2 = common time trend affecting both groups; beta_3 = DID estimator - the causal effect of treatment (our parameter of interest). Treat_i = 1 for treatment group, Post_t = 1 for post-treatment period.',
		difficulty: 'easy',
		lectureId: 6
	},

	// L6 - Medium
	{
		id: 'm1-l6-m1',
		question:
			'How can you assess whether the parallel trends assumption is plausible?',
		answer:
			'Assessment methods: (1) Visual inspection - plot outcome trends for treatment and control groups over multiple pre-treatment periods; parallel lines support the assumption. (2) Event study/leads and lags - estimate effects for each time period relative to treatment; pre-treatment coefficients should be near zero and not trending. (3) Placebo tests - test for effects in periods where treatment had not occurred. (4) Sensitivity analysis - test robustness to different control groups. Limitation: parallel pre-trends do not guarantee parallel post-trends; the assumption remains untestable for the counterfactual.',
		difficulty: 'medium',
		lectureId: 6
	},
	{
		id: 'm1-l6-m2',
		question:
			'What happens to DID estimates if the parallel trends assumption is violated?',
		answer:
			'If parallel trends is violated, the DID estimate is biased because it attributes trend differences to treatment when they existed independent of treatment. Direction of bias: If treatment group was trending upward faster than control even without treatment, DID overestimates positive effects. If treatment group was trending downward, DID underestimates positive effects. The bias equals the counterfactual trend difference that would have existed without treatment. Solutions: find better control groups, use triple differences, add group-specific time trends, or use synthetic control methods.',
		difficulty: 'medium',
		lectureId: 6
	},
	{
		id: 'm1-l6-m3',
		question:
			'What is the role of fixed effects in DID and why are they important?',
		answer:
			'Fixed effects control for unobserved heterogeneity: (1) Unit fixed effects (individual, firm, region) control for time-invariant characteristics of each unit - different baseline levels that are constant. (2) Time fixed effects control for shocks affecting all units in a period - macroeconomic conditions, seasonality. In panel DID: Y_it = alpha_i + lambda_t + beta*D_it + epsilon_it. Fixed effects remove confounding from time-invariant differences between groups and common shocks, making the identifying assumption that remaining variation in treatment is exogenous.',
		difficulty: 'medium',
		lectureId: 6
	},
	{
		id: 'm1-l6-m4',
		question:
			'When would you prefer DID over matching methods for causal inference?',
		answer:
			'Prefer DID when: (1) You have panel data with pre and post observations for the same units; (2) Unobserved time-invariant confounders exist - matching cannot address these, but DID differences them out; (3) Treatment timing is clear and sharp across groups; (4) Parallel trends assumption is plausible and can be assessed with pre-treatment data; (5) Selection into treatment is based on fixed characteristics rather than time-varying anticipation. Prefer matching when: no pre-treatment data exists, treatment timing is staggered or unclear, groups have different trends even pre-treatment, cross-sectional identification is credible.',
		difficulty: 'medium',
		lectureId: 6
	},
	{
		id: 'm1-l6-m5',
		question: 'What is an event study design and how does it relate to DID?',
		answer:
			"Event study is a generalization of DID that estimates dynamic treatment effects across multiple time periods. Instead of a single post-treatment coefficient, it estimates effects for each period relative to treatment: Y_it = alpha_i + lambda_t + sum_k[beta_k * 1(t - E_i = k)] + epsilon_it, where E_i is treatment timing for unit i, and k indexes time relative to treatment. Benefits: (1) Visualizes treatment dynamics - immediate vs. gradual effects; (2) Tests parallel trends - pre-treatment coefficients should be zero; (3) Allows for effect build-up or decay over time. Event studies make DID assumptions more transparent and testable.",
		difficulty: 'medium',
		lectureId: 6
	},

	// L6 - Hard
	{
		id: 'm1-l6-h1',
		question:
			'Explain the issues with staggered DID (when different units are treated at different times) and modern solutions.',
		answer:
			'Problems with two-way fixed effects (TWFE) in staggered settings: (1) TWFE uses already-treated units as controls for later-treated units, creating "forbidden comparisons"; (2) With heterogeneous treatment effects over time, weights can be negative, producing biased/wrong-signed estimates; (3) Early-treated units get more weight, late-treated less. Solutions: (1) Goodman-Bacon decomposition - diagnose which comparisons drive estimates; (2) Callaway-Sant\'Anna - estimate group-time specific effects using never-treated or not-yet-treated as controls; (3) Sun-Abraham - interaction-weighted estimator; (4) de Chaisemartin-D\'Haultfoeuille - robust estimator; (5) Stacking - separate DID for each treatment cohort. Key: be explicit about identifying variation and aggregation.',
		difficulty: 'hard',
		lectureId: 6
	},
	{
		id: 'm1-l6-h2',
		question:
			'Compare synthetic control method with standard DID. When is synthetic control preferred?',
		answer:
			'Standard DID: Uses existing control groups with equal or regression weights. Assumes parallel trends. Works well with many treated and control units. Synthetic control: Constructs a weighted combination of control units that best matches the treated unit in pre-treatment outcomes and covariates. Weights are optimized to minimize pre-treatment differences. Prefer synthetic control when: (1) Small number of treated units (even one); (2) No single control unit is a good match; (3) Long pre-treatment series to validate fit; (4) Treatment is at aggregate level (state, country). Advantages: transparent weights, built-in pre-trend validation, handles heterogeneous controls. Limitations: requires good pre-treatment fit, no formal inference without permutation tests, sensitive to donor pool choice.',
		difficulty: 'hard',
		lectureId: 6
	},
	{
		id: 'm1-l6-h3',
		question:
			'What is triple differences (DDD) and when would you use it over standard DID?',
		answer:
			'Triple differences adds a third difference to DID, typically using a within-group comparison that should not be affected by treatment. Setup: Compare (treated group, exposed subgroup, post-pre) vs. (treated group, unexposed subgroup, post-pre) vs. (control group, both subgroups, post-pre). Use when: (1) Parallel trends assumption is questionable but differential trends are similar for exposed and unexposed subgroups; (2) A subgroup provides a within-group control; (3) Time-varying confounders differ across groups but equally affect subgroups within groups. Example: Evaluating healthcare policy affecting only elderly - compare young vs. elderly in treatment vs. control states, before vs. after. DDD controls for state-specific trends (via control state) and elderly-specific shocks (via young comparison).',
		difficulty: 'hard',
		lectureId: 6
	},
	{
		id: 'm1-l6-h4',
		question:
			'A ride-sharing company launches a new pricing algorithm in some cities but not others. Design a DID analysis addressing potential threats to validity.',
		answer:
			'Design: Treatment = new algorithm cities, Control = old algorithm cities. Pre/post periods around launch date. Analysis: (1) Test parallel trends with pre-launch data for rides, revenue, wait times; use event study to visualize. (2) Threats and solutions: (a) Non-random city selection - if launched in struggling cities, control for city characteristics or use matching on pre-trends; (b) Anticipation effects - riders/drivers may change behavior before launch; test for pre-trends; (c) Spillovers - if algorithm affects driver supply across city borders, restrict to cities far from treatment cities; (d) Concurrent changes - other platform updates, competitor responses; use additional control cities or triple differences. (3) Cluster standard errors at city level for inference. (4) Robustness: alternative control cities, placebo treatments in pre-period, varying treatment windows.',
		difficulty: 'hard',
		lectureId: 6
	},

	// =============================================================================
	// LECTURE 7: Field Experiments (13 questions: 3 easy, 5 medium, 5 hard)
	// =============================================================================

	// L7 - Easy
	{
		id: 'm1-l7-e1',
		question:
			'What distinguishes a field experiment from a laboratory experiment?',
		answer:
			'Field experiments are conducted in real-world settings with actual participants who may not know they are in an experiment, while laboratory experiments occur in controlled, artificial environments with aware participants. Field experiments have higher external validity (generalizability to real settings) but lower internal control. Laboratory experiments have higher internal validity but may not reflect real-world behavior.',
		difficulty: 'easy',
		lectureId: 7
	},
	{
		id: 'm1-l7-e2',
		question: 'What is external validity and why do field experiments emphasize it?',
		answer:
			'External validity is the extent to which experimental findings generalize beyond the study context to other populations, settings, and times. Field experiments emphasize external validity because they test interventions in realistic conditions with natural behavior, making results more directly applicable to real-world policy and business decisions. The trade-off is potentially less control over confounding factors.',
		difficulty: 'easy',
		lectureId: 7
	},
	{
		id: 'm1-l7-e3',
		question: 'Give an example of a field experiment in a marketing context.',
		answer:
			'Example: A retail company randomly assigns stores to receive a new display layout (treatment) or keep the existing layout (control). They measure sales over several weeks. This is a field experiment because: (1) It occurs in real stores with real customers; (2) Customers do not know they are in a study; (3) Natural shopping behavior is observed; (4) Results directly inform the business decision about rolling out the new layout.',
		difficulty: 'easy',
		lectureId: 7
	},

	// L7 - Medium
	{
		id: 'm1-l7-m1',
		question:
			'What is the trade-off between internal and external validity in experiments?',
		answer:
			'Internal validity is the confidence that observed effects are due to treatment, not confounders - maximized by control. External validity is generalizability to other contexts - maximized by realism. Trade-off: Increasing control (lab settings, homogeneous samples, short duration) increases internal validity but may reduce external validity. Increasing realism (field settings, diverse samples, natural behavior) increases external validity but introduces more potential confounders. Best practice: conduct both for complementary evidence; use representative samples and realistic treatments when possible.',
		difficulty: 'medium',
		lectureId: 7
	},
	{
		id: 'm1-l7-m2',
		question:
			'What are demand effects and how can they threaten field experiment validity?',
		answer:
			'Demand effects occur when participants change behavior because they are aware of being studied or perceive what the experimenter wants. Threats: (1) Hawthorne effect - behavior improves due to attention; (2) Social desirability - participants give desired responses; (3) Hypothesis guessing - participants figure out the study goal and act accordingly. In field experiments, these are often reduced because participants do not know they are studied. Solutions: deception (ethical considerations), natural interventions, behavioral rather than self-reported outcomes, double-blind designs.',
		difficulty: 'medium',
		lectureId: 7
	},
	{
		id: 'm1-l7-m3',
		question:
			'What challenges arise when randomizing at the cluster level (e.g., stores, schools)?',
		answer:
			'Cluster randomization challenges: (1) Reduced power - effective sample size is number of clusters, not individuals; require more clusters or larger effects to detect. (2) Intraclass correlation (ICC) - outcomes within clusters are correlated, inflating standard errors. (3) Unequal cluster sizes - complicates analysis. (4) Baseline imbalance - fewer clusters means higher chance of imbalance. (5) Spillovers between clusters - if clusters interact, SUTVA is violated. Solutions: stratify randomization by cluster characteristics, use cluster-robust standard errors, increase number of clusters rather than cluster size, match clusters on baseline characteristics.',
		difficulty: 'medium',
		lectureId: 7
	},
	{
		id: 'm1-l7-m4',
		question:
			'What is a natural experiment and how does it differ from a designed field experiment?',
		answer:
			'A natural experiment exploits external events or policy changes that create as-if random variation in treatment assignment - the researcher does not control randomization. Example: A lottery for school admission creates random assignment. Differences: (1) Control - designed experiments allow manipulation, natural experiments use existing variation; (2) Timing - natural experiments are retrospective, designed are prospective; (3) Validity - natural experiments require arguing that variation is as-if random, designed experiments ensure randomization. Natural experiments are valuable when designed experiments are unethical, infeasible, or too expensive.',
		difficulty: 'medium',
		lectureId: 7
	},
	{
		id: 'm1-l7-m5',
		question:
			'What ethical considerations are unique to field experiments compared to lab studies?',
		answer:
			'Unique ethical considerations: (1) Lack of informed consent - participants often do not know they are in a study; requires justification and IRB approval. (2) Deception in natural settings - raises questions about manipulation. (3) Unequal treatment - some receive beneficial treatments while others do not; matters more when stakes are high. (4) Privacy - observing behavior in public/private settings. (5) Withdrawal difficulty - participants may not know to withdraw. (6) Third-party effects - field experiments may affect non-participants. (7) Lasting harm - real-world consequences are harder to undo. Mitigation: minimize harm, ensure treatments are within normal variation, provide post-study debriefing when possible.',
		difficulty: 'medium',
		lectureId: 7
	},

	// L7 - Hard
	{
		id: 'm1-l7-h1',
		question:
			'What is site selection bias in field experiments and how can it threaten external validity?',
		answer:
			'Site selection bias occurs when the sites (locations, populations) where experiments are conducted are not representative of the target population for intervention. Sources: (1) Convenience - experiments run where researchers have access; (2) Cooperation - only willing/capable sites participate; (3) Effect hunting - sites chosen where effects are expected to be largest. Consequences: (1) Effects may not generalize - what works in pilot sites may fail at scale; (2) Scale-up surprises - operational challenges in new sites; (3) Policy misallocation - interventions targeted based on unrepresentative evidence. Solutions: randomly sample sites, explicitly characterize site differences, conduct replications, report site characteristics transparently, use statistical models to adjust for site selection.',
		difficulty: 'hard',
		lectureId: 7
	},
	{
		id: 'm1-l7-h2',
		question:
			'Explain why treatment effects from field experiments might differ when scaled up to larger populations (scalability concerns).',
		answer:
			'Scalability concerns: (1) General equilibrium effects - small experiments do not change market conditions; large rollouts do. Example: job training improves outcomes for participants but at scale may just reshuffle who gets jobs. (2) Implementation quality - pilot programs receive extra attention; at scale, quality degrades. (3) Site/selection effects - pilots in best-suited sites; marginal sites at scale are different. (4) Participant selection - early adopters differ from later adopters. (5) Supply constraints - resources available for pilots may not exist at scale. (6) Political economy - pilots avoid opposition that full rollout triggers. Assessment: conduct multi-site experiments, vary implementation quality, study compliers vs. full population, model equilibrium effects.',
		difficulty: 'hard',
		lectureId: 7
	},
	{
		id: 'm1-l7-h3',
		question:
			'How would you design a field experiment to test the effectiveness of a new customer service training program across a national retail chain?',
		answer:
			'Design: (1) Unit of randomization - store level to avoid spillovers between employees and simplify implementation. (2) Sample size - power analysis based on store-level outcomes, accounting for intraclass correlation within stores. (3) Stratification - randomize within strata defined by store size, region, baseline performance to ensure balance. (4) Treatment - training program implemented at treatment stores; control stores receive training later (waitlist). (5) Outcomes - customer satisfaction scores, sales per employee, employee turnover, mystery shopper ratings. (6) Duration - long enough to capture sustained effects and potential decay. (7) Threats addressed - cluster-robust standard errors, check balance on observables, test for spillovers to nearby stores, measure implementation fidelity. (8) Ethics - all stores eventually receive training; voluntary employee participation.',
		difficulty: 'hard',
		lectureId: 7
	},
	{
		id: 'm1-l7-h4',
		question:
			'What is the distinction between efficacy trials and effectiveness trials? Why does it matter for field experiments?',
		answer:
			'Efficacy trials test whether an intervention works under ideal conditions - maximum compliance, best implementers, selected participants, protocol adherence. Effectiveness trials test whether an intervention works under real-world conditions - typical compliance, average implementers, diverse participants, natural variation. Distinction matters because: (1) Efficacy effects are upper bounds; effectiveness shows real-world impact; (2) Failed effectiveness with positive efficacy suggests implementation problems, not intervention problems; (3) Policy decisions need effectiveness evidence; (4) Generalizability requires effectiveness trials. Field experiments span this spectrum - early pilots are more efficacy-like; scaled evaluations are more effectiveness-like. Best practice: report both and explain differences.',
		difficulty: 'hard',
		lectureId: 7
	},
	{
		id: 'm1-l7-h5',
		question:
			'Discuss how social interactions and interference affect field experiments differently than lab experiments.',
		answer:
			'Social interaction effects unique to field experiments: (1) Natural network structures - in real settings, people communicate, creating information spillovers and interference that violate SUTVA. (2) Longer duration - extended time allows word-of-mouth, imitation, and competitive responses. (3) Market-level effects - in markets, individual treatment affects prices, availability, or competition for all. (4) Uncontrolled contact - cannot prevent treatment and control groups from interacting. (5) Secondary effects - treated units influence non-study population. Consequences: ITT estimates include spillovers; control contamination biases toward null. Solutions: cluster randomization to contain spillovers, design to measure spillovers explicitly (ego-network designs), model interference structurally, report both direct and indirect effects.',
		difficulty: 'hard',
		lectureId: 7
	},

	// =============================================================================
	// LECTURE 8: Python Implementation (13 questions: 2 easy, 5 medium, 6 hard)
	// =============================================================================

	// L8 - Easy
	{
		id: 'm1-l8-e1',
		question:
			'What Python library is commonly used for regression-based causal inference methods?',
		answer:
			'Statsmodels is the most commonly used Python library for regression-based causal inference. It provides OLS regression (sm.OLS), which is used for DID estimation, and also includes IV/2SLS estimation (IV2SLS in statsmodels.sandbox or linearmodels). Pandas is used for data manipulation, and scipy.stats for statistical tests.',
		difficulty: 'easy',
		lectureId: 8
	},
	{
		id: 'm1-l8-e2',
		question:
			'In a pandas DataFrame for DID analysis, what columns would you typically need?',
		answer:
			'Typical columns for DID: (1) Unit identifier (customer_id, store_id) to identify each unit; (2) Time period indicator (period, date) distinguishing pre and post; (3) Treatment group indicator (treated) - binary 0/1 for whether the unit is in the treatment group; (4) Post-treatment indicator (post) - binary 0/1 for whether the observation is after treatment; (5) Outcome variable (sales, revenue, engagement); (6) Optional covariates for controls. The interaction term (treated * post) is the DID coefficient.',
		difficulty: 'easy',
		lectureId: 8
	},

	// L8 - Medium
	{
		id: 'm1-l8-m1',
		question:
			'Write Python code to estimate a basic DID regression using statsmodels.',
		answer:
			"```python\nimport pandas as pd\nimport statsmodels.formula.api as smf\n\n# Assuming df has columns: outcome, treated, post\ndf['treated_post'] = df['treated'] * df['post']\n\n# DID regression\nmodel = smf.ols('outcome ~ treated + post + treated_post', data=df)\nresults = model.fit()\nprint(results.summary())\n\n# The coefficient on 'treated_post' is the DID estimate\ndid_effect = results.params['treated_post']\nprint(f'DID Estimate: {did_effect:.4f}')\n```\nAlternatively use the formula directly: 'outcome ~ treated * post' which automatically includes the interaction.",
		difficulty: 'medium',
		lectureId: 8
	},
	{
		id: 'm1-l8-m2',
		question:
			'How would you implement clustered standard errors in Python for a DID analysis with store-level clustering?',
		answer:
			"```python\nimport statsmodels.formula.api as smf\n\n# Fit model\nmodel = smf.ols('outcome ~ treated + post + treated_post', data=df)\nresults = model.fit(cov_type='cluster', \n                    cov_kwds={'groups': df['store_id']})\n\n# Standard errors are now clustered at store level\nprint(results.summary())\n\n# For more robust options, linearmodels library:\nfrom linearmodels.panel import PanelOLS\ndf = df.set_index(['store_id', 'period'])\nmod = PanelOLS.from_formula('outcome ~ treated_post + TimeEffects', data=df)\nres = mod.fit(cov_type='clustered', cluster_entity=True)\n```",
		difficulty: 'medium',
		lectureId: 8
	},
	{
		id: 'm1-l8-m3',
		question:
			'How do you calculate propensity scores in Python using logistic regression?',
		answer:
			"```python\nimport pandas as pd\nfrom sklearn.linear_model import LogisticRegression\nimport statsmodels.api as sm\n\n# Method 1: sklearn\nX = df[['age', 'income', 'prior_purchases']]\ny = df['treated']\n\nlr = LogisticRegression()\nlr.fit(X, y)\ndf['propensity_score'] = lr.predict_proba(X)[:, 1]\n\n# Method 2: statsmodels (gives more statistical output)\nX_sm = sm.add_constant(X)\nlogit = sm.Logit(y, X_sm)\nresult = logit.fit()\ndf['propensity_score'] = result.predict(X_sm)\n\n# Check overlap\ndf.groupby('treated')['propensity_score'].describe()\n```",
		difficulty: 'medium',
		lectureId: 8
	},
	{
		id: 'm1-l8-m4',
		question:
			'How would you visualize pre-treatment trends for a DID analysis in Python?',
		answer:
			"```python\nimport pandas as pd\nimport matplotlib.pyplot as plt\n\n# Group by treatment status and time period\ntrends = df.groupby(['period', 'treated'])['outcome'].mean().unstack()\n\n# Plot\nplt.figure(figsize=(10, 6))\nplt.plot(trends.index, trends[0], 'b-o', label='Control')\nplt.plot(trends.index, trends[1], 'r-o', label='Treatment')\n\n# Mark treatment timing\ntreatment_period = 5  # example\nplt.axvline(x=treatment_period, color='gray', linestyle='--', \n            label='Treatment Start')\n\nplt.xlabel('Period')\nplt.ylabel('Outcome')\nplt.legend()\nplt.title('Parallel Trends Assessment')\nplt.show()\n\n# Check if pre-treatment trends are parallel\n```",
		difficulty: 'medium',
		lectureId: 8
	},
	{
		id: 'm1-l8-m5',
		question:
			'Write Python code to perform nearest-neighbor propensity score matching.',
		answer:
			"```python\nimport pandas as pd\nimport numpy as np\nfrom sklearn.neighbors import NearestNeighbors\n\n# Assuming propensity_score column exists\ntreated = df[df['treated'] == 1]\ncontrol = df[df['treated'] == 0]\n\n# Fit nearest neighbors on control group\nnn = NearestNeighbors(n_neighbors=1, metric='euclidean')\nnn.fit(control[['propensity_score']])\n\n# Find matches for treated units\ndistances, indices = nn.kneighbors(treated[['propensity_score']])\n\n# Create matched dataset\nmatched_control = control.iloc[indices.flatten()]\nmatched_control = matched_control.reset_index(drop=True)\ntreated_matched = treated.reset_index(drop=True)\n\n# Calculate ATT\natt = treated_matched['outcome'].mean() - matched_control['outcome'].mean()\nprint(f'ATT from matching: {att:.4f}')\n```",
		difficulty: 'medium',
		lectureId: 8
	},

	// L8 - Hard
	{
		id: 'm1-l8-h1',
		question:
			'Implement an event study regression in Python with lead and lag coefficients.',
		answer:
			"```python\nimport pandas as pd\nimport statsmodels.formula.api as smf\nimport matplotlib.pyplot as plt\n\n# Create event time variable (relative to treatment)\ndf['event_time'] = df['period'] - df['treatment_period']\n\n# Create event time dummies (exclude -1 as reference)\nevent_times = range(-4, 5)  # -4 to +4\nfor t in event_times:\n    if t != -1:  # Reference period\n        df[f'et_{t}'] = ((df['event_time'] == t) & \n                         (df['treated'] == 1)).astype(int)\n\n# Regression with event time dummies\nformula = 'outcome ~ ' + ' + '.join([f'et_{t}' for t in event_times if t != -1])\nmodel = smf.ols(formula, data=df)\nresults = model.fit(cov_type='cluster', cov_kwds={'groups': df['unit_id']})\n\n# Plot event study\ncoefs = [results.params.get(f'et_{t}', 0) for t in event_times]\ncoefs[event_times.tolist().index(-1)] = 0  # Reference = 0\nci = [results.conf_int().loc[f'et_{t}'] if f'et_{t}' in results.params else [0,0] \n      for t in event_times]\n\nplt.errorbar(event_times, coefs, \n             yerr=[(c[1]-c[0])/2 for c in ci], fmt='o-')\nplt.axhline(0, color='gray', linestyle='--')\nplt.axvline(-0.5, color='red', linestyle=':')\nplt.xlabel('Event Time')\nplt.ylabel('Effect')\n```",
		difficulty: 'hard',
		lectureId: 8
	},
	{
		id: 'm1-l8-h2',
		question:
			'Write Python code to implement 2SLS (two-stage least squares) for instrumental variable estimation.',
		answer:
			"```python\nimport pandas as pd\nimport statsmodels.api as sm\nfrom linearmodels.iv import IV2SLS\n\n# Method 1: Manual 2SLS\n# First stage: regress endogenous variable on instrument\ndf['const'] = 1\nfirst_stage = sm.OLS(df['treatment'], \n                     df[['const', 'instrument', 'control_var']]).fit()\ndf['treatment_hat'] = first_stage.fittedvalues\n\n# Check first-stage F-statistic\nprint(f'First stage F-stat: {first_stage.fvalue:.2f}')\n\n# Second stage: use predicted treatment\nsecond_stage = sm.OLS(df['outcome'], \n                      df[['const', 'treatment_hat', 'control_var']]).fit()\n# Note: SEs are incorrect in manual 2SLS\n\n# Method 2: linearmodels (correct SEs)\nfrom linearmodels.iv import IV2SLS\niv_model = IV2SLS.from_formula(\n    'outcome ~ 1 + control_var + [treatment ~ instrument]',\n    data=df\n)\niv_results = iv_model.fit(cov_type='robust')\nprint(iv_results.summary)\n```",
		difficulty: 'hard',
		lectureId: 8
	},
	{
		id: 'm1-l8-h3',
		question:
			'Implement covariate balance assessment after propensity score matching in Python.',
		answer:
			"```python\nimport pandas as pd\nimport numpy as np\n\ndef calc_std_diff(treated, control, var):\n    \"\"\"Calculate standardized mean difference.\"\"\"\n    mean_diff = treated[var].mean() - control[var].mean()\n    pooled_std = np.sqrt((treated[var].var() + control[var].var()) / 2)\n    return mean_diff / pooled_std\n\ndef balance_table(df_matched, covariates, treatment_col='treated'):\n    \"\"\"Create balance table for matched data.\"\"\"\n    treated = df_matched[df_matched[treatment_col] == 1]\n    control = df_matched[df_matched[treatment_col] == 0]\n    \n    results = []\n    for var in covariates:\n        std_diff = calc_std_diff(treated, control, var)\n        var_ratio = treated[var].var() / control[var].var()\n        results.append({\n            'variable': var,\n            'mean_treated': treated[var].mean(),\n            'mean_control': control[var].mean(),\n            'std_diff': std_diff,\n            'var_ratio': var_ratio,\n            'balanced': abs(std_diff) < 0.1\n        })\n    \n    return pd.DataFrame(results)\n\n# Usage\ncovars = ['age', 'income', 'prior_purchases']\nbalance = balance_table(matched_df, covars)\nprint(balance)\nprint(f\"All balanced: {balance['balanced'].all()}\")\n```",
		difficulty: 'hard',
		lectureId: 8
	},
	{
		id: 'm1-l8-h4',
		question:
			'Write Python code to perform a randomization inference test for a treatment effect.',
		answer:
			"```python\nimport numpy as np\nimport pandas as pd\n\ndef randomization_inference(df, outcome_col, treatment_col, n_permutations=1000):\n    \"\"\"Perform randomization inference for sharp null.\"\"\"\n    \n    # Observed test statistic\n    treated = df[df[treatment_col] == 1][outcome_col]\n    control = df[df[treatment_col] == 0][outcome_col]\n    observed_diff = treated.mean() - control.mean()\n    \n    # Permutation distribution\n    n_treated = df[treatment_col].sum()\n    n_total = len(df)\n    perm_diffs = []\n    \n    for _ in range(n_permutations):\n        # Randomly reassign treatment\n        perm_treatment = np.zeros(n_total)\n        perm_treatment[np.random.choice(n_total, n_treated, replace=False)] = 1\n        \n        # Calculate test statistic\n        perm_treated_mean = df.loc[perm_treatment == 1, outcome_col].mean()\n        perm_control_mean = df.loc[perm_treatment == 0, outcome_col].mean()\n        perm_diffs.append(perm_treated_mean - perm_control_mean)\n    \n    # Two-sided p-value\n    p_value = np.mean(np.abs(perm_diffs) >= np.abs(observed_diff))\n    \n    return {\n        'observed_effect': observed_diff,\n        'p_value': p_value,\n        'perm_distribution': perm_diffs\n    }\n\n# Usage\nresult = randomization_inference(df, 'outcome', 'treated')\nprint(f\"Effect: {result['observed_effect']:.4f}, p-value: {result['p_value']:.4f}\")\n```",
		difficulty: 'hard',
		lectureId: 8
	},
	{
		id: 'm1-l8-h5',
		question:
			'Implement a synthetic control method in Python using optimization to find weights.',
		answer:
			"```python\nimport numpy as np\nimport pandas as pd\nfrom scipy.optimize import minimize\n\ndef synthetic_control(Y_treated, Y_donors, pre_periods):\n    \"\"\"\n    Y_treated: Series of outcomes for treated unit (time x 1)\n    Y_donors: DataFrame of outcomes for donor pool (time x n_donors)\n    pre_periods: number of pre-treatment periods\n    \"\"\"\n    n_donors = Y_donors.shape[1]\n    \n    # Pre-treatment data\n    Y_treated_pre = Y_treated[:pre_periods].values\n    Y_donors_pre = Y_donors.iloc[:pre_periods].values\n    \n    # Objective: minimize MSE of pre-treatment fit\n    def objective(w):\n        synthetic = Y_donors_pre @ w\n        return np.sum((Y_treated_pre - synthetic) ** 2)\n    \n    # Constraints: weights sum to 1, non-negative\n    constraints = {'type': 'eq', 'fun': lambda w: np.sum(w) - 1}\n    bounds = [(0, 1) for _ in range(n_donors)]\n    \n    # Initial weights (uniform)\n    w0 = np.ones(n_donors) / n_donors\n    \n    # Optimize\n    result = minimize(objective, w0, method='SLSQP',\n                     bounds=bounds, constraints=constraints)\n    weights = result.x\n    \n    # Compute synthetic control for all periods\n    synthetic_series = Y_donors.values @ weights\n    \n    # Treatment effect (post-treatment)\n    effect = Y_treated.values[pre_periods:] - synthetic_series[pre_periods:]\n    \n    return {\n        'weights': dict(zip(Y_donors.columns, weights)),\n        'synthetic': synthetic_series,\n        'effect': effect.mean(),\n        'pre_fit_mse': result.fun / pre_periods\n    }\n\n# Usage: result = synthetic_control(Y_treated, Y_donors, pre_periods=10)\n```",
		difficulty: 'hard',
		lectureId: 8
	},
	{
		id: 'm1-l8-h6',
		question:
			'Write Python code to implement doubly robust estimation combining propensity scores and outcome regression.',
		answer:
			"```python\nimport numpy as np\nimport pandas as pd\nfrom sklearn.linear_model import LogisticRegression, LinearRegression\n\ndef doubly_robust_ate(df, outcome, treatment, covariates):\n    \"\"\"\n    Doubly robust estimator: consistent if either propensity score\n    OR outcome model is correctly specified.\n    \"\"\"\n    X = df[covariates].values\n    Y = df[outcome].values\n    D = df[treatment].values\n    \n    # Step 1: Estimate propensity scores\n    ps_model = LogisticRegression()\n    ps_model.fit(X, D)\n    e_hat = ps_model.predict_proba(X)[:, 1]\n    e_hat = np.clip(e_hat, 0.01, 0.99)  # Avoid extreme weights\n    \n    # Step 2: Estimate outcome models\n    # mu_1(X): E[Y|D=1, X]\n    treated_mask = D == 1\n    mu1_model = LinearRegression()\n    mu1_model.fit(X[treated_mask], Y[treated_mask])\n    mu1_hat = mu1_model.predict(X)\n    \n    # mu_0(X): E[Y|D=0, X]\n    mu0_model = LinearRegression()\n    mu0_model.fit(X[~treated_mask], Y[~treated_mask])\n    mu0_hat = mu0_model.predict(X)\n    \n    # Step 3: Doubly robust estimator\n    # ATE = E[mu1(X) - mu0(X) + D(Y-mu1(X))/e(X) - (1-D)(Y-mu0(X))/(1-e(X))]\n    dr_scores = (\n        mu1_hat - mu0_hat \n        + D * (Y - mu1_hat) / e_hat \n        - (1 - D) * (Y - mu0_hat) / (1 - e_hat)\n    )\n    \n    ate = np.mean(dr_scores)\n    se = np.std(dr_scores) / np.sqrt(len(dr_scores))\n    \n    return {'ATE': ate, 'SE': se, 'CI_95': (ate - 1.96*se, ate + 1.96*se)}\n\n# Usage\nresult = doubly_robust_ate(df, 'outcome', 'treated', ['x1', 'x2', 'x3'])\nprint(f\"ATE: {result['ATE']:.4f} ({result['CI_95'][0]:.4f}, {result['CI_95'][1]:.4f})\")\n```",
		difficulty: 'hard',
		lectureId: 8
	}
];

// Validation: Check distribution
const easyCount = module1Questions.filter((q) => q.difficulty === 'easy').length;
const mediumCount = module1Questions.filter((q) => q.difficulty === 'medium').length;
const hardCount = module1Questions.filter((q) => q.difficulty === 'hard').length;
const totalCount = module1Questions.length;

// Expected: 20 easy, 40 medium, 40 hard = 100 total
console.assert(easyCount === 20, `Expected 20 easy questions, got ${easyCount}`);
console.assert(mediumCount === 40, `Expected 40 medium questions, got ${mediumCount}`);
console.assert(hardCount === 40, `Expected 40 hard questions, got ${hardCount}`);
console.assert(totalCount === 100, `Expected 100 questions, got ${totalCount}`);
