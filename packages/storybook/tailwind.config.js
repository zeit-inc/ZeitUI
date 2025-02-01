import { heroui } from '@heroui/react';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // Archivos de la librería de diseño
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',

    // Archivos de Storybook
    './.storybook/**/*.{mdx,jsx,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',

    // Componentes y sus stories
    '../components/*/src/**/*.{js,jsx,ts,tsx}',
    '../components/*/stories/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [heroui({
    addCommonColors: true,
  })],
};
