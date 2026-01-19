<script lang="ts">
	import { fly } from 'svelte/transition';
	import { Container, Grid, Card, Badge } from '$lib/components/ui';
	import { modules } from '$lib/data/modules';
	import type { Module } from '$lib/types/module';

	// Get color classes for module cards based on semantic color
	function getModuleColorClasses(color: string): { border: string; hoverBg: string } {
		const colorMap: Record<string, { border: string; hoverBg: string }> = {
			treatment: {
				border: 'hover:border-blue-300 dark:hover:border-blue-700',
				hoverBg: 'hover:bg-blue-50/50 dark:hover:bg-blue-900/10'
			},
			control: {
				border: 'hover:border-emerald-300 dark:hover:border-emerald-700',
				hoverBg: 'hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10'
			},
			confounder: {
				border: 'hover:border-amber-300 dark:hover:border-amber-700',
				hoverBg: 'hover:bg-amber-50/50 dark:hover:bg-amber-900/10'
			},
			outcome: {
				border: 'hover:border-purple-300 dark:hover:border-purple-700',
				hoverBg: 'hover:bg-purple-50/50 dark:hover:bg-purple-900/10'
			}
		};
		return colorMap[color] || colorMap.treatment;
	}
</script>

<div transition:fly={{ y: 20, duration: 300 }}>
	<!-- Hero Section -->
	<section class="py-12 md:py-20 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 -mx-6 -mt-6 px-6 mb-12">
		<Container size="lg">
			<div class="text-center max-w-3xl mx-auto">
				<h1 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
					Data Analytics in Marketing
				</h1>
				<p class="text-xl text-slate-600 dark:text-slate-300 mb-8">
					Master causal inference, experimental design, and data-driven decision making
					through interactive visualizations and real-world marketing case studies.
				</p>
				<div class="flex flex-wrap justify-center gap-4 text-sm text-slate-500 dark:text-slate-400">
					<span class="flex items-center gap-2">
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
						8 Modules
					</span>
					<span class="flex items-center gap-2">
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>
						Interactive Visualizations
					</span>
					<span class="flex items-center gap-2">
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 3 20 12 6 21 6 3"/></svg>
						Animated Explanations
					</span>
				</div>
			</div>
		</Container>
	</section>

	<!-- Module Grid Section -->
	<section>
		<Container size="lg">
			<div class="flex items-center justify-between mb-8">
				<h2 class="text-2xl font-bold text-slate-900 dark:text-white">
					Course Modules
				</h2>
				<span class="text-sm text-slate-500 dark:text-slate-400">
					{modules.filter(m => m.status === 'active').length} of {modules.length} available
				</span>
			</div>

			<Grid cols={2} gap="default">
				{#each modules as module (module.id)}
					{@const isComingSoon = module.status === 'coming-soon'}
					{@const colorClasses = getModuleColorClasses(module.color)}
					<a
						href="/module/{module.slug}"
						class="block group"
					>
						<Card
							padding="default"
							hover
							variant="default"
						>
							<div class="relative {isComingSoon ? 'opacity-60' : ''}">
								<!-- Module Header -->
								<div class="flex items-start gap-4 mb-4">
									<!-- Module Icon -->
									<div class="text-3xl shrink-0 {isComingSoon ? 'grayscale' : ''}">
										{module.icon || '📚'}
									</div>

									<div class="flex-1 min-w-0">
										<!-- Module Number Badge -->
										<div class="flex items-center gap-2 mb-1">
											<span class="text-sm font-medium text-slate-500 dark:text-slate-400">
												Module {module.order}
											</span>
											{#if isComingSoon}
												<Badge variant="default">Coming Soon</Badge>
											{:else}
												<Badge variant="control">Available</Badge>
											{/if}
										</div>

										<!-- Module Name -->
										<h3 class="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
											{module.name}
										</h3>
									</div>
								</div>

								<!-- Module Description -->
								<p class="text-sm text-slate-600 dark:text-slate-400 mb-4">
									{module.description}
								</p>

								<!-- Module Footer -->
								<div class="flex items-center justify-between text-sm">
									<span class="text-slate-500 dark:text-slate-400">
										{#if module.lectures.length > 0}
											{module.lectures.length} lectures
										{:else}
											Content in development
										{/if}
									</span>

									{#if !isComingSoon}
										<span class="text-blue-600 dark:text-blue-400 group-hover:underline flex items-center gap-1">
											Start learning
											<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
										</span>
									{/if}
								</div>
							</div>
						</Card>
					</a>
				{/each}
			</Grid>
		</Container>
	</section>

	<!-- Features Section -->
	<section class="py-16 mt-12 bg-slate-100 dark:bg-slate-800/50 -mx-6 px-6">
		<Container size="lg">
			<h2 class="text-2xl font-bold text-slate-900 dark:text-white text-center mb-12">
				What You'll Learn
			</h2>

			<Grid cols={3} gap="default">
				<Card padding="lg" variant="elevated">
					<div class="text-center">
						<div class="text-4xl mb-4">🎯</div>
						<h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2">
							Causal Inference
						</h3>
						<p class="text-sm text-slate-600 dark:text-slate-400">
							Distinguish correlation from causation using modern statistical methods like
							Difference-in-Differences, Instrumental Variables, and Propensity Score Matching.
						</p>
					</div>
				</Card>

				<Card padding="lg" variant="elevated">
					<div class="text-center">
						<div class="text-4xl mb-4">🧪</div>
						<h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2">
							Experimental Design
						</h3>
						<p class="text-sm text-slate-600 dark:text-slate-400">
							Design and analyze A/B tests, randomized controlled trials, and field experiments
							to measure true marketing impact.
						</p>
					</div>
				</Card>

				<Card padding="lg" variant="elevated">
					<div class="text-center">
						<div class="text-4xl mb-4">📊</div>
						<h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2">
							Data Visualization
						</h3>
						<p class="text-sm text-slate-600 dark:text-slate-400">
							Explore concepts through interactive visualizations that bring statistical
							ideas to life and build intuition.
						</p>
					</div>
				</Card>
			</Grid>
		</Container>
	</section>

	<!-- Course Info Footer -->
	<section class="py-12">
		<Container size="sm">
			<Card padding="lg" variant="outlined">
				<div class="text-center">
					<h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2">
						MBA 564A - Spring 2026
					</h3>
					<p class="text-sm text-slate-600 dark:text-slate-400">
						This interactive learning platform accompanies the Data Analytics in Marketing course
						at the Gies College of Business, University of Illinois.
					</p>
				</div>
			</Card>
		</Container>
	</section>
</div>
