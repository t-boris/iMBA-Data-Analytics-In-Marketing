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

// Step-by-step explanation types
import type { DiagramData } from '$lib/components/diagrams';

export interface Annotation {
  targetId: string; // node/edge ID
  text: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

export interface ExplanationStep {
  id: string;
  title: string;
  description: string; // Markdown-like text
  diagram: DiagramData; // State of diagram at this step
  highlights?: string[]; // IDs to highlight
  annotations?: Annotation[];
}

export interface ExplanationConfig {
  title: string;
  steps: ExplanationStep[];
  width?: number;
  height?: number;
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
