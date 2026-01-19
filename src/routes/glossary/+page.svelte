<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { fly } from 'svelte/transition';
	import { Container } from '$lib/components/ui';
	import {
		GlossarySearch,
		GlossaryFilter,
		AlphabetNav,
		ConceptList
	} from '$lib/components/glossary';
	import {
		allConcepts,
		categoryInfo,
		allCategories,
		searchConcepts,
		filterByCategory,
		getAvailableLetters,
		type ConceptCategory,
		type GlossaryConcept
	} from '$lib/glossary';

	// Get category info array for filter component
	const categories = allCategories.map((id) => categoryInfo[id]);

	// State from URL params or defaults
	let searchQuery = $state($page.url.searchParams.get('q') || '');
	let selectedCategory = $state<ConceptCategory | 'all'>(
		($page.url.searchParams.get('category') as ConceptCategory | 'all') || 'all'
	);

	// Filter concepts based on search and category
	let filteredConcepts = $derived.by(() => {
		let result = allConcepts;

		// Apply category filter
		result = filterByCategory(selectedCategory, result);

		// Apply search filter
		result = searchConcepts(searchQuery, result);

		return result;
	});

	// Get available letters from filtered concepts
	let availableLetters = $derived(getAvailableLetters(filteredConcepts));

	// Update URL when filters change
	function updateUrl() {
		const params = new URLSearchParams();
		if (searchQuery) params.set('q', searchQuery);
		if (selectedCategory !== 'all') params.set('category', selectedCategory);

		const newUrl = params.toString() ? `?${params.toString()}` : '';
		goto(`/glossary${newUrl}`, { replaceState: true, noScroll: true });
	}

	// Handle search
	function handleSearch(query: string) {
		searchQuery = query;
		updateUrl();
	}

	// Handle category change
	function handleCategoryChange(category: ConceptCategory | 'all') {
		selectedCategory = category;
		updateUrl();
	}

	// Handle letter click - scroll to section
	function handleLetterClick(letter: string) {
		const element = document.getElementById(`letter-${letter}`);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}

	// Handle concept click (for future detail view)
	function handleConceptClick(concept: GlossaryConcept) {
		// Future: navigate to concept detail or open modal
		console.log('Concept clicked:', concept.id);
	}
</script>

<svelte:head>
	<title>Concept Glossary | Data Analytics in Marketing</title>
	<meta
		name="description"
		content="Explore key concepts in causal inference, experimental design, and marketing analytics. Search and filter through definitions, methods, and more."
	/>
</svelte:head>

<div transition:fly={{ y: 20, duration: 300 }}>
	<!-- Hero Section -->
	<section class="py-12 md:py-20 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 -mx-6 -mt-6 px-6 mb-8">
		<Container size="lg">
			<div class="text-center max-w-3xl mx-auto">
				<div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-6">
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
						class="text-blue-600 dark:text-blue-400"
					>
						<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
					</svg>
				</div>
				<h1 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
					Concept Glossary
				</h1>
				<p class="text-xl text-slate-600 dark:text-slate-300 mb-8">
					Explore key terms and definitions in causal inference, experimental design, and marketing analytics.
					Search by keyword or browse by category.
				</p>
				<div class="flex flex-wrap justify-center gap-4 text-sm text-slate-500 dark:text-slate-400">
					<span class="flex items-center gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0" />
							<path d="M12 8v4l2 2" />
						</svg>
						{allConcepts.length} Concepts
					</span>
					<span class="flex items-center gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M10 3H6a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h4M16 17l5-5-5-5M19.8 12H9" />
						</svg>
						{allCategories.length} Categories
					</span>
				</div>
			</div>
		</Container>
	</section>

	<!-- Search Section -->
	<section class="pb-6">
		<Container size="lg">
			<GlossarySearch value={searchQuery} onSearch={handleSearch} />
		</Container>
	</section>

	<!-- Filters Section -->
	<section class="pb-6">
		<Container size="lg">
			<GlossaryFilter
				{selectedCategory}
				onCategoryChange={handleCategoryChange}
				{categories}
			/>
		</Container>
	</section>

	<!-- A-Z Navigation -->
	<section class="pb-8 sticky top-0 z-10 bg-gradient-to-b from-slate-50 to-transparent dark:from-slate-900 pt-4 -mt-4">
		<Container size="lg">
			<AlphabetNav {availableLetters} onLetterClick={handleLetterClick} />
		</Container>
	</section>

	<!-- Results summary -->
	<section class="pb-4">
		<Container size="lg">
			<p class="text-sm text-slate-500 dark:text-slate-400">
				{#if searchQuery || selectedCategory !== 'all'}
					Showing {filteredConcepts.length} of {allConcepts.length} concepts
					{#if searchQuery}
						matching "{searchQuery}"
					{/if}
					{#if selectedCategory !== 'all'}
						in {categoryInfo[selectedCategory].label}
					{/if}
				{:else}
					{allConcepts.length} concepts
				{/if}
			</p>
		</Container>
	</section>

	<!-- Concept List -->
	<section class="pb-16">
		<Container size="lg">
			<ConceptList concepts={filteredConcepts} onConceptClick={handleConceptClick} />
		</Container>
	</section>

	<!-- Footer CTA -->
	<section class="py-12 bg-slate-100 dark:bg-slate-800/50 -mx-6 px-6">
		<Container size="default">
			<div class="text-center">
				<h2 class="text-xl font-bold text-slate-900 dark:text-white mb-4">
					Ready to Test Your Knowledge?
				</h2>
				<p class="text-slate-600 dark:text-slate-400 mb-6">
					Put these concepts into practice with our interactive exam preparation tools.
				</p>
				<a
					href="/exam-prep"
					class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
				>
					Start Exam Prep
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="m9 18 6-6-6-6" />
					</svg>
				</a>
			</div>
		</Container>
	</section>
</div>
