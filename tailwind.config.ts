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
				background: "#1C1C1E",
				foreground: "#2C2C2E",
				secondaryBtn: "#2196F3",
				primaryBtn: "#2563EB",
				danger: "#F95A50",
				accent: "#EF4444",
				white: "#FFFFFF",
				title: "#EDEDED",
				subtitle: "#A1A1AA",
				tags: "#14B8A6",
				tint: "rgba(0, 0, 0, 0.5)",
			},
		},
	},
	plugins: [],
} satisfies Config;
