module.exports = {
	important: true,
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		container: {
			padding: {
				DEFAULT: '1rem',
				sm: '2rem',
				lg: '4rem',
				xl: '5rem',
				'2xl': '6rem',
			},
		},
		fontFamily: {
			body: ['var(--font-inter)', 'sans-serif'],
			title: ['var(--font-suez-one)', 'sans-serif'],
			sans: ['sans-serif', 'system-ui', '-apple-system'],
		},
		scrollBehavior: 'smooth',
		backgroundColor: (theme) => ({
			...theme('colors'),
			primary: '#1e3b8a',
			secondary: '#F2F4FF',
			ternary: '#4BD6F2',
		}),
		textColor: (theme) => ({
			...theme('colors'),
			primary: '#1e3b8a',
		}),
		borderColor: (theme) => ({
			...theme('colors'),
			primary: '#1e3b8a',
			secondary: '#F2F4FF',
		}),
		screens: {
			sm: '640px',
			// => @media (min-width: 640px) { ... }

			md: '768px',
			// => @media (min-width: 768px) { ... }

			lg: '1024px',
			// => @media (min-width: 1024px) { ... }

			xl: '1280px',
			// => @media (min-width: 1280px) { ... }

			'2xl': '1536px',
			// => @media (min-width: 1536px) { ... }
		},
		extend: {
			keyframes: {
				'fade-in-down': {
					'0%': {
						opacity: '0',
						transform: 'translateY(-10px)',
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)',
					},
				},
				'spin': {
					'0%': {
						transform: 'rotate(0deg)',
					},
					'100%': {
						transform: 'rotate(360deg)',
					},
				},
			},
			animation: {
				'fade-in-down': 'fade-in-down 0.7s ease-out',
				'spin-slow': 'spin 5s linear infinite',
			},
			boxShadow: {
				card: '5px 5px 14px #8f8f8f, -5px -5px 14px #fff',
			},
		},
	},
	variants: {
		extend: {},
	},
};
