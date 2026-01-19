# Phase 1: Foundation - Research

**Researched:** 2026-01-18
**Domain:** Framework selection and project setup for visual-heavy educational app
**Confidence:** HIGH

<research_summary>
## Summary

Researched the optimal tech stack for a visual-heavy educational web application with interactive diagrams, animations, and static content. The clear winner is **Svelte 5 + SvelteKit** for this project based on:

1. **Built-in animation capabilities** - Svelte has native transitions, springs, and tweens that other frameworks require external libraries for
2. **Best performance** - 30-40% faster than React, no virtual DOM overhead critical for smooth animations
3. **D3.js integration** - The visualization community has increasingly moved to Svelte + D3 because Svelte doesn't fight the DOM
4. **Static site generation** - SvelteKit with adapter-static produces blazing fast static sites perfect for Firebase Hosting
5. **Smaller bundle size** - Important for educational content that students access repeatedly

For complex sequenced animations beyond built-in capabilities, use **GSAP** (timeline control) or **Motion One** (lightweight, modern API). For data visualization and causal diagrams, use **D3.js for math + LayerCake for rendering** or integrate **DAGitty** concepts for causal inference diagrams.

**Primary recommendation:** SvelteKit 2 + Svelte 5 with TailwindCSS 4, built-in transitions for UI, GSAP for complex educational animations, D3/LayerCake for diagrams, deployed as static site to Firebase.
</research_summary>

<standard_stack>
## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| svelte | 5.x | UI framework | Best animation performance, built-in transitions, no VDOM |
| @sveltejs/kit | 2.x | Meta-framework | Routing, SSG, file-based routes |
| @sveltejs/adapter-static | 3.x | Static site generation | Firebase Hosting deployment |
| typescript | 5.x | Type safety | Better DX, fewer runtime errors |

### Styling
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| tailwindcss | 4.x | Utility CSS | Rapid styling, design system |
| @tailwindcss/vite | 4.x | Vite integration | No PostCSS config needed in v4 |

### Animation
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| svelte/transition | built-in | fade, fly, slide, scale, blur, draw | UI transitions (80% of cases) |
| svelte/motion | built-in | Spring, Tween classes | Reactive value animations |
| gsap | 3.x | Complex animations | Sequenced educational explanations, timelines |
| @motionone/svelte | 10.x | Alternative to GSAP | Simpler API, smaller bundle (if GSAP overkill) |

### Visualization
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| d3 | 7.x | Visualization math | Scales, paths, force layouts, calculations only |
| layercake | 8.x | Svelte chart framework | Rendering D3 calculations with Svelte components |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Svelte | React | React has larger ecosystem but worse animation perf |
| Svelte | Vue | Vue middle ground but Svelte wins for visual apps |
| GSAP | Framer Motion | Framer is React-only, can't use with Svelte |
| LayerCake | Recharts | Recharts is React-only |
| TailwindCSS | Plain CSS | Tailwind accelerates consistent design system |

**Installation:**
```bash
# Create SvelteKit project
npx sv create imba-study-app
cd imba-study-app

# Add TailwindCSS v4 via Svelte CLI
npx sv add tailwindcss

# Core dependencies
npm install gsap d3 layercake

# Optional: Motion One if preferring lighter animation lib
npm install @motionone/svelte
```
</standard_stack>

<architecture_patterns>
## Architecture Patterns

### Recommended Project Structure
```
src/
├── lib/
│   ├── components/        # Reusable UI components
│   │   ├── diagrams/      # Causal diagram components
│   │   ├── animations/    # Animated explanation components
│   │   └── ui/            # Design system primitives
│   ├── content/           # Processed module content
│   │   └── module-1/      # Lecture data per module
│   ├── stores/            # Svelte stores for state
│   └── utils/             # Helper functions
├── routes/
│   ├── +layout.svelte     # App shell, nav
│   ├── +page.svelte       # Home/module selection
│   ├── module/
│   │   └── [slug]/        # Dynamic module routes
│   │       ├── +page.svelte
│   │       └── lecture/
│   │           └── [id]/  # Individual lectures
│   ├── glossary/          # Concept glossary
│   └── exam/              # Exam prep section
└── app.css                # Tailwind imports
```

### Pattern 1: Svelte 5 Runes for State
**What:** Use `$state`, `$derived`, `$effect` for reactive state
**When to use:** All component state in Svelte 5
**Example:**
```svelte
<script lang="ts">
  // Props with runes
  let { concept, animationSpeed = 1 } = $props();

  // Reactive state
  let currentStep = $state(0);
  let isPlaying = $state(false);

  // Derived values
  let progress = $derived(currentStep / totalSteps * 100);

  // Effects
  $effect(() => {
    if (isPlaying) {
      const timer = setInterval(() => currentStep++, 1000 / animationSpeed);
      return () => clearInterval(timer);
    }
  });
</script>
```

### Pattern 2: D3 for Math, Svelte for Rendering
**What:** Use D3 only for calculations (scales, paths), let Svelte render SVG
**When to use:** Any data visualization
**Example:**
```svelte
<script lang="ts">
  import { scaleLinear } from 'd3-scale';
  import { line } from 'd3-shape';

  let { data, width, height } = $props();

  // D3 does the math
  let xScale = $derived(scaleLinear().domain([0, data.length]).range([0, width]));
  let yScale = $derived(scaleLinear().domain([0, 100]).range([height, 0]));
  let pathD = $derived(line().x((d, i) => xScale(i)).y(d => yScale(d))(data));
</script>

<!-- Svelte renders the SVG -->
<svg {width} {height}>
  <path d={pathD} fill="none" stroke="currentColor" />
</svg>
```

### Pattern 3: Built-in Transitions for UI
**What:** Use Svelte's transition directives for enter/exit animations
**When to use:** Component mount/unmount, visibility toggles
**Example:**
```svelte
<script lang="ts">
  import { fade, fly, slide } from 'svelte/transition';
  import { Spring } from 'svelte/motion';

  let showDefinition = $state(false);
  const spring = new Spring(0);
</script>

{#if showDefinition}
  <div
    transition:fly={{ y: 20, duration: 300 }}
    class="definition-card"
  >
    <p>{concept.definition}</p>
  </div>
{/if}
```

### Pattern 4: GSAP Timeline for Educational Sequences
**What:** Use GSAP for multi-step animated explanations
**When to use:** "3Blue1Brown style" step-by-step concept reveals
**Example:**
```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';

  let container: HTMLElement;
  let timeline: gsap.core.Timeline;

  onMount(() => {
    timeline = gsap.timeline({ paused: true });

    timeline
      .from('.step-1', { opacity: 0, y: 20 })
      .from('.arrow', { scaleX: 0, transformOrigin: 'left' })
      .from('.step-2', { opacity: 0, y: 20 })
      .from('.equation', { opacity: 0, scale: 0.8 });

    return () => timeline.kill();
  });

  function play() { timeline.play(); }
  function reset() { timeline.restart().pause(); }
</script>
```

### Anti-Patterns to Avoid
- **Don't use React animation libraries (Framer Motion)** - They're React-specific, won't work in Svelte
- **Don't manipulate DOM directly with D3** - Let Svelte handle rendering, use D3 only for math
- **Don't fight Svelte's transition system** - Built-in transitions handle 80% of needs, reach for GSAP only for complex sequences
- **Don't use stores for animation values** - Use Spring/Tween classes or GSAP instead
</architecture_patterns>

<dont_hand_roll>
## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Spring animations | Custom physics | Svelte `Spring` class | Built-in, optimized, respects reduced motion |
| Easing functions | Custom math | Svelte easing or GSAP | Comprehensive library, battle-tested |
| SVG path animations | Manual stroke-dasharray | Svelte `draw` transition | Handles edge cases, timing |
| Data viz scales | Linear interpolation | d3-scale | Handles edge cases, nice ticks, domain clamping |
| Sequenced animations | setTimeout chains | GSAP timeline | Proper timing, cleanup, reversible |
| Causal diagrams | Custom graph layout | dagre + D3 or adapt DAGitty | Graph layout is hard, solved problem |
| Build/bundle | Custom webpack | Vite (via SvelteKit) | Zero-config, fast HMR |
| Routing | Custom router | SvelteKit file routing | Convention over configuration |

**Key insight:** Svelte chose to include animation primitives in the framework specifically because animation is hard to get right. The Spring class uses proper spring physics. The transition system handles mounting/unmounting edge cases. Trust these over custom solutions.
</dont_hand_roll>

<common_pitfalls>
## Common Pitfalls

### Pitfall 1: Using D3 for DOM Manipulation in Svelte
**What goes wrong:** D3's `select().append()` conflicts with Svelte's reactivity
**Why it happens:** D3 was designed for imperative DOM manipulation
**How to avoid:** Use D3 only for non-DOM modules (d3-scale, d3-shape, d3-array). Render with Svelte.
**Warning signs:** Elements duplicating, not updating on state changes, memory leaks

### Pitfall 2: Overusing GSAP for Simple Transitions
**What goes wrong:** Larger bundle, more complex code for simple fade/fly effects
**Why it happens:** GSAP is powerful, easy to reach for habitually
**How to avoid:** Start with Svelte built-ins. Only use GSAP for multi-step sequences.
**Warning signs:** Using GSAP for single element fade-ins, bundle size growing

### Pitfall 3: Forgetting Static Adapter Configuration
**What goes wrong:** Build works locally but Firebase deploy fails
**Why it happens:** SvelteKit defaults to auto-adapter, not static
**How to avoid:** Configure adapter-static in svelte.config.js from day 1
**Warning signs:** Dynamic imports in static routes, prerender errors

### Pitfall 4: TailwindCSS v4 @apply in Svelte Components
**What goes wrong:** @apply doesn't work in component `<style>` blocks
**Why it happens:** Tailwind v4 changed how @apply works
**How to avoid:** Use `@reference` directive or prefer inline utilities
**Warning signs:** Styles not applying, "unknown at-rule" errors

### Pitfall 5: Not Respecting Reduced Motion Preferences
**What goes wrong:** Animations cause issues for vestibular disorder users
**Why it happens:** Forgetting accessibility during animation-heavy development
**How to avoid:** Use `prefersReducedMotion` from svelte/motion, wrap animations
**Warning signs:** No reduced motion checks in animation code
</common_pitfalls>

<code_examples>
## Code Examples

### SvelteKit Static Site Config
```typescript
// svelte.config.js
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '404.html',
      precompress: false,
      strict: true
    })
  }
};
```

### Vite Config with Tailwind v4
```typescript
// vite.config.ts
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit(), tailwindcss()]
});
```

### Root Layout with Tailwind
```svelte
<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import '../app.css';
  let { children } = $props();
</script>

<div class="min-h-screen bg-slate-50">
  <nav class="border-b bg-white">
    <!-- Navigation -->
  </nav>
  <main>
    {@render children()}
  </main>
</div>
```

### Enable Prerendering for Static
```typescript
// src/routes/+layout.ts
export const prerender = true;
```

### Animated Concept Card Component
```svelte
<!-- src/lib/components/ConceptCard.svelte -->
<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import { Spring } from 'svelte/motion';

  let { concept, index = 0 } = $props();
  let expanded = $state(false);
  const spring = new Spring(0, { stiffness: 0.1, damping: 0.4 });

  $effect(() => {
    spring.target = expanded ? 1 : 0;
  });
</script>

<article
  class="rounded-lg bg-white p-6 shadow-sm"
  transition:fly={{ y: 20, delay: index * 100 }}
>
  <button onclick={() => expanded = !expanded}>
    <h3>{concept.term}</h3>
  </button>

  {#if expanded}
    <div transition:slide>
      <p class="text-slate-600">{concept.definition}</p>
    </div>
  {/if}
</article>
```
</code_examples>

<sota_updates>
## State of the Art (2025-2026)

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Svelte 4 stores | Svelte 5 runes ($state, $derived) | Oct 2024 | Universal reactivity, cleaner code |
| PostCSS for Tailwind | @tailwindcss/vite plugin | Jan 2024 | Simpler config, no autoprefixer needed |
| Framer Motion (React) | Motion.dev (framework agnostic) | 2025 | Now works beyond React |
| Custom SVG animation | Svelte draw transition | Built-in | Zero-config SVG path animation |
| adapter-auto | adapter-static for static sites | Always | Explicit is better for Firebase |

**New tools/patterns to consider:**
- **Svelte 5 runes:** Use $state instead of let, $derived instead of $:, $effect instead of reactive statements
- **Motion One:** Smaller alternative to GSAP with modern API, has Svelte bindings
- **LayerCake:** Svelte-native charting that works beautifully with D3 math

**Deprecated/outdated:**
- **Svelte stores for animations:** Use Spring/Tween classes instead
- **PostCSS config for Tailwind:** v4 uses Vite plugin, no postcss.config needed
- **Framer Motion:** React-only, use GSAP or Motion One for Svelte
</sota_updates>

<open_questions>
## Open Questions

1. **DAG visualization approach**
   - What we know: DAGitty is the gold standard for causal DAGs, works in browser
   - What's unclear: Best way to integrate DAGitty-style diagrams in Svelte (embed iframe vs recreate with D3)
   - Recommendation: Start with D3 + dagre for basic DAGs, evaluate DAGitty embedding for complex causal analysis features

2. **GSAP vs Motion One for educational animations**
   - What we know: Both work with Svelte. GSAP has more features (timeline), Motion One is smaller
   - What's unclear: Which is better for "3Blue1Brown style" step-by-step explanations
   - Recommendation: Start with GSAP for timeline control, can swap to Motion One if bundle size becomes concern
</open_questions>

<sources>
## Sources

### Primary (HIGH confidence)
- [Svelte official docs](https://svelte.dev/docs) - transitions, motion, runes
- [SvelteKit adapter-static](https://svelte.dev/docs/kit/adapter-static) - static site setup
- [TailwindCSS v4 Svelte guide](https://tailkit.com/blog/how-to-install-tailwind-css-v4-to-your-svelte-project)

### Secondary (MEDIUM confidence)
- [Frontend Framework Performance 2025-2026](https://www.frontendtools.tech/blog/best-frontend-frameworks-2025-comparison) - Svelte performance claims
- [Svelte + D3 best practices](https://blog.logrocket.com/data-visualization-svelte-d3/) - integration patterns
- [GSAP vs Motion comparison](https://motion.dev/docs/gsap-vs-motion) - animation library comparison
- [SvelteKit Firebase deployment](https://fireship.io/courses/sveltekit/deploy-sveltekit-firebase/)

### Tertiary (LOW confidence - needs validation)
- GSAP timeline patterns for educational content - will validate during implementation
</sources>

<metadata>
## Metadata

**Research scope:**
- Core technology: Svelte 5, SvelteKit 2
- Ecosystem: TailwindCSS 4, GSAP, D3, LayerCake
- Patterns: Runes, D3 math + Svelte render, GSAP timelines
- Pitfalls: D3 DOM conflicts, adapter config, reduced motion

**Confidence breakdown:**
- Standard stack: HIGH - verified with official docs, community consensus
- Architecture: HIGH - patterns from official Svelte docs
- Pitfalls: HIGH - documented in community, verified in docs
- Code examples: HIGH - from official sources and verified tutorials

**Research date:** 2026-01-18
**Valid until:** 2026-02-18 (30 days - Svelte ecosystem relatively stable)
</metadata>

---

*Phase: 01-foundation*
*Research completed: 2026-01-18*
*Ready for planning: yes*
