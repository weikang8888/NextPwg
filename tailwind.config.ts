import type { Config } from "tailwindcss";

export default {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#4287f5",
        secondary: "#9342f5",
        danger: "#F95A50",
        accent: "#f542ef",
        white: "#FFFFFF",
        mint: "#42e0f5",
      },
    },
  },
  plugins: [],
} satisfies Config;
