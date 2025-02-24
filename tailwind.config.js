import { heroui } from '@heroui/react'

export default {
  content: [
    './src/**/*.{html,js,jsx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
}