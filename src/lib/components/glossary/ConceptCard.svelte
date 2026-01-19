<script lang="ts">
	import { slide } from 'svelte/transition';
	import { marked } from 'marked';
	import hljs from 'highlight.js/lib/core';
	import python from 'highlight.js/lib/languages/python';
	import { CausalDiagram } from '$lib/components/diagrams';
	import { Card } from '$lib/components/ui';
	import type { GlossaryConcept } from '$lib/glossary/types';
	import { categoryInfo } from '$lib/glossary/types';
	import RelatedConcepts from './RelatedConcepts.svelte';

	// Register Python for syntax highlighting
	hljs.registerLanguage('python', python);

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

	// Helper to render markdown content
	function renderMarkdown(content: string): string {
		return marked.parse(content, { async: false, renderer }) as string;
	}

	let {
		concept,
		allConcepts,
		isExpanded = false,
		onToggle,
		onRelatedClick
	}: {
		concept: GlossaryConcept;
		allConcepts: GlossaryConcept[];
		isExpanded?: boolean;
		onToggle?: (id: string) => void;
		onRelatedClick?: (id: string) => void;
	} = $props();

	// Get category info
	let info = $derived(categoryInfo[concept.category]);

	// Color mappings for category badges
	const badgeColorClasses: Record<string, string> = {
		blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
		purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
		amber: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
		emerald: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
		red: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
		slate: 'bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-400',
		cyan: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400'
	};

	// Border color mappings
	const borderColorClasses: Record<string, string> = {
		blue: 'border-l-blue-500',
		purple: 'border-l-purple-500',
		amber: 'border-l-amber-500',
		emerald: 'border-l-emerald-500',
		red: 'border-l-red-500',
		slate: 'border-l-slate-500',
		cyan: 'border-l-cyan-500'
	};

	function getBadgeColorClass(color: string): string {
		return badgeColorClasses[color] || badgeColorClasses.slate;
	}

	function getBorderColorClass(color: string): string {
		return borderColorClasses[color] || borderColorClasses.slate;
	}

	function handleToggle() {
		if (onToggle) {
			onToggle(concept.id);
		}
	}

	function handleRelatedClick(id: string) {
		if (onRelatedClick) {
			onRelatedClick(id);
		}
	}

	// Get lecture path
	function getLecturePath(): string {
		return `/module/${concept.moduleId}/${concept.lectureId}`;
	}
</script>

<div class="border-l-4 {getBorderColorClass(info.color)}" id="concept-{concept.id}">
	<Card
		variant="default"
		padding="none"
		class={isExpanded ? 'bg-slate-50 dark:bg-slate-800/50' : ''}
	>
		<!-- Clickable Header -->
		<button
			type="button"
			onclick={handleToggle}
			class="w-full text-left p-4 md:p-6 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset rounded-t-lg"
			aria-expanded={isExpanded}
			aria-controls="content-{concept.id}"
		>
			<div class="flex items-start justify-between gap-2 mb-2">
				<div class="flex items-center gap-3">
					<h3 class="font-semibold text-slate-900 dark:text-white">
						{concept.term}
					</h3>
					<!-- Chevron indicator -->
					<svg
						class="w-5 h-5 transition-transform duration-200 text-slate-400 dark:text-slate-500 {isExpanded ? 'rotate-180' : ''}"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
					</svg>
				</div>
				<span
					class="shrink-0 px-2 py-0.5 text-xs font-medium rounded-full {getBadgeColorClass(info.color)}"
				>
					{info.label}
				</span>
			</div>
			<p class="text-sm text-slate-600 dark:text-slate-400 {isExpanded ? '' : 'line-clamp-2'}">
				{concept.definition}
			</p>
		</button>

		<!-- Expanded Content -->
		{#if isExpanded}
			<div
				id="content-{concept.id}"
				transition:slide={{ duration: 200 }}
				class="px-4 md:px-6 pb-4 md:pb-6 space-y-4 border-t border-slate-200 dark:border-slate-700"
			>
				<!-- Extended Definition (markdown) -->
				{#if concept.extendedDefinition}
					<div class="extended-definition prose prose-sm prose-slate dark:prose-invert max-w-none pt-4">
						{@html renderMarkdown(concept.extendedDefinition)}
					</div>
				{/if}

				<!-- Diagram -->
				{#if concept.diagramData}
					<div class="flex justify-center pt-2">
						<div class="max-w-[350px] w-full">
							<CausalDiagram
								data={concept.diagramData}
								width={350}
								height={200}
								title={concept.term}
							/>
						</div>
					</div>
				{/if}

				<!-- Related Concepts -->
				{#if concept.relatedConcepts.length > 0}
					<div class="pt-2">
						<p class="text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium uppercase tracking-wide">
							Related Concepts
						</p>
						<RelatedConcepts
							conceptIds={concept.relatedConcepts}
							{allConcepts}
							onClick={handleRelatedClick}
						/>
					</div>
				{/if}

				<!-- Source Lecture Link -->
				<div class="pt-2 border-t border-slate-100 dark:border-slate-700/50">
					<a
						href={getLecturePath()}
						class="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							aria-hidden="true"
						>
							<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
						</svg>
						<span>Lecture {concept.lectureId}</span>
					</a>
				</div>
			</div>
		{/if}
	</Card>
</div>

<style>
	/* Prose content styling for markdown in extended definitions */
	:global(.extended-definition p) {
		margin-bottom: 0.75rem;
		line-height: 1.6;
	}

	:global(.extended-definition p:last-child) {
		margin-bottom: 0;
	}

	:global(.extended-definition ol) {
		list-style: decimal outside !important;
		padding-left: 1.5rem !important;
		margin: 0.75rem 0 !important;
	}

	:global(.extended-definition ul) {
		list-style: disc outside !important;
		padding-left: 1.5rem !important;
		margin: 0.75rem 0 !important;
	}

	:global(.extended-definition li) {
		display: list-item !important;
		margin-bottom: 0.375rem !important;
	}

	:global(.extended-definition strong) {
		font-weight: 600;
	}

	/* Code block styling with syntax highlighting */
	:global(.extended-definition pre) {
		background-color: #1e293b !important;
		border-radius: 0.5rem;
		padding: 0.75rem;
		overflow-x: auto;
		margin: 0.75rem 0;
		text-align: left;
	}

	:global(.extended-definition pre code) {
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
	:global(.extended-definition :not(pre) > code) {
		background-color: #334155 !important;
		padding: 0.125rem 0.375rem !important;
		border-radius: 0.25rem !important;
		font-size: 0.875rem;
		color: #f8fafc;
		font-family: 'JetBrains Mono', 'SF Mono', 'Menlo', 'Monaco', monospace;
	}

	/* Highlight.js syntax colors */
	:global(.extended-definition .hljs-keyword) { color: #c792ea; }
	:global(.extended-definition .hljs-string) { color: #c3e88d; }
	:global(.extended-definition .hljs-number) { color: #f78c6c; }
	:global(.extended-definition .hljs-function) { color: #82aaff; }
	:global(.extended-definition .hljs-title) { color: #82aaff; }
	:global(.extended-definition .hljs-params) { color: #e2e8f0; }
	:global(.extended-definition .hljs-comment) { color: #697098; font-style: italic; }
	:global(.extended-definition .hljs-built_in) { color: #ffcb6b; }
	:global(.extended-definition .hljs-class) { color: #ffcb6b; }
	:global(.extended-definition .hljs-attr) { color: #ffcb6b; }
	:global(.extended-definition .hljs-variable) { color: #f07178; }
	:global(.extended-definition .hljs-operator) { color: #89ddff; }
	:global(.extended-definition .hljs-punctuation) { color: #89ddff; }
</style>
