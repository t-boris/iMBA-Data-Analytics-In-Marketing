<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { fly } from 'svelte/transition';
  import { Container, Card, Button } from '$lib/components/ui';
  import { QuizConfig } from '$lib/components/exam';
  import { quizConfig, quizState } from '$lib/exam/store';
  import { get } from 'svelte/store';
  import {
    getQuizHistory,
    getMasteryStats,
    getFormattedStats,
    type QuizHistory
  } from '$lib/exam/persistence';

  // Reactive state for history and stats
  let recentHistory = $state<QuizHistory[]>([]);
  let masteryStats = $state<ReturnType<typeof getFormattedStats> | null>(null);
  let hasIncompleteQuiz = $state(false);

  onMount(() => {
    // Load quiz history from localStorage
    const history = getQuizHistory('module1');
    recentHistory = history.slice(-5).reverse(); // Last 5, most recent first

    // Get mastery stats
    if (history.length > 0) {
      masteryStats = getFormattedStats('module1');
    }

    // Check for incomplete quiz
    const state = get(quizState);
    if (state.questions.length > 0 && state.answers.size < state.questions.length && state.answers.size > 0) {
      hasIncompleteQuiz = true;
    }
  });

  function handleStartQuiz() {
    const config = get(quizConfig);
    // Navigate to quiz page with configuration as URL params
    const params = new URLSearchParams({
      length: config.length.toString(),
      difficulty: config.difficulty,
      module: config.moduleId
    });
    goto(`/exam-prep/quiz?${params.toString()}`);
  }

  function handleContinueQuiz() {
    goto('/exam-prep/quiz?continue=true');
  }

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  }

  function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    }
    return `${secs}s`;
  }

  function getScoreColor(gotIt: number, total: number): string {
    const percent = total > 0 ? (gotIt / total) * 100 : 0;
    if (percent >= 70) return 'text-emerald-600 dark:text-emerald-400';
    if (percent >= 40) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  }
</script>

<div transition:fly={{ y: 20, duration: 300 }}>
  <!-- Hero Section -->
  <section class="py-12 md:py-20 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 -mx-6 -mt-6 px-6 mb-12">
    <Container size="lg">
      <div class="text-center max-w-3xl mx-auto">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600 dark:text-blue-400">
            <rect width="18" height="18" x="3" y="3" rx="2"/>
            <path d="m9 12 2 2 4-4"/>
          </svg>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
          Exam Preparation
        </h1>
        <p class="text-xl text-slate-600 dark:text-slate-300 mb-8">
          Master key concepts with visual flashcards. Test your understanding of causal inference,
          experimental design, and marketing analytics through interactive review sessions.
        </p>
        <div class="flex flex-wrap justify-center gap-4 text-sm text-slate-500 dark:text-slate-400">
          <span class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="7" height="9" x="3" y="3" rx="1"/>
              <rect width="7" height="5" x="14" y="3" rx="1"/>
              <rect width="7" height="9" x="14" y="12" rx="1"/>
              <rect width="7" height="5" x="3" y="16" rx="1"/>
            </svg>
            Visual Flashcards
          </span>
          <span class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 20h9"/>
              <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/>
            </svg>
            Self-Assessment
          </span>
          <span class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 3v16a2 2 0 0 0 2 2h16"/>
              <path d="m19 9-5 5-4-4-3 3"/>
            </svg>
            Track Progress
          </span>
        </div>
      </div>
    </Container>
  </section>

  <!-- Continue Quiz Banner (if incomplete) -->
  {#if hasIncompleteQuiz}
    <section class="pb-8">
      <Container size="default">
        <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div class="flex items-center gap-3">
              <div class="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600 dark:text-blue-400">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-blue-900 dark:text-blue-100">Continue where you left off</h3>
                <p class="text-sm text-blue-700 dark:text-blue-300">You have an incomplete quiz session</p>
              </div>
            </div>
            <Button variant="primary" onclick={handleContinueQuiz}>
              Continue Quiz
            </Button>
          </div>
        </div>
      </Container>
    </section>
  {/if}

  <!-- Mastery Stats Section (if there's history) -->
  {#if masteryStats}
    <section class="pb-8">
      <Container size="default">
        <Card padding="lg" variant="default">
          <div class="flex items-center gap-3 mb-4">
            <div class="flex items-center justify-center w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-purple-600 dark:text-purple-400">
                <path d="M3 3v16a2 2 0 0 0 2 2h16"/>
                <path d="m19 9-5 5-4-4-3 3"/>
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-bold text-slate-900 dark:text-white">
                Module 1 Mastery
              </h2>
              <p class="text-sm text-slate-500 dark:text-slate-400">
                Your progress for Causal Inference
              </p>
            </div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <!-- Average Score -->
            <div class="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {masteryStats.averageScore}
              </div>
              <div class="text-sm text-slate-500 dark:text-slate-400">
                Average Score
              </div>
            </div>

            <!-- Total Attempts -->
            <div class="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-slate-900 dark:text-white">
                {masteryStats.totalAttempts}
              </div>
              <div class="text-sm text-slate-500 dark:text-slate-400">
                Quizzes Taken
              </div>
            </div>

            <!-- Trend -->
            <div class="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 text-center">
              <div class="flex items-center justify-center gap-1">
                {#if masteryStats.trendIcon === 'up'}
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-500">
                    <path d="m18 15-6-6-6 6"/>
                  </svg>
                  <span class="text-lg font-bold text-emerald-600 dark:text-emerald-400">{masteryStats.trend}</span>
                {:else if masteryStats.trendIcon === 'down'}
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-500">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                  <span class="text-lg font-bold text-red-600 dark:text-red-400">{masteryStats.trend}</span>
                {:else}
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-500">
                    <path d="M5 12h14"/>
                  </svg>
                  <span class="text-lg font-bold text-slate-600 dark:text-slate-400">{masteryStats.trend}</span>
                {/if}
              </div>
              <div class="text-sm text-slate-500 dark:text-slate-400">
                Trend
              </div>
            </div>

            <!-- Last Quiz -->
            <div class="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 text-center">
              <div class="text-lg font-bold text-slate-900 dark:text-white truncate">
                {masteryStats.lastQuizDate || 'N/A'}
              </div>
              <div class="text-sm text-slate-500 dark:text-slate-400">
                Last Quiz
              </div>
            </div>
          </div>
        </Card>
      </Container>
    </section>
  {/if}

  <!-- Quiz Configuration Section -->
  <section class="pb-16">
    <Container size="default">
      <Card padding="lg" variant="default">
        <div class="mb-6">
          <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Configure Your Quiz
          </h2>
          <p class="text-slate-600 dark:text-slate-400">
            Customize your review session by selecting the number of questions and difficulty level.
          </p>
        </div>

        <QuizConfig onStart={handleStartQuiz} />
      </Card>
    </Container>
  </section>

  <!-- Recent Quiz History (if there's history) -->
  {#if recentHistory.length > 0}
    <section class="py-12 bg-slate-100 dark:bg-slate-800/50 -mx-6 px-6">
      <Container size="default">
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">
          Recent Quiz History
        </h2>

        <div class="space-y-3">
          {#each recentHistory as quiz}
            {@const score = quiz.totalQuestions > 0 ? Math.round((quiz.gotItCount / quiz.totalQuestions) * 100) : 0}

            <div class="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div class="flex items-center gap-4">
                  <!-- Score Circle -->
                  <div class="flex items-center justify-center w-12 h-12 rounded-full border-2 {score >= 70 ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400' : score >= 40 ? 'border-amber-500 text-amber-600 dark:text-amber-400' : 'border-red-500 text-red-600 dark:text-red-400'}">
                    <span class="text-sm font-bold">{score}%</span>
                  </div>

                  <div>
                    <div class="flex items-center gap-2">
                      <span class="font-medium text-slate-900 dark:text-white">
                        {quiz.gotItCount}/{quiz.totalQuestions} correct
                      </span>
                      <span class="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 capitalize">
                        {quiz.difficulty}
                      </span>
                    </div>
                    <div class="text-sm text-slate-500 dark:text-slate-400">
                      {formatDate(quiz.date)} - {formatTime(quiz.timeSpent)}
                    </div>
                  </div>
                </div>

                <!-- Performance Indicator -->
                <div class="flex items-center gap-2">
                  {#if score >= 70}
                    <span class="text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                      </svg>
                      Great
                    </span>
                  {:else if score >= 40}
                    <span class="text-sm text-amber-600 dark:text-amber-400 flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 9v4"/>
                        <path d="M12 17h.01"/>
                        <circle cx="12" cy="12" r="10"/>
                      </svg>
                      Good effort
                    </span>
                  {:else}
                    <span class="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                      </svg>
                      Keep studying
                    </span>
                  {/if}
                </div>
              </div>
            </div>
          {/each}
        </div>
      </Container>
    </section>
  {/if}

  <!-- How It Works Section -->
  <section class="py-12 {recentHistory.length === 0 ? 'bg-slate-100 dark:bg-slate-800/50 -mx-6 px-6' : ''}">
    <Container size="lg">
      <h2 class="text-2xl font-bold text-slate-900 dark:text-white text-center mb-8">
        How It Works
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card padding="default" variant="elevated">
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 mb-4">
              <span class="text-xl font-bold">1</span>
            </div>
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              View Flashcard
            </h3>
            <p class="text-sm text-slate-600 dark:text-slate-400">
              Each card presents a key concept with visual diagrams and clear explanations to reinforce your understanding.
            </p>
          </div>
        </Card>

        <Card padding="default" variant="elevated">
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 mb-4">
              <span class="text-xl font-bold">2</span>
            </div>
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Self-Assess
            </h3>
            <p class="text-sm text-slate-600 dark:text-slate-400">
              Mark each concept as "Got It" or "Need Review" to build awareness of areas that need more attention.
            </p>
          </div>
        </Card>

        <Card padding="default" variant="elevated">
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 mb-4">
              <span class="text-xl font-bold">3</span>
            </div>
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Review Results
            </h3>
            <p class="text-sm text-slate-600 dark:text-slate-400">
              See your summary with concepts to revisit. Focus your study time on areas that need improvement.
            </p>
          </div>
        </Card>
      </div>
    </Container>
  </section>

  <!-- Tips Section -->
  <section class="py-12">
    <Container size="default">
      <Card padding="lg" variant="outlined">
        <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Study Tips
        </h3>
        <ul class="space-y-3 text-sm text-slate-600 dark:text-slate-400">
          <li class="flex items-start gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500 mt-0.5 shrink-0">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
            <span><strong class="text-slate-700 dark:text-slate-300">Start with Mixed difficulty</strong> to get a balanced overview of all concepts before focusing on specific levels.</span>
          </li>
          <li class="flex items-start gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500 mt-0.5 shrink-0">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
            <span><strong class="text-slate-700 dark:text-slate-300">Be honest with self-assessment</strong> - marking concepts for review helps you identify knowledge gaps.</span>
          </li>
          <li class="flex items-start gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500 mt-0.5 shrink-0">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
            <span><strong class="text-slate-700 dark:text-slate-300">Review the diagrams carefully</strong> - visual understanding of causal relationships is key to the exam.</span>
          </li>
        </ul>
      </Card>
    </Container>
  </section>
</div>
