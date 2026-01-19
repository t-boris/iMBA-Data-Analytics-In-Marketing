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

  const variantClasses: Record<string, string> = {
    h1: 'text-4xl font-bold leading-tight text-slate-900 dark:text-white tracking-tight',
    h2: 'text-3xl font-bold leading-tight text-slate-900 dark:text-white tracking-tight',
    h3: 'text-2xl font-semibold leading-tight text-slate-900 dark:text-white',
    h4: 'text-xl font-semibold leading-tight text-slate-900 dark:text-white',
    body: 'text-base text-slate-600 dark:text-slate-300',
    small: 'text-sm text-slate-500 dark:text-slate-400',
    code: 'font-mono text-sm bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-blue-600 dark:text-blue-400'
  };

  // Use $derived for reactive tag computation based on props
  const tag = $derived(as || tags[variant]);
</script>

<svelte:element this={tag} class="{variantClasses[variant]} {className}">
  {@render children()}
</svelte:element>
