<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		cols = 1,
		gap = 'default',
		class: className = '',
		children
	}: {
		cols?: 1 | 2 | 3 | 4 | 'auto';
		gap?: 'none' | 'sm' | 'default' | 'lg';
		class?: string;
		children: Snippet;
	} = $props();

	const colClasses = {
		1: 'grid-cols-1',
		2: 'grid-cols-1 md:grid-cols-2',
		3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
		4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
		auto: 'grid-cols-[repeat(auto-fit,minmax(280px,1fr))]'
	};

	const gapClasses = {
		none: 'gap-0',
		sm: 'gap-2',
		default: 'gap-4 md:gap-6',
		lg: 'gap-6 md:gap-8'
	};
</script>

<div class="grid {colClasses[cols]} {gapClasses[gap]} {className}">
	{@render children()}
</div>
