---
phase: 04-visualization-engine
plan: 03
status: completed
completed_at: 2026-01-19
---

# Summary: High-Level Causal Diagram Components

## What Was Built

Three high-level diagram components that compose the Node and Edge primitives into meaningful causal visualizations:

### 1. CausalDiagram.svelte
**File:** `src/lib/components/diagrams/CausalDiagram.svelte`

Generic diagram component that renders any diagram data:
- Takes `DiagramData` (nodes + edges) as input
- Optional title and description with figcaption styling
- Selection callbacks for interactivity (`onNodeClick`, `onEdgeClick`)
- Supports `selectedNodeId` and `selectedEdgeId` for highlighting
- Edges rendered below nodes for proper layering
- Optional zooming via `zoomable` prop
- Responsive with customizable width/height

### 2. DAGDiagram.svelte
**File:** `src/lib/components/diagrams/DAGDiagram.svelte`

Directed Acyclic Graph diagram with automatic hierarchical layout:
- Takes nodes without x/y positions
- Automatically calculates node positions based on graph structure
- BFS-based level assignment (left-to-right layout)
- Handles multiple root nodes
- Handles disconnected nodes
- Composes CausalDiagram internally

**Layout Algorithm:**
- Identifies root nodes (no incoming edges)
- BFS traversal to assign levels
- Groups nodes by level for vertical distribution
- Positions nodes with padding and spacing

### 3. TreatmentEffectDiagram.svelte
**File:** `src/lib/components/diagrams/TreatmentEffectDiagram.svelte`

Pre-configured diagram for treatment effect visualization:
- Customizable treatment and outcome labels
- Multiple confounders support with dashed arrows
- Toggle direct effect path (`showDirectEffect`)
- Toggle confounding paths (`showConfoundingPaths`)
- Fixed layout optimized for educational presentation
- Treatment on left, outcome on right, confounders above

## Files Modified

| File | Change |
|------|--------|
| `src/lib/components/diagrams/CausalDiagram.svelte` | Created - generic diagram component |
| `src/lib/components/diagrams/DAGDiagram.svelte` | Created - DAG with auto-layout |
| `src/lib/components/diagrams/TreatmentEffectDiagram.svelte` | Created - treatment effect preset |
| `src/lib/components/diagrams/index.ts` | Updated - added exports for all new components |

## Verification

- [x] `npm run dev` starts without errors
- [x] `npm run build` succeeds
- [x] All components use Svelte 5 runes syntax ($props, $derived)
- [x] Barrel exports updated with all new components

## Usage Examples

### CausalDiagram - Generic
```svelte
<script>
  import { CausalDiagram } from '$lib/components/diagrams';

  const data = {
    nodes: [
      { id: 'x', label: 'X', type: 'variable', x: 100, y: 100 },
      { id: 'y', label: 'Y', type: 'outcome', x: 300, y: 100 }
    ],
    edges: [
      { id: 'xy', source: 'x', target: 'y' }
    ]
  };
</script>

<CausalDiagram {data} title="Simple Diagram" />
```

### DAGDiagram - Auto-Layout
```svelte
<script>
  import { DAGDiagram } from '$lib/components/diagrams';

  const nodes = [
    { id: 'a', label: 'A', type: 'variable' },
    { id: 'b', label: 'B', type: 'variable' },
    { id: 'c', label: 'C', type: 'outcome' }
  ];

  const edges = [
    { id: 'ab', source: 'a', target: 'b' },
    { id: 'bc', source: 'b', target: 'c' }
  ];
</script>

<DAGDiagram {nodes} {edges} title="Auto-Laid Out DAG" />
```

### TreatmentEffectDiagram - Preset
```svelte
<script>
  import { TreatmentEffectDiagram } from '$lib/components/diagrams';
</script>

<TreatmentEffectDiagram
  treatment="Marketing Campaign"
  outcome="Sales"
  confounders={['Seasonality', 'Competitor Actions']}
/>
```

## Ready For

- Visual verification in 04-04
- Integration into Module 1 lesson content
- Educational demonstrations of causal inference concepts
