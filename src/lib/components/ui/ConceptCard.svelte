<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import Card from './Card.svelte';

  let {
    term,
    definition,
    category = 'general',
    example,
    index = 0
  }: {
    term: string;
    definition: string;
    category?: 'treatment' | 'control' | 'confounder' | 'outcome' | 'general';
    example?: string;
    index?: number;
  } = $props();

  let expanded = $state(false);

  const categoryColors = {
    treatment: 'border-l-4 border-l-[var(--color-treatment)]',
    control: 'border-l-4 border-l-[var(--color-control)]',
    confounder: 'border-l-4 border-l-[var(--color-confounder)]',
    outcome: 'border-l-4 border-l-[var(--color-outcome)]',
    general: ''
  };
</script>

<div
  in:fly={{ y: 20, delay: index * 50, duration: 300 }}
  class={categoryColors[category]}
>
  <Card hover={!!example} variant="default">
    <button
      onclick={() => example && (expanded = !expanded)}
      class="w-full text-left"
      disabled={!example}
    >
      <h4 class="font-semibold text-slate-900 dark:text-white">{term}</h4>
      <p class="mt-1 text-slate-600 dark:text-slate-300">{definition}</p>
    </button>

    {#if expanded && example}
      <div transition:fade={{ duration: 200 }} class="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
        <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Example:</p>
        <p class="mt-1 text-slate-600 dark:text-slate-300">{example}</p>
      </div>
    {/if}
  </Card>
</div>
