/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				cosmic: {
					900: '#0b0d17', // Noir profond
					800: '#15192b', // Slightly lighter dark
					700: '#1b2a4e', // Bleu spatial
					500: '#7f5af0', // Violet nébuleuse
					100: '#eaeaea', // Blanc doux
				}
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				display: ['Space Grotesk', 'sans-serif'],
				orbitron: ['Orbitron', 'sans-serif'],
			},
			animation: {
				'spin-slow': 'spin 12s linear infinite',
				'float': 'float 6s ease-in-out infinite',
			},
			keyframes: {
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-20px)' },
				}
			}
		},
	},
	plugins: [],
}
