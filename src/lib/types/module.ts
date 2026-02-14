/**
 * Module and Lecture type definitions for the iMBA Data Analytics app.
 * These types power the navigation and content system for all 4 course modules.
 */

/**
 * Represents a single lecture within a module.
 */
export interface Lecture {
  /** Unique identifier for the lecture (format: "{moduleId}-{lectureOrder}") */
  id: string;
  /** ID of the parent module */
  moduleId: string;
  /** Display order within the module (1-based) */
  order: number;
  /** Lecture title displayed in navigation and headers */
  title: string;
  /** URL-friendly identifier for routing */
  slug: string;
  /** Brief description of the lecture content */
  description: string;
  /** Estimated reading/viewing time (e.g., "15 min read") */
  duration?: string;
  /** Whether this lecture includes interactive visualizations */
  hasVisualization: boolean;
  /** Whether this lecture includes animated explanations */
  hasAnimation: boolean;
  /** Content availability status */
  status: 'draft' | 'ready' | 'coming-soon';
}

/**
 * Semantic color categories for module visual identity.
 * Maps to the causal inference color system from the design tokens.
 */
export type ModuleColor = 'treatment' | 'control' | 'confounder' | 'outcome' | 'default';

/**
 * Represents a course module containing multiple lectures.
 */
export interface Module {
  /** Unique identifier for the module (1-4) */
  id: string;
  /** Display order in navigation (1-based) */
  order: number;
  /** Module name displayed in navigation and headers */
  name: string;
  /** URL-friendly identifier for routing */
  slug: string;
  /** Brief description of the module content */
  description: string;
  /** Emoji or icon name for visual identification */
  icon?: string;
  /** Semantic color category for visual theming */
  color: ModuleColor;
  /** Lectures contained within this module */
  lectures: Lecture[];
  /** Module availability status */
  status: 'active' | 'coming-soon';
}

/**
 * Valid module IDs (1 through 4).
 */
export type ModuleId = '1' | '2' | '3' | '4';

/**
 * Lecture status for filtering and display.
 */
export type LectureStatus = Lecture['status'];

/**
 * Module status for filtering and display.
 */
export type ModuleStatus = Module['status'];
