<script lang="ts">
  import type { ExplanationStep, Annotation } from './index';
  import type { DiagramData, DiagramNode } from '$lib/components/diagrams';
  import { DiagramCanvas, getNodeById } from '$lib/components/diagrams';
  import AnimatedNode from './AnimatedNode.svelte';
  import AnimatedEdge from './AnimatedEdge.svelte';
  import DiagramAnnotation from './DiagramAnnotation.svelte';

  let {
    title,
    steps,
    width = 500,
    height = 280,
    layout = 'horizontal',
    class: className = ''
  }: {
    title: string;
    steps: ExplanationStep[];
    width?: number;
    height?: number;
    layout?: 'horizontal' | 'vertical';
    class?: string;
  } = $props();

  // Current step index
  let currentStepIndex = $state(0);
  let isPlaying = $state(false);
  let playInterval: ReturnType<typeof setInterval> | null = null;

  // Current step derived
  let currentStep = $derived(steps[currentStepIndex]);
  let totalSteps = $derived(steps.length);
  let isFirstStep = $derived(currentStepIndex === 0);
  let isLastStep = $derived(currentStepIndex === totalSteps - 1);

  // Get current diagram data
  let currentDiagram = $derived(currentStep?.diagram);

  // Navigation functions
  function goToStep(index: number) {
    if (index >= 0 && index < totalSteps) {
      currentStepIndex = index;
    }
  }

  function nextStep() {
    if (!isLastStep) {
      currentStepIndex++;
    } else {
      // Loop back to start
      currentStepIndex = 0;
    }
  }

  function prevStep() {
    if (!isFirstStep) {
      currentStepIndex--;
    }
  }

  function togglePlay() {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }

  function play() {
    isPlaying = true;
    playInterval = setInterval(() => {
      if (isLastStep) {
        pause();
      } else {
        nextStep();
      }
    }, 3000); // 3 seconds per step
  }

  function pause() {
    isPlaying = false;
    if (playInterval) {
      clearInterval(playInterval);
      playInterval = null;
    }
  }

  function restart() {
    pause();
    currentStepIndex = 0;
  }

  // Keyboard navigation
  function handleKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case ' ':
        event.preventDefault();
        togglePlay();
        break;
      case 'ArrowRight':
        event.preventDefault();
        nextStep();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        prevStep();
        break;
      case 'Home':
        event.preventDefault();
        goToStep(0);
        break;
      case 'End':
        event.preventDefault();
        goToStep(totalSteps - 1);
        break;
    }
  }

  // Check if element should be highlighted
  function isHighlighted(id: string): boolean {
    return currentStep?.highlights?.includes(id) ?? false;
  }

  // Find node position for annotations
  function getNodePosition(nodeId: string): { x: number; y: number } | null {
    if (!currentDiagram) return null;
    const node = getNodeById(currentDiagram.nodes, nodeId);
    return node ? { x: node.x, y: node.y } : null;
  }

  // Get edge midpoint for annotations targeting edges
  function getEdgeMidpoint(edgeId: string): { x: number; y: number } | null {
    if (!currentDiagram) return null;
    const edge = currentDiagram.edges.find(e => e.id === edgeId);
    if (!edge) return null;

    const sourceNode = getNodeById(currentDiagram.nodes, edge.source);
    const targetNode = getNodeById(currentDiagram.nodes, edge.target);
    if (!sourceNode || !targetNode) return null;

    return {
      x: (sourceNode.x + targetNode.x) / 2,
      y: (sourceNode.y + targetNode.y) / 2
    };
  }

  // Get annotation position
  function getAnnotationPosition(annotation: Annotation): { x: number; y: number } | null {
    // Check if target is a node
    const nodePos = getNodePosition(annotation.targetId);
    if (nodePos) return nodePos;

    // Check if target is an edge
    return getEdgeMidpoint(annotation.targetId);
  }

  // Cleanup on unmount
  import { onMount } from 'svelte';

  onMount(() => {
    return () => {
      if (playInterval) {
        clearInterval(playInterval);
      }
    };
  });
</script>

<svelte:window onkeydown={handleKeydown} />

<div
  class="step-explanation bg-white dark:bg-slate-900 rounded-xl shadow-lg overflow-hidden {className}"
  class:flex-row={layout === 'horizontal'}
  class:flex-col={layout === 'vertical'}
>
  <!-- Header -->
  <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
    <h2 class="text-xl font-bold text-slate-900 dark:text-white">{title}</h2>
    <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
      Step {currentStepIndex + 1} of {totalSteps}
    </p>
  </div>

  <!-- Main content area -->
  <div
    class="flex-1 {layout === 'horizontal' ? 'flex' : ''}"
  >
    <!-- Diagram area -->
    <div
      class="diagram-area flex-shrink-0 bg-slate-50 dark:bg-slate-800 p-4 {layout === 'horizontal' ? 'border-r border-slate-200 dark:border-slate-700' : 'border-b border-slate-200 dark:border-slate-700'}"
      style="min-width: {width + 32}px; min-height: {height + 32}px;"
    >
      {#if currentDiagram}
        <div class="relative">
          <DiagramCanvas {width} {height}>
            <!-- Render edges first (below nodes) -->
            {#each currentDiagram.edges as edge (edge.id)}
              {@const sourceNode = getNodeById(currentDiagram.nodes, edge.source)}
              {@const targetNode = getNodeById(currentDiagram.nodes, edge.target)}
              {#if sourceNode && targetNode}
                <AnimatedEdge
                  {edge}
                  {sourceNode}
                  {targetNode}
                  animate="none"
                  delay={0}
                  highlight={isHighlighted(edge.id)}
                />
              {/if}
            {/each}

            <!-- Render nodes on top -->
            {#each currentDiagram.nodes as node (node.id)}
              <AnimatedNode
                {node}
                animate="none"
                delay={0}
                highlight={isHighlighted(node.id)}
              />
            {/each}
          </DiagramCanvas>

          <!-- Annotations overlay -->
          {#if currentStep?.annotations}
            {#each currentStep.annotations as annotation}
              {@const position = getAnnotationPosition(annotation)}
              {#if position}
                <DiagramAnnotation
                  text={annotation.text}
                  targetX={position.x}
                  targetY={position.y}
                  position={annotation.position}
                  canvasWidth={width}
                  canvasHeight={height}
                />
              {/if}
            {/each}
          {/if}
        </div>
      {/if}
    </div>

    <!-- Text explanation area -->
    <div class="flex-1 p-6">
      {#if currentStep}
        <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-3">
          {currentStep.title}
        </h3>
        <div class="prose prose-slate dark:prose-invert max-w-none">
          <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
            {currentStep.description}
          </p>
        </div>
      {/if}
    </div>
  </div>

  <!-- Controls footer -->
  <div class="px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
    <!-- Progress indicator -->
    <div class="flex gap-2 mb-4 justify-center">
      {#each steps as _, index}
        <button
          onclick={() => goToStep(index)}
          class="w-3 h-3 rounded-full transition-all duration-200 {
            index === currentStepIndex
              ? 'bg-blue-600 scale-125'
              : index < currentStepIndex
                ? 'bg-blue-300 dark:bg-blue-800'
                : 'bg-slate-300 dark:bg-slate-600'
          }"
          aria-label="Go to step {index + 1}"
        ></button>
      {/each}
    </div>

    <!-- Playback controls -->
    <div class="flex items-center justify-center gap-3">
      <!-- Previous step -->
      <button
        onclick={prevStep}
        disabled={isFirstStep}
        class="w-10 h-10 rounded-lg flex items-center justify-center transition-colors
          text-slate-600 dark:text-slate-400
          hover:bg-slate-200 dark:hover:bg-slate-700
          disabled:opacity-50 disabled:cursor-not-allowed
          focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Previous step"
        title="Previous step (Left arrow)"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <!-- Play/Pause -->
      <button
        onclick={togglePlay}
        class="w-12 h-12 rounded-full flex items-center justify-center transition-colors
          bg-blue-600 hover:bg-blue-700 text-white
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label={isPlaying ? 'Pause' : 'Play'}
        title="{isPlaying ? 'Pause' : 'Play'} (Space)"
      >
        {#if isPlaying}
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
        onclick={nextStep}
        class="w-10 h-10 rounded-lg flex items-center justify-center transition-colors
          text-slate-600 dark:text-slate-400
          hover:bg-slate-200 dark:hover:bg-slate-700
          focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Next step"
        title="Next step (Right arrow)"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- Restart -->
      <button
        onclick={restart}
        class="w-10 h-10 rounded-lg flex items-center justify-center transition-colors
          text-slate-600 dark:text-slate-400
          hover:bg-slate-200 dark:hover:bg-slate-700
          focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Restart"
        title="Restart (Home)"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
    </div>

    <!-- Keyboard hint -->
    <div class="mt-3 text-xs text-slate-500 dark:text-slate-500 text-center">
      <span class="inline-flex items-center gap-1">
        <kbd class="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-[10px]">Space</kbd>
        <span>play/pause</span>
      </span>
      <span class="mx-2">|</span>
      <span class="inline-flex items-center gap-1">
        <kbd class="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-[10px]">
          <span aria-hidden="true">&larr;</span>
        </kbd>
        <kbd class="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-[10px]">
          <span aria-hidden="true">&rarr;</span>
        </kbd>
        <span>step</span>
      </span>
    </div>
  </div>
</div>

<style>
  .step-explanation {
    display: flex;
    flex-direction: column;
  }

  .prose p {
    margin-bottom: 0;
  }
</style>
