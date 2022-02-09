const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				primary: ['Inter', ...fontFamily.sans],
			},
			colors: {
				moderateCyan: '#3cb4ac',
				darkCyan: '#147b74',
				darkGray: '#7a7a7a',
			},
		},
	},
	plugins: [require('@tailwindcss/line-clamp')],
};
