/**
 * LocalStorage persistence for quiz history and progress tracking.
 * Provides functions to save, retrieve, and analyze quiz results.
 */

const STORAGE_KEY = 'quiz_history';

/**
 * Represents a single quiz attempt in history.
 */
export interface QuizHistory {
  /** ISO date string of when the quiz was completed */
  date: string;
  /** Module ID (e.g., 'module1') */
  moduleId: string;
  /** Total number of questions in the quiz */
  totalQuestions: number;
  /** Number of questions marked as "got it" */
  gotItCount: number;
  /** Number of questions marked as "need review" */
  needReviewCount: number;
  /** Time spent in seconds */
  timeSpent: number;
  /** Difficulty setting used for the quiz */
  difficulty: string;
}

/**
 * Mastery statistics for a module.
 */
export interface MasteryStats {
  /** Total number of quiz attempts */
  totalAttempts: number;
  /** Average score as a percentage (0-100) */
  averageScore: number;
  /** Trend based on recent quiz performance */
  recentTrend: 'improving' | 'stable' | 'declining';
}

/**
 * Check if localStorage is available (handles SSR).
 */
function isLocalStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const test = '__storage_test__';
    window.localStorage.setItem(test, test);
    window.localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

/**
 * Save a quiz result to localStorage history.
 * @param result - The quiz result to save
 */
export function saveQuizResult(result: QuizHistory): void {
  if (!isLocalStorageAvailable()) return;

  try {
    const history = getQuizHistory();
    history.push(result);

    // Keep only the last 100 results to prevent excessive storage use
    const trimmedHistory = history.slice(-100);

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedHistory));
  } catch (error) {
    console.error('Failed to save quiz result:', error);
  }
}

/**
 * Get quiz history from localStorage.
 * @param moduleId - Optional module ID to filter results
 * @returns Array of quiz history entries
 */
export function getQuizHistory(moduleId?: string): QuizHistory[] {
  if (!isLocalStorageAvailable()) return [];

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const history: QuizHistory[] = JSON.parse(stored);

    if (moduleId) {
      return history.filter((h) => h.moduleId === moduleId);
    }

    return history;
  } catch (error) {
    console.error('Failed to get quiz history:', error);
    return [];
  }
}

/**
 * Clear all quiz history from localStorage.
 */
export function clearQuizHistory(): void {
  if (!isLocalStorageAvailable()) return;

  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear quiz history:', error);
  }
}

/**
 * Get mastery statistics for a specific module.
 * @param moduleId - The module ID to get stats for
 * @returns Mastery statistics including attempts, average score, and trend
 */
export function getMasteryStats(moduleId: string): MasteryStats {
  const history = getQuizHistory(moduleId);

  if (history.length === 0) {
    return {
      totalAttempts: 0,
      averageScore: 0,
      recentTrend: 'stable'
    };
  }

  // Calculate average score
  const scores = history.map((h) =>
    h.totalQuestions > 0 ? (h.gotItCount / h.totalQuestions) * 100 : 0
  );
  const averageScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

  // Calculate trend based on last 5 quizzes vs previous 5
  let recentTrend: 'improving' | 'stable' | 'declining' = 'stable';

  if (history.length >= 3) {
    const recentCount = Math.min(5, Math.floor(history.length / 2));
    const recentScores = scores.slice(-recentCount);
    const olderScores = scores.slice(-recentCount * 2, -recentCount);

    if (olderScores.length > 0) {
      const recentAvg = recentScores.reduce((a, b) => a + b, 0) / recentScores.length;
      const olderAvg = olderScores.reduce((a, b) => a + b, 0) / olderScores.length;

      const difference = recentAvg - olderAvg;

      if (difference > 5) {
        recentTrend = 'improving';
      } else if (difference < -5) {
        recentTrend = 'declining';
      }
    }
  }

  return {
    totalAttempts: history.length,
    averageScore,
    recentTrend
  };
}

/**
 * Get the most recent quiz result for a module.
 * @param moduleId - Optional module ID to filter
 * @returns The most recent quiz result or null
 */
export function getLastQuizResult(moduleId?: string): QuizHistory | null {
  const history = getQuizHistory(moduleId);
  return history.length > 0 ? history[history.length - 1] : null;
}

/**
 * Get formatted statistics for display.
 * @param moduleId - The module ID to get stats for
 * @returns Object with formatted strings for display
 */
export function getFormattedStats(moduleId: string): {
  totalAttempts: string;
  averageScore: string;
  trend: string;
  trendIcon: 'up' | 'down' | 'stable';
  lastQuizDate: string | null;
} {
  const stats = getMasteryStats(moduleId);
  const lastQuiz = getLastQuizResult(moduleId);

  let trendIcon: 'up' | 'down' | 'stable' = 'stable';
  let trend = 'Stable';

  if (stats.recentTrend === 'improving') {
    trendIcon = 'up';
    trend = 'Improving';
  } else if (stats.recentTrend === 'declining') {
    trendIcon = 'down';
    trend = 'Needs attention';
  }

  let lastQuizDate: string | null = null;
  if (lastQuiz) {
    const date = new Date(lastQuiz.date);
    lastQuizDate = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  }

  return {
    totalAttempts: stats.totalAttempts.toString(),
    averageScore: `${stats.averageScore}%`,
    trend,
    trendIcon,
    lastQuizDate
  };
}
