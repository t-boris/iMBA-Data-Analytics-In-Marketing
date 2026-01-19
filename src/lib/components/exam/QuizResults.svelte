<script lang="ts">
  import type { Question, QuestionDifficulty } from '$lib/exam/types';
  import type { QuizAnswer } from '$lib/exam/store';

  interface Props {
    questions: Question[];
    answers: Map<string, QuizAnswer>;
    startTime: number;
    endTime: number;
  }

  let { questions, answers, startTime, endTime }: Props = $props();

  // Calculate stats
  const totalQuestions = $derived(questions.length);
  const gotItCount = $derived(
    Array.from(answers.values()).filter((a) => a === 'got-it').length
  );
  const needReviewCount = $derived(totalQuestions - gotItCount);
  const percentage = $derived(
    totalQuestions > 0 ? Math.round((gotItCount / totalQuestions) * 100) : 0
  );

  // Time calculation
  const timeSpent = $derived(Math.round((endTime - startTime) / 1000));
  const timeFormatted = $derived(() => {
    const minutes = Math.floor(timeSpent / 60);
    const seconds = timeSpent % 60;
    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  });

  // Difficulty breakdown
  const difficultyStats = $derived(() => {
    const stats: Record<QuestionDifficulty, { total: number; gotIt: number }> = {
      easy: { total: 0, gotIt: 0 },
      medium: { total: 0, gotIt: 0 },
      hard: { total: 0, gotIt: 0 }
    };

    questions.forEach((q) => {
      stats[q.difficulty].total++;
      if (answers.get(q.id) === 'got-it') {
        stats[q.difficulty].gotIt++;
      }
    });

    return stats;
  });

  // Get color class based on percentage
  function getScoreColor(score: number): string {
    if (score >= 70) return 'text-emerald-600 dark:text-emerald-400';
    if (score >= 40) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  }

  function getStrokeColor(score: number): string {
    if (score >= 70) return 'stroke-emerald-500';
    if (score >= 40) return 'stroke-amber-500';
    return 'stroke-red-500';
  }

  function getProgressBg(score: number): string {
    if (score >= 70) return 'bg-emerald-100 dark:bg-emerald-900/30';
    if (score >= 40) return 'bg-amber-100 dark:bg-amber-900/30';
    return 'bg-red-100 dark:bg-red-900/30';
  }

  function getProgressFill(score: number): string {
    if (score >= 70) return 'bg-emerald-500';
    if (score >= 40) return 'bg-amber-500';
    return 'bg-red-500';
  }

  // SVG circle calculations
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = $derived(circumference - (percentage / 100) * circumference);
</script>

<div class="space-y-8">
  <!-- Large Circular Score Display -->
  <div class="flex flex-col items-center">
    <div class="relative w-40 h-40">
      <svg class="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
        <!-- Background circle -->
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="currentColor"
          stroke-width="10"
          class="text-slate-200 dark:text-slate-700"
        />
        <!-- Progress circle -->
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke-width="10"
          stroke-linecap="round"
          class={getStrokeColor(percentage)}
          style="stroke-dasharray: {circumference}; stroke-dashoffset: {strokeDashoffset}; transition: stroke-dashoffset 0.5s ease-out;"
        />
      </svg>
      <!-- Percentage text -->
      <div class="absolute inset-0 flex flex-col items-center justify-center">
        <span class="text-4xl font-bold {getScoreColor(percentage)}">{percentage}%</span>
        <span class="text-sm text-slate-500 dark:text-slate-400">Got it</span>
      </div>
    </div>

    <!-- Performance message -->
    <p class="mt-4 text-lg text-slate-700 dark:text-slate-300 text-center">
      {#if percentage >= 70}
        Great job! You have a solid understanding of these concepts.
      {:else if percentage >= 40}
        Good effort! Review the marked questions to strengthen your knowledge.
      {:else}
        Keep studying! Focus on the concepts marked for review.
      {/if}
    </p>
  </div>

  <!-- Stats Row -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <!-- Total Questions -->
    <div class="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 text-center">
      <div class="flex items-center justify-center w-10 h-10 mx-auto mb-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600 dark:text-blue-400">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
        </svg>
      </div>
      <div class="text-2xl font-bold text-slate-900 dark:text-white">{totalQuestions}</div>
      <div class="text-sm text-slate-500 dark:text-slate-400">Total Questions</div>
    </div>

    <!-- Got It -->
    <div class="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 text-center">
      <div class="flex items-center justify-center w-10 h-10 mx-auto mb-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-600 dark:text-emerald-400">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      </div>
      <div class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{gotItCount}</div>
      <div class="text-sm text-slate-500 dark:text-slate-400">Got It</div>
    </div>

    <!-- Need Review -->
    <div class="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 text-center">
      <div class="flex items-center justify-center w-10 h-10 mx-auto mb-2 bg-amber-100 dark:bg-amber-900/30 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-amber-600 dark:text-amber-400">
          <path d="M12 9v4"/>
          <path d="M12 17h.01"/>
          <circle cx="12" cy="12" r="10"/>
        </svg>
      </div>
      <div class="text-2xl font-bold text-amber-600 dark:text-amber-400">{needReviewCount}</div>
      <div class="text-sm text-slate-500 dark:text-slate-400">Need Review</div>
    </div>

    <!-- Time Spent -->
    <div class="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 text-center">
      <div class="flex items-center justify-center w-10 h-10 mx-auto mb-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-purple-600 dark:text-purple-400">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      </div>
      <div class="text-2xl font-bold text-slate-900 dark:text-white">{timeFormatted()}</div>
      <div class="text-sm text-slate-500 dark:text-slate-400">Time Spent</div>
    </div>
  </div>

  <!-- Difficulty Breakdown -->
  <div class="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
    <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">
      Performance by Difficulty
    </h3>

    <div class="space-y-4">
      {#each (['easy', 'medium', 'hard'] as const) as difficulty}
        {@const stats = difficultyStats()}
        {@const diffStats = stats[difficulty]}
        {@const diffPercent = diffStats.total > 0 ? Math.round((diffStats.gotIt / diffStats.total) * 100) : 0}

        {#if diffStats.total > 0}
          <div>
            <div class="flex items-center justify-between mb-1">
              <span class="text-sm font-medium text-slate-700 dark:text-slate-300 capitalize">
                {difficulty}
              </span>
              <span class="text-sm text-slate-500 dark:text-slate-400">
                {diffStats.gotIt}/{diffStats.total} ({diffPercent}%)
              </span>
            </div>
            <div class="w-full h-2 rounded-full {getProgressBg(diffPercent)}">
              <div
                class="h-full rounded-full transition-all duration-500 {getProgressFill(diffPercent)}"
                style="width: {diffPercent}%"
              ></div>
            </div>
          </div>
        {/if}
      {/each}
    </div>
  </div>
</div>
