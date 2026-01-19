<script lang="ts">
	import { fly } from 'svelte/transition';
	import { Container, Badge } from '$lib/components/ui';
	import { CausalDiagram } from '$lib/components/diagrams';
	import { StepExplanation } from '$lib/components/animation';
	import { getNextLecture, getPreviousLecture } from '$lib/data/modules';
	import type { Module, Lecture } from '$lib/types/module';
	import type { LectureContent, ContentSection } from '$lib/content/types';

	let { data } = $props();
	const module: Module = data.module;
	const lecture: Lecture = data.lecture;
	const content: LectureContent | null = data.content;

	// Navigation helpers
	const prevLecture = getPreviousLecture(module.id, lecture.id);
	const nextLecture = getNextLecture(module.id, lecture.id);

	// Get status badge styling
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

	const statusBadge = getStatusBadge(lecture.status);
</script>

<div transition:fly={{ y: 20, duration: 300 }}>
	<!-- Hero Section -->
	<section class="py-8 md:py-12 bg-slate-50 dark:bg-slate-800/50 -mx-6 -mt-6 px-6 mb-8 border-b border-slate-200 dark:border-slate-700">
		<Container size="lg">
			<!-- Breadcrumb -->
			<nav class="mb-4">
				<ol class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
					<li>
						<a href="/module/{module.slug}" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
							{module.icon} {module.name}
						</a>
					</li>
					<li class="flex items-center gap-2">
						<span>/</span>
						<span class="text-slate-700 dark:text-slate-300">Lecture {lecture.order}</span>
					</li>
				</ol>
			</nav>

			<div class="flex items-start gap-4">
				<div class="flex-1">
					<!-- Lecture Title -->
					<h1 class="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
						{lecture.title}
					</h1>

					<!-- Description -->
					<p class="text-lg text-slate-600 dark:text-slate-300 mb-4">
						{lecture.description}
					</p>

					<!-- Metadata -->
					<div class="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
						{#if lecture.duration}
							<span class="flex items-center gap-1.5">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
								</svg>
								{lecture.duration}
							</span>
						{/if}

						{#if lecture.hasVisualization}
							<span class="flex items-center gap-1.5">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/>
								</svg>
								Interactive Visualizations
							</span>
						{/if}

						{#if lecture.hasAnimation}
							<span class="flex items-center gap-1.5">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<polygon points="6 3 20 12 6 21 6 3"/>
								</svg>
								Animated Explanations
							</span>
						{/if}

						<Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
					</div>
				</div>
			</div>
		</Container>
	</section>

	<!-- Main Content -->
	<section class="py-6">
		<Container size="lg">
			{#if content && content.sections.length > 0}
				<!-- Render content sections -->
				<div class="space-y-12">
					{#each content.sections as section, index (section.id)}
						<div class="content-section">
							{#if section.type === 'text'}
								<!-- Text Section -->
								<div class="prose prose-slate dark:prose-invert max-w-none">
									{#if section.title}
										<h2 class="text-xl font-bold text-slate-900 dark:text-white mb-4">
											{section.title}
										</h2>
									{/if}
									{#if section.content}
										{#each section.content.split('\n\n') as paragraph}
											<p class="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
												{paragraph}
											</p>
										{/each}
									{/if}
								</div>

							{:else if section.type === 'explanation'}
								<!-- Animated Explanation Section -->
								{#if section.explanation}
									<StepExplanation
										title={section.title || 'Explanation'}
										steps={section.explanation.steps}
										width={500}
										height={280}
										layout="horizontal"
									/>
								{/if}

							{:else if section.type === 'diagram'}
								<!-- Static Diagram Section -->
								<div class="bg-white dark:bg-slate-900 rounded-xl shadow-lg overflow-hidden p-6">
									{#if section.title}
										<h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">
											{section.title}
										</h3>
									{/if}
									{#if section.diagram}
										<div class="flex justify-center">
											<CausalDiagram
												data={section.diagram}
												width={500}
												height={280}
											/>
										</div>
									{/if}
									{#if section.content}
										<p class="text-slate-600 dark:text-slate-300 mt-4 text-center max-w-2xl mx-auto">
											{section.content}
										</p>
									{/if}
								</div>
							{/if}
						</div>
					{/each}
				</div>
			{:else}
				<!-- No content available -->
				<div class="text-center py-16">
					<div class="text-6xl mb-6">📝</div>
					<h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-3">
						Content Coming Soon
					</h2>
					<p class="text-slate-600 dark:text-slate-300 max-w-md mx-auto">
						This lecture is being prepared. Check back later for animated explanations and interactive content!
					</p>
				</div>
			{/if}
		</Container>
	</section>

	<!-- Navigation Footer -->
	<section class="py-8 mt-8 border-t border-slate-200 dark:border-slate-700">
		<Container size="lg">
			<div class="flex items-center justify-between">
				<!-- Previous Lecture -->
				<div class="flex-1">
					{#if prevLecture}
						<a
							href="/module/{module.slug}/{prevLecture.slug}"
							class="group inline-flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
						>
							<svg class="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
							</svg>
							<div class="text-left">
								<div class="text-xs text-slate-500 dark:text-slate-500">Previous</div>
								<div class="font-medium">{prevLecture.title}</div>
							</div>
						</a>
					{/if}
				</div>

				<!-- Back to Module -->
				<div class="flex-shrink-0">
					<a
						href="/module/{module.slug}"
						class="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm font-medium"
					>
						Back to Module
					</a>
				</div>

				<!-- Next Lecture -->
				<div class="flex-1 text-right">
					{#if nextLecture}
						<a
							href="/module/{module.slug}/{nextLecture.slug}"
							class="group inline-flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
						>
							<div class="text-right">
								<div class="text-xs text-slate-500 dark:text-slate-500">Next</div>
								<div class="font-medium">{nextLecture.title}</div>
							</div>
							<svg class="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
							</svg>
						</a>
					{/if}
				</div>
			</div>
		</Container>
	</section>
</div>
