<script lang="ts">
  /**
   * MethodComparisonViz.svelte
   * Side-by-side visualization comparing RCT, Matching, and DID estimates.
   * Shows assumptions, estimates, and confidence indicators for each method.
   */

  import type { DataPoint, MethodEstimate } from './methodScenarios';

  let {
    estimates,
    trueATE,
    class: className = ''
  }: {
    estimates: MethodEstimate[];
    trueATE: number;
    class?: string;
  } = $props();

  // Method icons and colors
  const methodConfig: Record<string, {
    icon: string;
    color: string;
    bgColor: string;
    borderColor: string;
  }> = {
    'RCT': {
      icon: 'flask',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800'
    },
    'Matching': {
      icon: 'link',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800'
    },
    'DID': {
      icon: 'chart',
      color: 'text-teal-600 dark:text-teal-400',
      bgColor: 'bg-teal-50 dark:bg-teal-900/20',
      borderColor: 'border-teal-200 dark:border-teal-800'
    }
  };

  // Compute error and color for each estimate
  function getErrorInfo(estimate: number, truth: number): {
    error: number;
    errorPercent: number;
    isClose: boolean;
    colorClass: string;
    bgClass: string;
  } {
    const error = estimate - truth;
    const errorPercent = (Math.abs(error) / Math.max(Math.abs(truth), 0.01)) * 100;
    const isClose = errorPercent < 20;

    return {
      error,
      errorPercent,
      isClose,
      colorClass: isClose
        ? 'text-green-600 dark:text-green-400'
        : 'text-red-600 dark:text-red-400',
      bgClass: isClose
        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
        : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
    };
  }

  // Confidence indicator config
  const confidenceConfig: Record<string, {
    label: string;
    color: string;
    dots: number;
  }> = {
    'high': { label: 'High', color: 'bg-green-500', dots: 3 },
    'medium': { label: 'Medium', color: 'bg-yellow-500', dots: 2 },
    'low': { label: 'Low', color: 'bg-red-500', dots: 1 }
  };
</script>

<div class="method-comparison-viz {className}">
  <!-- Three-column grid -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    {#each estimates as methodEstimate}
      {@const config = methodConfig[methodEstimate.name]}
      {@const errorInfo = getErrorInfo(methodEstimate.estimate, trueATE)}
      {@const confConfig = confidenceConfig[methodEstimate.confidence]}

      <div class="method-card rounded-xl border-2 {config.borderColor} {config.bgColor} p-5 transition-all duration-300 hover:shadow-md">
        <!-- Header with icon and name -->
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-lg {config.bgColor} flex items-center justify-center {config.color}">
            {#if methodEstimate.name === 'RCT'}
              <!-- Flask icon for RCT -->
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 3h6v7l4 8H5l4-8V3z" />
                <path d="M9 3h6" />
                <path d="M7 18h10" />
              </svg>
            {:else if methodEstimate.name === 'Matching'}
              <!-- Link/match icon -->
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            {:else}
              <!-- Chart icon for DID -->
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 3v18h18" />
                <path d="m7 16 4-4 4 4 6-6" />
              </svg>
            {/if}
          </div>
          <div>
            <h3 class="font-bold text-slate-900 dark:text-white">{methodEstimate.name}</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400">
              {#if methodEstimate.name === 'RCT'}
                Randomized Experiment
              {:else if methodEstimate.name === 'Matching'}
                Propensity Matching
              {:else}
                Difference-in-Differences
              {/if}
            </p>
          </div>
        </div>

        <!-- Key Assumption -->
        <div class="mb-4 p-3 rounded-lg bg-white/50 dark:bg-slate-800/50">
          <div class="flex items-center gap-2 mb-1">
            {#if methodEstimate.assumptionMet}
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-green-600 dark:text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            {:else}
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-red-600 dark:text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
            {/if}
            <span class="text-sm font-medium {methodEstimate.assumptionMet ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}">
              {methodEstimate.assumptionLabel}
            </span>
          </div>
          <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {methodEstimate.assumptionMet ? 'Holds in this scenario' : 'Violated in this scenario'}
          </p>
        </div>

        <!-- Estimated Effect - Large number -->
        <div class="text-center mb-4 py-4 rounded-lg border {errorInfo.bgClass}">
          <div class="text-xs text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide">
            Estimated Effect
          </div>
          <div class="text-3xl font-bold {errorInfo.colorClass}">
            {methodEstimate.estimate >= 0 ? '+' : ''}{methodEstimate.estimate.toFixed(2)}
          </div>
          <div class="text-xs mt-1 {errorInfo.colorClass}">
            {#if errorInfo.isClose}
              Close to truth ({errorInfo.errorPercent.toFixed(0)}% error)
            {:else}
              Far from truth ({errorInfo.errorPercent.toFixed(0)}% error)
            {/if}
          </div>
        </div>

        <!-- Confidence Indicator -->
        <div class="flex items-center justify-between">
          <span class="text-xs text-slate-500 dark:text-slate-400">Reliability</span>
          <div class="flex items-center gap-2">
            <div class="flex gap-1">
              {#each Array(3) as _, i}
                <div
                  class="w-2 h-2 rounded-full transition-colors {i < confConfig.dots ? confConfig.color : 'bg-slate-300 dark:bg-slate-600'}"
                ></div>
              {/each}
            </div>
            <span class="text-xs font-medium {
              methodEstimate.confidence === 'high' ? 'text-green-600 dark:text-green-400' :
              methodEstimate.confidence === 'medium' ? 'text-yellow-600 dark:text-yellow-400' :
              'text-red-600 dark:text-red-400'
            }">
              {confConfig.label}
            </span>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <!-- True Value Reference -->
  <div class="mt-6 p-4 rounded-lg bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
            <path d="m9 12 2 2 4-4"/>
          </svg>
        </div>
        <div>
          <div class="text-sm font-medium text-slate-700 dark:text-slate-300">True Causal Effect</div>
          <div class="text-xs text-slate-500 dark:text-slate-400">The actual treatment effect in this simulation</div>
        </div>
      </div>
      <div class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
        +{trueATE.toFixed(2)}
      </div>
    </div>
  </div>
</div>

<style>
  .method-card {
    transform-origin: center;
  }

  .method-card:hover {
    transform: translateY(-2px);
  }
</style>
