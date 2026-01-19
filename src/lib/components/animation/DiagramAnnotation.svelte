<script lang="ts">
  import { onMount } from 'svelte';

  let {
    text,
    targetX,
    targetY,
    position = 'top',
    canvasWidth = 500,
    canvasHeight = 280,
    class: className = ''
  }: {
    text: string;
    targetX: number;
    targetY: number;
    position: 'top' | 'bottom' | 'left' | 'right';
    canvasWidth?: number;
    canvasHeight?: number;
    class?: string;
  } = $props();

  // Annotation dimensions
  const annotationWidth = 160;
  const annotationHeight = 60;
  const arrowLength = 20;
  const nodeRadius = 20; // Match the node radius from AnimatedNode

  // Calculate annotation box position based on position prop
  let annotationX = $derived.by(() => {
    switch (position) {
      case 'left':
        return targetX - nodeRadius - arrowLength - annotationWidth;
      case 'right':
        return targetX + nodeRadius + arrowLength;
      case 'top':
      case 'bottom':
      default:
        return targetX - annotationWidth / 2;
    }
  });

  let annotationY = $derived.by(() => {
    switch (position) {
      case 'top':
        return targetY - nodeRadius - arrowLength - annotationHeight;
      case 'bottom':
        return targetY + nodeRadius + arrowLength;
      case 'left':
      case 'right':
      default:
        return targetY - annotationHeight / 2;
    }
  });

  // Calculate arrow path
  let arrowPath = $derived.by(() => {
    const boxX = annotationX;
    const boxY = annotationY;
    const boxCenterX = boxX + annotationWidth / 2;
    const boxCenterY = boxY + annotationHeight / 2;

    switch (position) {
      case 'top':
        // Arrow points down from bottom center of box to target
        return `M ${boxCenterX} ${boxY + annotationHeight} L ${targetX} ${targetY - nodeRadius}`;
      case 'bottom':
        // Arrow points up from top center of box to target
        return `M ${boxCenterX} ${boxY} L ${targetX} ${targetY + nodeRadius}`;
      case 'left':
        // Arrow points right from right edge of box to target
        return `M ${boxX + annotationWidth} ${boxCenterY} L ${targetX - nodeRadius} ${targetY}`;
      case 'right':
        // Arrow points left from left edge of box to target
        return `M ${boxX} ${boxCenterY} L ${targetX + nodeRadius} ${targetY}`;
      default:
        return '';
    }
  });

  // Animation state
  let visible = $state(false);

  onMount(() => {
    // Fade in after a small delay for smooth entrance
    requestAnimationFrame(() => {
      visible = true;
    });
  });
</script>

<div
  class="diagram-annotation absolute pointer-events-none transition-opacity duration-300 {className}"
  class:opacity-0={!visible}
  class:opacity-100={visible}
  style="width: {canvasWidth}px; height: {canvasHeight}px; top: 0; left: 0;"
>
  <!-- SVG for the connecting arrow -->
  <svg
    class="absolute top-0 left-0"
    width={canvasWidth}
    height={canvasHeight}
    viewBox="0 0 {canvasWidth} {canvasHeight}"
  >
    <defs>
      <marker
        id="arrowhead"
        markerWidth="10"
        markerHeight="7"
        refX="10"
        refY="3.5"
        orient="auto"
      >
        <polygon
          points="0 0, 10 3.5, 0 7"
          fill="currentColor"
          class="text-blue-500"
        />
      </marker>
    </defs>
    <path
      d={arrowPath}
      stroke="currentColor"
      stroke-width="2"
      fill="none"
      marker-end="url(#arrowhead)"
      class="text-blue-500"
    />
  </svg>

  <!-- Annotation text box -->
  <div
    class="absolute bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-500 rounded-lg p-2 shadow-lg"
    style="
      left: {annotationX}px;
      top: {annotationY}px;
      width: {annotationWidth}px;
      min-height: {annotationHeight}px;
    "
  >
    <p class="text-sm text-blue-900 dark:text-blue-100 leading-tight text-center">
      {text}
    </p>
  </div>
</div>
