<script lang="ts">
	import type { GlossaryConcept } from '$lib/glossary/types';
	import { getConceptById } from '$lib/glossary/utils';

	let {
		conceptIds,
		allConcepts,
		onClick
	}: {
		conceptIds: string[];
		allConcepts: GlossaryConcept[];
		onClick?: (id: string) => void;
	} = $props();

	// Get actual concept objects from IDs
	let relatedConcepts = $derived(
		conceptIds
			.map((id) => getConceptById(id, allConcepts))
			.filter((c): c is GlossaryConcept => c !== undefined)
	);

	function handleClick(id: string) {
		if (onClick) {
			onClick(id);
		}
	}

	function handleKeydown(event: KeyboardEvent, id: string) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleClick(id);
		}
	}
</script>

<div class="flex flex-wrap gap-2">
	{#each relatedConcepts as related (related.id)}
		<button
			type="button"
			onclick={() => handleClick(related.id)}
			onkeydown={(e) => handleKeydown(e, related.id)}
			class="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full
				bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300
				hover:bg-blue-100 dark:hover:bg-blue-900/40
				focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
				transition-colors cursor-pointer"
		>
			{related.term}
		</button>
	{/each}
</div>
