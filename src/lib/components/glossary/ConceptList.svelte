<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { GlossaryConcept } from '$lib/glossary/types';
	import { groupByFirstLetter } from '$lib/glossary/utils';
	import ConceptCard from './ConceptCard.svelte';

	let {
		concepts,
		onConceptClick
	}: {
		concepts: GlossaryConcept[];
		onConceptClick?: (concept: GlossaryConcept) => void;
	} = $props();

	// Group concepts by first letter
	let groupedConcepts = $derived(groupByFirstLetter(concepts));

	// Track which card is expanded (only one at a time)
	let expandedId = $state<string | null>(null);

	function handleToggle(id: string) {
		// Toggle: if clicking the same card, collapse; otherwise expand the new one
		expandedId = expandedId === id ? null : id;
	}

	function handleRelatedClick(id: string) {
		// First collapse current card
		expandedId = null;

		// Find which letter section the target concept belongs to
		const targetConcept = concepts.find((c) => c.id === id);
		if (!targetConcept) return;

		// Small delay to allow collapse animation to complete
		setTimeout(() => {
			// Scroll to the target concept
			const targetElement = document.getElementById(`concept-${id}`);
			if (targetElement) {
				targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

				// After scrolling, expand the target card
				setTimeout(() => {
					expandedId = id;
				}, 300);
			}
		}, 100);
	}

	function handleConceptClick(concept: GlossaryConcept) {
		if (onConceptClick) {
			onConceptClick(concept);
		}
	}
</script>

{#if concepts.length === 0}
	<!-- Empty state -->
	<div class="text-center py-16">
		<div class="inline-flex items-center justify-center w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full mb-4">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="32"
				height="32"
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
		<h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2">
			No concepts found
		</h3>
		<p class="text-slate-500 dark:text-slate-400">
			Try adjusting your search or filter criteria
		</p>
	</div>
{:else}
	<div class="space-y-8">
		{#each [...groupedConcepts.entries()] as [letter, letterConcepts], groupIndex (letter)}
			<section id="letter-{letter}" class="scroll-mt-24">
				<!-- Letter header -->
				<h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-700">
					{letter}
				</h2>

				<!-- Concept grid -->
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					{#each letterConcepts as concept, index (concept.id)}
						<div
							in:fly={{ y: 20, delay: (groupIndex * letterConcepts.length + index) * 30, duration: 300 }}
						>
							<ConceptCard
								{concept}
								allConcepts={concepts}
								isExpanded={expandedId === concept.id}
								onToggle={handleToggle}
								onRelatedClick={handleRelatedClick}
							/>
						</div>
					{/each}
				</div>
			</section>
		{/each}
	</div>
{/if}
