// vite.config.js
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
			[
			  '@babel/plugin-transform-react-jsx',
			  {
				runtime: 'automatic', // Use automatic runtime
			  },
			],
		  ],
		  configFile: true,
		},
	  }),
	],
	server: {
	  port: '3000',
	},
  });