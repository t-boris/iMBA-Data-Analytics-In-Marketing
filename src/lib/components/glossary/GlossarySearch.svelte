<script lang="ts">
	let {
		value = '',
		onSearch
	}: {
		value?: string;
		onSearch: (query: string) => void;
	} = $props();

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		onSearch(target.value);
	}

	function handleClear() {
		onSearch('');
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			handleClear();
		}
	}
</script>

<div class="relative">
	<!-- Search icon -->
	<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="text-slate-400 dark:text-slate-500"
		>
			<circle cx="11" cy="11" r="8" />
			<path d="m21 21-4.3-4.3" />
		</svg>
	</div>

	<!-- Search input -->
	<input
		type="text"
		{value}
		oninput={handleInput}
		onkeydown={handleKeydown}
		placeholder="Search concepts..."
		class="w-full pl-10 pr-10 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
	/>

	<!-- Clear button -->
	{#if value}
		<button
			type="button"
			onclick={handleClear}
			class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
			aria-label="Clear search"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<circle cx="12" cy="12" r="10" />
				<path d="m15 9-6 6" />
				<path d="m9 9 6 6" />
			</svg>
		</button>
	{/if}
</div>
