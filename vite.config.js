// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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
					[
						'@babel/plugin-transform-react-jsx',
						{
							runtime: 'automatic',
						},
					],
				],
				babelrc: true,
				configFile: true,
			},
		}),
	],
	loader: { '.js': 'jsx' },
	server: {
		port: '3000',
	},
});
