<script lang="ts">
	/**
	 * Interactive Exploration Landing Page
	 * Provides access to hands-on simulations for understanding causal inference concepts.
	 * Inspired by 3Blue1Brown's clean, focused, visual approach.
	 */
	import { fly } from 'svelte/transition';
	import { Container } from '$lib/components/ui';

	// Scenario card data
	const scenarios = [
		{
			id: 'confounding',
			title: 'Confounding Bias',
			description: 'Understand how unobserved confounders can bias your treatment effect estimates. See how confounders that affect both treatment assignment and outcomes lead to spurious correlations.',
			icon: 'confounding',
			route: '/explore/confounding',
			color: 'amber',
			concepts: ['Selection on Observables', 'Omitted Variable Bias', 'Backdoor Paths']
		},
		{
			id: 'methods',
			title: 'Method Comparison',
			description: 'Compare different causal inference methods side-by-side. See how RCTs, matching, and difference-in-differences perform under various conditions.',
			icon: 'methods',
			route: '/explore/methods',
			color: 'emerald',
			concepts: ['RCT', 'Propensity Score Matching', 'Difference-in-Differences']
		}
	] as const;

	// Color configurations for cards
	const cardColors = {
		amber: {
			gradient: 'from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20',
			border: 'border-amber-200 dark:border-amber-800 hover:border-amber-300 dark:hover:border-amber-700',
			icon: 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400',
			badge: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
		},
		emerald: {
			gradient: 'from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20',
			border: 'border-emerald-200 dark:border-emerald-800 hover:border-emerald-300 dark:hover:border-emerald-700',
			icon: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400',
			badge: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
		}
	};
</script>

<svelte:head>
	<title>Interactive Exploration | Data Analytics in Marketing</title>
	<meta
		name="description"
		content="Hands-on simulations for understanding causal inference. Explore confounding bias, compare methods, and build intuition through interactive experiments."
	/>
</svelte:head>

<div transition:fly={{ y: 20, duration: 300 }}>
	<!-- Hero Section -->
	<section class="py-12 md:py-20 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 -mx-6 -mt-6 px-6 mb-8">
		<Container size="lg">
			<div class="text-center max-w-3xl mx-auto">
				<!-- Icon -->
				<div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-6">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="32"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="text-blue-600 dark:text-blue-400"
					>
						<path d="M12 3l-2 9h4L10 21l2-9H8l4-9z" />
					</svg>
				</div>

				<!-- Title -->
				<h1 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
					Interactive Exploration
				</h1>

				<!-- Subtitle -->
				<p class="text-xl text-slate-600 dark:text-slate-300 mb-8">
					Build intuition through hands-on simulations. Adjust parameters, observe outcomes, and develop a deep understanding of causal inference concepts.
				</p>

				<!-- Stats -->
				<div class="flex flex-wrap justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
					<span class="flex items-center gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
							<polyline points="14 2 14 8 20 8" />
							<path d="M12 18v-6" />
							<path d="m9 15 3 3 3-3" />
						</svg>
						Interactive Simulations
					</span>
					<span class="flex items-center gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M2 12h5" />
							<path d="M17 12h5" />
							<path d="M12 2v5" />
							<path d="M12 17v5" />
							<circle cx="12" cy="12" r="4" />
						</svg>
						Real-time Feedback
					</span>
					<span class="flex items-center gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M12 20h9" />
							<path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
						</svg>
						Adjustable Parameters
					</span>
				</div>
			</div>
		</Container>
	</section>

	<!-- Scenarios Grid -->
	<section class="pb-16">
		<Container size="lg">
			<div class="grid md:grid-cols-2 gap-6">
				{#each scenarios as scenario}
					{@const colors = cardColors[scenario.color]}
					<a
						href={scenario.route}
						class="group block rounded-xl border-2 {colors.border} bg-gradient-to-br {colors.gradient} p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
					>
						<!-- Card Header -->
						<div class="flex items-start gap-4 mb-4">
							<!-- Icon -->
							<div class="flex-shrink-0 w-12 h-12 rounded-xl {colors.icon} flex items-center justify-center">
								{#if scenario.icon === 'confounding'}
									<!-- Confounding icon: interconnected nodes -->
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<circle cx="6" cy="6" r="3" />
										<circle cx="18" cy="18" r="3" />
										<circle cx="18" cy="6" r="3" />
										<path d="M8.5 8.5L15.5 15.5" />
										<path d="M15.5 6L8.5 6" />
										<path d="M18 9L18 15" />
									</svg>
								{:else if scenario.icon === 'methods'}
									<!-- Methods icon: comparison chart -->
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<line x1="18" y1="20" x2="18" y2="10" />
										<line x1="12" y1="20" x2="12" y2="4" />
										<line x1="6" y1="20" x2="6" y2="14" />
										<path d="M3 20h18" />
									</svg>
								{/if}
							</div>

							<!-- Title -->
							<div class="flex-1">
								<h2 class="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
									{scenario.title}
								</h2>
							</div>

							<!-- Arrow -->
							<div class="flex-shrink-0 text-slate-400 dark:text-slate-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-all transform group-hover:translate-x-1">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path d="M5 12h14" />
									<path d="m12 5 7 7-7 7" />
								</svg>
							</div>
						</div>

						<!-- Description -->
						<p class="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
							{scenario.description}
						</p>

						<!-- Concept Badges -->
						<div class="flex flex-wrap gap-2">
							{#each scenario.concepts as concept}
								<span class="px-2.5 py-1 rounded-full text-xs font-medium {colors.badge}">
									{concept}
								</span>
							{/each}
						</div>
					</a>
				{/each}
			</div>
		</Container>
	</section>

	<!-- How It Works Section -->
	<section class="py-12 bg-slate-100 dark:bg-slate-800/50 -mx-6 px-6">
		<Container size="lg">
			<div class="text-center mb-10">
				<h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-3">
					How It Works
				</h2>
				<p class="text-slate-600 dark:text-slate-400">
					Learn by doing with our interactive simulation framework
				</p>
			</div>

			<div class="grid md:grid-cols-3 gap-6">
				<!-- Step 1 -->
				<div class="text-center">
					<div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold text-lg mb-4">
						1
					</div>
					<h3 class="font-semibold text-slate-900 dark:text-white mb-2">
						Adjust Parameters
					</h3>
					<p class="text-sm text-slate-600 dark:text-slate-400">
						Use sliders to control sample size, treatment effects, and bias strength
					</p>
				</div>

				<!-- Step 2 -->
				<div class="text-center">
					<div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold text-lg mb-4">
						2
					</div>
					<h3 class="font-semibold text-slate-900 dark:text-white mb-2">
						Observe Results
					</h3>
					<p class="text-sm text-slate-600 dark:text-slate-400">
						Watch how changes affect estimates, bias, and data distributions in real-time
					</p>
				</div>

				<!-- Step 3 -->
				<div class="text-center">
					<div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold text-lg mb-4">
						3
					</div>
					<h3 class="font-semibold text-slate-900 dark:text-white mb-2">
						Build Intuition
					</h3>
					<p class="text-sm text-slate-600 dark:text-slate-400">
						Develop deep understanding of when and why methods succeed or fail
					</p>
				</div>
			</div>
		</Container>
	</section>

	<!-- CTA Section -->
	<section class="py-12">
		<Container size="default">
			<div class="text-center">
				<h2 class="text-xl font-bold text-slate-900 dark:text-white mb-4">
					Ready to Start Exploring?
				</h2>
				<p class="text-slate-600 dark:text-slate-400 mb-6">
					Choose a scenario above to begin your hands-on learning journey.
				</p>
				<div class="flex flex-wrap justify-center gap-4">
					<a
						href="/explore/confounding"
						class="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors"
					>
						Explore Confounding
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="m9 18 6-6-6-6" />
						</svg>
					</a>
					<a
						href="/explore/methods"
						class="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors"
					>
						Compare Methods
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="m9 18 6-6-6-6" />
						</svg>
					</a>
				</div>
			</div>
		</Container>
	</section>
</div>
