<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen bg-slate-50">
	<nav class="border-b bg-white px-6 py-4">
		<h1 class="text-xl font-semibold text-slate-900">iMBA Study App</h1>
	</nav>
	<main class="p-6">
		{@render children()}
	</main>
</div>
