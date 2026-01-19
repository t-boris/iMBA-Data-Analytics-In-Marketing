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
    default: 'bg-slate-100 text-slate-700',
    treatment: 'bg-green-100 text-green-800',
    control: 'bg-blue-100 text-blue-800',
    confounder: 'bg-red-100 text-red-800',
    outcome: 'bg-purple-100 text-purple-800',
    success: 'bg-emerald-100 text-emerald-800',
    warning: 'bg-amber-100 text-amber-800'
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    default: 'px-2.5 py-1 text-sm'
  };
</script>

<span class="inline-flex items-center font-medium rounded-full {variantClasses[variant]} {sizeClasses[size]} {className}">
  {@render children()}
</span>
