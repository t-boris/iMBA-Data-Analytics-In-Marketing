/**
 * Theme store for managing dark/light mode.
 * Supports three modes: 'light', 'dark', 'system'
 */

import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark' | 'system';

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

// Create the writable store
function createThemeStore() {
	const { subscribe, set, update } = writable<Theme>(getInitialTheme());

	// Apply initial theme on client
	if (browser) {
		// Subscribe to apply theme changes
		subscribe((theme) => {
			applyTheme(theme);
		});

		// Listen for system preference changes
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
			update((current) => {
				if (current === 'system') {
					applyTheme('system');
				}
				return current;
			});
		});
	}

	return {
		subscribe,
		set: (value: Theme) => {
			if (browser) {
				localStorage.setItem(STORAGE_KEY, value);
			}
			set(value);
		},
		toggle: () => {
			update((current) => {
				const next: Theme =
					current === 'light' ? 'dark' : current === 'dark' ? 'system' : 'light';
				if (browser) {
					localStorage.setItem(STORAGE_KEY, next);
				}
				return next;
			});
		}
	};
}

export const theme = createThemeStore();

// Derived store for checking if currently dark
export const isDark = derived(theme, ($theme) => shouldBeDark($theme));
