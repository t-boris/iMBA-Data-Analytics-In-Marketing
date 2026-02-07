/**
 * Lecture 2: Segmentation, Targeting, and Positioning (STP Framework)
 *
 * This lecture covers the STP framework:
 * - Segmentation types (demographic, psychographic, behavioral, algorithmic)
 * - K-means clustering for customer segmentation
 * - Targeting criteria and evaluation
 * - Positioning and the cognitive battlefield
 * - Vertical vs horizontal attributes
 * - Market mapping and PCA
 * - Apple iPhone STP example
 */

import type { LectureContent, ContentSection } from '../types';
import type { DiagramData } from '$lib/components/diagrams';
import type { ExplanationStep } from '$lib/components/animation';

// =============================================================================
// Section 1: The STP Framework
// =============================================================================

const stpIntroSection: ContentSection = {
	id: 'stp-intro',
	type: 'text',
	title: 'The STP Framework',
	content: `**Segmentation, Targeting, and Positioning (STP)** is the foundational marketing framework for making strategic decisions about who to serve and how to compete.

STP answers three critical questions:

1. **Segmentation:** Who is our customer? How does the market divide into distinct groups?
2. **Targeting:** Which segment(s) should we focus our resources on?
3. **Positioning:** How do we want our product to be perceived relative to competitors?

**The key insight: do not try to please everyone.** Resources are finite, markets are chaotic, and customer attention is scarce. The companies that win are those that deeply understand a specific segment, target it precisely, and position their product compellingly within that segment's mental landscape.

**Example:** If a company is launching a new electric scooter, STP helps answer: Who will buy it? Which buyer group should we focus on? And how should we differentiate from competitors?

STP is not a one-time creative exercise — it is an ongoing analytical discipline powered by customer data, behavioral analytics, machine learning, and demand forecasting. The better your data, the sharper your segments and positioning.`
};

// =============================================================================
// Section 2: Segmentation Types (Animated Explanation)
// =============================================================================

const segmentationSteps: ExplanationStep[] = [
	{
		id: 'seg-1',
		title: 'Demographic Segmentation',
		description:
			'Demographic segmentation divides the market by observable characteristics: age, income, education, family status, occupation, and gender. It is the most common starting point because demographic data is easy to collect. However, demographics alone often miss deeper motivations. Example: Netflix does not just segment by "people who watch TV" — that would be too broad to be useful.',
		diagram: {
			nodes: [
				{ id: 'demo', label: 'Demographic\nSegmentation', type: 'treatment', x: 210, y: 50 },
				{ id: 'age', label: 'Age', type: 'variable', x: 80, y: 140 },
				{ id: 'income', label: 'Income', type: 'variable', x: 180, y: 140 },
				{ id: 'edu', label: 'Education', type: 'variable', x: 280, y: 140 },
				{ id: 'family', label: 'Family Status', type: 'variable', x: 380, y: 140 }
			],
			edges: [
				{ id: 'd-a', source: 'demo', target: 'age' },
				{ id: 'd-i', source: 'demo', target: 'income' },
				{ id: 'd-e', source: 'demo', target: 'edu' },
				{ id: 'd-f', source: 'demo', target: 'family' }
			]
		},
		highlights: ['demo', 'age', 'income', 'edu', 'family'],
		annotations: [{ targetId: 'demo', text: 'Observable characteristics', position: 'top' }]
	},
	{
		id: 'seg-2',
		title: 'Psychographic Segmentation',
		description:
			'Psychographic segmentation goes deeper than demographics by grouping customers based on lifestyle, values, interests, and beliefs. Two people with identical demographics (same age, income, education) can have radically different purchasing behaviors based on their psychographic profile. A health-conscious minimalist and a tech-obsessed early adopter will respond to very different marketing messages.',
		diagram: {
			nodes: [
				{ id: 'psycho', label: 'Psychographic\nSegmentation', type: 'control', x: 210, y: 50 },
				{ id: 'lifestyle', label: 'Lifestyle', type: 'variable', x: 80, y: 140 },
				{ id: 'values', label: 'Values', type: 'variable', x: 180, y: 140 },
				{ id: 'interests', label: 'Interests', type: 'variable', x: 280, y: 140 },
				{ id: 'beliefs', label: 'Beliefs', type: 'variable', x: 380, y: 140 }
			],
			edges: [
				{ id: 'p-l', source: 'psycho', target: 'lifestyle' },
				{ id: 'p-v', source: 'psycho', target: 'values' },
				{ id: 'p-i', source: 'psycho', target: 'interests' },
				{ id: 'p-b', source: 'psycho', target: 'beliefs' }
			]
		},
		highlights: ['psycho', 'lifestyle', 'values', 'interests', 'beliefs'],
		annotations: [{ targetId: 'psycho', text: 'Deeper than demographics', position: 'top' }]
	},
	{
		id: 'seg-3',
		title: 'Behavioral Segmentation',
		description:
			'Behavioral segmentation groups customers by their actual actions: purchase behavior, usage habits, frequency, brand loyalty, and product interaction patterns. This is often the most actionable type because it reflects what customers actually do, not just who they are or what they say they believe. Behavioral data comes from purchase history, website analytics, app usage, and CRM systems.',
		diagram: {
			nodes: [
				{ id: 'behav', label: 'Behavioral\nSegmentation', type: 'confounder', x: 210, y: 50 },
				{ id: 'purchase', label: 'Purchase\nBehavior', type: 'variable', x: 80, y: 140 },
				{ id: 'usage', label: 'Usage\nHabits', type: 'variable', x: 180, y: 140 },
				{ id: 'frequency', label: 'Frequency', type: 'variable', x: 280, y: 140 },
				{ id: 'loyalty', label: 'Loyalty', type: 'variable', x: 380, y: 140 }
			],
			edges: [
				{ id: 'b-p', source: 'behav', target: 'purchase' },
				{ id: 'b-u', source: 'behav', target: 'usage' },
				{ id: 'b-f', source: 'behav', target: 'frequency' },
				{ id: 'b-l', source: 'behav', target: 'loyalty' }
			]
		},
		highlights: ['behav', 'purchase', 'usage', 'frequency', 'loyalty'],
		annotations: [{ targetId: 'behav', text: 'Most actionable type', position: 'top' }]
	},
	{
		id: 'seg-4',
		title: 'Algorithmic Segmentation (K-means)',
		description:
			'Modern segmentation uses machine learning algorithms like K-means clustering to discover natural groups in customer data. K-means takes multiple input features — such as price sensitivity, genre preference, and device usage — and automatically identifies clusters of similar customers. The algorithm minimizes within-cluster distance and maximizes between-cluster distance, revealing segments that might not be obvious from manual analysis.',
		diagram: {
			nodes: [
				{ id: 'kmeans', label: 'K-means\nClustering', type: 'outcome', x: 210, y: 50 },
				{ id: 'price', label: 'Price\nSensitivity', type: 'variable', x: 80, y: 140 },
				{ id: 'genre', label: 'Genre\nPreference', type: 'variable', x: 210, y: 140 },
				{ id: 'device', label: 'Device\nUsage', type: 'variable', x: 340, y: 140 },
				{ id: 'clusters', label: 'Customer\nClusters', type: 'outcome', x: 210, y: 220 }
			],
			edges: [
				{ id: 'k-p', source: 'kmeans', target: 'price' },
				{ id: 'k-g', source: 'kmeans', target: 'genre' },
				{ id: 'k-d', source: 'kmeans', target: 'device' },
				{ id: 'p-c', source: 'price', target: 'clusters' },
				{ id: 'g-c', source: 'genre', target: 'clusters' },
				{ id: 'd-c', source: 'device', target: 'clusters' }
			]
		},
		highlights: ['kmeans', 'clusters'],
		annotations: [{ targetId: 'clusters', text: 'Natural segments emerge', position: 'bottom' }]
	}
];

const segmentationSection: ContentSection = {
	id: 'segmentation-types',
	type: 'explanation',
	title: 'Segmentation Types',
	explanation: {
		steps: segmentationSteps
	}
};

// =============================================================================
// Section 3: K-means Clustering Visualization (Diagram)
// =============================================================================

const kmeansVisualizationDiagram: DiagramData = {
	nodes: [
		// Cluster centers
		{ id: 'center-a', label: 'Cluster A\nCenter', type: 'treatment', x: 100, y: 80 },
		{ id: 'center-b', label: 'Cluster B\nCenter', type: 'control', x: 280, y: 60 },
		{ id: 'center-c', label: 'Cluster C\nCenter', type: 'confounder', x: 200, y: 190 },
		// Data points around cluster A
		{ id: 'a1', label: 'Customer 1', type: 'variable', x: 50, y: 40 },
		{ id: 'a2', label: 'Customer 2', type: 'variable', x: 140, y: 30 },
		{ id: 'a3', label: 'Customer 3', type: 'variable', x: 60, y: 130 },
		// Data points around cluster B
		{ id: 'b1', label: 'Customer 4', type: 'variable', x: 330, y: 20 },
		{ id: 'b2', label: 'Customer 5', type: 'variable', x: 370, y: 90 },
		// Data points around cluster C
		{ id: 'c1', label: 'Customer 6', type: 'variable', x: 130, y: 230 },
		{ id: 'c2', label: 'Customer 7', type: 'variable', x: 260, y: 240 },
		{ id: 'c3', label: 'Customer 8', type: 'variable', x: 230, y: 160 }
	],
	edges: [
		// Connections to cluster A
		{ id: 'a1-ca', source: 'a1', target: 'center-a', style: 'dashed' },
		{ id: 'a2-ca', source: 'a2', target: 'center-a', style: 'dashed' },
		{ id: 'a3-ca', source: 'a3', target: 'center-a', style: 'dashed' },
		// Connections to cluster B
		{ id: 'b1-cb', source: 'b1', target: 'center-b', style: 'dashed' },
		{ id: 'b2-cb', source: 'b2', target: 'center-b', style: 'dashed' },
		// Connections to cluster C
		{ id: 'c1-cc', source: 'c1', target: 'center-c', style: 'dashed' },
		{ id: 'c2-cc', source: 'c2', target: 'center-c', style: 'dashed' },
		{ id: 'c3-cc', source: 'c3', target: 'center-c', style: 'dashed' }
	]
};

const kmeansSection: ContentSection = {
	id: 'kmeans-visualization',
	type: 'diagram',
	title: 'K-means Clustering Visualization',
	diagram: kmeansVisualizationDiagram,
	content: `**K-means clustering** is an unsupervised machine learning algorithm that discovers natural groupings in customer data.

**How it works:**
1. Choose K (the number of clusters to find)
2. Randomly initialize K cluster centers
3. Assign each customer to the nearest cluster center
4. Recalculate cluster centers based on assigned members
5. Repeat steps 3-4 until convergence

**The objective:** Minimize within-cluster distance (customers in the same cluster should be similar) while maximizing between-cluster distance (different clusters should be distinct).

**In the diagram above:** Three clusters emerge from customer data. Each customer (data point) is assigned to its nearest cluster center. The algorithm iteratively adjusts these centers until the groupings stabilize, revealing natural market segments.

**Input features might include:** spending patterns, product preferences, visit frequency, price sensitivity, demographic attributes, and behavioral signals.`
};

// =============================================================================
// Section 4: Targeting
// =============================================================================

const targetingSection: ContentSection = {
	id: 'targeting',
	type: 'text',
	title: 'Targeting',
	content: `Once you have identified market segments, the next step is **targeting** — choosing which segment(s) to focus your limited resources on.

Not all segments are equally valuable. Evaluate each segment using these criteria:

- **Size** — Is the segment large enough to be profitable?
- **Growth** — Is the segment expanding or shrinking?
- **Profitability** — Can you earn attractive margins serving this segment?
- **Competitiveness** — How crowded is the segment with competitors?
- **Brand Fit** — Does the segment align with your brand identity and capabilities?
- **Accessibility** — Can you effectively reach and serve this segment?

**Electric Scooter Example:**

Consider three potential segments for a new electric scooter:

| Segment | Size | Willingness to Pay | Key Needs |
|---|---|---|---|
| Urban Commuters | Large | High | Speed, reliability, charging |
| Outdoor Enthusiasts | Medium | Medium | Durability, range, terrain |
| Budget Students | Large | Low | Price, basic transport |

A startup might target **urban commuters** because they are willing to pay premium prices, value speed and convenience, and represent a growing market as cities invest in micro-mobility infrastructure.

**Data sources for targeting decisions:**
- Census data for market sizing
- Purchase history for spending patterns
- Survey data for preferences and attitudes
- Predictive models for demand forecasting and segment profitability`
};

// =============================================================================
// Section 5: Positioning
// =============================================================================

const positioningSection: ContentSection = {
	id: 'positioning',
	type: 'text',
	title: 'Positioning',
	content: `**Positioning** is not about the product — it is about **perception**. It is the process of creating a distinct image of your product in the target customer's mind relative to competitors.

Think of the market as a **cognitive battlefield**. Every brand occupies a position in the customer's mental map. Your goal is to claim a distinctive, valuable position that competitors cannot easily take.

**Electric Scooter Positioning Example:**

If targeting urban commuters, the positioning might be:

> *"The fastest and most reliable way to beat city traffic"*

Competitors might position differently:
- **Competitor A:** "The cheapest option for short trips"
- **Competitor B:** "The most eco-friendly ride in the city"
- **Competitor C:** "Built to last — the most durable scooter on the market"

**Why positioning matters:** Customers do not evaluate products objectively. They evaluate them relative to alternatives and through the lens of their existing perceptions. A well-positioned product makes the purchase decision feel obvious to its target segment.

**Positioning is a strategic choice:** You cannot be everything to everyone. Choosing a position means deliberately emphasizing certain attributes and accepting that you will not win on others.`
};

// =============================================================================
// Section 6: Vertical vs Horizontal Attributes (Animated Explanation)
// =============================================================================

const attributeSteps: ExplanationStep[] = [
	{
		id: 'attr-1',
		title: 'Vertical Attributes',
		description:
			'Vertical attributes are characteristics where more is universally better for virtually all customers. Examples include battery life, fuel efficiency, processor speed, and image resolution. Products with superior vertical attributes are usually more expensive. Competition on vertical attributes is straightforward but costly — it becomes an arms race of "more is better."',
		diagram: {
			nodes: [
				{ id: 'vertical', label: 'Vertical\nAttributes', type: 'treatment', x: 210, y: 50 },
				{ id: 'battery', label: 'Battery Life', type: 'variable', x: 80, y: 140 },
				{ id: 'fuel', label: 'Fuel Efficiency', type: 'variable', x: 210, y: 140 },
				{ id: 'speed', label: 'Processor Speed', type: 'variable', x: 340, y: 140 }
			],
			edges: [
				{ id: 'v-b', source: 'vertical', target: 'battery' },
				{ id: 'v-f', source: 'vertical', target: 'fuel' },
				{ id: 'v-s', source: 'vertical', target: 'speed' }
			]
		},
		highlights: ['vertical'],
		annotations: [{ targetId: 'vertical', text: 'More = universally better', position: 'top' }]
	},
	{
		id: 'attr-2',
		title: 'Horizontal Attributes',
		description:
			'Horizontal attributes are characteristics based on taste and personal preference — there is no objectively "better" option. Examples include color, design style, operating system (iOS vs Android), and brand personality. Horizontal attributes create differentiation without a clear superiority hierarchy. Competition here is about matching preferences, not outperforming on a single dimension.',
		diagram: {
			nodes: [
				{ id: 'horizontal', label: 'Horizontal\nAttributes', type: 'control', x: 210, y: 50 },
				{ id: 'color', label: 'Color', type: 'variable', x: 70, y: 140 },
				{ id: 'design', label: 'Design Style', type: 'variable', x: 170, y: 140 },
				{ id: 'os', label: 'Operating\nSystem', type: 'variable', x: 270, y: 140 },
				{ id: 'brand', label: 'Brand\nPersonality', type: 'variable', x: 370, y: 140 }
			],
			edges: [
				{ id: 'h-c', source: 'horizontal', target: 'color' },
				{ id: 'h-d', source: 'horizontal', target: 'design' },
				{ id: 'h-o', source: 'horizontal', target: 'os' },
				{ id: 'h-b', source: 'horizontal', target: 'brand' }
			]
		},
		highlights: ['horizontal'],
		annotations: [{ targetId: 'horizontal', text: 'Preference, not performance', position: 'top' }]
	},
	{
		id: 'attr-3',
		title: 'Market Mapping',
		description:
			'Market mapping plots competitors on a 2D space defined by key attributes (e.g., price vs. performance). This visualization reveals crowded zones where many competitors cluster, and opportunity gaps — positions that no current competitor occupies. Principal Component Analysis (PCA) can reduce many product dimensions to 2-3 axes for visualization, making complex competitive landscapes interpretable at a glance.',
		diagram: {
			nodes: [
				{ id: 'map', label: 'Market Map', type: 'outcome', x: 210, y: 30 },
				{ id: 'crowded', label: 'Crowded Zone\n(Many Competitors)', type: 'confounder', x: 100, y: 120 },
				{ id: 'gap', label: 'Opportunity Gap\n(Unserved)', type: 'outcome', x: 320, y: 120 },
				{ id: 'pca', label: 'PCA\nDimension Reduction', type: 'variable', x: 210, y: 210 }
			],
			edges: [
				{ id: 'm-c', source: 'map', target: 'crowded' },
				{ id: 'm-g', source: 'map', target: 'gap' },
				{ id: 'p-m', source: 'pca', target: 'map', label: 'simplifies' }
			]
		},
		highlights: ['gap', 'pca'],
		annotations: [{ targetId: 'gap', text: 'Where to position', position: 'right' }]
	}
];

const attributeSection: ContentSection = {
	id: 'vertical-horizontal-attributes',
	type: 'explanation',
	title: 'Vertical vs Horizontal Attributes',
	explanation: {
		steps: attributeSteps
	}
};

// =============================================================================
// Section 7: Market Map Example (Diagram)
// =============================================================================

const marketMapDiagram: DiagramData = {
	nodes: [
		// Axis labels (using variable type for neutral styling)
		{ id: 'x-label', label: 'Price\n(Low → High)', type: 'variable', x: 210, y: 250 },
		{ id: 'y-label', label: 'Performance\n(Low → High)', type: 'variable', x: 10, y: 120 },
		// Competitor positions
		{ id: 'comp-a', label: 'Brand A\n(Budget)', type: 'treatment', x: 80, y: 190 },
		{ id: 'comp-b', label: 'Brand B\n(Mid-range)', type: 'control', x: 180, y: 130 },
		{ id: 'comp-c', label: 'Brand C\n(Premium)', type: 'confounder', x: 340, y: 50 },
		{ id: 'comp-d', label: 'Brand D\n(Mid-range)', type: 'control', x: 230, y: 160 },
		// Opportunity gap
		{ id: 'gap', label: 'Opportunity\nGap', type: 'outcome', x: 120, y: 60 }
	],
	edges: [
		{ id: 'gap-note', source: 'gap', target: 'gap', label: 'High performance, low price' }
	]
};

const marketMapSection: ContentSection = {
	id: 'market-map-example',
	type: 'diagram',
	title: 'Market Map Example',
	diagram: marketMapDiagram,
	content: `**A 2D positioning map** visualizes the competitive landscape by plotting brands on two key dimensions.

In this example, the axes represent **Price** (horizontal) and **Performance** (vertical):

- **Brand A (Budget):** Low price, lower performance — serves price-sensitive customers
- **Brand B (Mid-range):** Moderate price, moderate performance — the "safe choice"
- **Brand C (Premium):** High price, high performance — serves performance seekers
- **Brand D (Mid-range):** Similar to Brand B, competing in a crowded zone

**The Opportunity Gap:** The upper-left quadrant (high performance, lower price) is unoccupied. A company that can deliver strong performance at a competitive price could capture this underserved position.

**How PCA helps:** When products have dozens of attributes, PCA reduces this complexity to 2-3 principal components that capture the most important variation. This makes it possible to create meaningful 2D maps even for complex product categories.

**Strategic insight:** The most profitable positions are often in gaps — areas where customer demand exists but no competitor has claimed the territory.`
};

// =============================================================================
// Section 8: Apple iPhone STP Example
// =============================================================================

const appleExampleSection: ContentSection = {
	id: 'apple-iphone-stp',
	type: 'text',
	title: 'Apple iPhone STP Example',
	content: `The Apple iPhone provides a textbook example of effective STP execution:

**Segmentation:**
Apple segments its market by lifestyle, income level, and technology affinity — a blend of demographic and psychographic approaches. Rather than competing on raw specifications (as many Android manufacturers do), Apple identifies customers who value seamless experience and brand prestige.

**Targeting:**
Initially, Apple targeted high-income technology enthusiasts — early adopters willing to pay premium prices for innovation. Over time, Apple expanded its targeting:
- **iPhone Pro/Pro Max:** Tech enthusiasts and professionals who want the best camera and display
- **Standard iPhone:** Mainstream consumers who value the Apple ecosystem
- **iPhone SE:** Price-conscious customers who want iOS at a lower price point

This staged targeting strategy allowed Apple to capture new segments without diluting its premium positioning.

**Positioning:**
The iPhone is positioned as:
- A **status symbol** — owning an iPhone signals membership in a premium ecosystem
- A **seamless experience** — "it just works" is the core promise
- **Premium design** — the physical product itself conveys quality and sophistication

Competitors often position on different dimensions:
- **Samsung:** Hardware innovation and feature variety
- **Google Pixel:** Camera quality and AI integration
- **Xiaomi/OnePlus:** Value for money — premium features at lower prices

**The STP lesson from Apple:** Effective positioning does not require being the best on every dimension. Apple deliberately does not compete on price, customizability, or raw specification benchmarks. Instead, it owns the "premium experience" position and defends it relentlessly.`
};

// =============================================================================
// Export Lecture Content
// =============================================================================

export const lectureContent: LectureContent = {
	lectureId: 'stp-framework',
	sections: [
		stpIntroSection,
		segmentationSection,
		kmeansSection,
		targetingSection,
		positioningSection,
		attributeSection,
		marketMapSection,
		appleExampleSection
	]
};
