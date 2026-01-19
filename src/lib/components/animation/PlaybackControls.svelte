<script lang="ts">
  import { getContext, onMount } from 'svelte';
  import type { AnimationStep, AnimationState } from './index';

  // Get controls from parent AnimationTimeline context
  const controls = getContext<{
    state: AnimationState;
    play: () => void;
    pause: () => void;
    togglePlayPause: () => void;
    goToStep: (index: number) => void;
    nextStep: () => void;
    prevStep: () => void;
    restart: () => void;
    steps: AnimationStep[];
  }>('animation-controls');

  let {
    showStepIndicator = true,
    showProgressBar = true,
    compact = false,
    class: className = ''
  }: {
    showStepIndicator?: boolean;
    showProgressBar?: boolean;
    compact?: boolean;
    class?: string;
  } = $props();

  // Keyboard navigation
  function handleKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case ' ':
        event.preventDefault();
        controls.togglePlayPause();
        break;
      case 'ArrowRight':
        event.preventDefault();
        controls.nextStep();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        controls.prevStep();
        break;
      case 'Home':
        event.preventDefault();
        controls.goToStep(0);
        break;
      case 'End':
        event.preventDefault();
        controls.goToStep(controls.steps.length - 1);
        break;
    }
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeydown);

    // Return cleanup function for when component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  });

  // Derived values
  let state = $derived(controls.state);
  let currentStepLabel = $derived(
    controls.steps[state.currentStep]?.label ?? `Step ${state.currentStep + 1}`
  );
  let isFirstStep = $derived(state.currentStep === 0);
  let isLastStep = $derived(state.currentStep === state.totalSteps - 1);
</script>

<div
  class="playback-controls bg-slate-100 dark:bg-slate-800 rounded-lg {compact ? 'p-2' : 'p-4'} {className}"
  role="group"
  aria-label="Animation playback controls"
>
  <!-- Progress bar -->
  {#if showProgressBar}
    <div class="progress-container mb-3">
      <div class="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          class="h-full bg-blue-600 rounded-full transition-all duration-100"
          style="width: {state.progress * 100}%"
        ></div>
      </div>
      <!-- Step markers -->
      <div class="relative h-0">
        {#each controls.steps as _, index}
          <button
            class="absolute top-[-8px] w-4 h-4 rounded-full border-2 transition-colors
              {index <= state.currentStep
                ? 'bg-blue-600 border-blue-600'
                : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600'}
              hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            style="left: calc({(index / (controls.steps.length - 1 || 1)) * 100}% - 8px)"
            onclick={() => controls.goToStep(index)}
            aria-label="Go to step {index + 1}"
          ></button>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Controls row -->
  <div class="flex items-center justify-between gap-4">
    <!-- Step indicator -->
    {#if showStepIndicator}
      <div class="text-sm text-slate-600 dark:text-slate-400 min-w-24">
        Step {state.currentStep + 1} of {state.totalSteps}
      </div>
    {/if}

    <!-- Playback buttons -->
    <div class="flex items-center gap-2">
      <!-- Previous step -->
      <button
        class="w-10 h-10 rounded-lg flex items-center justify-center transition-colors
          text-slate-600 dark:text-slate-400
          hover:bg-slate-200 dark:hover:bg-slate-700
          disabled:opacity-50 disabled:cursor-not-allowed
          focus:outline-none focus:ring-2 focus:ring-blue-500"
        onclick={() => controls.prevStep()}
        disabled={isFirstStep}
        aria-label="Previous step"
        title="Previous step (Left arrow)"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <!-- Play/Pause -->
      <button
        class="w-12 h-12 rounded-full flex items-center justify-center transition-colors
          bg-blue-600 hover:bg-blue-700 text-white
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onclick={() => controls.togglePlayPause()}
        aria-label={state.playing ? 'Pause' : 'Play'}
        title="{state.playing ? 'Pause' : 'Play'} (Space)"
      >
        {#if state.playing}
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        {:else}
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        {/if}
      </button>

      <!-- Next step -->
      <button
        class="w-10 h-10 rounded-lg flex items-center justify-center transition-colors
          text-slate-600 dark:text-slate-400
          hover:bg-slate-200 dark:hover:bg-slate-700
          disabled:opacity-50 disabled:cursor-not-allowed
          focus:outline-none focus:ring-2 focus:ring-blue-500"
        onclick={() => controls.nextStep()}
        disabled={isLastStep}
        aria-label="Next step"
        title="Next step (Right arrow)"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- Restart -->
      <button
        class="w-10 h-10 rounded-lg flex items-center justify-center transition-colors
          text-slate-600 dark:text-slate-400
          hover:bg-slate-200 dark:hover:bg-slate-700
          focus:outline-none focus:ring-2 focus:ring-blue-500"
        onclick={() => controls.restart()}
        aria-label="Restart"
        title="Restart (Home)"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
    </div>

    <!-- Current step label -->
    {#if showStepIndicator}
      <div class="text-sm font-medium text-slate-700 dark:text-slate-300 min-w-24 text-right truncate">
        {currentStepLabel}
      </div>
    {/if}
  </div>

  <!-- Keyboard hint -->
  <div class="mt-3 text-xs text-slate-500 dark:text-slate-500 text-center">
    <span class="inline-flex items-center gap-1">
      <kbd class="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-[10px]">Space</kbd>
      <span>play/pause</span>
    </span>
    <span class="mx-2">|</span>
    <span class="inline-flex items-center gap-1">
      <kbd class="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-[10px]">←</kbd>
      <kbd class="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-[10px]">→</kbd>
      <span>step</span>
    </span>
  </div>
</div>
