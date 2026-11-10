import githubDark from "@shikijs/themes/github-dark";
import type { ThemeRegistration } from "shiki";

/**
 * Code blocks stay dark in both site themes (see plan: --code-bg).
 * Colours of the frame itself come from CSS variables via styleOverrides
 * in astro.config.ts, so this only needs the syntax palette.
 */
const logbookCode: ThemeRegistration = {
	...githubDark,
	name: "Logbook Code",
	type: "dark",
	colors: {
		...githubDark.colors,
		"editor.background": "#1f1c17",
		"editor.foreground": "#ebe5d8",
	},
};

export { logbookCode };
