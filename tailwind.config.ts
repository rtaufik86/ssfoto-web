import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── SS Foto brand tokens ──
        "ss-red": {
          DEFAULT: "#E30613",
          600: "#C8050F",
          700: "#A60410",
          50: "#FFF1F1",
          100: "#FFD9D9",
        },
        "ss-ink": {
          DEFAULT: "#111114",
          2: "#2A2A30",
        },
        "ss-text": "#3A3A42",
        "ss-muted": "#6B6B74",
        "ss-soft": "#9A9AA3",
        "ss-line": {
          DEFAULT: "#E6E6EA",
          2: "#EFEFF2",
        },
        "ss-bg": "#FFFFFF",
        "ss-warm": "#FBF9F6",
        "ss-surface": {
          DEFAULT: "#F5F5F7",
          2: "#F0F0F3",
        },
        "ss-wa": {
          DEFAULT: "#25D366",
          600: "#1FB257",
        },
        "ss-maps": "#1A73E8",
        "ss-success": "#16A34A",
        "ss-warning": "#F59E0B",
        // ── shadcn compatibility ──
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      fontFamily: {
        sans: [
          "var(--font-plus-jakarta-sans)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      borderRadius: {
        // shadcn compatibility
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        // SS Foto radius tokens
        "r-xs": "6px",
        "r-sm": "8px",
        "r-md": "12px",
        "r-lg": "16px",
        "r-xl": "22px",
        "r-pill": "999px",
      },
      boxShadow: {
        "sh-1": "0 1px 2px rgba(17,17,20,.04), 0 1px 1px rgba(17,17,20,.03)",
        "sh-2": "0 4px 12px rgba(17,17,20,.06), 0 2px 4px rgba(17,17,20,.04)",
        "sh-3": "0 12px 32px rgba(17,17,20,.10), 0 4px 8px rgba(17,17,20,.04)",
        "sh-cta": "0 8px 20px rgba(227,6,19,.28)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
