/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // Archivos de Storybook
    "./.storybook/**/*.{mdx,jsx,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",

    // Componentes y sus stories
    "../components/*/src/**/*.{js,jsx,ts,tsx}",
    "../components/*/stories/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
