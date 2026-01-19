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

<div class="expandable-section rounded-lg overflow-hidden {className}">
  <button
    onclick={() => isOpen = !isOpen}
    class="w-full flex items-center justify-between p-4 expandable-header transition-colors"
  >
    <span class="font-medium" style="color: var(--color-text-primary);">{title}</span>
    <svg
      class="w-5 h-5 transition-transform duration-200"
      style="color: var(--color-text-muted);"
      class:rotate-180={isOpen}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  {#if isOpen}
    <div transition:slide={{ duration: 200 }} class="p-4 expandable-content">
      {@render children()}
    </div>
  {/if}
</div>
