<script lang="ts">
  import { Card, Button } from '$lib/components/ui';
  import { quizConfig, type QuizLength, type QuizDifficulty } from '$lib/exam/store';
  import { modules } from '$lib/data/modules';

  interface Props {
    onStart: () => void;
  }

  let { onStart }: Props = $props();

  // Local state for configuration
  let selectedLength = $state<QuizLength>(10);
  let selectedDifficulty = $state<QuizDifficulty>('mixed');
  let selectedModuleId = $state<string>('1');

  // Length options with labels
  const lengthOptions: { value: QuizLength; label: string; description: string }[] = [
    { value: 5, label: '5', description: 'Quick review' },
    { value: 10, label: '10', description: 'Standard session' },
    { value: 15, label: '15', description: 'Thorough practice' },
    { value: 25, label: '25', description: 'Comprehensive' }
  ];

  // Difficulty options with descriptions
  const difficultyOptions: { value: QuizDifficulty; label: string; description: string; color: string }[] = [
    {
      value: 'easy',
      label: 'Easy',
      description: 'Foundational concept recognition',
      color: 'emerald'
    },
    {
      value: 'medium',
      label: 'Medium',
      description: 'Application and comparison',
      color: 'amber'
    },
    {
      value: 'hard',
      label: 'Hard',
      description: 'Synthesis and edge cases',
      color: 'red'
    },
    {
      value: 'mixed',
      label: 'Mixed',
      description: 'All difficulty levels',
      color: 'blue'
    }
  ];

  // Get active modules for selection
  const activeModules = $derived(modules.filter(m => m.status === 'active'));

  // Estimated question distribution for "mixed" difficulty
  const questionDistribution = $derived(() => {
    if (selectedDifficulty !== 'mixed') return null;
    const total = selectedLength;
    return {
      easy: Math.floor(total * 0.3),
      medium: Math.floor(total * 0.4),
      hard: total - Math.floor(total * 0.3) - Math.floor(total * 0.4)
    };
  });

  // Handle start quiz
  function handleStart() {
    quizConfig.set({
      length: selectedLength,
      difficulty: selectedDifficulty,
      moduleId: selectedModuleId
    });
    onStart();
  }

  // Get difficulty card classes
  function getDifficultyClasses(option: typeof difficultyOptions[0], isSelected: boolean): string {
    const baseClasses = 'cursor-pointer transition-all duration-200';

    if (isSelected) {
      const selectedColors: Record<string, string> = {
        emerald: 'ring-2 ring-emerald-500 bg-emerald-50 dark:bg-emerald-900/20',
        amber: 'ring-2 ring-amber-500 bg-amber-50 dark:bg-amber-900/20',
        red: 'ring-2 ring-red-500 bg-red-50 dark:bg-red-900/20',
        blue: 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20'
      };
      return `${baseClasses} ${selectedColors[option.color]}`;
    }

    return `${baseClasses} hover:border-slate-400 dark:hover:border-slate-500`;
  }

  // Get difficulty badge color
  function getDifficultyBadgeColor(color: string): string {
    const colors: Record<string, string> = {
      emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300',
      amber: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
      red: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300',
      blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
    };
    return colors[color] || colors.blue;
  }
</script>

<div class="space-y-8">
  <!-- Module Selection (if multiple modules are active) -->
  {#if activeModules.length > 1}
    <div>
      <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        Select Module
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {#each activeModules as module (module.id)}
          <button
            type="button"
            onclick={() => selectedModuleId = module.id}
            class="text-left"
          >
            <Card
              padding="sm"
              hover
              class={selectedModuleId === module.id
                ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'hover:border-slate-400 dark:hover:border-slate-500'}
            >
              <div class="flex items-center gap-3">
                <span class="text-2xl">{module.icon}</span>
                <div>
                  <p class="font-medium text-slate-900 dark:text-white">
                    {module.name}
                  </p>
                  <p class="text-sm text-slate-500 dark:text-slate-400">
                    {module.lectures.length} lectures
                  </p>
                </div>
              </div>
            </Card>
          </button>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Quiz Length Selection -->
  <div>
    <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">
      Number of Questions
    </h3>
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {#each lengthOptions as option (option.value)}
        <button
          type="button"
          onclick={() => selectedLength = option.value}
          class="text-center"
        >
          <Card
            padding="sm"
            hover
            class={selectedLength === option.value
              ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'hover:border-slate-400 dark:hover:border-slate-500'}
          >
            <p class="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              {option.label}
            </p>
            <p class="text-xs text-slate-500 dark:text-slate-400">
              {option.description}
            </p>
          </Card>
        </button>
      {/each}
    </div>
  </div>

  <!-- Difficulty Selection -->
  <div>
    <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">
      Difficulty Level
    </h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {#each difficultyOptions as option (option.value)}
        <button
          type="button"
          onclick={() => selectedDifficulty = option.value}
          class="text-left"
        >
          <Card
            padding="sm"
            hover
            class={getDifficultyClasses(option, selectedDifficulty === option.value)}
          >
            <div class="flex items-start gap-3">
              <span class={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${getDifficultyBadgeColor(option.color)}`}>
                {option.label.charAt(0)}
              </span>
              <div class="flex-1 min-w-0">
                <p class="font-medium text-slate-900 dark:text-white">
                  {option.label}
                </p>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {option.description}
                </p>
              </div>
            </div>
          </Card>
        </button>
      {/each}
    </div>

    <!-- Question Distribution Preview (only for mixed) -->
    {#if selectedDifficulty === 'mixed' && questionDistribution()}
      {@const dist = questionDistribution()}
      <div class="mt-4 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
        <p class="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Estimated question distribution:
        </p>
        <div class="flex flex-wrap gap-4 text-sm">
          <span class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span class="text-slate-600 dark:text-slate-400">Easy: {dist?.easy}</span>
          </span>
          <span class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-amber-500"></span>
            <span class="text-slate-600 dark:text-slate-400">Medium: {dist?.medium}</span>
          </span>
          <span class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-red-500"></span>
            <span class="text-slate-600 dark:text-slate-400">Hard: {dist?.hard}</span>
          </span>
        </div>
      </div>
    {/if}
  </div>

  <!-- Start Button -->
  <div class="pt-4">
    <Button
      variant="primary"
      size="lg"
      class="w-full sm:w-auto"
      onclick={handleStart}
    >
      <span class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="6 3 20 12 6 21 6 3"/>
        </svg>
        Start Quiz ({selectedLength} questions)
      </span>
    </Button>
  </div>
</div>
