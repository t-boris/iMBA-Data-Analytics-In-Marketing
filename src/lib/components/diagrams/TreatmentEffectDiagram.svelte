<script lang="ts">
  import CausalDiagram from './CausalDiagram.svelte';
  import type { DiagramData, DiagramNode, DiagramEdge } from './index';

  let {
    treatment = 'Treatment',
    outcome = 'Outcome',
    confounders = [] as string[],
    showDirectEffect = true,
    showConfoundingPaths = true,
    width = 500,
    height = 350,
    title,
    description,
    class: className = ''
  }: {
    treatment?: string;
    outcome?: string;
    confounders?: string[];
    showDirectEffect?: boolean;
    showConfoundingPaths?: boolean;
    width?: number;
    height?: number;
    title?: string;
    description?: string;
    class?: string;
  } = $props();

  // Build diagram data from props using $derived (expression directly, no arrow function)
  const data = $derived<DiagramData>(buildDiagramData());

  function buildDiagramData(): DiagramData {
    const padding = 60;
    const nodes: DiagramNode[] = [
      { id: 'treatment', label: treatment, type: 'treatment' as const, x: padding, y: height - padding },
      { id: 'outcome', label: outcome, type: 'outcome' as const, x: width - padding, y: height - padding }
    ];

    const edges: DiagramEdge[] = [];

    // Direct treatment effect
    if (showDirectEffect) {
      edges.push({ id: 'direct', source: 'treatment', target: 'outcome' });
    }

    // Add confounders - spread them horizontally across the top
    const numConfounders = confounders.length;
    confounders.forEach((conf, i) => {
      const confId = `conf-${i}`;
      // Spread confounders evenly across the top
      const xPos = numConfounders === 1
        ? width / 2
        : padding + ((width - 2 * padding) / (numConfounders - 1 || 1)) * i;
      const yPos = padding;

      nodes.push({
        id: confId,
        label: conf,
        type: 'confounder' as const,
        x: xPos,
        y: yPos
      });

      if (showConfoundingPaths) {
        edges.push({ id: `conf-t-${i}`, source: confId, target: 'treatment', style: 'dashed' as const });
        edges.push({ id: `conf-o-${i}`, source: confId, target: 'outcome', style: 'dashed' as const });
      }
    });

    return { nodes, edges };
  }
</script>

<CausalDiagram
  {data}
  {width}
  {height}
  title={title ?? 'Treatment Effect Diagram'}
  {description}
  class={className}
/>
