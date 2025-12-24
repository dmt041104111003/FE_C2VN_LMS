import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        spring: {
          bg: '#FAF7F6',
          'bg-alt': '#F5F0EE',
          accent: '#A8707A',
          text: '#5A4D4D',
          link: '#9A6670',
        },
        summer: {
          bg: '#F7FAF9',
          'bg-alt': '#F0F5F3',
          accent: '#5A8A80',
          text: '#444D4B',
          link: '#4D7D73',
        },
        autumn: {
          bg: '#F9F7F5',
          'bg-alt': '#F4F0EC',
          accent: '#9A7058',
          text: '#504540',
          link: '#8D6550',
        },
        winter: {
          bg: '#F8F9FA',
          'bg-alt': '#F2F4F6',
          accent: '#6A7A90',
          text: '#454B55',
          link: '#5D6D80',
        },
      },
    },
  },
  plugins: [],
};

export default config;
