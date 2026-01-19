<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    variant = 'body',
    as,
    class: className = '',
    children
  }: {
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'small' | 'code';
    as?: string;
    class?: string;
    children: Snippet;
  } = $props();

  const tags: Record<string, string> = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    body: 'p',
    small: 'span',
    code: 'code'
  };

  const tag = as || tags[variant];
</script>

<svelte:element this={tag} class="{variant} {className}">
  {@render children()}
</svelte:element>
