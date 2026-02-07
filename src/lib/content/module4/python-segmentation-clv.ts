/**
 * Lecture 8: Python Demo — Segmentation and CLV
 *
 * This lecture demonstrates the practical Python analytics pipeline that combines:
 * - Customer segmentation via K-means clustering
 * - Customer Lifetime Value (CLV) calculation with discounting
 * - Dataset: smartwatch adoption with behavioral and health metrics
 * - Libraries: pandas, NumPy, matplotlib/seaborn, sklearn
 */

import type { LectureContent, ContentSection } from '../types';
import type { DiagramData } from '$lib/components/diagrams';
import type { ExplanationStep } from '$lib/components/animation';

// =============================================================================
// Section 1: Python Analytics Pipeline (Text)
// =============================================================================

const pipelineOverviewSection: ContentSection = {
	id: 'python-analytics-pipeline',
	type: 'text',
	title: 'Python Analytics Pipeline',
	content: `This lecture brings together the two major analytical themes of the module — **customer segmentation** and **customer lifetime value** — in a single Python demonstration. The goal is to show how these concepts translate from theory into executable code and actionable business insights.

**The demonstration combines:**
- **K-means clustering** for customer segmentation — grouping customers by behavioral and demographic similarity
- **CLV calculation** with proper discounting — computing the financial value of each customer and each segment

**Libraries used:**
- **pandas** — data manipulation and tabular operations (\`pd.read_csv()\`, \`df.head()\`, \`df.describe()\`)
- **NumPy** — numerical computations and array operations
- **matplotlib / seaborn** — data visualization and plotting
- **scikit-learn** — machine learning algorithms (\`KMeans\`, \`StandardScaler\`, \`silhouette_score\`, \`PCA\`)

**Dataset:** Smartwatch adoption data with behavioral and health metrics. Approximately **120,000 rows** and **~40 variables** covering demographics, purchase behavior, health indicators, and technology adoption patterns. For computational efficiency, the demo works with a **20% random subsample**.

**The complete pipeline:** Load data, scale features, cluster customers, visualize segments, calculate CLV per customer, aggregate CLV by segment, and derive business recommendations. Each step builds on the previous one, creating a reproducible analytical workflow.`
};

// =============================================================================
// Section 2: Data Preparation Pipeline (Animated Explanation)
// =============================================================================

const dataPrepSteps: ExplanationStep[] = [
	{
		id: 'prep-1',
		title: 'Load & Explore',
		description:
			'The pipeline begins with loading the dataset using pd.read_csv() and exploring its structure with df.head() and df.describe(). This reveals the number of observations (~120K rows), variables (~40 columns), data types, and summary statistics. Key variables are identified: the target variable (adoption), demographic features (age, gender, BMI), and behavioral metrics (purchase frequency, purchase value, recency). Understanding the data structure before any analysis is essential — you cannot cluster what you do not understand.',
		diagram: {
			nodes: [
				{ id: 'csv', label: 'CSV File\n~120K rows\n~40 variables', type: 'variable', x: 80, y: 90 },
				{ id: 'load', label: 'pd.read_csv()\ndf.head()\ndf.describe()', type: 'treatment', x: 250, y: 90 },
				{ id: 'explore', label: 'Data Structure\nTypes, Stats\nTarget Variable', type: 'outcome', x: 410, y: 90 }
			],
			edges: [
				{ id: 'c-l', source: 'csv', target: 'load', label: 'import' },
				{ id: 'l-e', source: 'load', target: 'explore', label: 'inspect' }
			]
		},
		highlights: ['explore'],
		annotations: [{ targetId: 'explore', text: 'Understand before clustering', position: 'top' }]
	},
	{
		id: 'prep-2',
		title: 'Feature Scaling',
		description:
			'K-means clustering is sensitive to the scale of variables. A variable measured in thousands (e.g., income) will dominate one measured in single digits (e.g., number of purchases), simply because larger numbers create larger distances. StandardScaler transforms all features to mean=0 and standard deviation=1, making each feature contribute proportionally to the clustering distance calculation. Without scaling, the clusters would be driven by whichever variable has the largest numeric values, regardless of its actual importance.',
		diagram: {
			nodes: [
				{ id: 'raw', label: 'Raw Features\nDifferent Scales\nAge: 20-70\nIncome: 10K-200K', type: 'variable', x: 80, y: 90 },
				{ id: 'scaler', label: 'StandardScaler\nmean=0, std=1', type: 'treatment', x: 250, y: 90 },
				{ id: 'scaled', label: 'Scaled Features\nComparable\nContributions', type: 'outcome', x: 410, y: 90 }
			],
			edges: [
				{ id: 'r-s', source: 'raw', target: 'scaler', label: 'fit_transform' },
				{ id: 's-sc', source: 'scaler', target: 'scaled', label: 'normalized' }
			]
		},
		highlights: ['scaler'],
		annotations: [{ targetId: 'scaler', text: 'Prevents scale-driven clustering', position: 'top' }]
	},
	{
		id: 'prep-3',
		title: 'Random Sampling',
		description:
			'A 20% random subsample is drawn from the full dataset. This is a practical choice for demonstration: K-means on 120K rows with 40 features is computationally expensive and unnecessary for illustrating the methodology. The random subsample maintains the statistical properties of the full dataset — distributions, correlations, and cluster structures are preserved. In production, you would use the full dataset, but for learning and prototyping, subsampling accelerates iteration without sacrificing insight quality.',
		diagram: {
			nodes: [
				{ id: 'full', label: 'Full Dataset\n~120K rows', type: 'variable', x: 80, y: 90 },
				{ id: 'sample', label: 'Random Sample\n20%', type: 'treatment', x: 250, y: 90 },
				{ id: 'sub', label: 'Subsample\n~24K rows\nSame Properties', type: 'outcome', x: 410, y: 90 }
			],
			edges: [
				{ id: 'f-s', source: 'full', target: 'sample', label: 'df.sample(frac=0.2)' },
				{ id: 's-sub', source: 'sample', target: 'sub', label: 'maintains stats' }
			]
		},
		highlights: ['sub'],
		annotations: [{ targetId: 'sub', text: 'Faster without losing quality', position: 'top' }]
	},
	{
		id: 'prep-4',
		title: 'Ready for Analysis',
		description:
			'The data is now prepared: loaded, explored, scaled to uniform distributions, and subsampled for efficiency. The features are comparable in contribution, the dataset is manageable in size, and the structure is understood. This prepared dataset feeds directly into the K-means clustering algorithm and subsequently into the CLV calculation. The preparation steps — often underestimated — typically represent 60-80% of the work in any analytics project.',
		diagram: {
			nodes: [
				{ id: 'prepared', label: 'Prepared Data\nScaled + Sampled', type: 'outcome', x: 220, y: 40 },
				{ id: 'clustering', label: 'K-means\nClustering', type: 'treatment', x: 100, y: 140 },
				{ id: 'clv', label: 'CLV\nCalculation', type: 'treatment', x: 340, y: 140 }
			],
			edges: [
				{ id: 'p-c', source: 'prepared', target: 'clustering', label: 'segment' },
				{ id: 'p-clv', source: 'prepared', target: 'clv', label: 'value' }
			]
		},
		highlights: ['prepared'],
		annotations: [{ targetId: 'prepared', text: 'Data prep = 60-80% of the work', position: 'top' }]
	}
];

const dataPrepSection: ContentSection = {
	id: 'data-preparation-pipeline',
	type: 'explanation',
	title: 'Data Preparation Pipeline',
	explanation: {
		steps: dataPrepSteps
	}
};

// =============================================================================
// Section 3: K-means Clustering Process (Diagram)
// =============================================================================

const clusteringDiagram: DiagramData = {
	nodes: [
		{ id: 'raw-data', label: 'Raw Data', type: 'variable', x: 50, y: 90 },
		{ id: 'scaled-data', label: 'Scaled Data', type: 'treatment', x: 190, y: 90 },
		{ id: 'clusters', label: 'Clusters', type: 'outcome', x: 340, y: 90 },
		{ id: 'elbow', label: 'Elbow\nMethod', type: 'control', x: 220, y: 200 },
		{ id: 'silhouette', label: 'Silhouette\nScore', type: 'control', x: 370, y: 200 }
	],
	edges: [
		{ id: 'r-s', source: 'raw-data', target: 'scaled-data', label: 'StandardScaler' },
		{ id: 's-c', source: 'scaled-data', target: 'clusters', label: 'KMeans(k=N)' },
		{ id: 'e-c', source: 'elbow', target: 'clusters', label: 'choose k' },
		{ id: 'si-c', source: 'silhouette', target: 'clusters', label: 'assess quality' }
	]
};

const clusteringProcessSection: ContentSection = {
	id: 'clustering-process',
	type: 'diagram',
	title: 'K-means Clustering Process',
	diagram: clusteringDiagram,
	content: `The clustering pipeline flows from raw data through scaling to final cluster assignments, with two quality assessment methods guiding the choice of cluster count:

**Process flow:**
1. **Raw Data** — unscaled features with different units and ranges
2. **StandardScaler** — transforms to mean=0, std=1 for all features
3. **KMeans(k=N)** — assigns each observation to one of k clusters based on distance to cluster centers

**Quality assessment (side inputs):**
- **Elbow Method** — evaluates different values of k by plotting within-cluster sum of squares. The "elbow" point where adding more clusters yields diminishing improvement suggests the optimal k.
- **Silhouette Score** — measures how well-separated the clusters are. Scores close to 1 indicate well-separated clusters, near 0 indicates overlapping clusters, and negative values indicate poor clustering.

**Key insight:** Choose the optimal k first using both methods, then interpret the resulting clusters as business segments. The clustering is mathematical — the business interpretation is where domain expertise matters.`
};

// =============================================================================
// Section 4: Choosing the Number of Clusters (Text)
// =============================================================================

const choosingClustersSection: ContentSection = {
	id: 'choosing-clusters',
	type: 'text',
	title: 'Choosing the Number of Clusters',
	content: `Selecting the right number of clusters (k) is part science, part judgment. Two complementary methods guide this decision:

**Method 1: Elbow Method**

Plot the number of clusters (k) on the x-axis against the **within-cluster sum of squares** (WCSS) on the y-axis. As k increases, WCSS always decreases — more clusters means less internal variation. The "elbow" is the point where the rate of decrease sharply changes, indicating that additional clusters provide diminishing returns. Before the elbow, each new cluster meaningfully improves the fit. After the elbow, additional clusters add complexity without proportional improvement.

**Method 2: Silhouette Score**

The silhouette score measures **cluster separation** — how similar an observation is to its own cluster compared to the nearest neighboring cluster:
- **Close to +1** — well-separated, each cluster is distinct
- **Near 0** — clusters overlap, boundaries are ambiguous
- **Negative** — observations are assigned to the wrong cluster

In the demonstration: **silhouette score of approximately 0.19** — indicating moderate separation. This is typical of real-world behavioral data. Clean, well-separated clusters are the exception, not the rule. Marketing data involves human behavior, which is inherently messy and multidimensional. A moderate silhouette score does not mean the segmentation is useless — it means the segments have fuzzy boundaries, which is realistic.

**PCA for Visualization**

Principal Component Analysis (PCA) is used **only for visualization**, not for the clustering itself. Multi-dimensional data (40+ features) cannot be plotted directly. PCA reduces to 2 components that capture the maximum variance, allowing a 2D scatter plot colored by cluster assignment. This helps visually assess whether clusters form distinct groups, but the actual clustering operates in the full feature space.`
};

// =============================================================================
// Section 5: Interpreting Clusters as Business Segments (Text)
// =============================================================================

const interpretingClustersSection: ContentSection = {
	id: 'interpreting-clusters',
	type: 'text',
	title: 'Interpreting Clusters as Business Segments',
	content: `After K-means assigns each customer to a cluster, the critical step is transforming abstract cluster labels into meaningful business segments. Clusters are mathematical constructs — segments are business tools.

**Interpretation method:** Compare clusters across key variables:

| Variable | Why It Matters |
|---|---|
| **Age** | Different life stages, different needs and budgets |
| **BMI** | Health consciousness, product relevance for wellness tech |
| **Recency** | How recently the customer engaged — freshness of relationship |
| **Gender** | Potential differences in product preferences and usage patterns |
| **Health behavior** | Activity levels, wellness orientation, feature usage |

**Example findings from the demonstration:**
- **Cluster 1** tends to include younger customers — potentially more tech-savvy, earlier adopters, different price sensitivity
- **Cluster 0** shows higher recency scores — more recent engagement, potentially more active or newly acquired customers

**From clusters to actionable segments:**

Abstract cluster labels become actionable when you can describe each segment in business terms:
- "Young health-conscious early adopters" (Cluster 1)
- "Recently engaged mainstream users" (Cluster 0)
- "Price-sensitive infrequent buyers" (Cluster 2)

Each segment label suggests different marketing actions: messaging, channel selection, pricing, product features to emphasize, and retention strategies.

**Statistical validation:** Differences between clusters can be tested statistically (t-tests, ANOVA) to confirm that the observed differences are not just sampling noise. If Cluster 1 is "younger," is it statistically significantly younger? Validation adds confidence to segment-based decisions.`
};

// =============================================================================
// Section 6: CLV Calculation in Python (Animated Explanation)
// =============================================================================

const clvCalcSteps: ExplanationStep[] = [
	{
		id: 'clv-1',
		title: 'Basic CLV',
		description:
			'The simplest CLV formula multiplies three components: purchase_value (average order amount), purchase_frequency (how often the customer buys per period), and lifespan (estimated relationship duration, set to 3 years in the demo). This is calculated per customer row: CLV = value x frequency x lifespan. The average CLV across all customers comes to approximately 300,000. This seems straightforward, but there is a critical problem with this calculation — it ignores the time value of money.',
		diagram: {
			nodes: [
				{ id: 'value', label: 'Purchase\nValue', type: 'variable', x: 50, y: 60 },
				{ id: 'freq', label: 'Purchase\nFrequency', type: 'variable', x: 170, y: 60 },
				{ id: 'life', label: 'Lifespan\n(3 years)', type: 'variable', x: 290, y: 60 },
				{ id: 'basic-clv', label: 'Basic CLV\n~300,000\nNO DISCOUNTING', type: 'confounder', x: 200, y: 170 }
			],
			edges: [
				{ id: 'v-c', source: 'value', target: 'basic-clv', label: 'x' },
				{ id: 'f-c', source: 'freq', target: 'basic-clv', label: 'x' },
				{ id: 'l-c', source: 'life', target: 'basic-clv', label: 'x' }
			]
		},
		highlights: ['basic-clv'],
		annotations: [{ targetId: 'basic-clv', text: 'Wrong! No discounting applied', position: 'bottom' }]
	},
	{
		id: 'clv-2',
		title: 'Discounted CLV',
		description:
			'Applying a discount rate of 20% accounts for the time value of money — a dollar received today is worth more than a dollar received three years from now. The discounted CLV divides future cash flows by (1 + r)^t for each period. After discounting, the average CLV drops to approximately 221,000 — a reduction of about 26%. This is the financially correct value. Always use discounted CLV for business decisions, investment comparisons, and budget allocation. Undiscounted CLV systematically overstates customer value.',
		diagram: {
			nodes: [
				{ id: 'undiscounted', label: 'Undiscounted\nCLV ~300K', type: 'confounder', x: 80, y: 90 },
				{ id: 'discount', label: 'Discount Rate\n20%\nCLV / (1+r)^t', type: 'treatment', x: 240, y: 90 },
				{ id: 'discounted', label: 'Discounted\nCLV ~221K', type: 'outcome', x: 400, y: 90 }
			],
			edges: [
				{ id: 'u-d', source: 'undiscounted', target: 'discount', label: 'apply' },
				{ id: 'd-dc', source: 'discount', target: 'discounted', label: 'correct value' }
			]
		},
		highlights: ['discounted'],
		annotations: [{ targetId: 'discounted', text: 'Always use discounted CLV', position: 'top' }]
	},
	{
		id: 'clv-3',
		title: 'Segment-Level CLV',
		description:
			'The final step connects segmentation and CLV by calculating the average discounted CLV per cluster. This reveals which customer segments are most financially valuable. Cluster + CLV = segment-level customer economics. The business implications are direct: high-CLV segments justify larger acquisition and retention budgets, while low-CLV segments require leaner strategies. This enables personalized marketing, segment-specific pricing, and data-driven budget allocation across the customer base.',
		diagram: {
			nodes: [
				{ id: 'clusters-clv', label: 'Clusters\n(Segments)', type: 'treatment', x: 80, y: 90 },
				{ id: 'combine', label: 'Average CLV\nper Cluster', type: 'variable', x: 240, y: 90 },
				{ id: 'segment-econ', label: 'Segment-Level\nCustomer\nEconomics', type: 'outcome', x: 400, y: 90 }
			],
			edges: [
				{ id: 'cl-co', source: 'clusters-clv', target: 'combine', label: 'groupby + mean' },
				{ id: 'co-se', source: 'combine', target: 'segment-econ', label: 'actionable insight' }
			]
		},
		highlights: ['segment-econ'],
		annotations: [{ targetId: 'segment-econ', text: 'Segmentation meets financial value', position: 'top' }]
	}
];

const clvCalculationSection: ContentSection = {
	id: 'clv-calculation-python',
	type: 'explanation',
	title: 'CLV Calculation in Python',
	explanation: {
		steps: clvCalcSteps
	}
};

// =============================================================================
// Section 7: Practical Applications (Text)
// =============================================================================

const practicalApplicationsSection: ContentSection = {
	id: 'practical-applications',
	type: 'text',
	title: 'Practical Applications',
	content: `The combined segmentation-CLV pipeline produces results that directly inform marketing strategy and resource allocation:

**Personalized marketing by segment:**
Each cluster represents a distinct customer profile. Marketing messages, channel selection, and creative can be tailored to each segment's characteristics. Young health-conscious segments receive different messaging than price-sensitive mainstream segments.

**Pricing optimization per cluster:**
Different segments have different willingness to pay and price sensitivity. Segment-level CLV reveals which groups generate the most value, informing premium vs. discount pricing strategies.

**Budget reallocation to high-CLV segments:**
If Cluster 2 has 3x the CLV of Cluster 0, it may justify 3x the acquisition and retention budget per customer. Budget allocation becomes data-driven rather than intuition-driven.

**Connecting segmentation to financial value:**
The pipeline's most powerful output is the link between behavioral segments and financial metrics. Segmentation without CLV tells you who your customers are. CLV without segmentation tells you how much they are worth. Together, they tell you who is worth how much — and that drives strategy.

**The complete pipeline:**

\`Load\` --> \`Scale\` --> \`Cluster\` --> \`Visualize\` --> \`Calculate CLV\` --> \`Decide\`

Each step is reproducible, auditable, and extensible. New data feeds through the same pipeline. New features can be added to the clustering. The discount rate can be adjusted for different scenarios. This is the foundation of a production analytics system for customer strategy.`
};

// =============================================================================
// Export Lecture Content
// =============================================================================

export const lectureContent: LectureContent = {
	lectureId: 'python-segmentation-clv',
	sections: [
		pipelineOverviewSection,
		dataPrepSection,
		clusteringProcessSection,
		choosingClustersSection,
		interpretingClustersSection,
		clvCalculationSection,
		practicalApplicationsSection
	]
};
