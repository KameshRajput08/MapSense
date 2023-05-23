/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkbg: "#0e2127",
        bg: "#ffffff1a",
        darkSlate: "#495670",
        slate: "#8892b0",
        lightSlate: "#a8b2d1",
        lightestSlate: "#ccd6f6",
      },
    },
  },
  plugins: [],
};
