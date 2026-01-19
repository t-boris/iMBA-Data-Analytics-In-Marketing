# iMBA Data Analytics in Marketing Study App

## What This Is

A modern, visually-oriented web application that helps iMBA students understand and master Data Analytics in Marketing concepts. The app transforms course notes into interactive visualizations, rich infographics, and animated explanations designed for visual learners. Covers 8 course modules with emphasis on causal analysis, experimentation, and marketing analytics methods.

## Core Value

Make abstract statistical and causal inference concepts crystal clear through visual explanations, interactive exploration, and comprehensive exam preparation — so students truly understand the "why" behind the methods, not just memorize formulas.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Module-based navigation for 8 course modules
- [ ] Interactive causal diagrams (confounds, treatment effects, DAGs)
- [ ] Animated step-by-step explanations (3Blue1Brown style)
- [ ] Rich infographic summaries for each concept
- [ ] Exam review section with questions and answers per module
- [ ] Concept glossary with visual definitions
- [ ] Interactive data exploration (manipulate variables, see effects)
- [ ] Responsive modern UI optimized for desktop study sessions
- [ ] Module 1 content: Causal Analysis (introduction, key thinkers, RCTs, matching, IV, DID, field experiments, Python demo)

### Out of Scope

- User accounts/authentication — no login, no saved progress (v1 is anonymous access)
- Discussion/social features — no comments, forums, or peer interaction (focus on content, not community)
- Mobile native apps — web only, responsive but not native iOS/Android
- Backend user data storage — static content delivery only
- Real-time collaboration — individual study tool

## Context

**Course:** UIUC iMBA - Applying Data Analytics in Marketing (MBA 564A) - Spring 2026

**Content source:** User-provided course notes in Markdown format, bilingual (Russian explanations, English technical definitions). Notes will be transformed into English-only visual content.

**Module 1 topics confirmed:**
- Causal Analysis fundamentals (confounds, spurious correlation, selection bias)
- Key thinkers (Neyman, Rubin, Pearl, Angrist/Card/Imbens)
- Randomized Experiments & A/B Testing
- Matching Methods (PSM, IPW, Synthetic Control)
- Instrumental Variables (2SLS)
- Difference-in-Differences
- Field Experiments (Swedish grocery store case)
- Python implementation demos

**Target users:** iMBA classmates studying the same course

**Visual learning emphasis:** Users are visual learners who need diagrams, animations, and infographics to grasp statistical concepts that can feel abstract when presented as formulas alone.

## Constraints

- **Hosting**: Firebase — must deploy to Firebase Hosting
- **Content delivery**: Static site preferred (no server-side rendering requirements)
- **Content source**: Notes provided by user for each module — Claude processes and transforms into visual explanations

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| English-only content | Simplify UX, target audience comfortable with English technical content | — Pending |
| Firebase hosting | User preference, good free tier, CDN included | — Pending |
| Static site architecture | No user data to store, simpler deployment, faster performance | — Pending |
| All three pillars equally prioritized (visualization, exam prep, interactivity) | User considers them inseparable for effective learning | — Pending |

---
*Last updated: 2026-01-18 after initialization*
