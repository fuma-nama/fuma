import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import { createPreset } from "@fuma-comment/react/theme";

const config: Config = {
  darkMode: "class",
  presets: [createPreset()],
  content: [
    "./node_modules/@fuma-comment/react/dist/**/*.js",

    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.mdx",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      typography: {
        invert: {
          css: {
            "--tw-prose-quote-borders": "rgb(80,80,80)",
          },
        },
      },
      keyframes: {
        "shell-show": {
          from: {
            transform: "scale(0.7)",
            opacity: "0%",
          },
          to: {
            transform: "scale(1)",
            opacity: "100%",
          },
        },
        "shell-hide": {
          from: {
            transform: "scale(1)",
            opacity: "100%",
          },
          to: {
            transform: "scale(0)",
            opacity: "0%",
          },
        },
      },
      animation: {
        "shell-show": "shell-show 0.2s ease-out",
      },
    },
  },
  plugins: [typography],
};
export default config;
