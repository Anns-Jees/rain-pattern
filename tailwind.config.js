/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      gridTemplateColumns: {
        // Add 15 columns (repeat 15 times 1fr)
        '15': 'repeat(15, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        // Add 20 rows (repeat 20 times 1fr)
        '20': 'repeat(20, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
}
