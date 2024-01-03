import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        owed: colors["green"][500],
        borrowed: colors["red"][500],
      },
    },
  },
  plugins: [],
};
export default config;
