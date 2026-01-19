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
    hasAnimation: false,
    status: 'coming-soon'
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
    status: 'coming-soon'
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
    status: 'coming-soon'
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
    status: 'coming-soon'
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
    status: 'coming-soon'
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
    status: 'coming-soon'
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
    status: 'coming-soon'
  }
];

// =============================================================================
// All Modules Definition
// =============================================================================

/**
 * All 8 course modules.
 * Module 1 is fully defined with lectures.
 * Modules 2-8 are placeholders for future content.
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
    name: 'Module 2',
    slug: 'module-2',
    description: 'Coming soon',
    icon: '📊',
    color: 'control',
    lectures: [],
    status: 'coming-soon'
  },
  {
    id: '3',
    order: 3,
    name: 'Module 3',
    slug: 'module-3',
    description: 'Coming soon',
    icon: '📈',
    color: 'confounder',
    lectures: [],
    status: 'coming-soon'
  },
  {
    id: '4',
    order: 4,
    name: 'Module 4',
    slug: 'module-4',
    description: 'Coming soon',
    icon: '🔍',
    color: 'outcome',
    lectures: [],
    status: 'coming-soon'
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
