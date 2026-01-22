import type { PageLoad } from './$types';

// Disable prerendering for this page since it uses URL search params
export const prerender = false;

export const load: PageLoad = ({ url }) => {
	const length = parseInt(url.searchParams.get('length') || '10');
	const difficulty = url.searchParams.get('difficulty') || 'mixed';
	const moduleId = url.searchParams.get('module') || 'all';

	return { length, difficulty, moduleId };
};
