<script lang="ts">
  import type { DiagramNode } from './index';

  let {
    node,
    selected = false,
    onClick
  }: {
    node: DiagramNode;
    selected?: boolean;
    onClick?: (node: DiagramNode) => void;
  } = $props();

  // Node type to color mapping using CSS variables
  const typeColors: Record<DiagramNode['type'], string> = {
    treatment: 'var(--color-treatment)',
    control: 'var(--color-control)',
    confounder: 'var(--color-confounder)',
    outcome: 'var(--color-outcome)',
    variable: 'var(--color-arrow)'
  };

  const nodeRadius = 20;
  const color = $derived(typeColors[node.type]);
</script>

<g
  transform="translate({node.x}, {node.y})"
  class="cursor-pointer outline-none"
  onclick={() => onClick?.(node)}
  onkeydown={(e) => e.key === 'Enter' && onClick?.(node)}
  role="button"
  tabindex="0"
  aria-label="{node.label} ({node.type})"
  style="outline: none;"
>
  <!-- Node circle -->
  <circle
    r={nodeRadius}
    fill={color}
    fill-opacity="0.2"
    stroke={color}
    stroke-width={selected ? 3 : 2}
    class="transition-all duration-200"
  />

  <!-- Node label (below circle) -->
  <text
    y={nodeRadius + 14}
    text-anchor="middle"
    class="pointer-events-none fill-slate-700 dark:fill-slate-300"
    style="font-size: 11px; font-weight: 500;"
  >
    {node.label}
  </text>
</g>
