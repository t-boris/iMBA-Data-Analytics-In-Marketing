<script lang="ts">
  import { goto } from '$app/navigation';
  import { Button, Progress } from '$lib/components/ui';

  interface Props {
    currentIndex: number;
    totalQuestions: number;
    isFlipped: boolean;
    onPrev: () => void;
    onNext: () => void;
    onFlip: () => void;
    onAnswer: (answer: 'got-it' | 'need-review') => void;
  }

  let {
    currentIndex,
    totalQuestions,
    isFlipped,
    onPrev,
    onNext,
    onFlip,
    onAnswer
  }: Props = $props();

  // Derived values
  const progressPercent = $derived(((currentIndex + 1) / totalQuestions) * 100);
  const isFirst = $derived(currentIndex === 0);
  const isLast = $derived(currentIndex === totalQuestions - 1);

  // Handle exit navigation
  function handleExit() {
    goto('/exam-prep');
  }
</script>

<div class="quiz-nav space-y-4">
  <!-- Progress Section -->
  <div class="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 mb-2">
    <span class="font-medium">Card {currentIndex + 1} of {totalQuestions}</span>
    <span>{Math.round(progressPercent)}% complete</span>
  </div>

  <Progress value={progressPercent} max={100} size="sm" />

  <!-- Navigation Controls -->
  <div class="flex flex-col sm:flex-row items-center gap-3 pt-4">
    <!-- Previous Button -->
    <Button
      variant="outline"
      size="default"
      onclick={onPrev}
      disabled={isFirst}
      class="w-full sm:w-auto"
    >
      <span class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        Previous
      </span>
    </Button>

    <!-- Flip Button -->
    <Button
      variant="secondary"
      size="default"
      onclick={onFlip}
      class="w-full sm:w-auto"
    >
      <span class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 1l4 4-4 4"/>
          <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
          <path d="M7 23l-4-4 4-4"/>
          <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
        </svg>
        {isFlipped ? 'Show Question' : 'Flip Card'}
      </span>
    </Button>

    <!-- Next Button -->
    <Button
      variant="outline"
      size="default"
      onclick={onNext}
      disabled={isLast}
      class="w-full sm:w-auto"
    >
      <span class="flex items-center gap-2">
        Next
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </span>
    </Button>
  </div>

  <!-- Self-Assessment Buttons (shown when flipped) -->
  {#if isFlipped}
    <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
      <span class="text-sm text-slate-600 dark:text-slate-400 mb-2 sm:mb-0 sm:mr-2">
        How did you do?
      </span>
      <div class="flex gap-3 w-full sm:w-auto">
        <Button
          variant="outline"
          size="default"
          onclick={() => onAnswer('got-it')}
          class="flex-1 sm:flex-none border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-400 dark:hover:bg-emerald-900/20"
        >
          <span class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 6 9 17l-5-5"/>
            </svg>
            Got it
          </span>
        </Button>
        <Button
          variant="outline"
          size="default"
          onclick={() => onAnswer('need-review')}
          class="flex-1 sm:flex-none border-amber-300 text-amber-700 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-400 dark:hover:bg-amber-900/20"
        >
          <span class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
              <path d="M21 3v5h-5"/>
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
              <path d="M8 16H3v5"/>
            </svg>
            Need Review
          </span>
        </Button>
      </div>
    </div>
  {/if}

  <!-- Exit Button -->
  <div class="flex justify-center pt-4">
    <Button
      variant="ghost"
      size="sm"
      onclick={handleExit}
      class="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
    >
      <span class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <polyline points="16 17 21 12 16 7"/>
          <line x1="21" x2="9" y1="12" y2="12"/>
        </svg>
        Exit Quiz
      </span>
    </Button>
  </div>
</div>
