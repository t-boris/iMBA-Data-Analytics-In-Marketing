<script lang="ts">
	import { fly } from 'svelte/transition';
	import { Container, Grid, Card, Badge, Progress } from '$lib/components/ui';
	import type { Module, Lecture } from '$lib/types/module';

	let { data } = $props();
	const module: Module = data.module;

	// Get color class based on module color
	function getColorClasses(color: string): { bg: string; border: string; text: string } {
		const colorMap: Record<string, { bg: string; border: string; text: string }> = {
			treatment: {
				bg: 'bg-blue-50 dark:bg-blue-900/20',
				border: 'border-blue-200 dark:border-blue-800',
				text: 'text-blue-700 dark:text-blue-300'
			},
			control: {
				bg: 'bg-emerald-50 dark:bg-emerald-900/20',
				border: 'border-emerald-200 dark:border-emerald-800',
				text: 'text-emerald-700 dark:text-emerald-300'
			},
			confounder: {
				bg: 'bg-amber-50 dark:bg-amber-900/20',
				border: 'border-amber-200 dark:border-amber-800',
				text: 'text-amber-700 dark:text-amber-300'
			},
			outcome: {
				bg: 'bg-purple-50 dark:bg-purple-900/20',
				border: 'border-purple-200 dark:border-purple-800',
				text: 'text-purple-700 dark:text-purple-300'
			}
		};
		return colorMap[color] || colorMap.treatment;
	}

	const colorClasses = getColorClasses(module.color);

	// Get status badge variant
	function getStatusBadge(status: Lecture['status']): { variant: string; label: string } {
		switch (status) {
			case 'ready':
				return { variant: 'control', label: 'Ready' };
			case 'draft':
				return { variant: 'confounder', label: 'Draft' };
			case 'coming-soon':
			default:
				return { variant: 'default', label: 'Coming Soon' };
		}
	}
</script>

<div transition:fly={{ y: 20, duration: 300 }}>
	<!-- Hero Section -->
	<section class="py-12 md:py-16 {colorClasses.bg} -mx-6 -mt-6 px-6 mb-8 border-b {colorClasses.border}">
		<Container size="lg">
			<div class="flex items-start gap-6">
				<!-- Module Icon -->
				<div class="text-5xl md:text-6xl shrink-0">
					{module.icon || '📚'}
				</div>

				<div class="flex-1">
					<!-- Module Badge -->
					<div class="mb-3">
						<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium {colorClasses.bg} {colorClasses.text} border {colorClasses.border}">
							Module {module.order}
						</span>
					</div>

					<!-- Module Name -->
					<h1 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
						{module.name}
					</h1>

					<!-- Module Description -->
					<p class="text-lg text-slate-600 dark:text-slate-300 max-w-3xl">
						{module.description}
					</p>

					<!-- Progress Indicator (placeholder) -->
					<div class="mt-6 max-w-sm">
						<div class="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-2">
							<span>Progress</span>
							<span>0% complete</span>
						</div>
						<Progress value={0} size="sm" />
					</div>
				</div>
			</div>
		</Container>
	</section>

	<!-- Lecture List Section -->
	<section>
		<Container size="lg">
			<h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">
				Lectures
				<span class="text-lg font-normal text-slate-500 dark:text-slate-400">
					({module.lectures.length} total)
				</span>
			</h2>

			{#if module.lectures.length === 0}
				<Card padding="lg" variant="outlined">
					<div class="text-center py-8">
						<div class="text-4xl mb-4">📝</div>
						<h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-2">
							Content Coming Soon
						</h3>
						<p class="text-slate-600 dark:text-slate-300">
							Lectures for this module are being prepared. Check back later!
						</p>
					</div>
				</Card>
			{:else}
				<Grid cols={2} gap="default">
					{#each module.lectures as lecture (lecture.id)}
						{@const statusBadge = getStatusBadge(lecture.status)}
						<a
							href="/module/{module.slug}/{lecture.slug}"
							class="block group"
						>
							<Card padding="default" hover variant="default">
								<div class="flex items-start justify-between gap-4">
									<div class="flex-1 min-w-0">
										<!-- Lecture Number and Title -->
										<div class="flex items-center gap-3 mb-2">
											<span class="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
												{lecture.order}
											</span>
											<h3 class="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors truncate">
												{lecture.title}
											</h3>
										</div>

										<!-- Lecture Description -->
										<p class="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
											{lecture.description}
										</p>

										<!-- Lecture Metadata -->
										<div class="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
											{#if lecture.duration}
												<span class="flex items-center gap-1">
													<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
													{lecture.duration}
												</span>
											{/if}

											{#if lecture.hasVisualization}
												<span class="flex items-center gap-1" title="Interactive visualization">
													<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>
													Visualization
												</span>
											{/if}

											{#if lecture.hasAnimation}
												<span class="flex items-center gap-1" title="Animated explanation">
													<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 3 20 12 6 21 6 3"/></svg>
													Animation
												</span>
											{/if}
										</div>
									</div>

									<!-- Status Badge -->
									<div class="shrink-0">
										<Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
									</div>
								</div>
							</Card>
						</a>
					{/each}
				</Grid>
			{/if}
		</Container>
	</section>
</div>
