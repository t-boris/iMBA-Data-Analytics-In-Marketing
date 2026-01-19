/**
 * Method Comparison Scenarios and Estimators
 *
 * Provides data generation and estimation functions for comparing
 * RCT, Matching, and Difference-in-Differences methods under different conditions.
 */

import { seededRandom, randomNormal } from '$lib/explore/simulation';

export interface DataPoint {
  id: number;
  treatment: boolean;
  outcome: number;
  confounder: number;
  prePeriodOutcome?: number;
  postPeriodOutcome?: number;
  timeTrend?: number;
}

export interface MethodEstimate {
  name: string;
  estimate: number;
  assumptionMet: boolean;
  assumptionLabel: string;
  confidence: 'high' | 'medium' | 'low';
  explanation: string;
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  assumptions: {
    rct: boolean;       // randomization holds
    matching: boolean;  // no unobserved confounders
    did: boolean;       // parallel trends holds
  };
  generateData: (seed?: number) => { data: DataPoint[], trueATE: number };
}

/**
 * Box-Muller transform to generate standard normal random variates with seeding.
 */
function seededRandomNormal(rand: () => number): number {
  const u1 = rand();
  const u2 = rand();
  return Math.sqrt(-2 * Math.log(u1 || 0.0001)) * Math.cos(2 * Math.PI * u2);
}

/**
 * Logistic function for probability calculation.
 */
function logistic(x: number): number {
  return 1 / (1 + Math.exp(-x));
}

// ============================================
// SCENARIO DEFINITIONS
// ============================================

/**
 * Ideal Conditions Scenario
 * All methods work correctly - randomized treatment, observed confounders, parallel trends.
 */
function generateIdealData(seed: number = 42): { data: DataPoint[], trueATE: number } {
  const rand = seededRandom(seed);
  const n = 200;
  const trueATE = 5;
  const baseOutcome = 50;
  const data: DataPoint[] = [];

  for (let i = 0; i < n; i++) {
    // Confounder exists but is observed and balanced
    const confounder = seededRandomNormal(rand) * 10 + 50;

    // Random treatment assignment (50/50) - NOT based on confounder
    const treatment = rand() < 0.5;

    // Pre-period outcome (for DID)
    const prePeriodNoise = seededRandomNormal(rand) * 5;
    const prePeriodOutcome = baseOutcome + confounder * 0.3 + prePeriodNoise;

    // Same time trend for both groups (parallel trends hold)
    const timeTrend = 10;

    // Post-period outcome
    const postPeriodNoise = seededRandomNormal(rand) * 5;
    const postPeriodOutcome = prePeriodOutcome + timeTrend +
                              (treatment ? trueATE : 0) + postPeriodNoise;

    // Current outcome (what we observe in cross-section)
    const outcome = postPeriodOutcome;

    data.push({
      id: i,
      treatment,
      outcome,
      confounder,
      prePeriodOutcome,
      postPeriodOutcome,
      timeTrend
    });
  }

  return { data, trueATE };
}

/**
 * Selection Bias Scenario
 * Treatment is assigned based on an observable characteristic.
 * RCT assumption violated (in observational context), but matching can work.
 */
function generateSelectionBiasData(seed: number = 42): { data: DataPoint[], trueATE: number } {
  const rand = seededRandom(seed);
  const n = 200;
  const trueATE = 5;
  const baseOutcome = 50;
  const data: DataPoint[] = [];

  for (let i = 0; i < n; i++) {
    // Observable confounder (e.g., income level)
    const confounder = seededRandomNormal(rand) * 15 + 50;

    // Treatment probability depends on confounder
    // Higher confounder -> more likely to be treated
    const treatmentProb = logistic((confounder - 50) * 0.15);
    const treatment = rand() < treatmentProb;

    // Pre-period outcome affected by confounder
    const prePeriodNoise = seededRandomNormal(rand) * 5;
    const prePeriodOutcome = baseOutcome + confounder * 0.4 + prePeriodNoise;

    // Parallel trends still hold (for DID comparison)
    const timeTrend = 10;

    // Post-period outcome
    const postPeriodNoise = seededRandomNormal(rand) * 5;
    const postPeriodOutcome = prePeriodOutcome + timeTrend +
                              (treatment ? trueATE : 0) + postPeriodNoise;

    const outcome = postPeriodOutcome;

    data.push({
      id: i,
      treatment,
      outcome,
      confounder,
      prePeriodOutcome,
      postPeriodOutcome,
      timeTrend
    });
  }

  return { data, trueATE };
}

/**
 * Unobserved Confounder Scenario
 * There's a hidden variable affecting both treatment and outcome.
 * Only RCT would work (if we could randomize), matching fails.
 */
function generateUnobservedConfounderData(seed: number = 42): { data: DataPoint[], trueATE: number } {
  const rand = seededRandom(seed);
  const n = 200;
  const trueATE = 5;
  const baseOutcome = 50;
  const data: DataPoint[] = [];

  for (let i = 0; i < n; i++) {
    // Observable confounder
    const observedConfounder = seededRandomNormal(rand) * 10 + 50;

    // UNOBSERVED confounder - this is the hidden variable
    const unobservedConfounder = seededRandomNormal(rand) * 15;

    // Treatment depends on UNOBSERVED confounder
    const treatmentProb = logistic(unobservedConfounder * 0.2);
    const treatment = rand() < treatmentProb;

    // Pre-period outcome affected by BOTH confounders
    const prePeriodNoise = seededRandomNormal(rand) * 5;
    const prePeriodOutcome = baseOutcome +
                             observedConfounder * 0.2 +
                             unobservedConfounder * 0.5 +
                             prePeriodNoise;

    // Parallel trends still hold
    const timeTrend = 10;

    // Post-period outcome - unobserved confounder affects outcome
    const postPeriodNoise = seededRandomNormal(rand) * 5;
    const postPeriodOutcome = prePeriodOutcome + timeTrend +
                              (treatment ? trueATE : 0) +
                              unobservedConfounder * 0.3 + // Ongoing effect
                              postPeriodNoise;

    const outcome = postPeriodOutcome;

    // We only "observe" the observed confounder
    data.push({
      id: i,
      treatment,
      outcome,
      confounder: observedConfounder,
      prePeriodOutcome,
      postPeriodOutcome,
      timeTrend
    });
  }

  return { data, trueATE };
}

/**
 * Differential Trends Scenario
 * Treatment and control groups have different underlying time trends.
 * DID fails, but RCT and matching may work for cross-sectional estimates.
 */
function generateDifferentialTrendsData(seed: number = 42): { data: DataPoint[], trueATE: number } {
  const rand = seededRandom(seed);
  const n = 200;
  const trueATE = 5;
  const baseOutcome = 50;
  const data: DataPoint[] = [];

  for (let i = 0; i < n; i++) {
    // Confounder affects who gets treated (selection bias)
    const confounder = seededRandomNormal(rand) * 15 + 50;

    // Treatment assigned based on confounder (selection bias)
    const treatmentProb = logistic((confounder - 50) * 0.1);
    const treatment = rand() < treatmentProb;

    // Pre-period outcome
    const prePeriodNoise = seededRandomNormal(rand) * 5;
    const prePeriodOutcome = baseOutcome + confounder * 0.3 + prePeriodNoise;

    // DIFFERENTIAL time trends - treated group grows faster even without treatment
    // This violates parallel trends assumption
    const timeTrend = treatment ? 15 : 8; // Different trends!

    // Post-period outcome
    const postPeriodNoise = seededRandomNormal(rand) * 5;
    const postPeriodOutcome = prePeriodOutcome + timeTrend +
                              (treatment ? trueATE : 0) + postPeriodNoise;

    const outcome = postPeriodOutcome;

    data.push({
      id: i,
      treatment,
      outcome,
      confounder,
      prePeriodOutcome,
      postPeriodOutcome,
      timeTrend
    });
  }

  return { data, trueATE };
}

// ============================================
// EXPORT SCENARIOS
// ============================================

export const scenarios: Scenario[] = [
  {
    id: 'ideal',
    name: 'Ideal Conditions',
    description: 'All methods work - random assignment, observed confounders, parallel trends',
    assumptions: {
      rct: true,
      matching: true,
      did: true
    },
    generateData: generateIdealData
  },
  {
    id: 'selection-bias',
    name: 'Selection Bias',
    description: 'Treatment is assigned based on observable characteristics (non-random)',
    assumptions: {
      rct: false,      // No randomization
      matching: true,  // Confounders are observed
      did: true        // Parallel trends hold
    },
    generateData: generateSelectionBiasData
  },
  {
    id: 'unobserved-confounder',
    name: 'Unobserved Confounder',
    description: 'Hidden variable affects both treatment selection and outcomes',
    assumptions: {
      rct: false,      // No randomization
      matching: false, // Can\'t match on unobserved
      did: true        // Parallel trends hold
    },
    generateData: generateUnobservedConfounderData
  },
  {
    id: 'differential-trends',
    name: 'Differential Trends',
    description: 'Treatment and control groups have different underlying time trends',
    assumptions: {
      rct: false,      // Selection bias present
      matching: true,  // Confounders observed
      did: false       // Parallel trends violated
    },
    generateData: generateDifferentialTrendsData
  }
];

// ============================================
// ESTIMATORS
// ============================================

/**
 * RCT Estimator - Simple difference in means
 * Valid when treatment is randomly assigned.
 */
export function estimateRCT(data: DataPoint[]): number {
  const treated = data.filter(d => d.treatment);
  const control = data.filter(d => !d.treatment);

  if (treated.length === 0 || control.length === 0) return 0;

  const meanTreated = treated.reduce((sum, d) => sum + d.outcome, 0) / treated.length;
  const meanControl = control.reduce((sum, d) => sum + d.outcome, 0) / control.length;

  return meanTreated - meanControl;
}

/**
 * Matching Estimator - Match on observed confounder
 * Uses simple nearest-neighbor matching on the confounder.
 * Valid when all confounders are observed.
 */
export function estimateMatching(data: DataPoint[]): number {
  const treated = data.filter(d => d.treatment);
  const control = data.filter(d => !d.treatment);

  if (treated.length === 0 || control.length === 0) return 0;

  // For each treated unit, find nearest control on confounder
  let totalEffect = 0;
  let matchedCount = 0;

  for (const t of treated) {
    // Find nearest control
    let nearestControl: DataPoint | null = null;
    let minDistance = Infinity;

    for (const c of control) {
      const distance = Math.abs(t.confounder - c.confounder);
      if (distance < minDistance) {
        minDistance = distance;
        nearestControl = c;
      }
    }

    if (nearestControl && minDistance < 10) { // Only use close matches
      totalEffect += t.outcome - nearestControl.outcome;
      matchedCount++;
    }
  }

  return matchedCount > 0 ? totalEffect / matchedCount : estimateRCT(data);
}

/**
 * Difference-in-Differences Estimator
 * Computes (post_treated - pre_treated) - (post_control - pre_control)
 * Valid when parallel trends assumption holds.
 */
export function estimateDID(data: DataPoint[]): number {
  const treated = data.filter(d => d.treatment && d.prePeriodOutcome !== undefined);
  const control = data.filter(d => !d.treatment && d.prePeriodOutcome !== undefined);

  if (treated.length === 0 || control.length === 0) return estimateRCT(data);

  // Calculate pre-post difference for treated
  const treatedPreMean = treated.reduce((sum, d) => sum + (d.prePeriodOutcome || 0), 0) / treated.length;
  const treatedPostMean = treated.reduce((sum, d) => sum + d.outcome, 0) / treated.length;
  const treatedDiff = treatedPostMean - treatedPreMean;

  // Calculate pre-post difference for control
  const controlPreMean = control.reduce((sum, d) => sum + (d.prePeriodOutcome || 0), 0) / control.length;
  const controlPostMean = control.reduce((sum, d) => sum + d.outcome, 0) / control.length;
  const controlDiff = controlPostMean - controlPreMean;

  // DID estimate
  return treatedDiff - controlDiff;
}

/**
 * Get all method estimates for a given dataset and scenario.
 */
export function getAllEstimates(
  data: DataPoint[],
  trueATE: number,
  scenario: Scenario
): MethodEstimate[] {
  const rctEstimate = estimateRCT(data);
  const matchingEstimate = estimateMatching(data);
  const didEstimate = estimateDID(data);

  // Helper to determine confidence level based on how close estimate is to truth
  const getConfidence = (estimate: number, assumptionMet: boolean): 'high' | 'medium' | 'low' => {
    if (!assumptionMet) return 'low';
    const error = Math.abs(estimate - trueATE);
    const errorPercent = (error / Math.abs(trueATE)) * 100;
    if (errorPercent < 15) return 'high';
    if (errorPercent < 30) return 'medium';
    return 'low';
  };

  return [
    {
      name: 'RCT',
      estimate: rctEstimate,
      assumptionMet: scenario.assumptions.rct,
      assumptionLabel: 'Random Assignment',
      confidence: getConfidence(rctEstimate, scenario.assumptions.rct),
      explanation: scenario.assumptions.rct
        ? 'Randomization ensures unbiased estimate through balance of confounders.'
        : 'Without randomization, simple mean difference captures confounding bias.'
    },
    {
      name: 'Matching',
      estimate: matchingEstimate,
      assumptionMet: scenario.assumptions.matching,
      assumptionLabel: 'No Unobserved Confounders',
      confidence: getConfidence(matchingEstimate, scenario.assumptions.matching),
      explanation: scenario.assumptions.matching
        ? 'Matching on observed confounders blocks backdoor paths.'
        : 'Unobserved confounders create bias that matching cannot fix.'
    },
    {
      name: 'DID',
      estimate: didEstimate,
      assumptionMet: scenario.assumptions.did,
      assumptionLabel: 'Parallel Trends',
      confidence: getConfidence(didEstimate, scenario.assumptions.did),
      explanation: scenario.assumptions.did
        ? 'Parallel trends allow differencing out time-invariant confounding.'
        : 'Different pre-treatment trends make DID estimates unreliable.'
    }
  ];
}

/**
 * Get the best performing method for a scenario.
 */
export function getBestMethod(estimates: MethodEstimate[], trueATE: number): MethodEstimate {
  return estimates.reduce((best, current) => {
    const bestError = Math.abs(best.estimate - trueATE);
    const currentError = Math.abs(current.estimate - trueATE);
    return currentError < bestError ? current : best;
  });
}

/**
 * Get explanation for why the best method works.
 */
export function getWinnerExplanation(scenario: Scenario, bestMethod: MethodEstimate): string {
  const explanations: Record<string, Record<string, string>> = {
    'ideal': {
      'RCT': 'With random assignment, simple mean comparison gives the causal effect.',
      'Matching': 'Matching works perfectly when confounders are observed and balanced.',
      'DID': 'Parallel trends plus no time-varying confounders allows DID to work.'
    },
    'selection-bias': {
      'RCT': 'The naive estimate is biased due to selection on observables.',
      'Matching': 'Matching adjusts for the observed selection bias effectively.',
      'DID': 'DID can work here since parallel trends still hold.'
    },
    'unobserved-confounder': {
      'RCT': 'Without randomization, we cannot control for the hidden confounder.',
      'Matching': 'Matching fails because we cannot match on what we cannot observe.',
      'DID': 'DID can help if the unobserved confounder is time-invariant.'
    },
    'differential-trends': {
      'RCT': 'Cross-sectional estimates are biased due to selection.',
      'Matching': 'Matching helps with cross-sectional selection bias.',
      'DID': 'DID fails dramatically when trends differ between groups.'
    }
  };

  return explanations[scenario.id]?.[bestMethod.name] ||
         `${bestMethod.name} provides the most accurate estimate in this scenario.`;
}
