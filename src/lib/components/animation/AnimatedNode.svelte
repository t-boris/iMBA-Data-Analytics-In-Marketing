<script lang="ts">
  import type { DiagramNode } from '$lib/components/diagrams';
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';

  let {
    node,
    animate = 'none',
    highlight = false,
    delay = 0,
    selected = false,
    onClick
  }: {
    node: DiagramNode;
    animate?: 'fadeIn' | 'scaleIn' | 'none';
    highlight?: boolean;
    delay?: number;
    selected?: boolean;
    onClick?: (node: DiagramNode) => void;
  } = $props();

  // Node type to color mapping using CSS variables
  const typeColors: Record<DiagramNode['type'], string> = {
    treatment: 'var(--color-treatment)',
    control: 'var(--color-control)',
    confounder: 'var(--color-confounder)',
    outcome: 'var(--color-outcome)',
    variable: 'var(--color-arrow)'
  };

  const nodeRadius = 20;
  const color = $derived(typeColors[node.type]);

  let groupElement: SVGGElement | null = null;
  let circleElement: SVGCircleElement | null = null;

  // Initial state based on animation type
  const initialOpacity = $derived(animate === 'fadeIn' || animate === 'scaleIn' ? 0 : 1);
  const initialScale = $derived(animate === 'scaleIn' ? 0 : 1);

  // Run entry animation on mount
  onMount(() => {
    if (!groupElement) return;

    if (animate === 'fadeIn') {
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
    } else if (animate === 'scaleIn') {
      gsap.fromTo(
        groupElement,
        { opacity: 0, scale: 0, transformOrigin: 'center center' },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          delay,
          ease: 'back.out(1.7)'
        }
      );
    }
  });

  // Highlight effect - pulse animation
  $effect(() => {
    if (!circleElement) return;

    if (highlight) {
      gsap.to(circleElement, {
        strokeWidth: 4,
        duration: 0.3,
        ease: 'power2.out'
      });

      // Create pulse animation
      gsap.to(circleElement, {
        scale: 1.1,
        duration: 0.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        transformOrigin: 'center center'
      });
    } else {
      // Stop pulse and reset
      gsap.killTweensOf(circleElement);
      gsap.to(circleElement, {
        scale: 1,
        strokeWidth: selected ? 3 : 2,
        duration: 0.3,
        ease: 'power2.out'
      });
    }

    return () => {
      if (circleElement) {
        gsap.killTweensOf(circleElement);
      }
    };
  });
</script>

<g
  bind:this={groupElement}
  transform="translate({node.x}, {node.y})"
  class="cursor-pointer outline-none"
  onclick={() => onClick?.(node)}
  onkeydown={(e) => e.key === 'Enter' && onClick?.(node)}
  role="button"
  tabindex="0"
  aria-label="{node.label} ({node.type})"
  style="outline: none; opacity: {initialOpacity}; transform: scale({initialScale});"
>
  <!-- Node circle -->
  <circle
    bind:this={circleElement}
    r={nodeRadius}
    fill={color}
    fill-opacity="0.2"
    stroke={color}
    stroke-width={selected ? 3 : 2}
    class="transition-colors duration-200"
  />

  <!-- Node label (below circle) -->
  <text
    y={nodeRadius + 14}
    text-anchor="middle"
    class="pointer-events-none fill-slate-700 dark:fill-slate-300"
    style="font-size: 11px; font-weight: 500;"
  >
    {node.label}
  </text>
</g>
