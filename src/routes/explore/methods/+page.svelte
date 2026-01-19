<script lang="ts">
  /**
   * Comparing Causal Methods
   * Interactive tool to compare how RCT, Matching, and DID perform under different conditions.
   */
  import { fly, fade } from 'svelte/transition';
  import { Container, Card, ExpandableSection } from '$lib/components/ui';
  import MethodComparisonViz from '$lib/components/explore/MethodComparisonViz.svelte';
  import {
    scenarios,
    getAllEstimates,
    getBestMethod,
    getWinnerExplanation,
    type Scenario,
    type DataPoint,
    type MethodEstimate
  } from '$lib/components/explore/methodScenarios';

  // Current scenario state
  let selectedScenarioId = $state('ideal');
  let seed = $state(42);

  // Derived scenario
  let currentScenario = $derived(
    scenarios.find(s => s.id === selectedScenarioId) || scenarios[0]
  );

  // Generated data and estimates
  let generatedResult = $derived(currentScenario.generateData(seed));
  let data = $derived(generatedResult.data);
  let trueATE = $derived(generatedResult.trueATE);
  let estimates = $derived(getAllEstimates(data, trueATE, currentScenario));
  let bestMethod = $derived(getBestMethod(estimates, trueATE));
  let winnerExplanation = $derived(getWinnerExplanation(currentScenario, bestMethod));

  // Regenerate with new seed
  function regenerateData() {
    seed = Math.floor(Math.random() * 10000);
  }

  // Scenario descriptions for learning callouts
  const scenarioInsights: Record<string, { key: string; takeaway: string; lecture?: string }> = {
    'ideal': {
      key: 'All methods converge to the true effect',
      takeaway: 'When key assumptions hold for all methods, they all perform well. In practice, verifying these assumptions is the challenge.',
      lecture: 'Lecture 3: Field Experiments & RCTs'
    },
    'selection-bias': {
      key: 'Matching corrects for observable selection',
      takeaway: 'When treatment is assigned based on observable characteristics, matching methods can recover the causal effect by comparing "like with like".',
      lecture: 'Lecture 4: Matching Methods'
    },
    'unobserved-confounder': {
      key: 'Only randomization solves unobserved confounding',
      takeaway: 'When hidden variables affect both treatment and outcome, observational methods fail. This is why RCTs remain the gold standard.',
      lecture: 'Lecture 3: Field Experiments & RCTs'
    },
    'differential-trends': {
      key: 'DID requires parallel trends',
      takeaway: 'Difference-in-differences compares trends, not levels. If groups were trending differently before treatment, DID gives biased estimates.',
      lecture: 'Lecture 6: Difference-in-Differences'
    }
  };

  // Current insight
  let currentInsight = $derived(scenarioInsights[selectedScenarioId]);
</script>

<svelte:head>
  <title>Comparing Causal Methods | Data Analytics in Marketing</title>
  <meta
    name="description"
    content="Compare how RCT, Matching, and Difference-in-Differences methods perform under different causal scenarios. Interactive exploration tool."
  />
</svelte:head>

<div transition:fly={{ y: 20, duration: 300 }}>
  <Container size="xl">
    <section class="py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-3">
          Comparing Causal Methods
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-300 max-w-3xl">
          Different causal inference methods rely on different assumptions.
          Explore how RCT, Matching, and Difference-in-Differences perform
          when these assumptions are met or violated.
        </p>
      </div>

      <!-- Scenario Selector -->
      <div class="mb-8">
        <h2 class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wide">
          Select a Scenario
        </h2>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {#each scenarios as scenario}
            <button
              type="button"
              onclick={() => selectedScenarioId = scenario.id}
              class="p-4 rounded-xl border-2 text-left transition-all duration-200
                     {selectedScenarioId === scenario.id
                       ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30 ring-2 ring-blue-200 dark:ring-blue-800'
                       : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600'}"
            >
              <div class="font-semibold text-slate-900 dark:text-white mb-1">
                {scenario.name}
              </div>
              <div class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                {scenario.description}
              </div>

              <!-- Assumption indicators -->
              <div class="flex gap-2 mt-3">
                <span class="inline-flex items-center gap-1 text-xs {scenario.assumptions.rct ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}">
                  {#if scenario.assumptions.rct}
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  {:else}
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  {/if}
                  RCT
                </span>
                <span class="inline-flex items-center gap-1 text-xs {scenario.assumptions.matching ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}">
                  {#if scenario.assumptions.matching}
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  {:else}
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  {/if}
                  Match
                </span>
                <span class="inline-flex items-center gap-1 text-xs {scenario.assumptions.did ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}">
                  {#if scenario.assumptions.did}
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  {:else}
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  {/if}
                  DID
                </span>
              </div>
            </button>
          {/each}
        </div>
      </div>

      <!-- Current Scenario Description -->
      {#key selectedScenarioId}
        <div
          transition:fade={{ duration: 200 }}
          class="mb-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800"
        >
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="font-semibold text-slate-900 dark:text-white mb-1">
                Current Scenario: {currentScenario.name}
              </h3>
              <p class="text-sm text-slate-600 dark:text-slate-400">
                {currentScenario.description}
              </p>
            </div>
            <button
              type="button"
              onclick={regenerateData}
              class="flex-shrink-0 p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors"
              title="Regenerate data"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                <path d="M3 3v5h5"/>
                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
                <path d="M16 16h5v5"/>
              </svg>
            </button>
          </div>
        </div>
      {/key}

      <!-- Method Comparison Visualization -->
      <Card padding="lg" class="mb-8">
        {#key selectedScenarioId + '-' + seed}
          <div transition:fade={{ duration: 200 }}>
            <MethodComparisonViz
              {estimates}
              {trueATE}
            />
          </div>
        {/key}
      </Card>

      <!-- Results Summary -->
      {#key selectedScenarioId}
        <div
          transition:fade={{ duration: 200 }}
          class="mb-8"
        >
          <Card padding="lg">
            <div class="flex flex-col md:flex-row md:items-center gap-6">
              <!-- Winner Badge -->
              <div class="flex-shrink-0 flex items-center gap-4">
                <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                    <path d="M4 22h16"/>
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                  </svg>
                </div>
                <div>
                  <div class="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide">Best Method</div>
                  <div class="text-2xl font-bold text-slate-900 dark:text-white">{bestMethod.name}</div>
                  <div class="text-sm text-emerald-600 dark:text-emerald-400">
                    Estimate: {bestMethod.estimate >= 0 ? '+' : ''}{bestMethod.estimate.toFixed(2)}
                  </div>
                </div>
              </div>

              <!-- Explanation -->
              <div class="flex-1 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                <h4 class="font-medium text-slate-900 dark:text-white mb-2">
                  Why {bestMethod.name} works best here
                </h4>
                <p class="text-sm text-slate-600 dark:text-slate-400">
                  {winnerExplanation}
                </p>
              </div>
            </div>
          </Card>
        </div>
      {/key}

      <!-- Learning Callouts -->
      <div class="space-y-4">
        <ExpandableSection title="Understanding the Results" defaultOpen={true}>
          {#key selectedScenarioId}
            <div transition:fade={{ duration: 150 }} class="space-y-4">
              <!-- Key Insight -->
              <div class="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                <div class="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2v4"/>
                    <path d="m6.41 6.41 2.83 2.83"/>
                    <path d="M2 12h4"/>
                    <path d="m6.41 17.59 2.83-2.83"/>
                    <path d="M12 18v4"/>
                    <path d="m17.59 17.59-2.83-2.83"/>
                    <path d="M18 12h4"/>
                    <path d="m17.59 6.41-2.83 2.83"/>
                  </svg>
                  <div>
                    <h5 class="font-semibold text-amber-800 dark:text-amber-300 mb-1">
                      Key Insight: {currentInsight?.key}
                    </h5>
                    <p class="text-sm text-amber-700 dark:text-amber-400">
                      {currentInsight?.takeaway}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Method Guide -->
              <div class="grid md:grid-cols-3 gap-4">
                <div class="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <h5 class="font-semibold text-blue-800 dark:text-blue-300 mb-2">RCT</h5>
                  <p class="text-xs text-blue-700 dark:text-blue-400">
                    <strong>Use when:</strong> You can randomly assign treatment.<br/>
                    <strong>Assumption:</strong> Random assignment creates balance.
                  </p>
                </div>
                <div class="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                  <h5 class="font-semibold text-purple-800 dark:text-purple-300 mb-2">Matching</h5>
                  <p class="text-xs text-purple-700 dark:text-purple-400">
                    <strong>Use when:</strong> Selection is based on observables.<br/>
                    <strong>Assumption:</strong> No unobserved confounders.
                  </p>
                </div>
                <div class="p-4 rounded-lg bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800">
                  <h5 class="font-semibold text-teal-800 dark:text-teal-300 mb-2">DID</h5>
                  <p class="text-xs text-teal-700 dark:text-teal-400">
                    <strong>Use when:</strong> You have pre/post data.<br/>
                    <strong>Assumption:</strong> Parallel trends in absence of treatment.
                  </p>
                </div>
              </div>
            </div>
          {/key}
        </ExpandableSection>

        <ExpandableSection title="When to Use Each Method">
          <div class="prose prose-sm dark:prose-invert max-w-none">
            <p>
              Choosing the right causal inference method depends on your data and research context:
            </p>
            <ul class="space-y-2 text-slate-600 dark:text-slate-400">
              <li>
                <strong class="text-slate-800 dark:text-slate-200">RCT (Randomized Controlled Trial):</strong>
                The gold standard when feasible. Best for product tests, A/B experiments, and clinical trials
                where you control treatment assignment.
              </li>
              <li>
                <strong class="text-slate-800 dark:text-slate-200">Matching:</strong>
                Ideal for observational studies where you believe all relevant confounders are measured.
                Common in marketing mix analysis and customer segmentation studies.
              </li>
              <li>
                <strong class="text-slate-800 dark:text-slate-200">Difference-in-Differences:</strong>
                Best for policy evaluations and natural experiments where treatment timing varies.
                Requires pre-treatment data and belief in parallel trends.
              </li>
            </ul>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-4">
              Remember: No method is universally best. The key is understanding which assumptions
              are most defensible in your specific context.
            </p>
          </div>
        </ExpandableSection>

        <!-- Related Lecture Link -->
        {#if currentInsight?.lecture}
          <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <span class="text-sm text-slate-600 dark:text-slate-400">
              <span class="font-medium">Related:</span>
              <a href="/module/causal-inference/{currentInsight.lecture.toLowerCase().replace(/[^a-z0-9]+/g, '-')}" class="text-blue-600 dark:text-blue-400 hover:underline ml-1">
                {currentInsight.lecture}
              </a>
            </span>
          </div>
        {/if}
      </div>
    </section>
  </Container>
</div>
