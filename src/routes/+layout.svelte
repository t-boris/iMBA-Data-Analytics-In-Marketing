<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Header, Sidebar } from '$lib/components/navigation';
	import { modules } from '$lib/data/modules';

	let { children } = $props();

	// Mobile menu state
	let isMobileMenuOpen = $state(false);

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}

	function closeMobileMenu() {
		isMobileMenuOpen = false;
	}
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
	<main class="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-800 lg:ml-[var(--sidebar-width,256px)]">
		<div class="p-6">
			{@render children()}
		</div>
	</main>
</div>
