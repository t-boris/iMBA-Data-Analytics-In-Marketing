<script lang="ts">
  import { onMount } from 'svelte';

  let {
    text,
    targetX,
    targetY,
    position = 'top',
    canvasWidth = 500,
    canvasHeight = 280,
    padding = 40,
    class: className = ''
  }: {
    text: string;
    targetX: number;
    targetY: number;
    position: 'top' | 'bottom' | 'left' | 'right';
    canvasWidth?: number;
    canvasHeight?: number;
    padding?: number;
    class?: string;
  } = $props();

  // Adjust coordinates to account for canvas padding
  // Nodes are rendered inside a translate(padding, padding) transform
  const adjustedX = $derived(targetX + padding);
  const adjustedY = $derived(targetY + padding);

  // Annotation dimensions
  const annotationWidth = 160;
  const annotationHeight = 60;
  const arrowLength = 20;
  const nodeRadius = 20; // Match the node radius from AnimatedNode

  // Calculate annotation box position based on position prop
  // Use adjustedX/Y which account for canvas padding
  // Clamp to keep within canvas bounds
  let annotationX = $derived.by(() => {
    let x: number;
    switch (position) {
      case 'left':
        x = adjustedX - nodeRadius - arrowLength - annotationWidth;
        break;
      case 'right':
        x = adjustedX + nodeRadius + arrowLength;
        break;
      case 'top':
      case 'bottom':
      default:
        x = adjustedX - annotationWidth / 2;
    }
    // Clamp to canvas bounds with small margin
    return Math.max(4, Math.min(x, canvasWidth - annotationWidth - 4));
  });

  let annotationY = $derived.by(() => {
    let y: number;
    switch (position) {
      case 'top':
        y = adjustedY - nodeRadius - arrowLength - annotationHeight;
        break;
      case 'bottom':
        y = adjustedY + nodeRadius + arrowLength;
        break;
      case 'left':
      case 'right':
      default:
        y = adjustedY - annotationHeight / 2;
    }
    // Clamp to canvas bounds with small margin
    return Math.max(4, Math.min(y, canvasHeight - annotationHeight - 4));
  });

  // Calculate arrow path using adjusted coordinates
  let arrowPath = $derived.by(() => {
    const boxX = annotationX;
    const boxY = annotationY;
    const boxCenterX = boxX + annotationWidth / 2;
    const boxCenterY = boxY + annotationHeight / 2;

    switch (position) {
      case 'top':
        // Arrow points down from bottom center of box to target
        return `M ${boxCenterX} ${boxY + annotationHeight} L ${adjustedX} ${adjustedY - nodeRadius}`;
      case 'bottom':
        // Arrow points up from top center of box to target
        return `M ${boxCenterX} ${boxY} L ${adjustedX} ${adjustedY + nodeRadius}`;
      case 'left':
        // Arrow points right from right edge of box to target
        return `M ${boxX + annotationWidth} ${boxCenterY} L ${adjustedX - nodeRadius} ${adjustedY}`;
      case 'right':
        // Arrow points left from left edge of box to target
        return `M ${boxX} ${boxCenterY} L ${adjustedX + nodeRadius} ${adjustedY}`;
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
