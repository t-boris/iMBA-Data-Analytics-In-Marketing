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

	// Import lecture content based on module and lecture slug
	let content = null;
	try {
		// Module 1 content - import available lecture content
		if (module.id === '1') {
			switch (params.lecture) {
				case 'introduction': {
					const mod = await import('$lib/content/module1/introduction');
					content = mod.lectureContent;
					break;
				}
				case 'key-thinkers': {
					const mod = await import('$lib/content/module1/key-thinkers');
					content = mod.lectureContent;
					break;
				}
				case 'randomized-experiments': {
					const mod = await import('$lib/content/module1/randomized-experiments');
					content = mod.lectureContent;
					break;
				}
				case 'matching-methods': {
					const mod = await import('$lib/content/module1/matching-methods');
					content = mod.lectureContent;
					break;
				}
				case 'instrumental-variables': {
					const mod = await import('$lib/content/module1/instrumental-variables');
					content = mod.lectureContent;
					break;
				}
				case 'difference-in-differences': {
					const mod = await import('$lib/content/module1/difference-in-differences');
					content = mod.lectureContent;
					break;
				}
				case 'field-experiments': {
					const mod = await import('$lib/content/module1/field-experiments');
					content = mod.lectureContent;
					break;
				}
				case 'python-demo-did': {
					const mod = await import('$lib/content/module1/python-demo-did');
					content = mod.lectureContent;
					break;
				}
			}
		}
		// Module 2 content - AI, Prediction & Machine Learning
		if (module.id === '2') {
			switch (params.lecture) {
				case 'introduction-ai-ml': {
					const mod = await import('$lib/content/module2/introduction-ai-ml');
					content = mod.lectureContent;
					break;
				}
				case 'ml-frameworks': {
					const mod = await import('$lib/content/module2/ml-frameworks');
					content = mod.lectureContent;
					break;
				}
				case 'geotracking-privacy': {
					const mod = await import('$lib/content/module2/geotracking-privacy');
					content = mod.lectureContent;
					break;
				}
				case 'llm-market-research': {
					const mod = await import('$lib/content/module2/llm-market-research');
					content = mod.lectureContent;
					break;
				}
				case 'prediction-causality': {
					const mod = await import('$lib/content/module2/prediction-causality');
					content = mod.lectureContent;
					break;
				}
				case 'ai-ethics': {
					const mod = await import('$lib/content/module2/ai-ethics');
					content = mod.lectureContent;
					break;
				}
				case 'smartwatch-adoption': {
					const mod = await import('$lib/content/module2/smartwatch-adoption');
					content = mod.lectureContent;
					break;
				}
				case 'ml-python-demo': {
					const mod = await import('$lib/content/module2/ml-python-demo');
					content = mod.lectureContent;
					break;
				}
			}
		}
	} catch (e) {
		// Content not yet available - that's fine for coming-soon lectures
		console.log(`Content not available for lecture: ${params.lecture}`, e);
	}

	return {
		module,
		lecture,
		content
	};
};
