<script lang="ts">
  import type { DiagramEdge, DiagramNode } from './index';

  let {
    edge,
    sourceNode,
    targetNode,
    selected = false,
    onClick
  }: {
    edge: DiagramEdge;
    sourceNode: DiagramNode;
    targetNode: DiagramNode;
    selected?: boolean;
    onClick?: (edge: DiagramEdge) => void;
  } = $props();

  const nodeRadius = 20;
  const arrowSize = 10;

  // Calculate edge path with offset from node centers
  const dx = $derived(targetNode.x - sourceNode.x);
  const dy = $derived(targetNode.y - sourceNode.y);
  const length = $derived(Math.sqrt(dx * dx + dy * dy));
  const unitX = $derived(length > 0 ? dx / length : 0);
  const unitY = $derived(length > 0 ? dy / length : 0);

  // Start and end points (offset by node radius)
  const startX = $derived(sourceNode.x + unitX * nodeRadius);
  const startY = $derived(sourceNode.y + unitY * nodeRadius);
  const endX = $derived(targetNode.x - unitX * (nodeRadius + arrowSize));
  const endY = $derived(targetNode.y - unitY * (nodeRadius + arrowSize));

  // Midpoint for label placement
  const midX = $derived((startX + endX) / 2);
  const midY = $derived((startY + endY) / 2);

  // Arrow marker ID (unique per edge)
  const markerId = $derived(`arrow-${edge.id}`);

  const strokeStyle = $derived(edge.style === 'dashed' ? '8 4' : 'none');
</script>

<g
  class="cursor-pointer outline-none"
  onclick={() => onClick?.(edge)}
  onkeydown={(e) => e.key === 'Enter' && onClick?.(edge)}
  role="button"
  tabindex="-1"
  aria-label="Edge from {sourceNode.label} to {targetNode.label}"
  style="outline: none;"
>
  <!-- Arrow marker definition -->
  <defs>
    <marker
      id={markerId}
      viewBox="0 0 10 10"
      refX="9"
      refY="5"
      markerWidth={arrowSize}
      markerHeight={arrowSize}
      orient="auto-start-reverse"
    >
      <path
        d="M 0 0 L 10 5 L 0 10 z"
        fill="var(--color-arrow)"
        class={selected ? 'fill-blue-500' : ''}
      />
    </marker>
  </defs>

  <!-- Edge line -->
  <line
    x1={startX}
    y1={startY}
    x2={endX}
    y2={endY}
    stroke="var(--color-arrow)"
    stroke-width={selected ? 3 : 2}
    stroke-dasharray={strokeStyle}
    marker-end="url(#{markerId})"
    class="transition-all duration-200"
  />

  <!-- Edge label (if provided) -->
  {#if edge.label}
    <text
      x={midX}
      y={midY - 10}
      text-anchor="middle"
      class="text-xs fill-slate-600 dark:fill-slate-400 pointer-events-none"
    >
      {edge.label}
    </text>
  {/if}

  <!-- Invisible wider hitbox for easier clicking -->
  <line
    x1={startX}
    y1={startY}
    x2={endX}
    y2={endY}
    stroke="transparent"
    stroke-width="15"
  />
</g>
