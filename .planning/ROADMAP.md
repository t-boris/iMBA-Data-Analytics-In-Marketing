# Roadmap: iMBA Data Analytics in Marketing Study App

## Overview

Transform course notes into a modern visual learning platform. Start with technical foundation and design system, build the core visualization and animation engines, then populate with Module 1 content. Add exam preparation and glossary features, then polish and deploy to Firebase. Future modules (2-8) will follow the same content pipeline after v1 ships.

## Domain Expertise

None

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

- [x] **Phase 1: Foundation** — Project setup, tech stack, Firebase config
- [ ] **Phase 2: Design System** — Visual components, typography, color palette, layout primitives
- [ ] **Phase 3: Core Navigation** — Module structure, routing, navigation UI
- [ ] **Phase 4: Visualization Engine** — Interactive diagram components, causal graph rendering
- [ ] **Phase 5: Animation System** — Step-by-step animated explanations framework
- [ ] **Phase 6: Module 1 Content** — Causal Analysis (all 8 lectures transformed to visual content)
- [ ] **Phase 7: Exam Preparation** — Review questions, flashcards, self-assessment features
- [ ] **Phase 8: Concept Glossary** — Searchable visual definitions dictionary
- [ ] **Phase 9: Interactive Exploration** — Data manipulation tools, "what-if" scenarios
- [ ] **Phase 10: Polish & Deploy** — Performance optimization, Firebase deployment, final testing

## Phase Details

### Phase 1: Foundation
**Goal**: Working development environment with chosen tech stack and Firebase project configured
**Depends on**: Nothing (first phase)
**Research**: Likely (tech stack decision)
**Research topics**: React vs Vue vs Svelte for visual-heavy app, animation library ecosystem, Firebase SDK setup
**Plans**: TBD

### Phase 2: Design System
**Goal**: Complete design system with reusable visual components ready for content
**Depends on**: Phase 1
**Research**: Unlikely (internal UI patterns)
**Plans**: TBD

### Phase 3: Core Navigation
**Goal**: Working module navigation with 8-module structure and responsive layout
**Depends on**: Phase 2
**Research**: Unlikely (standard routing patterns)
**Plans**: TBD

### Phase 4: Visualization Engine
**Goal**: Reusable components for causal diagrams, DAGs, flowcharts, and treatment effect visualizations
**Depends on**: Phase 2
**Research**: Likely (visualization libraries)
**Research topics**: D3.js vs vis.js vs react-flow for DAG rendering, SVG vs Canvas approach, accessibility for diagrams
**Plans**: TBD

### Phase 5: Animation System
**Goal**: Framework for step-by-step animated explanations (3Blue1Brown style)
**Depends on**: Phase 4
**Research**: Likely (animation libraries)
**Research topics**: Framer Motion vs GSAP vs Motion One, sequenced animations, scroll-triggered animations
**Plans**: TBD

### Phase 6: Module 1 Content
**Goal**: Complete Module 1 (Causal Analysis) with all 8 lectures transformed into visual content
**Depends on**: Phase 5
**Research**: Unlikely (content transformation from provided notes)
**Plans**: TBD

Lectures to cover:
- Introduction to Causal Analysis
- Key Thinkers (Neyman, Rubin, Pearl)
- Randomized Experiments
- Matching Methods
- Instrumental Variables
- Field Experiment Example
- Difference-in-Differences
- Python Demo (DID)

### Phase 7: Exam Preparation
**Goal**: Review questions section with per-module Q&A and self-assessment features
**Depends on**: Phase 6
**Research**: Unlikely (internal feature)
**Plans**: TBD

### Phase 8: Concept Glossary
**Goal**: Searchable glossary with visual definitions for all Module 1 concepts
**Depends on**: Phase 6
**Research**: Unlikely (internal feature)
**Plans**: TBD

### Phase 9: Interactive Exploration
**Goal**: Tools for manipulating variables and seeing causal effects in action
**Depends on**: Phase 4, Phase 6
**Research**: Likely (interactive data visualization)
**Research topics**: Interactive regression visualizers, simulated experiment tools, parameter sliders with real-time updates
**Plans**: TBD

### Phase 10: Polish & Deploy
**Goal**: Production-ready app deployed to Firebase with optimized performance
**Depends on**: All previous phases
**Research**: Likely (Firebase deployment)
**Research topics**: Firebase Hosting setup, build optimization, CDN configuration, analytics integration
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 1/1 | Complete | 2026-01-18 |
| 2. Design System | 2/5 | In progress | - |
| 3. Core Navigation | 0/TBD | Not started | - |
| 4. Visualization Engine | 0/TBD | Not started | - |
| 5. Animation System | 0/TBD | Not started | - |
| 6. Module 1 Content | 0/TBD | Not started | - |
| 7. Exam Preparation | 0/TBD | Not started | - |
| 8. Concept Glossary | 0/TBD | Not started | - |
| 9. Interactive Exploration | 0/TBD | Not started | - |
| 10. Polish & Deploy | 0/TBD | Not started | - |
