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

<div class="border border-slate-200 rounded-lg overflow-hidden {className}">
  <button
    onclick={() => isOpen = !isOpen}
    class="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
  >
    <span class="font-medium text-slate-900">{title}</span>
    <svg
      class="w-5 h-5 text-slate-500 transition-transform duration-200"
      class:rotate-180={isOpen}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  {#if isOpen}
    <div transition:slide={{ duration: 200 }} class="p-4 border-t border-slate-200">
      {@render children()}
    </div>
  {/if}
</div>
