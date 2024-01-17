// vite.config.js
///<reference types="vitest" />
///<reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		eslint(),
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
					// [
					// 	'@babel/plugin-transform-react-jsx',
					// 	{
					// 		runtime: 'automatic',
					// 	},
					// ],
				],
				babelrc: true,
				configFile: true,
			},
		}),
	],
	server: {
		port: '3000',
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/test/setup.js',
		css: true,
		// parsing CSS is slow but we need it
	},
});
