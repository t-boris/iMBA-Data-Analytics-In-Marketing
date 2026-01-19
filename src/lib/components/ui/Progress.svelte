<script lang="ts">
  let {
    value = 0,
    max = 100,
    showLabel = false,
    size = 'default',
    class: className = ''
  }: {
    value: number;
    max?: number;
    showLabel?: boolean;
    size?: 'sm' | 'default';
    class?: string;
  } = $props();

  let percentage = $derived(Math.min(100, Math.max(0, (value / max) * 100)));

  const sizeClasses = {
    sm: 'h-1.5',
    default: 'h-2.5'
  };
</script>

<div class="w-full {className}">
  {#if showLabel}
    <div class="flex justify-between mb-1 text-sm text-slate-600">
      <span>Progress</span>
      <span>{Math.round(percentage)}%</span>
    </div>
  {/if}
  <div class="w-full bg-slate-200 rounded-full overflow-hidden {sizeClasses[size]}">
    <div
      class="h-full bg-blue-600 rounded-full transition-all duration-300"
      style="width: {percentage}%"
    />
  </div>
</div>
