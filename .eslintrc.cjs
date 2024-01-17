module.exports = {
	root: true,
	env: { browser: true, es2021: true },
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react-hooks/recommended',
		'plugin:@tanstack/eslint-plugin-query/recommended',
		'prettier',
		'plugin:storybook/recommended',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
	settings: { react: { version: '18.2' } },
	plugins: ['react-refresh'],
	rules: {
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
		'react/no-unescaped-entities': ['warn'],
		'no-unused-vars': ['warn'],
		'no-console': [{ allow: ['warn', 'error'] }],

		'react/prop-types': ['warn'],
	},
};
