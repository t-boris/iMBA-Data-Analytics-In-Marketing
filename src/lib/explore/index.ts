// Core simulation utilities for interactive exploration
export {
	type DataPoint,
	type SimulationParams,
	generateData,
	addConfounding,
	addSelectionBias,
	calculateATE,
	calculateNaiveEstimate,
	calculateSummaryStats,
	seededRandom,
	randomNormal
} from './simulation';
