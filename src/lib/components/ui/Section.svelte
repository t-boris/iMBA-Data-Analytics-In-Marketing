<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		spacing = 'default',
		background = 'none',
		class: className = '',
		children
	}: {
		spacing?: 'sm' | 'default' | 'lg' | 'xl';
		background?: 'none' | 'muted' | 'surface';
		class?: string;
		children: Snippet;
	} = $props();

	const spacingClasses = {
		sm: 'py-4 md:py-6',
		default: 'py-8 md:py-12',
		lg: 'py-12 md:py-16',
		xl: 'py-16 md:py-24'
	};

	const bgClasses = {
		none: '',
		muted: 'section-bg-muted',
		surface: 'section-bg-surface'
	};
</script>

<section class="{spacingClasses[spacing]} {bgClasses[background]} {className}">
	{@render children()}
</section>
