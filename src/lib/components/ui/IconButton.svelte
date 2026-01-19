<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';

  let {
    label,
    size = 'default',
    variant = 'ghost',
    disabled = false,
    class: className = '',
    children,
    ...restProps
  }: {
    label: string;
    size?: 'sm' | 'default' | 'lg';
    variant?: 'ghost' | 'outline' | 'filled';
    disabled?: boolean;
    class?: string;
    children: Snippet;
  } & HTMLButtonAttributes = $props();

  const sizeClasses = {
    sm: 'w-8 h-8',
    default: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const variantClasses = {
    ghost: 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white',
    outline: 'border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-500',
    filled: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
  };

  const baseClasses = 'inline-flex items-center justify-center rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 disabled:opacity-50 disabled:pointer-events-none';
</script>

<button
  class="{baseClasses} {sizeClasses[size]} {variantClasses[variant]} {className}"
  aria-label={label}
  {disabled}
  {...restProps}
>
  {@render children()}
</button>
