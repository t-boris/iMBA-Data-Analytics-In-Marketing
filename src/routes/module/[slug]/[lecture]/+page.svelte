<script lang="ts">
	import { fly } from 'svelte/transition';
	import { Container, Badge } from '$lib/components/ui';
	import { CausalDiagram } from '$lib/components/diagrams';
	import { StepExplanation } from '$lib/components/animation';
	import { getNextLecture, getPreviousLecture } from '$lib/data/modules';
	import type { Module, Lecture } from '$lib/types/module';
	import type { LectureContent, ContentSection } from '$lib/content/types';
	import { marked } from 'marked';
	import hljs from 'highlight.js/lib/core';
	import python from 'highlight.js/lib/languages/python';
	import bash from 'highlight.js/lib/languages/bash';

	// Register languages for syntax highlighting
	hljs.registerLanguage('python', python);
	hljs.registerLanguage('bash', bash);

	// Configure marked with syntax highlighting
	marked.setOptions({
		breaks: true,
		gfm: true
	});

	// Custom renderer for code blocks with syntax highlighting
	const renderer = new marked.Renderer();
	renderer.code = ({ text, lang }: { text: string; lang?: string }) => {
		if (lang && hljs.getLanguage(lang)) {
			const highlighted = hljs.highlight(text, { language: lang }).value;
			return `<pre><code class="hljs language-${lang}">${highlighted}</code></pre>`;
		}
		return `<pre><code>${text}</code></pre>`;
	};

	// Helper to render markdown content (synchronous)
	function renderMarkdown(content: string): string {
		return marked.parse(content, { async: false, renderer }) as string;
	}

	let { data } = $props();

	// Use $derived for reactivity when navigating between lectures
	const module = $derived(data.module as Module);
	const lecture = $derived(data.lecture as Lecture);
	const content = $derived(data.content as LectureContent | null);

	// Navigation helpers - must be derived to update on navigation
	const prevLecture = $derived(getPreviousLecture(module.id, lecture.id));
	const nextLecture = $derived(getNextLecture(module.id, lecture.id));

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

	const statusBadge = $derived(getStatusBadge(lecture.status));
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
										{@html renderMarkdown(section.content)}
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
									<div class="prose prose-slate dark:prose-invert mt-4 max-w-2xl mx-auto">
										{@html renderMarkdown(section.content)}
									</div>
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

<style>
	/* Prose content styling for markdown */
	:global(.content-section .prose p) {
		margin-bottom: 1rem;
	}

	:global(.content-section .prose p:last-child) {
		margin-bottom: 0;
	}

	:global(.content-section .prose ol),
	:global(.content-section ol) {
		list-style: decimal outside !important;
		padding-left: 2.5rem !important;
		margin: 1rem 0 !important;
	}

	:global(.content-section .prose ul),
	:global(.content-section ul) {
		list-style: disc outside !important;
		padding-left: 2.5rem !important;
		margin: 1rem 0 !important;
	}

	:global(.content-section .prose li),
	:global(.content-section li) {
		display: list-item !important;
		margin-bottom: 0.5rem !important;
	}

	:global(.content-section .prose strong) {
		font-weight: 600;
	}

	/* Code block styling with syntax highlighting */
	:global(.content-section pre) {
		background-color: #1e293b !important;
		border-radius: 0.5rem;
		padding: 1rem;
		overflow-x: auto;
		margin: 1rem 0;
	}

	:global(.content-section pre code) {
		font-family: 'JetBrains Mono', 'SF Mono', 'Menlo', 'Monaco', monospace;
		font-size: 0.75rem;
		line-height: 1.6;
		color: #e2e8f0;
		background: none !important;
		padding: 0 !important;
		border-radius: 0 !important;
		display: block;
	}

	/* Inline code only */
	:global(.content-section :not(pre) > code) {
		background-color: #334155 !important;
		padding: 0.125rem 0.375rem !important;
		border-radius: 0.25rem !important;
		font-size: 0.875rem;
		color: #f8fafc;
	}

	/* Highlight.js syntax colors */
	:global(.hljs-keyword) { color: #c792ea; }
	:global(.hljs-string) { color: #c3e88d; }
	:global(.hljs-number) { color: #f78c6c; }
	:global(.hljs-function) { color: #82aaff; }
	:global(.hljs-title) { color: #82aaff; }
	:global(.hljs-params) { color: #e2e8f0; }
	:global(.hljs-comment) { color: #697098; font-style: italic; }
	:global(.hljs-built_in) { color: #ffcb6b; }
	:global(.hljs-class) { color: #ffcb6b; }
	:global(.hljs-attr) { color: #ffcb6b; }
	:global(.hljs-variable) { color: #f07178; }
	:global(.hljs-operator) { color: #89ddff; }
	:global(.hljs-punctuation) { color: #89ddff; }
</style>
