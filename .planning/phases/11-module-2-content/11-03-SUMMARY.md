---
phase: 11-module-2-content
plan: 03
status: complete
started: 2026-01-22
completed: 2026-01-22
---

# Plan 11-03 Summary: Lectures 5-6

## Objective
Create Lectures 5-6: Prediction vs Causality and AI Ethics.

## Accomplishments

### Task 1: Lecture 5 - Prediction and Causality
- Created `prediction-causality.ts` with 6 sections
- "Critical Difference" animated explanation (4 steps)
- Mobile advertising case study diagram
- "Combining ML + Causality" animated explanation (4 steps)
- Strategic integration comparison table
- Covered: prediction vs causality questions, causal counterfactuals, ML targeting research

### Task 2: Lecture 6 - AI Ethics
- Created `ai-ethics.ts` with 6 sections
- "Bias Amplification" animated explanation (4 steps)
- "Debiasing Trade-off" animated explanation (4 steps)
- Three fairness lessons summary
- Covered: Amazon hiring bias, COMPAS recidivism, demographic parity vs accuracy

### Task 3: Index Updates
- Added exports to `module2/index.ts`
- Marked lectures 5-6 as 'ready' in modules.ts

### Bug Fixes
- Added CSS styles for markdown tables (was rendering as plain text)
- Added title tooltip for truncated module names in sidebar
- Fixed module page reactivity for client-side navigation (URL changed but content didn't update)

## Commits
- `24a1143`: fix(11-03): add CSS styles for markdown tables
- `eb83241`: fix: add title tooltip for truncated module names in sidebar
- `14f0817`: fix: make module page reactive for client-side navigation

## Files Modified
- src/lib/content/module2/prediction-causality.ts
- src/lib/content/module2/ai-ethics.ts
- src/lib/content/module2/index.ts
- src/lib/data/modules.ts
- src/routes/module/[slug]/[lecture]/+page.svelte (table CSS)
- src/lib/components/navigation/Sidebar.svelte (tooltip)
- src/routes/module/[slug]/+page.svelte (reactivity fix)

## Verification
- [x] Lectures 5-6 show "Ready" badge
- [x] Prediction vs Causality animations work
- [x] AI Ethics animations work
- [x] Markdown tables render properly
- [x] Module name tooltip on hover works
- [x] Sidebar navigation between modules works
- [x] User approved

## Issues Encountered
- Markdown tables not styled - fixed with CSS
- Module names truncated without tooltip - fixed with title attribute
- Module page not updating on navigation - fixed with $derived()

## Next Phase Readiness
Ready for Plan 11-04: Lectures 7-8 (Smartwatch case study) + glossary + questions
