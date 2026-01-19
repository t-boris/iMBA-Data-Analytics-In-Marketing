<script lang="ts">
  import { page } from '$app/stores';
  import { Button } from '$lib/components/ui';

  interface Module {
    id: string;
    name: string;
    lectures: number;
  }

  let {
    modules = [],
    isOpen = false,
    onClose
  }: {
    modules?: Module[];
    isOpen?: boolean;
    onClose?: () => void;
  } = $props();

  // Get current module ID from route for active highlighting
  const currentModuleId = $derived.by(() => {
    const pathname = $page.url.pathname;
    const match = pathname.match(/\/modules\/(\d+)/);
    return match ? match[1] : null;
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
  class="fixed top-16 bottom-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 {isOpen ? 'translate-x-0' : '-translate-x-full'}"
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
            {@const isActive = currentModuleId === module.id}
            <li>
              <a
                href="/modules/{module.id}"
                onclick={onClose}
                class="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors {isActive
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}"
              >
                <div class="flex items-center gap-3">
                  <span class="flex h-6 w-6 items-center justify-center rounded-md text-xs font-semibold {isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'}">
                    {module.id}
                  </span>
                  <span class="truncate">{module.name}</span>
                </div>

                <!-- Lecture count badge / progress indicator -->
                {#if module.lectures > 0}
                  <span class="text-xs text-slate-500 dark:text-slate-400">
                    {module.lectures} lectures
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

    <!-- Sidebar footer -->
    <div class="px-4 py-4 border-t border-slate-200 dark:border-slate-700">
      <div class="text-xs text-slate-500 dark:text-slate-400">
        MBA 564A - Spring 2026
      </div>
    </div>
  </div>
</aside>
