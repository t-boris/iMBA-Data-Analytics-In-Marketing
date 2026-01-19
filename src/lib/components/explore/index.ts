// Interactive exploration components
export { default as ParameterSlider } from './ParameterSlider.svelte';
export { default as ResultsPanel } from './ResultsPanel.svelte';
export { default as ConfoundingViz } from './ConfoundingViz.svelte';
export { default as MethodComparisonViz } from './MethodComparisonViz.svelte';

// Utilities - confounding module
export {
  generateConfoundedData,
  calculateNaiveATE,
  calculateStats,
  getConfoundingExplanation,
  type DataPoint as ConfoundingDataPoint
} from './confounding';

// Utilities - method scenarios module
export {
  scenarios,
  getAllEstimates,
  getBestMethod,
  getWinnerExplanation,
  estimateRCT,
  estimateMatching,
  estimateDID,
  type DataPoint as MethodDataPoint,
  type Scenario,
  type MethodEstimate
} from './methodScenarios';
