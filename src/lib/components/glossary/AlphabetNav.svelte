<script lang="ts">
	const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

	let {
		availableLetters,
		onLetterClick
	}: {
		availableLetters: Set<string>;
		onLetterClick: (letter: string) => void;
	} = $props();
</script>

<nav
	class="flex flex-wrap gap-1 justify-center py-3 px-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
	aria-label="Alphabetical navigation"
>
	{#each ALPHABET as letter (letter)}
		{@const isAvailable = availableLetters.has(letter)}
		<button
			type="button"
			onclick={() => isAvailable && onLetterClick(letter)}
			disabled={!isAvailable}
			class="w-8 h-8 flex items-center justify-center rounded font-medium text-sm transition-all {isAvailable
				? 'text-slate-700 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-400 cursor-pointer'
				: 'text-slate-300 dark:text-slate-600 cursor-not-allowed'}"
			aria-label={isAvailable ? `Jump to ${letter}` : `No concepts starting with ${letter}`}
		>
			{letter}
		</button>
	{/each}
</nav>
