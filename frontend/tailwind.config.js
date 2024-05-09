/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
      'gray-400': 'rgb(156 163 175)',
      'gray-500': 'rgb(107 114 128)',
      'gray-600': 'rgb(75 85 99)',
      'gray-700': 'rgb(55 65 81)',
      'gray-800': 'rgb(31 41 55)',
      'gray-900': 'rgb(17 24 39)',
      'gray-950': 'rgb(3 7 18)',
    },
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'display': ['Oswald'],
      'body': ['English'],
    },
    extend: {},
  },
  plugins: [],
}

