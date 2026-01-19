import { error } from '@sveltejs/kit';
import { getModuleBySlug, getLectureBySlug, modules } from '$lib/data/modules';
import type { PageLoad, EntryGenerator } from './$types';

// Generate entries for all module/lecture combinations for prerendering
export const entries: EntryGenerator = () => {
	const entries: { slug: string; lecture: string }[] = [];

	for (const module of modules) {
		for (const lecture of module.lectures) {
			entries.push({
				slug: module.slug,
				lecture: lecture.slug
			});
		}
	}

	return entries;
};

export const load: PageLoad = async ({ params }) => {
	const module = getModuleBySlug(params.slug);

	if (!module) {
		throw error(404, 'Module not found');
	}

	const lecture = getLectureBySlug(params.slug, params.lecture);

	if (!lecture) {
		throw error(404, 'Lecture not found');
	}

	// Dynamically import lecture content
	let content = null;
	try {
		// Module 1 content is in $lib/content/module1/
		if (module.id === '1') {
			const contentModule = await import(`$lib/content/module1/${params.lecture}.ts`);
			content = contentModule.lectureContent;
		}
	} catch (e) {
		// Content not yet available - that's fine for coming-soon lectures
		console.log(`Content not available for lecture: ${params.lecture}`);
	}

	return {
		module,
		lecture,
		content
	};
};
