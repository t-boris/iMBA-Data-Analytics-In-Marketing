/**
 * Core simulation utilities for interactive exploration of causal inference concepts.
 * Provides data generation, bias injection, and estimation functions.
 */

export interface DataPoint {
	id: number;
	treatment: boolean;
	outcome: number;
	confounder?: number;
	propensityScore?: number;
}

export interface SimulationParams {
	n: number;
	treatmentEffect: number;
	baseOutcome?: number;
	noise?: number;
	seed?: number;
}

/**
 * Creates a seeded pseudo-random number generator using the Linear Congruential Generator algorithm.
 * Ensures reproducible results when the same seed is provided.
 */
export function seededRandom(seed: number): () => number {
	let state = seed;
	return () => {
		// LCG parameters (same as glibc)
		state = (state * 1103515245 + 12345) & 0x7fffffff;
		return state / 0x7fffffff;
	};
}

/**
 * Generates a normally distributed random variable using the Box-Muller transform.
 * @param mean - The mean of the distribution
 * @param std - The standard deviation of the distribution
 * @param rand - Optional random number generator (defaults to Math.random)
 */
export function randomNormal(mean: number = 0, std: number = 1, rand: () => number = Math.random): number {
	// Box-Muller transform
	const u1 = rand();
	const u2 = rand();
	const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
	return z * std + mean;
}

/**
 * Generates random data with a specified treatment effect.
 * Creates a simple randomized experiment scenario where treatment assignment is random.
 */
export function generateData(params: SimulationParams): DataPoint[] {
	const {
		n,
		treatmentEffect,
		baseOutcome = 50,
		noise = 10,
		seed
	} = params;

	const rand = seed !== undefined ? seededRandom(seed) : Math.random;
	const data: DataPoint[] = [];

	for (let i = 0; i < n; i++) {
		// Random treatment assignment (50% probability)
		const treatment = rand() < 0.5;

		// Generate outcome: base + treatment effect (if treated) + noise
		const outcomeNoise = randomNormal(0, noise, rand);
		const outcome = baseOutcome + (treatment ? treatmentEffect : 0) + outcomeNoise;

		data.push({
			id: i,
			treatment,
			outcome
		});
	}

	return data;
}

/**
 * Adds confounding bias to the data.
 * Creates a confounder that affects both treatment probability and outcome.
 * This simulates real-world scenarios where treatment is not randomly assigned.
 *
 * @param data - The original data points
 * @param strength - The strength of confounding (0 to 1, higher = more confounding)
 */
export function addConfounding(data: DataPoint[], strength: number): DataPoint[] {
	// Clamp strength between 0 and 1
	const clampedStrength = Math.max(0, Math.min(1, strength));

	return data.map((point, index) => {
		// Generate confounder (e.g., income level, health status)
		// For simplicity, we use a uniform distribution scaled to 0-100
		const seed = point.id * 1000 + 42;
		const rand = seededRandom(seed);
		const confounder = rand() * 100;

		// Calculate propensity score: probability of treatment given confounder
		// Higher confounder -> higher probability of treatment (positive confounding)
		const basePropensity = 0.5;
		const propensityScore = basePropensity + (clampedStrength * (confounder - 50) / 100);
		const clampedPropensity = Math.max(0.05, Math.min(0.95, propensityScore));

		// Re-assign treatment based on propensity score
		const treatmentRand = seededRandom(seed + 1)();
		const treatment = treatmentRand < clampedPropensity;

		// Adjust outcome based on confounder
		// Higher confounder -> higher outcome (confounder positively affects outcome)
		const confounderEffect = clampedStrength * (confounder - 50) * 0.3;
		const outcome = point.outcome + confounderEffect;

		return {
			...point,
			treatment,
			outcome,
			confounder,
			propensityScore: clampedPropensity
		};
	});
}

/**
 * Adds selection bias to the data.
 * Simulates scenarios where observations are not randomly sampled.
 * Units with certain characteristics are more likely to be observed.
 *
 * @param data - The original data points
 * @param strength - The strength of selection bias (0 to 1)
 */
export function addSelectionBias(data: DataPoint[], strength: number): DataPoint[] {
	// Clamp strength between 0 and 1
	const clampedStrength = Math.max(0, Math.min(1, strength));

	if (clampedStrength === 0) {
		return data;
	}

	// Selection bias: treated units with good outcomes are more likely to be observed
	// Untreated units with poor outcomes are more likely to drop out
	return data.filter((point) => {
		const seed = point.id * 2000 + 123;
		const rand = seededRandom(seed);

		// Calculate selection probability
		// Treated with high outcome -> more likely to stay
		// Untreated with low outcome -> less likely to stay
		const meanOutcome = data.reduce((sum, p) => sum + p.outcome, 0) / data.length;
		const normalizedOutcome = (point.outcome - meanOutcome) / 20; // Roughly normalize

		let selectionProbability = 1 - clampedStrength * 0.5; // Base probability

		if (point.treatment && normalizedOutcome > 0) {
			// Treated with good outcomes more likely to stay
			selectionProbability += clampedStrength * 0.3 * Math.min(normalizedOutcome, 1);
		} else if (!point.treatment && normalizedOutcome < 0) {
			// Untreated with bad outcomes less likely to stay
			selectionProbability += clampedStrength * 0.2 * Math.max(normalizedOutcome, -1);
		}

		// Clamp probability
		selectionProbability = Math.max(0.1, Math.min(1, selectionProbability));

		return rand() < selectionProbability;
	});
}

/**
 * Calculates the true Average Treatment Effect (ATE).
 * This represents what we would measure in a perfect randomized experiment.
 *
 * ATE = E[Y(1)] - E[Y(0)]
 *
 * Note: In a simulation where we know the true treatment effect, this
 * can be calculated directly. In real data, we can only estimate it.
 */
export function calculateATE(data: DataPoint[]): number {
	const treated = data.filter((d) => d.treatment);
	const untreated = data.filter((d) => !d.treatment);

	if (treated.length === 0 || untreated.length === 0) {
		return 0;
	}

	const meanTreated = treated.reduce((sum, d) => sum + d.outcome, 0) / treated.length;
	const meanUntreated = untreated.reduce((sum, d) => sum + d.outcome, 0) / untreated.length;

	return meanTreated - meanUntreated;
}

/**
 * Calculates the naive difference in means estimate.
 * This is the same as calculateATE but conceptually represents
 * what a naive analyst might calculate without adjusting for confounding.
 *
 * In the presence of confounding or selection bias, this estimate
 * will be biased away from the true treatment effect.
 */
export function calculateNaiveEstimate(data: DataPoint[]): number {
	return calculateATE(data);
}

/**
 * Calculates summary statistics for the data.
 * Useful for displaying diagnostic information in the UI.
 */
export function calculateSummaryStats(data: DataPoint[]): {
	n: number;
	nTreated: number;
	nUntreated: number;
	meanOutcome: number;
	meanTreatedOutcome: number;
	meanUntreatedOutcome: number;
	treatmentProportion: number;
} {
	const treated = data.filter((d) => d.treatment);
	const untreated = data.filter((d) => !d.treatment);

	const meanOutcome = data.reduce((sum, d) => sum + d.outcome, 0) / data.length;
	const meanTreatedOutcome = treated.length > 0
		? treated.reduce((sum, d) => sum + d.outcome, 0) / treated.length
		: 0;
	const meanUntreatedOutcome = untreated.length > 0
		? untreated.reduce((sum, d) => sum + d.outcome, 0) / untreated.length
		: 0;

	return {
		n: data.length,
		nTreated: treated.length,
		nUntreated: untreated.length,
		meanOutcome,
		meanTreatedOutcome,
		meanUntreatedOutcome,
		treatmentProportion: data.length > 0 ? treated.length / data.length : 0
	};
}
