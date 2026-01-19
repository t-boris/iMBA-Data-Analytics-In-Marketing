<script lang="ts">
  import type { DiagramEdge, DiagramNode } from '$lib/components/diagrams';
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';

  let {
    edge,
    sourceNode,
    targetNode,
    animate = 'none',
    highlight = false,
    delay = 0,
    selected = false,
    onClick
  }: {
    edge: DiagramEdge;
    sourceNode: DiagramNode;
    targetNode: DiagramNode;
    animate?: 'draw' | 'fadeIn' | 'none';
    highlight?: boolean;
    delay?: number;
    selected?: boolean;
    onClick?: (edge: DiagramEdge) => void;
  } = $props();

  const nodeRadius = 20;
  const arrowSize = 10;

  // Calculate edge path with offset from node centers
  const dx = $derived(targetNode.x - sourceNode.x);
  const dy = $derived(targetNode.y - sourceNode.y);
  const length = $derived(Math.sqrt(dx * dx + dy * dy));
  const unitX = $derived(length > 0 ? dx / length : 0);
  const unitY = $derived(length > 0 ? dy / length : 0);

  // Start and end points (offset by node radius)
  const startX = $derived(sourceNode.x + unitX * nodeRadius);
  const startY = $derived(sourceNode.y + unitY * nodeRadius);
  const endX = $derived(targetNode.x - unitX * (nodeRadius + arrowSize));
  const endY = $derived(targetNode.y - unitY * (nodeRadius + arrowSize));

  // Midpoint for label placement
  const midX = $derived((startX + endX) / 2);
  const midY = $derived((startY + endY) / 2);

  // Calculate line length for stroke-dasharray
  const lineLength = $derived(Math.sqrt(
    Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
  ));

  // Arrow marker ID (unique per edge)
  const markerId = $derived(`arrow-animated-${edge.id}`);

  const strokeStyle = $derived(edge.style === 'dashed' ? '8 4' : 'none');

  let groupElement: SVGGElement | null = null;
  let lineElement: SVGLineElement | null = null;
  let markerElement: SVGPathElement | null = null;

  // Initial state based on animation type
  const initialOpacity = $derived(animate !== 'none' ? 0 : 1);

  // Run entry animation on mount
  onMount(() => {
    if (!groupElement || !lineElement) return;

    if (animate === 'draw') {
      // Set up the draw animation with stroke-dasharray
      gsap.set(lineElement, {
        strokeDasharray: lineLength,
        strokeDashoffset: lineLength
      });
      gsap.set(groupElement, { opacity: 1 });

      // Animate the line drawing
      gsap.to(lineElement, {
        strokeDashoffset: 0,
        duration: 0.6,
        delay,
        ease: 'power2.inOut',
        onComplete: () => {
          // Reset dasharray after animation for normal stroke style
          if (edge.style !== 'dashed') {
            gsap.set(lineElement, { strokeDasharray: 'none' });
          } else {
            gsap.set(lineElement, { strokeDasharray: '8 4' });
          }
        }
      });

      // Fade in the arrow marker
      if (markerElement) {
        gsap.fromTo(
          markerElement,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.2,
            delay: delay + 0.4,
            ease: 'power2.out'
          }
        );
      }
    } else if (animate === 'fadeIn') {
      gsap.fromTo(
        groupElement,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          delay,
          ease: 'power2.out'
        }
      );
    }
  });

  // Highlight effect - stroke pulse animation
  $effect(() => {
    if (!lineElement) return;

    if (highlight) {
      // Pulse the stroke width and change color
      gsap.to(lineElement, {
        strokeWidth: 4,
        duration: 0.3,
        ease: 'power2.out'
      });

      // Add a subtle pulse
      gsap.to(lineElement, {
        strokeWidth: 5,
        duration: 0.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });
    } else {
      // Stop pulse and reset
      gsap.killTweensOf(lineElement);
      gsap.to(lineElement, {
        strokeWidth: selected ? 3 : 2,
        duration: 0.3,
        ease: 'power2.out'
      });
    }

    return () => {
      if (lineElement) {
        gsap.killTweensOf(lineElement);
      }
    };
  });
</script>

<g
  bind:this={groupElement}
  class="cursor-pointer outline-none"
  onclick={() => onClick?.(edge)}
  onkeydown={(e) => e.key === 'Enter' && onClick?.(edge)}
  role="button"
  tabindex="-1"
  aria-label="Edge from {sourceNode.label} to {targetNode.label}"
  style="outline: none; opacity: {initialOpacity};"
>
  <!-- Arrow marker definition -->
  <defs>
    <marker
      id={markerId}
      viewBox="0 0 10 10"
      refX="9"
      refY="5"
      markerWidth={arrowSize}
      markerHeight={arrowSize}
      orient="auto-start-reverse"
    >
      <path
        bind:this={markerElement}
        d="M 0 0 L 10 5 L 0 10 z"
        fill={highlight ? 'var(--color-highlight, #3b82f6)' : 'var(--color-arrow)'}
        class={selected ? 'fill-blue-500' : ''}
        style="opacity: {animate === 'draw' ? 0 : 1};"
      />
    </marker>
  </defs>

  <!-- Edge line -->
  <line
    bind:this={lineElement}
    x1={startX}
    y1={startY}
    x2={endX}
    y2={endY}
    stroke={highlight ? 'var(--color-highlight, #3b82f6)' : 'var(--color-arrow)'}
    stroke-width={selected ? 3 : 2}
    stroke-dasharray={strokeStyle}
    marker-end="url(#{markerId})"
    class="transition-colors duration-200"
  />

  <!-- Edge label (if provided) -->
  {#if edge.label}
    <text
      x={midX}
      y={midY - 10}
      text-anchor="middle"
      class="text-xs fill-slate-600 dark:fill-slate-400 pointer-events-none"
    >
      {edge.label}
    </text>
  {/if}

  <!-- Invisible wider hitbox for easier clicking -->
  <line
    x1={startX}
    y1={startY}
    x2={endX}
    y2={endY}
    stroke="transparent"
    stroke-width="15"
  />
</g>
