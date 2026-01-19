<script lang="ts">
	/**
	 * Interactive slider component for adjusting simulation parameters.
	 * Features smooth value updates and prominent value display.
	 */

	let {
		label,
		min,
		max,
		value = $bindable(),
		step = 1,
		onChange,
		color = 'blue',
		description = ''
	}: {
		label: string;
		min: number;
		max: number;
		value: number;
		step?: number;
		onChange?: (value: number) => void;
		color?: 'blue' | 'amber' | 'emerald' | 'rose' | 'purple';
		description?: string;
	} = $props();

	// Color configurations for the slider
	const colorClasses = {
		blue: {
			track: 'bg-blue-200 dark:bg-blue-900',
			fill: 'bg-blue-500',
			thumb: 'border-blue-500',
			value: 'text-blue-600 dark:text-blue-400',
			focus: 'focus:ring-blue-500'
		},
		amber: {
			track: 'bg-amber-200 dark:bg-amber-900',
			fill: 'bg-amber-500',
			thumb: 'border-amber-500',
			value: 'text-amber-600 dark:text-amber-400',
			focus: 'focus:ring-amber-500'
		},
		emerald: {
			track: 'bg-emerald-200 dark:bg-emerald-900',
			fill: 'bg-emerald-500',
			thumb: 'border-emerald-500',
			value: 'text-emerald-600 dark:text-emerald-400',
			focus: 'focus:ring-emerald-500'
		},
		rose: {
			track: 'bg-rose-200 dark:bg-rose-900',
			fill: 'bg-rose-500',
			thumb: 'border-rose-500',
			value: 'text-rose-600 dark:text-rose-400',
			focus: 'focus:ring-rose-500'
		},
		purple: {
			track: 'bg-purple-200 dark:bg-purple-900',
			fill: 'bg-purple-500',
			thumb: 'border-purple-500',
			value: 'text-purple-600 dark:text-purple-400',
			focus: 'focus:ring-purple-500'
		}
	};

	const colors = $derived(colorClasses[color]);

	// Generate unique id for label-input association
	const inputId = $derived(`slider-${label.toLowerCase().replace(/\s+/g, '-')}-${Math.random().toString(36).slice(2, 7)}`);

	// Calculate fill percentage for visual feedback
	const fillPercent = $derived(((value - min) / (max - min)) * 100);

	// Format the display value
	const displayValue = $derived(
		step >= 1 ? value.toString() : value.toFixed(step < 0.1 ? 2 : 1)
	);

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		const newValue = parseFloat(target.value);
		value = newValue;
		onChange?.(newValue);
	}
</script>

<div class="space-y-2">
	<!-- Label and Value Row -->
	<div class="flex items-center justify-between">
		<label for={inputId} class="text-sm font-medium text-slate-700 dark:text-slate-300">
			{label}
		</label>
		<span class="text-lg font-bold tabular-nums {colors.value}">
			{displayValue}
		</span>
	</div>

	<!-- Slider Track -->
	<div class="relative">
		<input
			id={inputId}
			type="range"
			{min}
			{max}
			{step}
			{value}
			oninput={handleInput}
			class="
				w-full h-2 appearance-none cursor-pointer rounded-full
				{colors.track}
				{colors.focus}
				focus:outline-none focus:ring-2 focus:ring-offset-2
				[&::-webkit-slider-thumb]:appearance-none
				[&::-webkit-slider-thumb]:w-5
				[&::-webkit-slider-thumb]:h-5
				[&::-webkit-slider-thumb]:rounded-full
				[&::-webkit-slider-thumb]:bg-white
				[&::-webkit-slider-thumb]:border-2
				[&::-webkit-slider-thumb]:{colors.thumb}
				[&::-webkit-slider-thumb]:shadow-md
				[&::-webkit-slider-thumb]:transition-transform
				[&::-webkit-slider-thumb]:hover:scale-110
				[&::-moz-range-thumb]:appearance-none
				[&::-moz-range-thumb]:w-5
				[&::-moz-range-thumb]:h-5
				[&::-moz-range-thumb]:rounded-full
				[&::-moz-range-thumb]:bg-white
				[&::-moz-range-thumb]:border-2
				[&::-moz-range-thumb]:{colors.thumb}
				[&::-moz-range-thumb]:shadow-md
				[&::-moz-range-thumb]:transition-transform
				[&::-moz-range-thumb]:hover:scale-110
			"
			style="background: linear-gradient(to right, var(--fill-color) 0%, var(--fill-color) {fillPercent}%, transparent {fillPercent}%, transparent 100%); --fill-color: {color === 'blue' ? '#3b82f6' : color === 'amber' ? '#f59e0b' : color === 'emerald' ? '#10b981' : color === 'rose' ? '#f43f5e' : '#a855f7'};"
		/>
	</div>

	<!-- Min/Max Labels -->
	<div class="flex justify-between text-xs text-slate-500 dark:text-slate-400">
		<span>{min}</span>
		<span>{max}</span>
	</div>

	<!-- Optional Description -->
	{#if description}
		<p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
			{description}
		</p>
	{/if}
</div>
