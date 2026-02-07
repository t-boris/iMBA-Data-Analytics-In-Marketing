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
		// Module 3 content - User, Firm & AI-Generated Content
		if (module.id === '3') {
			switch (params.lecture) {
				case 'intro-online-content': {
					const mod = await import('$lib/content/module3/intro-online-content');
					content = mod.lectureContent;
					break;
				}
				case 'text-analysis-history': {
					const mod = await import('$lib/content/module3/text-analysis-history');
					content = mod.lectureContent;
					break;
				}
				case 'types-of-content': {
					const mod = await import('$lib/content/module3/types-of-content');
					content = mod.lectureContent;
					break;
				}
				case 'ugc-deep-dive': {
					const mod = await import('$lib/content/module3/ugc-deep-dive');
					content = mod.lectureContent;
					break;
				}
				case 'fgc-deep-dive': {
					const mod = await import('$lib/content/module3/fgc-deep-dive');
					content = mod.lectureContent;
					break;
				}
				case 'agc-deep-dive': {
					const mod = await import('$lib/content/module3/agc-deep-dive');
					content = mod.lectureContent;
					break;
				}
				case 'emerging-concerns': {
					const mod = await import('$lib/content/module3/emerging-concerns');
					content = mod.lectureContent;
					break;
				}
				case 'influencer-marketing': {
					const mod = await import('$lib/content/module3/influencer-marketing');
					content = mod.lectureContent;
					break;
				}
				case 'sentiment-analysis': {
					const mod = await import('$lib/content/module3/sentiment-analysis');
					content = mod.lectureContent;
					break;
				}
				case 'python-sentiment-demo': {
					const mod = await import('$lib/content/module3/python-sentiment-demo');
					content = mod.lectureContent;
					break;
				}
			}
		}
		// Module 4 content - Customer Preferences and Lifetime Value Analysis
		if (module.id === '4') {
			switch (params.lecture) {
				case 'consumer-demand-preferences': {
					const mod = await import('$lib/content/module4/consumer-demand-preferences');
					content = mod.lectureContent;
					break;
				}
				case 'stp-framework': {
					const mod = await import('$lib/content/module4/stp-framework');
					content = mod.lectureContent;
					break;
				}
				case 'conjoint-analysis': {
					const mod = await import('$lib/content/module4/conjoint-analysis');
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
