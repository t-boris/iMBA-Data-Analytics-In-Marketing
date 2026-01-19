<script lang="ts">
	import type { ConceptCategory, ConceptCategoryInfo } from '$lib/glossary/types';

	let {
		selectedCategory = 'all',
		onCategoryChange,
		categories
	}: {
		selectedCategory?: ConceptCategory | 'all';
		onCategoryChange: (category: ConceptCategory | 'all') => void;
		categories: ConceptCategoryInfo[];
	} = $props();

	// Color mappings for each category
	const colorClasses: Record<string, { bg: string; bgSelected: string; text: string; border: string }> = {
		blue: {
			bg: 'bg-blue-50 dark:bg-blue-900/20',
			bgSelected: 'bg-blue-600 dark:bg-blue-500',
			text: 'text-blue-700 dark:text-blue-300',
			border: 'border-blue-200 dark:border-blue-800'
		},
		purple: {
			bg: 'bg-purple-50 dark:bg-purple-900/20',
			bgSelected: 'bg-purple-600 dark:bg-purple-500',
			text: 'text-purple-700 dark:text-purple-300',
			border: 'border-purple-200 dark:border-purple-800'
		},
		amber: {
			bg: 'bg-amber-50 dark:bg-amber-900/20',
			bgSelected: 'bg-amber-600 dark:bg-amber-500',
			text: 'text-amber-700 dark:text-amber-300',
			border: 'border-amber-200 dark:border-amber-800'
		},
		emerald: {
			bg: 'bg-emerald-50 dark:bg-emerald-900/20',
			bgSelected: 'bg-emerald-600 dark:bg-emerald-500',
			text: 'text-emerald-700 dark:text-emerald-300',
			border: 'border-emerald-200 dark:border-emerald-800'
		},
		red: {
			bg: 'bg-red-50 dark:bg-red-900/20',
			bgSelected: 'bg-red-600 dark:bg-red-500',
			text: 'text-red-700 dark:text-red-300',
			border: 'border-red-200 dark:border-red-800'
		},
		slate: {
			bg: 'bg-slate-100 dark:bg-slate-700/30',
			bgSelected: 'bg-slate-600 dark:bg-slate-500',
			text: 'text-slate-700 dark:text-slate-300',
			border: 'border-slate-200 dark:border-slate-600'
		},
		cyan: {
			bg: 'bg-cyan-50 dark:bg-cyan-900/20',
			bgSelected: 'bg-cyan-600 dark:bg-cyan-500',
			text: 'text-cyan-700 dark:text-cyan-300',
			border: 'border-cyan-200 dark:border-cyan-800'
		}
	};

	function getColorClasses(color: string) {
		return colorClasses[color] || colorClasses.slate;
	}
</script>

<div class="flex gap-2 overflow-x-auto pb-2 -mb-2 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600">
	<!-- All button -->
	<button
		type="button"
		onclick={() => onCategoryChange('all')}
		class="shrink-0 px-4 py-2 rounded-lg font-medium text-sm transition-all {selectedCategory === 'all'
			? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
			: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'}"
	>
		All
	</button>

	<!-- Category buttons -->
	{#each categories as category (category.id)}
		{@const colors = getColorClasses(category.color)}
		<button
			type="button"
			onclick={() => onCategoryChange(category.id)}
			class="shrink-0 px-4 py-2 rounded-lg font-medium text-sm transition-all {selectedCategory === category.id
				? `${colors.bgSelected} text-white`
				: `${colors.bg} ${colors.text} hover:opacity-80 border ${colors.border}`}"
		>
			{category.label}
		</button>
	{/each}
</div>
