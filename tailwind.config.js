module.exports = {
  purge: [
    './src/**/*.liquid',
    './src/**/*.md',
    './src/**/*.js',
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
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],
}