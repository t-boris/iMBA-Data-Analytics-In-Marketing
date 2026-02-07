/**
 * Centralized module data for the iMBA Data Analytics app.
 * Contains all 8 course modules with Module 1 fully defined.
 */

import type { Module, Lecture, ModuleColor } from '$lib/types/module';

// =============================================================================
// Module 1: Causal Analysis - Full lecture definitions
// =============================================================================

const module1Lectures: Lecture[] = [
  {
    id: '1-1',
    moduleId: '1',
    order: 1,
    title: 'Introduction to Causal Analysis',
    slug: 'introduction',
    description: 'Confounds, spurious correlation, and selection bias fundamentals',
    duration: '20 min read',
    hasVisualization: true,
    hasAnimation: true,
    status: 'ready'
  },
  {
    id: '1-2',
    moduleId: '1',
    order: 2,
    title: 'Key Thinkers in Causality',
    slug: 'key-thinkers',
    description: 'Neyman, Rubin, Pearl, and the Nobel laureates (Angrist, Card, Imbens)',
    duration: '15 min read',
    hasVisualization: true,
    hasAnimation: true,
    status: 'ready'
  },
  {
    id: '1-3',
    moduleId: '1',
    order: 3,
    title: 'Randomized Experiments & A/B Testing',
    slug: 'randomized-experiments',
    description: 'The gold standard for causal inference and practical A/B test design',
    duration: '25 min read',
    hasVisualization: true,
    hasAnimation: true,
    status: 'ready'
  },
  {
    id: '1-4',
    moduleId: '1',
    order: 4,
    title: 'Matching Methods',
    slug: 'matching-methods',
    description: 'Propensity Score Matching (PSM), Inverse Probability Weighting (IPW), and Synthetic Control',
    duration: '30 min read',
    hasVisualization: true,
    hasAnimation: true,
    status: 'ready'
  },
  {
    id: '1-5',
    moduleId: '1',
    order: 5,
    title: 'Instrumental Variables',
    slug: 'instrumental-variables',
    description: 'Two-Stage Least Squares (2SLS) and finding valid instruments',
    duration: '25 min read',
    hasVisualization: true,
    hasAnimation: true,
    status: 'ready'
  },
  {
    id: '1-6',
    moduleId: '1',
    order: 6,
    title: 'Difference-in-Differences',
    slug: 'difference-in-differences',
    description: 'Parallel trends assumption and policy evaluation with DID',
    duration: '25 min read',
    hasVisualization: true,
    hasAnimation: true,
    status: 'ready'
  },
  {
    id: '1-7',
    moduleId: '1',
    order: 7,
    title: 'Field Experiments',
    slug: 'field-experiments',
    description: 'Real-world experimentation including the Swedish grocery store case study',
    duration: '20 min read',
    hasVisualization: true,
    hasAnimation: false,
    status: 'ready'
  },
  {
    id: '1-8',
    moduleId: '1',
    order: 8,
    title: 'Python Demo: DID Implementation',
    slug: 'python-demo-did',
    description: 'Hands-on Python implementation of Difference-in-Differences analysis',
    duration: '30 min read',
    hasVisualization: true,
    hasAnimation: false,
    status: 'ready'
  }
];

// =============================================================================
// Module 2: AI, Prediction & Machine Learning - Full lecture definitions
// =============================================================================

const module2Lectures: Lecture[] = [
  {
    id: '2-1',
    moduleId: '2',
    order: 1,
    title: 'Introduction to AI, ML, and Prediction',
    slug: 'introduction-ai-ml',
    description: 'What AI and ML are, why they matter now, and how prediction creates value',
    duration: '20 min read',
    hasVisualization: true,
    hasAnimation: true,
    status: 'ready'
  },
  {
    id: '2-2',
    moduleId: '2',
    order: 2,
    title: 'Foundations of Machine Learning Frameworks',
    slug: 'ml-frameworks',
    description: 'Bias-variance trade-off, train-test split, and model evaluation fundamentals',
    duration: '25 min read',
    hasVisualization: true,
    hasAnimation: true,
    status: 'ready'
  },
  {
    id: '2-3',
    moduleId: '2',
    order: 3,
    title: 'Geotracking Data and Privacy',
    slug: 'geotracking-privacy',
    description: 'Location data in marketing, privacy considerations, and ethical use',
    duration: '20 min read',
    hasVisualization: true,
    hasAnimation: true,
    status: 'ready'
  },
  {
    id: '2-4',
    moduleId: '2',
    order: 4,
    title: 'LLMs for Market Research',
    slug: 'llm-market-research',
    description: 'Using large language models to augment market research and consumer insights',
    duration: '25 min read',
    hasVisualization: true,
    hasAnimation: true,
    status: 'ready'
  },
  {
    id: '2-5',
    moduleId: '2',
    order: 5,
    title: 'Prediction and Causality',
    slug: 'prediction-causality',
    description: 'How prediction and causal inference complement each other in decision-making',
    duration: '20 min read',
    hasVisualization: true,
    hasAnimation: true,
    status: 'ready'
  },
  {
    id: '2-6',
    moduleId: '2',
    order: 6,
    title: 'AI Ethics in Marketing',
    slug: 'ai-ethics',
    description: 'Fairness, transparency, and responsible AI practices in marketing applications',
    duration: '20 min read',
    hasVisualization: true,
    hasAnimation: true,
    status: 'ready'
  },
  {
    id: '2-7',
    moduleId: '2',
    order: 7,
    title: 'Smartwatch Adoption Case Study',
    slug: 'smartwatch-adoption',
    description: 'Analyzing technology adoption patterns using ML and consumer behavior data',
    duration: '25 min read',
    hasVisualization: true,
    hasAnimation: true,
    status: 'ready'
  },
  {
    id: '2-8',
    moduleId: '2',
    order: 8,
    title: 'ML Models in Python',
    slug: 'ml-python-demo',
    description: 'Hands-on Python implementation of machine learning models for marketing',
    duration: '30 min read',
    hasVisualization: true,
    hasAnimation: true,
    status: 'ready'
  }
];

// =============================================================================
// Module 3: User, Firm & AI-Generated Content - Full lecture definitions
// =============================================================================

const module3Lectures: Lecture[] = [
  {
    id: '3-1',
    moduleId: '3',
    order: 1,
    title: 'Introduction to Online Content',
    slug: 'intro-online-content',
    description: 'UGC/FGC/AGC introduction, NPS, and social listening fundamentals',
    duration: '20 min read',
    hasVisualization: true,
    hasAnimation: true,
    status: 'ready'
  },
  {
    id: '3-2',
    moduleId: '3',
    order: 2,
    title: 'Text Analysis — Historical Perspective',
    slug: 'text-analysis-history',
    description: 'Evolution from oral tradition to digital text and misinformation risks',
    duration: '20 min read',
    hasVisualization: true,
    hasAnimation: true,
    status: 'ready'
  },
  {
    id: '3-3',
    moduleId: '3',
    order: 3,
    title: 'Types of Content',
    slug: 'types-of-content',
    description: 'Deep dive into content classification, authenticity, and analytics framework',
    duration: '25 min read',
    hasVisualization: true,
    hasAnimation: true,
    status: 'ready'
  },
  {
    id: '3-4',
    moduleId: '3',
    order: 4,
    title: 'UGC Deep Dive',
    slug: 'ugc-deep-dive',
    description: 'Reviews, ratings, chatter, valence, and negativity bias',
    duration: '25 min read',
    hasVisualization: true,
    hasAnimation: true,
    status: 'ready'
  },
  {
    id: '3-5',
    moduleId: '3',
    order: 5,
    title: 'FGC Deep Dive',
    slug: 'fgc-deep-dive',
    description: 'Managerial responses, personalization, and customer receptivity',
    duration: '25 min read',
    hasVisualization: true,
    hasAnimation: true,
    status: 'ready'
  },
  {
    id: '3-6',
    moduleId: '3',
    order: 6,
    title: 'AGC Deep Dive',
    slug: 'agc-deep-dive',
    description: 'LLMs, transformers, and perceived authenticity challenges',
    duration: '25 min read',
    hasVisualization: true,
    hasAnimation: true,
    status: 'ready'
  },
  {
    id: '3-7',
    moduleId: '3',
    order: 7,
    title: 'Online Content Emerging Concerns',
    slug: 'emerging-concerns',
    description: 'Fake reviews, misinformation, and content moderation',
    duration: '20 min read',
    hasVisualization: true,
    hasAnimation: true,
    status: 'ready'
  },
  {
    id: '3-8',
    moduleId: '3',
    order: 8,
    title: 'Influencer Marketing Introduction',
    slug: 'influencer-marketing',
    description: 'Influencer tiers, engagement rate, and live stream commerce',
    duration: '25 min read',
    hasVisualization: true,
    hasAnimation: true,
    status: 'ready'
  },
  {
    id: '3-9',
    moduleId: '3',
    order: 9,
    title: 'Sentiment Analysis Application',
    slug: 'sentiment-analysis',
    description: 'BERT, DistilBERT, and dictionary methods comparison',
    duration: '25 min read',
    hasVisualization: true,
    hasAnimation: true,
    status: 'ready'
  },
  {
    id: '3-10',
    moduleId: '3',
    order: 10,
    title: 'Python Demo: Sentiment Pipeline',
    slug: 'python-sentiment-demo',
    description: 'Hands-on NLP pipeline with spaCy and transformers',
    duration: '30 min read',
    hasVisualization: true,
    hasAnimation: true,
    status: 'ready'
  }
];

// =============================================================================
// Module 4: Customer Preferences & Lifetime Value - Full lecture definitions
// =============================================================================

const module4Lectures: Lecture[] = [
  {
    id: '4-1',
    moduleId: '4',
    order: 1,
    title: 'Consumer Demand and Preference Analysis',
    slug: 'consumer-demand-preferences',
    description: 'Music store case study, data-driven analysis, and module roadmap',
    duration: '20 min read',
    hasVisualization: true,
    hasAnimation: true,
    status: 'ready'
  },
  {
    id: '4-2',
    moduleId: '4',
    order: 2,
    title: 'Segmentation, Targeting, and Positioning',
    slug: 'stp-framework',
    description: 'STP framework, K-means clustering, vertical vs horizontal attributes, and market mapping',
    duration: '25 min read',
    hasVisualization: true,
    hasAnimation: true,
    status: 'ready'
  },
  {
    id: '4-3',
    moduleId: '4',
    order: 3,
    title: 'Conjoint Analysis',
    slug: 'conjoint-analysis',
    description: 'Measuring attribute value through part-worth utilities and trade-off analysis',
    duration: '25 min read',
    hasVisualization: true,
    hasAnimation: true,
    status: 'ready'
  },
  {
    id: '4-4',
    moduleId: '4',
    order: 4,
    title: 'Introduction to CLV Analysis',
    slug: 'clv-introduction',
    description: 'Customer lifetime value concepts, retention metrics, and strategic importance',
    duration: '25 min read',
    hasVisualization: true,
    hasAnimation: true,
    status: 'coming-soon'
  },
  {
    id: '4-5',
    moduleId: '4',
    order: 5,
    title: 'CLV Calculation and Application',
    slug: 'clv-calculation',
    description: 'CLV formulas, discount rates, and practical business applications',
    duration: '25 min read',
    hasVisualization: true,
    hasAnimation: true,
    status: 'coming-soon'
  },
  {
    id: '4-6',
    moduleId: '4',
    order: 6,
    title: 'AI-Generated Content and Engagement',
    slug: 'agc-engagement',
    description: 'AI content strategies, customer engagement metrics, and personalization',
    duration: '20 min read',
    hasVisualization: true,
    hasAnimation: true,
    status: 'coming-soon'
  },
  {
    id: '4-7',
    moduleId: '4',
    order: 7,
    title: 'Customer Churn and Incrementality',
    slug: 'churn-incrementality',
    description: 'Churn prediction, prevention strategies, and incrementality testing',
    duration: '25 min read',
    hasVisualization: true,
    hasAnimation: true,
    status: 'coming-soon'
  },
  {
    id: '4-8',
    moduleId: '4',
    order: 8,
    title: 'Python Demo: Segmentation and CLV',
    slug: 'python-segmentation-clv',
    description: 'Hands-on Python implementation of customer segmentation and CLV calculation',
    duration: '30 min read',
    hasVisualization: true,
    hasAnimation: true,
    status: 'coming-soon'
  }
];

// =============================================================================
// All Modules Definition
// =============================================================================

/**
 * All 8 course modules.
 * Modules 1-2 are fully defined with lectures.
 * Modules 3-8 are placeholders for future content.
 */
export const modules: Module[] = [
  {
    id: '1',
    order: 1,
    name: 'Causal Analysis',
    slug: 'causal-analysis',
    description: 'Fundamentals of causal inference in marketing',
    icon: '🎯',
    color: 'treatment',
    lectures: module1Lectures,
    status: 'active'
  },
  {
    id: '2',
    order: 2,
    name: 'AI, Prediction & Machine Learning',
    slug: 'ai-ml-prediction',
    description: 'Machine learning, prediction, and AI applications in marketing',
    icon: '🤖',
    color: 'control',
    lectures: module2Lectures,
    status: 'active'
  },
  {
    id: '3',
    order: 3,
    name: 'User, Firm & AI-Generated Content',
    slug: 'content-analysis',
    description: 'Text analytics, content types, sentiment analysis, and influencer marketing',
    icon: '💬',
    color: 'confounder',
    lectures: module3Lectures,
    status: 'active'
  },
  {
    id: '4',
    order: 4,
    name: 'Customer Preferences and Lifetime Value Analysis',
    slug: 'customer-preferences-clv',
    description: 'Analyze customer preferences using STP and conjoint analysis, calculate customer lifetime value, and understand churn prevention through incrementality',
    icon: '🎯',
    color: 'outcome',
    lectures: module4Lectures,
    status: 'active'
  },
  {
    id: '5',
    order: 5,
    name: 'Module 5',
    slug: 'module-5',
    description: 'Coming soon',
    icon: '💡',
    color: 'treatment',
    lectures: [],
    status: 'coming-soon'
  },
  {
    id: '6',
    order: 6,
    name: 'Module 6',
    slug: 'module-6',
    description: 'Coming soon',
    icon: '🧪',
    color: 'control',
    lectures: [],
    status: 'coming-soon'
  },
  {
    id: '7',
    order: 7,
    name: 'Module 7',
    slug: 'module-7',
    description: 'Coming soon',
    icon: '📉',
    color: 'confounder',
    lectures: [],
    status: 'coming-soon'
  },
  {
    id: '8',
    order: 8,
    name: 'Module 8',
    slug: 'module-8',
    description: 'Coming soon',
    icon: '🎓',
    color: 'outcome',
    lectures: [],
    status: 'coming-soon'
  }
];

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Get a module by its ID.
 * @param id - Module ID (1-8)
 * @returns The module or undefined if not found
 */
export function getModuleById(id: string): Module | undefined {
  return modules.find((m) => m.id === id);
}

/**
 * Get a module by its slug.
 * @param slug - URL-friendly module identifier
 * @returns The module or undefined if not found
 */
export function getModuleBySlug(slug: string): Module | undefined {
  return modules.find((m) => m.slug === slug);
}

/**
 * Get a lecture by module ID and lecture ID.
 * @param moduleId - Module ID (1-8)
 * @param lectureId - Lecture ID (e.g., "1-1")
 * @returns The lecture or undefined if not found
 */
export function getLectureById(moduleId: string, lectureId: string): Lecture | undefined {
  const module = getModuleById(moduleId);
  return module?.lectures.find((l) => l.id === lectureId);
}

/**
 * Get a lecture by module slug and lecture slug.
 * @param moduleSlug - URL-friendly module identifier
 * @param lectureSlug - URL-friendly lecture identifier
 * @returns The lecture or undefined if not found
 */
export function getLectureBySlug(moduleSlug: string, lectureSlug: string): Lecture | undefined {
  const module = getModuleBySlug(moduleSlug);
  return module?.lectures.find((l) => l.slug === lectureSlug);
}

/**
 * Get all active modules (status !== 'coming-soon').
 * @returns Array of active modules
 */
export function getActiveModules(): Module[] {
  return modules.filter((m) => m.status === 'active');
}

/**
 * Get the next lecture in a module.
 * @param moduleId - Module ID
 * @param currentLectureId - Current lecture ID
 * @returns The next lecture or undefined if at the end
 */
export function getNextLecture(moduleId: string, currentLectureId: string): Lecture | undefined {
  const module = getModuleById(moduleId);
  if (!module) return undefined;

  const currentIndex = module.lectures.findIndex((l) => l.id === currentLectureId);
  if (currentIndex === -1 || currentIndex === module.lectures.length - 1) return undefined;

  return module.lectures[currentIndex + 1];
}

/**
 * Get the previous lecture in a module.
 * @param moduleId - Module ID
 * @param currentLectureId - Current lecture ID
 * @returns The previous lecture or undefined if at the beginning
 */
export function getPreviousLecture(moduleId: string, currentLectureId: string): Lecture | undefined {
  const module = getModuleById(moduleId);
  if (!module) return undefined;

  const currentIndex = module.lectures.findIndex((l) => l.id === currentLectureId);
  if (currentIndex <= 0) return undefined;

  return module.lectures[currentIndex - 1];
}

/**
 * Get total lecture count across all modules.
 * @returns Total number of lectures
 */
export function getTotalLectureCount(): number {
  return modules.reduce((sum, module) => sum + module.lectures.length, 0);
}

/**
 * Get lecture count for ready lectures only.
 * @returns Number of ready lectures
 */
export function getReadyLectureCount(): number {
  return modules.reduce(
    (sum, module) => sum + module.lectures.filter((l) => l.status === 'ready').length,
    0
  );
}
