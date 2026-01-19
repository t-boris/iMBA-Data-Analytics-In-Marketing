<script lang="ts">
	/**
	 * Results display panel for simulation outcomes.
	 * Shows true ATE, estimated ATE, and calculated bias with color coding.
	 * Features smooth animated number transitions.
	 */

	let {
		trueATE,
		estimatedATE,
		label = 'Estimation Results'
	}: {
		trueATE: number;
		estimatedATE: number;
		label?: string;
	} = $props();

	// Calculate bias
	const bias = $derived(estimatedATE - trueATE);
	const absBias = $derived(Math.abs(bias));

	// Determine bias severity for color coding
	const biasLevel = $derived<'good' | 'warning' | 'bad'>(
		absBias < 0.1 ? 'good' : absBias < 0.3 ? 'warning' : 'bad'
	);

	// Color configurations based on bias level
	const biasColors = {
		good: {
			bg: 'bg-emerald-50 dark:bg-emerald-900/20',
			border: 'border-emerald-200 dark:border-emerald-800',
			text: 'text-emerald-700 dark:text-emerald-300',
			badge: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300',
			icon: 'text-emerald-500'
		},
		warning: {
			bg: 'bg-amber-50 dark:bg-amber-900/20',
			border: 'border-amber-200 dark:border-amber-800',
			text: 'text-amber-700 dark:text-amber-300',
			badge: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300',
			icon: 'text-amber-500'
		},
		bad: {
			bg: 'bg-rose-50 dark:bg-rose-900/20',
			border: 'border-rose-200 dark:border-rose-800',
			text: 'text-rose-700 dark:text-rose-300',
			badge: 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300',
			icon: 'text-rose-500'
		}
	};

	const colors = $derived(biasColors[biasLevel]);

	// Animated display values - initialize to 0, will sync on first effect
	let displayTrueATE = $state(0);
	let displayEstimatedATE = $state(0);
	let displayBias = $state(0);
	let animationFrame: number | undefined;
	let initialized = false;

	// Smooth number animation
	function animateValue(current: number, target: number, speed: number = 0.15): number {
		const diff = target - current;
		if (Math.abs(diff) < 0.001) return target;
		return current + diff * speed;
	}

	function animate() {
		displayTrueATE = animateValue(displayTrueATE, trueATE);
		displayEstimatedATE = animateValue(displayEstimatedATE, estimatedATE);
		displayBias = animateValue(displayBias, bias);

		// Continue animation if values are still changing
		if (
			Math.abs(displayTrueATE - trueATE) > 0.001 ||
			Math.abs(displayEstimatedATE - estimatedATE) > 0.001 ||
			Math.abs(displayBias - bias) > 0.001
		) {
			animationFrame = requestAnimationFrame(animate);
		}
	}

	// Start animation when values change
	$effect(() => {
		// Track the reactive values to trigger effect on changes
		const targetTrue = trueATE;
		const targetEstimated = estimatedATE;
		const targetBias = bias;

		// On first run, set initial values immediately
		if (!initialized) {
			displayTrueATE = targetTrue;
			displayEstimatedATE = targetEstimated;
			displayBias = targetBias;
			initialized = true;
			return;
		}

		// Cancel any existing animation
		if (animationFrame) {
			cancelAnimationFrame(animationFrame);
		}
		animationFrame = requestAnimationFrame(animate);

		return () => {
			if (animationFrame) {
				cancelAnimationFrame(animationFrame);
			}
		};
	});

	// Format number for display
	function formatNumber(n: number): string {
		return n.toFixed(2);
	}

	// Format bias with sign
	function formatBias(n: number): string {
		const sign = n >= 0 ? '+' : '';
		return sign + n.toFixed(2);
	}
</script>

<div class="rounded-xl border {colors.border} {colors.bg} p-5 transition-colors duration-300">
	<!-- Header -->
	<div class="flex items-center justify-between mb-4">
		<h3 class="text-sm font-semibold text-slate-700 dark:text-slate-300">
			{label}
		</h3>
		<span class="px-2 py-1 rounded-full text-xs font-medium {colors.badge}">
			{#if biasLevel === 'good'}
				Low Bias
			{:else if biasLevel === 'warning'}
				Moderate Bias
			{:else}
				High Bias
			{/if}
		</span>
	</div>

	<!-- Results Grid -->
	<div class="grid grid-cols-3 gap-4">
		<!-- True ATE -->
		<div class="text-center">
			<p class="text-xs text-slate-500 dark:text-slate-400 mb-1">True ATE</p>
			<p class="text-xl font-bold tabular-nums text-slate-900 dark:text-white">
				{formatNumber(displayTrueATE)}
			</p>
		</div>

		<!-- Estimated ATE -->
		<div class="text-center">
			<p class="text-xs text-slate-500 dark:text-slate-400 mb-1">Estimated</p>
			<p class="text-xl font-bold tabular-nums text-slate-900 dark:text-white">
				{formatNumber(displayEstimatedATE)}
			</p>
		</div>

		<!-- Bias -->
		<div class="text-center">
			<p class="text-xs text-slate-500 dark:text-slate-400 mb-1">Bias</p>
			<p class="text-xl font-bold tabular-nums {colors.text}">
				{formatBias(displayBias)}
			</p>
		</div>
	</div>

	<!-- Visual Indicator -->
	<div class="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
		<div class="flex items-center gap-2">
			<!-- Icon based on bias level -->
			{#if biasLevel === 'good'}
				<svg class="w-5 h-5 {colors.icon}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			{:else if biasLevel === 'warning'}
				<svg class="w-5 h-5 {colors.icon}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
				</svg>
			{:else}
				<svg class="w-5 h-5 {colors.icon}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			{/if}
			<p class="text-sm {colors.text}">
				{#if biasLevel === 'good'}
					Estimate is close to the true effect
				{:else if biasLevel === 'warning'}
					Estimate shows moderate deviation from truth
				{:else}
					Estimate is significantly biased
				{/if}
			</p>
		</div>
	</div>
</div>
