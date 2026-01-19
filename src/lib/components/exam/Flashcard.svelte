<script lang="ts">
  import type { Question } from '$lib/exam/types';
  import { CausalDiagram } from '$lib/components/diagrams';
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

  interface Props {
    question: Question;
    isFlipped: boolean;
    onFlip: () => void;
  }

  let { question, isFlipped, onFlip }: Props = $props();

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

  // Handle keyboard events
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      onFlip();
    }
  }
</script>

<div
  class="card-container perspective-1000"
  role="button"
  tabindex="0"
  onclick={onFlip}
  onkeydown={handleKeydown}
  aria-label={isFlipped ? 'Flashcard showing answer. Press to flip back to question.' : 'Flashcard showing question. Press to reveal answer.'}
>
  <div
    class="card relative w-full min-h-[400px] transition-transform duration-600 transform-style-3d {isFlipped ? 'rotate-y-180' : ''}"
  >
    <!-- Front Side (Question) -->
    <div
      class="card-face absolute inset-0 backface-hidden rounded-xl shadow-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 flex flex-col"
    >
      <!-- Difficulty Badge -->
      <div class="absolute top-4 right-4">
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {difficultyColors[question.difficulty]}">
          {difficultyLabels[question.difficulty]}
        </span>
      </div>

      <!-- Question Content -->
      <div class="flex-1 flex flex-col items-center justify-center text-center px-4">
        <div class="text-sm text-slate-500 dark:text-slate-400 mb-4 uppercase tracking-wide">
          Question
        </div>
        <p class="text-lg md:text-xl text-slate-900 dark:text-white leading-relaxed">
          {question.question}
        </p>

        <!-- Diagram (if present) -->
        {#if question.diagramData}
          <div class="mt-6 w-full max-w-md">
            <CausalDiagram data={question.diagramData} width={400} height={200} />
          </div>
        {/if}
      </div>

      <!-- Flip Hint -->
      <div class="text-center text-sm text-slate-400 dark:text-slate-500 mt-4">
        <span class="flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 1l4 4-4 4"/>
            <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
            <path d="M7 23l-4-4 4-4"/>
            <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
          </svg>
          Click or press Space to flip
        </span>
      </div>
    </div>

    <!-- Back Side (Answer) -->
    <div
      class="card-face absolute inset-0 backface-hidden rounded-xl shadow-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-6 flex flex-col rotate-y-180"
    >
      <!-- Difficulty Badge -->
      <div class="absolute top-4 right-4">
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {difficultyColors[question.difficulty]}">
          {difficultyLabels[question.difficulty]}
        </span>
      </div>

      <!-- Answer Content -->
      <div class="flex-1 flex flex-col items-center justify-center px-4 overflow-y-auto">
        <div class="text-sm text-slate-500 dark:text-slate-400 mb-4 uppercase tracking-wide">
          Answer
        </div>
        <div class="answer-content prose prose-slate dark:prose-invert max-w-none text-left">
          {@html renderMarkdown(question.answer)}
        </div>
      </div>

      <!-- Flip Hint -->
      <div class="text-center text-sm text-slate-400 dark:text-slate-500 mt-4">
        <span class="flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 1l4 4-4 4"/>
            <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
            <path d="M7 23l-4-4 4-4"/>
            <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
          </svg>
          Click or press Space to flip back
        </span>
      </div>
    </div>
  </div>
</div>

<style>
  .perspective-1000 {
    perspective: 1000px;
  }

  .transform-style-3d {
    transform-style: preserve-3d;
  }

  .backface-hidden {
    backface-visibility: hidden;
  }

  .rotate-y-180 {
    transform: rotateY(180deg);
  }

  .duration-600 {
    transition-duration: 600ms;
  }

  .card-container {
    cursor: pointer;
  }

  .card-container:focus {
    outline: none;
  }

  .card-container:focus-visible .card {
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
    border-radius: 0.75rem;
  }

  /* Prose content styling for markdown */
  :global(.answer-content p) {
    margin-bottom: 0.75rem;
    line-height: 1.6;
  }

  :global(.answer-content p:last-child) {
    margin-bottom: 0;
  }

  :global(.answer-content ol) {
    list-style: decimal outside !important;
    padding-left: 1.5rem !important;
    margin: 0.75rem 0 !important;
  }

  :global(.answer-content ul) {
    list-style: disc outside !important;
    padding-left: 1.5rem !important;
    margin: 0.75rem 0 !important;
  }

  :global(.answer-content li) {
    display: list-item !important;
    margin-bottom: 0.375rem !important;
  }

  :global(.answer-content strong) {
    font-weight: 600;
  }

  /* Code block styling with syntax highlighting */
  :global(.answer-content pre) {
    background-color: #1e293b !important;
    border-radius: 0.5rem;
    padding: 0.75rem;
    overflow-x: auto;
    margin: 0.75rem 0;
    text-align: left;
  }

  :global(.answer-content pre code) {
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
  :global(.answer-content :not(pre) > code) {
    background-color: #334155 !important;
    padding: 0.125rem 0.375rem !important;
    border-radius: 0.25rem !important;
    font-size: 0.875rem;
    color: #f8fafc;
    font-family: 'JetBrains Mono', 'SF Mono', 'Menlo', 'Monaco', monospace;
  }

  /* Highlight.js syntax colors */
  :global(.answer-content .hljs-keyword) { color: #c792ea; }
  :global(.answer-content .hljs-string) { color: #c3e88d; }
  :global(.answer-content .hljs-number) { color: #f78c6c; }
  :global(.answer-content .hljs-function) { color: #82aaff; }
  :global(.answer-content .hljs-title) { color: #82aaff; }
  :global(.answer-content .hljs-params) { color: #e2e8f0; }
  :global(.answer-content .hljs-comment) { color: #697098; font-style: italic; }
  :global(.answer-content .hljs-built_in) { color: #ffcb6b; }
  :global(.answer-content .hljs-class) { color: #ffcb6b; }
  :global(.answer-content .hljs-attr) { color: #ffcb6b; }
  :global(.answer-content .hljs-variable) { color: #f07178; }
  :global(.answer-content .hljs-operator) { color: #89ddff; }
  :global(.answer-content .hljs-punctuation) { color: #89ddff; }
</style>
