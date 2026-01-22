<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { fly } from 'svelte/transition';
  import { Container, Card, Button } from '$lib/components/ui';
  import { Flashcard, QuizNav } from '$lib/components/exam';
  import { getQuestionsByModule, selectQuestions } from '$lib/exam';
  import {
    quizState,
    startQuiz,
    recordAnswer,
    nextQuestion,
    previousQuestion,
    type QuizAnswer
  } from '$lib/exam/store';
  import type { Question } from '$lib/exam/types';

  interface Props {
    data: {
      length: number;
      difficulty: string;
      moduleId: string;
    };
  }

  let { data }: Props = $props();

  // Local state
  let isFlipped = $state(false);
  let isInitialized = $state(false);
  let currentQuestion = $state<Question | null>(null);

  // Subscribe to quiz state
  let questions = $state<Question[]>([]);
  let currentIndex = $state(0);
  let answers = $state<Map<string, QuizAnswer>>(new Map());

  // Subscribe to store changes
  $effect(() => {
    const unsubscribe = quizState.subscribe((state) => {
      questions = state.questions;
      currentIndex = state.currentIndex;
      answers = state.answers;
      currentQuestion = state.questions[state.currentIndex] || null;
    });

    return unsubscribe;
  });

  // Initialize quiz on mount
  onMount(() => {
    // Select questions based on URL params
    const difficulty = data.difficulty as 'easy' | 'medium' | 'hard' | 'mixed';
    const moduleQuestions = getQuestionsByModule(data.moduleId);
    const selectedQuestions = selectQuestions(data.length, difficulty, moduleQuestions);

    // Check if we have questions
    if (selectedQuestions.length === 0) {
      // Redirect to exam-prep if no questions selected
      goto('/exam-prep');
      return;
    }

    // Start the quiz with selected questions
    startQuiz(selectedQuestions);
    isInitialized = true;
  });

  // Reset flip state when changing questions
  $effect(() => {
    // Reset isFlipped when currentIndex changes
    if (isInitialized) {
      isFlipped = false;
    }
  });

  // Handlers
  function handleFlip() {
    isFlipped = !isFlipped;
  }

  function handlePrev() {
    previousQuestion();
    isFlipped = false;
  }

  function handleNext() {
    nextQuestion();
    isFlipped = false;
  }

  function handleAnswer(answer: QuizAnswer) {
    if (currentQuestion) {
      recordAnswer(currentQuestion.id, answer);

      // Auto-advance to next question or finish
      if (currentIndex < questions.length - 1) {
        handleNext();
      } else {
        // All questions answered, check if quiz is complete
        handleFinish();
      }
    }
  }

  function handleFinish() {
    // Navigate to results page
    goto('/exam-prep/results');
  }

  // Check if all questions have been answered
  const allAnswered = $derived(
    questions.length > 0 && answers.size === questions.length
  );
</script>

<svelte:head>
  <title>Quiz | Exam Prep | iMBA Marketing Analytics</title>
</svelte:head>

{#if !isInitialized}
  <!-- Loading State -->
  <div class="min-h-[60vh] flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p class="text-slate-600 dark:text-slate-400">Loading quiz...</p>
    </div>
  </div>
{:else if currentQuestion}
  <div transition:fly={{ y: 20, duration: 300 }}>
    <!-- Header -->
    <div class="bg-gradient-to-r from-blue-600 to-indigo-600 -mx-6 -mt-6 px-6 py-8 mb-8">
      <Container size="default">
        <div class="text-center text-white">
          <h1 class="text-2xl md:text-3xl font-bold mb-2">
            Flashcard Quiz
          </h1>
          <p class="text-blue-100">
            {data.length} questions
            {#if data.difficulty !== 'mixed'}
              - {data.difficulty.charAt(0).toUpperCase() + data.difficulty.slice(1)} difficulty
            {:else}
              - Mixed difficulty
            {/if}
          </p>
        </div>
      </Container>
    </div>

    <Container size="default">
      <!-- Flashcard -->
      <div class="mb-8">
        <Flashcard
          question={currentQuestion}
          {isFlipped}
          onFlip={handleFlip}
        />
      </div>

      <!-- Navigation -->
      <Card padding="lg" variant="default">
        <QuizNav
          {currentIndex}
          totalQuestions={questions.length}
          {isFlipped}
          onPrev={handlePrev}
          onNext={handleNext}
          onFlip={handleFlip}
          onAnswer={handleAnswer}
        />

        <!-- Finish Button (when all answered or user wants to finish early) -->
        {#if allAnswered || answers.size > 0}
          <div class="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 text-center">
            <Button
              variant="primary"
              size="lg"
              onclick={handleFinish}
            >
              <span class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                {allAnswered ? 'View Results' : `Finish Quiz (${answers.size}/${questions.length} answered)`}
              </span>
            </Button>
          </div>
        {/if}
      </Card>

      <!-- Answer Status -->
      <div class="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
        {#if answers.has(currentQuestion.id)}
          {@const answer = answers.get(currentQuestion.id)}
          <span class="inline-flex items-center gap-2">
            {#if answer === 'got-it'}
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              You marked this as "Got it"
            {:else}
              <span class="w-2 h-2 rounded-full bg-amber-500"></span>
              You marked this for review
            {/if}
          </span>
        {:else}
          <span class="text-slate-400 dark:text-slate-500">
            Not yet answered
          </span>
        {/if}
      </div>
    </Container>
  </div>
{:else}
  <!-- No Questions State -->
  <div class="min-h-[60vh] flex items-center justify-center">
    <Card padding="lg" variant="default" class="text-center max-w-md">
      <div class="mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto text-slate-400">
          <circle cx="12" cy="12" r="10"/>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
          <path d="M12 17h.01"/>
        </svg>
      </div>
      <h2 class="text-xl font-semibold text-slate-900 dark:text-white mb-2">
        No Questions Available
      </h2>
      <p class="text-slate-600 dark:text-slate-400 mb-4">
        No questions match your selected criteria. Please go back and try different settings.
      </p>
      <Button variant="primary" onclick={() => goto('/exam-prep')}>
        Back to Exam Prep
      </Button>
    </Card>
  </div>
{/if}
