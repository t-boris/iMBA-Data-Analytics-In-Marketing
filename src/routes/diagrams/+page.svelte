<script lang="ts">
  import { Container, Grid, Card } from '$lib/components/ui';
  import {
    CausalDiagram,
    DAGDiagram,
    TreatmentEffectDiagram
  } from '$lib/components/diagrams';
  import type { DiagramData } from '$lib/components/diagrams';

  // Example 1: Simple confounding diagram
  const confoundingData: DiagramData = {
    nodes: [
      { id: 'x', label: 'Ice Cream', type: 'treatment', x: 100, y: 180 },
      { id: 'y', label: 'Drowning', type: 'outcome', x: 400, y: 180 },
      { id: 'z', label: 'Temperature', type: 'confounder', x: 250, y: 60 }
    ],
    edges: [
      { id: 'xy', source: 'x', target: 'y', style: 'dashed' },
      { id: 'zx', source: 'z', target: 'x' },
      { id: 'zy', source: 'z', target: 'y' }
    ]
  };

  // Example 2: RCT diagram
  const rctData: DiagramData = {
    nodes: [
      { id: 'random', label: 'Randomize', type: 'variable', x: 80, y: 140 },
      { id: 'treat', label: 'Treatment', type: 'treatment', x: 250, y: 60 },
      { id: 'control', label: 'Control', type: 'control', x: 250, y: 220 },
      { id: 'outcome', label: 'Outcome', type: 'outcome', x: 420, y: 140 }
    ],
    edges: [
      { id: 'rt', source: 'random', target: 'treat' },
      { id: 'rc', source: 'random', target: 'control' },
      { id: 'to', source: 'treat', target: 'outcome' },
      { id: 'co', source: 'control', target: 'outcome' }
    ]
  };

  // Example 3: DAG for IV (shorter labels)
  const ivNodes = [
    { id: 'z', label: 'Instrument', type: 'variable' as const },
    { id: 'x', label: 'Treatment', type: 'treatment' as const },
    { id: 'y', label: 'Outcome', type: 'outcome' as const },
    { id: 'u', label: 'Unobserved', type: 'confounder' as const }
  ];

  const ivEdges = [
    { id: 'zx', source: 'z', target: 'x' },
    { id: 'xy', source: 'x', target: 'y' },
    { id: 'ux', source: 'u', target: 'x', style: 'dashed' as const },
    { id: 'uy', source: 'u', target: 'y', style: 'dashed' as const }
  ];
</script>

<svelte:head>
  <title>Diagram Examples | Data Analytics in Marketing</title>
</svelte:head>

<Container size="lg">
  <section class="py-8">
    <h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">
      Visualization Engine
    </h1>
    <p class="text-slate-600 dark:text-slate-300 mb-8">
      Interactive diagram components for causal inference education.
    </p>

    <Grid cols={1} gap="lg">
      <!-- Example 1: Confounding -->
      <Card padding="lg">
        <h2 class="text-xl font-semibold text-slate-900 dark:text-white mb-4">
          1. Confounding Variable
        </h2>
        <p class="text-slate-600 dark:text-slate-300 mb-4">
          Classic example: Ice cream sales and drowning are correlated, but temperature is the confounder.
        </p>
        <CausalDiagram
          data={confoundingData}
          width={500}
          height={280}
          title="Spurious Correlation Example"
          description="Temperature affects both ice cream sales and drowning rates"
        />
      </Card>

      <!-- Example 2: RCT -->
      <Card padding="lg">
        <h2 class="text-xl font-semibold text-slate-900 dark:text-white mb-4">
          2. Randomized Controlled Trial
        </h2>
        <p class="text-slate-600 dark:text-slate-300 mb-4">
          Randomization ensures treatment and control groups are comparable.
        </p>
        <CausalDiagram
          data={rctData}
          width={500}
          height={280}
          title="RCT Design"
          description="Random assignment eliminates selection bias"
        />
      </Card>

      <!-- Example 3: Treatment Effect Preset -->
      <Card padding="lg">
        <h2 class="text-xl font-semibold text-slate-900 dark:text-white mb-4">
          3. Treatment Effect with Confounders
        </h2>
        <p class="text-slate-600 dark:text-slate-300 mb-4">
          Using the TreatmentEffectDiagram preset component with customizable confounders.
        </p>
        <TreatmentEffectDiagram
          treatment="Marketing"
          outcome="Sales"
          confounders={['Season', 'Economy']}
          width={500}
          height={280}
          title="Marketing Effect Analysis"
          description="Identifying confounders in marketing attribution"
        />
      </Card>

      <!-- Example 4: DAG with Auto-Layout -->
      <Card padding="lg">
        <h2 class="text-xl font-semibold text-slate-900 dark:text-white mb-4">
          4. Instrumental Variables DAG
        </h2>
        <p class="text-slate-600 dark:text-slate-300 mb-4">
          Auto-layout DAG showing IV identification strategy. Dashed lines show unobserved confounding.
        </p>
        <DAGDiagram
          nodes={ivNodes}
          edges={ivEdges}
          width={500}
          height={280}
          title="IV Identification"
          description="Instrument Z affects Y only through X"
        />
      </Card>
    </Grid>
  </section>
</Container>
