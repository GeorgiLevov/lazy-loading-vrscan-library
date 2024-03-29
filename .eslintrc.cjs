module.exports = {
	root: true,
	env: { browser: true, es2021: true },
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react-hooks/recommended',
		'prettier',
		'plugin:jest-dom/recommended',
	],
	ignorePatterns: [
		'dist',
		'.eslintrc.cjs',
		'docs',
		'cypress',
		'cypress.config.js',
		'public',
	],
	parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
	settings: { react: { version: '18.2' } },
	plugins: ['react-refresh'],
	rules: {
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
		'import/extensions': 0,
		'react/no-unescaped-entities': ['warn'],
		'no-unused-vars': ['warn'],
		'no-console': ['error', { allow: ['warn', 'error'] }],
		'react-refresh/only-export-components': 'off',
		'react/prop-types': ['warn'],
	},
};
