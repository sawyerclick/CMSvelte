import dsv from '@rollup/plugin-dsv';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';
import preprocess from 'svelte-preprocess';
import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';
import cssInjectedByJs from 'vite-plugin-css-injected-by-js';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	return {
		base: mode === 'development' ? '/' : 'https://cmsvelte.s3.amazonaws.com/',
		build: {
			// mimic svelte-template output
			outDir: 'build',

			// build without hashes in filenames
			// useful for not having to re-embed
			rollupOptions: {
				output: {
					entryFileNames: `[name].js`,
					chunkFileNames: `[name].js`,
					assetFileNames: `[name].[ext]`
				}
			}
		},
		resolve: {
			alias: {
				// alias to find all dev files that live in /lib
				$lib: path.resolve('./src/lib')
			}
		},
		plugins: [
			cssInjectedByJs({ styleId: 'cmsvelte-styles' }),
			dsv(),
			imagetools(),
			svelte({
				preprocess: preprocess({
					postcss: true
				})
			})
		]
	};
});
