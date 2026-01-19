import { error } from '@sveltejs/kit';
import { getModuleBySlug, modules } from '$lib/data/modules';
import type { PageLoad, EntryGenerator } from './$types';

// Generate entries for all modules for prerendering
export const entries: EntryGenerator = () => {
	return modules.map((module) => ({ slug: module.slug }));
};

export const load: PageLoad = ({ params }) => {
	const module = getModuleBySlug(params.slug);

	if (!module) {
		throw error(404, 'Module not found');
	}

	return { module };
};
