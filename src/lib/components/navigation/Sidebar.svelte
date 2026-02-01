<script lang="ts">
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import type { Module } from '$lib/types/module';

  let {
    modules = [],
    isOpen = false,
    onClose
  }: {
    modules?: Module[];
    isOpen?: boolean;
    onClose?: () => void;
  } = $props();

  // Get current module slug from route for active highlighting
  const currentModuleSlug = $derived.by(() => {
    const pathname = $page.url.pathname;
    // Match /module/slug or /module/slug/lecture
    const match = pathname.match(/\/module\/([^/]+)/);
    return match ? match[1] : null;
  });

  // Resizable sidebar state
  const MIN_WIDTH = 200;
  const MAX_WIDTH = 400;
  const DEFAULT_WIDTH = 256;
  const STORAGE_KEY = 'sidebar-width';

  let sidebarWidth = $state(DEFAULT_WIDTH);
  let isResizing = $state(false);

  // Load saved width from localStorage
  $effect(() => {
    if (browser) {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed >= MIN_WIDTH && parsed <= MAX_WIDTH) {
          sidebarWidth = parsed;
        }
      }
    }
  });

  // Save width to localStorage when it changes
  function saveWidth(width: number) {
    if (browser) {
      localStorage.setItem(STORAGE_KEY, String(width));
    }
  }

  // Update CSS custom property for layout margin
  $effect(() => {
    if (browser) {
      document.documentElement.style.setProperty('--sidebar-width', `${sidebarWidth}px`);
    }
  });

  // Handle resize drag
  function handleMouseDown(e: MouseEvent) {
    e.preventDefault();
    isResizing = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }

  function handleMouseMove(e: MouseEvent) {
    if (!isResizing) return;
    const newWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, e.clientX));
    sidebarWidth = newWidth;
  }

  function handleMouseUp() {
    if (isResizing) {
      isResizing = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      saveWidth(sidebarWidth);
    }
  }

  // Add/remove global listeners for resize
  $effect(() => {
    if (browser && isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  });
</script>

<!-- Mobile backdrop overlay -->
{#if isOpen}
  <button
    class="fixed inset-0 z-40 bg-black/50 lg:hidden"
    onclick={onClose}
    aria-label="Close sidebar"
    type="button"
  ></button>
{/if}

<!-- Sidebar -->
<aside
  class="fixed top-16 bottom-0 left-0 z-50 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 {isOpen ? 'translate-x-0' : '-translate-x-full'}"
  style="width: {sidebarWidth}px;"
>
  <div class="flex flex-col h-full">
    <!-- Sidebar header -->
    <div class="px-4 py-4 border-b border-slate-200 dark:border-slate-700">
      <h2 class="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
        Course Modules
      </h2>
    </div>

    <!-- Module list -->
    <nav class="flex-1 overflow-y-auto p-2">
      {#if modules.length === 0}
        <div class="px-3 py-4 text-sm text-slate-500 dark:text-slate-400">
          No modules available
        </div>
      {:else}
        <ul class="space-y-1">
          {#each modules as module (module.id)}
            {@const isActive = currentModuleSlug === module.slug}
            {@const isComingSoon = module.status === 'coming-soon'}
            <li>
              <a
                href="/module/{module.slug}"
                onclick={onClose}
                class="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors {isActive
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                  : isComingSoon
                    ? 'text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}"
              >
                <div class="flex items-center gap-3 min-w-0">
                  <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-semibold {isActive
                    ? 'bg-blue-600 text-white'
                    : isComingSoon
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'}">
                    {module.order}
                  </span>
                  <span class="truncate" title={module.name}>{module.name}</span>
                </div>

                <!-- Lecture count badge / progress indicator -->
                {#if module.lectures.length > 0}
                  <span class="text-xs text-slate-500 dark:text-slate-400">
                    {module.lectures.length} lectures
                  </span>
                {:else}
                  <span class="text-xs text-slate-400 dark:text-slate-500 italic">
                    Coming soon
                  </span>
                {/if}
              </a>
            </li>
          {/each}
        </ul>
      {/if}
    </nav>

    <!-- Study Tools -->
    <div class="px-2 py-4 border-t border-slate-200 dark:border-slate-700">
      <h3 class="px-3 mb-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
        Study Tools
      </h3>
      <ul class="space-y-1">
        <li>
          <a
            href="/explore"
            onclick={onClose}
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <span class="text-lg">🔬</span>
            <span>Interactive Explore</span>
          </a>
        </li>
        <li>
          <a
            href="/glossary"
            onclick={onClose}
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <span class="text-lg">📖</span>
            <span>Glossary</span>
          </a>
        </li>
        <li>
          <a
            href="/exam-prep"
            onclick={onClose}
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <span class="text-lg">📝</span>
            <span>Exam Prep</span>
          </a>
        </li>
      </ul>
    </div>

    <!-- Sidebar footer -->
    <div class="px-4 py-4 border-t border-slate-200 dark:border-slate-700">
      <div class="text-xs text-slate-500 dark:text-slate-400">
        MBA 564A - Spring 2026
      </div>
    </div>
  </div>

  <!-- Resize handle (desktop only) -->
  <div
    class="hidden lg:block absolute top-0 bottom-0 right-0 w-1 cursor-col-resize hover:bg-blue-500/50 transition-colors {isResizing ? 'bg-blue-500/50' : ''}"
    onmousedown={handleMouseDown}
    role="separator"
    aria-orientation="vertical"
    aria-label="Resize sidebar"
    tabindex="0"
  ></div>
</aside>
