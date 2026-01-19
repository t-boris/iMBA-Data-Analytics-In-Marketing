<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Header, Sidebar } from '$lib/components/navigation';

	let { children } = $props();

	// Mobile menu state
	let isMobileMenuOpen = $state(false);

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}

	function closeMobileMenu() {
		isMobileMenuOpen = false;
	}

	// Placeholder module data (will be replaced by real data in 03-02)
	const modules = [
		{ id: '1', name: 'Causal Analysis', lectures: 8 },
		{ id: '2', name: 'Module 2', lectures: 0 },
		{ id: '3', name: 'Module 3', lectures: 0 },
		{ id: '4', name: 'Module 4', lectures: 0 },
		{ id: '5', name: 'Module 5', lectures: 0 },
		{ id: '6', name: 'Module 6', lectures: 0 },
		{ id: '7', name: 'Module 7', lectures: 0 },
		{ id: '8', name: 'Module 8', lectures: 0 }
	];
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen bg-white dark:bg-slate-900">
	<!-- Header (sticky top) -->
	<Header onMenuToggle={toggleMobileMenu} isMenuOpen={isMobileMenuOpen} />

	<!-- Sidebar (fixed left on desktop, overlay on mobile) -->
	<Sidebar modules={modules} isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />

	<!-- Main content area (with left margin on desktop to account for sidebar) -->
	<main class="lg:ml-64 min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-800">
		<div class="p-6">
			{@render children()}
		</div>
	</main>
</div>
