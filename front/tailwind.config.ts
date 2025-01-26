import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'mwlightgreen' : '#0796a8',
        'mwdarkgreen': '#067a89',
        'mvcontainergrey' : '#1e1f20'
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
} satisfies Config;
