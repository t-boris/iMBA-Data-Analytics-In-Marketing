<script lang="ts">
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import { gsap } from 'gsap';
  import type { DataPoint } from './confounding';

  let {
    data,
    confoundingStrength,
    treatmentEffect,
    class: className = ''
  }: {
    data: DataPoint[];
    confoundingStrength: number;
    treatmentEffect: number;
    class?: string;
  } = $props();

  // SVG dimensions
  const dagWidth = 300;
  const dagHeight = 180;
  const scatterWidth = 500;
  const scatterHeight = 300;
  const margin = { top: 30, right: 30, bottom: 50, left: 60 };

  // Scatter plot refs
  let scatterContainer: HTMLDivElement;
  let svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  let xScale: d3.ScaleLinear<number, number>;
  let yScale: d3.ScaleLinear<number, number>;

  // DAG node positions
  const dagNodes = {
    C: { x: 150, y: 40, label: 'C', fullLabel: 'Confounder' },
    X: { x: 80, y: 130, label: 'X', fullLabel: 'Treatment' },
    Y: { x: 220, y: 130, label: 'Y', fullLabel: 'Outcome' }
  };

  // Edge stroke width based on confounding strength
  let confoundingEdgeWidth = $derived(2 + confoundingStrength * 4);
  let confoundingColor = $derived(
    confoundingStrength > 0.5
      ? 'var(--color-confounder)'
      : confoundingStrength > 0
        ? '#f59e0b'
        : 'var(--color-arrow)'
  );

  // Initialize scatter plot on mount
  onMount(() => {
    initScatterPlot();
  });

  // Update scatter plot when data changes
  $effect(() => {
    if (svg && data.length > 0) {
      updateScatterPlot(data);
    }
  });

  function initScatterPlot() {
    // Clear existing
    d3.select(scatterContainer).selectAll('*').remove();

    // Create SVG
    svg = d3.select(scatterContainer)
      .append('svg')
      .attr('width', scatterWidth)
      .attr('height', scatterHeight)
      .attr('class', 'overflow-visible');

    // Background
    svg.append('rect')
      .attr('width', scatterWidth)
      .attr('height', scatterHeight)
      .attr('fill', 'rgb(30, 41, 59)') // slate-800
      .attr('rx', 8);

    // Initialize scales
    xScale = d3.scaleLinear()
      .domain([-3, 3])
      .range([margin.left, scatterWidth - margin.right]);

    yScale = d3.scaleLinear()
      .domain([0, 12])
      .range([scatterHeight - margin.bottom, margin.top]);

    // X axis
    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${scatterHeight - margin.bottom})`)
      .call(d3.axisBottom(xScale).ticks(6))
      .selectAll('text, line, path')
      .attr('stroke', '#94a3b8')
      .attr('fill', '#94a3b8');

    // Y axis
    svg.append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale).ticks(6))
      .selectAll('text, line, path')
      .attr('stroke', '#94a3b8')
      .attr('fill', '#94a3b8');

    // X axis label
    svg.append('text')
      .attr('class', 'x-label')
      .attr('x', scatterWidth / 2)
      .attr('y', scatterHeight - 8)
      .attr('text-anchor', 'middle')
      .attr('fill', '#94a3b8')
      .attr('font-size', '12px')
      .text('Confounder (C)');

    // Y axis label
    svg.append('text')
      .attr('class', 'y-label')
      .attr('transform', 'rotate(-90)')
      .attr('x', -scatterHeight / 2)
      .attr('y', 18)
      .attr('text-anchor', 'middle')
      .attr('fill', '#94a3b8')
      .attr('font-size', '12px')
      .text('Outcome (Y)');

    // Create group for points
    svg.append('g').attr('class', 'points-group');

    // Legend
    const legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${scatterWidth - margin.right - 100}, ${margin.top})`);

    legend.append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 5)
      .attr('fill', '#3b82f6');

    legend.append('text')
      .attr('x', 12)
      .attr('y', 4)
      .attr('fill', '#cbd5e1')
      .attr('font-size', '11px')
      .text('Treated');

    legend.append('circle')
      .attr('cx', 0)
      .attr('cy', 20)
      .attr('r', 5)
      .attr('fill', '#64748b');

    legend.append('text')
      .attr('x', 12)
      .attr('y', 24)
      .attr('fill', '#cbd5e1')
      .attr('font-size', '11px')
      .text('Control');

    // Initial update
    if (data.length > 0) {
      updateScatterPlot(data);
    }
  }

  function updateScatterPlot(newData: DataPoint[]) {
    if (!svg) return;

    // Update y-scale domain based on data
    const yExtent = d3.extent(newData, d => d.outcome) as [number, number];
    const yPadding = (yExtent[1] - yExtent[0]) * 0.15;
    yScale.domain([
      Math.min(yExtent[0] - yPadding, 0),
      Math.max(yExtent[1] + yPadding, 10)
    ]);

    // Update y axis
    svg.select('.y-axis')
      .transition()
      .duration(300)
      .call(d3.axisLeft(yScale).ticks(6) as unknown as (selection: d3.Selection<d3.BaseType, unknown, null, undefined>) => void)
      .selectAll('text, line, path')
      .attr('stroke', '#94a3b8')
      .attr('fill', '#94a3b8');

    // Update points
    const pointsGroup = svg.select('.points-group');

    const points = pointsGroup.selectAll<SVGCircleElement, DataPoint>('circle')
      .data(newData, d => d.id.toString());

    // Exit
    points.exit()
      .transition()
      .duration(200)
      .attr('r', 0)
      .remove();

    // Enter
    const enter = points.enter()
      .append('circle')
      .attr('cx', d => xScale(d.confounder))
      .attr('cy', d => yScale(d.outcome))
      .attr('r', 0)
      .attr('fill', d => d.treatment === 1 ? '#3b82f6' : '#64748b')
      .attr('fill-opacity', 0.7)
      .attr('stroke', d => d.treatment === 1 ? '#60a5fa' : '#94a3b8')
      .attr('stroke-width', 1);

    // Animate entering points
    enter.each(function(d, i) {
      gsap.to(this, {
        attr: { r: 5 },
        duration: 0.3,
        delay: i * 0.002,
        ease: 'back.out(2)'
      });
    });

    // Update
    points
      .transition()
      .duration(300)
      .attr('cx', d => xScale(d.confounder))
      .attr('cy', d => yScale(d.outcome))
      .attr('fill', d => d.treatment === 1 ? '#3b82f6' : '#64748b')
      .attr('stroke', d => d.treatment === 1 ? '#60a5fa' : '#94a3b8');
  }

  // Calculate edge path for DAG
  function getEdgePath(
    from: { x: number; y: number },
    to: { x: number; y: number },
    nodeRadius: number = 22
  ): string {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const unitX = dx / length;
    const unitY = dy / length;

    const startX = from.x + unitX * nodeRadius;
    const startY = from.y + unitY * nodeRadius;
    const endX = to.x - unitX * (nodeRadius + 8);
    const endY = to.y - unitY * (nodeRadius + 8);

    return `M ${startX} ${startY} L ${endX} ${endY}`;
  }
</script>

<div class="confounding-viz {className}">
  <!-- DAG Section -->
  <div class="dag-section mb-6">
    <h3 class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wide">
      Causal Structure (DAG)
    </h3>
    <svg width={dagWidth} height={dagHeight} class="overflow-visible">
      <defs>
        <!-- Arrow markers -->
        <marker
          id="arrow-causal"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="8"
          markerHeight="8"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-treatment)" />
        </marker>
        <marker
          id="arrow-confounding"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="8"
          markerHeight="8"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill={confoundingColor} />
        </marker>
      </defs>

      <!-- Edges -->
      <!-- C -> X (confounding path) -->
      <path
        d={getEdgePath(dagNodes.C, dagNodes.X)}
        stroke={confoundingColor}
        stroke-width={confoundingEdgeWidth}
        fill="none"
        marker-end="url(#arrow-confounding)"
        class="transition-all duration-300"
      />

      <!-- C -> Y (confounding path) -->
      <path
        d={getEdgePath(dagNodes.C, dagNodes.Y)}
        stroke={confoundingColor}
        stroke-width={confoundingEdgeWidth}
        fill="none"
        marker-end="url(#arrow-confounding)"
        class="transition-all duration-300"
      />

      <!-- X -> Y (causal path) -->
      <path
        d={getEdgePath(dagNodes.X, dagNodes.Y)}
        stroke="var(--color-treatment)"
        stroke-width="2"
        fill="none"
        marker-end="url(#arrow-causal)"
      />

      <!-- Nodes -->
      <!-- C (Confounder) -->
      <g transform="translate({dagNodes.C.x}, {dagNodes.C.y})">
        <circle
          r="22"
          fill="var(--color-confounder)"
          fill-opacity={0.15 + confoundingStrength * 0.25}
          stroke={confoundingColor}
          stroke-width={2 + confoundingStrength * 2}
          class="transition-all duration-300"
        />
        <text
          y="5"
          text-anchor="middle"
          class="fill-slate-800 dark:fill-white font-semibold text-sm"
        >
          {dagNodes.C.label}
        </text>
        <text
          y="38"
          text-anchor="middle"
          class="fill-slate-500 dark:fill-slate-400 text-xs"
        >
          {dagNodes.C.fullLabel}
        </text>
      </g>

      <!-- X (Treatment) -->
      <g transform="translate({dagNodes.X.x}, {dagNodes.X.y})">
        <circle
          r="22"
          fill="var(--color-treatment)"
          fill-opacity="0.2"
          stroke="var(--color-treatment)"
          stroke-width="2"
        />
        <text
          y="5"
          text-anchor="middle"
          class="fill-slate-800 dark:fill-white font-semibold text-sm"
        >
          {dagNodes.X.label}
        </text>
        <text
          y="38"
          text-anchor="middle"
          class="fill-slate-500 dark:fill-slate-400 text-xs"
        >
          {dagNodes.X.fullLabel}
        </text>
      </g>

      <!-- Y (Outcome) -->
      <g transform="translate({dagNodes.Y.x}, {dagNodes.Y.y})">
        <circle
          r="22"
          fill="var(--color-outcome)"
          fill-opacity="0.2"
          stroke="var(--color-outcome)"
          stroke-width="2"
        />
        <text
          y="5"
          text-anchor="middle"
          class="fill-slate-800 dark:fill-white font-semibold text-sm"
        >
          {dagNodes.Y.label}
        </text>
        <text
          y="38"
          text-anchor="middle"
          class="fill-slate-500 dark:fill-slate-400 text-xs"
        >
          {dagNodes.Y.fullLabel}
        </text>
      </g>
    </svg>

    {#if confoundingStrength > 0}
      <p class="text-xs text-amber-600 dark:text-amber-400 mt-2">
        Confounding paths C-X and C-Y create a backdoor path from X to Y
      </p>
    {/if}
  </div>

  <!-- Scatter Plot Section -->
  <div class="scatter-section">
    <h3 class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wide">
      Observed Data
    </h3>
    <div bind:this={scatterContainer} class="scatter-container rounded-lg overflow-hidden"></div>
    <p class="text-xs text-slate-500 dark:text-slate-400 mt-2">
      {data.filter(d => d.treatment === 1).length} treated,
      {data.filter(d => d.treatment === 0).length} control observations
    </p>
  </div>
</div>

<style>
  .confounding-viz {
    display: flex;
    flex-direction: column;
  }

  .scatter-container :global(svg) {
    display: block;
  }
</style>
