<script lang="ts">
  import { slide } from 'svelte/transition';
  import type { Snippet } from 'svelte';

  let {
    title,
    defaultOpen = false,
    class: className = '',
    children
  }: {
    title: string;
    defaultOpen?: boolean;
    class?: string;
    children: Snippet;
  } = $props();

  let isOpen = $state(defaultOpen);
</script>

<div class="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 {className}">
  <button
    onclick={() => isOpen = !isOpen}
    class="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
  >
    <span class="font-medium text-slate-900 dark:text-white">{title}</span>
    <svg
      class="w-5 h-5 transition-transform duration-200 text-slate-500 dark:text-slate-400"
      class:rotate-180={isOpen}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  {#if isOpen}
    <div transition:slide={{ duration: 200 }} class="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
      {@render children()}
    </div>
  {/if}
</div>
