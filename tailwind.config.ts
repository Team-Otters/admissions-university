import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      mainBlue: "#3285E6",
      blueTitle: "#111FA0",
      gray: "#d9d9d9",
      iconStroke: "#5B5B58",
    },

    extend: {
      // backgroundImage: {
      //   "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      //   "gradient-conic":
      //     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      // },

      fontFamily: {
        notoSerif: ["Noto", "serif"],
        notoSans: ["Noto Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
