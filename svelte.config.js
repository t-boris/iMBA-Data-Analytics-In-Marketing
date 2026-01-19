import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: false,
			strict: true
		}),
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				// Ignore 404s for placeholder navigation links (routes will be created later)
				if (path.startsWith('/modules') || path === '/glossary' || path === '/exam-prep') {
					return;
				}
				// Ignore 404s for module lecture routes (will be created in Phase 6)
				if (path.match(/^\/module\/[^/]+\/[^/]+$/)) {
					return;
				}
				// Otherwise, fail the build
				throw new Error(message);
			},
			handleUnseenRoutes: 'ignore'
		}
	}
};

export default config;
