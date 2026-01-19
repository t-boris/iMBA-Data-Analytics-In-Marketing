<script lang="ts">
  import { DiagramCanvas, getNodeById } from '$lib/components/diagrams';
  import type { DiagramData, DiagramNode, DiagramEdge } from '$lib/components/diagrams';
  import type { AnimationSequence, SequenceStep } from './index';
  import AnimatedNode from './AnimatedNode.svelte';
  import AnimatedEdge from './AnimatedEdge.svelte';
  import { onMount } from 'svelte';

  let {
    data,
    sequence,
    width = 500,
    height = 280,
    zoomable = false,
    title,
    description,
    autoPlay = false,
    onNodeClick,
    onEdgeClick,
    selectedNodeId,
    selectedEdgeId,
    class: className = ''
  }: {
    data: DiagramData;
    sequence?: AnimationSequence;
    width?: number;
    height?: number;
    zoomable?: boolean;
    title?: string;
    description?: string;
    autoPlay?: boolean;
    onNodeClick?: (node: DiagramNode) => void;
    onEdgeClick?: (edge: DiagramEdge) => void;
    selectedNodeId?: string;
    selectedEdgeId?: string;
    class?: string;
  } = $props();

  // Track visibility state for each element
  let visibleNodes = $state<Set<string>>(new Set());
  let visibleEdges = $state<Set<string>>(new Set());
  let highlightedNodes = $state<Set<string>>(new Set());
  let highlightedEdges = $state<Set<string>>(new Set());

  // Animation delays for staggering
  let nodeDelays = $state<Record<string, number>>({});
  let edgeDelays = $state<Record<string, number>>({});

  // Animation types per element
  let nodeAnimations = $state<Record<string, 'fadeIn' | 'scaleIn' | 'none'>>({});
  let edgeAnimations = $state<Record<string, 'draw' | 'fadeIn' | 'none'>>({});

  // Generate default sequence if none provided
  function generateDefaultSequence(): AnimationSequence {
    const steps: SequenceStep[] = [];

    // Step 1: All nodes appear
    if (data.nodes.length > 0) {
      steps.push({
        targets: data.nodes.map(n => n.id),
        animation: 'scaleIn',
        duration: 0.5,
        stagger: 0.15
      });
    }

    // Step 2: All edges draw
    if (data.edges.length > 0) {
      steps.push({
        targets: data.edges.map(e => e.id),
        animation: 'draw',
        duration: 0.6,
        stagger: 0.2
      });
    }

    return { steps };
  }

  // Process sequence and set up animation state
  function processSequence(seq: AnimationSequence) {
    let cumulativeDelay = 0;
    const newNodeDelays: Record<string, number> = {};
    const newEdgeDelays: Record<string, number> = {};
    const newNodeAnimations: Record<string, 'fadeIn' | 'scaleIn' | 'none'> = {};
    const newEdgeAnimations: Record<string, 'draw' | 'fadeIn' | 'none'> = {};
    const newVisibleNodes = new Set<string>();
    const newVisibleEdges = new Set<string>();

    for (const step of seq.steps) {
      const stepDuration = step.duration ?? 0.5;
      const stagger = step.stagger ?? 0;

      step.targets.forEach((targetId, index) => {
        const delay = cumulativeDelay + (index * stagger);

        // Check if target is a node or edge
        const isNode = data.nodes.some(n => n.id === targetId);
        const isEdge = data.edges.some(e => e.id === targetId);

        if (isNode) {
          newNodeDelays[targetId] = delay;
          newVisibleNodes.add(targetId);

          if (step.animation === 'fadeIn' || step.animation === 'scaleIn') {
            newNodeAnimations[targetId] = step.animation;
          } else if (step.animation === 'highlight') {
            // For highlight, show immediately
            newNodeAnimations[targetId] = 'none';
          }
        }

        if (isEdge) {
          newEdgeDelays[targetId] = delay;
          newVisibleEdges.add(targetId);

          if (step.animation === 'draw' || step.animation === 'fadeIn') {
            newEdgeAnimations[targetId] = step.animation;
          } else if (step.animation === 'highlight') {
            newEdgeAnimations[targetId] = 'none';
          }
        }
      });

      // Add step duration to cumulative delay
      cumulativeDelay += stepDuration + (step.targets.length * stagger);
    }

    nodeDelays = newNodeDelays;
    edgeDelays = newEdgeDelays;
    nodeAnimations = newNodeAnimations;
    edgeAnimations = newEdgeAnimations;
    visibleNodes = newVisibleNodes;
    visibleEdges = newVisibleEdges;
  }

  // Initialize with default or provided sequence
  onMount(() => {
    const seq = sequence ?? generateDefaultSequence();

    if (autoPlay) {
      processSequence(seq);
    } else {
      // Show all elements immediately without animation
      visibleNodes = new Set(data.nodes.map(n => n.id));
      visibleEdges = new Set(data.edges.map(e => e.id));

      // No animations
      data.nodes.forEach(n => {
        nodeAnimations[n.id] = 'none';
        nodeDelays[n.id] = 0;
      });
      data.edges.forEach(e => {
        edgeAnimations[e.id] = 'none';
        edgeDelays[e.id] = 0;
      });
    }
  });

  // Expose method to play the sequence
  export function play() {
    // Reset state
    visibleNodes = new Set();
    visibleEdges = new Set();
    highlightedNodes = new Set();
    highlightedEdges = new Set();

    // Small delay to ensure reset, then process
    setTimeout(() => {
      const seq = sequence ?? generateDefaultSequence();
      processSequence(seq);
    }, 50);
  }

  // Expose method to reset (show all without animation)
  export function reset() {
    visibleNodes = new Set(data.nodes.map(n => n.id));
    visibleEdges = new Set(data.edges.map(e => e.id));
    highlightedNodes = new Set();
    highlightedEdges = new Set();

    data.nodes.forEach(n => {
      nodeAnimations[n.id] = 'none';
      nodeDelays[n.id] = 0;
    });
    data.edges.forEach(e => {
      edgeAnimations[e.id] = 'none';
      edgeDelays[e.id] = 0;
    });
  }

  // Expose method to highlight specific elements
  export function highlightElements(nodeIds: string[], edgeIds: string[]) {
    highlightedNodes = new Set(nodeIds);
    highlightedEdges = new Set(edgeIds);
  }

  // Expose method to clear highlights
  export function clearHighlights() {
    highlightedNodes = new Set();
    highlightedEdges = new Set();
  }
</script>

<figure class="diagram-figure {className}">
  {#if title}
    <figcaption class="text-center mb-2">
      <span class="font-semibold text-slate-900 dark:text-white">{title}</span>
      {#if description}
        <p class="text-sm text-slate-600 dark:text-slate-400">{description}</p>
      {/if}
    </figcaption>
  {/if}

  <DiagramCanvas {width} {height} {zoomable}>
    <!-- Render edges first (below nodes) -->
    {#each data.edges as edge (edge.id)}
      {@const sourceNode = getNodeById(data.nodes, edge.source)}
      {@const targetNode = getNodeById(data.nodes, edge.target)}
      {#if sourceNode && targetNode && visibleEdges.has(edge.id)}
        <AnimatedEdge
          {edge}
          {sourceNode}
          {targetNode}
          animate={edgeAnimations[edge.id] ?? 'none'}
          delay={edgeDelays[edge.id] ?? 0}
          highlight={highlightedEdges.has(edge.id)}
          selected={selectedEdgeId === edge.id}
          onClick={onEdgeClick}
        />
      {/if}
    {/each}

    <!-- Render nodes on top -->
    {#each data.nodes as node (node.id)}
      {#if visibleNodes.has(node.id)}
        <AnimatedNode
          {node}
          animate={nodeAnimations[node.id] ?? 'none'}
          delay={nodeDelays[node.id] ?? 0}
          highlight={highlightedNodes.has(node.id)}
          selected={selectedNodeId === node.id}
          onClick={onNodeClick}
        />
      {/if}
    {/each}
  </DiagramCanvas>
</figure>
