import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
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

      colors: {
        mainBlue: "#A5C7BF",
        blueTitle: "#A5C7BF",
        gray: "#d9d9d9",
        iconStroke: "#5B5B58",
        amaranth: "#e6325c",
      },

      boxShadow: {
        tableShadow: "0 0 20px -10px rgb(165, 199, 191)",
      },

      // borderRadius: {
      //   tableLine: ""
      // }
    },
  },
  plugins: [],
};
export default config;
