# Summary 09-02: Confounding Simulator

## Completed

Created interactive confounding bias visualization.

## Files Created

1. **`src/routes/explore/confounding/+page.svelte`**
   - Two-column layout (viz + controls)
   - Sliders for confounding, sample size, treatment effect
   - Dynamic explanations based on bias level

2. **`src/lib/components/explore/ConfoundingViz.svelte`**
   - Animated DAG (C → X, C → Y, X → Y)
   - D3.js scatter plot
   - GSAP animations for points

3. **`src/lib/components/explore/confounding.ts`**
   - generateConfoundedData function
   - calculateNaiveATE
   - getConfoundingExplanation

## Verification

- [x] /explore/confounding route works
- [x] DAG highlights confounding paths
- [x] Scatter plot updates smoothly
- [x] Explanations are contextual
- [x] Build passes
