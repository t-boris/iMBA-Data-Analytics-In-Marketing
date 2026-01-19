// Animation types
export interface AnimationStep {
  id: string;
  label: string;
  duration: number;
  animation: (tl: gsap.core.Timeline) => void;
}

export interface AnimationState {
  playing: boolean;
  currentStep: number;
  totalSteps: number;
  progress: number;
}

// GSAP context helpers
export {
  createTimeline,
  createGsapContext,
  addStep,
  goToStep,
  getStepLabels,
  getCurrentStepIndex,
  nextStep,
  prevStep
} from './gsapContext';

// Components
export { default as AnimationTimeline } from './AnimationTimeline.svelte';
export { default as PlaybackControls } from './PlaybackControls.svelte';
