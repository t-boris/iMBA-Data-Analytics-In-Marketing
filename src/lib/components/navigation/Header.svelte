<script lang="ts">
  import { IconButton, ContactModal } from '$lib/components/ui';
  import { theme } from '$lib/stores';

  let {
    onMenuToggle,
    isMenuOpen = false
  }: {
    onMenuToggle: () => void;
    isMenuOpen?: boolean;
  } = $props();

  let isContactOpen = $state(false);

  // Get theme label for accessibility
  const themeLabel = $derived(
    theme.value === 'light' ? 'Switch to dark mode' :
    theme.value === 'dark' ? 'Switch to system theme' : 'Switch to light mode'
  );
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
    <nav class="hidden lg:flex items-center gap-2">
      <!-- Theme Toggle -->
      <button
        onclick={() => theme.toggle()}
        class="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        aria-label={themeLabel}
        title={themeLabel}
      >
        {#if theme.value === 'light'}
          <!-- Sun icon -->
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        {:else if theme.value === 'dark'}
          <!-- Moon icon -->
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        {:else}
          <!-- Computer/System icon -->
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        {/if}
      </button>

      <button
        onclick={() => isContactOpen = true}
        class="px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-2"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        Contact Author
      </button>
    </nav>

    <!-- Mobile Menu Button -->
    <div class="lg:hidden flex items-center gap-1">
      <!-- Theme Toggle (Mobile) -->
      <button
        onclick={() => theme.toggle()}
        class="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        aria-label={themeLabel}
      >
        {#if theme.value === 'light'}
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        {:else if theme.value === 'dark'}
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        {:else}
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        {/if}
      </button>

      <button
        onclick={() => isContactOpen = true}
        class="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        aria-label="Contact Author"
      >
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </button>
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

<ContactModal bind:isOpen={isContactOpen} onClose={() => isContactOpen = false} />
