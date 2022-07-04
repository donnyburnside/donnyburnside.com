module.exports = {
  content: [
    './src/**/*.{liquid,md,js}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: '"IBM Plex Sans", sans-serif',
        serif: '"IBM Plex Serif", sans-serif',
        mono: '"IBM Plex Mono", sans-serif',
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    // require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],
}