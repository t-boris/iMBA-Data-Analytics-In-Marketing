/**
 * Data generation and statistical utilities for the confounding simulator.
 */

export interface DataPoint {
  id: number;
  confounder: number;
  treatment: 0 | 1;
  outcome: number;
}

/**
 * Box-Muller transform to generate standard normal random variates.
 */
function randomNormal(): number {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

/**
 * Standard logistic function.
 */
function logistic(x: number): number {
  return 1 / (1 + Math.exp(-x));
}

/**
 * Generates confounded data for the simulator.
 *
 * Data generating process:
 * - C ~ Normal(0, 1)                             [Confounder]
 * - P(T=1|C) = logistic(confoundingStrength * C) [Treatment depends on C]
 * - Y = baseIntercept + treatmentEffect * T + confoundingStrength * C + noise
 *
 * This creates a classic confounding structure where C affects both T and Y.
 *
 * @param n - Sample size
 * @param confoundingStrength - Strength of confounding (0 to 1)
 * @param treatmentEffect - True causal effect of treatment on outcome
 * @returns Array of data points
 */
export function generateConfoundedData(
  n: number,
  confoundingStrength: number,
  treatmentEffect: number
): DataPoint[] {
  const data: DataPoint[] = [];
  const baseIntercept = 5; // Baseline outcome level
  const noiseScale = 1; // Standard deviation of outcome noise

  // Scale confounding strength for more visible effect (0-1 maps to 0-3)
  const scaledConfounding = confoundingStrength * 3;

  for (let i = 0; i < n; i++) {
    // Generate confounder from standard normal
    const confounder = randomNormal();

    // Treatment probability depends on confounder
    const treatmentProb = logistic(scaledConfounding * confounder);
    const treatment = Math.random() < treatmentProb ? 1 : 0;

    // Outcome depends on both treatment and confounder
    const noise = randomNormal() * noiseScale;
    const outcome = baseIntercept +
                   treatmentEffect * treatment +
                   scaledConfounding * confounder +
                   noise;

    data.push({
      id: i,
      confounder,
      treatment: treatment as 0 | 1,
      outcome
    });
  }

  return data;
}

/**
 * Calculates the naive ATE estimate (simple difference in means).
 * This estimate is biased when there is confounding.
 */
export function calculateNaiveATE(data: DataPoint[]): number {
  const treated = data.filter(d => d.treatment === 1);
  const control = data.filter(d => d.treatment === 0);

  if (treated.length === 0 || control.length === 0) {
    return 0;
  }

  const meanTreated = treated.reduce((sum, d) => sum + d.outcome, 0) / treated.length;
  const meanControl = control.reduce((sum, d) => sum + d.outcome, 0) / control.length;

  return meanTreated - meanControl;
}

/**
 * Calculates summary statistics for a data array.
 */
export function calculateStats(data: DataPoint[]): {
  n: number;
  nTreated: number;
  nControl: number;
  meanOutcome: number;
  meanConfounder: number;
} {
  const treated = data.filter(d => d.treatment === 1);
  const control = data.filter(d => d.treatment === 0);

  return {
    n: data.length,
    nTreated: treated.length,
    nControl: control.length,
    meanOutcome: data.reduce((sum, d) => sum + d.outcome, 0) / data.length,
    meanConfounder: data.reduce((sum, d) => sum + d.confounder, 0) / data.length
  };
}

/**
 * Gets explanation text based on confounding strength.
 */
export function getConfoundingExplanation(confoundingStrength: number): {
  title: string;
  description: string;
  severity: 'none' | 'low' | 'moderate' | 'high';
} {
  if (confoundingStrength < 0.1) {
    return {
      title: 'No Confounding',
      description: 'The naive estimate is unbiased because treatment assignment is nearly random with respect to the outcome.',
      severity: 'none'
    };
  } else if (confoundingStrength < 0.4) {
    return {
      title: 'Mild Confounding',
      description: 'There is some bias in the naive estimate. The confounder slightly influences who receives treatment.',
      severity: 'low'
    };
  } else if (confoundingStrength < 0.7) {
    return {
      title: 'Moderate Confounding',
      description: 'The naive estimate is noticeably biased. The confounder creates a systematic difference between treatment groups.',
      severity: 'moderate'
    };
  } else {
    return {
      title: 'Strong Confounding',
      description: 'The naive estimate is very misleading. Treatment assignment is heavily determined by the confounder, creating large selection bias.',
      severity: 'high'
    };
  }
}
