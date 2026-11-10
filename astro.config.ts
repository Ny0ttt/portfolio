import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import expressiveCode from 'astro-expressive-code';
import { loadEnv } from 'vite';
import spectre, { type GiscusMapping } from './package/src';
import { logbookCode } from './src/ec-theme';

// const {
// 	GISCUS_REPO,
// 	GISCUS_REPO_ID,
// 	GISCUS_CATEGORY,
// 	GISCUS_CATEGORY_ID,
// 	GISCUS_MAPPING,
// 	GISCUS_STRICT,
// 	GISCUS_REACTIONS_ENABLED,
// 	GISCUS_EMIT_METADATA,
// 	GISCUS_LANG,
// } = loadEnv(process.env.NODE_ENV!, process.cwd(), '');

// https://astro.build/config
const config = defineConfig({
	site: 'https://ny0ttt.github.io',
	base: '/portfolio',
	output: 'static',
	vite: {
		server: {
			allowedHosts: 'all',
		},
	},
	integrations: [
		expressiveCode({
			themes: [logbookCode],
			useDarkModeMediaQuery: false,
			styleOverrides: {
				borderRadius: '0px',
				borderColor: 'var(--code-rule)',
				codeBackground: 'var(--code-bg)',
				codeForeground: 'var(--code-fg)',
				codeFontFamily: "'JetBrains Mono', ui-monospace, monospace",
				codeFontSize: '14px',
				uiFontFamily: "'JetBrains Mono', ui-monospace, monospace",
				frames: {
					frameBoxShadowCssValue: 'none',
					editorBackground: 'var(--code-bg)',
					editorTabBarBackground: 'var(--code-bg)',
					editorActiveTabBackground: 'var(--code-bg)',
					editorActiveTabForeground: 'var(--code-muted)',
					editorActiveTabIndicatorTopColor: 'transparent',
					editorActiveTabIndicatorBottomColor: 'var(--accent)',
					editorTabBarBorderBottomColor: 'var(--code-rule)',
					editorTabBorderRadius: '0px',
					terminalBackground: 'var(--code-bg)',
					terminalTitlebarBackground: 'var(--code-bg)',
					terminalTitlebarForeground: 'var(--code-muted)',
					terminalTitlebarBorderBottomColor: 'var(--code-rule)',
					terminalTitlebarDotsOpacity: '0.35',
				},
			},
		}),
		mdx(),
		sitemap(),
		spectre({
			name: 'Rasyid Hamidun',
			themeColor: '#a8420a',
			openGraph: {
				home: {
					title: 'Rasyid Hamidun',
					description: 'Rasyid Hamidun — software engineer. Systems, tooling and the formats underneath: built, taken apart, documented.',
				},
				blog: {
					title: 'Writing',
					description: 'Long-form write-ups by Rasyid Hamidun: what I opened, what was inside, what broke.',
				},
				projects: {
					title: 'Projects',
					description: 'Things Rasyid Hamidun has built, with the problem, the build and the result for each.',
				},
			},
			giscus: false,
			// giscus: {
			// 	repository: GISCUS_REPO,
			// 	repositoryId: GISCUS_REPO_ID,
			// 	category: GISCUS_CATEGORY,
			// 	categoryId: GISCUS_CATEGORY_ID,
			// 	mapping: GISCUS_MAPPING as GiscusMapping,
			// 	strict: GISCUS_STRICT === 'true',
			// 	reactionsEnabled: GISCUS_REACTIONS_ENABLED === 'true',
			// 	emitMetadata: GISCUS_EMIT_METADATA === 'true',
			// 	lang: GISCUS_LANG,
			// },
		}),
	],
});

export default config;
