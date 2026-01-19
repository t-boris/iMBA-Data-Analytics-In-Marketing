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
    default: 'badge-default',
    treatment: 'badge-treatment',
    control: 'badge-control',
    confounder: 'badge-confounder',
    outcome: 'badge-outcome',
    success: 'badge-success',
    warning: 'badge-warning'
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    default: 'px-2.5 py-1 text-sm'
  };
</script>

<span class="inline-flex items-center font-medium rounded-full {variantClasses[variant]} {sizeClasses[size]} {className}">
  {@render children()}
</span>
