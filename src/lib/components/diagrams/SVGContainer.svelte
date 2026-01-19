<script lang="ts">
  import { onMount } from 'svelte';

  let {
    width = 800,
    height = 600,
    padding = 40,
    preserveAspectRatio = 'xMidYMid meet',
    class: className = '',
    children
  }: {
    width?: number;
    height?: number;
    padding?: number;
    preserveAspectRatio?: string;
    class?: string;
    children: import('svelte').Snippet;
  } = $props();

  let containerRef: HTMLDivElement;
  let actualWidth = $state(width);
  let actualHeight = $state(height);

  // Responsive: update dimensions based on container
  onMount(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        actualWidth = entry.contentRect.width || width;
        // Maintain aspect ratio
        actualHeight = (actualWidth / width) * height;
      }
    });

    resizeObserver.observe(containerRef);
    return () => resizeObserver.disconnect();
  });
</script>

<div bind:this={containerRef} class="w-full {className}" style="max-width: {width}px;">
  <svg
    viewBox="0 0 {width} {height}"
    {preserveAspectRatio}
    width="100%"
    height="auto"
    class="block"
    style="max-width: {width}px; max-height: {height}px;"
  >
    <g transform="translate({padding}, {padding})">
      {@render children()}
    </g>
  </svg>
</div>
