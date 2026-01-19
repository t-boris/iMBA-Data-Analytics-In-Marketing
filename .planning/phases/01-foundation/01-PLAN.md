# Phase 1: Foundation - Plan 01

**Phase Goal:** Working development environment with chosen tech stack and Firebase project configured

**Plan Scope:** Complete project setup with SvelteKit 2, Svelte 5, TailwindCSS 4, and all core dependencies

## Prerequisites

- Node.js 18+ installed
- npm available
- Research completed (01-RESEARCH.md)

## Tasks

### Task 1: Create SvelteKit Project

**What:** Initialize new SvelteKit project with Svelte 5 and TypeScript

**Commands:**
```bash
npx sv create imba-study-app --template minimal --types ts
cd imba-study-app
```

**Acceptance:**
- [ ] Project directory created
- [ ] package.json exists with svelte 5.x and @sveltejs/kit 2.x
- [ ] TypeScript configured

### Task 2: Configure TailwindCSS 4

**What:** Add TailwindCSS v4 using the Svelte CLI addon

**Commands:**
```bash
npx sv add tailwindcss
```

**Files to verify:**
- vite.config.ts includes @tailwindcss/vite plugin
- app.css created with Tailwind imports

**Acceptance:**
- [ ] TailwindCSS 4.x installed
- [ ] Vite plugin configured (no PostCSS needed in v4)
- [ ] app.css imports Tailwind

### Task 3: Configure Static Adapter

**What:** Replace default adapter with adapter-static for Firebase deployment

**Install:**
```bash
npm install -D @sveltejs/adapter-static
```

**Update svelte.config.js:**
```javascript
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

**Create src/routes/+layout.ts:**
```typescript
export const prerender = true;
```

**Acceptance:**
- [ ] adapter-static installed
- [ ] svelte.config.js updated
- [ ] Prerender enabled in layout

### Task 4: Set Up Project Structure

**What:** Create the recommended directory structure from research

**Directories to create:**
```
src/
├── lib/
│   ├── components/
│   │   ├── diagrams/      # Causal diagram components
│   │   ├── animations/    # Animated explanation components
│   │   └── ui/            # Design system primitives
│   ├── content/           # Processed module content
│   │   └── module-1/      # Lecture data per module
│   ├── stores/            # Svelte stores for state
│   └── utils/             # Helper functions
```

**Acceptance:**
- [ ] All directories created
- [ ] .gitkeep files in empty directories

### Task 5: Install Core Dependencies

**What:** Install animation and visualization libraries from standard stack

**Commands:**
```bash
npm install gsap d3 layercake
npm install -D @types/d3
```

**Acceptance:**
- [ ] gsap 3.x installed
- [ ] d3 7.x installed
- [ ] layercake 8.x installed
- [ ] D3 types installed

### Task 6: Create Base Layout and Verify

**What:** Create root layout with Tailwind and verify development server

**Update src/routes/+layout.svelte:**
```svelte
<script lang="ts">
  import '../app.css';
  let { children } = $props();
</script>

<div class="min-h-screen bg-slate-50">
  <nav class="border-b bg-white px-6 py-4">
    <h1 class="text-xl font-semibold text-slate-900">iMBA Study App</h1>
  </nav>
  <main class="p-6">
    {@render children()}
  </main>
</div>
```

**Update src/routes/+page.svelte:**
```svelte
<script lang="ts">
  import { fly } from 'svelte/transition';
</script>

<div transition:fly={{ y: 20, duration: 300 }}>
  <h2 class="text-2xl font-bold text-slate-800 mb-4">
    Data Analytics in Marketing
  </h2>
  <p class="text-slate-600">
    Welcome to your visual learning companion for MBA 564A.
  </p>
</div>
```

**Verify:**
```bash
npm run dev
```

**Acceptance:**
- [ ] Dev server starts without errors
- [ ] Page renders with Tailwind styles
- [ ] Svelte transition works
- [ ] No console errors

## Verification

**Final checks:**
1. `npm run build` completes successfully
2. Build output in `build/` directory
3. Static HTML files generated

## Notes

- Using Svelte 5 runes syntax ($props, $state, etc.)
- TailwindCSS v4 uses Vite plugin, no postcss.config needed
- adapter-static configured for Firebase Hosting compatibility

---

*Created: 2026-01-18*
*Phase: 01-foundation*
*Research: 01-RESEARCH.md*
