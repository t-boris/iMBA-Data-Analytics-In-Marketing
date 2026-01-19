<script lang="ts">
  import { DiagramCanvas, Node, Edge, getNodeById } from './index';
  import type { DiagramData, DiagramNode, DiagramEdge } from './index';

  let {
    data,
    width = 500,
    height = 280,
    zoomable = false,
    title,
    description,
    onNodeClick,
    onEdgeClick,
    selectedNodeId,
    selectedEdgeId,
    class: className = ''
  }: {
    data: DiagramData;
    width?: number;
    height?: number;
    zoomable?: boolean;
    title?: string;
    description?: string;
    onNodeClick?: (node: DiagramNode) => void;
    onEdgeClick?: (edge: DiagramEdge) => void;
    selectedNodeId?: string;
    selectedEdgeId?: string;
    class?: string;
  } = $props();
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
      {#if sourceNode && targetNode}
        <Edge
          {edge}
          {sourceNode}
          {targetNode}
          selected={selectedEdgeId === edge.id}
          onClick={onEdgeClick}
        />
      {/if}
    {/each}

    <!-- Render nodes on top -->
    {#each data.nodes as node (node.id)}
      <Node
        {node}
        selected={selectedNodeId === node.id}
        onClick={onNodeClick}
      />
    {/each}
  </DiagramCanvas>
</figure>
