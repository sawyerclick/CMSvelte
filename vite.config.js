import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';
import dsv from '@rollup/plugin-dsv';
import { imagetools } from 'vite-imagetools';
import preprocess from 'svelte-preprocess';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	return {
		base: '/',
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
