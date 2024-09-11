import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        base: "#F45846",
        'moklet': "#B7292E",
        "highlight":"#e0331f",
        "secondary":"#88898852",
        "hijauBorder":"#75B5A6",
        "hijauText":"#5C8F86",
        "inputCodeHijau":"#8CA19E",
        "baseHijau":"#F3F9F7",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        "metropolis-black": ["Metropolis-Black", "sans-serif"],
        Quicksand: ["Quicksand", "sans-serif"],
        Karla: ["Karla", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
