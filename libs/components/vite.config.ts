/// <reference types="vitest" />
import { defineConfig } from 'vite';

import viteTsConfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
import * as path from 'path';

export default defineConfig({
	cacheDir: '../../../node_modules/.vite/components',

	plugins: [
		dts({
			entryRoot: 'src',
			tsConfigFilePath: path.join(__dirname, 'tsconfig.lib.json'),
			skipDiagnostics: true,
		}),

		viteTsConfigPaths({
			root: '../../',
		}),
	],

	worker: {
	 plugins: [
	   viteTsConfigPaths({
	     root: '../../',
	   }),
	 ],
	},

	// Configuration for building your library.
	// See: https://vitejs.dev/guide/build.html#library-mode
	build: {
		lib: {
			// Could also be a dictionary or array of multiple entry points.
			entry: 'src/index.ts',
			name: 'components',
			fileName: 'index',
			// Change this to the formats you want to support.
			// Don't forget to update your package.json as well.
			formats: ['es', 'cjs'],
		},
		rollupOptions: {
			// External packages that should not be bundled into your library.
			external: [],
		},
	},
});
