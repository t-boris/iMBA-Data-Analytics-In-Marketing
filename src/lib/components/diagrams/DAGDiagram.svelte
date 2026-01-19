<script lang="ts">
  import CausalDiagram from './CausalDiagram.svelte';
  import type { DiagramData, DiagramNode, DiagramEdge } from './index';

  let {
    nodes,
    edges,
    width = 600,
    height = 400,
    title = 'Directed Acyclic Graph',
    description,
    class: className = ''
  }: {
    nodes: Array<Omit<DiagramNode, 'x' | 'y'>>;
    edges: DiagramEdge[];
    width?: number;
    height?: number;
    title?: string;
    description?: string;
    class?: string;
  } = $props();

  // Simple hierarchical layout algorithm
  function layoutNodes(
    nodes: Array<Omit<DiagramNode, 'x' | 'y'>>,
    edges: DiagramEdge[],
    width: number,
    height: number
  ): DiagramNode[] {
    // Find root nodes (no incoming edges)
    const hasIncoming = new Set(edges.map(e => e.target));
    const roots = nodes.filter(n => !hasIncoming.has(n.id));

    // BFS to assign levels
    const levels = new Map<string, number>();
    const queue = roots.map(n => ({ id: n.id, level: 0 }));

    while (queue.length > 0) {
      const { id, level } = queue.shift()!;
      if (levels.has(id)) continue;
      levels.set(id, level);

      // Find children
      const children = edges.filter(e => e.source === id).map(e => e.target);
      children.forEach(childId => {
        if (!levels.has(childId)) {
          queue.push({ id: childId, level: level + 1 });
        }
      });
    }

    // Handle nodes not reached by BFS (disconnected nodes)
    nodes.forEach(n => {
      if (!levels.has(n.id)) {
        levels.set(n.id, 0);
      }
    });

    // Group by level and position
    const maxLevel = Math.max(...levels.values(), 0);
    const levelGroups = new Map<number, string[]>();

    levels.forEach((level, id) => {
      if (!levelGroups.has(level)) levelGroups.set(level, []);
      levelGroups.get(level)!.push(id);
    });

    // Calculate positions
    const padding = 60;
    const usableWidth = width - padding * 2;
    const usableHeight = height - padding * 2;

    return nodes.map(node => {
      const level = levels.get(node.id) ?? 0;
      const nodesAtLevel = levelGroups.get(level) ?? [node.id];
      const indexAtLevel = nodesAtLevel.indexOf(node.id);

      const x = padding + (usableWidth / (maxLevel + 1)) * level + (usableWidth / (maxLevel + 1)) / 2;
      const y = padding + (usableHeight / (nodesAtLevel.length + 1)) * (indexAtLevel + 1);

      return { ...node, x, y } as DiagramNode;
    });
  }

  const layoutData = $derived<DiagramData>({
    nodes: layoutNodes(nodes, edges, width, height),
    edges
  });
</script>

<CausalDiagram
  data={layoutData}
  {width}
  {height}
  {title}
  {description}
  class={className}
/>
