/**
 * Lecture 6: Difference-in-Differences
 *
 * This lecture covers the DID methodology for causal inference:
 * - The core idea of DID and when to use it
 * - Animated explanation of how DID works
 * - The critical parallel trends assumption
 * - Classic example: Card & Krueger minimum wage study
 * - Testing for parallel trends
 * - Marketing applications of DID
 */

import type { LectureContent, ContentSection } from '../types';
import type { DiagramData } from '$lib/components/diagrams';
import { createDIDExplanation } from '$lib/components/animation';

// =============================================================================
// Section 1: The DID Idea
// =============================================================================

const didIdeaSection: ContentSection = {
	id: 'did-idea',
	type: 'text',
	title: 'The Difference-in-Differences Idea',
	content: `Difference-in-Differences (DID) is one of the most powerful and widely-used methods for causal inference when randomized experiments are not possible. The core insight is beautifully simple: instead of comparing treated and untreated groups directly, we compare how much each group CHANGED over time.

Why is this so clever? Consider this scenario: a company launches a new loyalty program in some stores but not others. Stores that opted into the loyalty program might already be higher-performing (selection bias). Simply comparing loyalty vs. non-loyalty stores would be misleading.

But what if we track BOTH groups over time? If the non-loyalty stores grew 5% and loyalty stores grew 12%, we can attribute 7% (12% - 5%) to the loyalty program - even though the groups started differently!

DID requires:
1. **Two Groups**: A treatment group and a control group
2. **Two Time Periods**: Before and after the treatment
3. **Parallel Trends**: Both groups would have trended similarly without treatment

When these conditions are met, DID provides a powerful quasi-experimental approach to causal inference.`
};

// =============================================================================
// Section 2: How DID Works (Animated)
// =============================================================================

const howDIDWorksSection: ContentSection = {
	id: 'how-did-works',
	type: 'explanation',
	title: 'How Difference-in-Differences Works',
	explanation: {
		steps: createDIDExplanation()
	}
};

// =============================================================================
// Section 3: The Parallel Trends Assumption
// =============================================================================

const parallelTrendsDiagram: DiagramData = {
	nodes: [
		{ id: 'treated', label: 'Treatment Group', type: 'treatment', x: 60, y: 60 },
		{ id: 'control', label: 'Control Group', type: 'control', x: 60, y: 140 },
		{ id: 'outcome', label: 'Compare Changes', type: 'outcome', x: 320, y: 100 }
	],
	edges: [
		{ id: 't-o', source: 'treated', target: 'outcome', label: 'Change T' },
		{ id: 'c-o', source: 'control', target: 'outcome', label: 'Change C' }
	]
};

const parallelTrendsSection: ContentSection = {
	id: 'parallel-trends',
	type: 'diagram',
	title: 'The Parallel Trends Assumption',
	diagram: parallelTrendsDiagram,
	content: `The parallel trends assumption is THE critical assumption in DID. It states that in the absence of treatment, the treatment and control groups would have followed the same trend over time.

The dashed line shows the counterfactual - what would have happened to the treated group WITHOUT treatment. We assume this counterfactual trend parallels the control group's actual trend. The treatment effect is the gap between actual and counterfactual outcomes.

**Why is this assumption so important?**

If parallel trends hold, any difference between the groups' changes MUST be due to the treatment. But if the groups were trending differently anyway (e.g., treated stores were already growing faster), we'll wrongly attribute pre-existing trends to the treatment.

**When might parallel trends be violated?**
- Groups are fundamentally different (different customer bases, geographies)
- One group experienced a shock unrelated to treatment
- Groups were selected based on anticipated trends
- Mean reversion effects (extreme performers selected for treatment)`
};

// =============================================================================
// Section 4: Card & Krueger Minimum Wage Study
// =============================================================================

const cardKruegerDiagram: DiagramData = {
	nodes: [
		{ id: 'nj', label: 'New Jersey', type: 'treatment', x: 60, y: 40 },
		{ id: 'pa', label: 'Pennsylvania', type: 'control', x: 60, y: 140 },
		{ id: 'policy', label: 'Min Wage Increase', type: 'confounder', x: 210, y: 90 },
		{ id: 'nj-emp', label: 'NJ Employment', type: 'outcome', x: 360, y: 40 },
		{ id: 'pa-emp', label: 'PA Employment', type: 'outcome', x: 360, y: 140 }
	],
	edges: [
		{ id: 'nj-policy', source: 'nj', target: 'policy' },
		{ id: 'policy-nj-emp', source: 'policy', target: 'nj-emp' },
		{ id: 'nj-emp-direct', source: 'nj', target: 'nj-emp', style: 'dashed' },
		{ id: 'pa-emp-direct', source: 'pa', target: 'pa-emp' }
	]
};

const cardKruegerSection: ContentSection = {
	id: 'card-krueger',
	type: 'diagram',
	title: 'Classic Example: Card & Krueger (1994)',
	diagram: cardKruegerDiagram,
	content: `One of the most influential DID studies examined the effect of minimum wage increases on employment. In April 1992, New Jersey raised its minimum wage from $4.25 to $5.05, while neighboring Pennsylvania kept its minimum wage at $4.25.

**The Setup:**
- **Treatment Group**: Fast food restaurants in New Jersey
- **Control Group**: Fast food restaurants in eastern Pennsylvania
- **Treatment**: Minimum wage increase
- **Outcome**: Employment (number of workers)

**The Genius of DID:**

Traditional economic theory predicted that raising minimum wage would reduce employment. But comparing NJ to PA directly would be confounded - the states differ in many ways. By using DID, Card & Krueger could control for:
- Economic conditions affecting both states equally
- Seasonal patterns in fast food employment
- Any fixed differences between the states

**The Results:**

Contrary to conventional wisdom, they found NO negative effect on employment - in fact, NJ employment slightly increased relative to PA! This study revolutionized labor economics and demonstrated the power of DID for policy evaluation.

The study was so influential that David Card was awarded the 2021 Nobel Prize in Economics, partly for this work.`
};

// =============================================================================
// Section 5: Testing Parallel Trends
// =============================================================================

const testingTrendsSection: ContentSection = {
	id: 'testing-trends',
	type: 'text',
	title: 'Testing the Parallel Trends Assumption',
	content: `We cannot directly test the parallel trends assumption because we never observe the counterfactual. However, we CAN examine whether trends were parallel BEFORE treatment as supporting evidence.

**Pre-Treatment Trend Test:**

If we have multiple pre-treatment periods, we can check:
1. Were treatment and control groups trending similarly before treatment?
2. Is there any evidence of divergence before treatment started?

The diagram shows pre-treatment periods (t-3, t-2, t-1) and the treatment point (t=0). If trends are parallel pre-treatment, it's more plausible they would have remained parallel.

**Event Study / Dynamic DID:**

A more rigorous approach estimates treatment effects for each time period:
- Pre-treatment effects should be near zero (if parallel trends holds)
- Post-treatment effects show the dynamic treatment response

**Warning Signs:**
- Pre-treatment trends diverging
- Treatment effect appears before treatment (anticipation effects)
- Selection based on pre-treatment outcomes (regression to mean)`
};

// =============================================================================
// Section 6: Marketing Applications
// =============================================================================

const marketingApplicationsSection: ContentSection = {
	id: 'marketing-applications',
	type: 'text',
	title: 'DID in Marketing Research',
	content: `Difference-in-Differences is extremely valuable in marketing when you cannot run randomized experiments. Here are key applications:

**1. Policy and Regulation Changes**
- Effect of advertising bans (e.g., tobacco, alcohol) on consumption
- Impact of GDPR on digital marketing effectiveness
- Changes in platform policies (Apple's privacy changes on Meta's ad performance)

**2. Market Entry and Exit**
- Competitor entry effects on incumbent sales
- Store opening/closing impact on nearby competitors
- New product launch effects on category sales

**3. Marketing Mix Changes**
- Price change effects using geographic variation
- Promotional calendar changes
- Channel expansion (e.g., adding online sales)

**4. Natural Experiments**
- COVID-19's differential impact on online vs. offline retailers
- Weather events affecting regional marketing effectiveness
- Economic shocks affecting consumer segments differently

**Best Practices for Marketing DID:**

1. **Choose control groups carefully**: Similar markets, demographics, pre-treatment trends
2. **Use multiple pre-treatment periods**: Verify parallel trends assumption
3. **Consider staggered adoption**: When treatment rolls out over time
4. **Account for spillovers**: Marketing effects often cross geographic boundaries
5. **Be skeptical**: Always ask "what could violate parallel trends?"

DID won't give you the certainty of a randomized experiment, but when experiments aren't possible, it's often the best available method for causal inference.`
};

// =============================================================================
// Export Lecture Content
// =============================================================================

export const lectureContent: LectureContent = {
	lectureId: 'difference-in-differences',
	sections: [
		didIdeaSection,
		howDIDWorksSection,
		parallelTrendsSection,
		cardKruegerSection,
		testingTrendsSection,
		marketingApplicationsSection
	]
};
