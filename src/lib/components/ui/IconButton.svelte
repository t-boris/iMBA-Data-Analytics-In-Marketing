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
    ghost: 'icon-btn-ghost',
    outline: 'icon-btn-outline',
    filled: 'icon-btn-filled'
  };

  const baseClasses = 'inline-flex items-center justify-center rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none icon-btn-base';
</script>

<button
  class="{baseClasses} {sizeClasses[size]} {variantClasses[variant]} {className}"
  aria-label={label}
  {disabled}
  {...restProps}
>
  {@render children()}
</button>
