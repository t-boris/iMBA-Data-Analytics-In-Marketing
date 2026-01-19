/**
 * Lecture 7: Field Experiments
 *
 * This lecture covers real-world experimentation:
 * - Lab vs. field experiments comparison
 * - Designing effective field experiments
 * - Swedish grocery store case study (detailed)
 * - Challenges in field experiments
 * - A/B testing at scale
 * - Ethical considerations
 */

import type { LectureContent, ContentSection } from '../types';
import type { DiagramData } from '$lib/components/diagrams';

// =============================================================================
// Section 1: Lab vs. Field Experiments
// =============================================================================

const labVsFieldSection: ContentSection = {
	id: 'lab-vs-field',
	type: 'text',
	title: 'Lab vs. Field Experiments',
	content: `While randomized controlled trials (RCTs) are the gold standard for causal inference, not all experiments are created equal. The distinction between laboratory and field experiments is crucial for understanding when and how to apply experimental methods in marketing.

**Laboratory Experiments:**
- Conducted in controlled settings (research labs, online surveys)
- High internal validity: tight control over confounds
- Artificial environment may limit external validity
- Subjects know they're being studied
- Relatively quick and inexpensive

**Field Experiments:**
- Conducted in real-world settings (actual stores, websites, markets)
- Higher external validity: real behaviors in natural contexts
- Harder to control for confounds
- Often subjects don't know they're in an experiment
- More expensive and time-consuming
- Results more directly applicable to business decisions

**When to Use Each:**

Lab experiments are ideal for:
- Testing psychological mechanisms
- Initial concept testing
- When budget is limited
- When you need quick results

Field experiments are ideal for:
- Final validation before rollout
- Testing at scale
- When external validity is paramount
- Measuring actual purchase behavior (not just intentions)`
};

// =============================================================================
// Section 2: Designing Field Experiments
// =============================================================================

const designDiagram: DiagramData = {
	nodes: [
		{ id: 'question', label: 'Research Question', type: 'variable', x: 210, y: 0 },
		{ id: 'unit', label: 'Unit of Analysis', type: 'treatment', x: 60, y: 60 },
		{ id: 'treatment', label: 'Treatment Design', type: 'treatment', x: 210, y: 60 },
		{ id: 'outcome', label: 'Outcome Measures', type: 'outcome', x: 360, y: 60 },
		{ id: 'random', label: 'Randomization', type: 'confounder', x: 60, y: 130 },
		{ id: 'sample', label: 'Sample Size', type: 'control', x: 210, y: 130 },
		{ id: 'duration', label: 'Duration', type: 'variable', x: 360, y: 130 }
	],
	edges: [
		{ id: 'q-u', source: 'question', target: 'unit' },
		{ id: 'q-t', source: 'question', target: 'treatment' },
		{ id: 'q-o', source: 'question', target: 'outcome' },
		{ id: 'u-r', source: 'unit', target: 'random' },
		{ id: 't-s', source: 'treatment', target: 'sample' },
		{ id: 'o-d', source: 'outcome', target: 'duration' }
	]
};

const designSection: ContentSection = {
	id: 'design',
	type: 'diagram',
	title: 'Designing Field Experiments',
	diagram: designDiagram,
	content: `A well-designed field experiment requires careful consideration of multiple factors:

**1. Unit of Analysis**
- Individual customers (loyalty card data)
- Stores or locations (geographic randomization)
- Time periods (temporal randomization)
- Products or SKUs

**2. Treatment Design**
- What exactly will differ between treatment and control?
- Is the treatment clearly defined and implementable?
- Can you maintain treatment integrity throughout?

**3. Randomization Strategy**
- Simple random assignment
- Stratified randomization (balance on key variables)
- Cluster randomization (when spillovers are a concern)

**4. Sample Size Considerations**
- Power analysis: detect meaningful effect sizes
- Account for clustering if applicable
- Plan for attrition and non-compliance

**5. Duration**
- Long enough to capture full treatment effect
- Consider novelty effects (initial enthusiasm wears off)
- Account for seasonal patterns

**6. Outcome Measurement**
- Primary outcome clearly defined
- Secondary outcomes for mechanism testing
- Objective measures when possible (actual purchases vs. surveys)`
};

// =============================================================================
// Section 3: Swedish Grocery Store Study
// =============================================================================

const storeLayoutDiagram: DiagramData = {
	nodes: [
		{ id: 'store-label', label: 'Store Layout', type: 'variable', x: 210, y: 0 },
		{ id: 'shelf-1', label: 'Shelf A', type: 'control', x: 60, y: 60 },
		{ id: 'shelf-2', label: 'Shelf B', type: 'control', x: 160, y: 60 },
		{ id: 'shelf-3', label: 'Shelf C', type: 'treatment', x: 260, y: 60 },
		{ id: 'shelf-4', label: 'Shelf D', type: 'control', x: 360, y: 60 },
		{ id: 'product', label: 'Target Product', type: 'outcome', x: 260, y: 130 },
		{ id: 'price-tag', label: 'Price Tag Treatment', type: 'confounder', x: 260, y: 180 }
	],
	edges: [
		{ id: 's3-p', source: 'shelf-3', target: 'product' },
		{ id: 'p-pt', source: 'product', target: 'price-tag' }
	]
};

const swedishStudySection: ContentSection = {
	id: 'swedish-study',
	type: 'diagram',
	title: 'Case Study: Swedish Grocery Store Experiment',
	diagram: storeLayoutDiagram,
	content: `One of the most influential field experiments in retail marketing was conducted in Swedish grocery stores by researchers studying how price tag format affects purchasing behavior.

**The Research Question:**
Does the format of price tags affect consumer purchase decisions? Specifically, does showing the unit price (price per kg/liter) alongside the total price change buying patterns?

**The Setup:**
- **Location**: Multiple ICA grocery stores across Sweden
- **Duration**: Several weeks to capture stable patterns
- **Products**: Various grocery categories

**The Treatment:**
Stores were randomly assigned to different price tag formats:
- **Control**: Standard price tags (total price only)
- **Treatment**: Enhanced tags showing unit price prominently

Some experiments also varied:
- Color and size of unit price information
- Positioning of unit price on the tag
- Whether unit prices were comparable across brands

**Why This Study Matters:**
Unlike lab studies that ask "would you buy this?", this experiment measured ACTUAL purchases by REAL customers who didn't know they were in a study - the gold standard for behavioral validity.`
};

// =============================================================================
// Section 4: Swedish Study Results
// =============================================================================

const resultsDiagram: DiagramData = {
	nodes: [
		{ id: 'control-sales', label: 'Control: 100', type: 'control', x: 100, y: 60 },
		{ id: 'treatment-sales', label: 'Treatment: 115', type: 'treatment', x: 320, y: 60 },
		{ id: 'effect', label: '+15% Unit Sales', type: 'outcome', x: 210, y: 130 },
		{ id: 'mechanism', label: 'Easier Comparison', type: 'variable', x: 210, y: 180 }
	],
	edges: [
		{ id: 'c-e', source: 'control-sales', target: 'effect', style: 'dashed' },
		{ id: 't-e', source: 'treatment-sales', target: 'effect' },
		{ id: 'e-m', source: 'effect', target: 'mechanism' }
	]
};

const resultsSection: ContentSection = {
	id: 'results',
	type: 'diagram',
	title: 'Key Findings from the Swedish Study',
	diagram: resultsDiagram,
	content: `**Main Results:**

The field experiment revealed several important findings:

1. **Unit Price Visibility Increases Value-Seeking Behavior**
   - When unit prices were prominently displayed, customers were more likely to choose products with better value (lower unit price)
   - This shifted market share toward private labels and larger package sizes

2. **Format Matters**
   - Simply providing unit prices wasn't enough - they needed to be easy to read and compare
   - Consistent formatting across products increased comparison shopping

3. **Heterogeneous Effects**
   - Effects were larger for products with complex pricing (different package sizes)
   - Less educated consumers benefited more from clear unit pricing
   - Effects varied by product category

**Implications for Retailers:**
- Transparent pricing can shift purchasing patterns significantly
- Information presentation is as important as information availability
- Retailers face trade-offs: transparency vs. margin protection

**Implications for Policy:**
- Unit pricing mandates can help consumers make better decisions
- Format regulations matter, not just disclosure requirements
- Field experiments can inform evidence-based policy`
};

// =============================================================================
// Section 5: Challenges in Field Experiments
// =============================================================================

const challengesSection: ContentSection = {
	id: 'challenges',
	type: 'text',
	title: 'Challenges in Field Experiments',
	content: `While field experiments offer high external validity, they come with unique challenges that researchers must address:

**1. Compliance and Treatment Integrity**
- Staff may not implement treatment correctly
- Treatments may "drift" over time
- Need monitoring and verification protocols

*Swedish Study Solution*: Regular store audits, standardized training, and photographic verification of price tag placement.

**2. Spillover Effects**
- Customers may shop at multiple stores
- Word-of-mouth spreads treatment information
- Competitors may respond to your experiment

*Common Solutions*: Geographic separation, cluster randomization, measuring spillovers explicitly.

**3. Hawthorne Effects**
- People behave differently when they know they're observed
- Staff may perform better during experiments
- Can bias results upward

*Swedish Study Advantage*: Customers didn't know they were in an experiment - natural behavior was maintained.

**4. Ethical Concerns**
- Informed consent often impossible
- Some treatments may disadvantage participants
- Privacy considerations with tracking data

**5. Practical Constraints**
- Retailers may resist true randomization
- Limited ability to control external factors
- Time and budget limitations

**6. Demand Effects**
- Initial enthusiasm may not persist
- Novelty effects inflate early results
- Need sufficient duration for stable estimates`
};

// =============================================================================
// Section 6: A/B Testing at Scale
// =============================================================================

const abTestingSection: ContentSection = {
	id: 'ab-testing',
	type: 'text',
	title: 'A/B Testing at Scale',
	content: `Tech companies have revolutionized field experimentation by running thousands of concurrent A/B tests. This industrialization of experimentation offers lessons for all marketers.

**How Tech Companies Do It:**

**Amazon**: Tests everything from button colors to recommendation algorithms. Famously runs thousands of experiments simultaneously, with sophisticated systems to detect interactions between tests.

**Netflix**: Uses experimentation to optimize everything from thumbnails to content recommendations. Each thumbnail you see has likely been tested against dozens of alternatives.

**Booking.com**: Claims to run over 1,000 concurrent experiments. Uses experimentation to make virtually every product decision, from UI changes to pricing algorithms.

**Google**: The original A/B testing pioneer. Famously tested 41 shades of blue to optimize ad click-through rates.

**Key Principles from Scale A/B Testing:**

1. **Test Everything**: No decision is too small to test
2. **Statistical Rigor**: Sophisticated methods for multiple testing, early stopping, and interference
3. **Automation**: Infrastructure that makes running experiments cheap and easy
4. **Culture of Experimentation**: Decisions require experimental evidence

**Challenges at Scale:**
- Network effects and interference between experiments
- Detecting small but meaningful effects
- Avoiding "p-hacking" with many tests
- Balancing speed with statistical validity

**Lessons for Traditional Marketers:**
- Build experimentation infrastructure
- Create a culture that demands evidence
- Start small but test consistently
- Invest in measurement capabilities`
};

// =============================================================================
// Section 7: Ethics in Field Experiments
// =============================================================================

const ethicsSection: ContentSection = {
	id: 'ethics',
	type: 'text',
	title: 'Ethics in Field Experiments',
	content: `Field experiments raise important ethical considerations that researchers and practitioners must carefully navigate.

**The Facebook Emotional Contagion Study (2014)**

Facebook manipulated the news feeds of 689,003 users to show more positive or negative content, then measured emotional expression in their posts. The backlash was enormous - users felt manipulated without consent.

**Key Ethical Principles:**

**1. Informed Consent**
- Traditional research requires consent
- In field experiments, consent often isn't feasible
- Must balance research value against consent requirements
- IRB (Institutional Review Board) oversight when applicable

**2. Minimal Risk**
- Experiments should not expose participants to significant harm
- Consider psychological, financial, and social risks
- Control conditions should not be inferior to status quo

**3. Privacy and Data Protection**
- GDPR and other regulations set boundaries
- Anonymization of data
- Purpose limitation - data used only for stated purposes

**4. Transparency and Disclosure**
- Should participants be informed afterward?
- Publication of methods and results
- Honest reporting of negative findings

**5. Fairness**
- Some participants may receive worse treatment
- Randomization creates arbitrary inequality
- Consider compensation or rollout to all

**Best Practices:**
- Get ethics review when possible
- Minimize potential harm
- Ensure benefits outweigh risks
- Be transparent about methods
- Consider participant perspective
- Document ethical decision-making`
};

// =============================================================================
// Export Lecture Content
// =============================================================================

export const lectureContent: LectureContent = {
	lectureId: 'field-experiments',
	sections: [
		labVsFieldSection,
		designSection,
		swedishStudySection,
		resultsSection,
		challengesSection,
		abTestingSection,
		ethicsSection
	]
};
