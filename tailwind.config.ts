import type { Config } from "tailwindcss";

export default {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				primary: "#F8B959",
				secondary: "#FDEACD",
				danger: "#F95A50",
				accent: "#E6A5A1",
				white: "#FFFFFF",
				mint: "#B4F3B4",
			},
		},
	},
	plugins: [],
} satisfies Config;
