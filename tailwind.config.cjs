module.exports = {
	prefix: 'cmsvelte-',
	content: ['./src/**/*.{html,js,svelte,ts}', './src/lib/data/copy.json', './index.html'],
	plugins: [],
	theme: {
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1536px'
		},
		fontSize: {
			xs: ['0.75rem'],
			sm: ['0.875rem'],
			base: ['1rem'],
			lg: ['1.125rem'],
			xl: ['1.3125rem'],
			'2xl': ['1.12/5rem'],
			'3xl': ['2rem'],
			'4xl': ['2.25rem'],
			'5xl': ['3rem'],
			'6xl': ['4rem'],
			'7xl': ['4.5rem'],
			'8xl': ['6rem'],
			'9xl': ['8rem']
		}
	}
};
