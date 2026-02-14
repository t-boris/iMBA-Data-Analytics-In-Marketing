# iMBA Data Analytics in Marketing Study App

## What This Is

A modern, visually-oriented web application that helps iMBA students understand and master Data Analytics in Marketing concepts. The app transforms course notes into interactive visualizations, rich infographics, and animated explanations. Features all 4 course modules with exam prep, glossary, and interactive exploration tools.

## Core Value

Make abstract statistical and causal inference concepts crystal clear through visual explanations, interactive exploration, and comprehensive exam preparation — so students truly understand the "why" behind the methods, not just memorize formulas.

## Requirements

### Validated

- [x] Module-based navigation for 4 course modules — v1.2
- [x] Interactive causal diagrams (confounds, treatment effects, DAGs) — v1.0
- [x] Animated step-by-step explanations (3Blue1Brown style) — v1.0
- [x] Rich infographic summaries for each concept — v1.0
- [x] Exam review section with questions and answers per module — v1.0
- [x] Concept glossary with visual definitions — v1.0
- [x] Interactive data exploration (manipulate variables, see effects) — v1.0
- [x] Responsive modern UI optimized for desktop study sessions — v1.0
- [x] Module 1 content: Causal Analysis (8 lectures) — v1.0
- [x] Module 2 content: AI, Prediction & Machine Learning (8 lectures) — v1.1
- [x] Module 3 content: User, Firm & AI-Generated Content (10 lectures) — v1.2
- [x] Module 4 content: Customer Preferences and Lifetime Value Analysis (8 lectures) — v1.2

### Active

None — course content complete.

### Out of Scope

- User accounts/authentication — no login, no saved progress (anonymous access)
- Discussion/social features — no comments, forums, or peer interaction (focus on content, not community)
- Mobile native apps — web only, responsive but not native iOS/Android
- Backend user data storage — static content delivery only
- Real-time collaboration — individual study tool

## Context

**Course:** UIUC iMBA - Applying Data Analytics in Marketing (MBA 564A) - Spring 2026

**Current State (v1.2):**
- 4 complete modules, 34 total lectures
- ~200 exam prep questions, ~150 glossary concepts
- Tech stack: SvelteKit 2, Svelte 5, TailwindCSS 4, GSAP, D3.js, LayerCake
- Deployed to Firebase Hosting: https://data-analytics-mktg.web.app
- 88 files, ~19,000 lines of Svelte/TypeScript

**Target users:** iMBA classmates studying the same course

**Visual learning emphasis:** Users are visual learners who need diagrams, animations, and infographics to grasp statistical concepts that can feel abstract when presented as formulas alone.

## Constraints

- **Hosting**: Firebase — deployed to Firebase Hosting
- **Content delivery**: Static site (no server-side rendering)
- **Content source**: Notes provided by user for each module — Claude processes and transforms into visual explanations

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| SvelteKit 2 + Svelte 5 | Modern framework with best-in-class reactivity and SSG support | Good |
| TailwindCSS 4 Vite plugin | No PostCSS config needed, CSS-native approach | Good |
| adapter-static for Firebase | Full static site generation for CDN delivery | Good |
| GSAP + D3 + LayerCake | Comprehensive visualization stack for animations and data viz | Good |
| GSAP timeline with step labels | Precise seek operations for step-based animations | Good |
| Svelte context API for controls | Clean component communication without prop drilling | Good |
| English-only content | Simplify UX, target audience comfortable with English technical content | Good |
| 4-module course structure | Course confirmed as 4 modules, removed placeholders 5-8 | Good |

---
*Last updated: 2026-02-14 after v1.2 milestone*
