<script lang="ts">
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  let {
    width = 800,
    height = 600,
    padding = 40,
    zoomable = false,
    minZoom = 0.5,
    maxZoom = 3,
    preserveAspectRatio = 'xMidYMid meet',
    class: className = '',
    children
  }: {
    width?: number;
    height?: number;
    padding?: number;
    zoomable?: boolean;
    minZoom?: number;
    maxZoom?: number;
    preserveAspectRatio?: string;
    class?: string;
    children: import('svelte').Snippet;
  } = $props();

  let containerRef: HTMLDivElement;
  let svgElement: SVGSVGElement;
  let actualWidth = $state(width);
  let actualHeight = $state(height);
  let transform = $state({ x: 0, y: 0, k: 1 });

  // Store zoom behavior reference for programmatic control
  let zoomBehavior: d3.ZoomBehavior<SVGSVGElement, unknown> | null = null;

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

    // Setup D3 zoom if enabled
    if (zoomable && svgElement) {
      zoomBehavior = d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([minZoom, maxZoom])
        .on('zoom', (event) => {
          transform = {
            x: event.transform.x,
            y: event.transform.y,
            k: event.transform.k
          };
        });

      d3.select(svgElement).call(zoomBehavior);
    }

    return () => resizeObserver.disconnect();
  });

  function zoomIn() {
    if (zoomBehavior && svgElement) {
      d3.select(svgElement).transition().duration(300).call(
        zoomBehavior.scaleBy,
        1.2
      );
    } else {
      transform = { ...transform, k: Math.min(transform.k * 1.2, maxZoom) };
    }
  }

  function zoomOut() {
    if (zoomBehavior && svgElement) {
      d3.select(svgElement).transition().duration(300).call(
        zoomBehavior.scaleBy,
        1 / 1.2
      );
    } else {
      transform = { ...transform, k: Math.max(transform.k / 1.2, minZoom) };
    }
  }

  function resetZoom() {
    if (zoomBehavior && svgElement) {
      d3.select(svgElement).transition().duration(300).call(
        zoomBehavior.transform,
        d3.zoomIdentity
      );
    } else {
      transform = { x: 0, y: 0, k: 1 };
    }
  }
</script>

<div bind:this={containerRef} class="relative w-full {className}">
  <svg
    bind:this={svgElement}
    viewBox="0 0 {width} {height}"
    {preserveAspectRatio}
    width={actualWidth}
    height={actualHeight}
    class="block"
  >
    <g transform="translate({padding + transform.x}, {padding + transform.y}) scale({transform.k})">
      {@render children()}
    </g>
  </svg>

  {#if zoomable}
    <div class="absolute bottom-2 right-2 flex gap-1">
      <button
        onclick={zoomIn}
        class="p-1 bg-white dark:bg-slate-700 rounded shadow text-sm hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
        aria-label="Zoom in"
      >+</button>
      <button
        onclick={zoomOut}
        class="p-1 bg-white dark:bg-slate-700 rounded shadow text-sm hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
        aria-label="Zoom out"
      >-</button>
      <button
        onclick={resetZoom}
        class="p-1 bg-white dark:bg-slate-700 rounded shadow text-sm hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
        aria-label="Reset zoom"
      >Reset</button>
    </div>
  {/if}
</div>
