// Base components
export { default as SVGContainer } from './SVGContainer.svelte';
export { default as DiagramCanvas } from './DiagramCanvas.svelte';

// Graph primitives
export { default as Node } from './Node.svelte';
export { default as Edge } from './Edge.svelte';

// High-level diagram components
export { default as CausalDiagram } from './CausalDiagram.svelte';
export { default as DAGDiagram } from './DAGDiagram.svelte';
export { default as TreatmentEffectDiagram } from './TreatmentEffectDiagram.svelte';

// Types for diagrams
export interface DiagramNode {
  id: string;
  label: string;
  type: 'treatment' | 'control' | 'confounder' | 'outcome' | 'variable';
  x: number;
  y: number;
}

export interface DiagramEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  style?: 'solid' | 'dashed';
}

export interface DiagramData {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}

// Helper to get node by ID
export function getNodeById(nodes: DiagramNode[], id: string): DiagramNode | undefined {
  return nodes.find(n => n.id === id);
}
