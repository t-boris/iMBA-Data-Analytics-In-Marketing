<script lang="ts">
  import { fly } from 'svelte/transition';
  import { Container, Card, Button, ExpandableSection } from '$lib/components/ui';
  import ConfoundingViz from '$lib/components/explore/ConfoundingViz.svelte';
  import {
    generateConfoundedData,
    calculateNaiveATE,
    getConfoundingExplanation,
    type DataPoint
  } from '$lib/components/explore/confounding';

  // Simulation parameters
  let confoundingStrength = $state(0.5);
  let sampleSize = $state(200);
  let treatmentEffect = $state(1.0);

  // Available sample sizes
  const sampleSizes = [50, 100, 200, 500];

  // Generated data
  let data = $state<DataPoint[]>([]);

  // Regenerate data when parameters change
  $effect(() => {
    regenerateData();
  });

  function regenerateData() {
    data = generateConfoundedData(sampleSize, confoundingStrength, treatmentEffect);
  }

  // Computed values
  let naiveATE = $derived(calculateNaiveATE(data));
  let bias = $derived(naiveATE - treatmentEffect);
  let biasPercent = $derived(treatmentEffect !== 0 ? Math.abs(bias / treatmentEffect) * 100 : 0);
  let explanation = $derived(getConfoundingExplanation(confoundingStrength));

  // Severity colors
  const severityColors = {
    none: 'text-green-600 dark:text-green-400',
    low: 'text-yellow-600 dark:text-yellow-400',
    moderate: 'text-orange-600 dark:text-orange-400',
    high: 'text-red-600 dark:text-red-400'
  };

  const severityBgColors = {
    none: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    low: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
    moderate: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
    high: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
  };
</script>

<svelte:head>
  <title>Understanding Confounding | Data Analytics in Marketing</title>
</svelte:head>

<div transition:fly={{ y: 20, duration: 300 }}>
  <Container size="xl">
    <section class="py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-3">
          Understanding Confounding
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-300 max-w-3xl">
          Confounding occurs when a third variable influences both the treatment and the outcome,
          creating a spurious association that biases our estimate of the causal effect.
          Use this simulator to explore how confounding affects treatment effect estimates.
        </p>
      </div>

      <!-- Main Content: Two-column layout -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Left Column: Visualization -->
        <div class="space-y-6">
          <Card padding="lg">
            <ConfoundingViz
              {data}
              {confoundingStrength}
              {treatmentEffect}
            />
          </Card>
        </div>

        <!-- Right Column: Controls + Results -->
        <div class="space-y-6">
          <!-- Controls Panel -->
          <Card padding="lg">
            <h2 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Simulation Controls
            </h2>

            <div class="space-y-6">
              <!-- Confounding Strength -->
              <div>
                <div class="flex justify-between mb-2">
                  <label for="confounding" class="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Confounding Strength
                  </label>
                  <span class="text-sm font-mono text-slate-600 dark:text-slate-400">
                    {Math.round(confoundingStrength * 100)}%
                  </span>
                </div>
                <input
                  id="confounding"
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  bind:value={confoundingStrength}
                  class="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer
                         accent-amber-500"
                />
                <div class="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <span>None</span>
                  <span>Strong</span>
                </div>
              </div>

              <!-- Sample Size -->
              <div>
                <label class="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                  Sample Size
                </label>
                <div class="flex gap-2">
                  {#each sampleSizes as size}
                    <button
                      type="button"
                      onclick={() => sampleSize = size}
                      class="flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors
                             {sampleSize === size
                               ? 'bg-blue-600 text-white'
                               : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'}"
                    >
                      {size}
                    </button>
                  {/each}
                </div>
              </div>

              <!-- True Treatment Effect -->
              <div>
                <div class="flex justify-between mb-2">
                  <label for="treatment-effect" class="text-sm font-medium text-slate-700 dark:text-slate-300">
                    True Treatment Effect
                  </label>
                  <span class="text-sm font-mono text-slate-600 dark:text-slate-400">
                    {treatmentEffect.toFixed(1)}
                  </span>
                </div>
                <input
                  id="treatment-effect"
                  type="range"
                  min="-2"
                  max="2"
                  step="0.1"
                  bind:value={treatmentEffect}
                  class="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer
                         accent-green-500"
                />
                <div class="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <span>-2.0</span>
                  <span>0</span>
                  <span>+2.0</span>
                </div>
              </div>

              <!-- Regenerate Button -->
              <Button
                variant="outline"
                onclick={regenerateData}
                class="w-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                  <path d="M3 3v5h5"/>
                  <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
                  <path d="M16 16h5v5"/>
                </svg>
                Regenerate Data
              </Button>
            </div>
          </Card>

          <!-- Results Panel -->
          <Card padding="lg">
            <h2 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Estimation Results
            </h2>

            <div class="space-y-4">
              <!-- Estimates Grid -->
              <div class="grid grid-cols-3 gap-4">
                <div class="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div class="text-xs text-slate-500 dark:text-slate-400 mb-1">True ATE</div>
                  <div class="text-xl font-bold text-green-700 dark:text-green-400">
                    {treatmentEffect.toFixed(2)}
                  </div>
                </div>
                <div class="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div class="text-xs text-slate-500 dark:text-slate-400 mb-1">Naive Estimate</div>
                  <div class="text-xl font-bold text-blue-700 dark:text-blue-400">
                    {naiveATE.toFixed(2)}
                  </div>
                </div>
                <div class="text-center p-3 rounded-lg {severityBgColors[explanation.severity]} border">
                  <div class="text-xs text-slate-500 dark:text-slate-400 mb-1">Bias</div>
                  <div class="text-xl font-bold {severityColors[explanation.severity]}">
                    {bias >= 0 ? '+' : ''}{bias.toFixed(2)}
                  </div>
                </div>
              </div>

              <!-- Explanation -->
              <div class="p-4 rounded-lg {severityBgColors[explanation.severity]} border">
                <div class="flex items-start gap-3">
                  <div class="shrink-0 mt-0.5">
                    {#if explanation.severity === 'none'}
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-green-600 dark:text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                      </svg>
                    {:else if explanation.severity === 'low'}
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-yellow-600 dark:text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                    {:else}
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 {severityColors[explanation.severity]}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                        <line x1="12" y1="9" x2="12" y2="13"/>
                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                      </svg>
                    {/if}
                  </div>
                  <div>
                    <h3 class="font-semibold {severityColors[explanation.severity]}">
                      {explanation.title}
                    </h3>
                    <p class="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {explanation.description}
                    </p>
                  </div>
                </div>
              </div>

              {#if biasPercent > 0 && treatmentEffect !== 0}
                <p class="text-sm text-slate-600 dark:text-slate-400">
                  The naive estimate is off by <span class="font-semibold">{biasPercent.toFixed(0)}%</span>
                  of the true effect.
                </p>
              {/if}
            </div>
          </Card>

          <!-- Learning Callouts -->
          <div class="space-y-4">
            <ExpandableSection title="Why does this happen?">
              <div class="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <p>
                  Confounding creates a <strong class="text-slate-800 dark:text-slate-200">backdoor path</strong>
                  from the treatment to the outcome. In our DAG:
                </p>
                <ul class="list-disc pl-5 space-y-1">
                  <li>The direct causal path is: X --> Y</li>
                  <li>The backdoor path is: X &lt;-- C --> Y</li>
                </ul>
                <p>
                  When we compute a simple difference in means (naive ATE), we're measuring the
                  total association, which includes both the causal effect AND the spurious
                  association through the backdoor path.
                </p>
                <p>
                  To isolate the causal effect, we need to <strong class="text-slate-800 dark:text-slate-200">block
                  the backdoor path</strong> by controlling for the confounder.
                </p>
              </div>
            </ExpandableSection>

            <ExpandableSection title="How to fix confounding bias?">
              <div class="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <p>
                  Several methods can help address confounding:
                </p>
                <ul class="list-disc pl-5 space-y-2">
                  <li>
                    <strong class="text-slate-800 dark:text-slate-200">Randomization:</strong>
                    In RCTs, random assignment ensures the confounder is balanced across groups.
                  </li>
                  <li>
                    <strong class="text-slate-800 dark:text-slate-200">Regression adjustment:</strong>
                    Include the confounder as a control variable in your regression model.
                  </li>
                  <li>
                    <strong class="text-slate-800 dark:text-slate-200">Matching:</strong>
                    Match treated and control units with similar confounder values.
                  </li>
                  <li>
                    <strong class="text-slate-800 dark:text-slate-200">Stratification:</strong>
                    Estimate effects within strata defined by confounder values.
                  </li>
                </ul>
              </div>
            </ExpandableSection>

            <div class="text-sm text-slate-500 dark:text-slate-400 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
              <span class="font-medium">Related:</span>
              <a href="/module/causal-inference/key-thinkers" class="text-blue-600 dark:text-blue-400 hover:underline ml-1">
                Lecture 2: Key Thinkers & DAGs
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Container>
</div>
