module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'prettier'
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'import'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		}
	],
	rules: {
		camelcase: ['error', { allow: ['^_'] }],
		'no-undef': 'off',
		'no-import-assign': 'off',
		'no-unused-vars': 'off', // handled by ts below
		'no-useless-escape': 'off',
		'one-var': ['error', 'never'],
		'svelte/no-at-html-tags': 'off',
		'svelte/no-unused-svelte-ignore': 'off',
		'@typescript-eslint/no-explicit-any': 'error',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				argsIgnorePattern: '^_',
				destructuredArrayIgnorePattern: '^_',
				varsIgnorePattern: '^(_|\\$\\$)',
				ignoreRestSiblings: true
			}
		],
		// These lint rules don't make sense for us but are enabled in the preset configs
		'@typescript-eslint/no-confusing-void-expression': 'off',
		'@typescript-eslint/restrict-template-expressions': 'off'
	}
};
