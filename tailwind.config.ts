import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#080c14",
          light: "#0e1422",
          card: "#121a2d",
          hover: "#18233c",
          border: "#1e2d4a"
        },
        cyber: {
          cyan: "#00f2fe",
          teal: "#06b6d4",
          emerald: "#10b981",
          amber: "#f59e0b",
          crimson: "#ef4444",
          indigo: "#6366f1"
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Courier New", "monospace"]
      },
      animation: {
        'radar-sweep': 'radarSweep 4s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'scan-line': 'scanLine 3s ease-in-out infinite',
      },
      keyframes: {
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', boxShadow: '0 0 10px rgba(0, 242, 254, 0.2)' },
          '50%': { opacity: '1', boxShadow: '0 0 25px rgba(0, 242, 254, 0.6)' },
        },
        scanLine: {
          '0%': { top: '0%' },
          '50%': { top: '95%' },
          '100%': { top: '0%' }
        }
      }
    },
  },
  plugins: [],
};
export default config;
