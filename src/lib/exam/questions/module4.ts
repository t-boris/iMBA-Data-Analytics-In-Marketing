/**
 * Module 4: Customer Preferences and Lifetime Value Analysis - Question Bank
 *
 * Contains 50 flashcard questions covering all 8 lectures:
 * - L1: Consumer Demand and Preference Analysis
 * - L2: Segmentation, Targeting, and Positioning
 * - L3: Conjoint Analysis
 * - L4: Introduction to CLV Analysis
 * - L5: CLV Calculation and Application
 * - L6: AI-Generated Content and Engagement
 * - L7: Customer Churn and Incrementality
 * - L8: Python Demo: Segmentation and CLV
 *
 * Distribution: 10 easy (20%), 27 medium (54%), 13 hard (26%)
 * Coverage: 6-7 questions per lecture
 */

import type { Question } from '../types';

export const module4Questions: Question[] = [
	// =============================================================================
	// LECTURE 1: Consumer Demand and Preference Analysis (6 questions: 1 easy, 3 medium, 2 hard)
	// =============================================================================

	// L1 - Easy
	{
		id: 'm4-l1-e1',
		question: 'What three analytical errors did the music store case study illustrate?',
		answer:
			'The music store made three errors: (1) Incorrect market segmentation — targeting hobby musicians with premium professional equipment; (2) No conjoint analysis — not measuring which attributes customers actually valued (they valued price and practicality over design and technology); (3) Ignoring CLV — focusing on single expensive sales rather than building long-term customer relationships. The result: customers looked but did not buy.',
		difficulty: 'easy',
		lectureId: 1
	},

	// L1 - Medium
	{
		id: 'm4-l1-m1',
		question: 'How does market segmentation connect to product-market fit?',
		answer:
			'Market segmentation identifies distinct groups with specific needs and budgets. Product-market fit occurs when the product aligns with the target segment\'s preferences and willingness to pay. Without segmentation, companies risk building products for the wrong audience — as the music store did by stocking $1000-$2000 amplifiers for a market of hobby musicians with $200-$600 budgets. Segmentation reveals who the customer actually is.',
		difficulty: 'medium',
		lectureId: 1
	},
	{
		id: 'm4-l1-m2',
		question: 'What is the relationship between conjoint analysis and customer willingness to pay?',
		answer:
			'Conjoint analysis measures the implicit value (part-worth utility) customers assign to each product attribute by forcing trade-off decisions. This reveals willingness to pay because it shows how much of one attribute customers will sacrifice for another. For example, how much extra would they pay for a premium brand vs. a generic one? The music store assumed customers valued technology and design, but conjoint would have shown they valued price and practicality.',
		difficulty: 'medium',
		lectureId: 1
	},
	{
		id: 'm4-l1-m3',
		question: 'Why is CLV more important than a single high-value transaction?',
		answer:
			'CLV captures the total relationship value: repeated purchases, cross-selling, referrals, and retention over time. A single expensive sale may look impressive but generates no future value if the customer does not return. A $200 customer who returns 20 times (CLV = $4,000) is more valuable than a one-time $2,000 customer. CLV shifts focus from transactional thinking to relationship thinking.',
		difficulty: 'medium',
		lectureId: 1
	},

	// L1 - Hard
	{
		id: 'm4-l1-h1',
		question: 'How do segmentation, conjoint analysis, and CLV work together as an integrated analytical framework?',
		answer:
			'They form a complete customer strategy pipeline: (1) Segmentation identifies WHO your customers are (distinct groups with shared needs); (2) Conjoint analysis reveals WHAT they value (attribute trade-offs and willingness to pay); (3) CLV measures HOW MUCH each customer/segment is worth over time. Together: segment the market, understand each segment\'s preferences, then calculate each segment\'s financial value. This enables prioritized, data-driven marketing investment.',
		difficulty: 'hard',
		lectureId: 1
	},
	{
		id: 'm4-l1-h2',
		question: 'A startup builds a technically superior product but gets low adoption. Using the Module 4 framework, diagnose potential analytical failures.',
		answer:
			'Potential failures: (1) Segmentation failure — targeting the wrong segment, or no segmentation at all (building for engineers, not users); (2) Conjoint failure — assuming technical superiority drives preference, when customers may prioritize ease of use, price, or compatibility; (3) CLV blindness — optimizing for early adopters who generate no long-term value instead of mainstream customers with higher CLV. The fix: segment the market, run conjoint to understand actual preferences, and calculate CLV by segment to find where sustainable value exists.',
		difficulty: 'hard',
		lectureId: 1
	},

	// =============================================================================
	// LECTURE 2: Segmentation, Targeting, and Positioning (7 questions: 2 easy, 3 medium, 2 hard)
	// =============================================================================

	// L2 - Easy
	{
		id: 'm4-l2-e1',
		question: 'What are the three stages of the STP framework?',
		answer:
			'STP stands for: (1) Segmentation — divide the market into groups with similar characteristics and needs; (2) Targeting — evaluate segments and choose which to serve; (3) Positioning — develop a differentiated value proposition for the target segment. The framework ensures marketing is focused on the right customers with the right message.',
		difficulty: 'easy',
		lectureId: 2
	},
	{
		id: 'm4-l2-e2',
		question: 'What is the difference between vertical and horizontal attributes?',
		answer:
			'Vertical attributes have universal preference ordering — everyone agrees more quality, lower price, or faster performance is better. Horizontal attributes have personal preference — some prefer red, others blue; some prefer sweet, others savory. Segmentation is particularly important for horizontal attributes because different groups have genuinely different preferences.',
		difficulty: 'easy',
		lectureId: 2
	},

	// L2 - Medium
	{
		id: 'm4-l2-m1',
		question: 'Compare demographic, psychographic, and behavioral segmentation. When is each most useful?',
		answer:
			'Demographic (age, gender, income): Easy to measure, widely available, but may not predict behavior. Best for: broad targeting, media planning. Psychographic (lifestyle, values, personality): Deeper motivation understanding, harder to measure. Best for: messaging, brand positioning. Behavioral (purchase frequency, usage, loyalty): Based on actual actions, most predictive. Best for: retention, personalization, CLV-based strategies. Often combined for richer segments.',
		difficulty: 'medium',
		lectureId: 2
	},
	{
		id: 'm4-l2-m2',
		question: 'How does K-means clustering create market segments from data?',
		answer:
			'K-means groups customers by minimizing within-cluster variance: (1) Choose k clusters; (2) Initialize random cluster centers; (3) Assign each customer to the nearest center; (4) Recalculate centers as means of assigned customers; (5) Repeat until stable. The result: each customer belongs to one cluster based on similarity across all features. Clusters then become market segments when interpreted through business context.',
		difficulty: 'medium',
		lectureId: 2
	},
	{
		id: 'm4-l2-m3',
		question: 'What is market mapping and how does it inform positioning strategy?',
		answer:
			'Market mapping plots brands or products on a 2D space defined by key horizontal attributes (e.g., price vs. quality, traditional vs. modern). It reveals: (1) Where competitors are clustered; (2) Gaps in the market where no one is positioned; (3) How consumers perceive relative positioning. This informs positioning by showing where to differentiate — either filling a gap or directly challenging a competitor in their space.',
		difficulty: 'medium',
		lectureId: 2
	},

	// L2 - Hard
	{
		id: 'm4-l2-h1',
		question: 'Why might K-means clustering produce segments that are statistically valid but strategically useless?',
		answer:
			'Statistical validity (distinct clusters) does not guarantee strategic value. Issues: (1) Wrong features — clustering on demographics when behavior drives value; (2) Too many/few clusters — k=20 is unmanageable, k=2 is too broad; (3) No actionability — segments differ statistically but require the same marketing; (4) Temporal instability — clusters shift as behavior changes; (5) No CLV connection — segments may differ in behavior but not in value. Useful segments must be: identifiable, substantial, accessible, differentiable, and actionable.',
		difficulty: 'hard',
		lectureId: 2
	},
	{
		id: 'm4-l2-h2',
		question: 'A company has customer data with 50 variables. Describe the complete workflow from raw data to actionable segments.',
		answer:
			'Workflow: (1) Feature selection — choose variables relevant to segmentation goal (behavioral, not just demographic); (2) Feature scaling — StandardScaler to prevent scale-driven clustering; (3) Dimensionality assessment — PCA or correlation analysis to understand variable relationships; (4) Choose k — Elbow Method + Silhouette Score; (5) Run K-means — multiple random starts; (6) Interpret clusters — compare cluster profiles across key variables; (7) Validate — statistical tests for significant differences; (8) Name segments — translate to business language; (9) Calculate CLV per segment; (10) Develop segment-specific strategies.',
		difficulty: 'hard',
		lectureId: 2
	},

	// =============================================================================
	// LECTURE 3: Conjoint Analysis (6 questions: 1 easy, 3 medium, 2 hard)
	// =============================================================================

	// L3 - Easy
	{
		id: 'm4-l3-e1',
		question: 'What is conjoint analysis and what does it measure?',
		answer:
			'Conjoint analysis is a survey-based research method that measures how customers value different product attributes. Respondents evaluate product profiles with varying attribute combinations, forcing trade-off decisions. Statistical analysis then decomposes overall preferences into part-worth utilities — the numeric value each attribute level contributes to overall preference. It measures what people DO (trade-off choices), not what they SAY they want.',
		difficulty: 'easy',
		lectureId: 3
	},

	// L3 - Medium
	{
		id: 'm4-l3-m1',
		question: 'What are part-worth utilities and how are they interpreted?',
		answer:
			'Part-worth utilities are numeric scores showing how much each attribute level contributes to overall product preference. Interpretation: Higher utility = stronger preference for that level. The range of utilities within an attribute indicates that attribute\'s importance. Example: If Brand A = +2.5 and Brand B = -1.5, Brand A is preferred and brand matters (range = 4.0). If Price $10 = +1.0 and Price $30 = -1.0, lower price is preferred and price matters less than brand (range = 2.0).',
		difficulty: 'medium',
		lectureId: 3
	},
	{
		id: 'm4-l3-m2',
		question: 'Why does conjoint analysis use trade-offs rather than direct importance ratings?',
		answer:
			'Direct ratings suffer from "everything is important" bias — respondents rate all attributes as highly important because there is no cost to doing so. Trade-offs force realistic choices: you cannot have both the cheapest price AND the best brand AND the most features. By making respondents choose between profiles, conjoint reveals the relative sacrifice they will accept, which maps to real purchase decisions. Trade-offs measure revealed preference intensity, not stated preference.',
		difficulty: 'medium',
		lectureId: 3
	},
	{
		id: 'm4-l3-m3',
		question: 'What is attribute importance and how is it calculated from part-worth utilities?',
		answer:
			'Attribute importance measures how much each attribute matters relative to others in driving preference. Calculation: (1) For each attribute, find the range (max utility - min utility); (2) Sum all attribute ranges; (3) Importance = attribute range / total range x 100%. Example: If brand range = 6.0 and price range = 4.0, and total = 10.0, then brand importance = 60% and price importance = 40%. The attribute with the widest utility range matters most.',
		difficulty: 'medium',
		lectureId: 3
	},

	// L3 - Hard
	{
		id: 'm4-l3-h1',
		question: 'A conjoint study shows Brand is 60% important and Price is 40% important. What specific strategic actions does this enable?',
		answer:
			'Strategic implications: (1) Brand investment is justified — 60% importance means brand strength is the primary purchase driver; (2) Premium pricing is possible — price matters less than brand, so strong brands can charge more; (3) Competitive strategy — compete on brand equity, not price wars; (4) New entrants should invest in brand-building before price competition; (5) Segment-specific: run conjoint by segment to see if price-sensitive segments exist where importance flips. The numbers guide budget allocation between brand-building and promotional pricing.',
		difficulty: 'hard',
		lectureId: 3
	},
	{
		id: 'm4-l3-h2',
		question: 'What are the key design decisions in setting up a conjoint study, and how does a pretest help?',
		answer:
			'Key design decisions: (1) Attribute selection — which attributes to include (too many = respondent fatigue, too few = incomplete picture); (2) Level definition — realistic and meaningful levels for each attribute; (3) Profile construction — which combinations to present (full factorial vs. fractional); (4) Response format — ranking, rating, or choice-based; (5) Sample size — enough respondents per segment. Pretest helps by: verifying attributes are relevant, levels are realistic, respondents understand the task, and the survey does not take too long. A bad conjoint design produces misleading part-worth utilities.',
		difficulty: 'hard',
		lectureId: 3
	},

	// =============================================================================
	// LECTURE 4: Introduction to CLV Analysis (7 questions: 1 easy, 4 medium, 2 hard)
	// =============================================================================

	// L4 - Easy
	{
		id: 'm4-l4-e1',
		question: 'What are the four main components of the CLV formula?',
		answer:
			'The four components: (1) M — Contribution margin (profit per customer per period); (2) R — Retention rate (probability of keeping the customer each period); (3) i — Discount rate (reflecting time value of money and risk); (4) T — Planning horizon (number of periods to calculate over). CLV = sum from t=1 to T of (M * R^t) / (1 + i)^t.',
		difficulty: 'easy',
		lectureId: 4
	},

	// L4 - Medium
	{
		id: 'm4-l4-m1',
		question: 'What is Customer Acquisition Cost (CAC) and how does it relate to CLV?',
		answer:
			'CAC is the total cost of acquiring a new customer (marketing, sales, onboarding). The fundamental relationship: CLV must exceed CAC for a customer to be profitable. The CLV:CAC ratio is a key health metric — a ratio of 3:1 is generally considered healthy. High CAC is acceptable if CLV is proportionally high. Tracking CAC by acquisition channel reveals which channels deliver the most valuable customers.',
		difficulty: 'medium',
		lectureId: 4
	},
	{
		id: 'm4-l4-m2',
		question: 'Why is retention rate the most powerful lever on CLV?',
		answer:
			'Retention compounds across all future periods: R^t means each period\'s contribution is multiplied by the cumulative retention probability. A 5% improvement in retention can increase CLV by 25-95% because: (1) Each retained customer contributes margin for additional periods; (2) The effect compounds geometrically (R^1, R^2, R^3...); (3) It applies across the entire customer base; (4) Small improvements accumulate into large value differences over the planning horizon.',
		difficulty: 'medium',
		lectureId: 4
	},
	{
		id: 'm4-l4-m3',
		question: 'What is metric misalignment and how does it affect business decisions?',
		answer:
			'Metric misalignment occurs when companies optimize short-term metrics (conversion rate, quarterly revenue) at the expense of long-term value (CLV, retention). Examples: aggressive discounting boosts short-term conversion but attracts low-CLV deal seekers; reducing customer service saves costs but increases churn; promotional pricing trains customers to wait for sales. The fix: align KPIs with CLV-based metrics that capture long-term value creation.',
		difficulty: 'medium',
		lectureId: 4
	},
	{
		id: 'm4-l4-m4',
		question: 'What is the payback period and why does it matter for customer investment decisions?',
		answer:
			'The payback period is the time required for cumulative CLV to exceed the initial CAC — when the customer investment becomes profitable. It matters because: (1) Cash flow management — long payback means more capital tied up; (2) Risk assessment — longer payback = more uncertainty; (3) Channel comparison — channels with shorter payback may be preferred even if CLV is similar; (4) Strategic planning — some segments may have 6-month payback, others 2 years.',
		difficulty: 'medium',
		lectureId: 4
	},

	// L4 - Hard
	{
		id: 'm4-l4-h1',
		question: 'A company has two customer segments: Segment A (high margin, low retention) and Segment B (low margin, high retention). Which is more valuable and why?',
		answer:
			'It depends on the specific numbers, but retention often dominates. Example: Segment A: M=$100, R=60%, Segment B: M=$50, R=90%. Over 5 years (undiscounted): A = $100*(0.6+0.36+0.22+0.13+0.08) = $139; B = $50*(0.9+0.81+0.73+0.66+0.59) = $185. Segment B wins despite half the margin because retention compounds geometrically. The compounding effect of high retention accumulates value that high-but-declining margin cannot match. This is why CLV calculation is essential — intuition about "high margin = better" is often wrong.',
		difficulty: 'hard',
		lectureId: 4
	},
	{
		id: 'm4-l4-h2',
		question: 'How does the discount rate change the relative attractiveness of different customer segments?',
		answer:
			'Higher discount rates penalize future cash flows more heavily, favoring segments with: (1) Front-loaded value (high early margins); (2) Shorter payback periods; (3) Lower retention dependency (since distant retention benefits are heavily discounted). Conversely, low discount rates favor: long-lived customers, steady retention, and patient investment strategies. The discount rate essentially reflects how much a company values the present vs. the future — and different segments become more or less attractive depending on this time preference.',
		difficulty: 'hard',
		lectureId: 4
	},

	// =============================================================================
	// LECTURE 5: CLV Calculation and Application (6 questions: 1 easy, 3 medium, 2 hard)
	// =============================================================================

	// L5 - Easy
	{
		id: 'm4-l5-e1',
		question: 'What is the difference between discounted and undiscounted CLV?',
		answer:
			'Undiscounted CLV sums future cash flows at face value — a dollar in year 3 is counted the same as a dollar today. Discounted CLV divides each period\'s value by (1+i)^t, reducing future values to reflect time value of money. Undiscounted CLV always overstates customer value. Always use discounted CLV for business decisions, investment comparisons, and budget allocation.',
		difficulty: 'easy',
		lectureId: 5
	},

	// L5 - Medium
	{
		id: 'm4-l5-m1',
		question: 'Walk through a simple CLV calculation: M=$100, R=80%, i=10%, T=3 periods.',
		answer:
			'Period 1: (100 * 0.80) / (1.10)^1 = 80 / 1.10 = $72.73. Period 2: (100 * 0.64) / (1.10)^2 = 64 / 1.21 = $52.89. Period 3: (100 * 0.512) / (1.10)^3 = 51.2 / 1.331 = $38.47. CLV = $72.73 + $52.89 + $38.47 = $164.09. Compare to undiscounted: 80 + 64 + 51.2 = $195.20. Discounting reduces the value by about 16%, reflecting the time value of money.',
		difficulty: 'medium',
		lectureId: 5
	},
	{
		id: 'm4-l5-m2',
		question: 'What is the planning horizon and how do you determine the appropriate one?',
		answer:
			'The planning horizon (T) is the number of periods over which CLV is calculated. Determination: (1) Check when retention probability becomes negligible — if R=70%, after 10 periods R^10 = 2.8%, meaning barely any customers remain; (2) Industry norms — subscription businesses often use 3-5 years; (3) Discount effect — high discount rates make distant periods nearly worthless; (4) Practical rule: extend T until additional periods add less than 1% to total CLV. Too short undervalues customers; too long adds false precision.',
		difficulty: 'medium',
		lectureId: 5
	},
	{
		id: 'm4-l5-m3',
		question: 'How does cumulative CLV inform strategic decisions about customer investment?',
		answer:
			'Cumulative CLV shows the running total of value over time, revealing: (1) When the payback point occurs (cumulative CLV exceeds CAC); (2) Where value accumulates fastest — early periods vs. later periods; (3) How much total value is at risk if a customer churns at period t; (4) The shape of the value curve — steep early gains vs. slow steady accumulation. This informs retention timing: invest most heavily in preventing churn during the steepest part of the cumulative curve.',
		difficulty: 'medium',
		lectureId: 5
	},

	// L5 - Hard
	{
		id: 'm4-l5-h1',
		question: 'How would you use CLV to determine the maximum acceptable Customer Acquisition Cost for each segment?',
		answer:
			'Method: (1) Calculate discounted CLV for each segment; (2) Set max CAC = CLV * target margin (e.g., CLV * 0.33 for 3:1 ratio); (3) Compare max CAC to actual CAC by channel; (4) Allocate budget to channels where actual CAC < max CAC; (5) High-CLV segments justify higher CAC — a $500 CLV segment supports $167 CAC (3:1) while a $100 CLV segment only supports $33. This prevents overspending on low-value segments and underspending on high-value ones.',
		difficulty: 'hard',
		lectureId: 5
	},
	{
		id: 'm4-l5-h2',
		question: 'A SaaS company has CLV of $2,400 with R=85%, M=$50/month, i=12% annually. They are considering a retention program costing $20/customer. Should they invest?',
		answer:
			'Analysis: The program costs $20 per customer. If it improves retention even marginally, the value gain compounds across all future periods. With R=85%, each 1% improvement in retention (to 86%) adds approximately $30-50 to CLV over the planning horizon (the exact amount depends on T). So even if the program improves retention by less than 1 percentage point, it pays for itself. The key insight: because retention compounds, even small improvements generate returns that exceed the $20 cost. However, you must measure the INCREMENTAL effect — if customers would have stayed anyway, the spend is wasted (the incrementality problem from Lecture 7).',
		difficulty: 'hard',
		lectureId: 5
	},

	// =============================================================================
	// LECTURE 6: AI-Generated Content and Engagement (6 questions: 1 easy, 3 medium, 2 hard)
	// =============================================================================

	// L6 - Easy
	{
		id: 'm4-l6-e1',
		question: 'What is the AGC engagement paradox?',
		answer:
			'The AGC engagement paradox: AI-generated content can match or exceed human content quality, but when consumers learn the content is AI-generated, trust and engagement drop significantly. The content quality is identical — only the source attribution changes. This means authenticity perception is driven by WHO created the content, not just HOW good the content is.',
		difficulty: 'easy',
		lectureId: 6
	},

	// L6 - Medium
	{
		id: 'm4-l6-m1',
		question: 'How do LLMs generate text through next-token prediction?',
		answer:
			'LLMs work by predicting the most probable next token (word/subword) given all preceding tokens. Given "The cat sat on the...", the model calculates probability distributions over its vocabulary and selects the most likely continuation (e.g., "mat"). This process repeats token by token. The model does not "understand" — it has learned statistical patterns from billions of words of training data. The result is remarkably coherent text that follows learned patterns of language.',
		difficulty: 'medium',
		lectureId: 6
	},
	{
		id: 'm4-l6-m2',
		question: 'What is content homogenization and why is it a risk for brands using AGC?',
		answer:
			'Content homogenization is the tendency for AI-generated content to converge toward similar styles, tones, and patterns. Risk for brands: (1) Loss of distinctive brand voice; (2) Content becomes indistinguishable from competitors using the same AI tools; (3) Reduced differentiation in a crowded market; (4) Audiences notice the "AI feel" — generic, polished, but lacking personality. Mitigation: use AI as a starting point but add human editing for brand voice and personal perspective.',
		difficulty: 'medium',
		lectureId: 6
	},
	{
		id: 'm4-l6-m3',
		question: 'What is "personal voice" and why does it matter for content strategy?',
		answer:
			'Personal voice is the unique writing style, perspective, and authenticity that distinguishes human-created content. It includes: specific experiences, emotional nuance, cultural context, imperfections, and genuine opinion. It matters because: (1) Builds authentic connections with audiences; (2) Creates brand differentiation that AI cannot replicate; (3) Drives higher trust and engagement; (4) Becomes more valuable as AI content proliferates — scarcity of genuine voice increases its premium.',
		difficulty: 'medium',
		lectureId: 6
	},

	// L6 - Hard
	{
		id: 'm4-l6-h1',
		question: 'How should a marketing team balance efficiency gains from AGC against authenticity risks?',
		answer:
			'Balanced approach: (1) Use AGC for efficiency in low-stakes, high-volume content (product descriptions, email variants, social media scheduling); (2) Maintain human creation for high-stakes, brand-defining content (brand stories, thought leadership, crisis communication); (3) Hybrid model — AI drafts, humans edit for voice and accuracy; (4) Always disclose AI use where legally required; (5) Monitor engagement metrics to detect trust erosion; (6) Invest in unique human perspectives as a competitive advantage. The key: AGC augments human creativity, it should not replace it entirely.',
		difficulty: 'hard',
		lectureId: 6
	},
	{
		id: 'm4-l6-h2',
		question: 'As AGC becomes ubiquitous, how might the competitive landscape for content marketing shift?',
		answer:
			'Predicted shifts: (1) Content volume explodes — everyone produces more, increasing noise; (2) Quality floor rises — bad content disappears, but differentiation becomes harder; (3) Authenticity becomes premium — human-created content gains scarcity value; (4) Distribution matters more — if everyone has great content, reaching the audience becomes the bottleneck; (5) First-party data advantage — brands with unique customer insights create content AI cannot replicate from public data; (6) Community and relationships replace broadcast — audiences seek genuine connection, not more content.',
		difficulty: 'hard',
		lectureId: 6
	},

	// =============================================================================
	// LECTURE 7: Customer Churn and Incrementality (7 questions: 1 easy, 4 medium, 2 hard)
	// =============================================================================

	// L7 - Easy
	{
		id: 'm4-l7-e1',
		question: 'What is the fundamental flaw in traditional churn prediction targeting?',
		answer:
			'Traditional targeting identifies customers with the highest churn risk and sends them retention offers. The flaw: not all high-risk customers can be influenced. Three types exist within "high risk": (1) Will leave no matter what — budget wasted; (2) Will stay no matter what — budget wasted; (3) Persuadable — the only group with real ROI. Traditional models predict risk, not the impact of intervention.',
		difficulty: 'easy',
		lectureId: 7
	},

	// L7 - Medium
	{
		id: 'm4-l7-m1',
		question: 'Explain the 2x2 matrix for incrementality-based targeting.',
		answer:
			'The matrix has two axes: Churn Risk (low/high) and Retention Sensitivity (low/high). Four quadrants: (1) Top-left: High risk, low sensitivity — will leave regardless, do not waste budget; (2) Top-right: High risk, high sensitivity — PERSUADABLE, the optimal target; (3) Bottom-left: Low risk, low sensitivity — safe anyway, no action needed; (4) Bottom-right: Low risk, high sensitivity — might backfire, intervention may remind them to consider leaving. Only the top-right quadrant generates positive ROI.',
		difficulty: 'medium',
		lectureId: 7
	},
	{
		id: 'm4-l7-m2',
		question: 'What is uplift modeling and how does it differ from traditional churn prediction?',
		answer:
			'Uplift modeling estimates the ADDITIONAL effect of intervention: Uplift = P(stay|treated) - P(stay|not treated). Traditional prediction estimates P(churn) — the probability of leaving regardless of intervention. Uplift modeling asks "What will change BECAUSE of what we do?" while traditional asks "What will happen?" Uplift requires experimental data (treatment/control groups) and specialized algorithms, but produces dramatically better targeting ROI.',
		difficulty: 'medium',
		lectureId: 7
	},
	{
		id: 'm4-l7-m3',
		question: 'How does incrementality-based targeting connect to the causal inference concepts from Module 1?',
		answer:
			'Direct connection: Incrementality asks the causal question — "Does the intervention CAUSE the customer to stay?" This is the same treatment effect framework from Module 1. Uplift = treatment effect per individual. Traditional churn prediction is purely correlational (predicts outcome, not causation). The shift from outcome-based to incrementality-based targeting is the shift from prediction to causal inference applied to customer retention.',
		difficulty: 'medium',
		lectureId: 7
	},
	{
		id: 'm4-l7-m4',
		question: 'Why might a retention campaign targeted at the bottom-right quadrant (low risk, high sensitivity) actually backfire?',
		answer:
			'These customers are currently safe — they are not thinking about leaving. But they are sensitive to interventions. When you send them a retention offer (discount, special deal), it signals: "We think you might leave." This plants the idea of leaving in their mind. The offer itself becomes a prompt to reconsider their subscription. Additionally, they may now expect future discounts, anchoring to a lower price. The intervention creates the very problem it was meant to prevent.',
		difficulty: 'medium',
		lectureId: 7
	},

	// L7 - Hard
	{
		id: 'm4-l7-h1',
		question: 'A telecom company spends $10M annually on retention campaigns. How would you redesign their approach using incrementality?',
		answer:
			'Redesign: (1) Run A/B test — randomly assign high-risk customers to treatment (retention offer) and control (no offer); (2) Measure uplift — calculate the difference in retention rates between groups; (3) Build uplift model — identify which customer features predict high uplift (not just high churn risk); (4) Segment customers by uplift score, not churn score; (5) Allocate the $10M only to high-uplift customers; (6) Expected result: same or better retention with potentially 40-60% less spend, or dramatically better retention with the same spend, because every dollar targets a persuadable customer.',
		difficulty: 'hard',
		lectureId: 7
	},
	{
		id: 'm4-l7-h2',
		question: 'Compare the business implications of reducing churn by 5% through traditional targeting versus incrementality targeting. Why might the same churn reduction have different ROI?',
		answer:
			'Traditional: 5% reduction comes from blanketing all high-risk customers. Cost is high because most budget is wasted on non-persuadable customers. Many "retained" customers would have stayed anyway (not truly retained by the campaign). ROI = (value of retention - total campaign cost) / total campaign cost. Incrementality: 5% reduction comes from targeting only persuadable customers. Same retention improvement but far lower cost (fewer customers targeted). Every retained customer is genuinely incremental. ROI is dramatically higher because denominator (cost) is much smaller while numerator (genuine value) is the same or higher. The same churn metric masks very different economic efficiency.',
		difficulty: 'hard',
		lectureId: 7
	},

	// =============================================================================
	// LECTURE 8: Python Demo — Segmentation and CLV (5 questions: 2 easy, 2 medium, 1 hard)
	// =============================================================================

	// L8 - Easy
	{
		id: 'm4-l8-e1',
		question: 'Why must features be scaled before running K-means clustering?',
		answer:
			'K-means uses distance (typically Euclidean) to assign observations to clusters. Variables with larger numeric ranges dominate the distance calculation. Example: income (10K-200K range) would overwhelm age (20-70 range) simply because of scale, not importance. StandardScaler transforms all features to mean=0, std=1, making each feature contribute proportionally. Without scaling, clusters are driven by whichever variable has the largest numbers.',
		difficulty: 'easy',
		lectureId: 8
	},
	{
		id: 'm4-l8-e2',
		question: 'What does a silhouette score of 0.19 indicate about cluster quality?',
		answer:
			'A silhouette score of 0.19 indicates moderate cluster separation — clusters are identifiable but overlap significantly. This is typical of real-world behavioral data where human behavior is messy and multidimensional. Scores close to 1 indicate excellent separation, near 0 indicates high overlap, and negative indicates misassignment. A moderate score does not mean the segmentation is useless — it means segment boundaries are fuzzy, which is realistic for marketing data.',
		difficulty: 'easy',
		lectureId: 8
	},

	// L8 - Medium
	{
		id: 'm4-l8-m1',
		question: 'Why is PCA used only for visualization and not for the clustering itself?',
		answer:
			'PCA reduces multi-dimensional data to 2 components for plotting, but this discards information. Clustering on PCA-reduced data would lose the signal from dimensions that PCA considers less important — but those dimensions may contain crucial segmentation information. The clustering operates in full 40-dimensional feature space to capture all available signal. PCA then projects the results to 2D for human inspection only. It is a visualization aid, not an analytical step.',
		difficulty: 'medium',
		lectureId: 8
	},
	{
		id: 'm4-l8-m2',
		question: 'In the demo, basic CLV is approximately 300,000 but discounted CLV drops to 221,000. Explain the difference.',
		answer:
			'The difference (~26% reduction) comes from applying a 20% discount rate. Basic CLV treats a dollar in year 3 the same as a dollar today: CLV = value x frequency x lifespan. Discounted CLV divides each period\'s cash flow by (1+0.20)^t: year 1 divided by 1.20, year 2 by 1.44, year 3 by 1.728. Future dollars are worth less today because of opportunity cost and risk. The 300K figure is financially incorrect — it overstates the present value of the customer relationship. Always use discounted CLV.',
		difficulty: 'medium',
		lectureId: 8
	},

	// L8 - Hard
	{
		id: 'm4-l8-h1',
		question: 'Describe the complete end-to-end pipeline from raw data to segment-level business strategy, identifying the key decision points.',
		answer:
			'Pipeline with decisions: (1) Load data — decision: which variables to include; (2) Explore — decision: identify target variable, check data quality; (3) Scale features — decision: which scaler (StandardScaler for K-means); (4) Sample if needed — decision: sample size for efficiency; (5) Choose k — decision: Elbow + Silhouette, business interpretability; (6) Run K-means — decision: number of random starts; (7) Visualize with PCA — assessment: do clusters look distinct?; (8) Interpret clusters — decision: which variables define each segment; (9) Validate statistically — assessment: are differences significant?; (10) Calculate CLV per customer — decision: discount rate, planning horizon; (11) Aggregate CLV by cluster — assessment: which segments are most valuable; (12) Develop strategy — decision: budget allocation, messaging, pricing per segment. Each decision affects downstream results.',
		difficulty: 'hard',
		lectureId: 8
	}
];
