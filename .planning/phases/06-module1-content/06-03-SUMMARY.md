---
plan: 06-03
status: complete
completed: 2026-01-19
---

## Summary

Created Lectures 4-5 for Module 1 (Causal Analysis): Matching Methods and Instrumental Variables.

## What Was Done

### 1. Animation Presets Added

Added two new animation preset functions to `/src/lib/components/animation/presets/index.ts`:

**`createMatchingExplanation()`** - 6-step animated explanation of propensity score matching:
1. Imbalanced Groups - Shows treated and control groups with different characteristics
2. Groups Not Comparable - Illustrates the problem of unfair comparison
3. Propensity Scores - Introduces P(T=1|X) as a summary score
4. Matching Process - Shows pairing units with similar scores
5. Balanced Groups - Result of matching
6. ATT Calculation - Average Treatment Effect on the Treated

**`createIVExplanation()`** - 5-step animated explanation of instrumental variables:
1. Endogeneity Problem - Unobserved confounder U affects both X and Y
2. Introduce Instrument - Z affects X but not Y directly
3. Exclusion Restriction - Z -> X -> Y only pathway
4. Two-Stage Least Squares - Stage 1: predict X from Z; Stage 2: use X-hat for Y
5. Causal Effect Identified - LATE for compliers

### 2. Lecture 4: Matching Methods

Created `/src/lib/content/module1/matching-methods.ts` with 6 sections:
- When RCTs Aren't Possible (text)
- Understanding Matching (animated explanation using createMatchingExplanation())
- Propensity Score Matching (PSM) (diagram + text)
- Inverse Probability Weighting (IPW) (diagram + text)
- Synthetic Control Method (diagram + text)
- Limitations and Assumptions (text)

### 3. Lecture 5: Instrumental Variables

Created `/src/lib/content/module1/instrumental-variables.ts` with 6 sections:
- The Endogeneity Problem (text)
- Understanding Instrumental Variables (animated explanation using createIVExplanation())
- Classic Example: Card (1995) (diagram + text on distance to college)
- Two-Stage Least Squares (2SLS) (diagram + text)
- Finding Valid Instruments (diagram + text on criteria)
- IV Applications in Marketing (text with practical examples)

### 4. Exports and Status Updates

- Updated `/src/lib/content/module1/index.ts` to export:
  - `matchingMethodsContent`
  - `instrumentalVariablesContent`

- Updated `/src/lib/data/modules.ts`:
  - Lecture 1-4 (Matching Methods): status changed from 'coming-soon' to 'ready'
  - Lecture 1-5 (Instrumental Variables): status changed from 'coming-soon' to 'ready'

## Files Modified

- `/src/lib/components/animation/presets/index.ts` - Added 2 new preset functions
- `/src/lib/content/module1/matching-methods.ts` - New file (Lecture 4)
- `/src/lib/content/module1/instrumental-variables.ts` - New file (Lecture 5)
- `/src/lib/content/module1/index.ts` - Added exports
- `/src/lib/data/modules.ts` - Updated lecture statuses

## Verification

- `npm run build` completed successfully
- No TypeScript errors
- All presets export correctly
- Module 1 now has 5 ready lectures (1-5)

## Notes

- Both lectures include practical marketing examples throughout
- Matching Methods covers PSM, IPW, and Synthetic Control (three main approaches)
- IV lecture includes the famous Card (1995) distance-to-college example
- Animation presets follow the same pattern as existing presets (confounding, RCT, treatment effect, DID)
- Content structure matches the template from introduction.ts
