/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			minWidth: {
				50: "50%",
				40: "40%",
			},
			maxWidth: {
				50: "50%",
			},
			padding: {
				100: "100%",
			},
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				darkgreen: "#183717",
				beige: "#F3F0E0",
				pink: "#FF8BFF",
				deeppink: "#C401C4",
				lightpink: "#FFDBFF",
				green: "#50DA4C",
				lightgreen: "#D8FFD8",
				darkgrey: "#1C1C1C",
				light: "#FEFDF8",
			},
		},
	},
	plugins: [],
};
