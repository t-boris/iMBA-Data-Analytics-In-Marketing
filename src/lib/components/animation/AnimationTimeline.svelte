<script lang="ts">
  import { onMount, setContext } from 'svelte';
  import { gsap } from 'gsap';
  import type { Snippet } from 'svelte';
  import type { AnimationStep, AnimationState } from './index';

  let {
    steps,
    autoPlay = false,
    loop = false,
    children
  }: {
    steps: AnimationStep[];
    autoPlay?: boolean;
    loop?: boolean;
    children?: Snippet;
  } = $props();

  // Timeline and state
  let timeline: gsap.core.Timeline | null = $state(null);
  let animationState = $state<AnimationState>({
    playing: false,
    currentStep: 0,
    totalSteps: steps.length,
    progress: 0
  });

  // Create timeline on mount
  onMount(() => {
    timeline = gsap.timeline({
      paused: !autoPlay,
      repeat: loop ? -1 : 0,
      onUpdate: () => {
        if (timeline) {
          animationState = {
            ...animationState,
            progress: timeline.progress(),
            currentStep: calculateCurrentStep()
          };
        }
      },
      onComplete: () => {
        if (!loop) {
          animationState = { ...animationState, playing: false };
        }
      }
    });

    // Build timeline from steps
    steps.forEach((step, index) => {
      timeline!.addLabel(`step-${index}`);
      step.animation(timeline!);
    });

    // Auto play if requested
    if (autoPlay) {
      animationState = { ...animationState, playing: true };
    }

    return () => {
      timeline?.kill();
    };
  });

  // Calculate current step based on timeline progress
  function calculateCurrentStep(): number {
    if (!timeline) return 0;

    const currentTime = timeline.time();
    let currentStep = 0;

    for (let i = 0; i < steps.length; i++) {
      const labelTime = timeline.labels[`step-${i}`];
      if (labelTime !== undefined && labelTime <= currentTime) {
        currentStep = i;
      }
    }

    return currentStep;
  }

  // Playback controls
  function play() {
    if (timeline) {
      timeline.play();
      animationState = { ...animationState, playing: true };
    }
  }

  function pause() {
    if (timeline) {
      timeline.pause();
      animationState = { ...animationState, playing: false };
    }
  }

  function togglePlayPause() {
    if (animationState.playing) {
      pause();
    } else {
      play();
    }
  }

  function goToStep(stepIndex: number) {
    if (timeline && stepIndex >= 0 && stepIndex < steps.length) {
      timeline.seek(`step-${stepIndex}`);
      animationState = {
        ...animationState,
        currentStep: stepIndex
      };
    }
  }

  function nextStep() {
    const next = Math.min(animationState.currentStep + 1, steps.length - 1);
    goToStep(next);
  }

  function prevStep() {
    const prev = Math.max(animationState.currentStep - 1, 0);
    goToStep(prev);
  }

  function restart() {
    goToStep(0);
  }

  // Expose controls via context for child components
  const controls = {
    get state() { return animationState; },
    play,
    pause,
    togglePlayPause,
    goToStep,
    nextStep,
    prevStep,
    restart,
    steps
  };

  setContext('animation-controls', controls);
</script>

<div class="animation-timeline">
  {#if children}
    {@render children()}
  {/if}
</div>

<style>
  .animation-timeline {
    width: 100%;
  }
</style>
