<script lang="ts">
  import { IconButton } from '$lib/components/ui';

  let {
    onMenuToggle,
    isMenuOpen = false
  }: {
    onMenuToggle: () => void;
    isMenuOpen?: boolean;
  } = $props();
</script>

<header class="sticky top-0 z-50 h-16 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
  <div class="flex h-full items-center justify-between px-4 lg:px-6">
    <!-- Logo/Title -->
    <div class="flex items-center gap-3">
      <a href="/" class="flex items-center gap-3">
        <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-lg">
          DA
        </div>
        <span class="text-lg font-semibold text-slate-900 dark:text-white hidden sm:inline">
          Data Analytics in Marketing
        </span>
        <span class="text-lg font-semibold text-slate-900 dark:text-white sm:hidden">
          iMBA Study
        </span>
      </a>
    </div>

    <!-- Desktop Navigation -->
    <nav class="hidden lg:flex items-center gap-1">
      <a href="/glossary" class="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
        Glossary
      </a>
      <a href="/explore" class="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
        Explore
      </a>
      <a href="/exam-prep" class="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
        Exam Prep
      </a>
    </nav>

    <!-- Mobile Menu Button -->
    <div class="lg:hidden">
      <IconButton
        label={isMenuOpen ? 'Close menu' : 'Open menu'}
        onclick={onMenuToggle}
        variant="ghost"
        size="default"
      >
        {#if isMenuOpen}
          <!-- Close icon (X) -->
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        {:else}
          <!-- Hamburger icon -->
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        {/if}
      </IconButton>
    </div>
  </div>
</header>
