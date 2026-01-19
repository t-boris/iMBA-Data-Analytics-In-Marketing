<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    variant = 'default',
    size = 'default',
    class: className = '',
    children
  }: {
    variant?: 'default' | 'treatment' | 'control' | 'confounder' | 'outcome' | 'success' | 'warning';
    size?: 'sm' | 'default';
    class?: string;
    children: Snippet;
  } = $props();

  const variantClasses = {
    default: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300',
    treatment: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    control: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    confounder: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
    outcome: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
    success: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    warning: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    default: 'px-2.5 py-1 text-sm'
  };
</script>

<span class="inline-flex items-center font-medium rounded-full {variantClasses[variant]} {sizeClasses[size]} {className}">
  {@render children()}
</span>
