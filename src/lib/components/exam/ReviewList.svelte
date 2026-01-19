<script lang="ts">
  import { slide } from 'svelte/transition';
  import type { Question } from '$lib/exam/types';
  import { Button } from '$lib/components/ui';
  import { marked } from 'marked';
  import hljs from 'highlight.js/lib/core';
  import python from 'highlight.js/lib/languages/python';

  // Register Python for syntax highlighting
  hljs.registerLanguage('python', python);

  // Configure marked with syntax highlighting
  marked.setOptions({
    breaks: true,
    gfm: true
  });

  // Custom renderer for code blocks
  const renderer = new marked.Renderer();
  renderer.code = ({ text, lang }: { text: string; lang?: string }) => {
    if (lang && hljs.getLanguage(lang)) {
      const highlighted = hljs.highlight(text, { language: lang }).value;
      return `<pre><code class="hljs language-${lang}">${highlighted}</code></pre>`;
    }
    return `<pre><code>${text}</code></pre>`;
  };

  function renderMarkdown(content: string): string {
    return marked.parse(content, { async: false, renderer }) as string;
  }

  interface Props {
    questions: Question[];
    onRetryMissed?: () => void;
  }

  let { questions, onRetryMissed }: Props = $props();

  // Track which items are expanded
  let expandedIds = $state<Set<string>>(new Set());

  function toggleExpand(id: string) {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    expandedIds = newExpanded;
  }

  function expandAll() {
    expandedIds = new Set(questions.map((q) => q.id));
  }

  function collapseAll() {
    expandedIds = new Set();
  }

  // Difficulty badge colors
  const difficultyColors = {
    easy: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300',
    medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
    hard: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'
  };

  const difficultyLabels = {
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard'
  };
</script>

{#if questions.length > 0}
  <div class="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
    <!-- Header -->
    <div class="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
            Questions to Review
          </h3>
          <p class="text-sm text-slate-500 dark:text-slate-400">
            {questions.length} question{questions.length !== 1 ? 's' : ''} marked for review
          </p>
        </div>

        <div class="flex items-center gap-2">
          <button
            onclick={expandAll}
            class="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Expand all
          </button>
          <span class="text-slate-300 dark:text-slate-600">|</span>
          <button
            onclick={collapseAll}
            class="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Collapse all
          </button>
        </div>
      </div>
    </div>

    <!-- Question List -->
    <div class="divide-y divide-slate-200 dark:divide-slate-700">
      {#each questions as question (question.id)}
        {@const isExpanded = expandedIds.has(question.id)}

        <div class="bg-white dark:bg-slate-800">
          <!-- Question Header -->
          <button
            onclick={() => toggleExpand(question.id)}
            class="w-full flex items-start gap-3 p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <!-- Chevron -->
            <svg
              class="w-5 h-5 mt-0.5 text-slate-400 transition-transform duration-200 shrink-0"
              class:rotate-90={isExpanded}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>

            <!-- Question Text -->
            <div class="flex-1 min-w-0">
              <p class="text-slate-900 dark:text-white leading-relaxed pr-4">
                {question.question}
              </p>
            </div>

            <!-- Difficulty Badge -->
            <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium {difficultyColors[question.difficulty]} shrink-0">
              {difficultyLabels[question.difficulty]}
            </span>
          </button>

          <!-- Expanded Answer -->
          {#if isExpanded}
            <div transition:slide={{ duration: 200 }} class="px-4 pb-4 pl-12">
              <div class="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border-l-4 border-blue-500">
                <div class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
                  Answer
                </div>
                <div class="review-answer text-slate-700 dark:text-slate-300 leading-relaxed">
                  {@html renderMarkdown(question.answer)}
                </div>
              </div>
            </div>
          {/if}
        </div>
      {/each}
    </div>

    <!-- Footer with Retry Button -->
    {#if onRetryMissed}
      <div class="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
        <Button variant="primary" onclick={onRetryMissed} class="w-full sm:w-auto">
          <span class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
              <path d="M21 3v5h-5"/>
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
              <path d="M8 16H3v5"/>
            </svg>
            Retry These Questions Only
          </span>
        </Button>
      </div>
    {/if}
  </div>
{:else}
  <!-- Empty State -->
  <div class="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800 p-6 text-center">
    <div class="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-emerald-100 dark:bg-emerald-900/50 rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-600 dark:text-emerald-400">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    </div>
    <h3 class="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-1">
      Perfect Score!
    </h3>
    <p class="text-emerald-700 dark:text-emerald-300">
      You marked all questions as "Got it". Great work!
    </p>
  </div>
{/if}

<style>
  /* Markdown content styling for review answers */
  :global(.review-answer p) {
    margin-bottom: 0.5rem;
  }

  :global(.review-answer p:last-child) {
    margin-bottom: 0;
  }

  :global(.review-answer ol) {
    list-style: decimal outside !important;
    padding-left: 1.5rem !important;
    margin: 0.5rem 0 !important;
  }

  :global(.review-answer ul) {
    list-style: disc outside !important;
    padding-left: 1.5rem !important;
    margin: 0.5rem 0 !important;
  }

  :global(.review-answer li) {
    display: list-item !important;
    margin-bottom: 0.25rem !important;
  }

  :global(.review-answer strong) {
    font-weight: 600;
  }

  /* Code block styling */
  :global(.review-answer pre) {
    background-color: #1e293b !important;
    border-radius: 0.375rem;
    padding: 0.75rem;
    overflow-x: auto;
    margin: 0.5rem 0;
  }

  :global(.review-answer pre code) {
    font-family: 'JetBrains Mono', 'SF Mono', 'Menlo', 'Monaco', monospace;
    font-size: 0.75rem;
    line-height: 1.5;
    color: #e2e8f0;
    background: none !important;
    padding: 0 !important;
    display: block;
  }

  :global(.review-answer :not(pre) > code) {
    background-color: #334155 !important;
    padding: 0.125rem 0.375rem !important;
    border-radius: 0.25rem !important;
    font-size: 0.8rem;
    color: #f8fafc;
    font-family: 'JetBrains Mono', 'SF Mono', 'Menlo', 'Monaco', monospace;
  }

  /* Highlight.js syntax colors */
  :global(.review-answer .hljs-keyword) { color: #c792ea; }
  :global(.review-answer .hljs-string) { color: #c3e88d; }
  :global(.review-answer .hljs-number) { color: #f78c6c; }
  :global(.review-answer .hljs-function) { color: #82aaff; }
  :global(.review-answer .hljs-title) { color: #82aaff; }
  :global(.review-answer .hljs-params) { color: #e2e8f0; }
  :global(.review-answer .hljs-comment) { color: #697098; font-style: italic; }
  :global(.review-answer .hljs-built_in) { color: #ffcb6b; }
  :global(.review-answer .hljs-variable) { color: #f07178; }
  :global(.review-answer .hljs-operator) { color: #89ddff; }
</style>
