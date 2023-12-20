// vite.config.js
import fs from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as esbuild from 'esbuild';
import dns from 'dns';

const rollupPlugin = (matchers) => ({
	name: 'js-in-jsx',
	load(id) {
		if (matchers.some((matcher) => matcher.test(id))) {
			const file = fs.readFileSync(id, { encoding: 'utf-8' });
			return esbuild.transformSync(file, { loader: 'jsx' });
		}
	},
});

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react({
			babel: {
				plugins: [
					[
						'babel-plugin-styled-components',
						{
							pure: true,
							transpileTemplateLiterals: false,
						},
					],
				],
				babelrc: true,
				configFile: true,
			},
		}),
	],
	build: {
		rollupOptions: {
			plugins: [rollupPlugin([/\/src\/.*\.js$/, /\/api\/.*\.js$/])],
		},
		commonjsOptions: {
			transformMixedEsModules: true,
		},
	},
	optimizeDeps: {
		esbuildOptions: {
			loader: {
				'.js': 'jsx',
			},
		},
	},
	esbuild: {
		loader: 'jsx',
		include: [/\/src\/.*\.js$/, /\/api\/.*\.js$/],
		exclude: [],
	},
	server: {
		port: '3000',
	},
});
