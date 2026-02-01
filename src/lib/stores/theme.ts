/**
 * Theme store for managing dark/light mode.
 * Supports three modes: 'light', 'dark', 'system'
 */

import { browser } from '$app/environment';

type Theme = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'theme-preference';

// Get initial theme from localStorage or default to 'system'
function getInitialTheme(): Theme {
	if (!browser) return 'system';
	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored === 'light' || stored === 'dark' || stored === 'system') {
		return stored;
	}
	return 'system';
}

// Determine if dark mode should be active
function shouldBeDark(theme: Theme): boolean {
	if (!browser) return false;
	if (theme === 'dark') return true;
	if (theme === 'light') return false;
	// System preference
	return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Apply theme to document
function applyTheme(theme: Theme) {
	if (!browser) return;
	const isDark = shouldBeDark(theme);
	document.documentElement.classList.toggle('dark', isDark);
}

// Create a simple reactive store
let currentTheme = $state<Theme>(getInitialTheme());

// Apply initial theme
if (browser) {
	applyTheme(currentTheme);

	// Listen for system preference changes when in 'system' mode
	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
		if (currentTheme === 'system') {
			applyTheme('system');
		}
	});
}

export const theme = {
	get value() {
		return currentTheme;
	},

	set(newTheme: Theme) {
		currentTheme = newTheme;
		if (browser) {
			localStorage.setItem(STORAGE_KEY, newTheme);
			applyTheme(newTheme);
		}
	},

	toggle() {
		// Cycle through: light -> dark -> system -> light
		const next: Theme =
			currentTheme === 'light' ? 'dark' : currentTheme === 'dark' ? 'system' : 'light';
		this.set(next);
	},

	get isDark() {
		return shouldBeDark(currentTheme);
	}
};
