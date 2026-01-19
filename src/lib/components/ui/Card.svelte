<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    variant = 'default',
    padding = 'default',
    hover = false,
    class: className = '',
    children
  }: {
    variant?: 'default' | 'outlined' | 'elevated';
    padding?: 'none' | 'sm' | 'default' | 'lg';
    hover?: boolean;
    class?: string;
    children: Snippet;
  } = $props();

  const variantClasses = {
    default: 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700',
    outlined: 'bg-transparent border-2 border-slate-300 dark:border-slate-600',
    elevated: 'bg-white dark:bg-slate-800 shadow-lg'
  };

  const paddingClasses = {
    none: '',
    sm: 'p-3',
    default: 'p-4 md:p-6',
    lg: 'p-6 md:p-8'
  };

  const hoverClass = hover ? 'transition-shadow hover:shadow-md cursor-pointer' : '';
</script>

<div class="rounded-lg {variantClasses[variant]} {paddingClasses[padding]} {hoverClass} {className}">
  {@render children()}
</div>
