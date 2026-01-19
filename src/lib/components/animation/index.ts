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

// Diagram animation sequence types
export interface AnimationSequence {
  steps: SequenceStep[];
}

export interface SequenceStep {
  targets: string[]; // node/edge IDs
  animation: 'fadeIn' | 'scaleIn' | 'draw' | 'highlight';
  duration?: number;
  stagger?: number;
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

// Diagram animation components
export { default as AnimatedNode } from './AnimatedNode.svelte';
export { default as AnimatedEdge } from './AnimatedEdge.svelte';
export { default as AnimatedCausalDiagram } from './AnimatedCausalDiagram.svelte';
