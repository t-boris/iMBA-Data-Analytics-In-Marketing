/**
 * Content types for lecture pages.
 * These types define the structure of educational content.
 */

import type { DiagramData } from '$lib/components/diagrams';
import type { ExplanationStep } from '$lib/components/animation';

/**
 * A content section within a lecture.
 * Can be text, an animated explanation, or a static diagram.
 */
export interface ContentSection {
	/** Unique identifier for the section */
	id: string;
	/** Section type determines how it's rendered */
	type: 'text' | 'explanation' | 'diagram';
	/** Section title (optional) */
	title?: string;
	/** Text content for 'text' and 'diagram' sections */
	content?: string;
	/** Diagram data for 'diagram' sections */
	diagram?: DiagramData;
	/** Explanation configuration for 'explanation' sections */
	explanation?: {
		steps: ExplanationStep[];
	};
}

/**
 * Complete lecture content structure.
 */
export interface LectureContent {
	/** Lecture identifier matching the lecture slug */
	lectureId: string;
	/** Array of content sections in display order */
	sections: ContentSection[];
}
