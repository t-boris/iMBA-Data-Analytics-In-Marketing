<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { fly } from 'svelte/transition';
  import { get } from 'svelte/store';
  import { Container, Card, Button } from '$lib/components/ui';
  import { QuizResults, ReviewList } from '$lib/components/exam';
  import { quizState, quizConfig, startQuiz, resetQuizState, type QuizAnswer } from '$lib/exam/store';
  import { saveQuizResult } from '$lib/exam/persistence';
  import type { Question } from '$lib/exam/types';

  // Local state for the quiz results
  let questions = $state<Question[]>([]);
  let answers = $state<Map<string, QuizAnswer>>(new Map());
  let startTime = $state<number>(0);
  let endTime = $state<number>(Date.now());
  let isInitialized = $state(false);

  // Questions marked for review
  const needReviewQuestions = $derived(
    questions.filter((q) => answers.get(q.id) === 'need-review')
  );

  onMount(() => {
    // Read the quiz state
    const state = get(quizState);
    const config = get(quizConfig);

    // Check if we have valid quiz data
    if (!state.questions || state.questions.length === 0 || state.answers.size === 0) {
      // No quiz data, redirect to exam-prep
      goto('/exam-prep');
      return;
    }

    // Capture the state
    questions = state.questions;
    answers = new Map(state.answers);
    startTime = state.startTime || Date.now();
    endTime = Date.now();
    isInitialized = true;

    // Save the quiz result to localStorage
    const gotItCount = Array.from(answers.values()).filter((a) => a === 'got-it').length;
    saveQuizResult({
      date: new Date().toISOString(),
      moduleId: config.moduleId,
      totalQuestions: questions.length,
      gotItCount,
      needReviewCount: questions.length - gotItCount,
      timeSpent: Math.round((endTime - startTime) / 1000),
      difficulty: config.difficulty
    });
  });

  function handleNewQuiz() {
    resetQuizState();
    goto('/exam-prep');
  }

  function handleRetryMissed() {
    if (needReviewQuestions.length > 0) {
      // Start a new quiz with only the missed questions
      startQuiz(needReviewQuestions);
      goto('/exam-prep/quiz?length=' + needReviewQuestions.length + '&difficulty=mixed&module=module1&retry=true');
    }
  }

  function handleBackToModules() {
    resetQuizState();
    goto('/module/module1');
  }
</script>

<svelte:head>
  <title>Quiz Results | Exam Prep | iMBA Marketing Analytics</title>
</svelte:head>

{#if !isInitialized}
  <!-- Loading State -->
  <div class="min-h-[60vh] flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p class="text-slate-600 dark:text-slate-400">Loading results...</p>
    </div>
  </div>
{:else}
  <div transition:fly={{ y: 20, duration: 300 }}>
    <!-- Header -->
    <div class="bg-gradient-to-r from-blue-600 to-indigo-600 -mx-6 -mt-6 px-6 py-8 mb-8">
      <Container size="default">
        <div class="text-center text-white">
          <div class="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <h1 class="text-2xl md:text-3xl font-bold mb-2">
            Quiz Complete!
          </h1>
          <p class="text-blue-100">
            Here's how you did on this quiz session
          </p>
        </div>
      </Container>
    </div>

    <Container size="default">
      <!-- Results Summary -->
      <div class="mb-8">
        <Card padding="lg" variant="default">
          <QuizResults
            {questions}
            {answers}
            {startTime}
            {endTime}
          />
        </Card>
      </div>

      <!-- Review List -->
      <div class="mb-8">
        <ReviewList
          questions={needReviewQuestions}
          onRetryMissed={needReviewQuestions.length > 0 ? handleRetryMissed : undefined}
        />
      </div>

      <!-- Action Buttons -->
      <Card padding="lg" variant="default">
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" size="lg" onclick={handleNewQuiz}>
            <span class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 5v14"/>
                <path d="M5 12h14"/>
              </svg>
              New Quiz
            </span>
          </Button>

          {#if needReviewQuestions.length > 0}
            <Button variant="outline" size="lg" onclick={handleRetryMissed}>
              <span class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                  <path d="M21 3v5h-5"/>
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                  <path d="M8 16H3v5"/>
                </svg>
                Retry Missed Only ({needReviewQuestions.length})
              </span>
            </Button>
          {/if}

          <Button variant="secondary" size="lg" onclick={handleBackToModules}>
            <span class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 12H5"/>
                <polyline points="12 19 5 12 12 5"/>
              </svg>
              Back to Modules
            </span>
          </Button>
        </div>
      </Card>
    </Container>
  </div>
{/if}
