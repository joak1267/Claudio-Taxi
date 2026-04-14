// ✅ NUEVO: Configuración de branding visual para Claudio Taxi
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
        taxi: {
          dark: "#020617",
          gold: "#FACC15",
        },
      },
    },
  },
  plugins: [],
};
export default config;