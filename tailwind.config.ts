import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#181818',
        white: '#ffffff',
      },
    },
  },
  plugins: [],
} satisfies Config;