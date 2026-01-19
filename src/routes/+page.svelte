<script lang="ts">
	import { fly } from 'svelte/transition';
	import Typography from '$lib/components/ui/Typography.svelte';
</script>

<div transition:fly={{ y: 20, duration: 300 }} class="space-y-12">
	<!-- Page Header -->
	<section>
		<Typography variant="h1">Data Analytics in Marketing</Typography>
		<Typography variant="body" class="mt-4 max-w-2xl">
			Welcome to your visual learning companion for MBA 564A. This design system demonstrates
			typography scales and semantic colors for educational diagrams.
		</Typography>
	</section>

	<!-- Typography Scale Demo -->
	<section class="space-y-6">
		<Typography variant="h2">Typography Scale</Typography>

		<div class="space-y-4 p-6 rounded-lg" style="background-color: var(--color-surface-alt);">
			<Typography variant="h1">Heading 1 - 2.5rem (40px)</Typography>
			<Typography variant="h2">Heading 2 - 2rem (32px)</Typography>
			<Typography variant="h3">Heading 3 - 1.5rem (24px)</Typography>
			<Typography variant="h4">Heading 4 - 1.25rem (20px)</Typography>
			<Typography variant="body">
				Body text - 1rem (16px) with 1.6 line-height for comfortable reading. This is designed
				for explaining statistical concepts clearly and readably. Good typography helps students
				focus on the content rather than struggling with the presentation.
			</Typography>
			<Typography variant="small">
				Small text - 0.875rem (14px) for captions and secondary information
			</Typography>
			<div>
				<Typography variant="body">
					Inline <Typography variant="code" as="span">code examples</Typography> use monospace font for formulas like <Typography variant="code" as="span">Y = alpha + beta*X + epsilon</Typography>
				</Typography>
			</div>
		</div>
	</section>

	<!-- Semantic Colors Demo -->
	<section class="space-y-6">
		<Typography variant="h2">Semantic Colors for Diagrams</Typography>
		<Typography variant="body" class="max-w-2xl">
			These colors represent different elements in causal diagrams and statistical visualizations.
			Each color has a specific meaning to help students quickly understand relationships.
		</Typography>

		<div class="grid grid-cols-2 md:grid-cols-5 gap-4">
			<!-- Treatment -->
			<div class="flex flex-col items-center p-4 rounded-lg" style="background-color: var(--color-muted);">
				<div class="w-16 h-16 rounded-full mb-3" style="background-color: var(--color-treatment);"></div>
				<Typography variant="h4">Treatment</Typography>
				<Typography variant="small" class="text-center">Treatment group or intervention</Typography>
			</div>

			<!-- Control -->
			<div class="flex flex-col items-center p-4 rounded-lg" style="background-color: var(--color-muted);">
				<div class="w-16 h-16 rounded-full mb-3" style="background-color: var(--color-control);"></div>
				<Typography variant="h4">Control</Typography>
				<Typography variant="small" class="text-center">Control group or baseline</Typography>
			</div>

			<!-- Confounder -->
			<div class="flex flex-col items-center p-4 rounded-lg" style="background-color: var(--color-muted);">
				<div class="w-16 h-16 rounded-full mb-3" style="background-color: var(--color-confounder);"></div>
				<Typography variant="h4">Confounder</Typography>
				<Typography variant="small" class="text-center">Confounding variables</Typography>
			</div>

			<!-- Outcome -->
			<div class="flex flex-col items-center p-4 rounded-lg" style="background-color: var(--color-muted);">
				<div class="w-16 h-16 rounded-full mb-3" style="background-color: var(--color-outcome);"></div>
				<Typography variant="h4">Outcome</Typography>
				<Typography variant="small" class="text-center">Outcome or dependent variable</Typography>
			</div>

			<!-- Arrow -->
			<div class="flex flex-col items-center p-4 rounded-lg" style="background-color: var(--color-muted);">
				<div class="w-16 h-16 rounded-full mb-3" style="background-color: var(--color-arrow);"></div>
				<Typography variant="h4">Arrow</Typography>
				<Typography variant="small" class="text-center">Causal relationships</Typography>
			</div>
		</div>
	</section>

	<!-- Brand Colors Demo -->
	<section class="space-y-6">
		<Typography variant="h2">Brand Colors</Typography>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
			<!-- Primary -->
			<div class="p-6 rounded-lg" style="background-color: var(--color-primary); color: white;">
				<Typography variant="h4" class="!text-white">Primary</Typography>
				<Typography variant="small" class="!text-white/80">Headers and links</Typography>
			</div>

			<!-- Secondary -->
			<div class="p-6 rounded-lg" style="background-color: var(--color-secondary); color: white;">
				<Typography variant="h4" class="!text-white">Secondary</Typography>
				<Typography variant="small" class="!text-white/80">Body text</Typography>
			</div>

			<!-- Accent -->
			<div class="p-6 rounded-lg" style="background-color: var(--color-accent); color: white;">
				<Typography variant="h4" class="!text-white">Accent</Typography>
				<Typography variant="small" class="!text-white/80">Highlights and callouts</Typography>
			</div>
		</div>
	</section>

	<!-- Dark Mode Note -->
	<section class="p-6 rounded-lg" style="background-color: var(--color-muted);">
		<Typography variant="h3">Dark Mode Support</Typography>
		<Typography variant="body" class="mt-2">
			All colors automatically adjust when your system is set to dark mode. Try toggling your
			system preferences to see the colors adapt for optimal visibility on dark backgrounds.
		</Typography>
	</section>
</div>
