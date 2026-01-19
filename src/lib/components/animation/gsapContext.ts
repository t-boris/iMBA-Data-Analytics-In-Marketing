import { gsap } from 'gsap';
import { onDestroy } from 'svelte';

/**
 * Creates a GSAP timeline with automatic cleanup on Svelte component destruction.
 * Supports step-based navigation with timeline labels.
 */
export function createTimeline(options?: gsap.TimelineVars): gsap.core.Timeline {
  const tl = gsap.timeline({
    paused: true,
    ...options
  });

  // Cleanup on component destroy
  onDestroy(() => {
    tl.kill();
  });

  return tl;
}

/**
 * Creates a GSAP context for scoping animations to a specific element.
 * All animations created within the context will be properly cleaned up.
 */
export function createGsapContext(scope: Element | string): gsap.Context {
  const ctx = gsap.context(() => {}, scope);

  onDestroy(() => {
    ctx.revert();
  });

  return ctx;
}

/**
 * Adds a labeled step to a timeline.
 * Steps are used for navigation (step forward/backward).
 */
export function addStep(
  tl: gsap.core.Timeline,
  stepId: string,
  animation: (timeline: gsap.core.Timeline) => void
): void {
  // Add label at current position
  tl.addLabel(stepId);
  // Execute the animation function to add tweens
  animation(tl);
}

/**
 * Navigates timeline to a specific step by label.
 */
export function goToStep(tl: gsap.core.Timeline, stepId: string): void {
  tl.seek(stepId);
}

/**
 * Gets all step labels from a timeline.
 */
export function getStepLabels(tl: gsap.core.Timeline): string[] {
  const labels = tl.labels;
  return Object.keys(labels).sort((a, b) => labels[a] - labels[b]);
}

/**
 * Gets the current step index based on timeline progress.
 */
export function getCurrentStepIndex(tl: gsap.core.Timeline): number {
  const labels = getStepLabels(tl);
  const currentTime = tl.time();
  const labelTimes = tl.labels;

  let currentIndex = 0;
  for (let i = 0; i < labels.length; i++) {
    if (labelTimes[labels[i]] <= currentTime) {
      currentIndex = i;
    } else {
      break;
    }
  }

  return currentIndex;
}

/**
 * Navigates to the next step.
 * Returns true if navigation was successful, false if already at last step.
 */
export function nextStep(tl: gsap.core.Timeline): boolean {
  const labels = getStepLabels(tl);
  const currentIndex = getCurrentStepIndex(tl);

  if (currentIndex < labels.length - 1) {
    tl.seek(labels[currentIndex + 1]);
    return true;
  }
  return false;
}

/**
 * Navigates to the previous step.
 * Returns true if navigation was successful, false if already at first step.
 */
export function prevStep(tl: gsap.core.Timeline): boolean {
  const labels = getStepLabels(tl);
  const currentIndex = getCurrentStepIndex(tl);

  if (currentIndex > 0) {
    tl.seek(labels[currentIndex - 1]);
    return true;
  }
  return false;
}
