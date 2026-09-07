/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      // Some components use w-4.5 / h-4.5 (a Tailwind v4 fractional step).
      spacing: {
        4.5: '1.125rem',
      },
    },
  },
  plugins: [],
}
