import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        afgrey: "#8C938C",
        afbg_grey: "#1D1C1D",
      },
    },
  },
  plugins: [],
};

export default config;
